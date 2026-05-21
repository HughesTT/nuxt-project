import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

// 定義 Store 狀態的介面
interface StatusStoreState {
  isLoading: Ref<boolean>
  cartLoadingItem: Ref<string>
}

export const useStatusStore = defineStore('statusStore', (): StatusStoreState => {
  const isLoading = ref<boolean>(false)
  const cartLoadingItem = ref<string>('')

  return {
    isLoading,
    cartLoadingItem
  }
})

export default useStatusStore
