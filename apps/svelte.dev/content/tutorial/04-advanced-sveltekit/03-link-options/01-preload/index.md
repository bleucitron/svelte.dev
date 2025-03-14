---
title: Préchargement
---

Dans cet exercice, les routes `/slow-a` et `/slow-b` ont toutes les deux des délais artificiels dans
leur fonction `load`, ce qui implique que cela prend un temps certain de naviguer vers ces pages.

Vous ne pouvez pas toujours accélérer le chargement de vos données — parfois vous n'avez pas la main
sur le sujet — mais SvelteKit peut accélérer les navigations en les _anticipant_. Lorsqu'un élément
`<a>` a un attribut `data-sveltekit-preload-data`, SvelteKit va démarrer la navigation dès que
l'utilisateur ou l'utilisatrice survole le lien (sur desktop) ou appuie (_tap_) dessus (sur mobile).
Essayez d'ajouter cet attribut sur le premier lien :

```svelte
/// file: src/routes/+layout.svelte
<nav>
	<a href="/">accueil</a>
	<a href="/slow-a" +++data-sveltekit-preload-data+++>lent-a</a>
	<a href="/slow-b">lent-b</a>
</nav>
```

La navigation vers `/slow-a` sera désormais significativement plus rapide. Démarrer la navigation au
survol ou au "tap" (plutôt que d'attendre l'enregistrement d'un évènement `click`) peut sembler ne
pas apporter grand chose, mais en pratique cela fait gagner généralement 200ms, voire plus. C'est
suffisant pour donner une impression d'instantanéité.

Vous pouvez mettre l'attribut sur des liens individuels, ou sur n'importe quel élément qui
_contient_ des liens. Le template de projet inclut par défaut l'attribut sur l'élément `<body>` :

```html
<body data-sveltekit-preload-data>
	%sveltekit.body%
</body>
```

Vous pouvez personnaliser le comportement en spécifiant l'une des valeurs suivantes pour l'attribut
:

- `"hover"` (valeur par défaut sur desktop, `"tap"` sur mobile)
- `"tap"` — commence le préchargement uniquement au "tap"
- `"off"` — désactive le préchargement

Utiliser `data-sveltekit-preload-data` peut parfois entraîner des faux positifs — par ex. charger
des données en anticipation d'une navigation qui ne se produit jamais — ce qui peut être
indésirable. Comme alternative, `data-sveltekit-preload-code` vous permet de précharger le
JavaScript nécessaire pour une route donnée sans charger prématurément ses données. Cet attribut
peut avoir les valeurs suivantes :

- `"eager"` — précharge tout le code des liens qui sont sur la page après une navigation
- `"viewport"` — précharge tout le code des liens au fur et à mesure qu'ils arrivent dans le
  viewport
- `"hover"` (valeur par défaut) comme plus haut
- `"tap"` — comme plus haut
- `"off"` — comme plus haut

Vous pouvez aussi initier le préchargement programmatiquement avec `preloadCode` et `preloadData`
importés depuis `$app/navigation` :

```js
import { preloadCode, preloadData } from '$app/navigation';

// précharge le code et les données nécessaires pour naviguer vers /foo
preloadData('/foo');

// précharge le code nécessaire pour naviguer vers /bar, mais pas les données
preloadCode('/bar');
```
