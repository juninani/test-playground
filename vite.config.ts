import path from "path";

import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import type { UserConfig } from "vite";
import { defineConfig, loadEnv } from "vite";
import viteCompression from "vite-plugin-compression";
import { createHtmlPlugin } from "vite-plugin-html";
import svgr from "vite-plugin-svgr";

export default ({ mode }: UserConfig) => {
	const env = loadEnv(mode || "", `${process.cwd()}/.env`);
	Object.assign(process.env, env);

	const isProduction = mode === "release";
	const isDevelopment = mode === "dev";

	return defineConfig({
		envDir: ".env",
		base: "/",

		// 개발 서버 설정 개선
		server: {
			port: 3000,
			open: true,
			host: true, // 네트워크 접근 허용
			cors: true,
			// 프록시 설정 (API 서버가 다른 포트에 있을 때)
			// proxy: {
			// 	"/api": {
			// 		target: "http://localhost:8080",
			// 		changeOrigin: true,
			// 		secure: false,
			// 	},
			// },
		},

		// 프리뷰 서버 설정
		preview: {
			port: 4173,
			host: true,
		},

		// 빌드 최적화
		build: {
			target: "esnext",
			outDir: "dist",
			assetsDir: "assets",
			sourcemap: isProduction ? false : true,
			minify: isProduction ? "esbuild" : false,
			cssMinify: isProduction,

			// 청크 분리 최적화
			rollupOptions: {
				output: {
					manualChunks: {
						// 대용량 라이브러리들 분리
						vendor: ["react", "react-dom"],
						router: ["react-router-dom"],
						query: ["@tanstack/react-query"],
						utils: ["dayjs", "axios", "zustand"],
					},
					// 파일명 설정
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
				},
			},

			// 번들 크기 경고 임계값
			chunkSizeWarningLimit: 1000,
		},

		// CSS 설정
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: (content, filename) => {
						// main.scss에는 추가하지 않음
						if (filename.endsWith("reset.scss")) return content;
						return `@use "/src/assets/styles/main.scss" as *;\n${content}`;
					},
					charset: false, // charset 제거로 경고 방지
				},
			},
			devSourcemap: isDevelopment,
		},

		// 플러그인
		plugins: [
			react({
				// JSX 런타임 최적화
				jsxRuntime: "automatic",
			}),

			svgr({
				svgrOptions: {
					icon: true,
					// SVG 최적화 설정
					svgoConfig: {
						plugins: [
							{
								name: "removeViewBox",
								active: false,
							},
						],
					},
				},
			}),

			// Gzip 압축
			viteCompression({
				algorithm: "gzip",
				ext: ".gz",
				threshold: 1024, // 1KB 이상 파일만 압축
				deleteOriginFile: false,
			}),

			// Brotli 압축 (더 나은 압축률)
			viteCompression({
				algorithm: "brotliCompress",
				ext: ".br",
				threshold: 1024,
				deleteOriginFile: false,
			}),

			createHtmlPlugin({
				inject: {
					data: {
						title: "보일러플레이트 프론트",
						favicon: "/images/vite.svg",
						// CSP 메타 태그 등 보안 설정
						meta: `
							<meta name="viewport" content="width=device-width, initial-scale=1.0">
							<meta name="theme-color" content="#000000">
						`,
					},
				},
				minify: isProduction,
			}),

			// 번들 분석기 (프로덕션에서만)
			...(isProduction
				? [
						visualizer({
							open: false, // 자동으로 열지 않음
							filename: "dist/stats.html",
							brotliSize: true,
							sourcemap: true,
							gzipSize: true,
							template: "treemap", // 또는 'sunburst', 'network'
						}),
					]
				: []),
		],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
				"@api": path.resolve(__dirname, "./src/api"),
				"@config": path.resolve(__dirname, "./src/config"),
				"@assets": path.resolve(__dirname, "./src/assets"),
				"@schemas": path.resolve(__dirname, "./src/schemas"),
				"@utils": path.resolve(__dirname, "./src/utils"),
				"@hooks": path.resolve(__dirname, "./src/hooks"),
				"@components": path.resolve(__dirname, "./src/components"),
				"@pages": path.resolve(__dirname, "./src/pages"),
				"@stores": path.resolve(__dirname, "./src/stores"),
				"@routers": path.resolve(__dirname, "./src/routers"),
				"@layout": path.resolve(__dirname, "./src/layout"),
			},
		},

		// 의존성 최적화
		optimizeDeps: {
			include: [
				"react",
				"react-dom",
				"@tanstack/react-query",
				"react-router-dom",
				"zustand",
				"axios",
				"dayjs",
			],
		},

		// 환경 변수 설정
		define: {
			// 전역 상수 정의
			__DEV__: isDevelopment,
			__PROD__: isProduction,
		},
	});
};
