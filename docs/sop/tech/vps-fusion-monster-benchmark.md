---
title: VPS 小鸡测评记录：融合怪测试汇总
top: 3
date: 2026-06-01 01:00:00
descriptionHTML: '
<span style="color:var(--description-font-color);">把几台免费/低价 VPS 的融合怪测试结果集中归档，并按性能、线路、IP 质量和实际用途做一次横向评价。</span>
'
tags:
  - VPS
  - 测评
  - 融合怪
sidebar: true
outline: [2, 2]
readingTime: true
hiddenCover: true
sticky: 90
hidden: false
recommend: true
---

# VPS 小鸡测评记录：融合怪测试汇总



## 前言

&emsp;&emsp;这篇专门用来记录我手上的几台 VPS 小鸡测试结果。

&emsp;&emsp;测试脚本使用的是 spiritLHLS 的融合怪脚本，GitHub 地址：[https://github.com/spiritLHLS/ecs](https://github.com/spiritLHLS/ecs)。融合怪各项测试基准可以参考脚本输出里的说明：[https://bash.spiritlhl.net/ecsguide](https://bash.spiritlhl.net/ecsguide)。

## 横向结论

| 机器 | 主要定位 | 性能 | 国内访问 | IP 质量 | 总评 |
|---|---|---:|---:|---:|---|
| 不知名小厂香港月付 1.88 2C2G | 香港低价机器基础测试 | 未测完整性能 | 很强 | 好 | 延迟漂亮，带宽明显卡在 30Mbps 左右 |
| Azure 免费 1C1G 日本 | 日本免费机基础测试 | 一般 | 中上 | 一般 | 联通和部分电信可用，磁盘很弱 |
| Google 永久免费美国 Oregon | 免费保号/干净 IP | 弱 | 一般 | 好 | CPU/IO 很弱，但 Google IP 相对干净 |
| Google 永久免费美国 Iowa | 免费保号/干净 IP | 弱 | 一般 | 好 | 和 Oregon 类似，免费自用可以，别指望性能 |
| DO 美国 1C0.5G | 美国小规格机器基础测试 | 中等 | 弱 | 一般 | 本地测速好，回国体验差 |
| DO 加拿大 1C0.5G | 加拿大小规格机器基础测试 | 中等 | 弱 | 差 | 盘不错，但 IP 质量和国内线路都不理想 |
| uzuma 加拿大 CAMT1.Small | 加拿大小规格机器基础测试 | 未测完整性能 | 弱 | 一般偏差 | Leaseweb Montréal，回国绕路，IP 检测结果分裂 |
| DO 澳大利亚 1C0.5G | 澳洲小规格机器基础测试 | 强 | 很弱 | 差 | 跑分好看，国内方向很弱 |
| lowsla 日本东京 NAT 小杯机 | 日本 NAT 小杯机基础测试 | 未测完整性能 | 中上 | 一般 | 三网普通线路但延迟低，IP 不算脏，邮件端口外连基本全封 |
| lowsla 荷兰阿姆斯特丹 NAT 小杯机 | 荷兰 NAT 小杯机基础测试 | 未测完整性能 | 弱 | 好 | IP 干净，但路由远、回国延迟高 |


## 不知名小厂香港月付 1.88 2C2G

### 配置与线路

&emsp;&emsp;没测 CPU、内存、磁盘跑分。IP 显示为香港 Tung Chung，服务商为 `AS206888 HanMing HK Limited`。三网回程里，上海/广州/成都电信识别到 `CN2GIA / CTGNET`，联通走 `4837`，移动部分走电信 `163`。

### 测评

&emsp;&emsp;服务商基本属于跑路了，只有所谓“自营”的香港在用。广州电信路由末端大约 10ms 级别，联通到深圳也能看到 10ms 左右，移动到深圳大约 17ms。

&emsp;&emsp;短板也很明显：测速基本在 28Mbps 左右，移动 Suzhou 下载只有 `0.53Mbps`，说明带宽余量不大。高流量下载、图床、网盘分发这类持续吞吐需求会比较吃力。

### 原始融合怪结果

::: details 点击展开 net.txt
<<< ../../../otherdocs/vps测评数据/不知名小厂香港月付1.88 2-2小鸡/net.txt
:::

## Azure 免费 1C1G 日本小机

### 配置与性能

&emsp;&emsp;Azure 日本东京，`1C / 847MiB / 60.95GiB`，CPU 为 `Intel Xeon E5-2673 v4`，单核 sysbench `870`。内存读写还可以，但磁盘很弱，1GB 顺序读写大约 `56MB/s`，fio 1M 总读写也只有 `55MB/s` 左右。

### 网络与 IP 质量

&emsp;&emsp;回程是普通线路：电信 `163`、联通 `4837`、移动 `CMI`。Speedtest 本地 `483Mbps` 上传、`1571Mbps` 下载；联通上海 5G 有 `208/273Mbps`，延迟 `33ms`，表现不错；电信 Suzhou 也能到 `85/129Mbps`，但浙江电信和移动 Suzhou 明显拉胯。

&emsp;&emsp;IP 质量一般，信任分 `33`，Google 搜索可行性为 `NO`。结合磁盘和线路表现看，它更像低负载机器，重 IO 场景会受限制。

### 测评

&emsp;&emsp;这台的问题主要在磁盘和线路稳定性。数据库、搜索服务、频繁编译任务这类高 IO 或高 CPU 负载会比较吃力，移动方向的网络表现也不稳。

### 原始融合怪结果

::: details 点击展开 all.txt
<<< ../../../otherdocs/vps测评数据/Azure免费1-1日本小机/all.txt
:::

## Google 永久免费美国 Iowa

### 配置与性能

&emsp;&emsp;Google Iowa，`2C / 970MiB / 29.30GiB`，CPU 显示 `Intel Xeon @ 2.20GHz`。单核 `469`，双线程反而只有 `229`，这类免费实例的 CPU 额度和调度限制很明显。内存读写也偏低，fio 4K 只有 KB/s 级，磁盘小文件性能很弱。

### 网络与 IP 质量

&emsp;&emsp;本地 Speedtest 下载能到 `3214Mbps`，但这不代表国内体验。国内方向里，上海联通 5G `51/129Mbps`、苏州电信 `65/97Mbps` 还算能看，移动 Suzhou 基本不可用。

&emsp;&emsp;IP 质量是这台的亮点：欺诈分 `0`，匿名网络相关判断较少，ASN 滥用分低，黑名单记录也比较干净。

### 测评

&emsp;&emsp;它不是性能机器，主要价值在免费额度和相对干净的 IP。数据库、编译、高并发爬虫或者国内高稳定访问需求都不是它的强项。

### 原始融合怪结果

::: details 点击展开 all.txt
<<< ../../../otherdocs/vps测评数据/Google永久免费小鸡美国Lowa/all.txt
:::

## Google 永久免费美国 Oregon

### 配置与性能

&emsp;&emsp;Google Oregon，`2C / 958MiB / 28.89GiB`，CPU 单核只有 `175`，双线程 `191`，是这批里面 CPU 表现最弱的一档。磁盘同样是免费机味道，4K fio 只有几百 KB/s，1M 总读写约 `76MB/s`。

### 网络与 IP 质量

&emsp;&emsp;本地 Speedtest `301/651Mbps`，国内方向比跑分好看一点：上海联通 5G `58/116Mbps`，苏州电信 `75/92Mbps`，浙江电信下载 `38Mbps`，移动方向依旧不行。

&emsp;&emsp;IP 质量同样比较舒服：欺诈分 `0`，匿名网络相关判断较少，ASN 滥用分低。

### 测评

&emsp;&emsp;Oregon 比 Iowa 更像一台“能挂着就行”的免费机。它的国内可用性不算差，但 CPU 和 IO 太弱，实际体验更偏低频任务。需要稳定响应的服务要注意缓存和写盘频率。

### 原始融合怪结果

::: details 点击展开 all.txt
<<< ../../../otherdocs/vps测评数据/Google永久免费小鸡美国Oregon/all.txt
:::

## DO 美国 1C0.5G

### 配置与性能

&emsp;&emsp;DigitalOcean 美国 New Jersey，`1C / 458MiB / 8.65GiB`，CPU 单核 `732`。磁盘比免费 Google 强很多，fio 1M 总读写 `743MB/s`，本地 Speedtest `1072/3893Mbps`。

### 网络与 IP 质量

&emsp;&emsp;回程主要是电信 `163`、联通 `4837`、移动 `CMI`，但延迟高：广州电信约 `250ms`，联通约 `280ms`，移动约 `240ms`。国内测速里联通上海 5G `19/60Mbps`，电信浙江 `1/8Mbps`，移动 Suzhou 下载只有 `0.02Mbps`。

&emsp;&emsp;IP 质量中等偏一般，Google 搜索可行性为 `NO`。本地带宽跑分好看，但国内方向被回程线路明显拖低。

### 测评

&emsp;&emsp;它的硬盘和本地带宽比免费机强，但回国线路会把体验拖下来。北美方向和国内方向的网络表现差异很大。

### 原始融合怪结果

::: details 点击展开 all.txt
<<< ../../../otherdocs/vps测评数据/DO-美国 1-0.5/all.txt
:::

## DO 加拿大 1C0.5G

### 配置与性能

&emsp;&emsp;DigitalOcean 加拿大 Toronto，`1C / 458MiB / 8.65GiB`，CPU 单核 `944`，磁盘表现不错，fio 1M 总读写 `931MB/s`，4K 总 IOPS 也远强于 Google 免费机。

### 网络与 IP 质量

&emsp;&emsp;回国普通线路，广州方向电信约 `220ms`，联通接近 `270ms`，移动约 `220ms`。国内测速里联通上海 5G `19/63Mbps`，苏州电信 `23/76Mbps`，移动 Suzhou 下载为 `0Mbps`。

&emsp;&emsp;IP 质量是短板：信任分 `18`，欺诈分 `100`，社区恶意记录、DNS 黑名单也比其它干净机更多。

### 测评

&emsp;&emsp;它是一台性能还行但 IP 和线路都不讨喜的小鸡。对 IP 信誉或国内访问稳定性要求较高时，这组数据不太乐观。

### 原始融合怪结果

::: details 点击展开 all.txt
<<< ../../../otherdocs/vps测评数据/DO-加拿大 1-0.5/all.txt
:::

## uzuma 加拿大 CAMT1.Small

### 配置与线路

&emsp;&emsp;只测了网络和 IP 质量。IP 和 ASN 显示为加拿大 Montréal，服务商为 `AS32613 Leaseweb Canada Inc.`。回程识别上，电信多为 `163` 普通线路，广州移动为 `CMI`，北京移动能看到 `CMIN2`，但不少联通/移动目标检测不到回程路由，需要以详细路由为准。

### 网络表现

&emsp;&emsp;广州电信经 Cogent 绕到欧洲再回国，末端约 `245ms`；广州联通绕北美到洛杉矶再进 `4837`，深圳末端约 `252ms`；广州移动经 Cogent/CMI 到香港再进广州，约 `260ms`。整体就是普通北美海外机的回国体验，国内方向延迟偏高。

### 测评

&emsp;&emsp;IP 质量比较矛盾：信任分 `98`，匿名网络相关分数低，滥用分 `0`，但欺诈分 `100`，DNS 黑名单有 `10` 条，Google 搜索可行性为 `NO`。

&emsp;&emsp;邮件方向的端口检测不算全封，但结合黑名单和 Google 搜索不可用，IP 信誉数据偏复杂。

### 原始融合怪结果

::: details 点击展开 net.txt
<<< ../../../otherdocs/vps测评数据/uzuma加拿大CAMT1.Small/net.txt
:::

## DO 澳大利亚 1C0.5G

### 配置与性能

&emsp;&emsp;DigitalOcean 澳大利亚 Sydney，`1C / 458MiB / 8.65GiB`，CPU 单核 `2029`，是这批完整跑分里最强的。磁盘也很强，fio 1M 总读写约 `1.28GB/s`，本地 Speedtest 下载到 `5476Mbps`。

### 网络与 IP 质量

&emsp;&emsp;问题是回国很难看：广州电信约 `280ms`，联通绕得更夸张，移动约 `160ms` 但实际测速不行。联通上海 5G 上传只有 `0.12Mbps`，苏州电信和移动 Suzhou 基本接近不可用。

&emsp;&emsp;IP 质量也不理想，欺诈分 `100`，ASN/公司滥用分高，Google 搜索可行性为 `NO`。

### 测评

&emsp;&emsp;这台很典型：本地性能漂亮，国内体验不漂亮。它的跑分和国内方向网络体验反差很大。

### 原始融合怪结果

::: details 点击展开 all.txt
<<< ../../../otherdocs/vps测评数据/DO-澳大利亚 1-0.5/all.txt
:::

## lowsla 日本东京 NAT 小杯机

### 配置与线路

&emsp;&emsp;这台只测了网络和 IP 质量。IP 显示为日本 Ebara/Tokyo，服务商为 `AS979 NetLab Global`。回程识别很规整：电信 `163`、联通 `4837`、移动 `CMI`，都属于普通线路。

### 网络表现

&emsp;&emsp;虽然不是精品线路，但日本东京位置比较近，回国延迟比欧美机器低很多。广州电信经香港回国到深圳约 `55ms`，广州联通经东京 CUG 到上海再到华南，末端约 `80ms`，广州移动经东京 CMI 到广州，末端约 `66ms`。从路由和延迟看，它的基础连通性不错，但线路等级仍然只是普通回程。

### 测评

&emsp;&emsp;IP 质量中等：信任分 `98`，滥用分 `0`，DNS 黑名单首段检测为 `0` 条，但欺诈分 `65`，Google 搜索可行性为 `NO`。邮件端口检测里外部平台基本全是不可用，说明出站邮件连通性限制很明显。

&emsp;&emsp;这份数据没有 CPU、内存、磁盘跑分，因此这里只把它作为一次基础网络和 IP 质量记录。和 lowsla 荷兰 NAT 相比，它的回国延迟低很多，但可参考的数据维度更少。

### 原始融合怪结果

::: details 点击展开 net.txt
<<< ../../../otherdocs/vps测评数据/lowsla的日本东京NAT小杯机/net.txt
:::

## lowsla 荷兰阿姆斯特丹 NAT 小杯机

### 配置与线路

&emsp;&emsp;没测 CPU、内存、磁盘跑分。IP 数据库显示 `AS402349 Gatewaysentry LLC / Delaware City`，但路由里能看到 Amsterdam、Sharktech、GTT、NTT 等网络路径，NAT 机器本身也可能导致地理库判断比较混乱。

### 网络表现

&emsp;&emsp;回国延迟很高，广州电信、联通、移动基本都在 `240ms` 到 `260ms` 一带，移动还会绕美国/新加坡。路由距离和绕行对国内方向体验影响很明显。

### 测评

&emsp;&emsp;IP 质量很好：信任分 `100`，相关风险分数都是 `0`，DNS 黑名单 `0`。这台的主要特征是 IP 质量数据好、回国方向延迟高。

&emsp;&emsp;NAT 形态也会带来端口和网络使用限制。结合路由结果看，它不属于国内低延迟类型。

### 原始融合怪结果

::: details 点击展开 net.txt
<<< ../../../otherdocs/vps测评数据/lowsla的荷兰阿姆斯特丹NAT小杯机/net.txt
:::
