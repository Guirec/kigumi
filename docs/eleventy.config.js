import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

export default function (eleventyConfig) {
	// Copy CSS files
	eleventyConfig.addPassthroughCopy({
		"node_modules/@kigumi/styles/dist/kigumi.css": "assets/css/kigumi.css",
		"assets/css/main.css": "assets/css/main.css",
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
