---
title: 文章标题 - 副标题  # 文章标题，支持副标题格式（用 - 分隔）
top: 1                   # 置顶级别：1-3，数字越大越靠前，0表示不置顶
date: 2025-01-01 12:00:00  # 发布日期和时间，格式：YYYY-MM-DD HH:MM:SS
descriptionHTML: '       
<span style="color:var(--description-font-color);">文章描述，支持HTML格式</span>
'
tags:                    # 文章标签列表，用于分类和搜索
  - AI
  - 生活
sidebar: true            # 是否显示侧边栏：true显示，false隐藏
readingTime: true        # 是否显示阅读时间：true显示，false隐藏
hiddenCover: false       # 是否隐藏封面图：true隐藏，false显示
cover: url  # 封面图片路径，相对于public目录
sticky: 0                # 精选文章设置：值越大在首页展示越靠前，0表示不精选
hidden: true             # 是否隐藏文章：true隐藏（模板用），false显示（正式文章用）
---

# 文章标题

<div align="center">

## 前言

</div>

<span style="font-size:0.9em; color:#1976d2;">
&emsp;&emsp;这是一个前言段落，使用较小的字体和蓝色文字。通常用于介绍文章的背景、目的或重要说明。
</span>

<div align="center">

## 第一章

</div>

&emsp;&emsp;这是正文段落，使用缩进格式。您可以在这里写入主要内容。

&emsp;&emsp;这是另一个段落，继续您的内容。

### 小标题

&emsp;&emsp;这是小标题下的内容。

#### 更小的标题

&emsp;&emsp;这是更小标题下的内容。

<div align="center">

## 第二章

</div>

&emsp;&emsp;这是第二章的内容。

### 代码示例

```javascript
// 这是一个代码块示例
function example() {
    console.log("Hello World");
}
```

### 引用文本

> 这是一个引用块，用于突出显示重要信息或引用他人的话。

### 列表格式

#### 无序列表
- **粗体项目**：这是粗体文本
- *斜体项目*：这是斜体文本
- <span style="color: #43a047;">绿色文本</span>：这是带颜色的文本

#### 有序列表
1. 第一项
2. 第二项
3. 第三项

### 表格示例

| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 内容1 | 内容2 | 内容3 |
| 内容4 | 内容5 | 内容6 |

### 图片插入

<div align="center">

<img src="/logo.jpg" alt="示例图片" width="300"/>

*图片说明文字*

</div>

### 链接格式

- [普通链接](https://example.com)
- <span style="color: #43a047;">[带颜色的链接](https://example.com)</span>

### 特殊格式文本

- <span style="color: #d32f2f;">红色警告文本</span>
- <span style="color: #43a047;">绿色成功文本</span>
- <span style="color: #1976d2;">蓝色信息文本</span>
- <span style="font-size:0.8em;">小字体文本</span>
- <span style="font-weight: bold;">粗体文本</span>

### 分割线

---

### 代码内联

您可以在文本中使用 `内联代码` 来突出显示代码片段。

### 数学公式（如果支持）

$$
E = mc^2
$$

<div align="center">

## 总结

</div>

&emsp;&emsp;这是文章的总结部分。

<div align="center">

#### <span style="color: #d32f2f;">重要提示或结论</span>

</div>

<div align="center">

<img src="/logo.png" alt="结束图片" width="200"/>

</div>

---

*文章结束，可以添加版权信息或其他说明*

[原文链接](https://example.com)
