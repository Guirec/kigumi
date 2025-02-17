/**
 * @typedef {Object} KigumiIconConfig
 * @property {Object.<string, Object.<string, function():Promise<SVGElement>>>} icons - Configuration des icônes par fournisseur
 */

/**
 * @typedef {Object} KigumiConfig
 * @property {KigumiIconConfig} [icons] - Configuration des icônes
 */

/**
 * @typedef {Object} DisclosureAttributes
 * @property {'mixed'|'exclusive'} [mode="mixed"] - Expansion mode for sections. In exclusive mode, only one section can be open at a time
 */

/**
 * @typedef {Object} IconAttributes
 * @property {string} icon - Name of the icon to display
 * @property {string} [provider="lucide"] - Icon provider (default: "lucide")
 */
