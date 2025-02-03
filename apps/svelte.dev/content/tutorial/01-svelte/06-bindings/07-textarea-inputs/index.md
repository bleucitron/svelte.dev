---
title: Inputs textarea
---

L'élément `<textarea>` fonctionne comme un input texte en Svelte — utilisez `bind:value` :

```svelte
/// file: App.svelte
<textarea +++bind:value=+++{value}></textarea>
```

Dans des cas comme celui-ci, où les noms correspondent, nous pouvons aussi utiliser la forme
raccourcie :

```svelte
/// file: App.svelte
<textarea +++bind:value+++></textarea>
```

Ceci est valable pour toutes les liaisons, pas uniquement celles des `<textarea>`.
