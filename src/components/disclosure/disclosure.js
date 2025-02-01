// Import of types (DisclosureAttributes)
import "./../../config/types.js";

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
 * <k-disclosure expand="mixed">
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
		return ["expand"];
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
	#expand;

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
		this.#expand = this.getAttribute("expand") || "mixed";
		// Generate unique identifier for group in exclusive mode
		this.#groupId = `${Math.random().toString(36).substring(2, 11)}`;
	}

	/**
	 * Creates the SVG icon for the summary
	 * @private
	 * @returns {HTMLSpanElement} The span element containing the SVG icon
	 */
	#createIcon() {
		const icon = document.createElement("span");
		icon.setAttribute("aria-hidden", "true");

		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("viewBox", "0 0 20 20");
		svg.setAttribute("width", "1.25rem");
		svg.setAttribute("height", "1.25rem");

		const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
		g.setAttribute("fill", "none");
		g.setAttribute("stroke", "currentColor");
		g.setAttribute("stroke-linecap", "round");
		g.setAttribute("stroke-linejoin", "round");

		const line1 = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"line"
		);
		line1.setAttribute("x1", "10");
		line1.setAttribute("y1", "14");
		line1.setAttribute("x2", "3");
		line1.setAttribute("y2", "7");

		const line2 = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"line"
		);
		line2.setAttribute("x1", "17");
		line2.setAttribute("y1", "7");
		line2.setAttribute("x2", "10");
		line2.setAttribute("y2", "14");

		g.appendChild(line1);
		g.appendChild(line2);
		svg.appendChild(g);
		icon.appendChild(svg);

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
		if (this.#expand === "exclusive") {
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
			throw new Error(
				"The k-disclosure component must contain a non-zero even number of elements (each summary must have its content)"
			);
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
		if (name === "expand" && oldValue !== newValue) {
			this.#expand = newValue || "mixed";
			this.#render();
		}
	}
}

customElements.define("k-disclosure", Disclosure);
