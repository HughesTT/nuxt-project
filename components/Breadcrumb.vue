<template>
  <nav class="breadcrumb-nav" aria-label="麵包屑導航">
    <div class="breadcrumb-container">
      <ol class="breadcrumb-list">
        <li v-for="(crumb, index) in breadcrumbs" :key="index" class="breadcrumb-item"
          :class="{ 'is-active': index === breadcrumbs.length - 1 }">
          <NuxtLink v-if="crumb.path && index < breadcrumbs.length - 1" :to="crumb.path" class="breadcrumb-link">
            <svg v-if="index === 0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>{{ crumb.name }}</span>
          </NuxtLink>
          <span v-else class="breadcrumb-current">
            {{ crumb.name }}
          </span>
          <svg v-if="index < breadcrumbs.length - 1" class="breadcrumb-separator" xmlns="http://www.w3.org/2000/svg"
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </li>
      </ol>
    </div>
  </nav>
</template>

<script setup>
import { useProductType } from '~/composable/useProductType'
import { useProductStore } from '~/store/productStore'
import { storeToRefs } from 'pinia'

const route = useRoute()
const productType = useProductType()
const productStore = useProductStore()
const { allProducts } = storeToRefs(productStore)

// 麵包屑路徑
const breadcrumbs = computed(() => {
  const crumbs = [ // 定義初始麵包屑，包含首頁
    { name: '首頁', path: '/' }
  ]

  // 將路徑以 "/" 分割，用以判斷路徑的階層結構
  const pathSegments = route.path.split('/').filter(segment => segment)
  // console.log('目前路徑:', pathSegments) // 測試用，檢查路徑

  // 沒有後面的路徑，只顯示首頁
  if (pathSegments.length === 0) {
    return crumbs
  }

  // 產品路徑
  if (pathSegments[0] === 'products') {
    // 產品列表頁：/products/{unit}
    if (pathSegments.length === 2 && pathSegments[1] !== 'detail') {
      const unit = pathSegments[1] // 定義第二層路徑的變數
      const config = productType.getProductTypeConfig(unit) // getProductTypeConfig 為自定義函式，根據 unit 取得對應的資料
      crumbs.push( // 根據 unit 取得對應的資料，並加入麵包屑
        { name: config.displayName, path: null }
      )
    }
    // 產品詳情頁：/products/detail/{id}
    else if (pathSegments.length === 3 && pathSegments[1] === 'detail') {
      const productId = pathSegments[2] // 定義第三層路徑的變數，此為產品 ID
      const product = allProducts.value?.find(p => p.id === productId) // 從 allProducts 中尋找對應 ID 的產品資料

      if (product) {
        const config = productType.getProductTypeConfig(product.unit)
        crumbs.push(
          { name: config.displayName, path: `/products/${product.unit}` },
          { name: product.title, path: null }
        )
      } else { // 找不到商品的預設路徑
        crumbs.push(
          { name: '商品資訊', path: null }
        )
      }
    }
  }
  // 會員相關頁面
  else if (pathSegments[0] === 'member') {
    const memberPages = {
      'memberinfo': '會員資料',
      'wishlist': '追蹤清單',
      'cart': '購物車',
      'orders': '訂單查詢',
      'login': '會員登入'
    }

    crumbs.push({ name: '會員中心', path: '/member' })

    if (pathSegments.length === 2) {
      const pageName = memberPages[pathSegments[1]] || pathSegments[1]
      crumbs.push({ name: pageName, path: null })
    }
  }
  // 搜尋頁面
  else if (pathSegments[0] === 'search') {
    const query = route.query.q || ''
    crumbs.push({
      name: query ? `搜尋：${query}` : '搜尋結果',
      path: null
    })
  }
  // 可擴充其他頁面
  // else {
  //   const pageNames = {
  //     'about': '關於我們',
  //     'contact': '聯絡我們',
  //     'faq': '常見問題',
  //     'privacy': '隱私政策',
  //     'terms': '服務條款'
  //   }

  //   pathSegments.forEach((segment, index) => {
  //     const isLast = index === pathSegments.length - 1
  //     const pageName = pageNames[segment] || segment
  //     crumbs.push({
  //       name: pageName,
  //       path: isLast ? null : `/${pathSegments.slice(0, index + 1).join('/')}`
  //     })
  //   })
  // }

  return crumbs
})
</script>

<style lang="scss" scoped>
.breadcrumb-nav {
  width: 100%;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.breadcrumb-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;

  .breadcrumb-link {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    color: #2c4894;
    text-decoration: none;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    transition: all 0.2s ease;

    svg {
      flex-shrink: 0;
    }

    &:hover {
      background: #e7f1ff;
      color: #1e3470;
    }
  }

  .breadcrumb-current {
    color: #666;
    font-weight: 500;
    padding: 0.25rem 0.5rem;
  }

  .breadcrumb-separator {
    color: #adb5bd;
    flex-shrink: 0;
  }

  &.is-active {
    .breadcrumb-current {
      color: #333;
      font-weight: 600;
    }
  }
}

// 手機響應式
@media (max-width: 768px) {
  .breadcrumb-container {
    padding: 0.5rem 1rem;
  }

  .breadcrumb-list {
    gap: 0.35rem;
  }

  .breadcrumb-item {
    font-size: 0.85rem;

    .breadcrumb-link,
    .breadcrumb-current {
      padding: 0.2rem 0.4rem;
    }

    .breadcrumb-link {
      gap: 0.25rem;

      svg {
        width: 14px;
        height: 14px;
      }
    }

    .breadcrumb-separator {
      width: 14px;
      height: 14px;
    }
  }
}

// 小手機響應式
@media (max-width: 480px) {
  .breadcrumb-container {
    padding: 0.5rem 0.75rem;
  }

  .breadcrumb-item {
    font-size: 0.8rem;

    // 在極小螢幕上，簡化顯示
    .breadcrumb-link span {
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .breadcrumb-current {
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
