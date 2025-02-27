---
title: <svelte:window>
---

Tout comme vous pouvez ajouter des gestionnaires d'évènement à n'importe quel élément DOM, vous
pouvez ajouter des gestionnaires d'évènement à l'objet `window` avec `<svelte:window>`.

Nous avons déjà une fonction `onkeydown` déclarée — tout ce qu'il nous reste à faire est la brancher
:

```svelte
/// file: App.svelte
<svelte:window +++{onkeydown}+++ />
```
