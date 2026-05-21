// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  
  // GitHub Pages 部署配置
  ssr: false, // 關閉 SSR，使用 SPA 模式
  
  app: {
    // 如果部署在 GitHub Pages 子路徑，需設定 baseURL
    // 格式：/repository-name/
    // 如果部署在根路徑 (username.github.io)，使用 '/'
    // 請將 <repository-name> 替換為您的倉庫名稱
    baseURL: '/nuxt-project/', // 部署時請修改此處
    
    buildAssetsDir: 'assets',
  },
  
  // 靜態生成配置
  nitro: {
    preset: 'static'
  }
})
