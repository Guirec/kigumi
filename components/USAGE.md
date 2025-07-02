# Guide d'utilisation - @kigumi/components

## 🎯 Cas d'usage recommandés

### 1. Projet moderne avec bundler (recommandé)

**Quand l'utiliser** : Projets React, Vue, Svelte, ou projets vanilla avec Vite/Webpack.

```javascript
// Import de tous les composants
import { Icon, Disclosure } from '@kigumi/components';

// Ou import individuel pour optimiser la taille du bundle
import { Icon } from '@kigumi/components';
```

**Avantages** :
- Tree-shaking automatique
- Intégration transparente
- Support complet de l'IDE

### 2. Projet simple sans bundler

**Quand l'utiliser** : Sites statiques, prototypes, pages HTML simples.

```html
<!DOCTYPE html>
<html>
<head>
    <script type="module" src="/node_modules/@kigumi/components/dist/components/icon/icon.js"></script>
</head>
<body>
    <k-icon icon="heart"></k-icon>
</body>
</html>
```

**Avantages** :
- Pas de configuration complexe
- Chargement à la demande
- Compatible avec tous les serveurs web

### 3. Projet avec framework spécifique

**Quand l'utiliser** : Intégration dans des frameworks qui supportent les Web Components.

```javascript
// React
import '@kigumi/components/icon';

function MyComponent() {
    return <k-icon icon="star" />;
}

// Vue
import '@kigumi/components/icon';

export default {
    template: '<k-icon icon="star" />'
}
```

## 🧩 Utilisation des composants

### Icon (`k-icon`)

#### Import
```javascript
import { Icon } from '@kigumi/components';
// ou
import '@kigumi/components/icon';
```

#### Utilisation basique
```html
<k-icon icon="chevron-down"></k-icon>
<k-icon icon="plus"></k-icon>
<k-icon icon="heart"></k-icon>
```

#### Avec provider personnalisé
```html
<k-icon icon="custom-icon" provider="custom"></k-icon>
```

#### Programmatique
```javascript
// Créer un élément
const icon = document.createElement('k-icon');
icon.setAttribute('icon', 'star');
document.body.appendChild(icon);

// Modifier l'icône
icon.setAttribute('icon', 'heart');
```

### Disclosure (`k-disclosure`)

#### Import
```javascript
import { Disclosure } from '@kigumi/components';
// ou
import '@kigumi/components/disclosure';
```

#### Utilisation basique
```html
<k-disclosure>
    <div>Résumé 1</div>
    <div>Contenu 1</div>
    <div>Résumé 2</div>
    <div>Contenu 2</div>
</k-disclosure>
```

#### Mode exclusif
```html
<k-disclosure mode="exclusive">
    <div>Section 1</div>
    <div>Contenu 1</div>
    <div>Section 2</div>
    <div>Contenu 2</div>
</k-disclosure>
```

#### Personnalisation de l'icône
```html
<k-disclosure icon="chevron-down" icon-position="start">
    <div>Résumé</div>
    <div>Contenu</div>
</k-disclosure>
```

#### Programmatique
```javascript
// Créer un élément
const disclosure = document.createElement('k-disclosure');
disclosure.innerHTML = `
    <div>Résumé</div>
    <div>Contenu</div>
`;
document.body.appendChild(disclosure);

// Changer le mode
disclosure.setAttribute('mode', 'exclusive');
```

## 🎨 Personnalisation

### CSS Custom Properties

Les composants utilisent des CSS custom properties pour la personnalisation :

```css
/* Personnaliser les couleurs */
k-icon {
    --k-icon-color: #ff6b6b;
    --k-icon-size: 24px;
}

k-disclosure {
    --k-disclosure-border-color: #e1e5e9;
    --k-disclosure-background: #f8f9fa;
}
```

### Styles globaux

Pour personnaliser tous les composants :

```css
/* Dans votre CSS global */
:root {
    --k-icon-color: #333;
    --k-disclosure-border-color: #ddd;
}
```

## 🔧 Configuration avancée

### Chargement dynamique

```javascript
// Charger un composant à la demande
async function loadIcon() {
    const { Icon } = await import('@kigumi/components');
    // Utiliser le composant
}

// Charger plusieurs composants
async function loadComponents() {
    const [Icon, Disclosure] = await Promise.all([
        import('@kigumi/components/icon'),
        import('@kigumi/components/disclosure')
    ]);
}
```

### Intégration avec un bundler

#### Vite
```javascript
// vite.config.js
export default {
    optimizeDeps: {
        include: ['@kigumi/components']
    }
}
```

#### Webpack
```javascript
// webpack.config.js
module.exports = {
    externals: {
        '@kigumi/components': 'Kigumi'
    }
}
```

## 🚀 Performance

### Optimisations recommandées

1. **Import individuel** pour réduire la taille du bundle
2. **Lazy loading** pour les composants peu utilisés
3. **Preloading** pour les composants critiques

```javascript
// Preload des composants critiques
const link = document.createElement('link');
link.rel = 'preload';
link.as = 'module';
link.href = '/node_modules/@kigumi/components/dist/components/icon/icon.js';
document.head.appendChild(link);
```

### Monitoring

```javascript
// Vérifier que les composants sont chargés
console.log('Icon disponible:', customElements.get('k-icon'));
console.log('Disclosure disponible:', customElements.get('k-disclosure'));
```

## 🐛 Dépannage

### Problèmes courants

#### Composant non défini
```javascript
// Vérifier que le composant est importé
if (!customElements.get('k-icon')) {
    console.error('Le composant Icon n\'est pas chargé');
}
```

#### Styles non appliqués
```css
/* Vérifier que les styles sont chargés */
k-icon {
    display: inline-block; /* Style de fallback */
}
```

#### Erreur de module
```javascript
// Vérifier le chemin d'import
import { Icon } from '@kigumi/components';
// ou
import '@kigumi/components/icon';
```

## 📚 Exemples complets

### Page complète avec tous les composants

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exemple complet</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
        }
        .section {
            margin: 2rem 0;
            padding: 1rem;
            border: 1px solid #e1e5e9;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <h1>Exemple d'utilisation des composants Kigumi</h1>

    <div class="section">
        <h2>Icônes</h2>
        <k-icon icon="star"></k-icon>
        <k-icon icon="heart"></k-icon>
        <k-icon icon="settings"></k-icon>
    </div>

    <div class="section">
        <h2>Disclosure</h2>
        <k-disclosure>
            <div>Cliquez pour ouvrir</div>
            <div>Contenu caché qui s'affiche au clic</div>
        </k-disclosure>
    </div>

    <script type="module" src="/node_modules/@kigumi/components/dist/components/icon/icon.js"></script>
    <script type="module" src="/node_modules/@kigumi/components/dist/components/disclosure/disclosure.js"></script>
</body>
</html>
```

### Application React

```jsx
import React from 'react';
import '@kigumi/components/icon';
import '@kigumi/components/disclosure';

function App() {
    return (
        <div>
            <h1>Mon application</h1>

            <k-icon icon="star"></k-icon>

            <k-disclosure>
                <div>Section 1</div>
                <div>Contenu de la section 1</div>
                <div>Section 2</div>
                <div>Contenu de la section 2</div>
            </k-disclosure>
        </div>
    );
}

export default App;
```

## 🤝 Support

Pour toute question ou problème :

1. Consultez la documentation
2. Vérifiez les exemples
3. Ouvrez une issue sur GitHub
4. Consultez l'architecture technique dans `ARCHITECTURE.md`