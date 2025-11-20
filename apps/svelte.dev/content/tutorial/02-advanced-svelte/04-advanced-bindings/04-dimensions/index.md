---
title: Dimensions
---

Vous pouvez ajouter les liaisons `clientWidth`, `clientHeight`, `offsetWidth` et `offsetHeight` à
n'importe quel élément, et Svelte mettra à jour les valeurs liées en utilisant un
[`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) :

```svelte
/// file: App.svelte
<div +++bind:clientWidth={w} bind:clientHeight={h}+++>
	<span style="font-size: {size}px" contenteditable>modifiez ce texte</span>
	<span class="size">{w} x {h}px</span>
</div>
```

Ces liaisons sont en lecture seule — si vous essayez de changer les valeurs de `w` et `h`, cela
n'aura aucun effect sur l'élément.

> [!NOTE] Les éléments `display: inline` n'ont pas de largeur ou de hauteur (sauf les éléments ayant
> des dimensions "intrinsèques", comme `<img>` et `<canvas>`), et ne peuvent pas être observés avec
> `ResizeObserver`. Vous devrez modifier le style `display` de ces éléments à une autre valeur,
> comme `inline-block`.
