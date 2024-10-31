---
title: animate:
---

Une animation est déclenchée lorsque le contenu d'un [bloc `each` à clé](each#Keyed-each-blocks) est
réordonné. Les animations ne sont pas joués lorsqu'un élément est ajouté ou enlevé, uniquement
lorsque l'indice d'un élément existant au sein du bloc `each` change. Les directives d'animation
doivent être appliquées sur des éléments _immédiatement_ enfant d'un bloc `each` à clé.

Les animation peuvent être utilisées avec les [fonctions d'animation intégrées](svelte-animate) à
Svelte ou avec des [fonctions d'animation personnalisées](#Custom-animation-functions).

```svelte
<!-- l'animation sera jouée lorsque `list` est réordonnée -->
{#each list as item, index (item)}
	<li animate:flip>{item}</li>
{/each}
```

## Paramètres d'animation [!VO]Animation Parameters

Comme pour les actions et les transitions, les animations peuvent avoir des paramètres.

(Les doubles `{{accolades}}` ne sont pas une syntaxe spéciale ; il s'agit simplement d'un objet
défini au sein d'une balise d'expression.)

```svelte
{#each list as item, index (item)}
	<li animate:flip={{ delay: 500 }}>{item}</li>
{/each}
```

## Fonctions d'animation personnalisées [!VO]Custom animation functions

```js
/// copy: false
// @noErrors
animation = (node: HTMLElement, { from: DOMRect, to: DOMRect } , params: any) => {
	delay?: number,
	duration?: number,
	easing?: (t: number) => number,
	css?: (t: number, u: number) => string,
	tick?: (t: number, u: number) => void
}
```

Les animations peuvent utiliser des fonctions personnalisées fournissant un `node`, un objet
d'`animation` et tout `parameters` comme arguments. Le paramètre `animation` est un objet contenant
les propriétés `from` et `to`, chacune contenant un
[DOMRect](https://developer.mozilla.org/fr/docs/Web/API/DOMRect#Properties) décrivant la géométrie
de l'élément dans ses positions `start` et `end`. La propriété `from` est le DOMRect de l'élément
dans sa position de départ, la propriété `to` est le DOMRect de l'élément dans sa position finale
après que la liste ait été réordonnée et le DOM mis à jour.

Si l'objet renvoyé a une méthode `css`, Svelte va créer une [animation
web](https://developer.mozilla.org/fr/docs/Web/API/Web_Animations_API) qui sera jouée sur l'élément.

L'argument `t` passé à `css` est une valeur entre `0` et `1` après l'application de la fonction
`easing`. L'argument `u` est égal à `1 - t`.

La fonction est appelée de manière répétée _avant_ le début de la transition, avec des valeurs de
`t` et `u` différentes.

<!-- TODO: Types -->

```svelte
<!--- file: App.svelte --->
<script>
	import { cubicOut } from 'svelte/easing';

	/**
	 * @param {HTMLElement} node
	 * @param {{ from: DOMRect; to: DOMRect }} states
	 * @param {any} params
	 */
	function whizz(node, { from, to }, params) {
		const dx = from.left - to.left;
		const dy = from.top - to.top;

		const d = Math.sqrt(dx * dx + dy * dy);

		return {
			delay: 0,
			duration: Math.sqrt(d) * 120,
			easing: cubicOut,
			css: (t, u) => `transform: translate(${u * dx}px, ${u * dy}px) rotate(${t * 360}deg);`
		};
	}
</script>

{#each list as item, index (item)}
	<div animate:whizz>{item}</div>
{/each}
```

Une fonction d'animation personnalisée peut également renvoyer une fonction `tick`, qui sera appelée
_pendant_ l'animation avec les mêmes arguments `t` et `u`.


> [!NOTE] Si vous avez la possibilité d'utiliser `css` au lieu de `tick`, faites-le - les animations
> web sont gérées hors du fil d'exécution principal (_main thread_), ce qui permet d'éviter des
> ralentissements sur des appareils moins performants.

```svelte
<!--- file: App.svelte --->
<script>
	import { cubicOut } from 'svelte/easing';

	/**
	 * @param {HTMLElement} node
	 * @param {{ from: DOMRect; to: DOMRect }} states
	 * @param {any} params
	 */
	function whizz(node, { from, to }, params) {
		const dx = from.left - to.left;
		const dy = from.top - to.top;

		const d = Math.sqrt(dx * dx + dy * dy);

		return {
			delay: 0,
			duration: Math.sqrt(d) * 120,
			easing: cubicOut,
			tick: (t, u) => Object.assign(node.style, { color: t > 0.5 ? 'Rose' : 'Bleu' })
		};
	}
</script>

{#each list as item, index (item)}
	<div animate:whizz>{item}</div>
{/each}
```
