# @kigumi/tokens

Design tokens for the Kigumi design system.

## Installation

Install the package using your preferred package manager:

```sh
npm install @kigumi/tokens
# or
pnpm add @kigumi/tokens
# or
yarn add @kigumi/tokens
```

## How it works

This package provides design tokens in two formats:

- **JSON** (`tokens.json`): the source of truth, easy to use in JavaScript, or any language that supports JSON (such as PHP, Python, etc.).
- **CSS** (`tokens.css`): generated from the JSON, exposes all tokens as CSS custom properties for direct use in stylesheets.

This flexibility allows you to use the same design tokens in a wide variety of projects and technologies, ensuring consistency across your entire ecosystem.

## Use Kigumi tokens (JSON & CSS)

You can use the tokens provided by this package directly:

### In JavaScript/TypeScript

```js
import tokens from "@kigumi/tokens";

console.log(tokens["color-primary"]);
```

### In CSS

Just import the generated CSS file to get all custom properties:

```css
@import "@kigumi/tokens/tokens.css";
```

## Generate your own CSS from a custom JSON

If you want to use your own design tokens (with your own JSON structure), you can use the script provided in this package to generate a CSS file with custom properties.

### 1. Create your custom JSON file

For example, `my-tokens.json`:

```json
{
	"color-primary": "oklch(0.63 0.25 30)",
	"spacing-lg": "24px"
}
```

### 2. Generate the CSS file

Use the script with `npx` and specify your input and (optionally) output files:

```sh
npx kigumi-json-to-css my-tokens.json my-tokens.css
```

- The first argument is the path to your JSON file.
- The second argument (optional) is the path to the CSS file to generate.
- If you omit the second argument, the script will generate a CSS file with the same name as your JSON file (but with a `.css` extension) in the same folder.

### 3. Import your generated CSS

```css
@import "./my-tokens.css";
```
