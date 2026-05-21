# Nuxt 4 電商平台

> 基於 Nuxt 4 + TypeScript + Pinia 建置的現代化電商平台，具備完整的購物車、願望清單、會員系統等功能。

## 📋 目錄

- [專案簡介](#專案簡介)
- [主要功能](#主要功能)
- [技術使用](#技術使用)
- [專案結構](#專案結構)
- [快速開始](#快速開始)
- [開發指南](#開發指南)
- [部署到 GitHub Pages](#部署到-github-pages)
- [環境變數](#環境變數)
- [API 說明](#api-說明)
- [瀏覽器支援](#瀏覽器支援)

## 🚀 專案簡介

這是一個功能完整的電商平台前端專案，提供：
- **產品瀏覽**：支援分類篩選（耳機、揚聲器、電視）、搜尋功能
- **購物體驗**：購物車管理、願望清單、產品詳細資訊頁
- **會員系統**：個人資料、訂單檢視、追蹤清單
- **響應式設計**：支援桌面、平板、手機裝置

## ✨ 主要功能

### 🛍️ 購物功能
- 產品列表與詳細資訊頁
- 分類篩選（耳機、揚聲器、電視）
- 產品搜尋功能
- 購物車管理（新增、刪除、數量調整）
- 願望清單
- 本地儲存（localStorage 持久化）

### 👤 會員系統
- 會員資料管理
- 訂單記錄查詢
- 優惠券管理
- 追蹤清單管理
- 訂單狀態追蹤

### 🎨 UI/UX 特色
- 響應式設計（RWD）支援所有裝置
- Toast 通知系統
- 麵包屑導航

## 🛠️ 技術使用

### 核心框架
- **Nuxt 4**
- **Vue 3**
- **TypeScript**
- **Pinia**

### 樣式與 UI
- **SCSS**
- **Scoped Styles**
- **RWD**

### 工具與部署
- **Vite**
- **Nitro**
- **GitHub Actions**
- **GitHub Pages**

## 📁 專案結構

```
nuxt-project/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 部署設定
├── components/
│   ├── NavBar.vue              # 導覽列
│   ├── HeaderSlider.vue        # 首頁輪播圖
│   ├── BestSelling.vue         # 熱銷商品
│   ├── ProductFeatures.vue     # 產品特色
│   ├── Footer.vue              # 頁尾
│   └── Breadcrumb.vue          # 麵包屑
├── composable/
│   ├── useCart.ts              # 購物車邏輯
│   ├── useFavorite.ts          # 願望清單邏輯
│   ├── useToast.ts             # Toast 通知
│   └── useProductType.ts       # 產品類型配置
├── pages/
│   ├── index.vue               # 首頁
│   ├── products/
│   │   ├── [id].vue            # 產品列表（依類型）
│   │   └── detail/
│   │       └── [id].vue        # 產品詳情頁
│   ├── search.vue              # 搜尋頁面
│   └── member/
│       ├── profile.vue         # 會員資料
│       ├── orders.vue          # 訂單記錄
│       └── wishlist.vue        # 追蹤清單
├── store/
│   ├── productStore.ts         # 產品狀態管理
│   ├── orderStore.ts           # 訂單狀態管理
│   └── statusStore.ts          # 全域狀態（loading）
├── public/
│   ├── img/                    # 圖片資源
│   └── 404.html                # SPA 路由處理
├── app.vue                     # 根元件
├── error.vue                   # 錯誤頁面
├── nuxt.config.ts              # Nuxt 配置
├── .env                        # 環境變數
└── package.json
```

