<template>
  <div class="header-slider">
    <div class="slider-container">
      <!-- 輪播圖片 -->
      <div class="slider-wrapper" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div v-for="(slide, index) in slides" :key="index" class="slide">
          <picture>
            <!-- 行動裝置圖片 (≤768px) -->
            <source :srcset="slide.mobile" media="(max-width: 768px)" />
            <!-- 桌面版圖片 (>768px) -->
            <img :src="slide.desktop" :alt="slide.alt" class="slide-image" />
          </picture>
        </div>
      </div>

      <!-- 左右切換按鈕 -->
      <button @click="prevSlide" class="slider-btn slider-btn-prev" aria-label="上一張">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button @click="nextSlide" class="slider-btn slider-btn-next" aria-label="下一張">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <!-- 指示器 (dots) -->
      <div class="slider-indicators">
        <button v-for="(slide, index) in slides" :key="`dot-${index}`" @click="goToSlide(index)"
          :class="['indicator-dot', { active: currentIndex === index }]" :aria-label="`前往第 ${index + 1} 張`">
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// 輪播圖片資料
const slides = [
  {
    desktop: '/img/headerbanner01.e030209c.jpg',
    mobile: '/img/mobibanner-1.f88d0c1b.jpg',
    alt: '輪播圖片 1'
  },
  {
    desktop: '/img/headerbanner02.79562a15.jpg',
    mobile: '/img/mobibanner-2.27962580.jpg',
    alt: '輪播圖片 2'
  },
  {
    desktop: '/img/headerbanner03.a7c8bb9a.jpg',
    mobile: '/img/mobibanner-3.21b3a764.jpg',
    alt: '輪播圖片 3'
  },
  {
    desktop: '/img/headerbanner04.c0e2c68a.jpg',
    mobile: '/img/mobibanner-4.42a9ce71.jpg',
    alt: '輪播圖片 4'
  }
]

// 當前顯示的圖片索引
const currentIndex = ref(0)

// 自動輪播計時器
let autoPlayTimer = null

// 前往指定圖片
const goToSlide = (index) => {
  currentIndex.value = index
  resetAutoPlay()
}

// 下一張
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.length
  resetAutoPlay()
}

// 上一張
const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.length) % slides.length
  resetAutoPlay()
}

// 啟動自動輪播
const startAutoPlay = () => {
  autoPlayTimer = setInterval(() => {
    nextSlide()
  }, 5000) // 每 5 秒切換一次
}

// 停止自動輪播
const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
}

// 重置自動輪播
const resetAutoPlay = () => {
  stopAutoPlay()
  startAutoPlay()
}

// 觸控滑動支援
const touchStartX = ref(0)
const touchEndX = ref(0)

const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX
}

const handleTouchMove = (e) => {
  touchEndX.value = e.touches[0].clientX
}

const handleTouchEnd = () => {
  const diff = touchStartX.value - touchEndX.value
  const threshold = 50 // 最小滑動距離

  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      nextSlide() // 向左滑動，下一張
    } else {
      prevSlide() // 向右滑動，上一張
    }
  }
}

// 生命週期
onMounted(() => {
  startAutoPlay()

  // 添加觸控事件監聽
  const slider = document.querySelector('.slider-container')
  if (slider) {
    slider.addEventListener('touchstart', handleTouchStart, { passive: true })
    slider.addEventListener('touchmove', handleTouchMove, { passive: true })
    slider.addEventListener('touchend', handleTouchEnd)
  }
})

onUnmounted(() => {
  stopAutoPlay()

  // 移除觸控事件監聽
  const slider = document.querySelector('.slider-container')
  if (slider) {
    slider.removeEventListener('touchstart', handleTouchStart)
    slider.removeEventListener('touchmove', handleTouchMove)
    slider.removeEventListener('touchend', handleTouchEnd)
  }
})
</script>

<style lang="scss" scoped>
.header-slider {
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
  position: relative;
  background: #000;
}

.slider-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  // 滑鼠懸停時暫停自動輪播效果
  &:hover .slider-btn {
    opacity: 1;
  }
}

.slider-wrapper {
  display: flex;
  height: 100%;
  transition: transform 0.5s ease-in-out;
  will-change: transform;
}

.slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;

  picture {
    width: 100%;
    height: 100%;
    display: block;
  }

  .slide-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
  }
}

// 左右切換按鈕
.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-50%) scale(1.1);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  svg {
    width: 24px;
    height: 24px;
  }
}

.slider-btn-prev {
  left: 2rem;
}

.slider-btn-next {
  right: 2rem;
}

// 指示器
.slider-indicators {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.75rem;
  z-index: 10;
}

.indicator-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.8);
    transform: scale(1.2);
  }

  &.active {
    background: rgba(255, 255, 255, 1);
    width: 32px;
    border-radius: 6px;
  }
}

// 平板響應式 (≤1024px)
@media (max-width: 1024px) {
  .slider-container {
    height: 100%;
  }

  .slider-btn {
    width: 45px;
    height: 45px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  .slider-btn-prev {
    left: 1.5rem;
  }

  .slider-btn-next {
    right: 1.5rem;
  }

  .slider-indicators {
    bottom: 1.5rem;
  }
}

// 手機響應式 (≤768px)
@media (max-width: 768px) {
  .slider-container {
    height: 100%;
  }

  .slider-btn {
    width: 40px;
    height: 40px;
    opacity: 0.7; // 手機上預設顯示

    svg {
      width: 18px;
      height: 18px;
    }
  }

  .slider-btn-prev {
    left: 1rem;
  }

  .slider-btn-next {
    right: 1rem;
  }

  .slider-indicators {
    bottom: 1rem;
    gap: 0.5rem;
  }

  .indicator-dot {
    width: 10px;
    height: 10px;

    &.active {
      width: 24px;
    }
  }
}

// 小型手機 (≤480px)
@media (max-width: 480px) {
  .slider-container {
    height: 100%;
  }

  .slider-btn {
    width: 36px;
    height: 36px;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  .slider-btn-prev {
    left: 0.5rem;
  }

  .slider-btn-next {
    right: 0.5rem;
  }

  .slider-indicators {
    bottom: 0.75rem;
  }

  .indicator-dot {
    width: 8px;
    height: 8px;
    border-width: 1px;

    &.active {
      width: 20px;
    }
  }
}
</style>