/**
 * @typedef {Object} DisclosureAttributes
 * @property {'mixed'|'exclusive'} [mode="mixed"] - Expansion mode for sections. In exclusive mode, only one section can be open at a time
 */

// Import icon component
import "../icon/icon.js";

/**
 * Import and initialization of styles
 */
import styles from "./disclosure.css?inline";

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);

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
		return ["mode", "icon", "icon-position"];
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
	#icon;

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
	 * @constructor
	 * @description Initializes the Disclosure component
	 */
	constructor() {
		super();

		/** @type {ShadowRoot} */
		this.#shadowRoot = this.attachShadow({ mode: "open" });

		// Adopt the stylesheet
		this.#shadowRoot.adoptedStyleSheets = [sheet];

		// Add attribute for opening mode
		this.#mode = this.getAttribute("mode") || "mixed";
		this.#icon = this.getAttribute("icon") || "plus";
		this.#iconPosition = this.getAttribute("icon-position") || "end";
		// Generate unique identifier for group in exclusive mode
		this.#groupId = `${Math.random().toString(36).substring(2, 11)}`;
	}

	/**
	 * Creates the SVG icon for the summary
	 * @private
	 * @returns {HTMLSpanElement} The span element containing the SVG icon
	 */
	#createIcon() {
		const icon = document.createElement("k-icon");
		icon.setAttribute("icon", this.#icon);
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

		// Add icon and content to summary
		summaryElement.appendChild(summary);
		summaryElement.appendChild(this.#createIcon());

		// Add name attribute in exclusive mode
		if (this.#mode === "exclusive") {
			details.setAttribute("name", this.#groupId);
		}

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
	}

	/**
	 * Called when an observed attribute is changed
	 * @param {string} name - Attribute name
	 * @param {string} oldValue - Old attribute value
	 * @param {string} newValue - New attribute value
	 */
	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "mode" && oldValue !== newValue) {
			this.#mode = newValue || "mixed";
			this.#render();
		} else if (name === "icon" && oldValue !== newValue) {
			this.#icon = newValue || "chevron-down";
			this.#render();
		} else if (name === "icon-position" && oldValue !== newValue) {
			this.#iconPosition = newValue || "end";
			this.#render();
		}
	}
}

// Check if the component is not already defined
if (!customElements.get("k-disclosure")) {
	customElements.define("k-disclosure", Disclosure);
}

// Export the Disclosure class for named imports
export { Disclosure };
