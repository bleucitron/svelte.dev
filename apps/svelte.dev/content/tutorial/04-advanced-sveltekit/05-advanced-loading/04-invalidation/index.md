---
title: Invalidation
path: /Europe/London
---

Lorsqu'un utilisateur ou une utilisatrice navigue d'une page à l'autre, SvelteKit exécute vos
fonctions `load`, mais uniquement si quelque chose a changé.

Dans cet exemple, naviguer entre les fuseaux horaires provoque la ré-exécution de la fonction `load`
de `src/routes/[...timezone]/+page.js` car `params.timezone` est invalidé. Mais la fonction `load`
de `src/routes/+layout.js` n'est _pas_ ré-exécutée car du point de vue de SvelteKit, la navigation
n'a pas invalidé sa valeur.

Nous pouvons corriger cela en invalidant cette valeur manuellement en utilisant la fonction
[`invalidate(...)`](/docs/kit/$app-navigation#invalidate), qui prend une URL et ré-exécute toute
fonction `load` qui en dépend. Puisque la fonction `load` de `src/routes/+layout.js` appelle
`fetch('/api/now')`, elle dépend de `/api/now`.

Dans `src/routes/[...timezone]/+page.svelte`, ajoutez un callback `onMount` qui exécute
`invalidate('/api/now')` une fois toutes les secondes :

```svelte
/// file: src/routes/[...timezone]/+page.svelte
<script>
	+++import { onMount } from 'svelte';+++
	+++import { invalidate } from '$app/navigation';+++

	let { data } = $props();

+++	onMount(() => {
		const interval = setInterval(() => {
			invalidate('/api/now');
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});+++
</script>

<h1>
	{new Intl.DateTimeFormat([], {
		timeStyle: 'full',
		timeZone: data.timezone
	}).format(new Date(data.now))}
</h1>
```

> [!NOTE] Vous pouvez aussi passer une fonction à `invalidate`, dans le cas où vous souhaiteriez
> invalider en fonction d'un motif particulier et non d'URLs spécifiques.
