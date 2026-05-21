# GitHub Pages 部署指南

## 📋 問題原因紀錄

當直接將 Nuxt 專案推送到 GitHub 時，GitHub Pages 找不到 `index.html`，所以顯示了 `README.md` 的內容。

## ✅ 已完成的檔案配置

1. ✅ **nuxt.config.ts** - 已設定靜態生成模式
2. ✅ **GitHub Actions** - 已建立自動部署工作流程
3. ✅ **.nojekyll** - 已建立 Jekyll 停用檔案

## 🚀 部署步驟

### 步驟 1: 修改 baseURL

開啟 `nuxt.config.ts`，找到這一行：

```typescript
baseURL: process.env.NODE_ENV === 'production' ? '/<repository-name>/' : '/',
```

**根據自身的情況修改：**

#### 情況 A：部署在使用者/組織根網域
- 網址格式：`https://username.github.io/`
- 修改為：`baseURL: '/'`

#### 情況 B：部署在專案子路徑
- 網址格式：`https://username.github.io/repository-name/`
- 修改為：`baseURL: process.env.NODE_ENV === 'production' ? '/repository-name/' : '/'`
- 將 `repository-name` 替換為 GitHub repo名稱

**範例：**
```typescript
// 如果 repo 名稱是 nuxt-project
baseURL: process.env.NODE_ENV === 'production' ? '/nuxt-project/' : '/',
```

### 步驟 2: 設定 GitHub Pages 和環境權限

#### A. 設定 Pages 來源
1. 前往您的 GitHub repositories
2. 點擊 **Settings** (設定)
3. 在左側選單找到 **Pages**
4. 在 **Source** 設定：
   - 選擇 **GitHub Actions**（不是 Deploy from a branch）

#### B. 移除環境保護規則
如果出現「Branch "main" is not allowed to deploy」錯誤：

1. 在 Settings 左側選單找到 **Environments**
2. 點擊 **github-pages** 環境
3. 找到 **Deployment branches and tags**
4. 選擇以下其中一個選項：
   - **All branches**（允許所有分支部署）- 推薦
   - 或者在「Selected branches」中加入 **main** 分支規則

#### C. 確認 Actions 權限
1. 前往 **Settings** → **Actions** → **General**
2. 捲動到最下方 **Workflow permissions**
3. 選擇 **Read and write permissions**
4. 勾選 ✅ **Allow GitHub Actions to create and approve pull requests**
5. 點擊 **Save**

### 步驟 3: 推送程式碼

```bash
git add .
git commit -m "Configure for GitHub Pages deployment"
git push origin main
```

### 步驟 4: 等待部署完成

1. 前往 repo 的 **Actions** 頁籤
2. 查看 "Deploy to GitHub Pages" 工作流程
3. 等待綠色勾勾 ✅（通常需要 1-3 分鐘）
4. 前往 **Settings > Pages** 查看您的網站網址

## 📝 本地測試靜態生成

部署前先在本地測試：

```bash
# 生成靜態檔案
npm run generate

# 預覽生成的網站
npm run preview
```

生成的檔案會在 `dist/` 資料夾中。

## 🔧 常見問題

### ⚠️ Q1: Branch "main" is not allowed to deploy to github-pages
**錯誤訊息：**
```
Branch "main" is not allowed to deploy to github-pages due to environment protection rules.
The deployment was rejected or didn't satisfy other protection rules.
```

**原因：** GitHub 預設的環境保護規則阻止了部署

**解決方法：**
1. 前往 repo **Settings** → **Environments**
2. 點擊 **github-pages** 環境
3. 找到 **Deployment branches and tags** 區塊
4. 改為 **All branches** 或加入 **main** 分支規則
5. 點擊 **Save protection rules**
6. 回到 **Actions** 頁籤，重新執行失敗的 workflow

### ⚠️ Q2: 取得產品失敗: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
**錯誤訊息：**
```
取得產品失敗: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

**原因：** 部署後環境變數（.env 文件）未包含在靜態文件中，導致 API 請求失敗

**解決方法：** 已在 `nuxt.config.ts` 中新增 `runtimeConfig`，並更新 `productStore.ts` 使用 `useRuntimeConfig()`

如果您使用其他 API 或環境變數，請確認：
1. API 地址已正確配置在 `nuxt.config.ts` 的 `runtimeConfig.public` 中
2. 代碼中使用 `useRuntimeConfig()` 而非 `import.meta.env`
3. 重新執行 `npm run generate` 並推送

### ⚠️ Q3: 圖片無法顯示（HeaderSlider、ProductFeatures 等）
**原因：** 部署到 GitHub Pages 子路徑時，絕對路徑 `/img/xxx.jpg` 會解析為 `https://username.github.io/img/xxx.jpg` 而非 `https://username.github.io/nuxt-project/img/xxx.jpg`

**解決方法：** 已修復以下組件使用 `useRuntimeConfig()` 動態生成圖片路徑：
- ✅ `components/HeaderSlider.vue`
- ✅ `components/ProductFeatures.vue`
- ✅ `error.vue`

所有組件現在都使用 `getImagePath()` 函數來處理 baseURL，確保圖片在任何部署環境下都能正確載入。

### Q4: 頁面顯示 404
**解決方法：** 檢查 `baseURL` 設定是否正確

### Q5: CSS/JS 檔案載入失敗
**解決方法：** 
- 確認 `baseURL` 包含正確的 repo 名稱
- 確認 `.nojekyll` 檔案存在於 `public/` 資料夾

### Q6: Actions 部署失敗（權限問題）
**解決方法：**
- 確認 GitHub Pages 設定為 "GitHub Actions"
- 確認有足夠的權限（Settings > Actions > General > Workflow permissions 設為 Read and write）

### Q7: 首頁可以但其他頁面 404
**解決方法：** SPA 模式在 GitHub Pages 需要額外處理，可以：
1. 在 `public/` 建立 `404.html` 重定向到 `index.html`
2. 或改用 `ssr: true` 並設定正確的 `target`

## 📦 檔案結構

```
nuxt-project/
├── .github/
│   └── workflows/
│       └── deploy.yml          # 自動部署設定
├── public/
│   └── .nojekyll              # 停用 Jekyll
├── nuxt.config.ts             # Nuxt 配置（含 baseURL）
└── package.json
```

## 🎯 檢查清單

在推送前確認：

- [ ] `nuxt.config.ts` 中的 `baseURL` 設定正確
- [ ] `nuxt.config.ts` 中的 `runtimeConfig.public` 包含所有必要的環境變數
- [ ] GitHub Pages 來源設定為 "GitHub Actions"
- [ ] **Environments** → **github-pages** → **Deployment branches** 設為 **All branches**
- [ ] **Actions** → **General** → **Workflow permissions** 設為 **Read and write**
- [ ] `.nojekyll` 檔案存在於 `public/` 資料夾
- [ ] 已執行 `npm run generate` 測試本地建置

## 疑難排解

如果遇到問題，請檢查：
1. GitHub Actions 的建置日誌
2. 瀏覽器開發者工具的 Console 錯誤訊息
3. Network 面板檢查資源載入路徑

---

完成上述步驟後，Nuxt 專案就能正確部署到 GitHub Pages
