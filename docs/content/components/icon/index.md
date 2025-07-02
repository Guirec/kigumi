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
<k-icon icon="chevron-down"></k-icon>
```

## Attributs

- `icon` (requis) : Le nom de l'icône à afficher
- `provider` (optionnel) : Le fournisseur d'icônes (par défaut : "lucide")

## Exemples

### Icônes de base

<div class="demo">
  <k-icon icon="chevron-down"></k-icon>
  <k-icon icon="plus"></k-icon>
</div>

### Icônes avec différents providers

<div class="demo">
  <k-icon icon="chevron-down" provider="lucide"></k-icon>
  <!-- Vous pouvez ajouter d'autres providers ici -->
</div>

## Code

```html
<!-- Icône simple -->
<k-icon icon="chevron-down"></k-icon>

<!-- Icône avec provider spécifique -->
<k-icon icon="custom-icon" provider="custom"></k-icon>
```

## JavaScript

```javascript
// Import du composant
import { Icon } from "@kigumi/components";

// Création programmatique
const icon = document.createElement("k-icon");
icon.setAttribute("icon", "star");
document.body.appendChild(icon);

// Modification de l'icône
icon.setAttribute("icon", "heart");
```

## CSS Custom Properties

Le composant Icon peut être personnalisé via des CSS custom properties :

```css
k-icon {
	--k-icon-color: #ff6b6b;
	--k-icon-size: 24px;
}
```
