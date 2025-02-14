---
title: Getters et setters
---

Les classes sont particulièrement utiles lorsque vous avez besoin de valider des données. Dans le
cas de cette classe `Box`, il ne devrait pas être possible de faire grandir la taille au-delà du
maximum autorisé par les sliders, mais pourtant c'est bien ce qui se passe.

Nous pouvons corriger cela en remplaçant `width` et `height` avec des _getters_ et _setters_, aussi
appelés _accesseurs_. D'abord, convertissez-les en propriétés
[privées](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes/Private_properties)
:

```js
/// file: App.svelte
class Box {
	+++#width+++ = $state(0);
	+++#height+++ = $state(0);
	area = $derived(this.+++#width+++ * this.+++#height+++);

	constructor(width, height) {
		this.+++#width+++ = width;
		this.+++#height+++ = height;
	}

	// ...
}
```

Puis, créez des getters et setters :

```js
/// file: App.svelte
class Box {
	// ...

+++	get width() {
		return this.#width;
	}

	get height() {
		return this.#height;
	}

	set width(value) {
		this.#width = value;
	}

	set height(value) {
		this.#height = value;
	}+++

	embiggen(amount) {
		this.width += amount;
		this.height += amount;
	}
}
```

Enfin, ajouter de la validation aux setters :

```js
/// file: App.svelte
set width(value) {
	this.#width = +++Math.max(0, Math.min(MAX_SIZE, value));+++
}

set height(value) {
	this.#height = +++Math.max(0, Math.min(MAX_SIZE, value));+++
}
```

Il est maintenant impossible d'augmenter la taille de la boîte au-delà des limites raisonnables, que
ce soit via `bind:value` des inputs, ou via la méthode `embiggen`, peu importe l'insistance avec
laquelle vous appuyez sur le bouton.
