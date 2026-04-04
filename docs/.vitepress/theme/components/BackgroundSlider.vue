<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

const { isDark, frontmatter } = useData()
const route = useRoute()

// 图片配置
const darkImages = [
//  '/bg.webp',
  '/bg2.webp',
  '/bg3.jpeg'
]

const lightImages = [
  '/bgw.webp',
  '/bgw2.jpeg'
]

const currentImages = computed(() => isDark.value ? darkImages : lightImages)
const currentIndex = ref(0)
const nextIndex = ref(1)

// 控制显示的图片
const activeImage = computed(() => currentImages.value[currentIndex.value])
// const nextImage = computed(() => currentImages.value[nextIndex.value])

// 简单的淡入淡出逻辑：
// 我们使用 <transition> 包裹一个 div 作为背景
// 也可以使用两个 div 叠加，一个 fadeOut 一个 fadeIn
// 这里使用 Vue Transition Group 或 Key 切换

// --- 配置区域 ---
const INTERVAL_TIME = 15000 // 轮换间隔：5000ms = 5秒
// ----------------

let timer: any = null

const startRotation = () => {
  stopRotation()
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % currentImages.value.length
  }, INTERVAL_TIME)
}

const stopRotation = () => {
  if (timer) clearInterval(timer)
}

// 监听模式变化，重置索引，防止索引越界
watch(isDark, () => {
  // 切换模式时，重置 index，确保展示对应模式的第一张图
  currentIndex.value = 0
})


const preloadImages = (images: string[]) => {
  images.forEach(src => {
    const img = new Image()
    img.src = src
  })
}

onMounted(() => {
  // 预加载所有图片
  preloadImages([...darkImages, ...lightImages])
  startRotation()
})

onUnmounted(() => {
  stopRotation()
})

// 只在首页显示
const show = computed(() => frontmatter.value.layout === 'home')
</script>

<template>
  <ClientOnly>
    <div v-show="show" class="bg-slider-container">
      <transition name="bg-fade">
        <div
          :key="activeImage"
          class="bg-slide-item"
          :style="{ backgroundImage: `url(${activeImage})` }"
        ></div>
      </transition>
    </div>
  </ClientOnly>
</template>

<style scoped>
.bg-slider-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -10; /* 放在最底层 */
  pointer-events: none;
  overflow: hidden;
}

.bg-slide-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  /* 保持与原主题一致的暗度调整，如果需要的话。
     原主题是在 .VPHome 上盖了一层渐变，所以这里只需要纯图片。
  */
}

/* Vue Transition 动画 */
.bg-fade-enter-active {
  transition: opacity 1.5s ease;
  z-index: 2; /* 新图片在最上面 */
}

.bg-fade-leave-active {
  /* 旧图片保持显示，直到被新图片覆盖 */
  transition: opacity 1.5s ease;
  z-index: 1; /* 旧图片在中间 */
}

.bg-fade-enter-from {
  opacity: 0;
}

.bg-fade-enter-to {
  opacity: 1;
}

.bg-fade-leave-from {
  opacity: 1;
}

.bg-fade-leave-to {
  /* 旧图片保持不透明（或者可以设为 0 但在 enter 之后）
     这里设为 0，因为如果 enter 是 opacity 1，它覆盖在上面。
     如果设为 1，可能会在 transition 结束后突然消失，如果新图片有透明度的话。
     但我们的图片是背景图，理论上是不透明的。
     为了保险，我们让旧图片淡出，但新图片覆盖在上面。
     如果新图片淡入 (0->1) 同时旧图片淡出 (1->0)，中间时刻 (0.5+0.5) 可能会透。
     所以策略是：旧图片 保持 1 (或极慢淡出)，新图片 淡入。
  */
  opacity: 1;
}
</style>
