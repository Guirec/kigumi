---
layout: page.njk
title: Icon
tags: components
components:
  - icon
---

# Icon Component

Le composant Icon permet d'afficher des icônes SVG dans votre application. Il nécessite une configuration explicite des icônes et peut être personnalisé via des attributs.

## Usage

```html
<k-icon name="chevron-down"></k-icon>
```

## Attributs

- `name` (requis) : Le nom de l'icône à afficher

## Exemples

<div class="demo">
  <k-icon name="chevron-down"></k-icon>
  <k-icon name="plus"></k-icon>
</div>

## JavaScript

```javascript
// Import du composant
import { Icon } from "@kigumi/components";

// Configuration des icônes (requis avant utilisation)
Icon.addIconConfig({
  'star': () => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>',
  'heart': () => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'
});

// Création programmatique
const icon = document.createElement("k-icon");
icon.setAttribute("name", "star");
document.body.appendChild(icon);

// Modification de l'icône
icon.setAttribute("name", "heart");
```

## CSS Custom Properties

Le composant Icon peut être personnalisé via des CSS custom properties :

```css
k-icon {
	--k-icon-color: #ff6b6b;
	--k-icon-size: 24px;
}
```
