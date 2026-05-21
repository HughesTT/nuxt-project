import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import useStatusStore from './statusStore'

// 定義產品的介面
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

// 定義 API 回應的介面
interface ApiResponse {
  success: boolean
  products: Product[]
  message?: string
}

// 定義 Store 狀態的介面
interface ProductStoreState {
  allProducts: Ref<Product[]>
  error: Ref<string>
  text: Ref<string>
  getAllProducts: () => Promise<void>
}

export const useProductStore = defineStore('productStore', (): ProductStoreState => {
  const allProducts = ref<Product[]>([])
  const error = ref<string>('')
  const text = ref<string>('')

  // 取得所有產品的函式
  const getAllProducts = async (): Promise<void> => {
    try {
      const config = useRuntimeConfig()
      const apiBase = config.public.apiBase
      const apiPath = config.public.apiPath
      
      const api = `${apiBase}api/${apiPath}/products/all`
      
      const res = await fetch(api, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data: ApiResponse = await res.json()
      if (data.success) {
        allProducts.value = data.products.map((product: Product) => ({
          ...product,
          description: formatDescription(product.description),
          content: formatDescription(product.content)
        }))
      } else {
        throw new Error(data.message)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '未知錯誤'
      alert(`取得產品失敗: ${errorMessage}`)
    }
  }

  // 格式化產品描述的函式
  const formatDescription = (text: string): string => {
    if (!text || typeof text !== 'string') return ''

    // 移除空白字元
    const cleanText = text.trim()

    // 按文中空格分割
    const segments = cleanText.split(' ').filter(segment => segment.trim())

    // 如果沒有句號，返回原文
    if (segments.length <= 1) return cleanText

    // 每個段落前加上符號，並換行連接
    const formattedText = segments.map(segment => `${segment.trim()}`).join('\n\n')

    return formattedText
  }

  // 增加到購物車

  return {
    allProducts,
    getAllProducts,
    error,
    text
  }
})

export default useProductStore
