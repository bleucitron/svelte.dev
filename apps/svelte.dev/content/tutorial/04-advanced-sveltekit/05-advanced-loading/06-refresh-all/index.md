---
title: refreshAll
path: /Europe/London
---

Enfin, il y a l'option nucléaire — `refreshAll()`. Cette méthode va ré-exécuter de manière
indiscriminée toutes les fonctions `load` de la page actuelle, indépendamment de ce de quoi elles
dépendent, ainsi que toutes les [fonctions distantes](/docs/kit/remote-functions) actuellement
actives. Contrairement à un rechargement de page, cette méthode ne réinitialise pas `page.state`.

Mettez à jour `src/routes/[...timezone]/+page.svelte` que l'on a vu lors de l'exercice précédent :

```svelte
/// file: src/routes/[...timezone]/+page.svelte
<script>
	import { onMount } from 'svelte';
	import { +++refreshAll+++ } from '$app/navigation';

	let { data } = $props();

	onMount(() => {
		const interval = setInterval(() => {
			+++refreshAll();+++
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>
```

L'appel à `depends` dans `src/routes/+layout.js` n'est plus nécessaire :

```js
/// file: src/routes/+layout.js
export async function load(---{ depends }---) {
	---depends('data:now');---

	return {
		now: Date.now()
	};
}
```

> [!NOTE] `invalidate(() => true)` et `refreshAll()` ne font _pas_ la même chose. `invalidate(() =>
true)` ne ré-exécute que les fonctions `load` qui dépendent d'une URL, tandis que `refreshAll()`
> ré-exécute toutes les fonctions `load` de la page actuelle ainsi que toutes les fonctions
> distantes actuellement actives. `invalidateAll()` est dépréciée dans SvelteKit 3.
