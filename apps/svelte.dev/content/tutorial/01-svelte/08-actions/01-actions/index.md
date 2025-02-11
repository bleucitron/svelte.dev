---
title: La directive use
---

Les actions ne sont rien de plus que des fonctions de cycle de vie pour un élément. Elles sont
utiles pour des choses comme :

- s'interfacer avec des librairies tierces
- charger des images en différé
- afficher des tooltips
- ajouter des gestionnaires d'évènements personnalisés

Dans cette application, vous pouvez gribouiller dans le `<canvas>`, et changer les couleurs et la
taille du pinceau via le menu. Mais si vous ouvrez le menu et parcourez les options avec la touche
Tab, vous vous rendrez vite compte que le focus reste _coincé_ dans la modale.

Nous pouvons corriger ça avec une action. Importez `trapFocus` depuis `actions.svelte.js`...

```svelte
/// file: App.svelte
<script>
	import Canvas from './Canvas.svelte';
	+++import { trapFocus } from './actions.svelte.js';+++

	const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'white', 'black'];

	let selected = $state(colors[0]);
	let size = $state(10);
	let showMenu = $state(true);
</script>
```

...puis ajoutez-le au menu avec la directive `use:` :

```svelte
/// file: App.svelte
<div class="menu" +++use:trapFocus+++>
```

Étudions la fonction `trapFocus` dans le fichier `actions.svelte.js`. Une fonction d'action est
appelée avec un `node` — la `<div class="menu">` dans notre cas — lorsque le noeud est monté dans le
DOM. Dans l'action, nous avons un [effet](effects).

D'abord, nous avons besoin d'ajouter un gestionnaire d'évènement qui intercepte les pressions sur la
touche Tab :

```js
/// file: actions.svelte.js
$effect(() => {
	focusable()[0]?.focus();
	+++node.addEventListener('keydown', handleKeydown);+++
});
```

Ensuire, nous devons nettoyer l'effet lorsque le noeud est démonté — c'est-à-dire supprimer le
gestionnaire, et remettre le focus à l'endroit où il était avant le montage de l'élément :

```js
/// file: actions.svelte.js
$effect(() => {
	focusable()[0]?.focus();
	node.addEventListener('keydown', handleKeydown);

+++	return () => {
		node.removeEventListener('keydown', handleKeydown);
		previous?.focus();
	};+++
});
```

Désormais, lorsque vous ouvrez le menu, vous pouvez parcourir les options avec la touche Tab.
