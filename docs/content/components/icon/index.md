---
layout: page.njk
title: Icon
tags: components
components:
  - icon
---

# Icon Component

Le composant Icon permet d'afficher des icônes SVG dans votre application. Il supporte différents providers d'icônes et peut être personnalisé via des attributs.

## Usage

```html
<k-icon name="chevron-down"></k-icon>
```

## Attributs

- `name` (requis) : Le nom de l'icône à afficher
- `provider` (optionnel) : Le fournisseur d'icônes (par défaut : "lucide")

## Exemples

<div class="demo">
  <k-icon name="chevron-down"></k-icon>
  <k-icon name="plus"></k-icon>
</div>

## JavaScript

```javascript
// Import du composant
import { Icon } from "@kigumi/components";

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
