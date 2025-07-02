import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.js"),
			name: "Kigumi",
			formats: ["es"],
			fileName: () => "kigumi.js",
		},
		rollupOptions: {
			external: ["lucide"],
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
