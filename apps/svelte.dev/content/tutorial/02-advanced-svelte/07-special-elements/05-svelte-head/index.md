---
title: <svelte:head>
---

L'élément `<svelte:head>` vous permet d'insérer des éléments dans le `<head>` de votre document.
C'est pratique pour manipuler les balises `<title>` et `<meta>`, qui sont importantes pour un bon
référencement.

Puisque ces éléments sont difficiles à démontrer dans le cadre de ce tutoriel, nous allons plutôt
nous en servir pour faire autre chose — charger des feuilles de style.

```svelte
/// file: App.svelte
<script>
	const themes = ['margaritaville', 'retrowave', 'spaaaaace', 'halloween'];
	let selected = $state(themes[0]);
</script>

+++<svelte:head>
	<link rel="stylesheet" href="/tutorial/stylesheets/{selected}.css" />
</svelte:head>+++

<h1>Bienvenue sur mon site !</h1>
```

> [!NOTE] En mode rendu côté serveur (SSR), le contenu de `<svelte:head>` est renvoyé séparément du
> reste de votre HTML.
