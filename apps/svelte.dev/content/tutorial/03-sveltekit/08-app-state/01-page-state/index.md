---
title: page
---

SvelteKit rend disponibles en lecture seule trois objets d'état via le module `$app/state` — `page`,
`navigating`, et `updated`. Celui que vous utiliserez le plus souvent est
[`page`](/docs/kit/@sveltejs-kit#Page), qui fournit des informations sur la page courante :

- `url` — l'[URL](https://developer.mozilla.org/fr/docs/Web/API/URL) de la page courante
- `params` — les [paramètres](params) de la page courante
- `route` — un objet avec une propriété `id` représentant la route courante
- `status` — le code de statut HTTP de la page courante
- `error` — l'objet d'erreur de la page courant, s'il y en a (vous pouvez en savoir plus sur la
  gestion des erreurs dans des [exercices](error-basics) [à venir](handleerror))
- `data` — les données de la page courante, combinant les valeurs de retour de toutes les fonctions
  `load`
- `form` — les données renvoyées par une [action de formulaire](the-form-element)

Chacune de ces propriétés est réactive, utilisant `$state.raw` sous le capot. Voici un exemple qui
utilise `page.url.pathname` :

```svelte
/// file: src/routes/+layout.svelte
<script>
	+++import { page } from '$app/state';+++

	let { children } = $props();
</script>

<nav>
	<a href="/" +++aria-current={page.url.pathname === '/'}+++>
		accueil
	</a>

	<a href="/about" +++aria-current={page.url.pathname === '/about'}+++>
		à propos
	</a>
</nav>

{@render children()}
```

> [!NOTE] Avant SvelteKit 2.12, vous deviez utiliser `$app/stores` pour cela, qui fournit un store
> `$page` contenant les mêmes informations. Si vous utilisez actuellement `$app/stores`, nous vous
> conseillons de migrer vers `$app/state` (ce qui requiert Svelte 5).
