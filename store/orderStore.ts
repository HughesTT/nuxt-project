import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useStatusStore } from '~/store/statusStore'

// 定義訂單商品項目介面
interface OrderItem {
  id: string
  title: string
  price: number
  quantity: number
}

// 定義訂單介面
interface Order {
  id: string
  userId?: string
  products: OrderItem[]
  total: number
  status: 'pending' | 'completed' | 'cancelled'
  createdAt: Date
}

export const useOrderStore = defineStore('orderStore', () => {
  const orders = ref<Order[]>([]) // 訂單列表
  
  const createOrder = async (order: Order): Promise<void> => {
    const status = useStatusStore()
    status.isLoading = true

    try {
      // 模擬 API 呼叫，實際應替換為真實 API 請求
      await new Promise(resolve => setTimeout(resolve, 1000)) // 模擬延遲
      orders.value.push(order) // 將新訂單加入列表
    } finally {
      status.isLoading = false
    }
  }
  
  return {
    orders,
    createOrder
  }
})