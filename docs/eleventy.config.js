import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import { bundleAsync } from "lightningcss";
import { resolve, dirname } from "node:path";
import { deleteSync } from "del";

export default function (eleventyConfig) {
	eleventyConfig.addWatchTarget("assets/css/**/*.css");
	// eleventyConfig.setWatchThrottleWaitTime(100);

	eleventyConfig.addFilter("cacheBust", () => {
		return `?v=${Date.now()}`;
	});

	// Clean CSS output directory before bundling
	eleventyConfig.on("beforeWatch", () => {
		deleteSync(["public/assets/css/**/*"]);
	});

	// Bundle CSS
	eleventyConfig.addBundle("css", {
		toFileDirectory: "assets/css",
		transforms: [
			async function (content) {
				try {
					const { code } = await bundleAsync({
						filename: resolve("assets/css/main.css"),
						minify: true,
						sourceMap: false,
						resolver: {
							resolve(specifier, from) {
								if (specifier === "kigumi.css") {
									return resolve("node_modules/@kigumi/styles/dist/kigumi.css");
								}
								return resolve(dirname(from), specifier);
							},
						},
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

		// Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: "liquid",

		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: "liquid",

		// These are all optional:
		dir: {
			input: "content", // default: "."
			includes: "../_includes", // default: "_includes" (`input` relative)
			layouts: "../_includes/layouts",
			data: "../_data", // default: "_data" (`input` relative)
			output: "public",
		},
	};
}
