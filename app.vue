<template>
  <NavBar />
  <NuxtPage />
  <Footer />
  <ToastMessage />
  <BackToTop />
</template>

<script setup>
// GitHub Pages SPA 路由支援 - 處理 404 重定向
if (import.meta.client) {
  const redirect = sessionStorage.getItem('redirect')
  if (redirect && redirect !== location.href) {
    sessionStorage.removeItem('redirect')
    const baseURL = '/nuxt-project/'
    const targetPath = redirect.replace(location.origin + baseURL, '')
    if (targetPath && targetPath !== '' && targetPath !== '/') {
      navigateTo('/' + targetPath)
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family: 'Noto Sans JP', sans-serif;
}
</style>