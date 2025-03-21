---
title: invalidateAll
path: /Europe/London
---

Enfin, vous avez l'option nucléaire — `invalidateAll()`. Ceci va ré-exécuter de manière
indifférenciée toutes les fonctions `load` pour la page courante, indépendamment de ce sur quoi
elles dépendent.

Mettez à jour `src/routes/[...timezone]/+page.svelte` venant de l'exercice précédent :

```svelte
/// file: src/routes/[...timezone]/+page.svelte
<script>
	import { onMount } from 'svelte';
	import { +++invalidateAll+++ } from '$app/navigation';

	let { data } = $props();

	onMount(() => {
		const interval = setInterval(() => {
			+++invalidateAll();+++
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>
```

L'appel à `depends` dans le fichier `src/routes/+layout.js` n'est plus nécessaire :

```js
/// file: src/routes/+layout.js
export async function load(---{ depends }---) {
	---depends('data:now');---

	return {
		now: Date.now()
	};
}
```

> [!NOTE] `invalidate(() => true)` et `invalidateAll` ne sont _pas_ équivalentes. `invalidateAll`
> ré-exécute également les fonctions `load` n'ayant pas de dépendances d'`url`, ce que
> `invalidate(() => true)` ne fait pas.
