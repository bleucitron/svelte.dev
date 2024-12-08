---
title: Déclarations réactives $:
---

En mode runes, les réactions aux mises à jour d'état sont gérées avec les runes
[`$derived`]($derived) et [`$effect`]($effect).

En mode legacy, toute déclaration à la racine (par ex. pas dans un bloc ou une fonction) peut être
rendue réactive en la préfixant avec un
[label](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label) `$:`.
Ces déclarations sont exécutées après tout autre code du `<script>` et avant le rendu du markup du
composant, puis lorsque les valeurs dont elles dépendent changent.

```svelte
<script>
	let a = 1;
	let b = 2;

	// ceci est une "déclaration réactive", et sera rejouée
	// lorsque `a`, `b` ou `sum` change
	$: console.log(`${a} + ${b} = ${sum}`);

	// ceci est une "assignatin réactive" – `sum` sera
	// recalculée lorsque `a` ou `b` change. Il n'est
	// pas nécessaire de déclarer `sum` séparément
	$: sum = a + b;
</script>
```

Les déclarations sont ordonnées _topologiquement_ par leurs dépendences et leurs assignations :
puisque la déclaration `console.log` dépend de `sum`, `sum` est calculée en premier même si elle
apparaît plus loin dans le code.

Plusieurs déclarations peuvent être combinée en les mettant dans un bloc :

```js
// @noErrors
$: {
	// recalcule `total` lorsque `items` change
	total = 0;

	for (const item of items) {
		total += item.value;
	}
}
```

La partie à gauche d'une assignation réactive peut être un identifiant, ou une assignation de
déstructuration :

```js
// @noErrors
$: ({ larry, moe, curly } = stooges);
```

## Comprendre les dépendances [!VO]Understanding dependencies

Les dépendances d'une déclaration `$:` sont déterminées au moment de la compilation – il s'agit de
toutes les variables référencées (mais pas assignées) dans la déclaration.

En d'autres termes, une déclaration comme celle-ci ne sera _pas_ rejouée lorsque `count` change, car
le compilateur ne peut pas "voir" la dépendance :

```js
// @noErrors
let count = 0;
let double = () => count * 2;

$: doubled = double();
```

De même, l'ordre topologique sera cassé si les dépendances sont référencées indirectement : `z` ne
sera jamais mis à jour, car `y` n'est pas considérée comme ayant changé lorsque la mise à jour se
produit. Déplacer `$: z = y` en-dessous de `$: setY(x)` permet de corriger le problème :

```svelte
<script>
	let x = 0;
	let y = 0;

	$: z = y;
	$: setY(x);

	function setY(value) {
		y = value;
	}
</script>
```

## Code uniquement pour le navigateur [!VO]Browser-only code

Les déclarations réactives sont jouées lors du rendu côté serveur ainsi que dans le navigateur. Ceci
signifie que tout code qui devrait être uniquement exécuté dans le navigateur devrait être placé
dans un bloc `if` :

```js
// @noErrors
$: if (browser) {
	document.title = title;
}
```
