import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		rollupOptions: {
			input: resolve(__dirname, "src/index.js"),
			preserveEntrySignatures: "strict",
			output: {
				preserveModules: true,
				preserveModulesRoot: "src",
				entryFileNames: "[name].js",
				assetFileNames: "[name][extname]",
				chunkFileNames: "[name].js",
			},
		},
		sourcemap: true,
		target: "esnext",
		cssCodeSplit: true,
	},
});
