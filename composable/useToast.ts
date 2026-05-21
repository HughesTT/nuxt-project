import { ref } from 'vue'

const visible = ref(false) // toast 顯示狀態
const message = ref('') // toast 訊息內容
const type = ref<'success' | 'error' | 'warning' | 'info'>('success') // toast 類型
let timeoutId: ReturnType<typeof setTimeout> | null = null // timeout ID 用於判定是否已有 toast 在顯示

export const useToast = () => {
  // 顯示 toast 函式
  const showToast = (msg: string, toastType: 'success' | 'error' | 'warning' | 'info' = 'success', duration = 3000) => {
    // 如果已有 toast，先清除
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    message.value = msg // 設定訊息內容
    type.value = toastType // 設定 toast 類型
    visible.value = true // 顯示 toast

    // 自動隱藏
    timeoutId = setTimeout(() => {
      visible.value = false // 隱藏 toast
      timeoutId = null // 清除 timeout ID
    }, duration)
  }

  // 隱藏 toast 函式
  const hideToast = () => {
    if (timeoutId) { // 如果有正在顯示的 toast，清除 timeout Id
      clearTimeout(timeoutId)
      timeoutId = null
    }
    visible.value = false
  }

  return {
    visible,
    message,
    type,
    showToast,
    hideToast
  }
}
