import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.js"),
			name: "Kigumi",
			formats: ["es", "cjs"],
			fileName: (format) => `kigumi.${format === "es" ? "mjs" : "cjs"}`,
		},
		rollupOptions: {
			output: {
				// Preserve module structure
				preserveModules: true,
				preserveModulesRoot: "src",
				assetFileNames: "[name][extname]",
			},
		},
		// Generate sourcemaps
		sourcemap: true,
		target: "esnext", // Target modern browsers
		cssCodeSplit: true,
	},
});
