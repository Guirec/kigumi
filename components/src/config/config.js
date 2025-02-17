import "./types.js";
import { createElement, ChevronDown, Plus } from "lucide";

/**
 * @type {KigumiConfig}
 */
const defaultConfig = {
	icons: {
		lucide: {
			"chevron-down": async () => {
				return createElement(ChevronDown);
			},
			plus: async () => {
				return createElement(Plus);
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
