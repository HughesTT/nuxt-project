<template>
  <LoadingOverlay :active="isLoading" loader="bars" />
  <Breadcrumb />
  <div class="search-page">
    <!-- 搜尋標題區 -->
    <div class="page-header">
      <h1>商品搜尋</h1>
    </div>

    <!-- 搜尋欄位區 -->
    <div class="search-bar-container">
      <div class="search-bar">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input type="text" v-model="searchText" @keyup.enter="performSearch" placeholder="輸入商品名稱搜尋..."
          class="search-input" />
        <button @click="performSearch" class="search-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          搜尋
        </button>
      </div>
    </div>

    <!-- 搜尋結果區 -->
    <div class="search-results">
      <!-- 載入中 -->
      <div v-if="isLoading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>搜尋中，請稍候...</p>
      </div>

      <!-- 無結果 -->
      <div v-else-if="hasSearched && filteredResults.length === 0" class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
        <h3>沒有找到相關商品</h3>
        <p>請嘗試使用其他關鍵字搜尋</p>
      </div>

      <!-- 有結果 -->
      <div v-else-if="filteredResults.length > 0" class="results-container">
        <div class="results-header">
          <h2>搜尋結果</h2>
          <span class="results-count">共找到 {{ filteredResults.length }} 件商品</span>
        </div>

        <div class="product-grid">
          <div v-for="product in filteredResults" :key="product.id" class="product-card"
            @click="viewProduct(product.id)">
            <div class="product-image">
              <img :src="product.imageUrl" :alt="product.title" />
            </div>
            <div class="product-info">
              <span class="product-category">{{ product.category }}</span>
              <h3 class="product-title">{{ product.title }}</h3>
              <div class="product-price">
                <span class="original-price" v-if="product.origin_price !== product.price">
                  NT$ {{ product.origin_price.toLocaleString() }}
                </span>
                <span class="current-price">NT$ {{ product.price.toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 初始狀態 -->
      <div v-else class="initial-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <h3>開始搜尋商品</h3>
        <p>在上方搜尋欄輸入商品名稱，即可找到您想要的商品</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useToast } from '~/composable/useToast'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '~/store/productStore'
import { useStatusStore } from '~/store/statusStore'
import { ref, computed, onMounted } from 'vue'


const route = useRoute()
const router = useRouter()
const statusStore = useStatusStore()
const productStore = useProductStore()

const { showToast } = useToast()
const { isLoading } = storeToRefs(statusStore) // 狀態使用 storeToRefs 維持響應性
const { allProducts } = storeToRefs(productStore)
const { getAllProducts } = productStore  // 方法直接解構

const searchQuery = computed(() => route.query.q) // 從 URL 參數獲取搜尋關鍵字資料
const searchText = ref('')
const filteredResults = ref([])
const hasSearched = ref(false)

// 監聽 URL 參數變化，更新搜尋文字和結果
const performSearch = async () => {
  const keyword = searchText.value.trim()

  if (!keyword) {
    showToast('請輸入搜尋商品名稱', 'warning')
    return
  }
  isLoading.value = true
  hasSearched.value = true

  try {
    if (keyword !== searchQuery.value) {
      await router.push({
        path: route.path,
        query: { q: keyword }
      })
    }
    const results = allProducts.value.filter(product => product.title.toLowerCase().includes(keyword.toLowerCase())
    )
    filteredResults.value = results
  } catch (error) {
    console.error('搜尋失敗:', error)
    showToast('搜尋失敗，請稍後再試', 'error')
  } finally {
    isLoading.value = false
  }
}

// 導向至個別商品詳情頁面
const viewProduct = (productId) => {
  router.push(`/products/detail/${productId}`)
}

onMounted(async () => {
  isLoading.value = true
  try {
    await getAllProducts() // 待產品資料載入完成

    if (searchQuery.value) {
      searchText.value = searchQuery.value
      await performSearch() // 根據 URL 參數執行搜尋
    }
  } catch (error) {
    console.error('載入產品資料失敗:', error)
    showToast('載入產品資料失敗，請稍後再試', 'error')
  } finally {
    isLoading.value = false
  }
})

// SEO
useSeoMeta({
  title: `搜尋結果: ${searchQuery.value}`,
  description: `查看您的搜尋結果: ${searchQuery.value}`
})
</script>

<style lang="scss" scoped>
.search-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem 5rem 1rem;
  min-height: calc(100vh - 200px);
}

// ========== 頁面標題 ==========
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-left: 1rem;
  border-left: solid 15px #2c4894;

  h1 {
    font-size: 2rem;
    color: #333;
    margin: 0;
    font-weight: 700;
  }
}

// ========== 搜尋欄位區 ==========
.search-bar-container {
  margin-bottom: 3rem;
  display: flex;
  justify-content: center;
}

.search-bar {
  position: relative;
  width: 100%;
  max-width: 800px;
  display: flex;
  gap: 1rem;
  background: white;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;

  &:focus-within {
    box-shadow: 0 6px 30px rgba(44, 72, 148, 0.15);
  }

  .search-icon {
    flex-shrink: 0;
    color: #999;
    margin-top: 0.25rem;
  }

  .search-input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1.1rem;
    color: #333;
    background: transparent;

    &::placeholder {
      color: #aaa;
    }
  }

  .search-button {
    flex-shrink: 0;
    padding: 0.75rem 2rem;
    background: #2c4894;
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      flex-shrink: 0;
    }

    &:hover {
      background: #1e3470;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(44, 72, 148, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

// ========== 搜尋結果區 ==========
.search-results {
  width: 100%;
}

// 載入中狀態
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  color: #666;

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #e9ecef;
    border-top-color: #2c4894;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.1rem;
    margin: 0;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

// 空狀態
.empty-state,
.initial-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  text-align: center;

  svg {
    color: #ccc;
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1.5rem;
    color: #666;
    margin: 0 0 0.75rem 0;
  }

  p {
    color: #999;
    font-size: 1rem;
    margin: 0;
    max-width: 400px;
  }
}

.initial-state {
  svg {
    color: #2c4894;
    opacity: 0.3;
  }

  h3 {
    color: #333;
  }
}

// ========== 結果容器 ==========
.results-container {
  .results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #e9ecef;

    h2 {
      font-size: 1.5rem;
      color: #333;
      margin: 0;
      font-weight: 700;
    }

    .results-count {
      color: #2c4894;
      font-size: 1rem;
      font-weight: 600;
      background: #e7f1ff;
      padding: 0.5rem 1rem;
      border-radius: 20px;
    }
  }
}

// ========== 產品網格 ==========
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.product-card {
  cursor: pointer;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  .product-image {
    width: 100%;
    height: 220px;
    background: #f5f5f5;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }

  &:hover .product-image img {
    transform: scale(1.05);
  }

  .product-info {
    padding: 1.25rem;

    .product-category {
      display: inline-block;
      background: #e3f2fd;
      color: #1976d2;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .product-title {
      font-size: 1.1rem;
      color: #333;
      margin: 0.5rem 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .product-description {
      color: #666;
      font-size: 0.9rem;
      line-height: 1.5;
      margin: 0.5rem 0 1rem;
      height: 3em;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .product-price {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      .original-price {
        color: #999;
        text-decoration: line-through;
        font-size: 0.95rem;
      }

      .current-price {
        color: #ff4757;
        font-size: 1.3rem;
        font-weight: bold;
      }
    }
  }
}

// ========== 響應式設計 ==========

// 平板
@media (max-width: 1024px) {
  .search-page {
    padding: 1.5rem 1rem;
  }

  .page-header h1 {
    font-size: 1.75rem;
  }

  .search-bar {
    padding: 0.65rem 1.25rem;

    .search-input {
      font-size: 1rem;
    }

    .search-button {
      padding: 0.65rem 1.5rem;
      font-size: 0.95rem;
    }
  }

  .product-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
}

// 手機
@media (max-width: 768px) {
  .search-page {
    padding: 1rem;
  }

  .page-header {
    margin-bottom: 1.5rem;

    h1 {
      font-size: 1.5rem;
    }
  }

  .search-bar-container {
    margin-bottom: 2rem;
  }

  .search-bar {
    flex-direction: column;
    padding: 1rem;
    border-radius: 16px;
    gap: 0.75rem;

    .search-icon {
      display: none;
    }

    .search-input {
      font-size: 1rem;
      padding: 0.5rem 0;
      border-bottom: 2px solid #e9ecef;
    }

    .search-button {
      width: 100%;
      padding: 0.875rem;
      border-radius: 12px;
      justify-content: center;
    }
  }

  .results-container .results-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;

    h2 {
      font-size: 1.3rem;
    }

    .results-count {
      font-size: 0.9rem;
      padding: 0.4rem 0.875rem;
    }
  }

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    .product-card {
      .product-image {
        height: 180px;
      }

      .product-info {
        padding: 1rem;

        .product-title {
          font-size: 1rem;
        }

        .product-description {
          font-size: 0.85rem;
        }

        .product-price {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.25rem;

          .original-price {
            font-size: 0.85rem;
          }

          .current-price {
            font-size: 1.15rem;
          }
        }
      }
    }
  }

  .empty-state,
  .initial-state,
  .loading-state {
    padding: 3rem 1.5rem;

    svg {
      width: 60px;
      height: 60px;
    }

    h3 {
      font-size: 1.25rem;
    }

    p {
      font-size: 0.95rem;
    }
  }
}

// 小手機
@media (max-width: 480px) {
  .page-header h1 {
    font-size: 1.3rem;
  }

  .product-grid {
    grid-template-columns: 1fr;

    .product-card {
      .product-image {
        height: 200px;
      }
    }
  }

  .results-container .results-header {
    h2 {
      font-size: 1.2rem;
    }
  }
}
</style>