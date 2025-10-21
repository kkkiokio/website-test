# website-test

该示例仓库现在内置了一个零依赖的静态开发/预览流程，以解决无法从外部 npm Registry 下载 Vite 依赖导致 `npm run dev` 无法启动的问题。

## 本地开发

```bash
npm run dev -- --host 0.0.0.0 --port 5173
```

命令会使用 Node.js 内置的 `http` 模块启动一个轻量静态服务器，默认读取 `public/` 目录下的文件。页面样式沿用了原先的 Tailwind 风格类名，并在 `public/assets/main.css` 中提供了所需的原子化样式定义。

## 构建与预览

```bash
npm run build
npm run preview -- --port 4173
```

`npm run build` 会将 `public/` 目录完整复制到 `dist/`，`npm run preview` 会以同一套服务器逻辑读取 `dist/` 目录，便于在本地验证打包产物。
