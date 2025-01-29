class Icon extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	static get observedAttributes() {
		return ["icon"];
	}

	async connectedCallback() {
		await this.updateIcon();
	}

	async attributeChangedCallback(name, oldValue, newValue) {
		if (name === "icon" && oldValue !== newValue) {
			await this.updateIcon();
		}
	}

	async updateIcon() {
		const iconName = this.getAttribute("icon");

		try {
			if (!iconName) {
				throw new Error('Attribut "icon" manquant');
			}

			// Conversion du nom de l'icône de kebab-case vers PascalCase
			const formattedIconName = iconName
				.split("-")
				.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
				.join("");

			// Import dynamique direct de l'icône
			const { [formattedIconName]: iconFunction, createElement } = await import(
				"lucide"
			);

			if (!iconFunction) {
				throw new Error(
					`L'icône "${iconName}" n'existe pas dans la librairie Lucide`
				);
			}

			const svgElement = createElement(iconFunction);
			this.shadowRoot.innerHTML = "";
			this.shadowRoot.appendChild(svgElement);
		} catch (error) {
			this.shadowRoot.innerHTML = `<div style="color: red;">Erreur: ${error.message}</div>`;
		}
	}
}

customElements.define("k-icon", Icon);
