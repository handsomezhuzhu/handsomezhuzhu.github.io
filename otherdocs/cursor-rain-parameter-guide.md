# 🎛️ 光标雨点效果参数控制指南

## 📍 参数控制位置

### 1. **快速修改** - `docs/.vitepress/theme/index.ts`

直接在主题文件中自定义参数：

```typescript
// 完全自定义配置
const customConfig = {
  maxDrops: 30,                              // 🌧️ 雨滴数量 (建议: 10-50)
  color: 'rgba(173, 216, 230, 0.7)',        // 🎨 颜色 
  duration: [1.0, 2.0],                     // ⏱️ 下落时间范围(秒) 
  dropSize: [3, 8],                         // 📏 雨滴大小范围(像素)
  delay: 100,                               // ⏰ 鼠标移动延迟(毫秒)
  zIndex: 1000,                             // 📐 层级
  enabled: true                             // 🔄 是否启用
}

const rainEffect = initCursorRainForVitePress(customConfig)
```

### 2. **预设选择** - 使用现有预设

```typescript
// 选择预设
const config = rainPresets.fancy    // 华丽模式
const config = rainPresets.light    // 轻量模式  
const config = rainPresets.pink     // 粉色主题
const config = rainPresets.green    // 绿色主题
const config = rainPresets.gold     // 金色主题
```

### 3. **预设修改** - `docs/.vitepress/theme/cursor-rain-config.ts`

创建新预设或修改现有预设：

```typescript
export const rainPresets = {
  // 添加你的自定义预设
  myCustom: {
    maxDrops: 35,
    color: 'rgba(255, 100, 100, 0.8)',
    duration: [0.8, 1.5],
    dropSize: [2, 10],
    delay: 80,
    zIndex: 1000
  } as RainDropOptions,
  
  // 修改现有预设
  default: {
    maxDrops: 20,  // 从25改为20
    // ... 其他参数
  }
}
```

## 🎯 详细参数说明

### 核心参数

| 参数 | 类型 | 默认值 | 说明 | 推荐范围 |
|------|------|--------|------|----------|
| `maxDrops` | number | 25 | 同时显示的最大雨滴数量 | 5-50 |
| `color` | string | 'rgba(173,216,230,0.6)' | 雨滴颜色(支持任何CSS颜色) | - |
| `duration` | [min,max] | [1.0, 2.0] | 下落时间范围(秒) | [0.5, 3.0] |
| `dropSize` | [min,max] | [3, 8] | 雨滴大小范围(像素) | [1, 15] |
| `delay` | number | 100 | 鼠标移动到雨滴出现的延迟(毫秒) | 50-300 |

### 高级参数

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `zIndex` | 雨滴容器的层级 | 1000 |
| `enabled` | 是否启用效果 | true |
| `container` | 效果容器元素 | document.body |

## 🎨 视觉效果参数

### 雨滴形状控制 (CSS)

在 `docs/.vitepress/theme/cursor-rain-styles.css` 中：

```css
.cursor-rain-container .rain-drop {
  /* 🔸 雨滴形状 - 数值越大越尖锐 */
  border-radius: 50% 50% 50% 50% / 90% 90% 10% 10% !important;
  
  /* 🌟 发光效果 */
  box-shadow: 0 0 6px rgba(173, 216, 230, 0.4);
  
  /* 🌫️ 模糊效果 */
  filter: blur(0.5px);
}
```

### 雨滴尺寸控制 (JavaScript源码)

在 `cursor-rain/src/CursorRainEffect.ts` 中：

```javascript
// 第177-178行
width: size * 0.3,  // 🔸 宽度倍数 (越小越细)
height: size * 4,   // 🔸 高度倍数 (越大越长)
```

## 🚀 实时调试

### 浏览器控制台调试

```javascript
// 🔄 更新配置
window.rainEffect.updateOptions({
  maxDrops: 50,
  color: 'rgba(255, 99, 99, 0.8)',
  duration: [0.5, 1.0]
})

// ⏸️ 暂停效果
window.rainEffect.disable()

// ▶️ 恢复效果  
window.rainEffect.enable()
```

### 动态切换主题

```javascript
// 需要先导入switchRainTheme函数
import { switchRainTheme } from './cursor-rain-config'

// 🎨 切换颜色主题
switchRainTheme(window.rainEffect, 'pink')
switchRainTheme(window.rainEffect, 'green')  
switchRainTheme(window.rainEffect, 'gold')
```

## 🎛️ 常用调整场景

### 🐌 性能优化 (减少卡顿)

```typescript
const performanceConfig = {
  maxDrops: 10,         // 减少数量
  duration: [2.0, 3.0], // 增加时间
  delay: 200,           // 增加延迟
  dropSize: [2, 4]      // 减小尺寸
}
```

### 🌪️ 华丽效果 (更多雨滴)

```typescript
const fancyConfig = {
  maxDrops: 50,         // 增加数量
  duration: [0.5, 1.2], // 减少时间
  delay: 30,            // 减少延迟
  dropSize: [4, 12]     // 增大尺寸
}
```

### 📱 移动端优化

```typescript
const mobileConfig = {
  maxDrops: 8,          // 大幅减少
  duration: [2.5, 4.0], // 增加时间
  delay: 300,           // 增加延迟
  dropSize: [2, 5]      // 减小尺寸
}
```

### 🌈 彩色雨滴

```typescript
// 多种颜色随机
const colors = [
  'rgba(255, 99, 99, 0.7)',   // 红
  'rgba(99, 255, 99, 0.7)',   // 绿  
  'rgba(99, 99, 255, 0.7)',   // 蓝
  'rgba(255, 255, 99, 0.7)'   // 黄
]

// 在JavaScript中需要修改源码来支持随机颜色
```

## 🔧 修改步骤

1. **选择修改方式**：
   - 简单调整 → 修改 `index.ts`
   - 创建预设 → 修改 `cursor-rain-config.ts`
   - 视觉效果 → 修改 `cursor-rain-styles.css`
   - 深度定制 → 修改源码 `CursorRainEffect.ts`

2. **测试效果**：
   - 保存文件后VitePress会自动热重载
   - 或在浏览器控制台实时调试

3. **优化性能**：
   - 移动端减少 `maxDrops`
   - 低性能设备增加 `delay` 和 `duration`

享受你的个性化雨滴效果！🌧️✨
