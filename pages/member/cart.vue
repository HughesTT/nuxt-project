<template>
  <div class="cart-page">
    <div class="page-container">
      <div class="page-header">
        <h1>購物車</h1>
      </div>

      <!-- 空狀態 -->
      <div v-if="cart.length === 0" class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.5">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <h2>購物車是空的</h2>
        <p>還沒有添加任何商品，快去挑選喜歡的商品吧！</p>
        <NuxtLink to="/products/headphone" class="browse-btn">開始購物</NuxtLink>
      </div>

      <!-- 購物車內容 -->
      <div v-else class="cart-content">
        <div class="cart-items">
          <div class="items-header">
            <h2>購物清單（{{ cartItemCount }} 件商品）</h2>
            <button @click="handleClearCart" class="clear-btn">清空購物車</button>
          </div>

          <div class="item-card" v-for="item in cart" :key="item.id">
            <div class="item-image">
              <img :src="item.imageUrl" :alt="item.title" />
            </div>

            <div class="item-info">
              <h3>{{ item.title }}</h3>
              <p class="item-category">{{ item.category }}</p>
              <div class="item-price">
                <span class="original-price" v-if="item.origin_price && item.origin_price !== item.price">
                  NT$ {{ (item.origin_price || 0).toLocaleString() }}
                </span>
                <span class="current-price">NT$ {{ (item.price || 0).toLocaleString() }}</span>
              </div>
            </div>

            <div class="item-actions">
              <div class="quantity-controls">
                <button @click="decreaseQuantity(item)" class="qty-btn">-</button>
                <input type="number" v-model.number="item.quantity" @change="updateItemQuantity(item)" min="1"
                  class="qty-input" />
                <button @click="increaseQuantity(item)" class="qty-btn">+</button>
              </div>

              <div class="item-total">
                小計：NT$ {{ ((item.price || 0) * (item.quantity || 1)).toLocaleString() }}
              </div>

              <button @click="removeFromCart(item.id)" class="remove-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                移除
              </button>
            </div>
          </div>
        </div>

        <!-- 結帳摘要 -->
        <div class="cart-summary">
          <h2>訂單摘要</h2>

          <div class="summary-row">
            <span>商品總計</span>
            <span>NT$ {{ (cartTotal || 0).toLocaleString() }}</span>
          </div>

          <div class="summary-row">
            <span>運費</span>
            <span>{{ shippingFee === 0 ? '免運' : `NT$ ${(shippingFee || 0).toLocaleString()}` }}</span>
          </div>

          <div class="summary-divider"></div>

          <div class="summary-row total">
            <span>總計</span>
            <span class="total-amount">NT$ {{ (finalTotal || 0).toLocaleString() }}</span>
          </div>

          <button @click="checkout" class="checkout-btn">前往結帳</button>

          <div class="shipping-notice">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
            <span>滿 NT$ 1,000 免運費</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '~/composable/useCart'
import { useToast } from '~/composable/useToast'

const { cart, cartTotal, cartItemCount, updateQuantity, removeFromCart, clearCart, getCart } = useCart()
const { showToast } = useToast()

// 運費計算
const shippingFee = computed(() => {
  return cartTotal.value >= 1000 ? 0 : 100
})

const finalTotal = computed(() => {
  return cartTotal.value + shippingFee.value
})

// 載入購物車
onMounted(() => {
  getCart()
})

// 增加數量
const increaseQuantity = (item) => {
  updateQuantity(item.id, item.quantity + 1)
}

// 減少數量
const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    updateQuantity(item.id, item.quantity - 1)
  }
}

// 更新數量
const updateItemQuantity = (item) => {
  if (item.quantity < 1) {
    item.quantity = 1
  }
  updateQuantity(item.id, item.quantity)
}

// 清空購物車
const handleClearCart = () => {
  if (confirm('確定要清空購物車嗎？')) {
    clearCart()
    showToast('已清空購物車', 'info')
  }
}

// 結帳
const checkout = () => {
  if (cart.value.length === 0) {
    showToast('購物車是空的', 'warning')
    return
  }

  // 建立訂單
  const order = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    items: JSON.parse(JSON.stringify(cart.value)),
    subtotal: cartTotal.value,
    shipping: shippingFee.value,
    total: finalTotal.value,
    status: 'pending'
  }

  // 儲存訂單
  if (typeof window !== 'undefined') {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.unshift(order)
    localStorage.setItem('orders', JSON.stringify(orders))
  }

  clearCart()
  showToast('訂單已成立！', 'success')

  // 導向訂單頁面
  setTimeout(() => {
    navigateTo('/member/orders')
  }, 1500)
}

// SEO
useSeoMeta({
  title: '購物車',
  description: '查看購物車內容並進行結帳'
})
</script>

<style lang="scss" scoped>
.cart-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 2rem 1rem;

  .page-container {
    max-width: 1200px;
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

  // 購物車內容
  .cart-content {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 2rem;
    align-items: start;

    .cart-items {
      .items-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
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
          padding: 0.5rem 1rem;
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

      .item-card {
        display: grid;
        grid-template-columns: 120px 1fr auto;
        gap: 1.5rem;
        padding: 1.5rem;
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        margin-bottom: 1rem;

        .item-image {
          width: 120px;
          height: 120px;
          border-radius: 8px;
          overflow: hidden;
          background: #f5f5f5;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .item-info {
          display: flex;
          flex-direction: column;
          justify-content: center;

          h3 {
            font-size: 1.1rem;
            color: #333;
            margin: 0 0 0.5rem;
          }

          .item-category {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 0.75rem;
          }

          .item-price {
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
              font-size: 1.2rem;
              font-weight: bold;
            }
          }
        }

        .item-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.75rem;

          .quantity-controls {
            display: flex;
            align-items: center;
            gap: 0.5rem;

            .qty-btn {
              width: 32px;
              height: 32px;
              background: #f0f0f0;
              border: none;
              border-radius: 6px;
              font-size: 1.2rem;
              cursor: pointer;
              transition: background 0.3s;
              display: flex;
              align-items: center;
              justify-content: center;

              &:hover {
                background: #e0e0e0;
              }
            }

            .qty-input {
              width: 60px;
              padding: 0.5rem;
              text-align: center;
              border: 2px solid #e0e0e0;
              border-radius: 6px;
              font-size: 1rem;

              &:focus {
                outline: none;
                border-color: #2c4894;
              }
            }
          }

          .item-total {
            font-size: 1.1rem;
            font-weight: 600;
            color: #333;
          }

          .remove-btn {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            background: white;
            color: #ef4444;
            border: 1px solid #ef4444;
            border-radius: 6px;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.3s;

            &:hover {
              background: #ef4444;
              color: white;
            }
          }
        }
      }
    }

    // 結帳摘要
    .cart-summary {
      position: sticky;
      top: 2rem;
      padding: 1.5rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      h2 {
        font-size: 1.3rem;
        color: #333;
        margin: 0 0 1.5rem;
      }

      .summary-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        font-size: 1rem;
        color: #666;

        &.total {
          font-size: 1.3rem;
          font-weight: bold;
          color: #333;
          margin-top: 1rem;

          .total-amount {
            color: #ff4757;
          }
        }
      }

      .summary-divider {
        height: 1px;
        background: #e0e0e0;
        margin: 1rem 0;
      }

      .checkout-btn {
        width: 100%;
        padding: 1rem;
        background: #10b981;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.3s;
        margin-top: 1.5rem;

        &:hover {
          background: #059669;
        }
      }

      .shipping-notice {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 1rem;
        padding: 0.75rem;
        background: #e0f2fe;
        color: #0369a1;
        border-radius: 6px;
        font-size: 0.9rem;
      }
    }
  }

  // 響應式設計
  @media (max-width: 968px) {
    .cart-content {
      grid-template-columns: 1fr;

      .cart-summary {
        position: static;
      }
    }

    .item-card {
      grid-template-columns: 100px 1fr !important;

      .item-actions {
        grid-column: 1 / -1;
        flex-direction: row !important;
        justify-content: space-between;
        align-items: center !important;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;

    .page-header h1 {
      font-size: 1.75rem;
    }

    .item-card {
      grid-template-columns: 90px 1fr !important;
      gap: 1rem !important;
      padding: 1.25rem !important;

      .item-image {
        width: 90px !important;
        height: 90px !important;
      }

      .item-info {
        h3 {
          font-size: 1rem;
        }

        .item-category {
          font-size: 0.85rem;
        }

        .item-price {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.25rem;

          .original-price {
            font-size: 0.85rem;
          }

          .current-price {
            font-size: 1.1rem;
          }
        }
      }

      .item-actions {
        gap: 0.75rem;
        flex-wrap: wrap;

        .quantity-controls {
          order: 1;
        }

        .item-total {
          order: 2;
          font-size: 1rem;
        }

        .remove-btn {
          order: 3;
          padding: 0.5rem 0.75rem;
          font-size: 0.85rem;
        }
      }
    }
  }

  @media (max-width: 480px) {
    padding: 1rem 0.75rem;

    .page-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 1.5rem;

      h1 {
        font-size: 1.5rem;
      }
    }

    .items-header {
      flex-direction: column;
      align-items: flex-start !important;
      gap: 0.75rem;
      padding: 1rem !important;

      h2 {
        font-size: 1.15rem;
        font-weight: 600;
      }

      .clear-btn {
        width: 100%;
        padding: 0.65rem;
        font-size: 0.9rem;
        font-weight: 500;
      }
    }

    .item-card {
      grid-template-columns: 80px 1fr !important;
      gap: 0.75rem !important;
      padding: 1rem !important;

      .item-image {
        width: 80px !important;
        height: 80px !important;
      }

      .item-info {
        h3 {
          font-size: 1.05rem;
          font-weight: 600;
          margin-bottom: 0.4rem;
          line-height: 1.3;
        }

        .item-category {
          font-size: 0.8rem;
          margin-bottom: 0.5rem;
        }

        .item-price {
          .original-price {
            font-size: 0.8rem;
          }

          .current-price {
            font-size: 1.15rem;
            font-weight: 700;
          }
        }
      }

      .item-actions {
        flex-direction: row !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 0.75rem;
        padding-top: 0.75rem;
        border-top: 1px solid #f0f0f0;
        flex-wrap: wrap;

        .quantity-controls {
          order: 1;
          display: flex;
          align-items: center;

          .qty-btn {
            width: 34px;
            height: 34px;
            font-size: 1.2rem;
            font-weight: 600;
          }

          .qty-input {
            width: 50px;
            padding: 0.5rem;
            font-size: 1rem;
            font-weight: 600;
          }
        }

        .item-total {
          order: 2;
          font-size: 0.95rem;
          font-weight: 600;
          color: #ff4757;
          white-space: nowrap;
        }

        .remove-btn {
          order: 3;
          width: 100%;
          justify-content: center;
          padding: 0.65rem;
          font-size: 0.9rem;
          font-weight: 500;

          svg {
            display: none;
          }
        }
      }
    }

    .cart-summary {
      padding: 1.25rem;

      h2 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 1.25rem;
      }

      .summary-row {
        font-size: 1rem;

        &.total {
          font-size: 1.3rem;
          font-weight: 700;
        }
      }

      .checkout-btn {
        padding: 1rem;
        font-size: 1.05rem;
        font-weight: 700;
      }

      .shipping-notice {
        font-size: 0.85rem;
      }
    }
  }
}
</style>
