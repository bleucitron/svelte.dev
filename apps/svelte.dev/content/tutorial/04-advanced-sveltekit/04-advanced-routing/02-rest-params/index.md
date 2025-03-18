---
title: Paramètres de reste
path: /how
focus: /src/routes/[path]/+page.svelte
---

Pour faire correspondre un nombre inconnu de segments de chemin, utilisez un paramètre `[...rest]`,
nommé ainsi pour sa ressemblance avec les [paramètres de reste de
JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).

Renommez `src/routes/[path]` en `src/routes/[...path]`. La route correspond maintenant à n'importe
quel chemin.

> [!NOTE] D'autres routes, plus spécifiques, seront d'abord testées, faisant des paramètres de reste
> un outil utile pour "attraper" toutes les routes. Par exemple, si vous avez besoin d'une page 404
> personnalisée pour des pages au sein de `/categories/...`, vous pourriez ajouter ces fichiers :
>
> ```tree
> src/routes/
> ├ categories/
> │ ├ animal/
> │ ├ mineral/
> │ ├ vegetable/
> +++│ ├ [...catchall]/
> │ │ ├ +error.svelte
> │ │ └ +page.server.js+++
> ```
>
> Dans le fichier `+page.server.js`, ajoutez `error(404)` dans la fonction `load`.

Les paramètres de reste n'ont _pas_ besoin d'être positionnés en dernier — une route comme
`/items/[...path]/edit` ou `/items/[...path].json` est totalement valide.
