<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h1>會員登入</h1>
          <p>歡迎回來！請登入您的帳戶</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email">電子郵件</label>
            <input type="email" id="email" v-model="email" placeholder="example@email.com" required />
          </div>

          <div class="form-group">
            <label for="password">密碼</label>
            <input type="password" id="password" v-model="password" placeholder="請輸入密碼" required />
          </div>

          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox" v-model="rememberMe" />
              <span>記住我</span>
            </label>
            <a href="#" class="forgot-password">忘記密碼？</a>
          </div>

          <button type="submit" class="login-btn">登入</button>
        </form>

        <div class="login-footer">
          <p>還沒有帳戶？<a href="#" @click.prevent="showToast('註冊功能開發中', 'info')">立即註冊</a></p>
        </div>

        <div class="divider">
          <span>或使用以下方式登入</span>
        </div>

        <div class="social-login">
          <button @click="socialLogin('google')" class="social-btn google">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4" />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853" />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05" />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335" />
            </svg>
            Google
          </button>

          <button @click="socialLogin('facebook')" class="social-btn facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </button>
        </div>

        <NuxtLink to="/" class="back-home">← 返回首頁</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '~/composable/useToast'

const { showToast } = useToast()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)

// 登入處理
const handleLogin = () => {
  // 這裡應該連接實際的 API
  // 目前僅示範功能
  if (email.value && password.value) {
    showToast('登入成功！', 'success')

    // 模擬儲存登入狀態
    if (typeof window !== 'undefined') {
      localStorage.setItem('isLoggedIn', 'true')
      if (rememberMe.value) {
        localStorage.setItem('userEmail', email.value)
      }
    }

    // 導向首頁
    setTimeout(() => {
      navigateTo('/')
    }, 1000)
  } else {
    showToast('請輸入完整的登入資訊', 'warning')
  }
}

// 社交登入
const socialLogin = (provider) => {
  showToast(`${provider} 登入功能開發中`, 'info')
}

// SEO
useSeoMeta({
  title: '會員登入',
  description: '登入您的帳戶'
})
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;

  .login-container {
    width: 100%;
    max-width: 450px;

    .login-card {
      background: white;
      border-radius: 16px;
      padding: 3rem 2.5rem;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

      .login-header {
        text-align: center;
        margin-bottom: 2rem;

        h1 {
          font-size: 2rem;
          color: #333;
          margin: 0 0 0.5rem;
        }

        p {
          color: #666;
          margin: 0;
        }
      }

      .login-form {
        .form-group {
          margin-bottom: 1.5rem;

          label {
            display: block;
            font-weight: 600;
            color: #555;
            margin-bottom: 0.5rem;
          }

          input {
            width: 100%;
            padding: 0.875rem;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s;

            &:focus {
              outline: none;
              border-color: #667eea;
            }
          }
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;

          .remember-me {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;

            input[type="checkbox"] {
              width: 18px;
              height: 18px;
              cursor: pointer;
            }

            span {
              color: #666;
              font-size: 0.95rem;
            }
          }

          .forgot-password {
            color: #667eea;
            text-decoration: none;
            font-size: 0.95rem;
            transition: color 0.3s;

            &:hover {
              color: #764ba2;
            }
          }
        }

        .login-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;

          &:hover {
            transform: translateY(-2px);
          }

          &:active {
            transform: translateY(0);
          }
        }
      }

      .login-footer {
        text-align: center;
        margin-top: 1.5rem;

        p {
          color: #666;
          margin: 0;

          a {
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.3s;

            &:hover {
              color: #764ba2;
            }
          }
        }
      }

      .divider {
        position: relative;
        text-align: center;
        margin: 2rem 0;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 100%;
          height: 1px;
          background: #e0e0e0;
        }

        span {
          position: relative;
          background: white;
          padding: 0 1rem;
          color: #999;
          font-size: 0.9rem;
        }
      }

      .social-login {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;

        .social-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          background: white;
          color: #666;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;

          &:hover {
            border-color: #667eea;
            transform: translateY(-2px);
          }

          &.google:hover {
            border-color: #4285F4;
          }

          &.facebook {
            svg {
              fill: #1877f2;
            }

            &:hover {
              border-color: #1877f2;
            }
          }
        }
      }

      .back-home {
        display: block;
        text-align: center;
        color: #667eea;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s;

        &:hover {
          color: #764ba2;
        }
      }
    }
  }

  // 響應式設計
  @media (max-width: 480px) {
    .login-card {
      padding: 2rem 1.5rem !important;
    }

    .social-login {
      flex-direction: column;
    }
  }
}
</style>
