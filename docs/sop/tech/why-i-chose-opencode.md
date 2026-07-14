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

## 壹 · 三个选手

</div>

&emsp;&emsp;AI 编程 Agent 这一年彻底卷起来了。现在你站在十字路口，面前是三个主要选手：

- <span style="color: #1976d2;">OpenAI Codex</span>——背靠 GPT 系列和 Response API，现在也开放了第三方模型接入
- <span style="color: #d32f2f;">Claude Code</span>——Anthropic 的官方 CLI，深度绑定 Claude 模型
- <span style="color: #43a047;">OpenCode</span>——开源，多渠道多模型，你想接谁接谁

&emsp;&emsp;我用了一圈下来，最后留在了 OpenCode。这篇文章不是拉踩，而是讲清楚我选择它的逻辑，以及我认为什么人适合什么工具。

<div align="center">

## 贰 · Codex：从封闭走向半开放

</div>

&emsp;&emsp;Codex 最初的问题很明确：<span style="color: #d32f2f;">单一渠道</span>。它绑死了 OpenAI 的 Response API，你只能用 OpenAI 的模型。这意味着如果你的使用场景需要在不同模型之间切换——比如写代码用 Claude、做总结用 GPT、查文档用 Gemini——Codex 没法在一个工作流里搞定。

&emsp;&emsp;后来 Codex 也支持接入别的模型了，这是一个进步。但它的架构思路仍然是<span style="color: #1976d2;">以单一渠道为主</span>去扩展的，第三方模型接入更像是"兼容层"，而不是从底层就为多渠道设计的。实际用起来，模型切换的流畅度和配置灵活性和原生多渠道的工具还是有差距。

&emsp;&emsp;当然，如果你本来就是 OpenAI 重度用户，订阅了 ChatGPT Plus 或 Pro，Codex 用起来是很顺的——登录就能用，不用折腾 API Key。这是它的优势：<span style="color: #43a047;">开箱即用，生态封闭但体验统一</span>。

<div align="center">

## 叁 · Claude Code：强大但封闭

</div>

&emsp;&emsp;Claude Code 的编程能力是有目共睹的。Claude 模型在代码理解和生成上的表现确实强，Claude Code 把这个能力包装成了一个不错的 CLI 工具。

&emsp;&emsp;但问题在于<span style="color: #d32f2f;">封闭</span>。它只认 Claude，你想换模型？没有这个选项。你想接本地模型？不行。你想用硅基流动或者其他第三方 API？也不行。它就是 Anthropic 的模型，Anthropic 的 API，Anthropic 的定价。

&emsp;&emsp;这不是说它不好用——恰恰相反，单论"让 Claude 帮你写代码"这件事，Claude Code 做得很好。但它的天花板就是<span style="color: #1976d2;">Claude 的天花板</span>，它的价格就是 Anthropic 的价格。你没有选择权。

&emsp;&emsp;而且 Claude Code 本身不是开源的，你没法自己改、自己扩展、自己部署。对于喜欢掌控自己工具链的人来说，这是一个硬伤。

<div align="center">

## 肆 · OpenCode：多渠道是底层设计，不是补丁

</div>

&emsp;&emsp;OpenCode 吸引我的核心就一个词：<span style="color: #43a047;">多渠道</span>。

&emsp;&emsp;这不是"后来加的第三方模型支持"，而是从架构层面就是为多渠道多模型设计的。通过 Models.dev 它支持 75+ 个 LLM 提供商，包括 Claude、GPT、Gemini，也包括本地模型。你可以在同一个项目里，甚至同一个会话流里切换不同模型——写核心逻辑用 Claude，写文档用 GPT，跑测试用本地小模型。

&emsp;&emsp;这意味着什么？意味着<span style="color: #1976d2;">你不是被绑在某一个模型上</span>。模型更新换代的时候，你不用换工具；某个 API 涨价的时候，你可以切到便宜的；某个模型在特定任务上更好的时候，你可以随时切过去。

&emsp;&emsp;再加上它是开源的，有 16 万 GitHub Stars、900+ 贡献者，社区活跃度非常高。你可以自己改、自己扩展、自己部署，不存在被某个公司卡脖子的问题。

&emsp;&emsp;还有几个实用功能值得一提：多会话并行（同一个项目起多个 Agent 同时跑）、分享链接（把某个会话直接分享给别人看）、GitHub Copilot 和 ChatGPT Plus/Pro 直接登录用——这些都是在实际开发中真的能提升效率的东西。

<div align="center">

## 伍 · Windows / macOS / Linux 的比喻

</div>

&emsp;&emsp;聊到这三个工具的时候，我经常想到操作系统：

| 操作系统 | 对应工具 | 特点 |
|---|---|---|
| <span style="color: #1976d2;">Windows</span> | Codex | 用户最多，生态封闭但体验统一，开箱即用，你不用折腾但也没多少自由 |
| <span style="color: #d32f2f;">macOS</span> | Claude Code | 体验精致，性能强悍，但硬件绑定、价格高昂、封闭生态，喜欢它的人很喜欢，不喜欢的人觉得被绑架 |
| <span style="color: #43a047;">Linux</span> | OpenCode | 开源自由，想怎么配怎么配，多渠道多模型想接谁接谁，但需要你有动手能力 |

&emsp;&emsp;这个比喻不是完美映射，但逻辑是通的：

&emsp;&emsp;<span style="color: #1976d2;">Windows</span>（Codex）适合大多数人——你不想折腾，你已经有 OpenAI 订阅，你登录就能用，生态是封闭的但够用。就像大部分人买电脑就装 Windows，不是因为它是最好的，而是因为它最省心。

&emsp;&emsp;<span style="color: #d32f2f;">macOS</span>（Claude Code）适合"认准了 Claude 就好"的人——你信 Claude 的代码能力，你愿意为它付费，你不介意只能用它。就像买 Mac 的人，认准了 macOS 的体验，愿意接受硬件溢价和封闭生态。

&emsp;&emsp;<span style="color: #43a047;">Linux</span>（OpenCode）适合想要掌控自己工具链的人——你想多模型切换，你想用本地模型，你想开源可改，你不怕花点时间配置。就像用 Linux 的人，不是因为他们不知道 Windows 和 macOS 的存在，而是因为他们要的就是那份自由和可控。

&emsp;&emsp;各有优缺点，没有绝对的对错。问题只在于：<span style="color: #1976d2;">你是哪种用户</span>。

<div align="center">

## 陆 · 什么人适合什么工具

</div>

&emsp;&emsp;最后给一个明确的建议：

&emsp;&emsp;<span style="color: #1976d2;">选 Codex，如果：</span>你已经是 OpenAI 订阅用户，你主要用 GPT 系列模型，你不想折腾 API Key 和配置，你需要的是"打开就能干活"。

&emsp;&emsp;<span style="color: #d32f2f;">选 Claude Code，如果：</span>你对 Claude 的代码能力有强需求，你愿意为单一模型付费，你不需要多模型切换，你更看重"这个特定模型在编程任务上的表现"而不是"工具本身的灵活性"。

&emsp;&emsp;<span style="color: #43a047;">选 OpenCode，如果：</span>你需要多渠道多模型，你想在不同模型之间灵活切换，你想接本地模型或者第三方 API，你偏好开源可控的工具，你不介意花点时间做配置。

&emsp;&emsp;我属于第三种。我的使用场景经常需要在 Claude、Gemini、国产模型和本地模型之间切换，有时候是成本考虑，有时候是能力考虑，有时候纯粹是某个模型的 API 今天抽风了需要备用。OpenCode 让我在一个工具里搞定所有这些，而不是装三个客户端来回切。

<div align="center">

## 捌 · 顺便推一下我的 OpenCode 主题

</div>

&emsp;&emsp;既然聊到 OpenCode，顺便推一下我自己做的 OpenCode 主题：[opencode-theme-zzh](https://github.com/handsomezhuzhu/opencode-theme-zzh)。

&emsp;&emsp;OpenCode 本身支持自定义主题，我写了一个自己喜欢的配色方案，如果你也在用 OpenCode，觉得默认主题看腻了，可以试试。

&emsp;&emsp;仓库里有安装说明，几步就能换上。

<div align="center">

#### 写于 2026 年 7 月

</div>
