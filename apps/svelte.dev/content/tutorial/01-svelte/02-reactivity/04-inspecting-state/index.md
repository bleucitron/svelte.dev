---
title: Inspecter l'état
---

Il est souvent utile d'être capable de suivre la valeur d'un morceau d'état lorsqu'évolue dans le
temps.

Dans la fonction `addNumber`, nous avons ajouté une déclaration `console.log`. Mais si vous cliquez
sur le bouton et ouvrez la console (en utilisant le bouton sur la droite de la barre d'URL), vous
verrez un warning, et un message expliquant que le message n'a pas pu être cloné.

La raison est que `numbers` est un
[proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
réactif. Il y a deux possibilités pour résoudre cette situation. D'abord, nous pouvons créer un
_snapshot_ non réactif de l'état avec `$state.snapshot(...)` :

```js
/// file: App.svelte
function addNumber() {
	numbers.push(numbers.length + 1);
	console.log(+++$state.snapshot(numbers)+++);
}
```

Il est également possible d'utiliser la rune `$inspect` pour automatiquement logguer un snapshot de
l'état à chaque fois qu'il change. Ce code sera automatiquement exclu de votre build de production :

```js
/// file: App.svelte
function addNumber() {
	numbers.push(numbers.length + 1);
	---console.log($state.snapshot(numbers));---
}

+++$inspect(numbers);+++
```

Vous pouvez personnaliser la manière dont l'information est affichée en utilisant
`$inspect(...).with(fn)` — par exemple, vous pouvez utiliser `console.trace` pour vérifier l'endroit
où le changement d'état a été initié :

```js
/// file: App.svelte
$inspect(numbers)+++.with(console.trace)+++;
```
