---
title: Lier des instances de composant
---

De la même manière que vous pouvez lier des éléments DOM, vous pouvez lier des instances de
composant avec `bind:this`.

Ceci est utile dans les rares situations où vous avez besoin d'interagir avec un composant
programmatiquement (plutôt que de lui fournir des props mises à jour). Si on repense à notre
application de canvas [rencontrée il y a quelques exercices](actions), cela pourrait être sympa d'y
ajouter un bouton pour effacer l'écran.

D'abord, exportons une fonction depuis `Canvas.svelte` :

```svelte
/// file: Canvas.svelte
let canvas = $state();
let context = $state();
let coords = $state();

+++export function clear() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}+++
```

Puis, créez une référence à l'instance de composant :

```js
/// file: App.svelte
let selected = $state(colors[0]);
let size = $state(10);
let showMenu = $state(true);

+++let canvas;+++
```

```svelte
/// file: App.svelte
<Canvas +++bind:this={canvas}+++ color={selected} size={size} />
```

Enfin, ajoutez un bouton qui appelle la fonction `clear` :

```svelte
/// file: App.svelte
<div class="controls">
	<button class="show-menu" onclick={() => showMenu = !showMenu}>
		{showMenu ? 'fermer' : 'menu'}
	</button>

+++	<button onclick={() => canvas.clear()}>
		effacer
	</button>+++
</div>
```
