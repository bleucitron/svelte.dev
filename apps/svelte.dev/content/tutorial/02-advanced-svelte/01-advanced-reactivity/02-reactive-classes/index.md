---
title: Classes réactives
---

Il n'y a pas que les variables qui peuvent être rendues réactives — en Svelte, nous pouvons
également rendre réactives les propriétés des classes.

Rendons les propriétés `width` et `height` de notre classe `Box` réactives :

```js
/// file: App.svelte
class Box {
	width = +++$state(0);+++
	height = +++$state(0);+++
	area = 0;

	// ...
}
```

Désormais, lorsque nous interagissons avec les inputs ou cliquons sur le bouton 'agrandir', la boîte
réagit.

Nous pouvons aussi utiliser `$derived`, de sorte que `box.area` se mette à jour de manière réactive
:

```js
/// file: App.svelte
class Box {
	width = $state(0);
	height = $state(0);
	area = +++$derived(this.width * this.height);+++

	// ...
}
```

> [!NOTE] En plus de `$state` et `$derived`, vous pouvez aussi utiliser `$state.raw` et
> `$derived.by` pour définir des champs réactifs.
