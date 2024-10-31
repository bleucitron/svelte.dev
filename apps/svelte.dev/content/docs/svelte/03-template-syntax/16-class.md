---
title: class:
---

La directive `class:` est une manière pratique d'ajouter des classes conditionnellement à des
éléments, plutôt que d'utiliser des expressions conditionnelles dans les attributs `class` :

```svelte
<!-- ces écritures sont équivalentes -->
<div class={isCool ? 'cool' : ''}>...</div>
<div class:cool={isCool}>...</div>
```

Comme pour les autres directives, il est possible d'utiliser une syntaxe raccourcie lorsque le nom
de la classe correspond avec celui de la variable :

```svelte
<div class:cool>...</div>
```

Plusieurs directives `class:` peuvent être ajoutées à un même élément :

```svelte
<div class:cool class:nul={!cool} class:patate>...</div>
```
