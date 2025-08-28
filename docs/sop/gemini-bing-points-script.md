---
title: 用篡改猴脚本刷Bing搜索积分
top: 2
date: 2025-08-28 11:00:00
descriptionHTML: '
<span style="color:var(--description-font-color);">篡改猴脚本实现Bing搜索积分自动化获取，一天一块钱 &#x1F60B;</span>
'
tags:
  - Bing
  - 教程
  - 羊毛
sidebar: true
readingTime: true
hiddenCover: ture
cover: url
sticky: 1
hidden: false
recommend: false
---

# 用篡改猴脚本刷Bing搜索积分

<div align="center">

## 前言

</div>

Bing搜索积分是微软Rewards计划的一部分，用户可以通过搜索获得积分并兑换各种奖励。本文将详细介绍如何使用[篡改猴](https://www.tampermonkey.net/)（Tampermonkey）脚本来自动化获取Bing搜索积分，轻松刷满每日积分上限。


<div align="center">

## 积分组成

</div>

- **签到**
  - 分为签到，搜索三次任务。连续一周后可兑换碎片
  - 碎片集满12个即可额外获取1000积分
- **今日积分**
  - 三个指定搜索，每个10分
  - 手机bing搜索，下载手机bing后进入任务页面点击搜索提示，需等待右下角提示完成，每个3分
  - 电脑bing搜索，可用脚本刷（需等级到二级），每个3分
  - 阅读，十篇文章，共30分
- **更多活动**
  - 部分一周只能做一次
  - 拼图点进去即可
- **由于等级不同，每日积分上限不同，需手机电脑配合刷**

![jifen](/5/jifen.jpg)


<div align="center">

## 直接上脚本，会用的直接刷

</div>

```js
// ==UserScript==
// @name         Bing 随机搜索器 (带UI - 搜索随机数字字母符号, 搜索后冷却)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  自动进入Bing并随机搜索数字、字母和符号的组合。每次搜索完一个循环（搜索+回主页）后，会等待用户设定的冷却时间，然后才进行下一次搜索。可设置次数和冷却时间并控制开始暂停。
// @author       ChatGPT
// @match        *://*.bing.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // ======= 配置项 START =======
    // 每次搜索操作完成后 (即返回主页后) 到下一次搜索操作开始前的冷却时间 (毫秒)。
    // 用于控制两次搜索之间的间隔。
    const DEFAULT_COOLDOWN_MS = 5000; // 5秒

    // 随机搜索字符串的长度
    const RANDOM_STRING_LENGTH = 8; // 例如：生成8个字符的随机串

    // 随机字符池：包含数字、大小写字母和常用符号。
    // 你可以根据需要添加或删除符号。注意某些符号可能在URL中需要编码。
    const CHARACTER_POOL = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()-_+=";
    // ======= 配置项 END =======

    // ======== 脚本内部状态管理 ========
    let isSearching = GM_getValue('isSearching', false);          // 是否正在进行自动搜索
    let remainingSearches = GM_getValue('remainingSearches', 0);  // 剩余搜索次数
    let searchTimerId = null;                                     // 用于存储 setTimeout 的ID，以便可以取消
    let currentCooldown = GM_getValue('cooldown', DEFAULT_COOLDOWN_MS); // 当前冷却时间

    // DOM 引用
    let uiPanel, searchCountInput, cooldownInput, startButton, pauseButton, statusTextElement;

    // ======== UI 样式 ========
    GM_addStyle(`
        #bingRandomSearchUI {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            padding: 15px;
            z-index: 10000;
            font-family: Arial, sans-serif;
            font-size: 14px;
            color: #333;
            max-width: 280px;
            text-align: center;
        }
        #bingRandomSearchUI h3 {
            margin-top: 0;
            color: #0078d4;
            font-size: 16px;
            margin-bottom: 10px;
        }
        #bingRandomSearchUI label {
            display: block;
            margin-bottom: 5px; /* 调整间距 */
            text-align: left;
            font-weight: bold;
        }
        #bingRandomSearchUI input[type="number"] {
            width: calc(100% - 20px);
            padding: 8px 10px;
            margin-bottom: 10px; /* 调整间距 */
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
            font-size: 14px;
            outline: none;
        }
        #bingRandomSearchUI input[type="number"]:focus {
            border-color: #0078d4;
        }
        #bingRandomSearchUI button {
            background-color: #0078d4;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            margin: 5px;
            min-width: 80px;
            transition: background-color 0.2s ease;
        }
        #bingRandomSearchUI button:hover {
            background-color: #005a9e;
        }
        #bingRandomSearchUI button:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
        }
        #bingRandomSearchUI #bingSearchStatus {
            margin-top: 15px;
            padding-top: 10px;
            border-top: 1px solid #eee;
            color: #555;
            min-height: 20px;
        }
    `);

    // ======== UI 渲染 ========
    function createUI() {
        uiPanel = document.createElement('div');
        uiPanel.id = 'bingRandomSearchUI';
        uiPanel.innerHTML = `
            <h3>Bing 随机搜索</h3>
            <label for="searchCount">搜索次数：</label>
            <input type="number" id="searchCount" min="1" value="${GM_getValue('initialSearchCount', 10)}">

            <label for="cooldown">冷却时间 (ms)：</label>
            <input type="number" id="cooldown" min="1000" value="${currentCooldown}">

            <div>
                <button id="startButton">开始</button>
                <button id="pauseButton">暂停</button>
            </div>
            <p id="bingSearchStatus"></p>
        `;
        document.body.appendChild(uiPanel);

        searchCountInput = document.getElementById('searchCount');
        cooldownInput = document.getElementById('cooldown');
        startButton = document.getElementById('startButton');
        pauseButton = document.getElementById('pauseButton');
        statusTextElement = document.getElementById('bingSearchStatus');

        // 事件监听
        startButton.addEventListener('click', startSearch);
        pauseButton.addEventListener('click', pauseSearch);
        
        searchCountInput.addEventListener('change', (e) => {
            GM_setValue('initialSearchCount', parseInt(e.target.value, 10));
        });
        
        cooldownInput.addEventListener('change', (e) => {
            const val = parseInt(e.target.value, 10);
            if (!isNaN(val) && val >= 1000) { // 最低冷却时间设为1秒
                currentCooldown = val;
                GM_setValue('cooldown', val);
            } else {
                e.target.value = currentCooldown; // 无效输入则恢复
            }
        });

        updateUI(); // 初始更新UI状态
    }

    // ======== 状态更新 UI ========
    function updateUI() {
        // 如果当前没有正在进行的搜索，且剩余次数为0，则显示上次设置的总次数
        searchCountInput.value = (isSearching || remainingSearches > 0) ? remainingSearches : GM_getValue('initialSearchCount', 10);
        cooldownInput.value = currentCooldown;

        startButton.disabled = isSearching;
        pauseButton.disabled = !isSearching;

        if (isSearching) {
            statusTextElement.style.color = '#0078d4';
            statusTextElement.innerHTML = `正在搜索... 剩余 <span style="font-weight: bold; color: green;">${remainingSearches}</span> 次`;
        } else if (!isSearching && remainingSearches > 0) {
            statusTextElement.style.color = '#e44d26';
            statusTextElement.innerHTML = `已暂停。剩余 <span style="font-weight: bold; color: red;">${remainingSearches}</span> 次`;
        } else {
             statusTextElement.style.color = '#555';
             statusTextElement.textContent = '等待开始...';
        }
        // 如果 remainingSearches 为 0 且处于非搜索状态，清空持久化数据
        if (!isSearching && remainingSearches === 0) {
            GM_deleteValue('isSearching');
            GM_deleteValue('remainingSearches');
        }
    }

    // ======== 搜索逻辑 ========
    // 生成一个随机的指定长度的字符串 (数字、字母、符号组合)
    function getRandomSearchTerm() {
        let result = '';
        const charactersLength = CHARACTER_POOL.length;
        for (let i = 0; i < RANDOM_STRING_LENGTH; i++) {
            result += CHARACTER_POOL.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    // 启动搜索过程
    function startSearch() {
        const count = parseInt(searchCountInput.value, 10);
        if (isNaN(count) || count <= 0) {
            alert("请输入一个有效的搜索次数 (大于0)。");
            return;
        }

        // 确保使用 UI 中设置的最新冷却时间值
        currentCooldown = parseInt(cooldownInput.value, 10);
        GM_setValue('cooldown', currentCooldown);

        isSearching = true;
        remainingSearches = count;
        GM_setValue('isSearching', true);
        GM_setValue('remainingSearches', remainingSearches);
        updateUI();

        console.log(`[Bing Random Search] 搜索任务已启动，共 ${remainingSearches} 次。`);
        // 开始搜索循环，先进入冷却
        scheduleNextSearch(currentCooldown);
    }

    // 暂停搜索过程
    function pauseSearch() {
        isSearching = false;
        GM_setValue('isSearching', false);
        clearTimeout(searchTimerId); // 清除任何待执行的定时器
        searchTimerId = null;
        updateUI();
        console.log(`[Bing Random Search] 搜索任务已暂停，剩余 ${remainingSearches} 次。`);
    }

    // 模拟键盘事件，用于在输入框中触发回车
    function simulateKeyPress(element, keyNum, keyChar) {
        let eventDown = new KeyboardEvent('keydown', {
            bubbles: true, cancelable: true, key: keyChar, code: `Key${keyChar.toUpperCase()}`, keyCode: keyNum, which: keyNum
        });
        element.dispatchEvent(eventDown);

        let eventUp = new KeyboardEvent('keyup', {
            bubbles: true, cancelable: true, key: keyChar, code: `Key${keyChar.toUpperCase()}`, keyCode: keyNum, which: keyNum
        });
        element.dispatchEvent(eventUp);

        let changeEvent = new Event('change', { bubbles: true });
        element.dispatchEvent(changeEvent);
    }
    
    // 模拟点击事件
    function simulateClick(element) {
        if (!element) return;
        const event = new MouseEvent('click', {
            view: window, bubbles: true, cancelable: true
        });
        element.dispatchEvent(event);
    }

    // 调度下一次搜索 (包含冷却时间)
    function scheduleNextSearch(delay = currentCooldown) {
        if (!isSearching || remainingSearches <= 0) {
            pauseSearch();
            if (remainingSearches === 0) {
                statusTextElement.textContent = '所有搜索任务已完成！';
            }
            return;
        }
        
        console.log(`[Bing Random Search] 等待 ${delay / 1000} 秒冷却，后进行下一次搜索...`);
        statusTextElement.innerHTML = `冷却中... 剩余 <span style="font-weight: bold; color: green;">${remainingSearches}</span> 次 (下一次在 ${delay/1000} 秒后)`;
        
        searchTimerId = setTimeout(() => {
            attemptSearch();
        }, delay);
    }

    // 尝试执行一次搜索 (从主页发起)
    function attemptSearch() {
        if (!isSearching || remainingSearches <= 0) {
            pauseSearch();
            if (remainingSearches === 0) {
                statusTextElement.textContent = '所有搜索任务已完成！';
            }
            return;
        }

        const currentUrl = window.location.href;
        const currentHost = window.location.host;

        const isBingNonSearchPage = currentHost.endsWith('.bing.com') && !currentUrl.includes('q=');
        const isBingSearchPage = currentHost.endsWith('.bing.com') && currentUrl.includes('q=');

        if (isBingNonSearchPage) {
            // 情况1：当前页面是 Bing 主页或非搜索结果页 -> 执行搜索
            const searchInput = document.getElementById('sb_form_q');
            if (!searchInput) {
                console.warn("[Bing Random Search] 搜索输入框 #sb_form_q 未找到，等待页面加载或重试。");
                scheduleNextSearch(1000); // 1秒后重试查找搜索框
                return;
            }
            
            remainingSearches--; // 在执行搜索"前"就减一，表示即将进行一次搜索
            GM_setValue('remainingSearches', remainingSearches);

            const term = getRandomSearchTerm(); // 获取随机字符串
            
            console.log(`[Bing Random Search] 模拟搜索: "${term}". 剩余: ${remainingSearches} 次`);
            updateUI(); // 立即更新 UI 显示剩余次数

            if (!isSearching) { // 再次检查是否在延迟期间被暂停
                console.log("[Bing Random Search] 在模拟操作前任务被暂停。");
                updateUI();
                return;
            }

            searchInput.value = term; // 填充搜索词
            let inputEvent = new Event('input', { bubbles: true });
            searchInput.dispatchEvent(inputEvent);
            
            const searchForm = searchInput.closest('form');
            if (searchForm) {
                console.log("[Bing Random Search] 模拟表单提交。");
                searchForm.submit();
            } else {
                const searchButton = document.querySelector('#sb_form_go, #search_icon');
                if (searchButton) {
                    console.log("[Bing Random Search] 模拟点击搜索按钮。", searchButton);
                    simulateClick(searchButton);
                } else {
                    console.log("[Bing Random Search] 未找到表单或搜索按钮，模拟输入框回车键。");
                    searchInput.focus();
                    simulateKeyPress(searchInput, 13, 'Enter');
                }
            }
        } else if (isBingSearchPage) {
            // 情况2：当前页面是 Bing 搜索结果页 -> 返回 Bing 主页
            // 不需要剩余次数判断，因为这是搜索流程的一部分，即使最后一次也需要返回主页
            if (!isSearching) {
                console.log("[Bing Random Search] 在返回主页前任务被暂停。");
                updateUI();
                return;
            }
            console.log(`[Bing Random Search] 检测到搜索结果页。正在返回Bing主页。`);
            // 返回到当前国家/地区的 Bing 主域名，例如从 cn.bing.com/search 返回 cn.bing.com
            window.location.href = `https://${currentHost}/`; 
            // 页面跳转后脚本会重新加载，并在入口处处理后续逻辑（冷却 -> 下一次搜索）
        } else {
            // 当前页面不是 Bing 页面 (理论上 @match 规则会避免这种情况)
            console.log("[Bing Random Search] 当前页面不是Bing页面，不执行操作。等待冷却。");
            updateUI();
            scheduleNextSearch(); // 仍然进入冷却，下次再判断合适的页面
        }
    }


    // ======== 脚本入口 ========
    // 确保 DOM 完全加载后再创建 UI
    window.addEventListener('load', () => {
        // 从存储中读取并设置当前的冷却值
        currentCooldown = GM_getValue('cooldown', DEFAULT_COOLDOWN_MS);

        createUI();
        // 如果脚本在上次运行后是处于 active 状态，则尝试恢复搜索
        if (isSearching && remainingSearches > 0) {
            console.log(`[Bing Random Search] 从上次会话恢复搜索。剩余 ${remainingSearches} 次。`);
            // 恢复时，直接进入冷却阶段，再开始下一个操作流程
            scheduleNextSearch(currentCooldown);
        } else if (isSearching && remainingSearches === 0) {
            // 如果 isSearching 为 true 但 remainingSearches 为 0，说明是异常状态，重置
            console.warn("[Bing Random Search] 状态异常，isSearching 为 true, 但 remainingSearches 为 0。已重置。");
            isSearching = false;
            GM_deleteValue('isSearching');
            GM_deleteValue('remainingSearches');
            updateUI();
        }
    });

})();

```

![jiaoben](/5/jiaoben.png)

<div align="center">

## 使用方法

</div>


### 第一步：安装篡改猴扩展

1. **Chrome浏览器**：在Chrome网上应用店搜索"Tampermonkey"并安装，[或点击此处](https://chromewebstore.google.com/detail/%E7%AF%A1%E6%94%B9%E7%8C%B4/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=zh-CN&utm_source=ext_sidebar)
2. **Edge浏览器**：在Microsoft Edge扩展商店中搜索"Tampermonkey"并安装，[或点击此处](https://microsoftedge.microsoft.com/addons/detail/%E7%AF%A1%E6%94%B9%E7%8C%B4/iikmkjmpaadaobahmlepeloendndfphd?refid=bingshortanswersdownload)
3. 其他浏览器同理



### 第二步：创建新脚本

1. 点击浏览器工具栏中的篡改猴图标
2. 选择"创建新脚本"
3. 将代码复制粘贴到编辑器中
4. 保存脚本（Ctrl+S）

![1](/5/1.png)

![2](/5/2.png)

<div align="center">

## 脚本使用教程

</div>

需打开[bing.com](https://www.bing.com)，没有的刷新一下

![3](/5/3.png)

<div align="center">

## Bing搜索积分价值

</div>

[官方兑换页面](https://rewards.bing.com/redeem/?ref=rewardspanel)

![4](/5/4.png)

都是17925积分换一百块

就是179分是一元钱，二级用户一天就能刷一块

![5](/5/5.png)

还提供了我的世界的钻石和原神的原石

原石是1200积分换80原石

80原石大约价值为：6.7元

#### 也不知道值不值，有点想兑换KFC了  &#x1F60B;

![kfc](/5/kfc.png)