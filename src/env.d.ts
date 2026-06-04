/// <reference types="vite/client" />

declare const __APP_ENV__: string;
declare const __APP_VERSION__: string;
declare const __BUILD_TIME__: string;
declare const __COMMIT_SHA__: string;

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
