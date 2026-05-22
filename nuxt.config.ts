// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@pinia/nuxt'],
  
  // 運行時配置（用於環境變數）
  runtimeConfig: {
    public: {
      apiBase: 'https://vue3-course-api.hexschool.io/',
      apiPath: 'hughesh-api'
    }
  },
  
  app: {
    // 開發環境使用根路徑，生產環境使用 GitHub Pages 路徑
    baseURL: process.env.NODE_ENV === 'production' ? '/nuxt-project/' : '/',
    
    buildAssetsDir: 'assets',
  }
})
