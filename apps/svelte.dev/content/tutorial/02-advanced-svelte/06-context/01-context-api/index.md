---
title: setContext et getContext
---

L'API de contexte fournit un mécanisme permettant aux composants de "parler" entre eux sans avoir
besoin de faire circuler des données en tant que props, ou de déclencher des évènements à tout va.
C'est une fonctionnalité avancée, mais pratique. Dans cet exercice, nous allons recréer
[Schotter](https://collections.vam.ac.uk/item/O221321/schotter-print-nees-georg/) de George Nees —
un des pionniers de l'art génératif — en utilisant l'API de contexte.

Dans `Canvas.svelte`, il y a une fonction `addItem` qui ajoute un élément au canvas. Nous pouvons la
rendre disponible dans les composants au sein de `<Canvas>`, comme `<Square>` avec `setContext` :

```js
/// file: Canvas.svelte
+++import { setContext } from 'svelte';+++
import { SvelteSet } from 'svelte/reactivity';

let { width = 100, height = 100, children } = $props();

let canvas;
let items = new SvelteSet();

+++setContext('canvas', { addItem });+++

function addItem(fn) {
	$effect(() => {
		items.add(fn);
		return () => items.delete(fn);
	});
}
```

Dans les composants enfants, nous pouvons maintenant récupérer le contexte avec, eh bien,
`getContext` :

```js
/// file: Square.svelte
+++import { getContext } from 'svelte';+++

let { x, y, size, rotate } = $props();

+++getContext('canvas').addItem(draw);+++
```

Jusque là... on s'ennuie un peu. Ajoutons un peu d'aléatoire à la grille :

```svelte
/// file: App.svelte
<div class="container">
	<Canvas width={800} height={1200}>
		{#each Array(12) as _, c}
			{#each Array(22) as _, r}
				<Square
					x={180 + c * 40+++ + jitter(r * 2)+++}
					y={180 + r * 40+++ + jitter(r * 2)+++}
					size={40}
					+++rotate={jitter(r * 0.05)}+++
				/>
			{/each}
		{/each}
	</Canvas>
</div>
```

`setContext` et `getContext` doivent être appelées pendant l'initialisation du composant, de sorte
que le contexte soit correctement lié. La clé — `'canvas'` dans notre cas — peut être n'importe
quelle valeur, même autre chose que des chaînes de caractères, ce qui peut être utile pour contrôler
qui peut accéder au contexte.

> [!NOTE] Votre objet de contexte peut contenir n'importe quoi, même des états réactifs. Ceci vous
> permet de passer aux composants enfants des valeurs qui changent au cours du temps :
>
> ```js
> // dans un composant parent
> import { setContext } from 'svelte';
>
> let context = $state({...});
> setContext('my-context', context);
> ```
>
> ```js
> // dans un composant enfant
> import { getContext } from 'svelte';
>
> const context = getContext('my-context');
> ```
