<template>
  <LoadingOverlay :active="isLoading" loader="bars" />
  <Breadcrumb />
  <div class="product-detail-page" v-if="product">
    <!-- 返回按鈕 -->

    <!-- 商品詳情內容 -->
    <div class="product-detail-container">
      <!-- 左側：商品圖片 -->
      <div class="product-images">
        <div class="main-image">
          <img :src="currentImage" :alt="product.title" />
        </div>
        <!-- 縮圖列表 -->
        <div class="thumbnail-list" v-if="product.imagesUrl && product.imagesUrl.length > 0">
          <div v-for="(img, index) in allImages" :key="index" class="thumbnail"
            :class="{ active: currentImage === img }" @click="currentImage = img">
            <img :src="img" :alt="`${product.title} - 圖片 ${index + 1}`" />
          </div>
        </div>
      </div>

      <!-- 右側：商品資訊 -->
      <div class="product-info">
        <!-- 商品分類 -->
        <div class="product-meta">
          <span class="category-badge">{{ product.category }}</span>
          <span class="unit-badge">{{ getUnitDisplayName(product.unit) }}</span>
        </div>

        <!-- 商品標題 -->
        <h1 class="product-title">{{ product.title }}</h1>


        <!-- 商品內容 -->
        <div class="product-content" v-if="product.content">
          <div v-html="product.content"></div>
        </div>

        <!-- 價格 -->
        <div class="price-section">
          <div class="price-info">
            <span class="original-price" v-if="product.origin_price !== product.price">
              NT$ {{ product.origin_price.toLocaleString() }}
            </span>
            <span class="current-price">NT$ {{ product.price.toLocaleString() }}</span>
          </div>
          <div class="discount-badge" v-if="product.origin_price !== product.price">
            省 NT$ {{ (product.origin_price - product.price).toLocaleString() }}
          </div>

          <!-- 商品狀態 -->
          <div class="product-status">
            <span v-if="product.is_enabled === 1" class="status-badge available">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              現貨供應
            </span>
            <span v-else class="status-badge unavailable">暫時缺貨</span>
          </div>
        </div>

        <!-- 數量選擇 -->
        <div class="quantity-section">
          <label>數量：</label>
          <div class="quantity-controls">
            <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
            <input type="number" v-model.number="quantity" min="1" max="99" />
            <button @click="increaseQuantity" :disabled="quantity >= 99">+</button>
          </div>
        </div>

        <!-- 操作按鈕 -->
        <div class="action-buttons">
          <button class="add-to-cart-btn" @click="handleAddToCart">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            加入購物車
          </button>
          <button class="add-to-wishlist-btn" :class="{ 'is-favorited': isFavorited }" @click="handleToggleFavorite">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
              :fill="isFavorited ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
              </path>
            </svg>
            {{ isFavorited ? '已追蹤' : '加入追蹤' }}
          </button>
        </div>

      </div>
    </div>

    <!-- 商品詳細說明區域 -->
    <div class="detail-content">
      <h3>商品資訊說明</h3>
      <div class="detail-description-section">
        <p class="product-description">{{ product.description }}</p>
      </div>

      <!-- 圖片網格區域 -->
      <div class="detail-images-grid">
        <div v-if="product.images && product.images[0]" class="detail-image-section">
          <img :src="product.images[0]" :alt="`${product.title} - 詳細圖片 1`" loading="lazy" />
        </div>
        <div v-if="product.images && product.images[1]" class="detail-image-section">
          <img :src="product.images[1]" :alt="`${product.title} - 詳細圖片 2`" loading="lazy" />
        </div>
      </div>
    </div>
  </div>

  <!-- 找不到商品 -->
  <div v-else-if="!isLoading" class="not-found">
    <h2>找不到此商品</h2>
    <p>抱歉，您查看的商品不存在或已下架。</p>
    <NuxtLink to="/" class="go-home-btn">返回首頁</NuxtLink>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '~/store/productStore'
import { useStatusStore } from '~/store/statusStore'
import { useCart } from '~/composable/useCart'
import { useFavorite } from '~/composable/useFavorite'
import { useProductType } from '~/composable/useProductType'

const route = useRoute()
const router = useRouter()
const statusStore = useStatusStore()
const productStore = useProductStore()
const cart = useCart()
const favorite = useFavorite()
const productType = useProductType()

const { isLoading } = storeToRefs(statusStore)
const { allProducts } = storeToRefs(productStore)
const { getAllProducts } = productStore
const { addToCart } = cart
const { toggleFavorite, favoritedIds, getFavorite } = favorite

// 商品資料
const product = ref(null)
const quantity = ref(1)
const currentImage = ref('')

// 取得商品 ID
const productId = computed(() => String(route.params.id))

// 檢查是否已追蹤
const isFavorited = computed(() => {
  return favoritedIds.value.includes(product.value?.id)
})

// 所有圖片（主圖 + 額外圖片）
const allImages = computed(() => {
  if (!product.value) return []
  const images = [product.value.imageUrl]
  if (product.value.imagesUrl && product.value.imagesUrl.length > 0) {
    images.push(...product.value.imagesUrl)
  }
  return images
})

// 取得產品類型顯示名稱
const getUnitDisplayName = (unit) => {
  const config = productType.getProductTypeConfig(unit)
  return config.displayName
}

// 載入商品詳細資料
const loadProductDetails = async () => {
  isLoading.value = true
  try {
    // 確認產品資料已載入
    if (allProducts.value.length === 0) {
      await getAllProducts()
    }

    // 從 store 尋找商品
    product.value = allProducts.value.find(p => p.id === productId.value)

    if (product.value) {
      // 設定預設圖片
      currentImage.value = product.value.imageUrl

      // 設定 SEO
      useSeoMeta({
        title: `${product.value.title} - 商品詳情`,
        description: product.value.description,
        ogTitle: product.value.title,
        ogDescription: product.value.description,
        ogImage: product.value.imageUrl
      })
    }
  } catch (error) {
    console.error('載入商品失敗:', error)
  } finally {
    isLoading.value = false
  }
}

// 返回上一頁
const goBack = () => {
  router.back()
}

// 增加數量
const increaseQuantity = () => {
  if (quantity.value < 99) {
    quantity.value++
  }
}

// 減少數量
const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

// 加入購物車
const handleAddToCart = () => {
  if (product.value) {
    addToCart(product.value, quantity.value)
  }
}

// 切換追蹤狀態
const handleToggleFavorite = () => {
  if (product.value) {
    toggleFavorite(product.value)
  }
}

// 監聽路由參數變化
watch(() => route.params.id, async () => {
  await loadProductDetails()
})

// 初始化
onMounted(async () => {
  await loadProductDetails()
  getFavorite() // 載入追蹤清單
})
</script>

<style lang="scss" scoped>
.product-detail-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;

  .back-nav {
    margin-bottom: 2rem;

    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: white;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      color: #666;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        border-color: #2c4894;
        color: #2c4894;
        background: #f8f9fa;
      }
    }
  }

  .product-detail-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  }

  .product-images {
    .main-image {
      width: 100%;
      height: 500px;
      background: #f8f9fa;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 1rem;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .thumbnail-list {
      display: flex;
      gap: 0.75rem;
      overflow-x: auto;

      .thumbnail {
        width: 80px;
        height: 80px;
        flex-shrink: 0;
        border-radius: 8px;
        overflow: hidden;
        border: 2px solid #e0e0e0;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          border-color: #2c4894;
        }

        &.active {
          border-color: #2c4894;
          box-shadow: 0 0 0 2px rgba(44, 72, 148, 0.2);
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }

  .product-info {
    .product-meta {
      display: flex;
      gap: 0.75rem;
      margin-bottom: 1rem;

      .category-badge,
      .unit-badge {
        display: inline-block;
        padding: 0.375rem 0.875rem;
        border-radius: 16px;
        font-size: 0.875rem;
        font-weight: 600;
      }

      .category-badge {
        background: #e3f2fd;
        color: #1976d2;
      }

      .unit-badge {
        background: #f3e5f5;
        color: #7b1fa2;
      }
    }

    .product-title {
      font-size: 2rem;
      color: #333;
      margin: 0 0 1rem 0;
      line-height: 1.3;
    }

    .product-description {
      font-size: 1.1rem;
      color: #666;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .product-content {
      margin-bottom: 1.5rem;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
      white-space: pre-line;

      h3 {
        font-size: 1.2rem;
        color: #333;
        margin: 0 0 1rem 0;
      }
    }

    .price-section {
      margin-bottom: 2rem;
      padding: 1.5rem;
      // background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      color: #2c4894;

      .price-info {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 0.5rem;

        .original-price {
          font-size: 1.1rem;
          text-decoration: line-through;
          opacity: 0.8;
        }

        .current-price {
          font-size: 2rem;
          font-weight: bold;
        }
      }

      .discount-badge {
        display: inline-block;
        padding: 0.375rem 0.875rem;
        margin-bottom: 0.5rem;
        background: #eee8ff;
        border-radius: 16px;
        font-size: 0.9rem;
        font-weight: 600;
      }

      .product-status {
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.2rem 0.8rem;
          border-radius: 20px;
          font-size: 0.95rem;
          font-weight: 600;

          &.available {
            background: #e8f5e9;
            color: #2e7d32;
          }

          &.unavailable {
            background: #ffebee;
            color: #c62828;
          }
        }
      }
    }

    .quantity-section {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;

      label {
        font-size: 1rem;
        font-weight: 600;
        color: #333;
      }

      .quantity-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        button {
          width: 40px;
          height: 40px;
          background: #f8f9fa;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1.25rem;
          font-weight: bold;
          color: #666;
          cursor: pointer;
          transition: all 0.3s;

          &:hover:not(:disabled) {
            background: #2c4894;
            border-color: #2c4894;
            color: white;
          }

          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        }

        input {
          width: 80px;
          height: 40px;
          text-align: center;
          font-size: 1rem;
          font-weight: 600;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          outline: none;

          &:focus {
            border-color: #2c4894;
          }
        }
      }
    }

    .action-buttons {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;

      .add-to-cart-btn {
        flex: 1;
        padding: 1rem;
        background: #2c4894;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
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

      .add-to-wishlist-btn {
        padding: 1rem 1.5rem;
        background: white;
        color: #ff4757;
        border: 2px solid #ff4757;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        white-space: nowrap;

        &:hover {
          background: #ff4757;
          color: white;
        }

        &.is-favorited {
          background: #ff4757;
          color: white;
        }

        &:active {
          transform: scale(0.98);
        }
      }
    }
  }

  // 商品詳細內容區域
  .detail-content {
    max-width: 1400px;
    margin: 3rem auto 0;
    background: white;
    border-radius: 12px;
    padding: 3rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

    .detail-description-section {
      margin-bottom: 2.5rem;

      .product-description {
        font-size: 1.125rem;
        line-height: 1.8;
        color: #444;
        text-align: justify;
        padding: 1.5rem;
        background: linear-gradient(to right, #f8f9fa 0%, #ffffff 100%);
        border-left: 4px solid #2c4894;
        border-radius: 4px;
        margin: 0;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    }

    .detail-images-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }

    .detail-image-section {
      overflow: hidden;
      border-radius: 8px;

      img {
        width: 100%;
        max-width: 100%;
        height: auto;
        display: block;
        border-radius: 8px;
        // box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s, box-shadow 0.3s;

        &:hover {
          transform: scale(1.02);
          // box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }
      }
    }
  }
}

// 找不到商品
.not-found {
  max-width: 600px;
  margin: 4rem auto;
  text-align: center;
  padding: 3rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

  h2 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 2rem;
  }

  .go-home-btn {
    display: inline-block;
    padding: 0.875rem 2rem;
    background: #2c4894;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s;

    &:hover {
      background: #1e3470;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(44, 72, 148, 0.3);
    }
  }
}

// 響應式設計
@media (max-width: 1024px) {
  .product-detail-page {
    .product-detail-container {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .product-images .main-image {
      height: 400px;
    }

    .detail-content {
      padding: 2rem;
      margin-top: 2rem;

      description-section .product-description {
        font-size: 1.0625rem;
        padding: 1.25rem;
        margin-bottom: 2rem;
      }

      .detail-images-grid {
        gap: 1.5rem;
      }

      .detail-image-section img {
        border-radius: 6px;
      }
    }
  }
}

@media (max-width: 768px) {
  .product-detail-page {
    padding: 1rem;

    .product-detail-container {
      padding: 1.5rem;
    }

    .product-images .main-image {
      height: 300px;
    }

    .product-info {
      .product-title {
        font-size: 1.5rem;
      }

      .action-buttons {
        flex-direction: column;

        .add-to-wishlist-btn {
          justify-content: center;
        }
      }
    }

    .detail-content {
      padding: 1.5rem;
      margin-top: 1.5rem;
      border-radius: 8px;

      .detail-description-section .product-description {
        font-size: 1rem;
        line-height: 1.7;
        padding: 1rem;
        border-left-width: 3px;
        margin-bottom: 1.5rem;
      }

      .detail-images-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .detail-image-section img {
        border-radius: 4px;
        border-left-width: 3px;
      }
    }
  }
}
</style>
