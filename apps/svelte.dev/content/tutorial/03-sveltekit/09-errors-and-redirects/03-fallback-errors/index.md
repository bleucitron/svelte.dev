---
title: Erreurs de secours
---

Si les choses ne passent _vraiment_ mal — une erreur qui se produit pendant le chargement des
données du layout racine, ou pendant l'affichage de la page d'erreur — SvelteKit va utiliser une
page d'erreur de secours statique.

Ajoutez un nouveau fichier `src/routes/+layout.server.js` pour voir ça en action :

```js
/// file: src/routes/+layout.server.js
export function load() {
	throw new Error('beurk');
}
```

Vous pouvez personnaliser la page d'erreur de secours. Créez un fichier `src/error.html` :

```html
/// file: src/error.html
<h1>Game over</h1>
<p>Code %sveltekit.status%</p>
<p>%sveltekit.error.message%</p>
```

Ce fichier peut inclure les choses suivantes :

- `%sveltekit.status%` — le code de statut HTTP
- `%sveltekit.error.message%` — le message d'erreur
