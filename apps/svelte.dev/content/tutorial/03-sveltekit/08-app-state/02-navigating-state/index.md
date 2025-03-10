---
title: navigating
---

L'objet `navigating` représente la navigation courante. Lorsqu'une navigation commence — suite à un
clic sur un lien, l'utilisation des boutons précédent/suivant, ou l'utilisation programmatique de
`goto` — la valeur de `navigating` devient un objet avec les propriétés suivantes :

- `from` et `to` — des objets avec les propriétés `params`, `route`, et `url`
- `type` — le type de navigation, par ex. `link`, `popstate` ou `goto`

> [!NOTE] Pour des informations plus complètes sur le type, voir la documentation de
> [`Navigation`](/docs/kit/@sveltejs-kit#Navigation).

Il peut être utilisé pour afficher un indicateur de chargement lors des navigations longues. Dans
cet exercice, `src/routes/+page.server.js` et `src/routes/about/+page.server.js` ont toutes les deux
un délai artificiel. Dans `src/routes/+layout.svelte`, importez l'objet `navigating` et ajoutez un
message dans la barre de navigation :

```svelte
/// file: src/routes/+layout.svelte
<script>
	import { page, +++navigating+++ } from '$app/state';

	let { children } = $props();
</script>

<nav>
	<a href="/" aria-current={page.url.pathname === '/'}>
		accueil
	</a>

	<a href="/about" aria-current={page.url.pathname === '/about'}>
		à propos
	</a>

+++	{#if navigating.to}
		en cours de navigation vers {navigating.to.url.pathname}
	{/if}+++
</nav>

{@render children()}
```

> [!NOTE] Avant SvelteKit 2.12, vous deviez utiliser `$app/stores` pour cela, qui fournit un store
> `$page` contenant les mêmes informations. Si vous utilisez actuellement `$app/stores`, nous vous
> conseillons de migrer vers `$app/state` (ce qui requiert Svelte 5).
