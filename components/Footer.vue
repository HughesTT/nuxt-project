<template>
  <footer class="site-footer">
    <!-- 電子報訂閱區塊 -->
    <div class="newsletter-section">
      <div class="newsletter-container">
        <div class="newsletter-content">
          <div class="newsletter-text">
            <h3 class="newsletter-title">訂閱電子報</h3>
            <p class="newsletter-description">訂閱即可獲得最新優惠資訊、新品上市通知及專屬會員優惠</p>
          </div>
          <form @submit.prevent="handleSubscribe" class="newsletter-form">
            <div class="input-wrapper">
              <input v-model="email" type="email" placeholder="請輸入您的 Email" class="email-input" required />
              <button type="submit" class="subscribe-btn" :disabled="isSubmitting">
                <span v-if="!isSubmitting">訂閱</span>
                <span v-else>處理中...</span>
              </button>
            </div>
            <p v-if="emailError" class="error-message">{{ emailError }}</p>
          </form>
        </div>
      </div>
    </div>

    <!-- 主要內容區塊 -->
    <div class="footer-main">
      <div class="footer-container">
        <div class="footer-grid">

          <!-- 客戶服務 -->
          <div class="footer-column">
            <h4 class="column-title">客戶服務</h4>
            <ul class="footer-links">
              <li>
                <NuxtLink to="">幫助中心</NuxtLink>
              </li>
              <li>
                <NuxtLink to="">常見問題</NuxtLink>
              </li>
              <li>
                <NuxtLink to="">退換貨政策</NuxtLink>
              </li>
              <li>
                <NuxtLink to="">配送資訊</NuxtLink>
              </li>
              <li>
                <NuxtLink to="">保固服務</NuxtLink>
              </li>
            </ul>
          </div>

          <!-- 購物資訊 -->
          <div class="footer-column">
            <h4 class="column-title">購物資訊</h4>
            <ul class="footer-links">
              <li>
                <NuxtLink to="">購物指南</NuxtLink>
              </li>
              <li>
                <NuxtLink to="">付款方式</NuxtLink>
              </li>
              <li>
                <NuxtLink to="">會員權益</NuxtLink>
              </li>
              <li>
                <NuxtLink to="">訂單查詢</NuxtLink>
              </li>
              <li>
                <NuxtLink to="">優惠活動</NuxtLink>
              </li>
            </ul>

            <!-- 付款方式圖示 -->
            <div class="payment-methods-inline">
              <div class="payment-item" title="VISA">
                <svg viewBox="0 0 48 32" width="40" height="26">
                  <rect width="48" height="32" rx="4" fill="#1A1F71" />
                  <text x="24" y="20" font-family="Arial" font-size="12" font-weight="bold" fill="white"
                    text-anchor="middle">VISA</text>
                </svg>
              </div>
              <div class="payment-item" title="MasterCard">
                <svg viewBox="0 0 48 32" width="40" height="26">
                  <rect width="48" height="32" rx="4" fill="#EB001B" />
                  <circle cx="18" cy="16" r="8" fill="#FF5F00" opacity="0.8" />
                  <circle cx="30" cy="16" r="8" fill="#F79E1B" opacity="0.8" />
                </svg>
              </div>
              <div class="payment-item" title="LINE Pay">
                <svg viewBox="0 0 48 32" width="40" height="26">
                  <rect width="48" height="32" rx="4" fill="#00B900" />
                  <text x="24" y="20" font-family="Arial" font-size="10" font-weight="bold" fill="white"
                    text-anchor="middle">LINE Pay</text>
                </svg>
              </div>
              <div class="payment-item" title="Apple Pay">
                <svg viewBox="0 0 48 32" width="40" height="26">
                  <rect width="48" height="32" rx="4" fill="#000000" />
                  <text x="24" y="20" font-family="Arial" font-size="9" font-weight="bold" fill="white"
                    text-anchor="middle">Apple Pay</text>
                </svg>
              </div>
              <div class="payment-item" title="貨到付款">
                <svg viewBox="0 0 48 32" width="40" height="26">
                  <rect width="48" height="32" rx="4" fill="#607D8B" />
                  <text x="24" y="20" font-family="Arial" font-size="8" font-weight="bold" fill="white"
                    text-anchor="middle">貨到付款</text>
                </svg>
              </div>
            </div>
          </div>

          <!-- 聯絡資訊 -->
          <div class="footer-column">
            <h4 class="column-title">聯絡資訊</h4>
            <ul class="contact-info">
              <li class="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                  </path>
                </svg>
                <a href="tel:0223456789">02-2345-6789</a>
              </li>
              <li class="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <a href="mailto:service@example.com">service@example.com</a>
              </li>
              <li class="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>週一至週五 09:00-18:00</span>
              </li>
            </ul>
          </div>

          <!-- TechShop 社群連結 -->
          <div class="footer-column">
            <h4 class="column-title">TechShop</h4>
            <ul class="footer-links social-links-list">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social-link-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                    fill="currentColor">
                    <path
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-link-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                    fill="currentColor">
                    <path
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a href="https://line.me" target="_blank" rel="noopener noreferrer" class="social-link-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                    fill="currentColor">
                    <path
                      d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                  <span>LINE</span>
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="social-link-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                    fill="currentColor">
                    <path
                      d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span>YouTube</span>
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="social-link-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                    fill="currentColor">
                    <path
                      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>Twitter</span>
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>

    <!-- 底部版權區塊 -->
    <div class="footer-bottom">
      <div class="footer-container">
        <div class="footer-bottom-content">
          <p class="copyright">© 2026 TechShop. All rights reserved.</p>
          <div class="footer-links-inline">
            <NuxtLink to="">隱私權政策</NuxtLink>
            <span class="separator">|</span>
            <NuxtLink to="">使用條款</NuxtLink>
            <span class="separator">|</span>
            <NuxtLink to="">網站地圖</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useToast } from '~/composable/useToast'

const { showToast } = useToast()

// 表單狀態
const email = ref('')
const emailError = ref('')
const isSubmitting = ref(false)

// Email 格式驗證
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// 處理訂閱
const handleSubscribe = async () => {
  // 清除錯誤訊息
  emailError.value = ''

  // 驗證 Email
  if (!email.value) {
    emailError.value = '請輸入 Email 地址'
    return
  }

  if (!validateEmail(email.value)) {
    emailError.value = '請輸入有效的 Email 地址'
    return
  }

  // 提交訂閱
  isSubmitting.value = true

  try {
    // 模擬 API 請求
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 顯示成功訊息
    showToast('訂閱成功！感謝您的訂閱，我們會將最新優惠資訊寄送到您的信箱', 'success')

    // 清空表單
    email.value = ''
  } catch (error) {
    // 顯示錯誤訊息
    showToast('訂閱失敗，請稍後再試', 'error')
    emailError.value = '訂閱失敗，請稍後再試'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style lang="scss" scoped>
.site-footer {
  width: 100%;
  background: #1a1a1a;
  color: #e0e0e0;
}

// ========== 電子報訂閱區塊 ==========
.newsletter-section {
  background: linear-gradient(135deg, #2c4894 0%, #1e3470 100%);
  padding: 3rem 1rem;
}

.newsletter-container {
  max-width: 1400px;
  margin: 0 auto;
}

.newsletter-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.newsletter-text {
  flex: 1;

  .newsletter-title {
    font-size: 1.75rem;
    color: white;
    margin: 0 0 0.5rem 0;
    font-weight: 700;
  }

  .newsletter-description {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
  }
}

.newsletter-form {
  flex: 1;
  max-width: 500px;

  .input-wrapper {
    display: flex;
    gap: 0.5rem;
  }

  .email-input {
    flex: 1;
    padding: 0.875rem 1.25rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    transition: all 0.3s ease;

    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }

    &:focus {
      outline: none;
      border-color: white;
      background: rgba(255, 255, 255, 0.15);
    }
  }

  .subscribe-btn {
    padding: 0.875rem 2rem;
    background: white;
    color: #2c4894;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;

    &:hover:not(:disabled) {
      background: #f0f0f0;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  .error-message {
    color: #ff6b6b;
    font-size: 0.875rem;
    margin: 0.5rem 0 0 0;
  }
}

// ========== 主要內容區塊 ==========
.footer-main {
  padding: 4rem 1rem 2rem;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
}

.footer-column {
  .column-title {
    font-size: 1.125rem;
    color: white;
    margin: 0 0 1.5rem 0;
    font-weight: 700;
    position: relative;
    padding-bottom: 0.75rem;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 3px;
      background: linear-gradient(90deg, #2c4894, #667eea);
      border-radius: 2px;
    }
  }

  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 0.75rem;

      a {
        color: #b0b0b0;
        text-decoration: none;
        font-size: 0.95rem;
        transition: all 0.3s ease;
        display: inline-block;

        &:hover {
          color: #667eea;
          transform: translateX(5px);
        }
      }
    }
  }

  .contact-info {
    list-style: none;
    padding: 0;
    margin: 0;

    .contact-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      margin-bottom: 1rem;
      color: #b0b0b0;
      font-size: 0.95rem;
      line-height: 1.6;

      svg {
        flex-shrink: 0;
        margin-top: 0.125rem;
        color: #667eea;
      }

      a {
        color: #b0b0b0;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: #667eea;
        }
      }
    }
  }

  // 社群連結列表樣式
  .social-links-list {
    .social-link-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #b0b0b0;

      svg {
        flex-shrink: 0;
        color: #667eea;
      }

      span {
        font-size: 0.95rem;
      }

      &:hover {
        color: white;
        transform: translateX(5px);

        svg {
          color: white;
        }
      }
    }
  }

  // 付款方式內嵌樣式
  .payment-methods-inline {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1.5rem;

    .payment-item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.25rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 6px;
      transition: all 0.3s ease;
      cursor: default;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
      }

      svg {
        display: block;
      }
    }
  }
}



// ========== 底部版權區塊 ==========
.footer-bottom {
  background: #111;
  padding: 1.5rem 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  .copyright {
    color: #888;
    font-size: 0.9rem;
    margin: 0;
  }

  .footer-links-inline {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.9rem;

    a {
      color: #888;
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: #667eea;
      }
    }

    .separator {
      color: #555;
    }
  }
}

// ========== 響應式設計 ==========

// 平板 (≤1024px)
@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .newsletter-content {
    flex-direction: column;
    text-align: center;
  }

  .newsletter-form {
    width: 100%;
  }

  .footer-column .payment-methods-inline {
    justify-content: flex-start;
  }
}

// 手機 (≤768px)
@media (max-width: 768px) {
  .newsletter-section {
    padding: 1.5rem 1rem;
  }

  .newsletter-text {
    .newsletter-title {
      font-size: 1.25rem;
      margin-bottom: 0.375rem;
    }

    .newsletter-description {
      font-size: 0.85rem;
      line-height: 1.4;
    }
  }

  .newsletter-form {
    .input-wrapper {
      flex-direction: column;
      gap: 0.375rem;
    }

    .email-input {
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
    }

    .subscribe-btn {
      width: 100%;
      padding: 0.75rem 1.5rem;
      font-size: 0.95rem;
    }
  }

  .footer-main {
    padding: 2rem 1rem 1rem;
  }

  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.75rem;
  }

  .footer-column {
    .column-title {
      font-size: 1rem;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;

      &::after {
        height: 2px;
        width: 30px;
      }
    }

    .footer-links {
      li {
        margin-bottom: 0.5rem;

        a {
          font-size: 0.875rem;
        }
      }
    }

    .contact-info .contact-item {
      margin-bottom: 0.75rem;
      font-size: 0.875rem;

      svg {
        width: 14px;
        height: 14px;
      }
    }

    .social-links-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;

      li {
        margin-bottom: 0;
      }

      .social-link-item {
        font-size: 0.875rem;
        padding: 0.5rem 0.75rem;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 6px;
        transition: all 0.2s ease;

        svg {
          width: 16px;
          height: 16px;
        }

        &:hover {
          background: rgba(255, 255, 255, 0.08);
        }
      }
    }

    .payment-methods-inline {
      margin-top: 1rem;
      gap: 0.375rem;

      .payment-item {
        padding: 0.2rem;

        svg {
          width: 36px;
          height: 24px;
        }
      }
    }
  }

  .footer-bottom {
    padding: 1rem;
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;

    .copyright {
      font-size: 0.8rem;
    }

    .footer-links-inline {
      flex-wrap: wrap;
      justify-content: center;
      font-size: 0.8rem;
      gap: 0.5rem;
    }
  }
}

// 小手機 (≤480px)
@media (max-width: 480px) {
  .newsletter-section {
    padding: 1.25rem 1rem;
  }

  .newsletter-text {
    .newsletter-title {
      font-size: 1.125rem;
      margin-bottom: 0.25rem;
    }

    .newsletter-description {
      font-size: 0.8rem;
      line-height: 1.3;
    }
  }

  .newsletter-form {
    .email-input {
      padding: 0.65rem 0.875rem;
      font-size: 0.85rem;
    }

    .subscribe-btn {
      padding: 0.65rem 1.25rem;
      font-size: 0.9rem;
    }

    .error-message {
      font-size: 0.8rem;
      margin-top: 0.375rem;
    }
  }

  .footer-main {
    padding: 1.5rem 1rem 0.75rem;
  }

  .footer-grid {
    gap: 1.5rem;
  }

  .footer-column {
    .column-title {
      font-size: 0.95rem;
      margin-bottom: 0.875rem;
    }

    .footer-links li {
      margin-bottom: 0.4rem;

      a {
        font-size: 0.825rem;
      }
    }

    .contact-info .contact-item {
      margin-bottom: 0.625rem;
      font-size: 0.825rem;
      gap: 0.5rem;

      svg {
        width: 13px;
        height: 13px;
      }
    }

    .social-links-list {
      gap: 0.375rem;

      .social-link-item {
        font-size: 0.825rem;
        padding: 0.4rem 0.625rem;

        svg {
          width: 15px;
          height: 15px;
        }
      }
    }

    .payment-methods-inline {
      margin-top: 0.875rem;
      gap: 0.3rem;

      .payment-item {
        padding: 0.15rem;

        svg {
          width: 34px;
          height: 22px;
        }
      }
    }
  }

  .footer-bottom {
    padding: 0.875rem 1rem;
  }

  .footer-bottom-content {
    gap: 0.4rem;

    .copyright {
      font-size: 0.75rem;
    }

    .footer-links-inline {
      font-size: 0.75rem;
      gap: 0.4rem;
    }
  }
}
</style>