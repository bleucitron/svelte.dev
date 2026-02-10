---
title: La directive de transition
tags: transitions
---

Nous pouvons créer des interfaces utilisateur plus attrayantes en faisant transitionner les éléments
qui entrent et sortent du DOM. Svelte permet cela très facilement grâce à la directive `transition`.

D'abord, importez la fonction `fade` depuis `svelte/transition`...

```svelte
/// file: App.svelte
<script>
	+++import { fade } from 'svelte/transition';+++

	let visible = $state(true);
</script>
```

... puis ajoutez-la à l'élément `<p>` :

```svelte
/// file: App.svelte
<p +++transition:fade+++>
	Entre et sort en s'estompant
</p>
```
