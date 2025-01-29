---
title: Inputs de groupe
---

Si vous avez plusieurs inputs `type="radio"` ou `type="checkbox"` faisant référence à la même
valeur, vous pouvez utiliser `bind:group` avec l'attribut `value`. Les inputs radio appartenant au
même groupe sont mutuellement exclusifs ; les inputs checkbox appartenant au même groupe constituent
un tableau des valeurs sélectionnées.

Ajoutez `bind:group={scoops}` aux inputs radio...

```svelte
/// file: App.svelte
<input
	type="radio"
	name="scoops"
	value={number}
	+++bind:group={scoops}+++
/>
```

...et `bind:group={flavours}` aux inputs checkbox :

```svelte
/// file: App.svelte
<input
	type="checkbox"
	name="flavours"
	value={flavour}
	+++bind:group={flavours}+++
/>
```
