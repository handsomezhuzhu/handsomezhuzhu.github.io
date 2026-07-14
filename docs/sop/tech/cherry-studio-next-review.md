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

## 壹 · 先说结论

</div>

&emsp;&emsp;前段时间拿到了 Cherry Studio Next 的内测资格，也就是 v2 版本。用了一阵子之后，想认真聊聊这次升级，以及我对 Cherry Studio 这个产品本身的一些看法。

&emsp;&emsp;先说结论：v2 不是一次简单的版本迭代，而是从"AI 对话客户端"到"AI 工作站"的身份确认。UI 重做了，交互逻辑理顺了，Agent 被真正融入了产品骨架里。如果你之前觉得 Cherry Studio 只是一个套壳聊天器，Next 会改变你的看法。

<div align="center">

## 贰 · UI：从"能用"到"好用"

</div>

&emsp;&emsp;v1 的界面说实话谈不上丑，但总觉得是个"功能堆砌"的产物——东西都在，但哪里都显得拥挤。Next 的 UI 重做是肉眼可见的：

&emsp;&emsp;首先是<span style="color: #1976d2;">信息层级</span>清楚了。侧边栏、对话区、设置面板的主次关系终于不再打架，你能一眼分辨出"我现在在哪里"和"我该去哪里找东西"。v1 的时候找一个设置项经常要在多层折叠菜单里翻，现在导航逻辑扁平了很多。

&emsp;&emsp;其次是<span style="color: #43a047;">视觉密度</span>降下来了。不是功能少了，而是留白和分组更合理。对话界面的消息气泡、代码块、引用区块的样式都重新设计过，长时间阅读不容易累了。

&emsp;&emsp;最后是一些细节：<span style="color: #d32f2f;">暗色模式</span>不再是简单反色，配色是单独调过的；窗口拖拽和响应式布局也比 v1 顺滑不少。

<div align="center">

## 叁 · 交互逻辑：终于像一个整体了

</div>

&emsp;&emsp;v1 的问题是每个功能都像独立模块拼上去的——知识库是知识库，绘图是绘图，联网是联网，彼此之间没什么联动。Next 最让我惊喜的不是新增了什么功能，而是<span style="color: #1976d2;">交互逻辑打通了</span>。

&emsp;&emsp;举个例子：在 v1 里你想"用知识库 + 联网搜索 + 绘图"完成一个任务，需要在好几个面板之间切换，手动串联。Next 里这些能力被收敛到对话流里，你可以在一个会话里自然地调度它们，而不是在功能模块之间反复横跳。

&emsp;&emsp;这种变化乍一看不起眼，但实际用起来效率差距很大。v1 是"我去找工具"，Next 是"工具在对话里就位"。

<div align="center">

## 肆 · Agent：从插件到骨架

</div>

&emsp;&emsp;Next 最大的架构级变化是 Agent 的融入。v1 时代也有类似的东西，但更像是"高级预设"——一组系统提示词加上几个工具开关。Next 把 Agent 做成了产品骨架的一部分：

&emsp;&emsp;Agent 不再是对话的附属品，而是可以独立配置、独立调用、甚至跨会话复用的<span style="color: #43a047;">执行单元</span>。你可以给一个 Agent 绑定特定的模型、知识库、工具集和 MCP 服务，然后在需要的时候直接调用它，不用每次重新组装。

&emsp;&emsp;这意味着 Cherry Studio 不再只是一个"你和模型对话"的中间层，而是变成了"你调度多个 AI 能力完成工作"的<span style="color: #1976d2;">编排平台</span>。

<div align="center">

## 伍 · 为什么"臃肿"不是它的错

</div>

&emsp;&emsp;每次聊到 Cherry Studio，评论区总会出现一个词：<span style="color: #d32f2f;">臃肿</span>。功能太多、上手太难、普通用户用不到那么多东西……这些说法我理解，但我不同意用"臃肿"去批判它。

&emsp;&emsp;原因很简单：它叫 Cherry <span style="color: #1976d2;">Studio</span>，不叫 Cherry Chat。Studio 的意思是工作室、工作站。它的产品目标从来不是做一个极简的聊天客户端，而是做一个能覆盖 <span style="color: #43a047;">99% AI 使用场景</span>的集成环境。

&emsp;&emsp;你想想一个 Studio 应该有什么：

- <span style="color: #1976d2;">知识库</span>——本地向量化的文档检索，带引用溯源
- <span style="color: #1976d2;">Agent 接入</span>——可编排、可复用的执行单元
- <span style="color: #1976d2;">全渠道全接口兼容</span>——OpenAI、Anthropic、Google、硅基流动、Ollama……主流的、非主流的，API 还是本地，都能接
- <span style="color: #1976d2;">绘图</span>——文生图、图片理解
- <span style="color: #1976d2;">小程序</span>——轻量化的功能扩展
- <span style="color: #1976d2;">MCP</span>——标准化的工具协议，把外部能力接进来

&emsp;&emsp;这些功能不是"堆上去的"，而是一个 AI 工作站<span style="color: #43a047;">本来就该有的</span>。如果你只需要和模型聊天，那确实用不到这么多功能，但那说明你需要的是一个 Chat，不是一个 Studio——这没问题，但不是 Cherry Studio 的问题。

&emsp;&emsp;当然，上手门槛客观存在。如果你是第一次接触 AI 工具，一打开看到模型服务、知识库、Agent、MCP、小程序这些东西，确实会懵。这也是为什么我之前写了[一篇 Cherry Studio 的上手指南](https://zhuzihan.com/sop/tutorial/how-to-use-cherry-studio.html)，从下载安装到添加模型、联网、知识库，一步步过一遍。如果你觉得 Next 的功能太多不知道从哪开始，可以先去看看那篇文章。

&emsp;&emsp;但"上手有难度"和"产品臃肿"是两回事。前者是学习成本，后者是设计失败。Cherry Studio 的功能是有逻辑地组织在一起的，不是随机拼凑的——只是这个逻辑的起点是"AI 工作站"，而不是"AI 聊天器"。

<div align="center">

## 陆 · 小结

</div>

&emsp;&emsp;Next 让 Cherry Studio 的"工作站"定位变得名副其实了。UI 升级让它好看了，交互升级让它好用了，Agent 融入让它有了真正的编排能力。

&emsp;&emsp;它不追求极简，也不应该追求极简。它追求的是<span style="color: #1976d2;">在一个应用里完成你对 AI 的所有需求</span>——这注定意味着功能多、上手难，但也意味着你不用在五六个工具之间来回切换。

&emsp;&emsp;如果你需要的是一个开箱即用的聊天器，市面上有很多轻量选择。但如果你需要的是一个能承载知识库、Agent、多模型、多渠道的 AI 工作站，Cherry Studio Next 值得你花时间上手。

<div align="center">

#### 写于 2026 年 7 月

</div>
