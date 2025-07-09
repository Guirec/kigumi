# Icon Component

The `k-icon` component is a generic icon display component with support for custom icons.

## Quick Start

The component works out of the box with built-in icons:

```html
<script type="module">
  import { Icon } from '@kigumi/components';
</script>

<k-icon name="chevron-down"></k-icon>
<k-icon name="plus"></k-icon>
```

## Built-in Icons

The following icons are available without any configuration:

- `chevron-down` - Downward chevron
- `plus` - Plus sign

## Adding Custom Icons

You can easily add your own icons using `addIconConfig()`. The component supports both SVG elements and SVG strings for maximum performance:

```javascript
import { Icon } from '@kigumi/components';

// Add custom icons using SVG strings
Icon.addIconConfig({
    'star': () => {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>`;
    }
});

// Or using SVG elements
Icon.addIconConfig({
    'star': () => {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "24");
        svg.setAttribute("height", "24");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "currentColor");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z");

        svg.appendChild(path);
        return svg;
    }
});
```

## Overriding Built-in Icons

You can override any built-in icon by registering a new one with the same name:

```javascript
import { Icon } from '@kigumi/components';

// Override the plus icon with a custom version
Icon.addIconConfig({
    'plus': () => {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        // Your custom plus icon implementation
        return svg;
    }
});
```

## Usage

```html
<k-icon name="chevron-down"></k-icon>
<k-icon name="plus"></k-icon>
<k-icon name="star"></k-icon>
```

## Icon Configuration Format

Each icon should be a function that returns an SVG element or SVG string (can be sync or async):

```javascript
{
  "icon-name": () => SVGElement,           // SVG element
  "icon-name": () => string,               // SVG string
  "icon-name": async () => SVGElement      // Async function
}
```

## Attributes

- `name` (required): The name of the icon to display

## API

### Static Methods

- `Icon.addIconConfig(config)`: Add icons to existing configuration (preserves existing icons and defaults)
- `Icon.setIconConfig(config)`: Replace complete icon configuration (clears all existing icons including defaults)
- `Icon.getAvailableIcons()`: Get list of available icon names
- `Icon.hasIcon(name)`: Check if an icon exists

### Instance Methods

The component automatically handles icon updates when:
- The element is connected to the DOM
- The `name` attribute changes
- New icons are added via configuration methods

No manual update is required - the component manages itself automatically.

## Complete Replacement

If you want to completely replace all icons (including built-ins), use `setIconConfig()`:

```javascript
import { Icon } from '@kigumi/components';

// Replace all icons with your own set (removes all built-ins)
Icon.setIconConfig({
    'custom-icon-1': () => { /* ... */ },
    'custom-icon-2': () => { /* ... */ }
});
```

## Auto-Initialization

The component automatically initializes with built-in icons when:
- The first instance of `k-icon` is created
- Any static method is called

This ensures that icons work immediately without manual configuration.

## Error Handling

The component provides error messages when:
- An icon name is not found (lists available icons)
- Invalid configuration is provided
- Missing required attributes

Errors are logged to the console and the component gracefully handles failures.
