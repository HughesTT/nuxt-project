import { ref, computed } from 'vue'
import { useToast } from './useToast'

// 定義購物車商品介面
interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
  imageUrl?: string
  category?: string
  origin_price?: number
}

// 定義產品介面（用於 addToCart）
interface Product {
  id: string
  title: string
  price: number
  imageUrl?: string
  category?: string
  origin_price?: number
  [key: string]: any // 允許其他屬性
}

const cart = ref<CartItem[]>([])
const cartIds = ref<string[]>([])

export const useCart = () => {
  const getCart = (): void => {
    // 只在 client 端執行
    if (typeof window === 'undefined') return
    
    try {
      const storedCart = localStorage.getItem('cart')
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart)
        if (Array.isArray(parsedCart)) {
          cart.value = parsedCart
          cartIds.value = parsedCart.map(item => item.id)
        }
      }
    } catch (error) {
      console.log('載入購物車失敗:', error)
      cart.value = []
      cartIds.value = []
    }
  }

  // 儲存購物車到 localStorage
  const saveCart = (): void => {
    // 只在 client 端執行
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem('cart', JSON.stringify(cart.value))
      cartIds.value = cart.value.map(item => item.id)
    } catch (error) {
      console.error('儲存購物車失敗:', error)
    }
  }

  // 加入購物車
  const addToCart = (product: Product, quantity = 1): void => {
    const { showToast } = useToast()
    const existingItem = cart.value.find(item => item.id === product.id)

    if (existingItem) {
      // 如果已存在，增加數量
      existingItem.quantity += quantity
      showToast(`${product.title} 的數量增加為 ${existingItem.quantity} 件`, 'success')
    } else {
      // 如果不存在，加入新項目
      cart.value.push({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: quantity,
        imageUrl: product.imageUrl,
        category: product.category,
        origin_price: product.origin_price
      })
      showToast(`已將 ${product.title} 加入購物車`, 'success')
    }

    saveCart()
  }

  // 更新購物車商品數量
  const updateQuantity = (productId: string, quantity: number): void => {
    const item = cart.value.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
        saveCart()
      }
    }
  }

  // 從購物車移除商品
  const removeFromCart = (productId: string): void => {
    const { showToast } = useToast()
    const index = cart.value.findIndex(item => item.id === productId)
    if (index !== -1) {
      const removedItem = cart.value.splice(index, 1)[0]
      if (removedItem) {
        saveCart()
        showToast(`已將 ${removedItem.title} 從購物車移除`, 'info')
      }
    }
  }

  // 清空購物車
  const clearCart = (): void => {
    cart.value = []
    cartIds.value = []
    // 只在 client 端執行
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart')
    }
  }

  // 計算總金額
  const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  })

  // 計算總件數
  const cartItemCount = computed(() => {
    return cart.value.reduce((count, item) => {
      return count + item.quantity
    }, 0)
  })

  return {
    cart,
    cartIds,
    getCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartItemCount
  }

}