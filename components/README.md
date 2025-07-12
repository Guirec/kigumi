# @kigumi/components

A modern web components library designed for maximum flexibility.
Components are native Web Components that use Shadow DOM, styles are isolated from the rest of the page, preventing CSS conflicts and ensuring consistent appearance across different contexts.

Built on web standards with no framework dependencies, this library offers extensive CSS custom properties for deep customization while maintaining the reliability and consistency of a design system.

## 🚀 Installation

```bash
npm install @kigumi/components
# or
pnpm add @kigumi/components
# or
yarn add @kigumi/components
```

## 📦 Usage

Import components in your project with a modern bundler (Vite, Webpack, etc.):

```javascript
// Import all components
import '@kigumi/components';

// Or individual import for tree-shaking
import { Icon } from '@kigumi/components';
import { Disclosure } from '@kigumi/components';
```

### HTML usage (without bundler)

For simple HTML pages without a bundler, you can use the components directly:

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import { Icon } from '@kigumi/components';
  </script>
</head>
<body>
  <k-icon icon="plus"></k-icon>
</body>
</html>
```

## 🧩 Available components

### Icon (`<k-icon>`)

Displays SVG icons with support for different providers.

📖 **[View full documentation →](./src/components/icon/README.md)**
