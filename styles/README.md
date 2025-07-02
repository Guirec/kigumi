# @kigumi/styles

CSS base styles and utilities for the Kigumi design system.

## Installation

Install the package using your preferred package manager:

```sh
npm install @kigumi/styles
# or
pnpm add @kigumi/styles
# or
yarn add @kigumi/styles
```

## Usage

### Import the complete stylesheet

Import the main stylesheet in your project:

```css
@import "@kigumi/styles/styles.css";
```

### Import source files (before build processing)

For more control over the build process, you can import specific source files:

```css
@import "@kigumi/styles/elements/reset.css";
@import "@kigumi/styles/utilities/flow.css";
```

This approach allows you to:
- Choose which parts of Kigumi to include
- Apply your own build processing (minification, bundling, etc.)
- Customize the layer organization
- Optimize bundle size by including only what you need

## Layers structure

This package uses the CSS Cascade Layers feature (`@layer`) to organize styles in a predictable and extensible way. All Kigumi styles are scoped under the `kigumi` namespace to avoid conflicts with existing stylesheets:

- **kigumi.theme**: custom properties will live here (design tokens, user preferences, etc.)
- **kigumi.elements**: base styles for HTML elements
- **kigumi.components**: styles for UI components, including Web Components through their custom properties
- **kigumi.utilities**: utility classes

### Adding your own styles

You can add your own styles in a specific layer to control their priority. To ensure your styles work well with Kigumi, you can either:

**Option 1: Use the same layer structure**
```css
@layer kigumi.theme {
	:root {
		--my-custom-color: #ff0000;
	}
}

@layer kigumi.components {
	k-button {
		/* Customize with custom properties */
	}
}
```

**Option 2: Create your own layer namespace**
```css
@layer my-app.something;

@layer my-app.something {
	.cool-class {
		/* Some styles */
	}
}
```

The layer order is defined as: `kigumi.theme, kigumi.elements, kigumi.components, kigumi.utilities`, so later layers have higher specificity.
