---
title: L'état
tags: rune-state
---

Au coeur de Svelte se trouve un puissant système de _réactivité_ permettant au DOM de rester
synchronisé avec l'état de votre application — par exemple, en réponse à un évènement.

Rendez la déclaration de `count` réactive en entourant sa valeur avec `$state(...)` :

```js
/// file: App.svelte
let count = +++$state(0)+++;
```

Ceci s'appelle une _rune_, et c'est ainsi que vous dites à Svelte que `count` n'est pas une variable
ordinaire. Les runes ressemblent à des fonctions, mais n'en sont pas — lorsque vous utilisez Svelte,
elles font partie du langage lui-même.

Tout ce qu'il reste à faire est implémenter `increment` :

```js
/// file: App.svelte
function increment() {
	+++count += 1;+++
}
```
