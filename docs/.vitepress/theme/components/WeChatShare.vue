<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

/**
 * 微信内置浏览器分享卡片定制
 *
 * 只在微信里生效：页面被打开时向 /api/wx-sign 申请签名，注入 wx.config，
 * 然后调用 updateAppMessageShareData / updateTimelineShareData 自定义
 * 「发送给朋友」和「分享到朋友圈」的标题、描述、缩略图。
 *
 * 依赖：仓库根目录 cloud-functions/api/wx-sign.js（EdgeOne 云函数）
 * 前置：公众号已认证 + 后台配置 JS接口安全域名 + 服务端配置 WX_APPID / WX_APPSECRET
 */

const { frontmatter, title, description, site } = useData()
const route = useRoute()

const SDK_URL = 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js'
const isWeChat = /MicroMessenger/i.test(navigator.userAgent)
const wantDebug = new URLSearchParams(location.search).has('wxdebug')

let sdkPromise: Promise<any> | null = null
let running = false
let stopped = false

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** 当前页面完整地址，不含 # 及之后的部分（签名要求） */
function currentUrl() {
  return window.location.href.split('#')[0]
}

/** 标题：优先 frontmatter.title，否则去掉 VitePress 自动加的「 | 站名」后缀 */
function shareTitle(): string {
  const fromFrontmatter = frontmatter.value.title
  if (typeof fromFrontmatter === 'string' && fromFrontmatter.trim()) {
    return fromFrontmatter.trim()
  }
  const siteTitle = site.value.title || ''
  const raw = title.value || document.title
  const stripped = raw.replace(new RegExp(`\\s*\\|\\s*${escapeRegExp(siteTitle)}\\s*$`), '').trim()
  return stripped || siteTitle
}

/** 描述：优先 frontmatter.description，其次 descriptionHTML，最后站点简介 */
function shareDesc(): string {
  const candidates = [
    frontmatter.value.description,
    frontmatter.value.descriptionHTML,
    description.value
  ]
  for (const candidate of candidates) {
    if (typeof candidate !== 'string' || !candidate.trim()) continue
    const text = candidate
      .replace(/<[^>]+>/g, ' ')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    if (text) return text.slice(0, 120)
  }
  return ''
}

/** 缩略图：正文里的第一张图（.vp-doc 内），没有则用站点 logo */
function shareImage(): string {
  const img = document.querySelector('.vp-doc img')
  const src = img?.getAttribute('src')
  if (src && !src.startsWith('data:')) {
    return new URL(src, window.location.origin).href
  }
  return `${window.location.origin}/logo.jpg`
}

function loadSdk(): Promise<any> {
  const wxp = (window as any).wx
  if (wxp && typeof wxp.config === 'function') {
    return Promise.resolve(wxp)
  }
  if (sdkPromise) {
    return sdkPromise
  }
  sdkPromise = new Promise<any>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = SDK_URL
    script.onload = () => {
      const loaded = (window as any).wx
      loaded && typeof loaded.config === 'function'
        ? resolve(loaded)
        : reject(new Error('jweixin-1.6.0.js 加载后未暴露 wx 对象'))
    }
    script.onerror = () => reject(new Error('jweixin-1.6.0.js 加载失败'))
    document.head.appendChild(script)
  })
  return sdkPromise
}

async function fetchSignature(url: string) {
  const response = await fetch(`/api/wx-sign?url=${encodeURIComponent(url)}`, {
    credentials: 'omit'
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok || data.code) {
    throw new Error(data.message || `签名接口返回 ${response.status}`)
  }
  return data
}

async function setupShare() {
  if (stopped || running) return
  running = true
  try {
    const wx = await loadSdk()
    const config = await fetchSignature(currentUrl())

    wx.config({
      debug: wantDebug,
      appId: config.appId,
      timestamp: Number(config.timestamp),
      nonceStr: config.nonceStr,
      signature: config.signature,
      jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
    })

    wx.ready(() => {
      const shareData = {
        title: shareTitle(),
        desc: shareDesc(),
        link: currentUrl(),
        imgUrl: shareImage()
      }
      // 自定义「分享给朋友」
      wx.updateAppMessageShareData(shareData)
      // 自定义「分享到朋友圈」（1.4.0+，只认 title/link/imgUrl）
      wx.updateTimelineShareData({
        title: shareData.title,
        link: shareData.link,
        imgUrl: shareData.imgUrl
      })
    })

    wx.error((error: any) => {
      console.warn('[wechat-share] wx.config 失败：', error)
    })
  } catch (error) {
    console.warn('[wechat-share] 初始化失败：', error)
  } finally {
    running = false
  }
}

onMounted(() => {
  if (!isWeChat) return
  void setupShare()
})

onUnmounted(() => {
  stopped = true
})

// SPA 路由切换后 URL 变了，必须用新地址重新签名，否则分享出去还是旧页面
watch(
  () => route.path,
  () => {
    if (!isWeChat) return
    // 等 VitePress 把新页面的 frontmatter / DOM 刷完再读分享内容
    requestAnimationFrame(() => void setupShare())
  }
)
</script>

<template>
  <span class="vp-wechat-share" aria-hidden="true" />
</template>

<style scoped>
.vp-wechat-share {
  display: none;
}
</style>
