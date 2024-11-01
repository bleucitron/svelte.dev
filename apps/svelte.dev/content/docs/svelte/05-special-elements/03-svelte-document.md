---
title: <svelte:document>
---

```svelte
<svelte:document onevent={handler} />
```

```svelte
<svelte:document bind:prop={value} />
```

Comme pour `<svelte:window>`, cet élément vous permet d'ajouter des gestionnaires aux évènements du
`document`, comme `visibilitychange`, qui ne se produit pas sur `window`. Cela vous permet aussi
d'utiliser des [actions](use) sur le `document`.

À l'instar de `<svelte:window>`, cet élément ne peut être défini	qu'à la racine de votre composant,
et ne peut donc pas être placé dans un bloc ou un élément.

```svelte
<svelte:document onvisibilitychange={handleVisibilityChange} use:someAction />
```

Vous pouvez aussi lier les propriétés suivantes :

- `activeElement`
- `fullscreenElement`
- `pointerLockElement`
- `visibilityState`

Toutes sont en lecture seule.
