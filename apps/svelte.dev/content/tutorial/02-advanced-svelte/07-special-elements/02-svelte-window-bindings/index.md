---
title: Liaisons <svelte:window>
---

Nous pouvons aussi lier certaines propriétés de `window`, comme `scrollY` :

```svelte
/// file: App.svelte
<svelte:window +++bind:scrollY={y}+++ />
```

La liste des propriétés que vous pouvez lier est la suivante :

- `innerWidth`
- `innerHeight`
- `outerWidth`
- `outerHeight`
- `scrollX`
- `scrollY`
- `online` — un alias pour `window.navigator.onLine`

Toutes sauf `scrollX` et `scrollY` sont en lecture seule.
