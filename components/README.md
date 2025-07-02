# @kigumi/components

Une bibliothèque de composants web modernes et réutilisables pour vos projets frontend.

## 🚀 Installation

```bash
npm install @kigumi/components
# ou
pnpm add @kigumi/components
# ou
yarn add @kigumi/components
```

## 📦 Utilisation

### Mode 1 : Import moderne (recommandé)

Utilisez les composants dans votre projet avec un bundler moderne (Vite, Webpack, etc.) :

```javascript
// Import de tous les composants
import { Icon, Disclosure } from '@kigumi/components';

// Ou import individuel pour le tree-shaking
import { Icon } from '@kigumi/components';
import { Disclosure } from '@kigumi/components';
```

### Mode 2 : Import individuel

Importez un composant spécifique directement :

```javascript
// Import individuel via les exports du package
import '@kigumi/components/icon';
import '@kigumi/components/disclosure';
```

### Mode 3 : Import dans le HTML

```html
<!DOCTYPE html>
<html>
<head>
    <script type="module">
        import '@kigumi/components/icon';
        import '@kigumi/components/disclosure';
    </script>
</head>
<body>
    <k-icon icon="heart"></k-icon>
    <k-disclosure>
        <div>Résumé</div>
        <div>Contenu</div>
    </k-disclosure>
</body>
</html>
```

## 🧩 Composants disponibles

### Icon (`k-icon`)

Affiche des icônes SVG avec support de différents providers.

```html
<k-icon icon="chevron-down"></k-icon>
<k-icon icon="custom-icon" provider="custom"></k-icon>
```

**Attributs :**
- `icon` (requis) : Nom de l'icône à afficher
- `provider` (optionnel) : Provider d'icône (défaut: "lucide")

### Disclosure (`k-disclosure`)

Crée des sections pliables/dépliables.

```html
<k-disclosure>
    <div>Résumé 1</div>
    <div>Contenu 1</div>
    <div>Résumé 2</div>
    <div>Contenu 2</div>
</k-disclosure>
```

**Attributs :**
- `mode` (optionnel) : Mode d'expansion ("mixed" ou "exclusive", défaut: "mixed")
- `icon` (optionnel) : Icône à utiliser (défaut: "plus")
- `icon-position` (optionnel) : Position de l'icône ("start" ou "end", défaut: "end")

## 🛠️ Développement

### Installation des dépendances

```bash
pnpm install
```

### Build

```bash
pnpm build
```

### Linting

```bash
# Lint JavaScript
pnpm lint:js

# Lint CSS
pnpm lint:css

# Lint tout
pnpm lint

# Fix automatique
pnpm lint:fix
```

## 📁 Structure du projet

```
components/
├── src/
│   ├── components/
│   │   ├── icon/
│   │   │   ├── icon.js
│   │   │   └── icon.css
│   │   └── disclosure/
│   │       ├── disclosure.js
│   │       └── disclosure.css
│   ├── config/
│   │   └── config.js
│   └── index.js
├── dist/
│   ├── components/
│   │   ├── icon/
│   │   │   ├── icon.js
│   │   │   └── icon.css.js
│   │   └── disclosure/
│   │       ├── disclosure.js
│   │       └── disclosure.css.js
│   └── kigumi.js
└── package.json
```

## 🎯 Avantages de cette approche

1. **Tree-shaking** : Importez seulement les composants dont vous avez besoin
2. **Flexibilité** : Utilisez les composants dans des projets modernes ou directement dans le HTML
3. **Performance** : Chaque composant est un module ES séparé
4. **Maintenabilité** : Structure claire et modulaire
5. **Compatibilité** : Support des navigateurs modernes avec ES modules

## 📝 Notes techniques

- Les composants sont des Web Components natifs
- Support complet des ES modules
- CSS encapsulé dans les Shadow DOM
- Source maps incluses pour le debugging
- Compatible avec tous les bundlers modernes

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

MIT