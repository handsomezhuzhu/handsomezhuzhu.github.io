<template>
  <div class="music-player-wrapper" v-if="show">
    <div class="music-control">
      <button class="toggle-btn" @click="togglePlayer" :title="isOpen ? '收起播放器' : '展开播放器'">
        <span v-if="isOpen">🎵</span>
        <span v-else>🎵</span>
      </button>
    </div>
    <transition name="slide">
      <div class="music-player-container" v-show="isOpen">
        <vue3-aplayer
          :audio="audioList"
          :fixed="false"
          :autoplay="false"
          :loop="'all'"
          :order="'random'"
          :preload="'auto'"
          :volume="0.7"
          :mutex="true"
          :lrcType="0"
          :listFolded="false"
          :listMaxHeight="'250px'"
          theme="#b7daff"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Vue3Aplayer from 'vue3-aplayer'

const show = ref(false)
const isOpen = ref(false)

// 音乐列表配置 - 您可以根据需要修改这里的音乐
const audioList = ref([
  {
    name: '夜的钢琴曲',
    artist: '石进',
    url: 'https://music.163.com/song/media/outer/url?id=27867140.mp3',
    cover: 'https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
    lrc: ''
  },
  {
    name: 'River Flows In You',
    artist: 'Yiruma',
    url: 'https://music.163.com/song/media/outer/url?id=2133562.mp3',
    cover: 'https://p2.music.126.net/w3av4SHuMAgbBF2KKByaVw==/19217832579785884.jpg',
    lrc: ''
  },
  {
    name: 'Kiss The Rain',
    artist: 'Yiruma',
    url: 'https://music.163.com/song/media/outer/url?id=2618520.mp3',
    cover: 'https://p1.music.126.net/VjN74c1hoYgPCEZ9DngeQw==/109951163240682406.jpg',
    lrc: ''
  }
])

const togglePlayer = () => {
  isOpen.value = !isOpen.value
}

onMounted(() => {
  // 页面加载完成后显示播放器
  setTimeout(() => {
    show.value = true
  }, 500)
})
</script>

<style scoped>
.music-player-wrapper {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}

.music-control {
  position: relative;
}

.toggle-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.music-player-container {
  position: absolute;
  bottom: 60px;
  right: 0;
  width: 350px;
  max-width: 90vw;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* 深色模式适配 */
.dark .music-player-container {
  background: rgba(30, 30, 30, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* 过渡动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .music-player-wrapper {
    bottom: 10px;
    right: 10px;
  }
  
  .music-player-container {
    width: 300px;
  }
  
  .toggle-btn {
    width: 45px;
    height: 45px;
    font-size: 20px;
  }
}
</style>
