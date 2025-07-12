---
layout: page.njk
title: Disclosure
tags: components
components:
  - disclosure
---

# Disclosure Component

Le composant Disclosure permet de créer des sections pliables/dépliables dans votre application. Il supporte différents modes d'expansion et peut être personnalisé via des attributs.

## Usage

```html
<k-disclosure>
	<div>Résumé 1</div>
	<div>Contenu 1</div>
	<div>Résumé 2</div>
	<div>Contenu 2</div>
</k-disclosure>
```

## Attributs

- `mode` (optionnel) : Mode d'expansion ("mixed" ou "exclusive", défaut: "mixed")
- `icon-name` (optionnel) : Icône à utiliser (défaut: "plus")
- `icon-position` (optionnel) : Position de l'icône ("start" ou "end", défaut: "end")
- `expanded` (optionnel) : Contrôle quelles sections sont initialement ouvertes
  - Non défini ou vide : Ouvre toutes les sections en mode mixte, ou la première section en mode exclusif
  - Nombre (ex: "2") : Ouvre uniquement la section spécifiée (index basé sur 1)

## Contrôle de l'expansion

### Comportement par défaut

```html
<!-- Ouvre toutes les sections en mode mixte -->
<k-disclosure>
	<div>Section 1</div>
	<div>Contenu 1</div>
	<div>Section 2</div>
	<div>Contenu 2</div>
</k-disclosure>

<!-- Ouvre uniquement la première section en mode exclusif -->
<k-disclosure mode="exclusive">
	<div>Section 1</div>
	<div>Contenu 1</div>
	<div>Section 2</div>
	<div>Contenu 2</div>
</k-disclosure>
```

### Expansion d'une section spécifique

```html
<!-- Ouvre uniquement la section 2 -->
<k-disclosure expanded="2">
	<div>Section 1</div>
	<div>Contenu 1</div>
	<div>Section 2</div>
	<div>Contenu 2</div>
	<div>Section 3</div>
	<div>Contenu 3</div>
</k-disclosure>
```

**Note :** Si le numéro de section spécifié n'existe pas, un avertissement sera affiché dans la console et aucune section ne sera ouverte.

## Exemples

### Mode mixte (défaut)

<div class="demo">
  <k-disclosure>
    <div class="summary">Cliquez pour ouvrir la première section</div>
    <div class="content">
      <p>Contenu de la première section. Vous pouvez mettre n'importe quel contenu HTML ici.</p>
      <p>Le composant Disclosure gère automatiquement l'ouverture et la fermeture.</p>
    </div>
    <div class="summary">Cliquez pour ouvrir la deuxième section</div>
    <div class="content">
      <p>Contenu de la deuxième section.</p>
      <ul>
        <li>Liste à puces</li>
        <li>Autres éléments</li>
        <li>Et plus encore...</li>
      </ul>
    </div>
  </k-disclosure>
</div>

### Mode exclusif

<div class="demo">
  <k-disclosure mode="exclusive">
    <div class="summary">Section 1 (exclusive)</div>
    <div class="content">
      <p>Dans le mode exclusif, une seule section peut être ouverte à la fois.</p>
    </div>
    <div class="summary">Section 2 (exclusive)</div>
    <div class="content">
      <p>Quand vous ouvrez cette section, l'autre se fermera automatiquement.</p>
    </div>
    <div class="summary">Section 3 (exclusive)</div>
    <div class="content">
      <p>Dernière section du groupe exclusif.</p>
    </div>
  </k-disclosure>
</div>

### Section spécifique ouverte

<div class="demo">
  <k-disclosure expanded="2">
    <div class="summary">Section 1 (fermée par défaut)</div>
    <div class="content">
      <p>Cette section est fermée par défaut car expanded="2" ouvre la section 2.</p>
    </div>
    <div class="summary">Section 2 (ouverte par défaut)</div>
    <div class="content">
      <p>Cette section est ouverte par défaut grâce à l'attribut expanded="2".</p>
    </div>
    <div class="summary">Section 3 (fermée par défaut)</div>
    <div class="content">
      <p>Cette section est également fermée par défaut.</p>
    </div>
  </k-disclosure>
</div>

### Icône positionnée à gauche

<div class="demo">
  <k-disclosure icon-position="start">
    <div class="summary">Icône à gauche</div>
    <div class="content">
      <p>Cette section utilise une icône chevron-down positionnée à gauche.</p>
    </div>
  </k-disclosure>
</div>

## Code

```html
<!-- Mode mixte (défaut) -->
<k-disclosure>
	<div>Résumé 1</div>
	<div>Contenu 1</div>
	<div>Résumé 2</div>
	<div>Contenu 2</div>
</k-disclosure>

<!-- Mode exclusif -->
<k-disclosure mode="exclusive">
	<div>Section 1</div>
	<div>Contenu 1</div>
	<div>Section 2</div>
	<div>Contenu 2</div>
</k-disclosure>

<!-- Section spécifique ouverte -->
<k-disclosure expanded="2">
	<div>Section 1</div>
	<div>Contenu 1</div>
	<div>Section 2</div>
	<div>Contenu 2</div>
</k-disclosure>
```

## JavaScript

```javascript
// Import du composant
import { Disclosure } from "@kigumi/components";

// Création programmatique
const disclosure = document.createElement("k-disclosure");
disclosure.innerHTML = `
  <div>Résumé</div>
  <div>Contenu</div>
`;
document.body.appendChild(disclosure);

// Changer le mode
disclosure.setAttribute("mode", "exclusive");

// Ouvrir une section spécifique
disclosure.setAttribute("expanded", "2");

// Ouvrir toutes les sections (mode mixte) ou première section (mode exclusif)
disclosure.removeAttribute("expanded");
// ou
disclosure.setAttribute("expanded", "");
```

## CSS Custom Properties

Le composant Disclosure peut être personnalisé via des CSS custom properties :

```css
k-disclosure {
	--k-disclosure-border-color: #e1e5e9;
	--k-disclosure-background: #f8f9fa;
}

.summary {
	background: #f8f9fa;
	padding: 0.5rem;
	border-radius: 4px;
	cursor: pointer;
}

.content {
	padding: 1rem;
	background: #fff;
	border: 1px solid #e1e5e9;
	border-top: none;
	border-radius: 0 0 4px 4px;
}
```
