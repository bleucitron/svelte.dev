---
title: Classes réactives intégrées
---

Svelte fournit différentes classes réactives que vous pouvez utiliser à la place des classes
JavaScript intégrées — comme `Map`, `Set`, `Date`, `URL` et `URLSearchParams`.

Dans cet exercice, nous _pourrions_ déclarer `date` en utilisant `$state(new Date())`, et en le
réassignant dans le `setInterval`. Mais une meilleure alternative est d'utiliser `SvelteDate`
importé depuis [`svelte/reactivity`](/docs/svelte/svelte-reactivity) :

```svelte
/// file: App.svelte
<script>
	+++import { SvelteDate } from 'svelte/reactivity';+++

	let date = new +++SvelteDate();+++

	// ...
</script>
```
