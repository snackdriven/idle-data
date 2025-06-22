/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./tests/setup.ts"],
		css: true,
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			exclude: [
				"node_modules/",
				"tests/",
				"**/*.test.{ts,tsx}",
				"**/*.stories.{ts,tsx}",
				"encore.gen/",
				".next/",
				"build/",
				"dist/",
			],
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./frontend/app"),
			"~encore": path.resolve(__dirname, "./encore.gen"),
		},
	},
});
