/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAPS_JS_API: string;
  readonly VITE_COGNITO_USER_POOL_ID: string;
  readonly VITE_COGNITO_USER_POOL_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type ExtractSingleElementType<T> = T extends [infer U] ? U : never;
