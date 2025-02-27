---
title: <svelte:body>
---

Comme pour `<svelte:window>` et `<svelte:document>`, l'élément `<svelte:body>` vous permet d'écouter
des évènements qui se déclenchent sur `document.body`. Cela sert notamment pour les évènements
`mouseenter` et `mouseleave`, qui ne se déclenchent pas sur `window`.

Ajoutez les gestionnaires `onmouseenter` et `onmouseleave` à la balise `<svelte:body>`...

```svelte
/// file: App.svelte
<svelte:body
	+++onmouseenter={() => hereKitty = true}+++
	+++onmouseleave={() => hereKitty = false}+++
/>
```

... et survolez le `<body>`.
