---
title: État dérivé
---

Souvent, vous aurez besoin de _dérivez_ un état depuis un autre état. Pour cela, nous avons la rune
`$derived` :

```js
/// file: App.svelte
let numbers = $state([1, 2, 3, 4]);
+++let total = $derived(numbers.reduce((t, n) => t + n, 0));+++
```

Nous pouvons maintenant utiliser ceci dans notre markup :

```svelte
/// file: App.svelte
<p>{numbers.join(' + ')} = +++{total}+++</p>
```

L'expression dans la déclaration `$derived` sera ré-évaluée dès qu'une de ses dépendances (dans ce
cas, uniquement `numbers`) sera mise à jour. À la différence d'un état normal, l'état dérivé est en
lecture seule.
