# kigumi

A web components library to build modern interfaces

## Components

### Icon Component (`k-icon`)

The Icon component allows you to display SVG icons in your application. It supports both built-in icons from providers and custom icons.

#### Basic Usage

```html
<!-- Using default provider (lucide) -->
<k-icon icon="chevron-down"></k-icon>

<!-- Using a specific provider -->
<k-icon icon="custom-icon" provider="custom"></k-icon>
```

#### Attributes

- `icon` (required): The name of the icon to display.
- `provider` (optional): The name of the icon provider. Defaults to "lucide".

#### Adding custom icons

You can add custom icons by configuring the icon providers in your application:

```js
// Configure icons
const config = {
	icons: {
		custom: {
			"my-icon": async () => {
				// Return an SVG element
				const svg = document.createElementNS(
					"http://www.w3.org/2000/svg",
					"svg"
				);
				// Configure your SVG...
				return svg;
			},
		},
	},
};

// Use your custom icon
<k-icon icon="my-icon" provider="custom"></k-icon>;
```

#### Using Lucide Icons

The component comes with built-in support for [Lucide](https://lucide.dev/) icons. To use them, simply specify the icon name:

```html
<k-icon icon="chevron-down"></k-icon>
<k-icon icon="user"></k-icon>
<k-icon icon="settings"></k-icon>
```

To add more Lucide icons, update the configuration in your `config.js`:

```js
import { createElement, Icon1, Icon2 } from "lucide";

const config = {
	icons: {
		lucide: {
			"icon-1": async () => createElement(Icon1),
			"icon-2": async () => createElement(Icon2),
		},
	},
};
```
