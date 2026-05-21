<template>
  <div class="best-selling-section">
    <div class="section-container">
      <!-- 區塊標題 -->
      <div class="section-header">
        <h2 class="section-title">你可能感興趣的</h2>
      </div>

      <!-- 載入狀態 -->
      <div v-if="isLoading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>載入中...</p>
      </div>

      <!-- 產品卡片網格 -->
      <div v-else-if="randomProducts.length > 0" class="products-grid">
        <div v-for="product in randomProducts" :key="product.id" class="product-card" @click="goToDetail(product.id)">
          <!-- 產品圖片 -->
          <div class="product-image-wrapper">
            <img :src="product.imageUrl" :alt="product.title" class="product-image" loading="lazy" />
            <!-- 折扣標籤 -->
            <div v-if="product.origin_price !== product.price" class="discount-badge">
              省 {{ calculateDiscount(product) }}%
            </div>
            <!-- 追蹤按鈕 -->
            <button @click.stop="handleToggleFavorite(product)" class="favorite-btn"
              :class="{ 'is-favorited': isFavorited(product.id) }" :title="isFavorited(product.id) ? '取消追蹤' : '加入追蹤'">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                :fill="isFavorited(product.id) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                </path>
              </svg>
            </button>
          </div>

          <!-- 產品資訊 -->
          <div class="product-info">
            <!-- 分類標籤 -->
            <div class="product-meta">
              <span class="category-badge">{{ product.category }}</span>
            </div>

            <!-- 產品標題 -->
            <h3 class="product-title">{{ product.title }}</h3>

            <!-- 價格 -->
            <div class="product-price">
              <span class="original-price" v-if="product.origin_price !== product.price">
                NT$ {{ product.origin_price.toLocaleString() }}
              </span>
              <span class="current-price">NT$ {{ product.price.toLocaleString() }}</span>
            </div>

            <!-- 操作按鈕 -->
            <div class="product-actions">
              <button @click.stop="handleAddToCart(product)" class="add-to-cart-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 無商品狀態 -->
      <div v-else class="empty-state">
        <p>目前沒有可顯示的商品</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useProductStore } from '~/store/productStore'
import { useStatusStore } from '~/store/statusStore'
import { useCart } from '~/composable/useCart'
import { useFavorite } from '~/composable/useFavorite'

const router = useRouter()
const productStore = useProductStore()
const statusStore = useStatusStore()
const cart = useCart()
const favorite = useFavorite()

const { isLoading } = storeToRefs(statusStore)
const { allProducts } = storeToRefs(productStore)
const { getAllProducts } = productStore
const { addToCart } = cart
const { toggleFavorite, favoritedIds, getFavorite } = favorite

// 隨機選擇的產品
const randomProducts = ref([])

// 從所有產品中隨機選擇 4 個
const selectRandomProducts = () => {
  if (!allProducts.value || allProducts.value.length === 0) {
    randomProducts.value = []
    return
  }

  // 複製陣列避免修改原始資料
  const products = [...allProducts.value]

  // Fisher-Yates 洗牌演算法
  for (let i = products.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [products[i], products[j]] = [products[j], products[i]]
  }

  // 取前 4 個
  randomProducts.value = products.slice(0, 4)
}

// 計算折扣百分比
const calculateDiscount = (product) => {
  if (product.origin_price === product.price) return 0
  const discount = ((product.origin_price - product.price) / product.origin_price) * 100
  return Math.round(discount)
}

// 檢查是否已追蹤
const isFavorited = (productId) => {
  return favoritedIds.value.includes(productId)
}

// 導向商品詳情頁
const goToDetail = (productId) => {
  router.push(`/products/detail/${productId}`)
}

// 加入購物車
const handleAddToCart = (product) => {
  addToCart(product, 1)
}

// 切換追蹤狀態
const handleToggleFavorite = (product) => {
  toggleFavorite(product)
}

// 初始化
onMounted(async () => {
  isLoading.value = true
  try {
    // 載入產品資料
    if (allProducts.value.length === 0) {
      await getAllProducts()
    }

    // 選擇隨機產品
    selectRandomProducts()

    // 載入追蹤清單
    getFavorite()
  } catch (error) {
    console.error('載入產品失敗:', error)
  } finally {
    isLoading.value = false
  }
})

// 監聽產品資料變化
watch(allProducts, () => {
  selectRandomProducts()
})
</script>

<style lang="scss" scoped>
.best-selling-section {
  width: 100%;
  padding: 4rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.section-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
}

// 區塊標題
.section-header {
  text-align: center;
  margin-bottom: 3rem;

  .section-title {
    font-size: 2.5rem;
    color: #333;
    margin: 0 0 0.75rem 0;
    font-weight: 700;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
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

// 載入狀態
.loading-state {
  text-align: center;
  padding: 4rem 2rem;

  .loading-spinner {
    width: 50px;
    height: 50px;
    margin: 0 auto 1rem;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #2c4894;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  p {
    color: #666;
    font-size: 1rem;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

// 空狀態
.empty-state {
  text-align: center;
  padding: 4rem 0;
  color: #999;
  font-size: 1.125rem;
}

// 產品網格
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

// 產品卡片
.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);

    .product-image {
      transform: scale(1.05);
    }
  }
}

// 產品圖片區域
.product-image-wrapper {
  position: relative;
  width: 100%;
  height: 250px;
  background: #f8f9fa;
  overflow: hidden;

  .product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  // 折扣標籤
  .discount-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: linear-gradient(135deg, #ff4757 0%, #ff6348 100%);
    color: white;
    padding: 0.375rem 0.75rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 700;
    box-shadow: 0 2px 8px rgba(255, 71, 87, 0.4);
  }

  // 追蹤按鈕
  .favorite-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.95);
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ff4757;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: scale(1.1);
      background: white;
    }

    &.is-favorited {
      background: #ff4757;
      color: white;
      animation: heartBeat 0.3s ease;

      &:hover {
        background: #ff6b81;
      }
    }
  }
}

// 產品資訊
.product-info {
  padding: 1.5rem;
}

.product-meta {
  margin-bottom: 0.75rem;

  .category-badge {
    display: inline-block;
    background: #e3f2fd;
    color: #1976d2;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
  }
}

.product-title {
  font-size: 1.125rem;
  color: #333;
  margin: 0 0 0.75rem 0;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-description {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0 0 1rem 0;
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
  margin-bottom: 1rem;

  .original-price {
    color: #999;
    text-decoration: line-through;
    font-size: 0.95rem;
  }

  .current-price {
    color: #ff4757;
    font-size: 1.375rem;
    font-weight: bold;
  }
}

.product-actions {
  .add-to-cart-btn {
    width: 100%;
    padding: 0.875rem;
    background: #2c4894;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:hover {
      background: #1e3470;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(44, 72, 148, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

// 心跳動畫
@keyframes heartBeat {
  0% {
    transform: scale(1);
  }

  25% {
    transform: scale(1.2);
  }

  50% {
    transform: scale(1);
  }

  75% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

// 平板響應式 (≤1024px)
@media (max-width: 1024px) {
  .best-selling-section {
    padding: 3rem 0;
  }

  .section-header {
    margin-bottom: 2.5rem;

    .section-title {
      font-size: 2rem;
    }

    .section-subtitle {
      font-size: 1rem;
    }
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .product-image-wrapper {
    height: 220px;
  }
}

// 手機響應式 (≤768px)
@media (max-width: 768px) {
  .best-selling-section {
    padding: 2rem 0;
  }

  .section-header {
    margin-bottom: 2rem;

    .section-title {
      font-size: 1.75rem;
    }

    .section-subtitle {
      font-size: 0.95rem;
    }
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .product-card {
    border-radius: 12px;

    &:hover {
      transform: translateY(-4px);
    }
  }

  .product-image-wrapper {
    height: 180px;

    .discount-badge {
      top: 0.75rem;
      left: 0.75rem;
      padding: 0.25rem 0.625rem;
      font-size: 0.8rem;
    }

    .favorite-btn {
      top: 0.75rem;
      right: 0.75rem;
      width: 36px;
      height: 36px;

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }

  .product-info {
    padding: 1rem;
  }

  .product-title {
    font-size: 1rem;
  }

  .product-description {
    font-size: 0.85rem;
  }

  .product-price {
    display: grid;

    .original-price {
      font-size: 0.875rem;
    }

    .current-price {
      font-size: 1.25rem;
    }
  }

  .product-actions .add-to-cart-btn {
    padding: 0.75rem;
    font-size: 0.9rem;

    svg {
      width: 16px;
      height: 16px;
    }
  }
}

// 小型手機 (≤480px)
@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .product-image-wrapper {
    height: 220px;
  }

  .product-info {
    padding: 1.25rem;
  }
}
</style>