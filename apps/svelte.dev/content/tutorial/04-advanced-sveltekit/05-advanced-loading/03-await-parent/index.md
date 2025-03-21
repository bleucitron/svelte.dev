---
title: Utiliser les données du parent
---

Comme nous l'avons vu en introduction du chapitre sur les [données de
layout](/tutorial/kit/layout-data), les composants `+page.svelte` et `+layout.svelte` ont accès à
tout ce qui est renvoyé par leurs fonctions `load` parentes.

Occasionnellement il peut être utile que les fonctions `load` elles-mêmes aient accès aux données de
leurs parents. Ceci peut être fait avec `await parent()`.

Pour démontrer ce fonctionnement, nous allons ajouter deux nombres qui viennent de fonctions `load`
différentes. D'abord, renvoyez des données depuis `src/routes/+layout.server.js` :

```js
/// file: src/routes/+layout.server.js
export function load() {
	return { +++a: 1+++ };
}
```

Puis, récupérez ces donnés dans `src/routes/sum/+layout.js` :

```js
/// file: src/routes/sum/+layout.js
export async function load(+++{ parent }+++) {
	+++const { a } = await parent();+++
	return { +++b: a + 1+++ };
}
```

> [!NOTE] Notez qu'une fonction `load` [universelle](/tutorial/kit/universal-load-functions) peut
> récupérer des données depuis une fonction `load` de _serveur_. L'inverse n'est pas vrai — une
> fonction `load` de serveur peut uniquement récupérer les données d'une autre fonction `load` de
> serveur.

Enfin, dans `src/routes/sum/+page.js`, récupérez les données des deux fonctions `load` :

```js
/// file: src/routes/sum/+page.js
export async function load(+++{ parent }+++) {
	+++const { a, b } = await parent();+++
	return { +++c: a + b+++ };
}
```

> [!NOTE] Faites attention à ne pas introduire de "cascades de chargement" en utilisant `await
parent()`. Si vous pouvez `fetch` d'autres données qui ne sont pas dépendantes des données de
> parent, faites-le en premier lieu.
