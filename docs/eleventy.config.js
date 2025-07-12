import { readdirSync, rmSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import { bundleAsync } from "lightningcss";

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

	// Watch CSS files
	eleventyConfig.addWatchTarget("assets/css");

	// Watch and copy JavaScript files
	eleventyConfig.addWatchTarget("assets/js");
	eleventyConfig.addPassthroughCopy("assets/js");

	// Copy only the necessary component files from dist
	eleventyConfig.addPassthroughCopy({
		"node_modules/@kigumi/components/dist": "assets/js/kigumi",
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
								if (specifier === "@kigumi/tokens.css") {
									return resolve("node_modules/@kigumi/tokens/tokens.css");
								}
								if (specifier === "@kigumi/styles.css") {
									return resolve("node_modules/@kigumi/styles/dist/styles.css");
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
		templateFormats: ["md", "njk", "html", "11ty.js"],
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		dir: {
			input: "content",
			includes: "../_includes",
			layouts: "../_includes/layouts",
			data: "../_data",
			output: "public",
		},
	};
}
