---
title: L'état profond
---

Comme nous l'avons vu dans l'exercice précédent, l'état réagit aux _ré-assignations_. Mais il réagit
également aux _mutations_ — nous appeleons cela la _réactivité profonde_.

Faites de `numbers` un tableau réactif :

```js
/// file: App.svelte
let numbers = +++$state([1, 2, 3, 4])+++;
```

Désormais, lorsque nous modifions le tableau...

```js
/// file: App.svelte
function addNumber() {
	+++numbers[numbers.length] = numbers.length + 1;+++
}
```

... le composant se met à jour. Ou mieux encore, nous pouvons `push` dans le tableau :

```js
/// file: App.svelte
function addNumber() {
	+++numbers.push(numbers.length + 1);+++
}
```

> [!NOTE] La réactivité profonde est implémenté grâce aux
> [proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy),
> et les mutations sur le proxy n'affectent pas l'objet original.
