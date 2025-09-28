// 光标雨点效果配置文件
// 你可以在这里定义不同的配置预设

import type { RainDropOptions } from '../cursor-rain/types'

// 预设配置
export const rainPresets = {
  // 默认配置
  default: {
    maxDrops: 25,
    color: 'rgba(173, 216, 230, 0.6)',
    duration: [1.0, 2.0],
    dropSize: [3, 8],
    delay: 100,
    zIndex: 1000
  } as RainDropOptions,

  // 轻量模式（适合低性能设备）
  light: {
    maxDrops: 15,
    color: 'rgba(173, 216, 230, 0.5)',
    duration: [1.2, 2.5],
    dropSize: [2, 6],
    delay: 150,
    zIndex: 1000
  } as RainDropOptions,

  // 华丽模式
  fancy: {
    maxDrops: 40,
    color: 'rgba(173, 216, 230, 0.8)',
    duration: [0.8, 1.5],
    dropSize: [4, 12],
    delay: 50,
    zIndex: 1000
  } as RainDropOptions,

  // 粉色主题
  pink: {
    maxDrops: 30,
    color: 'rgba(255, 182, 193, 0.7)',
    duration: [1.0, 2.0],
    dropSize: [3, 9],
    delay: 80,
    zIndex: 1000
  } as RainDropOptions,

  // 绿色主题
  green: {
    maxDrops: 25,
    color: 'rgba(144, 238, 144, 0.7)',
    duration: [1.0, 2.0],
    dropSize: [3, 8],
    delay: 100,
    zIndex: 1000
  } as RainDropOptions,

  // 金色主题
  gold: {
    maxDrops: 20,
    color: 'rgba(255, 215, 0, 0.6)',
    duration: [1.5, 2.5],
    dropSize: [2, 6],
    delay: 120,
    zIndex: 1000
  } as RainDropOptions,

  // 移动端优化配置
  mobile: {
    maxDrops: 10,
    color: 'rgba(173, 216, 230, 0.5)',
    duration: [1.5, 3.0],
    dropSize: [2, 5],
    delay: 200,
    zIndex: 1000
  } as RainDropOptions
}

// 根据设备类型自动选择配置
export function getOptimalConfig(): RainDropOptions {
  if (typeof window === 'undefined') return rainPresets.default

  // 检测移动设备
  const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  
  // 检测低性能设备（简单的启发式检测）
  const isLowPerformance = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4

  if (isMobile) {
    return rainPresets.mobile
  } else if (isLowPerformance) {
    return rainPresets.light
  } else {
    return rainPresets.default
  }
}

// 主题配色方案
export const colorThemes = {
  blue: 'rgba(100, 149, 237, 0.7)',
  lightBlue: 'rgba(173, 216, 230, 0.6)',
  pink: 'rgba(255, 182, 193, 0.7)',
  green: 'rgba(144, 238, 144, 0.7)',
  gold: 'rgba(255, 215, 0, 0.6)',
  purple: 'rgba(147, 112, 219, 0.7)',
  orange: 'rgba(255, 165, 0, 0.7)',
  red: 'rgba(255, 99, 99, 0.7)'
}

// 动态切换主题的函数
export function switchRainTheme(effect: any, themeName: keyof typeof colorThemes) {
  const color = colorThemes[themeName]
  if (color && effect) {
    effect.updateOptions({ color })
    
    // 同时更新CSS类名以应用对应的样式
    const container = document.querySelector('.cursor-rain-container')
    if (container) {
      // 移除所有主题类
      container.classList.remove('rain-theme-blue', 'rain-theme-pink', 'rain-theme-green', 'rain-theme-gold', 'rain-theme-rainbow')
      // 添加新主题类
      container.classList.add(`rain-theme-${themeName}`)
    }
  }
}
