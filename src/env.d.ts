/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_TITLE: string
  // plus de variables d'environnement...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
