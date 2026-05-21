<template>
  <div class="wishlist-page">
    <div class="page-container">
      <div class="page-header">
        <h1>追蹤商品</h1>
      </div>

      <!-- 空狀態 -->
      <div v-if="favorites.length === 0" class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.5">
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
          </path>
        </svg>
        <h2>尚無追蹤商品</h2>
        <p>您還沒有追蹤任何商品，快去挑選喜歡的商品吧！</p>
        <NuxtLink to="/" class="browse-btn">瀏覽商品</NuxtLink>
      </div>

      <!-- 商品列表 -->
      <div v-else class="wishlist-content">
        <div class="list-header">
          <h2>共 {{ favorites.length }} 件商品</h2>
          <button @click="clearAllFavorites" class="clear-btn">清空追蹤清單</button>
        </div>

        <div class="product-grid">
          <div v-for="product in favorites" :key="product.id" class="product-card"
            @click="viewProductDetail(product.id)">
            <button @click.stop="toggleFavorite(product)" class="remove-btn" title="移除追蹤">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

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

              <button @click.stop="addToCart(product)" class="add-to-cart-btn">
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
    </div>
  </div>
</template>

<script setup>
import { useFavorite } from '~/composable/useFavorite'
import { useCart } from '~/composable/useCart'
import { useToast } from '~/composable/useToast'

const router = useRouter()
const { favorites, toggleFavorite, getFavorite } = useFavorite()
const { addToCart } = useCart()
const { showToast } = useToast()

// 載入追蹤清單
onMounted(() => {
  getFavorite()
})

// 導向商品詳情頁
const viewProductDetail = (productId) => {
  router.push(`/products/detail/${productId}`)
}

// 清空追蹤清單
const clearAllFavorites = () => {
  if (confirm('確定要清空所有追蹤商品嗎？')) {
    favorites.value = []
    if (typeof window !== 'undefined') {
      localStorage.removeItem('favorite')
    }
    showToast('已清空追蹤清單', 'info')
  }
}

// SEO
useSeoMeta({
  title: '追蹤商品',
  description: '查看您追蹤的商品'
})
</script>

<style lang="scss" scoped>
.wishlist-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 2rem 1rem;

  .page-container {
    max-width: 1400px;
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

  // 空狀態
  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    svg {
      color: #ddd;
      margin-bottom: 1.5rem;
    }

    h2 {
      font-size: 1.5rem;
      color: #555;
      margin-bottom: 0.5rem;
    }

    p {
      color: #999;
      margin-bottom: 2rem;
    }

    .browse-btn {
      display: inline-block;
      padding: 0.875rem 2rem;
      background: #2c4894;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      transition: background 0.3s;

      &:hover {
        background: #1e3470;
      }
    }
  }

  // 商品列表
  .wishlist-content {
    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      h2 {
        font-size: 1.3rem;
        color: #333;
        margin: 0;
      }

      .clear-btn {
        padding: 0.625rem 1.25rem;
        background: #ef4444;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 0.9rem;
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: #dc2626;
        }
      }
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;

      .product-card {
        position: relative;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s, box-shadow 0.3s;
        cursor: pointer;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .remove-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 36px;
          height: 36px;
          background: white;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          z-index: 2;
          transition: all 0.3s;
          color: #ef4444;

          &:hover {
            background: #ef4444;
            color: white;
            transform: scale(1.1);
          }
        }

        .product-image {
          width: 100%;
          height: auto;
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

          .add-to-cart-btn {
            width: 100%;
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

            &:hover {
              background: #1e3470;
            }

            &:active {
              transform: scale(0.98);
            }
          }
        }
      }
    }
  }

  // 響應式設計
  @media (max-width: 1200px) {
    .product-grid {
      grid-template-columns: repeat(3, 1fr) !important;
    }
  }

  @media (max-width: 768px) {
    .product-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 1rem !important;
    }

    .list-header {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start !important;
    }

    .page-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
  }

  @media (max-width: 480px) {
    .product-grid {
      grid-template-columns: 1fr !important;
    }
  }
}
</style>
