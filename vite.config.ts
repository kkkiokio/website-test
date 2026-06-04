import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import pkg from './package.json';

export default defineConfig(({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root, '');
  const isProduction = mode === 'production';

  const base = env.VITE_PUBLIC_BASE_PATH || '/';
  const outDir = env.VITE_BUILD_OUTPUT_DIR || 'dist';
  const assetsDir = env.VITE_ASSETS_DIR || 'assets';

  return {
    base,
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    envPrefix: ['VITE_', 'APP_'],
    build: {
      outDir,
      assetsDir,
      sourcemap: !isProduction,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV || mode),
      __APP_VERSION__: JSON.stringify(pkg.version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      __COMMIT_SHA__: JSON.stringify(env.VITE_COMMIT_SHA || 'dev')
    }
  };
});
