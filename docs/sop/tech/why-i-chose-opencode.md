---
title: 在 Codex 和 Claude Code 中我选择了 OpenCode
top: 0
date: 2026-07-12 20:00:00
descriptionHTML: '
<span style="color:var(--description-font-color);">多渠道多模型 vs 单渠道封闭，三个 AI 编程 Agent 的选择逻辑</span>
'
tags:
  - OpenCode
  - AI
  - 编程工具
sidebar: true
readingTime: true
hiddenCover: true
sticky: 0
hidden: false
recommend: true
---

# 在 Codex 和 Claude Code 中我选择了 OpenCode

<div align="center">

## 壹

</div>

&emsp;&emsp;AI 编程 Agent 这一年是真的卷。目前比较火的就三个：

- <span style="color: #1976d2;">OpenAI Codex</span>——开源，背靠 GPT 系列和 Response API，当然现在也能接第三方模型了
- <span style="color: #d32f2f;">Claude Code</span>——Anthropic 官方 CLI，闭源，深度绑定 Claude 模型
- <span style="color: #43a047;">OpenCode</span>——开源，多渠道多模型，想接谁接谁

&emsp;&emsp;但是我还是选择了opencode

<div align="center">

## 贰 · Codex：开源了，但渠道还是偏单一

</div>

&emsp;&emsp;先说 Codex。Codex 是开源的，不是什么封闭产品，这一点上它比 Claude Code 强太多了。

&emsp;&emsp;它最初的问题是<span style="color: #d32f2f;">渠道单一</span>，绑死了 OpenAI 的 Response API，你只能用 OpenAI 的模型。后来也支持接别的模型了，这是好事。但说实话，它的架构思路还是<span style="color: #1976d2;">以 OpenAI 渠道为主</span>去扩展的，第三方模型接入更像是"兼容层"补上去的，不是从底层就为多渠道设计的。实际用起来，模型切换的流畅度和配置灵活度，跟原生多渠道的工具比还是有差距。

&emsp;&emsp;不过如果你本来就是 OpenAI 重度用户，订阅了 ChatGPT Plus 或 Pro，Codex 用起来是真的顺——登录就能干活，不用折腾 API Key。加上它开源，你能看能改能自己部署，这点没得黑。<span style="color: #43a047;">开源 + 开箱即用</span>，这俩组合在一起已经比 Claude Code 强不少了。

<div align="center">

## 叁 · Claude Code：强是真的强，封闭也是真的封闭

</div>

&emsp;&emsp;Claude Code 的编程能力没得说，Claude 模型写代码确实顶，CLI 工具本身也做得不错。

&emsp;&emsp;但问题就一个字：<span style="color: #d32f2f;">封</span>。

&emsp;&emsp;它只认 Claude，换模型？适配不如claude好。用其他第三方 API？也需要去迎合Claude Code做适配。要想最好的体验就是 Anthropic 的模型、Anthropic 的 渠道、Anthropic 的定价，你没得选。

&emsp;&emsp;而且 Claude Code 本身是闭源的，你没法自己改、自己扩展、自己部署。天花板就是<span style="color: #1976d2;">Claude 的天花板</span>，价格就是 Anthropic 的价格。

&emsp;&emsp;不是说它不好用——单论"让 Claude 帮你写代码"这件事它做得很好。但你没有任何选择权，对于喜欢掌控自己工具链的人来说，这个就很难受。

<div align="center">

## 肆 · OpenCode：多渠道是底层的，不是补丁

</div>

&emsp;&emsp;OpenCode 吸引我的核心就一个词：<span style="color: #43a047;">多渠道</span>。

&emsp;&emsp;这不是"后来补的第三方模型支持"，是从架构层面就为多渠道多模型设计的。通过 Models.dev 支持 75+ 个 LLM 提供商，Claude、GPT、Gemini 都行，本地模型也行。同一个项目里，甚至同一个会话流里就能切模型——写核心逻辑用 Claude，写文档用 GPT，跑测试丢给本地小模型。

&emsp;&emsp;这意味着啥？意味着<span style="color: #1976d2;">你不被绑在任何一个模型上</span>。模型换代了不用换工具，某个 API 涨价了就切便宜的，某个模型干某件事更好就随时切过去。

&emsp;&emsp;再加上开源，16 万 GitHub Stars、900+ 贡献者，社区很活。自己改、自己扩展、自己部署，不存在被谁卡脖子。

&emsp;&emsp;还有几个实用功能：多会话并行（同一个项目起多个 Agent 同时跑）、分享链接（把会话直接丢给别人看）、GitHub Copilot 和 ChatGPT Plus/Pro 直接登录用——都是实际开发中真能提效的东西。

<div align="center">

## 伍 · Windows / macOS / Linux 的比喻

</div>

&emsp;&emsp;聊到这三个工具我老想到操作系统：

| 系统 | 对应工具 | 特点 |
|---|---|---|
| <span style="color: #1976d2;">Windows</span> | Codex | 用户最多，开源，开箱即用，默认体验绑 OpenAI 生态，省心但渠道偏单一 |
| <span style="color: #d32f2f;">macOS</span> | Claude Code | 闭源，体验精致性能强，但封闭生态价格高，认准了的人很喜欢，不认准的觉得被绑架 |
| <span style="color: #43a047;">Linux</span> | OpenCode | 纯开源，想怎么来怎么来，多渠道多模型想接谁接谁，但要你有动手能力 |

&emsp;&emsp;这个比喻虽然不完美，但是历史总是惊人的相似

&emsp;&emsp;<span style="color: #1976d2;">Windows</span>（Codex）用户最多，开源，打开就能用，就像大部分人装电脑就装 Windows 不是因为它最好而是因为它最省心。但默认体验绑 OpenAI 绑得深，渠道偏单一，自由度有但不像 Linux 那么彻底。适合本来就是 OpenAI 生态里的人——有订阅，登录就能干活，开源能改。

&emsp;&emsp;<span style="color: #d32f2f;">macOS</span>（Claude Code）就是封闭。体验确实精致，Claude 写代码确实强，但你只能用 Anthropic 的东西，就像 macOS 只能跑在 Apple 硬件上。认准了就没事，不认准就觉得被绑架。闭源，你没法自己改自己部署。

&emsp;&emsp;<span style="color: #43a047;">Linux</span>（OpenCode）纯开源，想怎么配怎么配，多渠道多模型随便接。就像用 Linux 的人不是不知道 Windows 和 macOS 的存在，是要的就是那份自由和可控。代价是你得花点时间折腾配置。

&emsp;&emsp;各有优缺点，没有绝对对错，问题只在于：<span style="color: #1976d2;">你是哪种用户</span>。

<div align="center">

## 陆 · 什么人适合什么工具

</div>

&emsp;&emsp;<span style="color: #1976d2;">选 Codex，如果：</span>你已经是 OpenAI 订阅用户，主要用 GPT 系列模型，不想折腾 API Key 和配置，要的是"打开就能干活"。开源这点是加分项，想改也能改。

&emsp;&emsp;<span style="color: #d32f2f;">选 Claude Code，如果：</span>你认准了 Claude 的代码能力，愿意为它付费，不需要多模型切换，更看重"这个特定模型写代码的表现"而不是"工具本身灵不灵活"。

&emsp;&emsp;<span style="color: #43a047;">选 OpenCode，如果：</span>你要多渠道多模型，想灵活切换，想接本地模型或第三方 API，偏好开源可控，不怕花点时间配置。

&emsp;&emsp;我是第三种。我经常需要在 Claude、Gemini、国产模型和本地模型之间切，有时候是成本考虑，有时候是能力考虑，有时候纯粹是某个 API 今天抽风了得有备胎。OpenCode 让我在一个工具里全搞定，不用装三个客户端来回切。

<div align="center">

## 柒 · 顺便推一下我的 OpenCode 主题

</div>

&emsp;&emsp;既然聊到 OpenCode，顺便推一下我自己做的主题：[opencode-theme-zzh](https://github.com/handsomezhuzhu/opencode-theme-zzh)。

&emsp;&emsp;OpenCode 本身支持自定义主题，我写了个自己顺眼的配色，如果你也在用 OpenCode，默认主题看腻了的话可以试试。

