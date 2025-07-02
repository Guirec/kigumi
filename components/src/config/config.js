/**
 * @typedef {Object} KigumiIconConfig
 * @property {Object.<string, Object.<string, function():Promise<SVGElement>>>} icons - Icon configuration by provider
 */

/**
 * @typedef {Object} KigumiConfig
 * @property {KigumiIconConfig} [icons] - Icon configuration
 */

import { ChevronDown, createElement, Plus } from "lucide";

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
 * Load the configuration
 * @returns {Promise<KigumiConfig>}
 */
export async function loadConfig() {
	return defaultConfig;
}
