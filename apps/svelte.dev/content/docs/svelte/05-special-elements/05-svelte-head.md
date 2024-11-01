---
title: <svelte:head>
---

```svelte
<svelte:head>...</svelte:head>
```

Cet élément vos permet d'ajouter des éléments dans le `document.head`. Lors du rendu côté serveur,
le contenu de `head` est exposé séparément du contenu du `body`.

À l'instar de `<svelte:window>`, `<svelte:document>` et `<svelte:body>`, cet élément ne peut être
défini qu'à la racine de votre composant, et ne peut donc pas être placé dans un bloc ou un élément.

```svelte
<svelte:head>
	<title>Hello world!</title>
	<meta name="description" content="La description utile au SEO se définit ici" />
</svelte:head>
```
