/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAPS_JS_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
