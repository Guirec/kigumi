import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import { bundleAsync } from "lightningcss";
import { resolve, dirname, join } from "node:path";
import { readdirSync, statSync, rmSync } from "fs";

export default function (eleventyConfig) {
	// Clean CSS from public directory
	function cleanCSSDirectory() {
		const directory = "public/assets/css";
		try {
			const files = readdirSync(directory);
			for (const file of files) {
				const filePath = join(directory, file);
				if (statSync(filePath).isFile()) {
					console.log(`Deleting file: ${filePath}`);
					rmSync(filePath); // Delete file
				}
			}
		} catch (error) {
			if (error.code !== "ENOENT") {
				console.error(`Error cleaning CSS directory: ${error.message}`);
			}
		}
	}

	// Clean CSS public directory before build (in production mode)
	eleventyConfig.on("eleventy.before", () => {
		if (process.env.NODE_ENV === "production") {
			cleanCSSDirectory();
		}
	});

	// Bundle CSS
	eleventyConfig.addBundle("css", {
		toFileDirectory: "assets/css",
		transforms: [
			async (content) => {
				try {
					const { code } = await bundleAsync({
						filename: resolve("assets/css/main.css"),
						minify: true,
						sourceMap: false,
						resolver: {
							resolve(specifier, from) {
								if (specifier === "@kigumi/styles.css") {
									return resolve("node_modules/@kigumi/styles/dist/styles.css");
								}
								if (specifier === "@kigumi/tokens.css") {
									return resolve("node_modules/@kigumi/tokens/dist/tokens.css");
								}
								return resolve(dirname(from), specifier);
							},
						},
						importResolver: true,
						entries: [content],
					});

					return code.toString();
				} catch (error) {
					console.error("LightningCSS bundle error:", error);
					return content;
				}
			},
		],
	});

	// Navigation plugin
	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	return {
		templateFormats: ["md", "liquid", "html", "11ty.js"],
		markdownTemplateEngine: "liquid",
		htmlTemplateEngine: "liquid",
		dir: {
			input: "content",
			includes: "../_includes",
			layouts: "../_includes/layouts",
			data: "../_data",
			output: "public",
		},
	};
}
