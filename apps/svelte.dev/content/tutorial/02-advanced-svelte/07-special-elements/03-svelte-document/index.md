---
title: <svelte:document>
---

L'élément `<svelte:document>` vous permet d'écouter des évènements qui se déclenchent sur le
`document`. C'est utile pour des évènements comme `selectionchange`, qui ne se déclenchent pas sur
`window`.

Ajoutez le gestionnaire `onselectionchange` sur la balise `<svelte:document>` :

```svelte
/// file: App.svelte
<svelte:document +++{onselectionchange}+++ />
```

> [!NOTE] Évitez les gestionnaires `mouseenter` et `mouseleave` sur cet élément, puisque ces
> évènements ne sont pas déclenchés sur `document` sur tous les navigateurs. Utilisez plutôt
> `<svelte:body>`.
