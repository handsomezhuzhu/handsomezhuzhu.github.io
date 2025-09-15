# 光标雨点效果使用指南

## 简介

这个博客已经集成了美丽的光标雨点效果！当你移动鼠标时，会在光标位置产生逼真的雨滴落下动画。

## 基础配置

### 1. 预设主题

在 `docs/.vitepress/theme/index.ts` 文件中，你可以选择不同的预设主题：

```typescript
// 默认蓝色主题（智能配置）
const config = getOptimalConfig()

// 或者手动选择预设：
const config = rainPresets.default  // 默认
const config = rainPresets.light    // 轻量模式（适合低性能设备）
const config = rainPresets.fancy    // 华丽模式（更多雨滴）
const config = rainPresets.pink     // 粉色主题
const config = rainPresets.green    // 绿色主题
const config = rainPresets.gold     // 金色主题
const config = rainPresets.mobile   // 移动端优化
```

### 2. 自定义配置

你也可以完全自定义配置参数：

```typescript
const customConfig = {
  maxDrops: 30,                              // 最大雨滴数量
  color: 'rgba(255, 182, 193, 0.7)',        // 雨滴颜色
  duration: [1.0, 2.0],                     // 动画持续时间范围（秒）
  dropSize: [3, 8],                         // 雨滴大小范围
  delay: 100,                               // 鼠标移动到雨滴开始的延迟（毫秒）
  zIndex: 1000,                             // 层级
  enabled: true                             // 是否启用
}

const rainEffect = initCursorRainForVitePress(customConfig)
```

## 高级自定义

### 1. CSS 样式自定义

在 `docs/.vitepress/theme/cursor-rain-styles.css` 中，你可以自定义雨滴的视觉效果：

```css
/* 自定义雨滴样式 */
.cursor-rain-container .rain-drop {
  /* 添加发光效果 */
  box-shadow: 0 0 10px rgba(173, 216, 230, 0.6);
  
  /* 添加模糊效果 */
  filter: blur(1px);
  
  /* 渐变背景 */
  background: radial-gradient(circle, 
    rgba(173, 216, 230, 0.8) 0%, 
    rgba(173, 216, 230, 0.3) 70%, 
    transparent 100%);
}
```

### 2. 主题色彩

已经预设了多种主题色彩，包括：

- `blue` - 蓝色
- `lightBlue` - 浅蓝色
- `pink` - 粉色
- `green` - 绿色
- `gold` - 金色
- `purple` - 紫色
- `orange` - 橙色
- `red` - 红色
- `rainbow` - 彩虹色（特殊效果）

### 3. 动态控制

雨点效果实例已挂载到全局 `window.rainEffect`，你可以在浏览器控制台中动态控制：

```javascript
// 暂停效果
window.rainEffect.disable()

// 恢复效果
window.rainEffect.enable()

// 更新配置
window.rainEffect.updateOptions({
  maxDrops: 50,
  color: 'rgba(255, 99, 99, 0.8)'
})

// 切换主题（需要先导入 switchRainTheme 函数）
switchRainTheme(window.rainEffect, 'pink')
```

## 性能优化

### 1. 自动优化

系统会根据设备性能自动选择最佳配置：

- **移动设备**：自动使用移动端优化配置（更少雨滴，更长动画时间）
- **低性能设备**：自动使用轻量模式
- **高性能设备**：使用默认或华丽模式

### 2. 手动优化

如果遇到性能问题，可以手动调整：

```typescript
// 性能友好的配置
const performanceConfig = {
  maxDrops: 10,        // 减少雨滴数量
  duration: [2.0, 3.0], // 增加动画时间
  delay: 200,          // 增加延迟
  dropSize: [2, 4]     // 减小雨滴尺寸
}
```

### 3. 移动端适配

CSS 中已包含移动端优化：

```css
@media (max-width: 768px) {
  .cursor-rain-container .rain-drop {
    /* 移动端减少视觉效果以提高性能 */
    filter: none;
    box-shadow: 0 0 4px rgba(173, 216, 230, 0.3);
  }
}
```

## 常见问题

### Q: 如何完全禁用雨点效果？

A: 在配置中设置 `enabled: false`：

```typescript
const config = {
  ...getOptimalConfig(),
  enabled: false
}
```

### Q: 雨点效果影响性能怎么办？

A: 使用轻量模式：

```typescript
const config = rainPresets.light
```

或者手动减少雨滴数量：

```typescript
const config = {
  ...getOptimalConfig(),
  maxDrops: 5
}
```

### Q: 如何在特定页面禁用效果？

A: 可以在页面的 frontmatter 中添加标识，然后在主题中根据路由判断是否启用。

### Q: 深色模式下雨点不明显怎么办？

A: CSS 中已包含深色模式适配，或者手动调整颜色：

```typescript
const config = {
  ...getOptimalConfig(),
  color: 'rgba(173, 216, 230, 0.9)' // 增加透明度
}
```

## 开发调试

在开发过程中，你可以：

1. 打开浏览器控制台
2. 使用 `window.rainEffect` 实时调试
3. 修改配置后刷新页面查看效果
4. 使用 `window.rainEffect.updateOptions()` 实时更新配置

享受你的个性化光标雨点效果吧！🌧️✨
