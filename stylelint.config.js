/** @type {import('stylelint').Config} */
export default {
	rules: {
		// Selectors
		"selector-max-id": 0, // IDs are not allowed
		"selector-max-class": 3, // limit the number of classes
		"selector-max-type": 3, // limit the number of element selectors
		"no-descending-specificity": null, // disable descending specificity rule

		// Prefixes
		"property-no-vendor-prefix": [
			true, // vendor prefixes are not allowed
			{
				ignoreProperties: [
					"mask",
					"mask-size",
					"mask-position",
					"line-clamp",
					"backdrop-filter",
					"user-select",
					"initial-letter",
					"box-decoration-break",
					"text-fill-color",
					"text-stroke",
					"tap-highlight-color",
					"box-orient",
					"text-size-adjust",
				],
			},
		],
	},

	// Shorthands
	"declaration-block-no-redundant-longhand-properties": [true, { ignoreShorthands: ["grid-template"] }],

	// Units
	"declaration-property-unit-disallowed-list": {
		"/^font|^font-size/": ["px"], // no pixels
	},

	// Imports
	"import-notation": "string", // no "url()" for imports

	// Nesting
	"max-nesting-depth": 3, // limit nesting depth

	// Media Queries
	"media-feature-range-notation": "context", // enforce modern notation
	"media-feature-name-unit-allowed-list": { width: "rem" }, // only allow rem for width

	// Fonts
	"font-family-no-duplicate-names": null,
	"font-weight-notation": "numeric", // enforce numeric notation for font weights

	// Colors
	"color-hex-length": "long", // enforce long hex notation
	"color-named": "never", // named colors are not allowed
	"color-function-notation": "modern", // enforce modern color function notation
	"lightness-notation": "percentage", // enforce percentage notation for lightness
	"alpha-value-notation": "percentage", // enforce percentage notation for alpha
	"hue-degree-notation": "number",
};
