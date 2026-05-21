import { ref } from 'vue'
import { useToast } from './useToast'

interface Product {
  id: string
  title: string
  category: string
  content: string
  description: string
  imageUrl: string
  imagesUrl?: string[]
  is_enabled: number
  origin_price: number
  price: number
  unit: string
  num?: number
}

// 全域的收藏清單
const favorites = ref<Product[]>([])
const favoritedIds = ref<string[]>([])

export const useFavorite = () => {
  // 切換追蹤狀態
  const toggleFavorite = (product: Product) => {
    const { showToast } = useToast()
    const toggleId = product.id
    const hasFavorite = favoritedIds.value.includes(toggleId) // 判斷是否已經在追蹤清單中

    if (!hasFavorite) { // 若非已追蹤
      favorites.value.push(product) // 將其加入 favorite 陣列
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorite', JSON.stringify(favorites.value))
      }
      showToast(`已將 ${product.title} 加入追蹤清單`, 'success')
    } else {
      // 移除追蹤清單
      const delIndex = favorites.value.findIndex(item => item.id === toggleId)
      favorites.value.splice(delIndex, 1)
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorite', JSON.stringify(favorites.value))
      }
      showToast(`已將 ${product.title} 從追蹤清單移除`, 'info')
    }
    favoritedIds.value = favorites.value.map(item => item.id) // 更新追蹤清單的 ID 陣列
  }

  // 從 localStorage 載入追蹤清單
  const getFavorite = () => {
    // 只在客戶端執行
    if (typeof window === 'undefined') return
    
    try {
      const storedFavorites = localStorage.getItem('favorite') // 從 localStorage 取得追蹤清單
      const parsed = storedFavorites ? JSON.parse(storedFavorites) : [] // 解析 JSON 字串，如果沒有則使用空陣列
      // 確保解析後的資料是陣列
      if (Array.isArray(parsed)) { // 如果是陣列，直接使用
        favorites.value = parsed
      } else {
        // 如果不是陣列，清空並重置
        favorites.value = []
        localStorage.removeItem('favorite') // 移除無效的資料
      }

      // 重建追蹤清單的 ID 陣列
      favoritedIds.value = favorites.value.map(item => item.id)
    } catch (error) {
      favorites.value = []
      favoritedIds.value = []
      if (typeof window !== 'undefined') {
        localStorage.removeItem('favorite')
      }
    }
  }

  return {
    toggleFavorite,
    getFavorite,
    favorites,
    favoritedIds
  }
}