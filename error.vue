<template>
  <div class="error-page">
    <div class="error-container">

      <!-- 錯誤訊息 -->
      <div class="error-content">
        <!-- 404 圖片 -->
        <div class="error-image">
          <img src="/img/404.png" alt="404 Page Not Found" />
        </div>
        <p class="error-description">
          抱歉，您要尋找的頁面可能已被移除、重新命名或暫時無法使用。
        </p>

        <!-- 操作按鈕 -->
        <div class="error-actions">
          <NuxtLink to="/" class="btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            返回首頁
          </NuxtLink>
          <button @click="goBack" class="btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            返回上一頁
          </button>
        </div>

        <!-- 熱門連結 -->
        <div class="popular-links">
          <h3>熱門頁面</h3>
          <ul class="link-list">
            <li>
              <NuxtLink to="/products/headphone">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
                耳機專區
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products/speaker">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
                揚聲器專區
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products/TV">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
                電視專區
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/member/wishlist">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
                我的追蹤清單
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

// Nuxt 3 錯誤頁面會接收 error prop
const props = defineProps({
  error: Object
})

// 返回上一頁
const goBack = async () => {
  // 1. 清除 Nuxt 錯誤狀態
  await clearError()

  // 2. 透過 router 檢查歷史紀錄
  // router.options.history.state 有目前路由的詳細狀態
  const hasHistory = typeof window !== 'undefined' && window.history.state?.back

  if (hasHistory) {
    router.back() // 讓 Vue Router 幫你優雅地回上一頁
  } else {
    await navigateTo('/') // 沒有歷史紀錄，安全退回到首頁
  }
}

// 設定頁面標題
useSeoMeta({
  title: '404 - 頁面不存在 | TechShop',
  description: '抱歉，您要尋找的頁面不存在'
})
</script>

<style lang="scss" scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 0 1rem;
}

.error-container {
  max-width: 1400px;
  width: 100%;
  padding: 2rem 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}

// 404 圖片區
.error-image {
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    max-width: 400px;
    height: auto;
    margin-bottom: 2rem;
    filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.15));
    animation: float 3s ease-in-out infinite;
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}

// 錯誤內容區
.error-content {
  // background: white;
  padding: 3rem;
  border-radius: 16px;
  // box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  text-align: center;

  .error-title {
    font-size: 2.5rem;
    color: #2c4894;
    margin: 0 0 1rem 0;
    font-weight: 700;
  }

  .error-description {
    text-align: center;
    color: #666;
    font-size: 1.1rem;
    line-height: 1.7;
    margin: 0 0 2rem 0;
  }
}

// 操作按鈕
.error-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.btn-primary,
.btn-secondary {
  flex: 1;
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
  border: none;

  svg {
    flex-shrink: 0;
  }
}

.btn-primary {
  background: #2c4894;
  color: white;

  &:hover {
    background: #1e3470;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(44, 72, 148, 0.3);
  }
}

.btn-secondary {
  background: white;
  color: #2c4894;
  border: 2px solid #2c4894;

  &:hover {
    background: #f8f9fa;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(44, 72, 148, 0.15);
  }
}

// 熱門連結
.popular-links {
  border-top: 2px solid #e9ecef;
  padding-top: 2rem;

  h3 {
    font-size: 1.2rem;
    color: #333;
    margin: 0 0 1rem 0;
  }

  .link-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;

    li {
      a {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1rem;
        background: #f8f9fa;
        border-radius: 8px;
        color: #2c4894;
        text-decoration: none;
        font-weight: 500;
        transition: all 0.2s ease;

        svg {
          flex-shrink: 0;
          opacity: 0;
          transform: translateX(-5px);
          transition: all 0.2s ease;
        }

        &:hover {
          background: #e7f1ff;
          transform: translateX(3px);

          svg {
            opacity: 1;
            transform: translateX(0);
          }
        }
      }
    }
  }
}

// 平板響應式
@media (max-width: 1024px) {
  .error-container {
    max-width: 700px;
    gap: 2rem;
  }

  .error-content {
    padding: 2rem;

    .error-title {
      font-size: 2rem;
    }
  }
}

// 手機響應式
@media (max-width: 768px) {
  .error-page {
    padding: 1.5rem 1rem;
  }

  .error-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .error-image {
    img {
      max-width: 300px;
    }
  }

  .error-content {
    padding: 2rem 1.5rem;

    .error-title {
      font-size: 1.75rem;
    }

    .error-description {
      font-size: 1rem;
    }
  }

  .error-actions {
    flex-direction: column;
    gap: 0.75rem;
  }

  .popular-links {
    .link-list {
      grid-template-columns: 1fr;
    }
  }
}

// 小手機響應式
@media (max-width: 480px) {
  .error-page {
    padding: 1rem;
  }

  .error-image {
    img {
      max-width: 250px;
    }
  }

  .error-content {
    padding: 1.5rem 1rem;

    .error-title {
      font-size: 1.5rem;
    }

    .error-description {
      font-size: 0.95rem;
      margin-bottom: 1.5rem;
    }
  }

  .btn-primary,
  .btn-secondary {
    padding: 0.75rem 1.25rem;
    font-size: 0.95rem;
  }

  .popular-links {
    padding-top: 1.5rem;

    h3 {
      font-size: 1.1rem;
    }

    .link-list {
      gap: 0.5rem;

      li a {
        padding: 0.65rem 0.875rem;
        font-size: 0.9rem;
      }
    }
  }
}
</style>