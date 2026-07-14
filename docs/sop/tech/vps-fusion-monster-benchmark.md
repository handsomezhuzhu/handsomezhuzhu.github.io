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
| 不知名小厂香港月付 1.88 2C2G | 低价香港轻量入口 | 未测完整性能 | 很强 | 好 | 延迟漂亮，带宽明显卡在 30Mbps 左右，适合轻量服务 |
| Azure 免费 1C1G 日本 | 日区免费机/轻量服务 | 一般 | 中上 | 一般 | 联通和部分电信可用，磁盘很弱，适合低负载 |
| Google 永久免费美国 Oregon | 免费保号/干净 IP | 弱 | 一般 | 好 | CPU/IO 很弱，但 Google IP 相对干净 |
| Google 永久免费美国 Iowa | 免费保号/干净 IP | 弱 | 一般 | 好 | 和 Oregon 类似，免费自用可以，别指望性能 |
| DO 美国 1C0.5G | 海外节点/临时机 | 中等 | 弱 | 一般 | 本地测速好，回国体验差 |
| DO 加拿大 1C0.5G | 海外节点/临时机 | 中等 | 弱 | 差 | 盘不错，但 IP 质量和国内线路都不理想 |
| uzuma 加拿大 CAMT1.Small | 加拿大本地轻量服务/AI 解锁 | 未测完整性能 | 弱 | 一般偏差 | Leaseweb Montréal，AI 解锁不错，回国绕路，IP 检测结果分裂 |
| DO 澳大利亚 1C0.5G | 澳洲本地业务 | 强 | 很弱 | 差 | 跑分好看，国内方向基本不适合作主力 |
| lowsla 日本东京 NAT 小杯机 | NAT 低价日本轻量服务 | 未测完整性能 | 中上 | 一般 | 三网普通线路但延迟低，IP 不算脏，邮件端口外连基本全封 |
| lowsla 荷兰阿姆斯特丹 NAT 小杯机 | NAT 低价海外服务 | 未测完整性能 | 弱 | 好 | IP 干净、解锁强，但路由远，适合挂轻服务 |


## 不知名小厂香港月付 1.88 2C2G

### 配置与线路

&emsp;&emsp;没测 CPU、内存、磁盘跑分。IP 显示为香港 Tung Chung，服务商为 `AS206888 HanMing HK Limited`。三网回程里，上海/广州/成都电信识别到 `CN2GIA / CTGNET`，联通走 `4837`，移动部分走电信 `163`。

### 测评

&emsp;&emsp;服务商基本属于跑路了，只有所谓“自营”的香港在用。广州电信路由末端大约 10ms 级别，联通到深圳也能看到 10ms 左右，移动到深圳大约 17ms。

&emsp;&emsp;短板也很明显：测速基本在 28Mbps 左右，移动 Suzhou 下载只有 `0.53Mbps`，说明它更适合做轻量入口、小站、低并发代理或者备用管理节点，不适合跑大流量下载、图床、网盘分发。

### 原始融合怪结果

::: details 点击展开 net.txt
<<< ../../../otherdocs/vps测评数据/不知名小厂香港月付1.88 2-2小鸡/net.txt
:::

## Azure 免费 1C1G 日本小机

### 配置与性能

&emsp;&emsp;Azure 日本东京，`1C / 847MiB / 60.95GiB`，CPU 为 `Intel Xeon E5-2673 v4`，单核 sysbench `870`。内存读写还可以，但磁盘很弱，1GB 顺序读写大约 `56MB/s`，fio 1M 总读写也只有 `55MB/s` 左右。

### 网络与解锁

&emsp;&emsp;回程是普通线路：电信 `163`、联通 `4837`、移动 `CMI`。Speedtest 本地 `483Mbps` 上传、`1571Mbps` 下载；联通上海 5G 有 `208/273Mbps`，延迟 `33ms`，表现不错；电信 Suzhou 也能到 `85/129Mbps`，但浙江电信和移动 Suzhou 明显拉胯。

&emsp;&emsp;流媒体和 AI 平台方面，ChatGPT、Claude、Gemini、Sora 均为日本区可用，Netflix 不可用。IP 质量一般，信任分 `33`，Google 搜索可行性为 `NO`。

### 测评

&emsp;&emsp;这台适合免费轻量自用：探针、小型 API、反代管理面板、低频任务都可以。它的问题主要在磁盘和线路稳定性，不建议放数据库、搜索服务、频繁编译任务，也不适合作移动方向主力节点。

### 原始融合怪结果

::: details 点击展开 all.txt
<<< ../../../otherdocs/vps测评数据/Azure免费1-1日本小机/all.txt
:::

## Google 永久免费美国 Iowa

### 配置与性能

&emsp;&emsp;Google Iowa，`2C / 970MiB / 29.30GiB`，CPU 显示 `Intel Xeon @ 2.20GHz`。单核 `469`，双线程反而只有 `229`，这类免费实例的 CPU 额度和调度限制很明显。内存读写也偏低，fio 4K 只有 KB/s 级，磁盘小文件性能很弱。

### 网络与解锁

&emsp;&emsp;本地 Speedtest 下载能到 `3214Mbps`，但这不代表国内体验。国内方向里，上海联通 5G `51/129Mbps`、苏州电信 `65/97Mbps` 还算能看，移动 Suzhou 基本不可用。流媒体/AI 解锁不错，ChatGPT、Claude、Gemini、Sora、TikTok US 都可用，Netflix 不可用。

&emsp;&emsp;IP 质量是这台的亮点：欺诈分 `0`，代理/VPN 判断为否，ASN 滥用分低，黑名单记录也比较干净。

### 测评

&emsp;&emsp;它不是性能机器，是免费、干净、能长期放着的工具机。适合轻量自用、计划任务、状态页、低流量 API，不适合数据库、编译、爬虫高并发或者国内访问主力。

### 原始融合怪结果

::: details 点击展开 all.txt
<<< ../../../otherdocs/vps测评数据/Google永久免费小鸡美国Lowa/all.txt
:::

## Google 永久免费美国 Oregon

### 配置与性能

&emsp;&emsp;Google Oregon，`2C / 958MiB / 28.89GiB`，CPU 单核只有 `175`，双线程 `191`，是这批里面 CPU 表现最弱的一档。磁盘同样是免费机味道，4K fio 只有几百 KB/s，1M 总读写约 `76MB/s`。

### 网络与解锁

&emsp;&emsp;本地 Speedtest `301/651Mbps`，国内方向比跑分好看一点：上海联通 5G `58/116Mbps`，苏州电信 `75/92Mbps`，浙江电信下载 `38Mbps`，移动方向依旧不行。ChatGPT、Claude、Gemini、Sora、TikTok US 可用，Netflix 不可用。

&emsp;&emsp;IP 质量同样比较舒服：欺诈分 `0`，代理/VPN 判断为否，ASN 滥用分低。

### 测评

&emsp;&emsp;Oregon 比 Iowa 更像一台“能挂着就行”的免费机。它的国内可用性不算差，但 CPU 和 IO 太弱，实际体验更适合低频任务。需要稳定响应的网站或服务，建议加缓存、少写盘。

### 原始融合怪结果

::: details 点击展开 all.txt
<<< ../../../otherdocs/vps测评数据/Google永久免费小鸡美国Oregon/all.txt
:::

## DO 美国 1C0.5G

### 配置与性能

&emsp;&emsp;DigitalOcean 美国 New Jersey，`1C / 458MiB / 8.65GiB`，CPU 单核 `732`。磁盘比免费 Google 强很多，fio 1M 总读写 `743MB/s`，本地 Speedtest `1072/3893Mbps`。

### 网络与解锁

&emsp;&emsp;回程主要是电信 `163`、联通 `4837`、移动 `CMI`，但延迟高：广州电信约 `250ms`，联通约 `280ms`，移动约 `240ms`。国内测速里联通上海 5G `19/60Mbps`，电信浙江 `1/8Mbps`，移动 Suzhou 下载只有 `0.02Mbps`。

&emsp;&emsp;AI 和流媒体方面，ChatGPT、Claude、Gemini、Sora、TikTok US 可用，Netflix 不可用。IP 质量中等偏一般，Google 搜索可行性为 `NO`。

### 测评

&emsp;&emsp;这台适合北美本地业务、临时测试、海外服务部署，不适合做国内访问入口。它的硬盘和本地带宽比免费机强，但回国线路会把体验拖下来。

### 原始融合怪结果

::: details 点击展开 all.txt
<<< ../../../otherdocs/vps测评数据/DO-美国 1-0.5/all.txt
:::

## DO 加拿大 1C0.5G

### 配置与性能

&emsp;&emsp;DigitalOcean 加拿大 Toronto，`1C / 458MiB / 8.65GiB`，CPU 单核 `944`，磁盘表现不错，fio 1M 总读写 `931MB/s`，4K 总 IOPS 也远强于 Google 免费机。

### 网络与解锁

&emsp;&emsp;回国普通线路，广州方向电信约 `220ms`，联通接近 `270ms`，移动约 `220ms`。国内测速里联通上海 5G `19/63Mbps`，苏州电信 `23/76Mbps`，移动 Suzhou 下载为 `0Mbps`。

&emsp;&emsp;IP 质量是短板：信任分 `18`，欺诈分 `100`，社区恶意记录、DNS 黑名单也比其它干净机更多。ChatGPT、Claude、Gemini、Sora 可用，Netflix 不可用。

### 测评

&emsp;&emsp;它是一台性能还行但 IP 和线路都不讨喜的小鸡。拿来做加拿大本地测试可以，做长期账号业务、搜索、注册、国内入口都不太合适。

### 原始融合怪结果

::: details 点击展开 all.txt
<<< ../../../otherdocs/vps测评数据/DO-加拿大 1-0.5/all.txt
:::

## uzuma 加拿大 CAMT1.Small

### 配置与线路

&emsp;&emsp;只测了网络、IP 质量和解锁。IP 和 ASN 显示为加拿大 Montréal，服务商为 `AS32613 Leaseweb Canada Inc.`。回程识别上，电信多为 `163` 普通线路，广州移动为 `CMI`，北京移动能看到 `CMIN2`，但不少联通/移动目标检测不到回程节点，需要以详细路由为准。

### 网络与解锁

&emsp;&emsp;广州电信经 Cogent 绕到欧洲再回国，末端约 `245ms`；广州联通绕北美到洛杉矶再进 `4837`，深圳末端约 `252ms`；广州移动经 Cogent/CMI 到香港再进广州，约 `260ms`。整体就是普通北美海外机的回国体验，不适合当国内主力入口。

&emsp;&emsp;解锁方面，ChatGPT、Claude、Gemini、Sora、MetaAI、TikTok、Amazon Prime Video 都是加拿大区可用；Netflix、Disney+、Reddit、Wikipedia 编辑不可用，YouTube Region/CDN 也没有正常识别。

### 测评

&emsp;&emsp;IP 质量比较矛盾：信任分 `98`，VPN/代理分 `0`，滥用分 `0`，但欺诈分 `100`，DNS 黑名单有 `10` 条，Google 搜索可行性为 `NO`。它更适合加拿大本地轻量服务、探针、临时反代，或者对 AI 平台有加拿大区需求的用途。

&emsp;&emsp;如果是注册、搜索、邮件、国内访问入口，不建议把它当主力。尤其是邮件方向，端口检测虽然不算全封，但结合黑名单和 Google 搜索不可用，实际风险偏高。

### 原始融合怪结果

::: details 点击展开 net.txt
<<< ../../../otherdocs/vps测评数据/uzuma加拿大CAMT1.Small/net.txt
:::

## DO 澳大利亚 1C0.5G

### 配置与性能

&emsp;&emsp;DigitalOcean 澳大利亚 Sydney，`1C / 458MiB / 8.65GiB`，CPU 单核 `2029`，是这批完整跑分里最强的。磁盘也很强，fio 1M 总读写约 `1.28GB/s`，本地 Speedtest 下载到 `5476Mbps`。

### 网络与解锁

&emsp;&emsp;问题是回国很难看：广州电信约 `280ms`，联通绕得更夸张，移动约 `160ms` 但实际测速不行。联通上海 5G 上传只有 `0.12Mbps`，苏州电信和移动 Suzhou 基本接近不可用。

&emsp;&emsp;IP 质量也不理想，欺诈分 `100`，ASN/公司滥用分高，Google 搜索可行性为 `NO`。AI 平台可用，Netflix 不可用。

### 测评

&emsp;&emsp;这台很典型：本地性能漂亮，国内体验不漂亮。适合澳洲本地服务、海外测速、临时编译或区域测试，不建议拿来面向国内用户。

### 原始融合怪结果

::: details 点击展开 all.txt
<<< ../../../otherdocs/vps测评数据/DO-澳大利亚 1-0.5/all.txt
:::

## lowsla 日本东京 NAT 小杯机

### 配置与线路

&emsp;&emsp;这台只测了网络和 IP 质量。IP 显示为日本 Ebara/Tokyo，服务商为 `AS979 NetLab Global`。回程识别很规整：电信 `163`、联通 `4837`、移动 `CMI`，都属于普通线路。

### 网络与解锁

&emsp;&emsp;虽然不是精品线路，但日本东京位置比较近，回国延迟比欧美机器好很多。广州电信经香港回国到深圳约 `55ms`，广州联通经东京 CUG 到上海再到华南，末端约 `80ms`，广州移动经东京 CMI 到广州，末端约 `66ms`。用作国内访问入口时，延迟可用，但线路等级和 NAT 形态决定了它不适合高稳定性业务。

### 测评

&emsp;&emsp;IP 质量中等：信任分 `98`，滥用分 `0`，DNS 黑名单首段检测为 `0` 条，但欺诈分 `65`，Google 搜索可行性为 `NO`。邮件端口检测里外部平台基本全是不可用，明显不适合发信或邮件相关业务。

&emsp;&emsp;这台更适合低成本日本轻量节点、探针、反代、小流量服务，或者需要日本落地但不强依赖原生解锁的场景。和 lowsla 荷兰 NAT 相比，它的回国延迟好很多，但 IP 质量和解锁想象空间更小。

### 原始融合怪结果

::: details 点击展开 net.txt
<<< ../../../otherdocs/vps测评数据/lowsla的日本东京NAT小杯机/net.txt
:::

## lowsla 荷兰阿姆斯特丹 NAT 小杯机

### 配置与线路

&emsp;&emsp;没测 CPU、内存、磁盘跑分。IP 数据库显示 `AS402349 Gatewaysentry LLC / Delaware City`，但路由里能看到 Amsterdam、Sharktech、GTT、NTT 等节点，NAT 机器本身也可能导致地理库判断比较混乱。

### 网络与解锁

&emsp;&emsp;回国延迟很高，广州电信、联通、移动基本都在 `240ms` 到 `260ms` 一带，移动还会绕美国/新加坡。不过补测的解锁结果很好：ChatGPT、Claude、Gemini、Sora、TikTok US 都可用，Netflix、Disney+、Dazn、Amazon Prime Video 均为 US 原生，Reddit 和 Wikipedia 编辑也可用，YouTube 为原生 US。

### 测评

&emsp;&emsp;IP 质量很好：信任分 `100`，VPN/代理/威胁分都是 `0`，DNS 黑名单 `0`。这台更像是低价解锁/挂服务机器，而不是国内方向节点。

&emsp;&emsp;这类 NAT 小杯机适合挂低成本服务、探针、定时任务、IPv6/端口转发玩法，不适合需要国内低延迟或固定大端口的业务。

### 原始融合怪结果

::: details 点击展开 net.txt
<<< ../../../otherdocs/vps测评数据/lowsla的荷兰阿姆斯特丹NAT小杯机/net.txt
:::

::: details 点击展开 unlock.txt
<<< ../../../otherdocs/vps测评数据/lowsla的荷兰阿姆斯特丹NAT小杯机/unlock.txt
:::
