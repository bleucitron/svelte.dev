---
title: export let
---

En mode runes, les [props de composant](basic-markup#Component-props) sont déclarées avec la rune
[`$props`]($props), ce qui permet aux composants parent de fournir des données.

En mode legacy, les props sont déclarées avec le mot-clé `export`, et peuvent avoir une valeur par
défaut :

```svelte
<script>
	export let foo;
	export let bar = 'valeur par défaut';

	// les valeurs qui sont passées comme props
	// sont immédiatement disponibles
	console.log({ foo });
</script>
```

La valeur par défaut est utilisée si celle-ci devait être `undefined` lors de la création du
composant.

> [!NOTE] À la différence du mode runes, si le composant parent change la valeur d'une prop d'une
> valeur définie à `undefined`, la valeur par défaut ne sera pas utilisée.

Les props sans valeur par défaut sont considérées _obligatoires_, et Svelte affichera un warning en
mode développement si aucune valeur n'est fournie, ce que vous pouvez éviter en fournissant
`undefined` en valeur par défaut :

```js
export let foo +++= undefined;+++
```

## Exports de composant [!VO]Component exports

Une déclaration exportée utilisant `const`, `class`, ou `function` n'est _pas_ considérée comme une
prop – elle devient à la place une partie de l'API du composant :

```svelte
<!--- file: Greeter.svelte--->
<script>
	export function greet(name) {
		alert(`coucou ${name} !`);
	}
</script>
```

```svelte
<!--- file: App.svelte --->
<script>
	import Greeter from './Greeter.svelte';

	let greeter;
</script>

<Greeter bind:this={greeter} />

<button on:click={() => greeter.greet('tout le monde')}>
	accueillir
</button>
```

## Renommer des props [!VO]Renaming props

Le mot-clé `export` peut apparaître indépendamment de la déclaration. Ceci permet de renommer des
props, dans le cas par exemple d'un mot réservé :

```svelte
<!--- file: App.svelte --->
<script>
	/** @type {string} */
	let className;

	// crée une propriété `class`,
	// même s'il s'agit d'un mot réservé
	export { className as class };
</script>
```
