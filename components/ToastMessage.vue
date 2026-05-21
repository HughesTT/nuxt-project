<template>
  <Transition name="toast">
    <div v-if="visible" class="toast-container" :class="`toast-${type}`">
      <div class="toast-content">
        <div class="toast-icon">
          <svg v-if="type === 'success'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <svg v-else-if="type === 'error'" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
          <svg v-else-if="type === 'warning'" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </div>
        <span class="toast-message">{{ message }}</span>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useToast } from '~/composable/useToast'

const { visible, message, type } = useToast()
</script>

<style lang="scss" scoped>
.toast-container {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 9999;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  min-width: 300px;
  max-width: 500px;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.toast-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-message {
  font-size: 0.95rem;
  font-weight: 500;
  flex: 1;
}

// 不同類型的樣式
.toast-success {
  background: rgba(16, 185, 129, 0.95);
  color: white;
  border-left: 4px solid #059669;
}

.toast-error {
  background: rgba(239, 68, 68, 0.95);
  color: white;
  border-left: 4px solid #dc2626;
}

.toast-warning {
  background: rgba(245, 158, 11, 0.95);
  color: white;
  border-left: 4px solid #d97706;
}

.toast-info {
  background: rgba(59, 130, 246, 0.95);
  color: white;
  border-left: 4px solid #2563eb;
}

// 動畫
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

// 響應式設計
@media (max-width: 768px) {
  .toast-container {
    top: 60px;
    right: 10px;
    left: 10px;
    min-width: auto;
    max-width: none;
  }
}
</style>
