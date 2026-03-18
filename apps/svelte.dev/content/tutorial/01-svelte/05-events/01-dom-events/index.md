---
title: Évènements DOM
---

Comme nous l'avons vu rapidement, vous pouvez écouter n'importe quel évènement sur un élément (comme
un `click` ou un
[`pointermove`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove_event)) avec
une fonction `on<nom>` :

```svelte
/// file: App.svelte
<div +++onpointermove={onpointermove}+++ role="presentation">
	Le pointeur se trouve à la position {Math.round(m.x)} x {Math.round(m.y)}
</div>
```

Comme avec toute autre propriété dont le nom correspond à la valeur, nous pouvons utiliser la forme
raccourcie :

```svelte
/// file: App.svelte
<div +++{onpointermove}+++ role="presentation">
	Le pointeur se trouve à la position {Math.round(m.x)} x {Math.round(m.y)}
</div>
```
