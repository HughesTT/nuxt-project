<template>
  <div class="member-page">
    <div class="page-container">
      <div class="page-header">
        <h1>會員資訊</h1>
      </div>

      <div class="member-content">
        <div class="info-card">
          <div class="card-header">
            <h2>基本資料</h2>
            <button class="edit-btn" @click="isEditing = !isEditing">{{ isEditing ? '取消' : '編輯' }}</button>
          </div>

          <form @submit.prevent="saveProfile" class="profile-form">
            <div class="form-group">
              <label>會員姓名</label>
              <input type="text" v-model="profile.name" :disabled="!isEditing" />
            </div>

            <div class="form-group">
              <label>電子郵件</label>
              <input type="email" v-model="profile.email" :disabled="!isEditing" />
            </div>

            <div class="form-group">
              <label>聯絡電話</label>
              <input type="tel" v-model="profile.phone" :disabled="!isEditing" />
            </div>

            <div class="form-group">
              <label>收件地址</label>
              <textarea v-model="profile.address" :disabled="!isEditing" rows="3"></textarea>
            </div>
          </form>
        </div>

        <div class="info-card">
          <div class="card-header">
            <h2>會員統計</h2>
          </div>

          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
              <div class="stat-info">
                <div class="stat-value">{{ orderCount }}</div>
                <div class="stat-label">訂單數量</div>
              </div>
            </div>

            <div class="stat-item">
              <div class="stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                  </path>
                </svg>
              </div>
              <div class="stat-info">
                <div class="stat-value">{{ wishlistCount }}</div>
                <div class="stat-label">追蹤商品</div>
              </div>
            </div>

            <div class="stat-item">
              <div class="stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <div class="stat-info">
                <div class="stat-value">NT$ {{ totalSpent.toLocaleString() }}</div>
                <div class="stat-label">累計消費</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '~/composable/useToast'
import { useFavorite } from '~/composable/useFavorite'

const { showToast } = useToast()
const { favorites } = useFavorite()

// 會員資料
const profile = ref({
  name: '輝達黃老爹',
  email: 'example@email.com',
  phone: '0912-345-678',
  address: '輝達大樓輝達路123號'
})

const isEditing = ref(false)

// 統計資料
const orderCount = ref(0)
const wishlistCount = computed(() => favorites.value?.length || 0)
const totalSpent = ref(12345)

// 載入會員資料（從 localStorage 或 API）
onMounted(() => {
  if (typeof window !== 'undefined') { // 確定在瀏覽器環境
    const savedProfile = localStorage.getItem('memberProfile') // 從 localStorage 取出會員資料
    if (savedProfile) { // 如果有資料，轉換類型並賦值給 profile
      profile.value = JSON.parse(savedProfile)
    }

    // 載入訂單統計
    const orders = localStorage.getItem('orders') // 從 localStorage 取出訂單資料
    if (orders) { // 如果有資料，轉換類型並計算統計
      const orderList = JSON.parse(orders)
      orderCount.value = orderList.length // 訂單數量
      totalSpent.value = orderList.reduce((sum, order) => sum + order.total, 0) // 累計消費金額
    }
  }
})

// 切換編輯模式
const toggleEdit = () => {
  isEditing.value = !isEditing.value
}

// 儲存會員資料
const saveProfile = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('memberProfile', JSON.stringify(profile.value))
    showToast('會員資料已更新', 'success')
    isEditing.value = false
  }
}

// SEO
useSeoMeta({
  title: '會員資訊',
  description: '查看及編輯您的會員資料'
})
</script>

<style lang="scss" scoped>
.member-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 2rem 1rem;

  .page-container {
    max-width: 900px;
    margin: 0 auto;

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;

      h1 {
        font-size: 2rem;
        color: #333;
        margin: 0;
      }

      .back-link {
        color: #2c4894;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s;

        &:hover {
          color: #1e3470;
        }
      }
    }
  }

  .member-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .info-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #f0f0f0;

      h2 {
        font-size: 1.3rem;
        color: #333;
        margin: 0;
      }

      .edit-btn {
        padding: 0.5rem 1.25rem;
        background: #2c4894;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 0.9rem;
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: #1e3470;
        }
      }
    }
  }

  .profile-form {
    .form-group {
      width: 96%;
      margin-bottom: 1.5rem;

      label {
        display: block;
        font-weight: 600;
        color: #555;
        margin-bottom: 0.5rem;
      }

      input,
      textarea {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s;

        &:focus {
          outline: none;
          border-color: #2c4894;
        }

        &:disabled {
          background: #f5f5f5;
          cursor: not-allowed;
        }
      }

      textarea {
        resize: vertical;
        font-family: inherit;
      }
    }

    .save-btn {
      width: 100%;
      padding: 0.875rem;
      background: #10b981;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: #059669;
      }
    }
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;

    .stat-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 10px;

      .stat-icon {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        border-radius: 10px;
        color: #2c4894;
      }

      .stat-info {
        .stat-value {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #666;
          margin-top: 0.25rem;
        }
      }
    }
  }

  // 響應式設計
  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }

    .page-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
  }
}
</style>
