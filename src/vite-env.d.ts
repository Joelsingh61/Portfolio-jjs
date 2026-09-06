/// <reference types="vite/client" />

declare module '*.toml?raw' {
  const content: string;
  export default content;
}

declare module '*.pdf' {
  const src: string;
  export default src;
}

interface ImportMetaEnv {
  readonly VITE_CONTACT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
