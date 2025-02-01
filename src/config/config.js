import "./types.js";
import { createElement, ChevronDown } from "lucide";

/**
 * @type {KigumiConfig}
 */
const defaultConfig = {
	icons: {
		lucide: {
			"chevron-down": async () => {
				return createElement(ChevronDown);
			},
		},
	},
};

/**
 * Charge la configuration
 * @returns {Promise<KigumiConfig>}
 */
export async function loadConfig() {
	return defaultConfig;
}
