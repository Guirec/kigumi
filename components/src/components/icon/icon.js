/**
 * @typedef {Object} IconAttributes
 * @property {string} name - Name of the icon to display
 */

/**
 * @typedef {Object.<string, function():string|Element|Promise<string|Element>>} IconConfiguration
 * @description Configuration object for icon registration
 */

/**
 * @typedef {function():string|Element|Promise<string|Element>} IconRenderer
 * @description Function that returns an SVG string, Element, or Promise resolving to either
 */

/**
 * Import and initialization of styles
 */
import styles from "./icon.css?inline";

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);

/**
 * Custom web component to display icons
 *
 * This component provides a flexible way to display SVG icons with support for:
 * - Custom icon registration
 * - Async icon loading
 * - Dynamic icon updates
 *
 * @extends HTMLElement
 * @customElement k-icon
 *
 * @example
 * // Add icons to configuration
 * Icon.addIconConfig({
 *   'home': () => '<svg>...</svg>',
 *   'user': () => '<svg>...</svg>'
 * });
 *
 * @example
 * // Add more icons to existing configuration
 * Icon.addIconConfig({
 *   'settings': () => '<svg>...</svg>'
 * });
 */
class Icon extends HTMLElement {
	/** @private */
	#isUpdating = false;

	/**
	 * @private
	 * @type {boolean}
	 */
	#isInitialRender;

	/**
	 * @private
	 * @type {Map<string, IconRenderer>}
	 */
	static #icons = new Map();

	/**
	 * @private
	 * @type {WeakSet<Icon>}
	 */
	static #iconInstances = new WeakSet();

	/**
	 * List of attributes to observe for changes
	 * @returns {string[]} Array of attribute names to observe
	 */
	static get observedAttributes() {
		return ["name"];
	}

	/**
	 * Update all existing icon instances
	 * @private
	 * @description Updates all existing icon instances in the DOM, avoiding duplicates
	 */
	static #updateAllInstances() {
		const instances = new Set();

		document.querySelectorAll("k-icon").forEach((icon) => {
			if (!Icon.#iconInstances.has(icon)) {
				instances.add(icon);
				Icon.#iconInstances.add(icon);
			}
		});

		instances.forEach((icon) => {
			if (icon.#updateIcon) {
				icon.#updateIcon();
			}
		});
	}

	/**
	 * Add icons to existing configuration (preserves existing icons)
	 *
	 * This method adds new icons to the existing configuration without removing
	 * currently registered icons. Use this to extend the icon set.
	 *
	 * @param {IconConfiguration} config - Additional icon configuration object
	 * @throws {Error} When config is not an object or contains invalid entries
	 *
	 * @example
	 * // Add icons to existing configuration
	 * Icon.addIconConfig({
	 *   'new-icon': () => '<svg>...</svg>',
	 *   'another-icon': () => '<svg>...</svg>'
	 * });
	 */
	static addIconConfig(config) {
		if (!config || typeof config !== "object") {
			throw new Error("Config must be a non-null object");
		}

		for (const [name, renderer] of Object.entries(config)) {
			if (typeof name !== "string" || !name.trim()) {
				throw new Error(`Icon name must be a non-empty string, got: ${name}`);
			}
			if (typeof renderer !== "function") {
				throw new Error(`Icon renderer must be a function for "${name}", got: ${typeof renderer}`);
			}

			Icon.#icons.set(name.trim(), renderer);
		}

		// Update all existing icon instances
		Icon.#updateAllInstances();
	}

	/**
	 * Get list of available icon names
	 *
	 * @returns {string[]} Array of registered icon names
	 *
	 * @example
	 * const availableIcons = Icon.getAvailableIcons();
	 * console.log('Available icons:', availableIcons);
	 */
	static getAvailableIcons() {
		return Array.from(Icon.#icons.keys());
	}

	/**
	 * Check if an icon exists
	 *
	 * @param {string} name - Icon name to check
	 * @returns {boolean} True if the icon is registered, false otherwise
	 *
	 * @example
	 * if (Icon.hasIcon('custom-icon')) {
	 *   console.log('Icon exists!');
	 * }
	 */
	static hasIcon(name) {
		return Icon.#icons.has(name);
	}

	/**
	 * Constructor for the Icon component
	 *
	 * Initializes the component with shadow DOM and adopts the stylesheet.
	 */
	constructor() {
		super();
		this.attachShadow({ mode: "open" });

		// Adopt the stylesheet
		this.shadowRoot.adoptedStyleSheets = [sheet];

		// Track if this is the initial render to avoid double rendering
		this.#isInitialRender = true;
	}

	/**
	 * Called when the element is inserted into the DOM
	 *
	 * @async
	 * @description Initializes the icon display when the element is connected
	 */
	async connectedCallback() {
		await this.#updateIcon();
		// Mark initial render as complete
		this.#isInitialRender = false;
	}

	/**
	 * Called when the element is removed from the DOM
	 *
	 * @description Cleans up references to prevent memory leaks
	 */
	disconnectedCallback() {
		// Clean up the reference when the element is removed
		Icon.#iconInstances.delete(this);
	}

	/**
	 * Called when an observed attribute is changed
	 *
	 * @async
	 * @param {string} name - Attribute name that changed
	 * @param {string} oldValue - Previous attribute value
	 * @param {string} newValue - New attribute value
	 * @description Updates the icon when the 'name' attribute changes
	 */
	async attributeChangedCallback(name, oldValue, newValue) {
		// Skip attribute changes during initial render to avoid double rendering
		if (this.#isInitialRender) {
			return;
		}

		if (name === "name" && oldValue !== newValue) {
			await this.#updateIcon();
		}
	}

	/**
	 * Gets the icon name from attributes
	 *
	 * @private
	 * @throws {Error} If name attribute is missing
	 * @returns {string} The icon name from the 'name' attribute
	 */
	#getIconName() {
		const iconName = this.getAttribute("name");
		if (!iconName) {
			throw new Error('Missing "name" attribute');
		}
		return iconName;
	}

	/**
	 * Updates the shadow root content with the icon
	 *
	 * @private
	 * @param {Element|string} element - Element to append or SVG string to set as innerHTML
	 * @description Updates the shadow DOM with the rendered icon content
	 */
	#updateShadowRoot(element) {
		this.shadowRoot.innerHTML = "";
		if (typeof element === "string") {
			this.shadowRoot.innerHTML = element;
		} else {
			this.shadowRoot.appendChild(element);
		}
	}

	/**
	 * Renders an error message in the console and clears the shadow root
	 *
	 * @private
	 * @param {string} message - Error message to display
	 * @description Logs the error and clears the icon display
	 */
	#renderError(message) {
		console.error(`k-icon: ${message}`);
		this.shadowRoot.innerHTML = "";
	}

	/**
	 * Updates the displayed icon
	 *
	 * This method handles the complete icon update process:
	 * - Retrieves the icon name from attributes
	 * - Finds the corresponding renderer
	 * - Executes the renderer (sync or async)
	 * - Validates the result
	 * - Updates the shadow DOM
	 * - Handles errors
	 *
	 * @private
	 * @async
	 * @returns {Promise<void>}
	 */
	async #updateIcon() {
		if (this.#isUpdating) return;
		this.#isUpdating = true;

		try {
			const iconName = this.#getIconName();
			const renderer = Icon.#icons.get(iconName);

			if (renderer) {
				const result = renderer();
				const svgElement = result instanceof Promise ? await result : result;

				// Validate the result
				if (typeof svgElement === "string" || svgElement instanceof Element) {
					this.#updateShadowRoot(svgElement);
				} else {
					throw new Error(`Invalid icon renderer result for "${iconName}"`);
				}
			} else {
				// Check if any icons are configured
				if (Icon.#icons.size > 0) {
					// Icons are configured but this specific icon doesn't exist
					throw new Error(`Icon "${iconName}" is not available. Available icons: ${Array.from(Icon.#icons.keys()).join(", ")}`);
				} else {
					// No icons configured yet - wait silently for configuration
					// The component will be updated when addIconConfig is called
					this.shadowRoot.innerHTML = ""; // Clear shadow root to avoid stale content
				}
			}
		} catch (error) {
			this.#renderError(error.message);
		} finally {
			this.#isUpdating = false;
		}
	}
}

// Register the component if the component is not already defined
if (!customElements.get("k-icon")) {
	customElements.define("k-icon", Icon);
}

// Export the class for use in other modules
export { Icon };
