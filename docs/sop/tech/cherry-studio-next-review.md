---
title: Cherry Studio Next 体验：当一个 AI 工具决定成为 AI 工作站
top: 0
date: 2026-07-03 18:00:00
descriptionHTML: '
<span style="color:var(--description-font-color);">内测 v2 版本体验点评：UI、交互、Agent，以及为什么"臃肿"不是它的错</span>
'
tags:
  - Cherry Studio
  - AI
  - 点评
sidebar: true
readingTime: true
hiddenCover: true
sticky: 0
hidden: false
recommend: true
---

# Cherry Studio Next 体验：当一个 AI 工具决定成为 AI 工作站

<div align="center">

## 壹

</div>

&emsp;&emsp;因为一直在nei'c Cherry Studio Next 的内测资格，也就是 v2 版本，断断续续用了一阵子，想随便聊聊。

&emsp;&emsp;整体感受就是：这不是改了个皮那么简单。v2 干了三件事——UI 重做了、交互逻辑理顺了、Agent 真正塞进产品骨架里了。如果你之前觉得 Cherry Studio 就是个套壳聊天器，Next 应该能改改这个印象。

<div align="center">

## 贰
</div>

&emsp;&emsp;v1 那个界面吧，说丑也不至于，但就是觉得挤。功能都在，但哪里都乱糟糟的，找个设置得在折叠菜单里翻来翻去。

&emsp;&emsp;Next 肉眼可见地收拾过了。<span style="color: #1976d2;">信息层级</span>清楚了，侧边栏、对话区、设置面板谁主谁次不打架了，一眼能看出来自己在哪、该去哪找东西。

&emsp;&emsp;<span style="color: #43a047;">视觉密度</span>也降下来了。不是功能少了，是留白和分组合理了。消息气泡、代码块、引用块都重新画过，盯久了不那么累。暗色模式也不是简单反色了事，配色是单独调的。这些玩意单拎出来好像都不起眼，但加在一起就是"舒服了"和"没舒服"的区别。

<div align="center">

## 叁 · 交互终于像个整体了

</div>

&emsp;&emsp;v1 最大的毛病是每个功能都像独立拼上去的——知识库是知识库，绘图是绘图，联网是联网，互相不怎么搭理。

&emsp;&emsp;举个实际的例子：v1 里我想"挂个知识库 + 联网搜一下 + 顺手画个图"，得在好几个面板之间切来切去，自己手动串。Next 里这些能力被收到对话流里了，一个会话里自然就能调度，不用再来回横跳。

&emsp;&emsp;这个变化说起来好像不大，但天天用的话效率差距挺明显的。v1 是"我去找工具"，Next 是"工具在对话里就位了"。

<div align="center">

## 肆 · Agent：从插件变成骨架

</div>

&emsp;&emsp;Next 里最大的变化我觉得是 Agent。v1 也有类似的东西，但说白了就是"高级预设"——一段系统提示词加几个工具开关。Next 把 Agent 做成了骨架级别的东西：

&emsp;&emsp;你可以给一个 Agent 绑定特定模型、知识库、工具集、MCP 服务，配好之后随时调用，不用每次重新组装。Agent 不再是对话的附属品，变成了可以独立配置、跨会话复用的<span style="color: #43a047;">执行单元</span>。

&emsp;&emsp;说白了就是 Cherry Studio 不再只是"你跟模型聊天"的中间层了，它变成了"你调度一堆 AI 能力干活"的<span style="color: #1976d2;">编排平台</span>。

<div align="center">

## 伍 · "臃肿"这个词我不同意

</div>

&emsp;&emsp;每次聊到 Cherry Studio，评论区肯定有人蹦出来说<span style="color: #d32f2f;">臃肿</span>。功能太多、上手难、普通人用不到那么多东西……这些说法我能理解，但拿"臃肿"去批它我真的不太同意。

&emsp;&emsp;原因特别简单：人家叫 Cherry <span style="color: #1976d2;">Studio</span>，又不叫 Cherry Chat。Studio 是工作室、工作站的意思。它打一开始就不是要做个极简聊天客户端，而是要做一个能覆盖 <span style="color: #43a047;">99% AI 场景</span>的集成环境。

&emsp;&emsp;你想想一个 Studio 该有什么：

- <span style="color: #1976d2;">知识库</span>——本地向量化文档检索，带引用溯源
- <span style="color: #1976d2;">Agent</span>——可编排可复用的执行单元
- <span style="color: #1976d2;">全渠道全接口</span>——OpenAI、Anthropic、Google、硅基流动、Ollama……主流的非主流的，API 还是本地，都能接
- <span style="color: #1976d2;">绘图</span>——文生图、图片理解
- <span style="color: #1976d2;">小程序</span>——轻量功能扩展
- <span style="color: #1976d2;">MCP</span>——标准化工具协议，把外部能力接进来

&emsp;&emsp;这些不是"乱堆上去的"，是一个 AI 工作站<span style="color: #43a047;">本来就该有的东西</span>。你要是只需要跟模型聊聊天，那确实用不到这么多，但那说明你要的是一个 Chat 不是一个 Studio——这没毛病，但这不是 Cherry Studio 的问题啊。

&emsp;&emsp;上手门槛确实存在，这个不洗。第一次打开看到模型服务、知识库、Agent、MCP、小程序一堆东西摆在那，确实会懵。所以之前我专门写了[一篇 Cherry Studio 上手指南](https://zhuzihan.com/sop/tutorial/how-to-use-cherry-studio.html)，从下载安装到加模型、联网、建知识库，一步步过。觉得 Next 功能太多不知道从哪下手的话，可以先去看看那篇。

&emsp;&emsp;但"上手有门槛"和"产品臃肿"真的是两码事。一个是学习成本，一个是设计失败。Cherry Studio 的功能是有逻辑地组织在一起的，不是瞎拼的——只是这个逻辑的起点是"AI 工作站"，不是"AI 聊天器"。

<div align="center">

## 陆 · 收个尾

</div>

&emsp;&emsp;Next 让 Cherry Studio 的"工作站"定位算是名副其实了。UI 好看了，交互顺手了，Agent 进了骨架。

&emsp;&emsp;它不追极简，也不该追极简。它要的就是<span style="color: #1976d2;">一个应用搞定你对 AI 的所有需求</span>——功能多、上手难是必然代价，但好处是你不用在五六个工具之间切来切去了。

&emsp;&emsp;你要的是开箱即用的聊天器，市面上轻量选择一大把。但你要的是能挂知识库、跑 Agent、多模型多渠道的 AI 工作站，Cherry Studio Next 值得花点时间上手。

<div align="center">

#### 写于 2026 年 7 月

</div>
