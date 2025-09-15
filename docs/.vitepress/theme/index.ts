import BlogTheme from '@sugarat/theme'
import { initCursorRainForVitePress } from '../cursor-rain/index.esm.js'
import { gsap } from 'gsap'
import { getOptimalConfig, rainPresets } from './cursor-rain-config'

// 自定义样式重载
import './style.scss'
import './cursor-rain-styles.css'

// 自定义主题色
// import './user-theme.css'

export default {
  ...BlogTheme,
  enhanceApp({ app, router, siteData }) {
    // 调用原主题的 enhanceApp
    if (BlogTheme.enhanceApp) {
      BlogTheme.enhanceApp({ app, router, siteData })
    }
    
    // 初始化光标雨点效果
    if (typeof window !== 'undefined') {
      // 确保 GSAP 可用
      if (typeof gsap !== 'undefined') {
        // 使用智能配置，根据设备自动选择最佳设置
        const config = getOptimalConfig()
        
        // 你可以在这里选择不同的预设：
        // const config = rainPresets.default  // 默认
        // const config = rainPresets.light    // 轻量模式
        // const config = rainPresets.fancy    // 华丽模式
        // const config = rainPresets.pink     // 粉色主题
        // const config = rainPresets.green    // 绿色主题
        // const config = rainPresets.gold     // 金色主题
        
        const rainEffect = initCursorRainForVitePress(config)
        
        // 将雨点效果实例挂载到全局，方便调试和动态控制
        if (typeof window !== 'undefined') {
          (window as any).rainEffect = rainEffect
        }
      }
    }
  }
}

