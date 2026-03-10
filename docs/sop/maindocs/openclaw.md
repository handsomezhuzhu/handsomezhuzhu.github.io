---
title: 热度降不下来了，还是讲一下OpenClaw吧
top: 1
date: 2026-03-10 12:00:00
descriptionHTML: '       
<span style="color:var(--description-font-color);">我经常是等热度下来了我才会开题写文章，但是我看一时半会热度下不来了</span>
'
tags:
  - OpenClaw
  - 技术
sidebar: true
readingTime: true
hiddenCover: false
sticky: 0
hidden: false
recommend: false

---

# 热度降不下来了，还是讲一下OpenClaw吧

####
##### 写在前面：
####

<span style="font-size:0.9em; color:#1976d2;">
&emsp;&emsp;在他从ClawBot改名到MoltBot的时候我就关注到了，不过那会关注点还在OpenCode，因为Claude Code和Codex我厌恶了，听说OpenCode很友好，就一直在研究OpenCode。后面MoltBot的时候我就部署在服务器了，再后来他又改名OpenClaw，让我服务器里面装了两个小龙虾，而且还不好卸载……
</span>


<div align="center">

## 前言

</div>


&emsp;&emsp;为什么刚刚要提一嘴OpenCode呢，其实这样的工具我们臭写代码的已经接触很多了，从Copilot到Cursor，从Claude Code到OpenCode，其实他都是自动化AI Agent，过去这些工具都能全自动写代码，测试，运行命令……如果让他做一些别的和代码无关的任务他也可以用系统命令来解决的。

&emsp;&emsp;所以OpenClaw也不是什么很高级的东西，他也是在后台启动了一个Agent，然后Agent能工具调用、能执行命令、能读写运行文件……只是他是唯一能接入聊天软件的，我感觉就是这一点比Claude Code啥的高级一点，手机上就可以操作AI，<span style="color: #43a047;">过去我们这些臭写代码的需要坐在电脑面前焦灼的Vibe Coding。</span>



<div align="center">

## 壹

</div>
&emsp;&emsp;但是OpenClaw真的不配这么多Star，他为什么这么爆火，我不知道，很神奇，很玄幻。<span style="color: #e72e00;">他在GitHub软件Star排行第一，超过Linux内核快照版，超过Python，超过各种前端框架。</span>我没想明白，真的非常非常玄幻。

![1](/12/1.png)

<div align="center" style="font-size:1em; color:gray;">前面都是教程或者资源汇总一类的仓库，OpenClaw是Star最高的软件类仓库</div>

&emsp;&emsp;而且他不是小圈子火，之前OpenCode是小圈子火，但是OpenClaw能让很多昨天还在用豆包录音的人，今天就吵着要部署OpenClaw。<span style="color: #43a047;">具体为什么会用豆包录音请看下图。</span>

![1](/12/2.jpg)
<div align="center" style="font-size:1em; color:gray;">笑死我了</div>


&emsp;&emsp;反正就是很火，莫名其妙的火，现象级的火，超规模级的火，一塌糊涂的火，应该可以和我家鸽鸽🐣比一下了。

![1](/12/3.gif)


<div align="center">

## 贰

</div>

<div align="center" style="font-size:1.3em;color:#1976d2;">这时候就有人要问了，OpenClaw到底解决了什么</div>

####

##### &emsp;&emsp;我个人认为是当今AI Agent发展到一定阶段的产物。主要是Vibe Coding的成熟和模型能力的提升，辅以MCP、Skills、上下文工程、多模态、RAG为一体的产物。

&emsp;&emsp;过去Agent是产业型垄断，比如千问可以做一个能点外卖的Agent，世界上找不出第二个，即使有人是天才，没有外卖平台的接口也搞不定<span style="color: #1976d2;">（有点绝对，但是效果绝对不如阿里自己做）</span>。现在的Agent想要打破这个垄断，他们认为Agent人人都可以持有，做自己的AI助理，做自己的“贾维斯”。<span style="color: #43a047;">Agent终于是有机会走入寻常百姓家了。</span>

![1](/12/8.jpg)
<div align="center" style="font-size:1em; color:gray;">反正我已经All in 10086.0了</div>

&emsp;&emsp;这个问题其实去年同时期“本地部署DeepSeek”时代就出现了，有人研究如何做自己的知识库，有人研究Coze工作流……直到今天都还有人兜售工作流搭建教学。

&emsp;&emsp;我个人认为目前Agent还是没有解决本质问题的，<span style="color: #1976d2;">LLM再怎么玩都只能输出一些字符编码，在大模型看来，就是一些前后关联强的东西。</span>唯独他的记忆功能确实实在，让他有了一些“人味”。我就用他的记忆功能帮我记忆我的作业和课程表，给我安排Todo List。

![1](/12/4.jpg)

![1](/12/5.jpg)
<div align="center" style="font-size:1em; color:gray;">我的OpenClaw接入QQBot</div>

####

<div align="center" style="font-size:1.3em;color:#1976d2;">他真的提效了吗</div>

&emsp;&emsp;只能说略有提效。至少确实能一直提醒我一些任务，就像上面展示的一样，帮我安排各类任务，因为他的记忆文件里面有我的课程表信息、作业信息&DDL，做完的内容也会从临时记忆删除。

&emsp;&emsp;如果有类似教程的需求我后面可以补一下教程，<span style="color: #43a047;">大概就是让他把你的长期安排存入长期记忆，短期安排存入临时记忆，临时记忆随时调整。</span>不过我认识的很多人都卡在了权限和推送这一步，这也正是下面我要讲的，在实操中的一些问题。

<div align="center" style="font-size:1.3em;color:#1976d2;">他确实不好用</div>

&emsp;&emsp;OpenClaw的部署和实操一直是个大问题，也不知道从哪一次Commit起，这个权限就管理的很死，似乎是架构做了变化，Tools调用需要有权限。

&emsp;&emsp;过去Claude Code这些CLI工具都是直接问你，或者全部允许，很多工具调用都是默认提供权限，但是OpenClaw的逻辑十分独特。几乎所有Tools都需要手动开启权限，所有命令执行都默认需要批准……这让权限配置很头疼，OpenClaw Onboard启动后配置完，大家以为能直接对话了，但实际是<span style="color: #43a047;">“我不能调用工具”“我没有这个权限”</span>……
![1](/12/9.jpg)

&emsp;&emsp;主要还是因为这个项目有无数Vibe Coding的人来提交PR，目前已经超过5k的PR。这个项目非常庞大，非常臃肿，教程的文档可以匹敌各大云服务商的文档了<span style="color: #1976d2;">（都非常屎山……）</span>。连我这种部署了无数项目的人，都觉得他非常的难以调教，功能随时在变，没有标准的功能方案，就是开源社区Vibe Coding的排泄池，连什么文科生都能合并代码了，让AI写AI工具的代码吗，真是闭环了，卧槽。

![1](/12/6.png)

![1](/12/7.png)

&emsp;&emsp;原文：https://www.geekpark.net/news/360337 自己品吧，<span style="color: #e72e00;">只能说AI NB</span>

&emsp;&emsp;其次是维护，维护需要各种配置和运行命令，这对于不太懂电脑的小白，简直是噩梦……现在想玩AI还是太难了，让OpenClaw搞结果发现他默认没权限🤣，AI的大盘还是在我们这些臭写代码的计算机人手里，想玩AI还是需要很多计算机基础的。

&emsp;&emsp;还有就是安全，让一堆不懂命令和安全的人拿到了密钥，<span style="color: #1976d2;">黑客第一次吃这么好</span>。为什么国家会出面说安全问题，就是因为出现很多牛鬼蛇神都来部署OpenClaw了，搞不好什么央国企也部署，结果自己的安全信息被泄露，那就非常危险了。

<div align="center">

## 叁

</div>

&emsp;&emsp;上门部署，腾讯大楼下免费部署，超级个体，一人公司……闹剧会过去的，但是Agent的脚步是不会停的。很庆幸今天能看到这么多对AI怀揣着梦想，有着与时俱进的思维。千变万化的今天，确实需要这样的精神。

&emsp;&emsp;但是OpenClaw的闹剧终究会成为历史的一部分，就像什么Coze空间工作流一样，慢慢的就很难再有产出了。Agent的难度还是远超预期的，仅仅依靠字符串输出的LLM我看真的难以应对大家日益增长的对AI时代的期盼。
