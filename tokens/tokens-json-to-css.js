/**
 * @fileoverview Script to generate CSS variables from a JSON tokens file
 * @module tokens-json-to-css
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generates CSS variables from a tokens object
 * @param {Object} tokens - The object containing tokens to convert to CSS variables
 * @returns {string} The generated CSS content with variables
 */
function generateCssVariables(tokens) {
	let cssContent = ":root {\n";

	/**
	 * Recursively processes an object to generate CSS variables
	 * @param {Object} obj - The object to process
	 * @param {string} [prefix=""] - The prefix to use for variable names
	 */
	function processObject(obj, prefix = "") {
		for (const [key, value] of Object.entries(obj)) {
			const newPrefix = prefix ? `${prefix}-${key}` : key;

			if (typeof value === "object" && value !== null) {
				processObject(value, newPrefix);
			} else {
				cssContent += `	--k-${newPrefix}: ${value};\n`;
			}
		}
	}

	// Process each token category
	const categories = Object.entries(tokens);
	categories.forEach(([category, values], index) => {
		const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
		cssContent += `	/* ${capitalizedCategory} */\n`;
		processObject(values, category);
		if (index < categories.length - 1) {
			cssContent += "\n";
		}
	});

	cssContent += "}\n";

	return cssContent;
}

// Read CLI arguments for input/output files
const [,, inputArg, outputArg] = process.argv;

const tokensPath = inputArg
	? path.resolve(process.cwd(), inputArg)
	: path.join(__dirname, "tokens.json");
const cssPath = outputArg
	? path.resolve(process.cwd(), outputArg)
	: path.join(path.dirname(tokensPath), path.basename(tokensPath, path.extname(tokensPath)) + ".css");

const tokens = JSON.parse(fs.readFileSync(tokensPath, "utf8"));

// Generate CSS
const cssContent = generateCssVariables(tokens);

// Write the CSS file
fs.writeFileSync(cssPath, cssContent);

console.log(`CSS file generated: ${path.basename(cssPath)}`);
