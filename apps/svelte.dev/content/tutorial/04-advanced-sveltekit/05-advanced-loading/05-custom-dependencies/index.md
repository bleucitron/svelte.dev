---
title: Dépendances personnalisées
path: /Europe/London
---

Appeler `fetch(url)` dans une fonction `load` enregistre `url` en tant que dépendance. Parfois il
n'est pas approprié d'utiliser `fetch`, et dans ce cas vous pouvez préciser une dépendance
manuellement avec la fonction
[`depends(url)`](/docs/kit/load#Rerunning-load-functions-Manual-invalidation).

Puisque toute chaîne de caractères commençant par le motif `[a-z]+:` est une URL valide, nous
pouvons créer des clés d'invalidation personnalisées comme `data:now`.

Mettez à jour `src/routes/+layout.js` pour renvoyer une valeur directement plutôt que de faire un
appel `fetch`, et ajoutez l'appel à `depends` :

```js
/// file: src/routes/+layout.js
export async function load({ +++depends+++ }) {
	+++depends('data:now');+++

	return {
		now: +++Date.now()+++
	};
}
```

Puis, mettez à jour l'appel `invalidate` dans `src/routes/[...timezone]/+page.svelte` :

```svelte
/// file: src/routes/[...timezone]/+page.svelte
<script>
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';

	let { data } = $props();

	onMount(() => {
		const interval = setInterval(() => {
			invalidate(+++'data:now'+++);
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>
```
