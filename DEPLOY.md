# GitHub Pages 部署指南

## 📋 問題原因

當您直接將 Nuxt 專案推送到 GitHub 時，GitHub Pages 找不到 `index.html`，所以顯示了 `README.md` 的內容。

## ✅ 已完成的配置

1. ✅ **nuxt.config.ts** - 已設定靜態生成模式
2. ✅ **GitHub Actions** - 已建立自動部署工作流程
3. ✅ **.nojekyll** - 已建立 Jekyll 停用檔案

## 🚀 部署步驟

### 步驟 1: 修改 baseURL（重要！）

開啟 `nuxt.config.ts`，找到這一行：

```typescript
baseURL: process.env.NODE_ENV === 'production' ? '/<repository-name>/' : '/',
```

**根據您的情況修改：**

#### 情況 A：部署在使用者/組織根網域
- 網址格式：`https://username.github.io/`
- 修改為：`baseURL: '/'`

#### 情況 B：部署在專案子路徑
- 網址格式：`https://username.github.io/repository-name/`
- 修改為：`baseURL: process.env.NODE_ENV === 'production' ? '/repository-name/' : '/'`
- 將 `repository-name` 替換為您的 GitHub 倉庫名稱

**範例：**
```typescript
// 如果您的倉庫名稱是 nuxt-project
baseURL: process.env.NODE_ENV === 'production' ? '/nuxt-project/' : '/',
```

### 步驟 2: 設定 GitHub Pages

1. 前往您的 GitHub 倉庫
2. 點擊 **Settings** (設定)
3. 在左側選單找到 **Pages**
4. 在 **Source** 設定：
   - 選擇 **GitHub Actions**（不是 Deploy from a branch）

### 步驟 3: 推送程式碼

```bash
git add .
git commit -m "Configure for GitHub Pages deployment"
git push origin main
```

### 步驟 4: 等待部署完成

1. 前往倉庫的 **Actions** 頁籤
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

### Q1: 頁面顯示 404
**解決方法：** 檢查 `baseURL` 設定是否正確

### Q2: CSS/JS 檔案載入失敗
**解決方法：** 
- 確認 `baseURL` 包含正確的倉庫名稱
- 確認 `.nojekyll` 檔案存在於 `public/` 資料夾

### Q3: Actions 部署失敗
**解決方法：**
- 確認 GitHub Pages 設定為 "GitHub Actions"
- 確認有足夠的權限（Settings > Actions > General > Workflow permissions 設為 Read and write）

### Q4: 首頁可以但其他頁面 404
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
- [ ] GitHub Pages 來源設定為 "GitHub Actions"
- [ ] `.nojekyll` 檔案存在於 `public/` 資料夾
- [ ] 已執行 `npm run generate` 測試本地建置

## 📞 需要協助？

如果遇到問題，請檢查：
1. GitHub Actions 的建置日誌
2. 瀏覽器開發者工具的 Console 錯誤訊息
3. Network 面板檢查資源載入路徑

---

完成以上步驟後，您的 Nuxt 專案就能正確部署到 GitHub Pages！
