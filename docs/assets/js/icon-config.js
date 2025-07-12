/**
 * Icon configuration for Kigumi documentation
 * This file configures the available icons for the k-icon component
 */

import { ChevronDown, createElement, Plus } from "lucide";

/**
 * Icon configuration object
 * Simple mapping of icon names to renderer functions
 * @type {Object.<string, function():Promise<SVGElement>>}
 */
const iconConfig = {
	"chevron-down": () => createElement(ChevronDown),
	plus: () => createElement(Plus),
};

export { iconConfig };
