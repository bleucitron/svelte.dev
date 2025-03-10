---
title: Pages d'erreur
---

Lorsque quelque chose se passe mal dans une fonction `load`, SvelteKit affiche une page d'erreur.

La page d'erreur par défaut est quelque peu austère. Nous pouvons la personnaliser en créant un
composant `src/routes/+error.svelte` :

```svelte
/// file: src/routes/+error.svelte
<script>
	import { page } from '$app/state';
	import { emojis } from './emojis.js';
</script>

<h1>{page.status} {page.error.message}</h1>
<span style="font-size: 10em">
	{emojis[page.status] ?? emojis[500]}
</span>
```

Notez que le composant `+error.svelte` est affichée dans le `+layout.svelte` racine. Nous pouvons
créer des `+error.svelte` plus granulaires :

```svelte
/// file: src/routes/expected/+error.svelte
<h1>cette erreur était prévue</h1>
```

Ce composant sera affiché pour la routes `/expected`, tandis que la page d'erreur racine
`src/routes/+error.svelte` sera affichée pour toutes les autres erreurs se produisant.
