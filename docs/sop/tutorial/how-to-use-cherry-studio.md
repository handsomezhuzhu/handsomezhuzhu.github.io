---
title: 如何使用 Cherry Studio  # 文章标题，支持副标题格式（用 - 分隔）
top: 0                # 置顶级别：1-3，数字越大越靠前，0表示不置顶
date: 2025-08-24 20:30:00  # 发布日期和时间，格式：YYYY-MM-DD HH:MM:SS
descriptionHTML: '       
<span style="color:var(--description-font-color);">Cherry Studio的入门指南</span>
'
tags:                    # 文章标签列表，用于分类和搜索
  - Cherry Studio
  - 教程
  - AI
sidebar: true           # 是否显示侧边栏：true显示，false隐藏
readingTime: true        # 是否显示阅读时间：true显示，false隐藏
sticky: 2                # 精选文章设置：值越大在首页展示越靠前，0表示不精选
hidden: false            # 是否隐藏文章：true隐藏（模板用），false显示（正式文章用）
recommend: true
---

# 如何使用 Cherry Studio

## 什么是 Cherry Studio？

Cherry Studio 是一个功能强大的 AI 聚合工具，它集成了多模型对话、知识库管理、AI 绘画等多种功能。由于所有内容都存储在本地，因此它提供了出色的隐私保护。

## 下载与安装

1.  **下载**:
    访问 [CherryStudio 官网](https://cherry-ai.com/download) 下载适用于您操作系统的客户端。（以下以Windows系统为例）

2.  **安装**:
    双击下载的 `.exe` 文件，然后按照安装向导的指示进行操作。建议将软件安装在C盘以外的驱动器。

<div style="display:flex; gap:4%; justify-content:center; align-items:flex-start; flex-wrap:wrap;"> <img src="/1/安装1.png" alt="1-安装1" style="width:48%; max-width:420px; height:auto; display:block; margin:12px 0;" /> <img src="/1/安装2.png" alt="1-安装2" style="width:48%; max-width:420px; height:auto; display:block; margin:12px 0;" /> </div>

## 核心功能

CherryStudio 提供了多种强大的功能，以下是一些核心功能介绍：

### 添加模型

![添加模型](/1/添加模型.png)

您可以在 CherryStudio 中添加和管理来自不同提供商的 AI 模型，支持 API 调用和本地调用两种方式。

#### API 调用

1.  在模型服务提供商（例如，[硅基流动](https://cloud.siliconflow.cn/i/sbwOb5XI)）的网站上注册账户并创建一个 API 密钥。

   ![1-硅基1](/1/硅基1.png)


   ![1-硅基2](/1/硅基2.png)


   ![1-硅基3](/1/硅基3.png)


   ![1-硅基4](/1/硅基4.png)


2.  在 CherryStudio 的设置中，选择“模型服务”，然后添加 API 密钥。
3.  点击下方管理可获取模型列表。

    ![1-管理模型](/1/管理模型.png)

4.  选择模型添加。

    ![添加单个模型](/1/添加单个模型.png)

5.  添加成功后，您可以选择相应的模型进行对话。
   
   ![对话](/1/对话.png)

#### 本地调用

1.  如果您在本地部署了模型（例如，使用 Ollama），您也可以将其添加到 CherryStudio。
2.  在模型服务设置中，选择本地调用，并填写正确的 API 地址（通常是 `localhost`）和模型名称。

### 联网功能

为了让模型能够获取最新信息，您可以为其启用联网功能。

1.  **添加网络搜索服务**: 在设置->工具设置中选择“网络搜索”，然后添加一个搜索服务（如 百度搜索）。
   
   ![设置搜索](/1/设置搜索.png)

2.  **使用网络搜索**: 在聊天界面，点击输入框下方的网络图标（🌐）即可启用联网功能。
   
   ![使用搜索](/1/使用搜索.png)

   ![搜索结果](/1/搜索结果.png)



### 知识库

CherryStudio 允许您创建自己的本地知识库，让 AI 根据您的文档回答问题。

1.  **创建知识库**: 在侧边栏选择“知识库”并创建一个新的知识库（选择一个语义向量模型）。
   
   ![知识库1](/1/知识库1.png)

2.  **添加文档**: 将您的文档（请确保为 UTF-8 编码）拖入知识库中，系统会自动进行向量化处理。
   
   ![知识库2](/1/知识库2.png)

3.  **使用知识库**: 在聊天时，您可以选择加载特定的知识库，AI 将会基于库中的内容进行回答，并能标注引用来源。

### 配置迁移

如果您需要在多台设备上使用 CherryStudio，可以使用配置迁移功能来同步您的设置。

1.  **备份**: 在“数据设置”中，您可以将当前的所有配置（包括模型、知识库等）备份为一个 ZIP 文件。
2.  **恢复**: 在另一台设备上，通过“恢复”功能选择之前备份的 ZIP 文件，即可快速恢复您的所有配置。

![备份](/1/备份.png)

