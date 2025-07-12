/**
 * @typedef {Object} DisclosureAttributes
 * @property {'mixed'|'exclusive'} [mode="mixed"] - Expansion mode for sections. In exclusive mode, only one section can be open at a time
 */

// Import icon component
import { Icon } from "../icon/icon.js";

/**
 * Import and initialization of styles
 */
import styles from "./disclosure.css?inline";

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);

/**
 * Icon configuration for disclosure component
 * These icons are specifically designed for the disclosure component
 */
const DISCLOSURE_ICON_CONFIG = {
	plus: () => {
		return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<style>
				path:first-of-type {
					transform-origin: center;
				}
				:host(.open) path:first-of-type {
					transform: scale(0) rotate(90deg);
				}
				@media (prefers-reduced-motion: no-preference) {
					path:first-of-type {
						transition: transform 0.3s ease 0.05s;
					}
				}
			</style>
			<path d="M5 12h14"/>
			<path d="M12 5v14"/>
		</svg>`;
	},
};

/**
 * Web component to create collapsible/expandable sections
 * @extends HTMLElement
 * @customElement k-disclosure
 * @example
 * <k-disclosure>
 *   <div>Summary 1</div>
 *   <div>Content 1</div>
 *   <div>Summary 2</div>
 *   <div>Content 2</div>
 * </k-disclosure>
 */
class Disclosure extends HTMLElement {
	/**
	 * List of attributes to observe for changes
	 * @returns {string[]}
	 */
	static get observedAttributes() {
		return ["mode", "icon-name", "icon-position"];
	}

	/**
	 * @private
	 * @type {ShadowRoot}
	 */
	#shadowRoot;

	/**
	 * @private
	 * @type {'mixed'|'exclusive'}
	 */
	#mode;

	/**
	 * @private
	 * @type {string}
	 */
	#iconName;

	/**
	 * @private
	 * @type {'start'|'end'}
	 */
	#iconPosition;

	/**
	 * @private
	 * @type {string}
	 */
	#groupId;

	/**
	 * @private
	 * @type {boolean}
	 */
	#isInitialRender;

	/**
	 * @private
	 * @type {boolean}
	 */
	static #isInitialized = false;

	/**
	 * Initialize the disclosure component with its required icons
	 * @private
	 */
	static #initialize() {
		if (!Disclosure.#isInitialized) {
			Icon.addIconConfig(DISCLOSURE_ICON_CONFIG);
			Disclosure.#isInitialized = true;
		}
	}

	/**
	 * @constructor
	 * @description Initializes the Disclosure component
	 */
	constructor() {
		super();

		/** @type {ShadowRoot} */
		this.#shadowRoot = this.attachShadow({ mode: "open" });

		// Adopt the stylesheet
		this.#shadowRoot.adoptedStyleSheets = [sheet];

		// Initialize the component with its icons
		Disclosure.#initialize();

		// Add attribute for opening mode
		this.#mode = this.getAttribute("mode") || "mixed";
		this.#iconName = this.getAttribute("icon-name") || "plus";
		this.#iconPosition = this.getAttribute("icon-position") || "end";
		// Generate unique identifier for group in exclusive mode
		this.#groupId = `${Math.random().toString(36).substring(2, 11)}`;

		// Track if this is the initial render to avoid double rendering
		this.#isInitialRender = true;
	}

	/**
	 * Creates the SVG icon for the summary
	 * @private
	 * @returns {HTMLSpanElement} The span element containing the SVG icon
	 */
	#createIcon() {
		const icon = document.createElement("k-icon");
		icon.setAttribute("name", this.#iconName);
		icon.setAttribute("aria-hidden", "true");
		return icon;
	}

	/**
	 * Creates a details/summary section from the given elements
	 * @private
	 * @param {Object} section - The section elements
	 * @param {Element} section.summary - The summary element
	 * @param {Element} section.content - The content element
	 * @returns {HTMLDetailsElement} The created details element
	 */
	#createSection({ summary, content }) {
		const details = document.createElement("details");
		const summaryElement = document.createElement("summary");
		const icon = this.#createIcon();

		// Add icon and content to summary
		summaryElement.appendChild(summary);
		summaryElement.appendChild(icon);

		// Add name attribute in exclusive mode
		if (this.#mode === "exclusive") {
			details.setAttribute("name", this.#groupId);
		}

		// Add event listeners to update icon class
		details.addEventListener("toggle", () => {
			if (details.hasAttribute("open")) {
				icon.classList.add("open");
			} else {
				icon.classList.remove("open");
			}
		});

		details.appendChild(summaryElement);
		details.appendChild(content);

		return details;
	}

	/**
	 * Converts component children into summary/content pairs
	 * @private
	 * @returns {Array<{summary: Element, content: Element}>}
	 */
	#createSectionPairs() {
		return Array.from(this.children).reduce((acc, child, index) => {
			if (index % 2 === 0) {
				acc.push({
					summary: child,
					content: this.children[index + 1],
				});
			}
			return acc;
		}, []);
	}

	/**
	 * Renders the component
	 * @private
	 * @throws {Error} When the number of child elements is not even
	 * @returns {void}
	 */
	#render() {
		// Check that the number of elements is even and not null
		if (this.children.length % 2 !== 0) {
			throw new Error("The k-disclosure component must contain a non-zero even number of elements (each summary must have its content)");
		}

		// Create and add each section
		const sections = this.#createSectionPairs();
		const details = sections.map((section) => this.#createSection(section));

		for (const detail of details) {
			this.#shadowRoot.appendChild(detail);
		}
	}

	/**
	 * Called when the element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.#render();
		// Mark initial render as complete
		this.#isInitialRender = false;
	}

	/**
	 * Called when an observed attribute is changed
	 * @param {string} name - Attribute name
	 * @param {string} oldValue - Old attribute value
	 * @param {string} newValue - New attribute value
	 */
	attributeChangedCallback(name, oldValue, newValue) {
		// Skip attribute changes during initial render to avoid double rendering
		if (this.#isInitialRender) {
			return;
		}

		if (name === "mode" && oldValue !== newValue) {
			this.#mode = newValue || "mixed";
			this.#render();
		} else if (name === "icon-name" && oldValue !== newValue) {
			this.#iconName = newValue || "plus";
			this.#render();
		} else if (name === "icon-position" && oldValue !== newValue) {
			this.#iconPosition = newValue || "end";
			this.#render();
		}
	}
}

// Register the component if the component is not already defined
if (!customElements.get("k-disclosure")) {
	customElements.define("k-disclosure", Disclosure);
}

// Export the class for use in other modules
export { Disclosure };
