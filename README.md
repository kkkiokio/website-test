# LinguaBridge Technologies Website

多语言的 LinguaBridge Technologies 官网，使用 [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/) 构建，并针对 SEO、国际化以及生产部署进行了优化。

## 先决条件
- Node.js 18+（推荐 LTS 版本）
- npm 9+

## 安装依赖
```bash
npm install
```

## 开发模式
```bash
npm run dev
```
默认会在 `http://localhost:5173` 启动本地开发服务器。开发过程中会根据浏览器语言和语言切换器动态更新 `<html lang>`、`<title>`、Meta、OG/Twitter 标签以及 `hreflang` 链接。

## 环境变量
通过 Vite 的环境变量系统配置不同环境：

| 变量名 | 说明 | 示例 |
| --- | --- | --- |
| `VITE_SITE_URL` | 站点对外访问域名，用于生成 canonical、OG URL、sitemap、robots | `https://linguabridge.ai` |
| `VITE_PUBLIC_BASE_PATH` | 静态资源基础路径，部署到子目录时设置 | `/website/` |
| `VITE_BUILD_OUTPUT_DIR` | 构建输出目录 | `dist` |
| `VITE_ASSETS_DIR` | 构建产物中的静态资源目录 | `assets` |
| `VITE_SOCIAL_IMAGE` | （可选）社交分享卡片图片的绝对或相对地址 | `/social-share.png` |

将变量写入 `.env`, `.env.production` 等文件或在命令行临时导出。

## 构建与部署
```bash
# 生成 robots.txt 与 sitemap.xml（prebuild 钩子会自动执行）
VITE_SITE_URL=https://linguabridge.ai npm run build
```

- `vite.config.ts` 会根据当前 `mode` 读取环境变量，自动设置 `base`、构建目录、静态资源目录以及 Source Map。
- `scripts/generate-seo-assets.mjs` 会在 `npm run build` 前执行，基于 `VITE_SITE_URL` 写入 `public/robots.txt` 与 `public/sitemap.xml`，并在打包时自动复制到最终产物中。
- 构建完成后将 `dist/` 上传至静态托管（例如 Vercel、Netlify、Cloudflare Pages、OSS/CDN 等）。

### 预渲染 / SSR 建议
本项目默认以静态站点部署（CSR + 动态头部更新）。如果需要进一步提升 SEO：
1. 使用 [Vite SSG](https://github.com/vitejs/vite-ssg) 或 [vite-plugin-ssr](https://vite-plugin-ssr.com/) 对关键页面进行预渲染；
2. 或迁移至支持 SSR 的框架（例如 Nuxt 3），沿用现有的路由、文案与 i18n 配置；
3. 部署 SSR/预渲染版本时，确保保留 `scripts/generate-seo-assets.mjs` 以输出 robots/sitemap，并在部署平台上设置好上述环境变量。

## SEO 要点
- 页面标题、描述、关键词、OG/Twitter 标签、`html lang` 与 `hreflang` 会根据当前语言和路由动态更新。
- `public/robots.txt`、`public/sitemap.xml` 通过 `npm run seo:generate` 自动生成；如需新增页面，请同步更新 `scripts/generate-seo-assets.mjs` 中的路由列表。
- 请为 `VITE_SOCIAL_IMAGE` 或各语言的 `seo.*.image` 配置真实的 1200×630 社交分享图，以获得最佳展示效果。
- 站点语言切换器会在 URL 上附加 `?lang=` 参数，方便搜索引擎抓取对应语言版本。

## 常用脚本
```bash
npm run dev            # 启动本地开发
npm run build          # 构建生产版本（自动生成 sitemap/robots）
npm run preview        # 预览生产构建结果
npm run seo:generate   # 单独重新生成 robots.txt 与 sitemap.xml
```

## 项目结构（节选）
```
├── index.html                     # 初始 HTML 模板，包含基础 SEO 标签
├── public/                        # 构建时直接复制到 dist
│   ├── robots.txt                 # 自动生成
│   └── sitemap.xml                # 自动生成
├── scripts/
│   └── generate-seo-assets.mjs    # robots/sitemap 生成脚本
├── src/
│   ├── composables/useSeo.ts      # 根据路由与语言动态更新 SEO 标签
│   ├── layouts/DefaultLayout.vue  # 布局组件，挂载 useSeo 并提供语言切换器
│   ├── locales/en.json            # 英文文案 + SEO 配置
│   ├── locales/zh.json            # 中文文案 + SEO 配置
│   └── router/index.ts            # 应用路由
└── vite.config.ts                 # Vite 配置，支持多环境构建
```

如需扩展页面或语言，请同步更新 `src/locales/*.json` 与 `scripts/generate-seo-assets.mjs`，并在部署前确认环境变量配置无误。
