# Architecture de @kigumi/components

## Vue d'ensemble

Cette bibliothèque de composants est conçue pour offrir une flexibilité maximale tout en maintenant une excellente performance et une facilité d'utilisation.

## 🏗️ Architecture technique

### 1. Web Components natifs

Tous les composants sont des Web Components natifs, ce qui offre plusieurs avantages :

- **Encapsulation** : Chaque composant a son propre Shadow DOM
- **Réutilisabilité** : Fonctionnent dans n'importe quel framework ou projet vanilla
- **Standards web** : Basés sur les standards web, pas de dépendance à un framework
- **Performance** : Pas de runtime supplémentaire nécessaire

### 2. Structure modulaire

```
src/
├── components/
│   ├── icon/
│   │   ├── icon.js      # Logique du composant
│   │   └── icon.css     # Styles encapsulés
│   └── disclosure/
│       ├── disclosure.js
│       └── disclosure.css
├── config/
│   └── config.js        # Configuration partagée
└── index.js             # Point d'entrée principal
```

### 3. Configuration Vite

La configuration Vite est optimisée pour :

- **Tree-shaking** : `preserveModules: true` permet d'importer seulement les composants nécessaires
- **Modules ES** : Support complet des ES modules pour la compatibilité moderne
- **Source maps** : Facilitent le debugging
- **CSS encapsulé** : Chaque composant a ses styles isolés

## 📦 Stratégies de bundling

### 1. Format ES (ESM)

**Utilisation** : `import { Icon, Disclosure } from '@kigumi/components'`

**Avantages** :
- Tree-shaking automatique
- Compatible avec tous les bundlers modernes
- Syntaxe moderne et claire

**Structure de sortie** :
```
dist/
├── index.js                    # Point d'entrée principal
├── components/
│   ├── icon/
│   │   ├── icon.js            # Composant Icon individuel
│   │   └── icon.css.js        # Styles du composant
│   └── disclosure/
│       ├── disclosure.js      # Composant Disclosure individuel
│       └── disclosure.css.js  # Styles du composant
└── config/
    └── config.js              # Configuration partagée
```

### 2. Format CJS (CommonJS)

**Utilisation** : `const { Icon, Disclosure } = require('@kigumi/components')`

**Avantages** :
- Compatible avec Node.js et les bundlers plus anciens
- Même structure que le format ES

### 3. Imports individuels

**Utilisation** :
```html
<script type="module" src="/node_modules/@kigumi/components/dist/components/icon/icon.js"></script>
```

**Avantages** :
- Charge seulement le composant nécessaire
- Pas besoin de bundler
- Compatible avec les serveurs de développement modernes

## 🔧 Configuration du package.json

### Exports

```json
{
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.js"
    },
    "./icon": {
      "import": "./dist/components/icon/icon.js",
      "require": "./dist/components/icon/icon.js"
    },
    "./disclosure": {
      "import": "./dist/components/disclosure/disclosure.js",
      "require": "./dist/components/disclosure/disclosure.js"
    }
  }
}
```

Cette configuration permet :
- Import global : `import { Icon } from '@kigumi/components'`
- Import individuel : `import '@kigumi/components/icon'`

## 🎯 Avantages de cette approche

### 1. Performance

- **Tree-shaking** : Seuls les composants utilisés sont inclus dans le bundle final
- **Chargement à la demande** : Possibilité de charger les composants individuellement
- **Pas de runtime** : Les Web Components sont natifs, pas de surcharge

### 2. Flexibilité

- **Multiples cas d'usage** : Projets modernes, HTML simple, frameworks
- **Pas de dépendances** : Fonctionne partout
- **Évolutivité** : Facile d'ajouter de nouveaux composants

### 3. Maintenabilité

- **Structure claire** : Un fichier par composant
- **Encapsulation** : Chaque composant est autonome
- **Standards** : Basé sur les standards web

## 🚀 Optimisations

### 1. CSS encapsulé

Chaque composant utilise `CSSStyleSheet` et `adoptedStyleSheets` pour :
- Isoler les styles
- Éviter les conflits CSS
- Améliorer les performances

### 2. Lazy loading

Les composants peuvent être chargés à la demande :
```javascript
// Chargement dynamique
const { Icon } = await import('@kigumi/components');
```

### 3. Source maps

Les source maps sont générées pour faciliter le debugging en développement.

## 🔮 Évolutions futures

### 1. Support des thèmes

Possibilité d'ajouter un système de thèmes via CSS custom properties.

### 2. Composants composites

Création de composants qui combinent plusieurs composants de base.

### 3. Optimisations avancées

- Code splitting automatique
- Preloading des composants fréquemment utilisés
- Compression des assets

## 📝 Notes de développement

### Ajouter un nouveau composant

1. Créer le dossier `src/components/nouveau-composant/`
2. Ajouter `nouveau-composant.js` et `nouveau-composant.css`
3. Exporter la classe dans `nouveau-composant.js`
4. Ajouter l'import et l'export dans `src/index.js`
5. Ajouter l'export dans `package.json`

### Tests

Chaque composant doit être testé :
- Fonctionnalité de base
- Accessibilité
- Performance
- Compatibilité navigateur

### Documentation

Maintenir la documentation :
- README.md pour les utilisateurs
- ARCHITECTURE.md pour les développeurs
- Exemples dans `examples/`