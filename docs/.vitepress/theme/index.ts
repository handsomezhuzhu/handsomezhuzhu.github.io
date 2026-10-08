import BlogTheme from '@sugarat/theme'
import { h } from 'vue'
import BackgroundSlider from './components/BackgroundSlider.vue'

// 自定义样式重载
import './style.scss'

// 自定义主题色
// import './user-theme.css'

export default {
  ...BlogTheme,
  Layout: () => {
    return h(BlogTheme.Layout, null, {
      'layout-bottom': () => h(BackgroundSlider)
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 调用原主题的 enhanceApp
    if (BlogTheme.enhanceApp) {
      BlogTheme.enhanceApp({ app, router, siteData })
    }
  }
}
