<template>
  <div class="product-features-section">
    <div class="features-container">
      <!-- 區塊標題 -->
      <div class="section-header">
        <h2 class="section-title">產品特色</h2>
        <p class="section-subtitle">極致音質體驗，專為您打造</p>
      </div>

      <!-- 特色網格 -->
      <div class="features-grid">
        <!-- 藍芽功能 -->
        <div class="feature-card">
          <div class="feature-image">
            <img :src="getImagePath('/img/bluetooth-feature.jpg')" alt="藍芽無線連接" loading="lazy" />
            <div class="image-overlay">
              <div class="overlay-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <path d="m7 7 10 10-5 5V2l5 5L7 17M12 6v12M12 12h.01" />
                </svg>
              </div>
            </div>
          </div>
          <div class="feature-content">
            <div class="feature-badge">無線連接</div>
            <h3 class="feature-title">藍芽 5.0 技術</h3>
            <p class="feature-description">
              最新藍芽 5.0 技術，連接更穩定、延遲更低。支援多設備連接，一鍵切換，讓您的音樂體驗不受束縛。傳輸距離可達 30 公尺，室內外都能暢快使用。
            </p>
            <ul class="feature-highlights">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>30 公尺無線範圍</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>低延遲音訊傳輸</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>多設備同時連接</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- 降噪功能 -->
        <div class="feature-card">
          <div class="feature-image">
            <img :src="getImagePath('/img/noise-cancelling.jpg')" alt="主動降噪技術" loading="lazy" />
            <div class="image-overlay">
              <div class="overlay-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <path
                    d="M9 18V5l12-2v13M9 9l12-2M9 18c0 1.7-1.3 3-3 3s-3-1.3-3-3 1.3-3 3-3 3 1.3 3 3zM21 16c0 1.7-1.3 3-3 3s-3-1.3-3-3 1.3-3 3-3 3 1.3 3 3z">
                  </path>
                </svg>
              </div>
            </div>
          </div>
          <div class="feature-content">
            <div class="feature-badge">靜音體驗</div>
            <h3 class="feature-title">主動降噪 ANC</h3>
            <p class="feature-description">
              採用先進的主動降噪技術，可消除高達 35dB 的環境噪音。無論是在嘈雜的咖啡廳、擁擠的地鐵，還是辦公室，都能讓您沉浸在純淨的音樂世界中。
            </p>
            <ul class="feature-highlights">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>消除 35dB 環境噪音</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>三段式降噪模式</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>通透模式快速切換</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- 電競功能 -->
        <div class="feature-card">
          <div class="feature-image">
            <img :src="getImagePath('/img/gaming-mode.jpg')" alt="電競遊戲模式" loading="lazy" />
            <div class="image-overlay">
              <div class="overlay-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  <line x1="9" y1="7" x2="9" y2="7.01"></line>
                  <line x1="15" y1="7" x2="15" y2="7.01"></line>
                </svg>
              </div>
            </div>
          </div>
          <div class="feature-content">
            <div class="feature-badge">極速競技</div>
            <h3 class="feature-title">電競遊戲模式</h3>
            <p class="feature-description">
              專為遊戲玩家設計的低延遲模式，音畫同步延遲低至 60ms。7.1 環繞音效讓您精準定位敵人方位，RGB 燈效同步遊戲氛圍，讓您在競技中佔盡優勢。
            </p>
            <ul class="feature-highlights">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>60ms 超低延遲</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>7.1 虛擬環繞音效</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>RGB 燈效同步</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 獲取 Nuxt 配置
const config = useRuntimeConfig()
const baseURL = config.app.baseURL

// 生成完整圖片路徑的輔助函數
const getImagePath = (path) => {
  // 如果 baseURL 是 '/'，直接返回路徑
  // 否則，移除路徑開頭的 '/' 並加上 baseURL
  if (baseURL === '/') return path
  return `${baseURL}${path.startsWith('/') ? path.slice(1) : path}`
}
</script>

<style lang="scss" scoped>
.product-features-section {
  width: 100%;
  padding: 5rem 0;
  background: #f8f9fa;
}

.features-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
}

// ========== 區塊標題 ==========
.section-header {
  text-align: center;
  margin-bottom: 4rem;

  .section-title {
    font-size: 2.5rem;
    color: #222;
    margin: 0 0 1rem 0;
    font-weight: 700;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: linear-gradient(90deg, #2c4894, #667eea);
      border-radius: 2px;
    }
  }

  .section-subtitle {
    font-size: 1.125rem;
    color: #666;
    margin: 1.5rem 0 0 0;
  }
}

// ========== 特色網格 ==========
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
}

// ========== 特色卡片 ==========
.feature-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);

    .feature-image img {
      transform: scale(1.1);
    }

    .image-overlay {
      opacity: 1;
    }
  }
}

// ========== 特色圖片 ==========
.feature-image {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  background: #e9ecef;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(44, 72, 148, 0.85) 0%, rgba(102, 126, 234, 0.85) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.4s ease;

    .overlay-icon {
      color: white;
      animation: iconFloat 2s ease-in-out infinite;
    }
  }
}

@keyframes iconFloat {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

// ========== 特色內容 ==========
.feature-content {
  padding: 2rem;
}

.feature-badge {
  display: inline-block;
  padding: 0.375rem 1rem;
  background: linear-gradient(135deg, #2c4894 0%, #667eea 100%);
  color: white;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.5rem;
  color: #222;
  margin: 0 0 1rem 0;
  font-weight: 700;
}

.feature-description {
  color: #666;
  font-size: 1rem;
  line-height: 1.7;
  margin: 0 0 1.5rem 0;
}

// ========== 特色亮點 ==========
.feature-highlights {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.625rem 0;
    color: #555;
    font-size: 0.95rem;

    svg {
      flex-shrink: 0;
      color: #2c4894;
      stroke-width: 2.5;
    }

    &:not(:last-child) {
      border-bottom: 1px solid #f0f0f0;
    }
  }
}

// ========== 響應式設計 ==========

// 平板 (≤1024px)
@media (max-width: 1024px) {
  .product-features-section {
    padding: 4rem 0;
  }

  .section-header {
    margin-bottom: 3rem;

    .section-title {
      font-size: 2rem;
    }

    .section-subtitle {
      font-size: 1rem;
    }
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .feature-image {
    height: 250px;
  }
}

// 手機 (≤768px)
@media (max-width: 768px) {
  .product-features-section {
    padding: 3rem 0;
  }

  .section-header {
    margin-bottom: 2.5rem;

    .section-title {
      font-size: 1.75rem;
    }

    .section-subtitle {
      font-size: 0.95rem;
    }
  }

  .features-grid {
    gap: 1.5rem;
  }

  .feature-card {
    border-radius: 12px;
  }

  .feature-image {
    height: 220px;

    .overlay-icon svg {
      width: 40px;
      height: 40px;
    }
  }

  .feature-content {
    padding: 1.5rem;
  }

  .feature-title {
    font-size: 1.25rem;
  }

  .feature-description {
    font-size: 0.95rem;
  }

  .feature-highlights li {
    font-size: 0.9rem;

    svg {
      width: 14px;
      height: 14px;
    }
  }
}

// 小手機 (≤480px)
@media (max-width: 480px) {
  .section-header {
    .section-title {
      font-size: 1.5rem;
    }

    .section-subtitle {
      font-size: 0.9rem;
    }
  }

  .feature-image {
    height: 200px;
  }

  .feature-content {
    padding: 1.25rem;
  }

  .feature-badge {
    font-size: 0.8rem;
    padding: 0.3rem 0.875rem;
  }

  .feature-title {
    font-size: 1.125rem;
  }

  .feature-description {
    font-size: 0.9rem;
  }
}
</style>
