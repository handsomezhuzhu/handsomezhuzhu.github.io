---
title: vllm汇报稿
date: 2025-09-26 23:00:00  # 发布日期和时间，格式：YYYY-MM-DD HH:MM:SS
descriptionHTML: '<span style="color:var(--description-font-color);">预汇报稿件</span>'
tags:                    # 文章标签列表，用于分类和搜索
  - AI
  - 笔记
sidebar: true            # 是否显示侧边栏：true显示，false隐藏
readingTime: true        # 是否显示阅读时间：true显示，false隐藏
sticky: 0                # 精选文章设置：值越大在首页展示越靠前，0表示不精选
recommend: true
---

# vLLM 报告

> 主题聚焦：**PagedAttention 分页注意力、整体架构、调度器原理、Worker 原理、PP 与 TP 的区别、预填充（Prefill）与解码（Decode）**

## 1. 为什么需要 PagedAttention

### 1.1 传统 KV Cache 的两类浪费

* **内部碎片**：必须为每个请求按“可能最长序列（prompt+output）”预留 **连续** KV 空间，未用到的预留位被浪费。
* **外部碎片**：全局连续大块分配导致“零头”拼不起来，无法切给其他请求。
* **共享缺失**：**相同前缀的 KV** 无法复用，重复存储。


### 1.2 PagedAttention 的核心思路

* 预分配一大块显存，**切成固定大小的 block**。
* 逻辑上给每个序列分配 **Logical Blocks**，实际落在 **Physical Blocks**；两者通过 **Block Table** 映射。
* 最多浪费 < block_size 个 slot，**显著减少内外部碎片**。

---

## 2. vLLM 的总体架构


* **LLMEngine**：一次迭代做三件事：`schedule()` → `execute_model()` → `process_outputs()`。
* **Scheduler**：决定本轮处理哪些请求、是否换入/换出 KV。
* **Worker / ModelRunner**：执行模型前向，读写 KV cache，采样下一个 token。
* **CacheEngine**：分配/维护 KV Blocks（GPU/CPU）、管理 **swap in/out、copy** 的 CUDA 流与事件。

---

## 3. 调度器原理

### 3.1 核心策略

* **Iteration-level**：每生成一个 token 后**重新调度**，因此 batch 大小可变。
* **阶段区分**：vLLM 将请求分为 **Prefill（填充）** 与 **Decode（生成）** 两类批次，**同一轮只处理同一阶段**。

### 3.2 三个队列

* **waiting**：刚到达的请求，尚未分配 GPU blocks（只分配逻辑块）。
* **running**：正在解码或已完成 prefill 的请求。
* **swapped**：因显存不足被抢占、KV 暂存在 CPU 的请求。

### 3.3 块管理关键路径

* **BlockSpaceManager.can_allocate()**：预判 waiting 请求的 prompt 是否能拿到足够的 GPU blocks。
* **allocate()**：为 prompt 的每个逻辑块绑定一个物理块。
* **can_append_slot() / append_slot()**（解码迭代）：若最后一个物理块**独占**则直接追加，否则触发复制。

### 3.4 抢占与换入/换出

* **Recompute**：单序列分支，释放 GPU 块，下次换回后**重算** KV。
* **Swap**：多分支或不宜重算的场景，把物理块搬到 CPU；后续再 **swap-in** 回 GPU。
* **优先级**：`swapped` 队列优先于 `waiting`。

---

## 4. Worker 原理

### 4.1 角色与初始化

* **Worker ↔ GPU**：一张卡一个 Worker；多卡时配合 **Tensor Parallel（TP）** 切分模型。
* 初始化步骤：加载权重 → 建立分布式组 → **profile** 可用块 → **init CacheEngine** →（可选）**CUDA Graph** 预捕获。

### 4.2 一次执行（`execute_model`）

1. **状态同步**：驱动 Worker 广播批次规模与内存操作。
2. **数据交换**：调用 CacheEngine 的 `swap_in/out`、`copy`。
3. **准备输入**：生成 `input_tokens / positions / input_metadata`。
4. **前向**：

   * **Prefill**：走 FlashAttn；
   * **Decode**：走 PagedAttention 内核。
5. **采样**：产生下一个 token。

### 4.3 CacheEngine 的数据结构

* 每层有 **key_blocks / value_blocks**。
* **Block Table**：记录 `seq_id → [block_numbers...]`。
* **slot_mapping**：映射“本轮 token”写入到物理块的哪个 slot。

---

## 5. Prefill & Decode

### Prefill（填充阶段）

* **目标**：对完整 prompt 做一次性前向传播，构建 KV 缓存，并生成第一个 token。
* **数据特征**：长序列、少批次、padding 多、计算密集。
* **实现**：FlashAttention；输入 `_prepare_prompt`，输出第一个 token。
* **瓶颈**：HBM 带宽、padding 浪费、长 prompt 拖慢 batch。
* **调优**：限制 `max_num_batched_tokens`，分批/压缩长 prompt，减少 padding。

### Decode（解码阶段）

* **目标**：逐 token 生成。
* **数据特征**：迭代频繁、短序列、并发依赖多。
* **实现**：PagedAttention；输入 `_prepare_decode`，只追加一个 slot。
* **瓶颈**：Kernel 启动开销、随机访存、并发不足。
* **调优**：提高 `max_num_seqs`、用 CUDA Graph、调整 block_size、控制采样分支。

### Prefill vs Decode 对比总结

| 维度               | Prefill               | Decode                     |
| ---------------- | --------------------- | -------------------------- |
| **目标**           | 编码完整 prompt，建立 KV 前缀  | 逐 token 生成                 |
| **批次特征**         | 少批次、长序列、padding 多     | 多批次、短序列、迭代频繁               |
| **Attention 路径** | FlashAttention        | PagedAttention             |
| **主要瓶颈**         | HBM 带宽 + Padding      | Kernel Overhead + 随机访存     |
| **优化抓手**         | 控制 padding、限制长 prompt | 提升并发、CUDA Graph、block size |

---

## 6. TP & PP

* **TP（Tensor Parallelism）**：层内张量切分；通信频繁；适合实时推理。
* **PP（Pipeline Parallelism）**：层间切分；通信少但需流水线调度；更多见于训练。




