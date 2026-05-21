<template>
  <LoadingOverlay :active="isLoading" loader="bars" />
  <Breadcrumb />
  <div class="product-page">
    <!-- 頁面標題 -->
    <div class="page-header">
      <h1>
        {{ currentProductType.displayName }}
      </h1>
    </div>

    <div class="page-container">
      <!-- 左側分類選單 -->
      <aside class="category-sidebar">
        <h3>分類</h3>
        <ul class="category-list">
          <li v-for="cat in categories" :key="cat" :class="{ active: selectedCategory === cat }"
            @click="selectCategory(cat)">
            {{ cat || '全部' }}
          </li>
        </ul>
      </aside>

      <!-- 右側產品列表 -->
      <main class="product-main">
        <div v-if="displayProducts.length === 0" class="empty-state">
          <p>目前沒有 {{ unitName }} 的產品。</p>
        </div>

        <div class="product-grid" v-else>
          <div v-for="product in displayProducts" :key="product.id" class="product-card"
            @click="viewProductDetail(product.id)">
            <div class="product-image">
              <img :src="product.imageUrl" :alt="product.title" />
            </div>
            <div class="product-info">
              <span class="product-category">{{ product.category }}</span>
              <h3 class="product-title">{{ product.title }}</h3>
              <p class="product-description">{{ product.description }}</p>
              <div class="product-price">
                <span class="original-price" v-if="product.origin_price !== product.price">
                  NT$ {{ product.origin_price.toLocaleString() }}
                </span>
                <span class="current-price">NT$ {{ product.price.toLocaleString() }}</span>
              </div>
              <div class="product-actions">
                <button class="add-to-cart-btn" @click.stop="addToCart(product)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  加入購物車
                </button>
                <button class="add-to-wishlist-btn" :class="{ 'is-favorited': isFavorited(product.id) }"
                  @click.stop="addToWishlist(product)" :title="isFavorited(product.id) ? '移除追蹤' : '加入追蹤清單'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                    :fill="isFavorited(product.id) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
                    <path
                      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                    </path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  <IntrestedProduct />
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCart } from '~/composable/useCart'
import { useFavorite } from '~/composable/useFavorite'
import { useProductStore } from '~/store/productStore'
import { useProductType } from '~/composable/useProductType'
import Breadcrumb from '~/components/Breadcrumb.vue'

// 驗證路由參數是否為有效的產品類型
definePageMeta({
  validate: async (route) => {
    const validUnits = ['headphone', 'speaker', 'TV']
    const unitId = String(route.params.id)

    // 只允許有效的產品類型通過
    return validUnits.includes(unitId)
  }
})

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const cart = useCart()
const favorite = useFavorite()
const productType = useProductType()  // 產品類型設定的 composable

const { favorites } = storeToRefs(favorite)  // 追蹤清單狀態
const { allProducts } = storeToRefs(productStore)  // 狀態要用 storeToRefs 維持響應性
const { getAllProducts } = productStore  // 方法直接解構
const { addToCart } = cart  // 加入購物車方法
const { toggleFavorite, getFavorite, favoritedIds } = favorite

// 取得網址上的動態參數
const unitName = computed(() => String(route.params.id))

// 取得目前產品類型的配置
const currentProductType = computed(() => {
  return productType.getProductTypeConfig(unitName.value)
})

// 目前選中的分類
const selectedCategory = ref(null)

// 載入狀態
const isLoading = ref(true)

// 載入產品資料
onMounted(async () => {
  try {
    await getAllProducts()
    cart.getCart() // 載入購物車
    getFavorite() // 載入追蹤清單
  } finally {
    isLoading.value = false
  }
})

// 根據 unit 篩選產品
const unitProducts = computed(() => {
  if (!allProducts.value || !Array.isArray(allProducts.value)) {
    return []
  }
  return allProducts.value.filter(product => product.unit === unitName.value)
})

// 取得該 unit 下所有的 category
const categories = computed(() => {
  const cats = new Set(unitProducts.value.map(p => p.category))
  return ['', ...Array.from(cats)] // 空字串代表「全部」
})

// 根據選中的分類篩選產品
const displayProducts = computed(() => {
  if (!selectedCategory.value) {
    return unitProducts.value
  }
  return unitProducts.value.filter(p => p.category === selectedCategory.value)
})

// 選擇分類
const selectCategory = (category) => {
  selectedCategory.value = category === '' ? null : category
}

// 檢查是否已追蹤
const isFavorited = (productId) => {
  return favoritedIds.value.includes(productId)
}

// 加入追蹤清單
const addToWishlist = (product) => {
  toggleFavorite(product)
}
// 導向商品詳情頁
const viewProductDetail = (productId) => {
  router.push(`/products/detail/${productId}`)
}

// 
// 設定動態頁面標題
watch(currentProductType, (config) => {
  useSeoMeta({
    title: config.seoTitle,
    ogTitle: config.displayName,
    description: config.description
  })
}, { immediate: true })

getFavorite() // 初始化追蹤清單狀態
</script>

<style lang="scss" scoped>
.product-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-left: 1rem;
    border-left: solid 15px #2c4894;
    // border-bottom: 2px solid #e0e0e0;

    h1 {
      font-size: 2rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .product-icon {
        font-size: 1.8rem;
      }

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
        text-decoration: underline;
      }
    }
  }

  .page-container {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
  }

  // 左側分類選單
  .category-sidebar {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
    height: fit-content;
    position: sticky;
    top: 90px;

    h3 {
      margin: 0 0 1rem 0;
      font-size: 1.2rem;
      color: #333;
      border-bottom: 2px solid #2c4894;
      padding-bottom: 0.5rem;
    }

    .category-list {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding: 0.75rem 1rem;
        margin-bottom: 0.5rem;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.3s;
        color: #666;
        font-weight: 500;

        &:hover {
          background: #e9ecef;
          color: #333;
        }

        &.active {
          background: #2c4894;
          color: white;
        }
      }
    }
  }

  // 右側產品區域
  .product-main {
    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: #999;
      font-size: 1.1rem;
    }

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
        }
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
          margin-bottom: 1rem;

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

        .product-actions {
          display: flex;
          gap: 0.5rem;
        }

        .add-to-cart-btn {
          flex: 1;
          padding: 0.75rem;
          background: #2c4894;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;

          svg {
            flex-shrink: 0;
          }

          &:hover {
            background: #1e3470;
          }

          &:active {
            transform: scale(0.98);
          }
        }

        .add-to-wishlist-btn {
          width: 48px;
          height: 48px;
          padding: 0.75rem;
          background: white;
          color: #ff4757;
          border: 2px solid #ff4757;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;

          svg {
            transition: all 0.3s;
          }

          &:hover {
            background: #ff4757;
            color: white;

            svg {
              fill: white;
            }
          }

          &:active {
            transform: scale(0.98);
          }

          // 已追蹤狀態
          &.is-favorited {
            background: white;
            animation: heartBeat 0.3s ease;

            svg {
              fill: #ff4757;
            }

            &:hover {
              background: #ff6b81;
              border-color: #ff6b81;
            }
          }
        }
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
}

// 平板響應式
@media (max-width: 1024px) {
  .product-page {
    .page-container {
      grid-template-columns: 200px 1fr;
      gap: 1.5rem;
    }

    .product-main .product-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }
  }
}

// 手機響應式
@media (max-width: 768px) {
  .product-page {
    padding: 1rem;

    .page-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;

      h1 {
        font-size: 1.5rem;
      }
    }

    .page-container {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .category-sidebar {
      position: relative;
      padding: 1rem;
      margin: 0 -1rem;
      background: white;
      border-radius: 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      top: 0;

      // 添加滾動漸變提示
      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 30px;
        pointer-events: none;
        z-index: 1;
      }

      &::before {
        left: 0;
        background: linear-gradient(to right, rgba(255, 255, 255, 0.95), transparent);
      }

      &::after {
        right: 0;
        background: linear-gradient(to left, rgba(255, 255, 255, 0.95), transparent);
      }

      h3 {
        margin: 0 0 0.75rem 1rem;
        font-size: 1rem;
        padding-bottom: 0.5rem;
      }

      .category-list {
        display: flex;
        flex-wrap: nowrap;
        gap: 0.5rem;
        overflow-x: auto;
        overflow-y: hidden;
        padding: 0.5rem 1rem;
        margin: 0 -1rem;
        scroll-snap-type: x proximity;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: thin;
        scrollbar-color: #2c4894 transparent;

        // 自定義滾動條樣式
        &::-webkit-scrollbar {
          height: 4px;
        }

        &::-webkit-scrollbar-track {
          background: transparent;
        }

        &::-webkit-scrollbar-thumb {
          background: #2c4894;
          border-radius: 2px;
        }

        &::-webkit-scrollbar-thumb:hover {
          background: #1e3470;
        }

        li {
          flex: 0 0 auto;
          margin: 0;
          white-space: nowrap;
          scroll-snap-align: start;

          // 添加觸覺反饋效果
          &:active {
            transform: scale(0.95);
          }
        }
      }
    }

    .product-main .product-grid {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 1rem;

      .product-card {
        margin-bottom: 1rem;

        .product-info {
          padding: 1rem;

          .product-title {
            font-size: 1rem;
          }

          .product-description {
            font-size: 0.85rem;
            margin: 0.5rem 0 0.75rem;
            height: 2.5em;
          }

          // 價格區塊調整為垂直排列
          .product-price {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.25rem;
            margin-bottom: 0.75rem;

            .original-price {
              font-size: 0.85rem;
            }

            .current-price {
              font-size: 1.15rem;
            }
          }

          // 按鈕區塊調整
          .product-actions {
            flex-direction: column;
            gap: 0.5rem;

            .add-to-cart-btn {
              width: 100%;
              padding: 0.65rem;
              font-size: 0.9rem;
            }

            .add-to-wishlist-btn {
              width: 100%;
              height: 44px;
              flex-direction: row;
              gap: 0.5rem;
              justify-content: center;

              &::after {
                content: '加入追蹤';
                font-size: 0.9rem;
                font-weight: 600;
              }

              &.is-favorited::after {
                content: '已追蹤';
              }
            }
          }
        }
      }
    }
  }
}

// 小手機優化
@media (max-width: 480px) {
  .product-page {
    .page-header h1 {
      font-size: 1.3rem;
    }

    .product-main .product-grid {
      grid-template-columns: 1fr;
      gap: 1rem;

      .product-card {
        .product-image {
          height: 200px;
        }

        .product-info {
          .product-price {
            .current-price {
              font-size: 1.25rem;
            }
          }
        }
      }
    }
  }
}
</style>