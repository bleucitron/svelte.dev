---
title: Paramètre de route
path: /blog
---

Pour créer des routes ayant des paramètres dynamiques, utilisez des crochets autour d'un nom valide
de variable. Par exemple, un fichier comme `src/routes/blog/[slug]/+page.svelte` va créer une route
qui va correspondre à `/blog/one`, `blog/deux`, `/blog/trois` et ainsi de suite.

Créons ce fichier :

```svelte
/// file: src/routes/blog/[slug]/+page.svelte
<h1>article de blog</h1>
```

Nous pouvons maintenant naviguer depuis la page `/blog` vers des articles de blog individuels. Dans
le prochain chapitre, nous verrons comment charger leur contenu.

> [!NOTE] Plusieurs paramètres de routes peuvent apparaître _au sein_ d'un segment d'URL, tant
> qu'ils sont séparés par au moins un caractère statique : `foo/[bar]x[baz]` est une route valide où
> `[bar]` et `[baz]` sont des paramètres dynamiques.
