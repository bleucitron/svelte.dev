---
title: <svelte:body>
---

```svelte
<svelte:body onevent={handler} />
```

Comme pour `<svelte:window>`, cet élément vous permet d'ajouter des gestionnaires aux évènements du
`document.body`, tels que `mouseenter` et `mouseleave`, qui ne déclenchent pas sur `window`. Il vous
permet aussi d'utiliser des [actions](use) sur l'élément `<body>`.

À l'instar de `<svelte:window>` et `<svelte:document>`, cet élément ne peut être défini	qu'à la
racine de votre composant, et ne peut donc pas être placé dans un bloc ou un élément.

```svelte
<svelte:body onmouseenter={handleMouseenter} onmouseleave={handleMouseleave} use:someAction />
```
