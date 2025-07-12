/**
 * @typedef {Object} DisclosureAttributes
 * @property {'mixed'|'exclusive'} [mode="mixed"] - Expansion mode for sections. In exclusive mode, only one section can be open at a time
 * @property {string|null} [expanded] - Which sections to expand. If null, empty string, or not set, opens all sections (or first in exclusive mode). If a number string, opens the corresponding section (1-based index)
 */

/**
 * @typedef {Object} DisclosureEventDetail
 * @property {HTMLDetailsElement} details - The details element that triggered the event
 * @property {Element} summary - The summary element
 * @property {Element} content - The content element
 * @property {string} groupId - The group identifier (for exclusive mode)
 * @property {boolean} open - Whether the section is now open
 */

// Import icon component
import { Icon } from "../../index.js";

/**
 * Import and initialization of styles
 */
import styles from "./disclosure.css?inline";

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);

/**
 * Icon configuration for disclosure component
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
		return ["mode", "icon-name", "expanded"];
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
	 * @type {string|null}
	 */
	#expanded;

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
		this.#expanded = this.getAttribute("expanded");
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
	 * Determines which sections should be open based on the expanded attribute
	 * @private
	 * @param {number} totalSections - Total number of sections
	 * @returns {boolean[]} Array of boolean values indicating which sections should be open
	 */
	#getExpandedSections(totalSections) {
		const expanded = this.#expanded;

		// If no expanded attribute is set or it's empty, open all sections (or first in exclusive mode)
		if (!expanded || expanded === "") {
			if (this.#mode === "exclusive") {
				// In exclusive mode, only open the first section
				return Array(totalSections)
					.fill(false)
					.map((_, index) => index === 0);
			} else {
				// In mixed mode, open all sections
				return Array(totalSections).fill(true);
			}
		}

		// If expanded is a number, open only that specific section
		const sectionNumber = parseInt(expanded, 10);
		if (!Number.isNaN(sectionNumber)) {
			// Check if the section number is valid (1-based index)
			if (sectionNumber < 1 || sectionNumber > totalSections) {
				console.warn(`[k-disclosure] Section number ${sectionNumber} is out of range. Available sections: 1-${totalSections}`);
				return Array(totalSections).fill(false);
			}

			// Return array with only the specified section open (convert to 0-based index)
			return Array(totalSections)
				.fill(false)
				.map((_, index) => index === sectionNumber - 1);
		}

		// If expanded is not a valid number, default to no sections open
		console.warn(`[k-disclosure] Invalid expanded value: "${expanded}". Expected a number or empty string.`);
		return Array(totalSections).fill(false);
	}

	/**
	 * Creates a details/summary section from the given elements
	 * @private
	 * @param {Object} section - The section elements
	 * @param {Element} section.summary - The summary element
	 * @param {Element} section.content - The content element
	 * @param {boolean} section.open - Whether the section should be initially expanded (determined by the expanded attribute)
	 * @returns {HTMLDetailsElement} The created details element
	 */
	#createSection({ summary, content, open }) {
		const details = document.createElement("details");
		const summaryElement = document.createElement("summary");
		const icon = this.#createIcon();
		if (open) details.setAttribute("open", "");

		// Add icon and content to summary
		summaryElement.appendChild(summary);
		summaryElement.appendChild(icon);

		// Add name attribute in exclusive mode
		if (this.#mode === "exclusive") {
			details.setAttribute("name", this.#groupId);
		}

		// Add event listeners to update icon class and dispatch custom events
		details.addEventListener("toggle", () => {
			const open = details.hasAttribute("open");

			// Update icon class
			if (open) {
				icon.classList.add("open");
			} else {
				icon.classList.remove("open");
			}

			// Create event detail object
			const eventDetail = {
				details,
				summary,
				content,
				groupId: this.#groupId,
				open,
			};

			// Dispatch toggle event
			this.dispatchEvent(
				new CustomEvent("disclosure-toggle", {
					detail: eventDetail,
					bubbles: true,
					composed: true,
				}),
			);
		});

		summaryElement.setAttribute("part", "summary");
		icon.setAttribute("part", "icon");
		content.setAttribute?.("part", "content");
		details.setAttribute("part", "details");
		details.appendChild(summaryElement);
		details.appendChild(content);

		return details;
	}

	/**
	 * Converts component children into summary/content pairs
	 * @private
	 * @returns {Array<{summary: Element, content: Element, open: boolean}>}
	 */
	#createSectionPairs() {
		const pairs = Array.from(this.children).reduce((acc, child, index) => {
			if (index % 2 === 0) {
				const summary = child;
				const content = this.children[index + 1];
				acc.push({ summary, content });
			}
			return acc;
		}, []);

		// Determine which sections should be open based on the expanded attribute
		const expandedSections = this.#getExpandedSections(pairs.length);

		// Add the open property to each pair
		return pairs.map((pair, index) => ({
			...pair,
			open: expandedSections[index],
		}));
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
		if (this.#isInitialRender || oldValue === newValue) return;

		switch (name) {
			case "mode":
				this.#mode = newValue || "mixed";
				this.#applyModeToDetails();
				break;
			case "icon-name":
				this.#iconName = newValue || "plus";
				this.#updateIcons();
				break;
			case "expanded":
				this.#expanded = newValue;
				this.#updateExpandedSections();
				break;
		}
	}

	#applyModeToDetails() {
		const detailsList = this.#shadowRoot.querySelectorAll("details");
		for (const d of detailsList) {
			if (this.#mode === "exclusive") d.setAttribute("name", this.#groupId);
			else d.removeAttribute("name");
		}
	}

	#updateIcons() {
		const icons = this.#shadowRoot.querySelectorAll("summary > k-icon");
		for (const icon of icons) {
			icon.setAttribute("name", this.#iconName);
		}
	}

	/**
	 * Updates the expanded state of sections when the expanded attribute changes
	 * @private
	 */
	#updateExpandedSections() {
		const detailsList = this.#shadowRoot.querySelectorAll("details");
		const totalSections = detailsList.length;
		const expandedSections = this.#getExpandedSections(totalSections);

		detailsList.forEach((details, index) => {
			if (expandedSections[index]) {
				details.setAttribute("open", "");
			} else {
				details.removeAttribute("open");
			}
		});
	}
}

// Register the component if the component is not already defined
if (!customElements.get("k-disclosure")) {
	customElements.define("k-disclosure", Disclosure);
}

// Export the class for use in other modules
export { Disclosure };
