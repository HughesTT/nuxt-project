<template>
  <div class="orders-page">
    <div class="page-container">
      <div class="page-header">
        <h1>訂單資訊</h1>
      </div>

      <!-- 空狀態 -->
      <div v-if="orders.length === 0" class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        <h2>尚無訂單記錄</h2>
        <p>您還沒有任何訂單，快去挑選喜歡的商品吧！</p>
        <NuxtLink to="/" class="browse-btn">開始購物</NuxtLink>
      </div>

      <!-- 訂單列表 -->
      <div v-else class="orders-content">
        <div class="orders-header">
          <h2>共 {{ orders.length }} 筆訂單</h2>
          <div class="filter-tabs">
            <button :class="{ active: filterStatus === 'all' }" @click="filterStatus = 'all'">
              全部
            </button>
            <button :class="{ active: filterStatus === 'pending' }" @click="filterStatus = 'pending'">
              處理中
            </button>
            <button :class="{ active: filterStatus === 'completed' }" @click="filterStatus = 'completed'">
              已完成
            </button>
            <button :class="{ active: filterStatus === 'cancelled' }" @click="filterStatus = 'cancelled'">
              已取消
            </button>
          </div>
        </div>

        <div class="order-list">
          <div v-for="order in filteredOrders" :key="order.id" class="order-card">
            <div class="order-header">
              <div class="order-info">
                <span class="order-id">訂單編號：{{ order.id }}</span>
                <span class="order-date">{{ formatDate(order.date) }}</span>
              </div>
              <span class="order-status" :class="`status-${order.status}`">
                {{ getStatusText(order.status) }}
              </span>
            </div>

            <div class="order-items">
              <div v-for="item in order.items" :key="item.id" class="order-item">
                <img :src="item.imageUrl" :alt="item.title" class="item-image" />
                <div class="item-details">
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.category }}</p>
                </div>
                <div class="item-quantity">x{{ item.quantity }}</div>
                <div class="item-price">NT$ {{ (item.price * item.quantity).toLocaleString() }}</div>
              </div>
            </div>

            <div class="order-summary">
              <div class="summary-row">
                <span>商品總計</span>
                <span>NT$ {{ order.subtotal.toLocaleString() }}</span>
              </div>
              <div class="summary-row">
                <span>運費</span>
                <span>{{ order.shipping === 0 ? '免運' : `NT$ ${order.shipping.toLocaleString()}` }}</span>
              </div>
              <div class="summary-row total">
                <span>訂單總計</span>
                <span>NT$ {{ order.total.toLocaleString() }}</span>
              </div>
            </div>

            <div class="order-actions">
              <button v-if="order.status === 'pending'" @click="cancelOrder(order.id)" class="cancel-btn">
                申請取消訂單
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '~/composable/useToast'

const { showToast } = useToast()

const orders = ref([])
const filterStatus = ref('all')

// 載入訂單
onMounted(() => {
  if (typeof window !== 'undefined') {
    const savedOrders = localStorage.getItem('orders')
    if (savedOrders) {
      orders.value = JSON.parse(savedOrders)
    }
  }
})

// 過濾訂單
const filteredOrders = computed(() => {
  if (filterStatus.value === 'all') {
    return orders.value
  }
  return orders.value.filter(order => order.status === filterStatus.value)
})

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 訂單狀態文字
const getStatusText = (status) => {
  const statusMap = {
    pending: '處理中',
    completed: '已完成',
    cancelled: '訂單取消已申請'
  }
  return statusMap[status] || status
}

// 取消訂單
const cancelOrder = (orderId) => {
  if (confirm('確定要申請取消此訂單嗎？')) {
    const orderIndex = orders.value.findIndex(o => o.id === orderId)
    if (orderIndex !== -1) {
      orders.value[orderIndex].status = 'cancelled'
      if (typeof window !== 'undefined') {
        localStorage.setItem('orders', JSON.stringify(orders.value))
      }
      showToast('訂單已申請取消', 'info')
    }
  }
}

// 查看訂單詳情
const viewOrderDetail = (order) => {
  showToast('訂單詳情功能開發中', 'info')
  console.log('訂單詳情:', order)
}

// SEO
useSeoMeta({
  title: '訂單資訊',
  description: '查看您的訂單記錄'
})
</script>

<style lang="scss" scoped>
.orders-page {
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

  // 訂單列表
  .orders-content {
    .orders-header {
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

      .filter-tabs {
        display: flex;
        gap: 0.5rem;

        button {
          padding: 0.5rem 1rem;
          background: #f5f5f5;
          color: #666;
          border: none;
          border-radius: 6px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s;

          &:hover {
            background: #e0e0e0;
          }

          &.active {
            background: #2c4894;
            color: white;
          }
        }
      }
    }

    .order-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      .order-card {
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden;

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          background: #f8f9fa;
          border-bottom: 1px solid #e0e0e0;

          .order-info {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;

            .order-id {
              font-weight: 600;
              color: #333;
            }

            .order-date {
              font-size: 0.9rem;
              color: #666;
            }
          }

          .order-status {
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;

            &.status-pending {
              background: #fef3c7;
              color: #d97706;
            }

            &.status-completed {
              background: #d1fae5;
              color: #059669;
            }

            &.status-cancelled {
              background: #fee2e2;
              color: #dc2626;
            }
          }
        }

        .order-items {
          padding: 1.5rem;

          .order-item {
            display: grid;
            grid-template-columns: 80px 1fr auto auto;
            gap: 1rem;
            align-items: center;
            padding: 1rem 0;
            border-bottom: 1px solid #f0f0f0;

            &:last-child {
              border-bottom: none;
            }

            .item-image {
              width: 80px;
              height: 80px;
              border-radius: 8px;
              object-fit: cover;
              background: #f5f5f5;
            }

            .item-details {
              h4 {
                font-size: 1rem;
                color: #333;
                margin: 0 0 0.25rem;
              }

              p {
                font-size: 0.9rem;
                color: #666;
                margin: 0;
              }
            }

            .item-quantity {
              color: #666;
              font-size: 0.95rem;
            }

            .item-price {
              font-weight: 600;
              color: #333;
              text-align: right;
            }
          }
        }

        .order-summary {
          padding: 1.5rem;
          background: #f8f9fa;
          border-top: 1px solid #e0e0e0;

          .summary-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.75rem;
            font-size: 0.95rem;
            color: #666;

            &.total {
              font-size: 1.2rem;
              font-weight: bold;
              color: #333;
              margin-top: 0.5rem;
              padding-top: 0.75rem;
              border-top: 1px solid #e0e0e0;

              span:last-child {
                color: #ff4757;
              }
            }
          }
        }

        .order-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          padding: 1.5rem;
          border-top: 1px solid #e0e0e0;

          button {
            padding: 0.625rem 1.5rem;
            border: none;
            border-radius: 6px;
            font-size: 0.95rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s;
          }

          .cancel-btn {
            background: white;
            color: #ef4444;
            border: 1px solid #ef4444;

            &:hover {
              background: #ef4444;
              color: white;
            }
          }

          .detail-btn {
            background: #2c4894;
            color: white;

            &:hover {
              background: #1e3470;
            }
          }
        }
      }
    }
  }

  // 響應式設計
  @media (max-width: 768px) {
    .orders-header {
      flex-direction: column;
      align-items: flex-start !important;
      gap: 1rem;

      .filter-tabs {
        width: 100%;
        flex-wrap: wrap;
      }
    }

    .order-item {
      grid-template-columns: 60px 1fr !important;

      .item-quantity,
      .item-price {
        grid-column: 2;
        text-align: left !important;
      }
    }

    .page-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
  }
}
</style>
