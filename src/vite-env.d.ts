/// <reference types="./vite-env-override.d.ts" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_BASE_URL: string;
	readonly NODE_ENV: "development" | "production";
}
interface ImportMeta {
	readonly env: ImportMetaEnv;
}
