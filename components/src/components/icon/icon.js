/**
 * @typedef {Object} IconAttributes
 * @property {string} icon - Name of the icon to display
 * @property {string} [provider="lucide"] - Icon provider (default: "lucide")
 */

// Import config
import { loadConfig } from "../../config/config.js";

/**
 * Import and initialization of styles
 */
import styles from "./icon.css?inline";

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);

/**
 * Custom web component to display icons
 * @extends HTMLElement
 * @customElement k-icon
 * @example
 * <k-icon icon="chevron-down"></k-icon>
 * <k-icon icon="custom-icon" provider="custom"></k-icon>
 */
class Icon extends HTMLElement {
	/** @private */
	#isUpdating = false;

	/**
	 * @private
	 * @type {Map<string, function():Promise<SVGElement>>}
	 */
	static #internalIcons = new Map();

	/**
	 * @private
	 * @type {Object.<string, Object.<string, function():Promise<SVGElement>>>}
	 */
	static #providers = {};

	/**
	 * List of attributes to observe for changes
	 * @returns {string[]}
	 */
	static get observedAttributes() {
		return ["icon", "provider"];
	}

	/**
	 * Register an internal icon
	 * @param {string} name - Icon name
	 * @param {function():Promise<SVGElement>} renderer - Icon renderer function
	 */
	static registerInternalIcon(name, renderer) {
		Icon.#internalIcons.set(name, renderer);
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();
		this.attachShadow({ mode: "open" });

		// Adopt the stylesheet
		this.shadowRoot.adoptedStyleSheets = [sheet];
	}

	/**
	 * @method
	 * @async
	 * @description Called when the element is inserted into the DOM
	 */
	async connectedCallback() {
		await this.updateIcon();
	}

	/**
	 * @method
	 * @async
	 * @description Called when an observed attribute is changed
	 * @param {string} name - Attribute name
	 * @param {string} oldValue - Old attribute value
	 * @param {string} newValue - New attribute value
	 */
	async attributeChangedCallback(name, oldValue, newValue) {
		if (name === "icon" && oldValue !== newValue) {
			await this.updateIcon();
		}
	}

	/**
	 * Gets the icon name from attributes
	 * @private
	 * @throws {Error} If icon attribute is missing
	 * @returns {string}
	 */
	#getIconName() {
		const iconName = this.getAttribute("icon");
		if (!iconName) {
			throw new Error('Missing "icon" attribute');
		}
		return iconName;
	}

	/**
	 * Gets the icon provider from attributes
	 * @private
	 * @returns {string}
	 */
	#getIconProvider() {
		return this.getAttribute("provider") || "lucide";
	}

	/**
	 * Renders an internal icon
	 * @private
	 * @param {string} iconName - Name of the icon to render
	 * @returns {Promise<boolean>} True if the icon was successfully rendered
	 */
	async #renderInternalIcon(iconName) {
		const provider = this.#getIconProvider();
		const iconKey = `${provider}:${iconName}`;

		const internalRenderer = Icon.#internalIcons.get(iconKey);
		if (internalRenderer) {
			const svgElement = await internalRenderer();
			this.#updateShadowRoot(svgElement);
			return true;
		}
		return false;
	}

	/**
	 * Renders a user-provided icon
	 * @private
	 * @param {string} iconName - Name of the icon to render
	 * @param {string} provider - Provider name
	 * @returns {Promise<boolean>} True if the icon was successfully rendered
	 */
	async #renderUserIcon(iconName, provider) {
		const userRenderer = Icon.#providers[provider]?.[iconName];
		if (userRenderer) {
			const svgElement = await userRenderer();
			this.#updateShadowRoot(svgElement);
			return true;
		}
		return false;
	}

	/**
	 * Updates the shadow root content
	 * @private
	 * @param {Element} element - Element to append to the shadow root
	 */
	#updateShadowRoot(element) {
		this.shadowRoot.innerHTML = "";
		this.shadowRoot.appendChild(element);
	}

	/**
	 * Renders an error message
	 * @private
	 * @param {string} message - Error message to display
	 */
	#renderError(message) {
		console.error(`k-icon: ${message}`);
		this.shadowRoot.innerHTML = "";
	}

	/**
	 * Updates the displayed icon
	 * @public
	 * @async
	 * @returns {Promise<void>}
	 */
	async updateIcon() {
		if (this.#isUpdating) return;
		this.#isUpdating = true;

		try {
			const iconName = this.#getIconName();
			const provider = this.#getIconProvider();

			const internalIconRendered = await this.#renderInternalIcon(iconName);
			if (internalIconRendered) return;

			const userIconRendered = await this.#renderUserIcon(iconName, provider);
			if (userIconRendered) return;

			throw new Error(`Icon "${iconName}" is not available`);
		} catch (error) {
			this.#renderError(error.message);
		} finally {
			this.#isUpdating = false;
		}
	}

	/**
	 * @method
	 * @async
	 * @description Initialize the component and load the configuration
	 */
	static async initialize() {
		const config = await loadConfig();
		Icon.#providers = config.icons || {};

		// Initialize internal icons from configuration
		if (config.icons) {
			// Iterate through all providers to register their icons as internal icons
			for (const [provider, icons] of Object.entries(config.icons)) {
				for (const [name, renderer] of Object.entries(icons)) {
					// Prefix icon name with provider to avoid conflicts
					Icon.registerInternalIcon(`${provider}:${name}`, renderer);
				}
			}
		}
	}
}

// Automatic initialization when component loads
Icon.initialize().catch((error) => {
	console.error("Error initializing icons:", error);
});

// Check if the component is not already defined
if (!customElements.get("k-icon")) {
	customElements.define("k-icon", Icon);
}

// Export the Icon class for named imports
export { Icon };
