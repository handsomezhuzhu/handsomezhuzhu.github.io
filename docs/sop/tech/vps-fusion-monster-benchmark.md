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
| 不知名小厂香港月付 1.88 2C2G（已倒闭） | 低价香港轻量入口 | 未测完整性能 | 很强 | 好 | 延迟漂亮，带宽明显卡在 30Mbps 左右，适合轻量服务，服务商已跑路 |
| WAWO 香港年付 39 1C0.5G | 低价香港解锁/挂服务机 | 弱 | 中上偏弱 | 好 | 移动 CMIN2 低延迟，IP 干净解锁好，电信联通绕远，性能弱 |
| ZOUTER 香港月付 9.9 1C1G | 香港高性能解锁机 | 强 | 中等偏差 | 一般 | 性能和解锁覆盖都强，电信联通绕美国，只有移动方向延迟可用 |
| Azure 免费 1C1G 日本 | 日区免费机/轻量服务 | 一般 | 中上 | 一般 | 联通和部分电信可用，磁盘很弱，适合低负载 |
| Google 永久免费美国 Oregon | 免费保号/干净 IP | 弱 | 一般 | 好 | CPU/IO 很弱，但 Google IP 相对干净 |
| Google 永久免费美国 Iowa | 免费保号/干净 IP | 弱 | 一般 | 好 | 和 Oregon 类似，免费自用可以，别指望性能 |
| DO 美国 1C0.5G | 海外节点/临时机 | 中等 | 弱 | 一般 | 本地测速好，回国体验差 |
| Cloudnium 美国月付 3 2C2G | 美国本地轻量/解锁挂机 | 中等 | 弱 | 一般 | 配置和解锁都不错，回国普通线路延迟高，移动方向基本不可用 |
| Raksmart 美国 4837 月付 14 2C4G | 美国 4837 回国节点/解锁机 | 中等偏上 | 中等 | 一般 | 三网全走 4837，联通方向体验最好，适合联通用户做回国节点或解锁 |
| DO 加拿大 1C0.5G | 海外节点/临时机 | 中等 | 弱 | 差 | 盘不错，但 IP 质量和国内线路都不理想 |
| uzuma 加拿大 CAMT1.Small | 加拿大本地轻量服务/AI 解锁 | 未测完整性能 | 弱 | 一般偏差 | Leaseweb Montréal，AI 解锁不错，回国绕路，IP 检测结果分裂 |
| DO 澳大利亚 1C0.5G | 澳洲本地业务 | 强 | 很弱 | 差 | 跑分好看，国内方向基本不适合作主力 |
| lowsla 日本东京 NAT 小杯机 | NAT 低价日本轻量服务 | 未测完整性能 | 中上 | 一般 | 三网普通线路但延迟低，IP 不算脏，邮件端口外连基本全封 |
| lowsla 荷兰阿姆斯特丹 NAT 小杯机 | NAT 低价海外服务 | 未测完整性能 | 弱 | 好 | IP 干净、解锁强，但路由远，适合挂轻服务 |


## 不知名小厂香港月付 1.88 2C2G（已倒闭）

### 配置与线路

&emsp;&emsp;没测 CPU、内存、磁盘跑分。IP 显示为香港 Tung Chung，服务商为 `AS206888 HanMing HK Limited`。三网回程里，上海/广州/成都电信识别到 `CN2GIA / CTGNET`，联通走 `4837`，移动部分走电信 `163`。

### 测评

&emsp;&emsp;服务商基本属于跑路了，只有所谓“自营”的香港在用。广州电信路由末端大约 10ms 级别，联通到深圳也能看到 10ms 左右，移动到深圳大约 17ms。

&emsp;&emsp;短板也很明显：测速基本在 28Mbps 左右，移动 Suzhou 下载只有 `0.53Mbps`，说明它更适合做轻量入口、小站、低并发代理或者备用管理节点，不适合跑大流量下载、图床、网盘分发。

### 原始融合怪结果

::: details 点击展开 net.txt
<<< ../../../otherdocs/vps测评数据/不知名小厂（已倒闭）香港月付1.88 2-2小鸡/net.txt
:::

## WAWO 香港年付 39 1C0.5G

### 配置与性能

&emsp;&emsp;WAWO 香港，`1C / 458MiB / 3.80GiB`，CPU 为 `Intel Xeon E3-12xx v2`，单核 sysbench `307`，是这批里 CPU 最弱的一档。内存只有 `458MiB`，读写约 `5964/5521MB/s`。磁盘 fio 测试失败，1GB dd 写入约 `449MB/s`，小盘机器特征明显。

### 网络与解锁

&emsp;&emsp;回程是混合线路：电信北京/成都走 `CTGNET` 精品线路，广州电信识别到 `CN2GT / CTGNET / 163`；联通走 `4837` 普通线路；移动同时识别到 `CMI` 普通和 `CMIN2` 精品。本地 Speedtest `152/1025Mbps`，香港本地 `117/995Mbps`，但国内方向反差大：广州移动经 CMIN2 直连约 `16ms`，广州电信却要经香港 CN2 绕回广州约 `163ms`，广州联通经 CUG 绕回约 `175ms`，电信浙江下载甚至只有 `0.79Mbps`。

&emsp;&emsp;解锁方面表现不错：Netflix、Disney+、Amazon Prime、YouTube 均为原生（Netflix/Disney 标 NL/HK 区），TikTok ALISG，Wikipedia 可编辑；Claude 香港区不可用，Sora 被识别 VPN 拦截，ChatGPT 仅移动 APP 可用。IP 质量很好：信任分 `100`，VPN/代理分 `0`，欺诈分 `0`，DNS 黑名单 `0`。

### 测评

&emsp;&emsp;这台的关键矛盾在路由：标称香港，但电信和联通回国都绕远，只有移动走 CMIN2 延迟低。配合很弱的 CPU 和内存，它更适合做移动方向的低成本解锁/挂服务机，或者对 IP 干净度有要求的轻量入口，不适合做电信联通主力节点或高负载服务。

### 原始融合怪结果

::: details 点击展开 Y4IOR.txt
<<< ../../../otherdocs/vps测评数据/WAWO香港年付39 1-0.5/Y4IOR.txt
:::

## ZOUTER 香港月付 9.9 1C1G

### 配置与性能

&emsp;&emsp;ZOUTER 香港 Kwai Chung，`1C / 709MiB / 9.74GiB`，CPU 为 `AMD EPYC 7763`，单核 sysbench `3480`，是这批完整跑分里最强的。内存读写约 `38783/22553MB/s`，磁盘也很强，1GB dd 读写约 `1.1/1.2GB/s`，fio 1M 总读写 `2.13GB/s`。

### 网络与解锁

&emsp;&emsp;回程整体普通：电信广州走 `联通4837 + 163`，联通走 `4837`，移动走 `CMI`。问题是路由绕得很狠：广州电信先经 sakura.as 绕到美国洛杉矶再进 `4837` 回国，末端约 `229ms`；广州联通经 PCCW/Lumen 绕到洛杉矶再进 `4837`，末端约 `258ms`；只有广州移动经 PCCW/CMI 直连，末端约 `49ms`。国内测速里移动 Suzhou 下载 `63Mbps` 但上传 `0.73Mbps`，电信浙江 `10/5Mbps`，联通方向也很弱。

&emsp;&emsp;解锁覆盖很广但多数走 Via DNS：Netflix、Disney+、TikTok、Spotify、ParamountPlus 均为 HK 区（Via DNS），YouTube HK 原生，ChatGPT JP（Via DNS），Wikipedia 可编辑；Claude、Grok、Sora 被封，Reddit、KOCOWA 不可用。IP 质量一般：信任分 `34`，VPN 分 `99`，欺诈分 `0`，DNS 黑名单 `8` 条。

### 测评

&emsp;&emsp;典型的"本地性能漂亮、国内方向瘸腿"。CPU 和磁盘跑分很强，解锁覆盖广，但电信联通绕美国回国延迟很高，只有移动方向延迟可用。适合需要高性能 + 香港解锁的场景，不适合做电信联通方向的国内入口。

### 原始融合怪结果

::: details 点击展开 KEtDJ.txt
<<< ../../../otherdocs/vps测评数据/ZOUTER香港月付9.9 1-1/KEtDJ.txt
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

## Cloudnium 美国月付 3 2C2G

### 配置与性能

&emsp;&emsp;Cloudnium 美国纽约州布法罗，`2C / 1.92GiB / 18.33GiB`，CPU 为 `Intel Xeon E5-2699 v4`，单核 `679`，多核 `767`。内存读写约 `14043/10396MB/s`。磁盘表现分裂：1GB dd 读写能到 `2.0/1.8GB/s`，但 fio 1M 总读写只有 `77.68MB/s`，小块随机性能一般。

### 网络与解锁

&emsp;&emsp;三网回程都是普通线路：电信 `163`、联通 `4837`、移动 `CMI`，IPv6 才能看到上海/广州电信 `CN2GIA` 和移动 `CMIN2` 精品线路。广州电信经 Cogent 横穿美国到洛杉矶再回国，末端约 `225ms`；广州联通经 Arelion 绕到洛杉矶进 `4837`，约 `269ms`；广州移动经 Arelion/CMI 到香港再进广州，约 `252ms`。国内测速联通上海 5G `4.75/33.30Mbps`，电信 Suzhou 5G `4.61/37.41Mbps`，移动 Suzhou 下载只有 `0.14Mbps`。

&emsp;&emsp;解锁不错：ChatGPT、Gemini、Grok、MetaAI、Microsoft Copilot、Sora、TikTok 均为 US 原生，Amazon Prime、Apple、YouTube、Netflix CDN 也都 US 可用，Netflix 仅 Originals；Claude、Mistral、Perplexity 被 WAF 拦，Disney+、Reddit、Wikipedia 不可用。IP 质量一般：信任分 `33`，欺诈分 `65`，滥用分 `0`，ASN 滥用分偏高。

### 测评

&emsp;&emsp;配置够用、解锁覆盖主流 AI/流媒体，但回国全是普通线路，延迟高、移动方向基本不可用。它更像一台北美本地轻量机或解锁挂机机，不适合做国内访问入口。

### 原始融合怪结果

::: details 点击展开 Qnjji.txt
<<< ../../../otherdocs/vps测评数据/Cloudnium美国月付3 2-2/Qnjji.txt
:::

## Raksmart 美国 4837 月付 14 2C4G

### 配置与性能

&emsp;&emsp;Raksmart 美国圣何塞，`2C / 3.81GiB / 48.29GiB`，CPU 为 Intel Broadwell，单核 `761`，多核 `1466`。内存读写约 `16301/10505MB/s`。磁盘表现中等，fio 1M 总读写 `409MB/s`，4K 总 IOPS `10k`。

### 网络与解锁

&emsp;&emsp;这台最特别的是回程：三网全部走 `联通4837` 普通线路，包括电信和移动目标也是经 4837 再转交。广州电信经 4837 到广州再转电信，末端约 `185ms`；广州联通约 `201ms`；广州移动经 4837 到广州再转移动，约 `205ms`。国内测速里联通 Beijing `77/69Mbps` 表现最好，电信浙江 `22/36Mbps`，移动 Suzhou 下载只有 `0.13Mbps`。

&emsp;&emsp;解锁不错：ChatGPT、Gemini、Microsoft Copilot、Perplexity AI、Sora、TikTok 均为 US 原生，Amazon Prime、Apple、YouTube、Netflix CDN 也都 US 可用，Netflix 仅 Originals；Claude、Grok、Mistral 被 WAF 拦，Disney+、Reddit、Wikipedia 不可用。IP 质量一般：信任分 `33`，欺诈分 `65`，DNS 黑名单 `7` 条。

### 测评

&emsp;&emsp;全 4837 回程让它对联通用户最友好，电信方向延迟也能接受，移动方向基本不可用。适合联通用户做回国节点、轻量服务，或对 4837 线路有偏好的解锁机，不适合移动用户或对 IP 信誉要求高的业务。

### 原始融合怪结果

::: details 点击展开 ceUET.txt
<<< ../../../otherdocs/vps测评数据/Raksmart美国4837 月付14 2-4/ceUET.txt
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
