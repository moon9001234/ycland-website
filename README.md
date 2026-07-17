# 云川地政事務所網站

這是云川地政事務所的一頁式官方網站，使用 React + Vite 製作。

## 開發

```bash
npm install
npm run dev
```

## 建置

```bash
npm run build
```

建置輸出位於 `dist/`。

## Vercel 設定

在 Vercel 匯入此 GitHub repository 後，建議設定如下：

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

正式網域可在 Vercel Project Settings 的 Domains 加入 `www.ycland.com.tw`。
