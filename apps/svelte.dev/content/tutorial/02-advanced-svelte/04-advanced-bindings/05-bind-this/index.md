---
title: This
---

Vous pouvez utiliser la directive spéciale `bind:this` pour obtenir une liaison en lecture seule
avec un élément de votre composant.

La rune `$effect` de cet exercice essaye de créer un contexte de canvas, mais `canvas` vaut
`undefined`. Commencez par déclarer le `canvas` à la racine du composant...

```svelte
/// file: App.svelte
<script>
	import { paint } from './gradient.js';

	+++let canvas;+++

	$effect(() => {
		// ...
	});
</script>
```

... puis ajoutez la directive à l'élément `<canvas>` :

```svelte
/// file: App.svelte
<canvas +++bind:this={canvas}+++ width={32} height={32}></canvas>
```

Notez que la valeur de `canvas` restera `undefined` tant que le composant n'a pas été monté — en
d'autres termes, vous ne pouvez pas y accéder avant l'exécution de `$effect`.
