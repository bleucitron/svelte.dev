---
title: transition:
---

Une _transition_ est déclenchée par un élément qui entre ou sort du DOM suite à un changement
d'état.

Lorsqu'un bloc (comme un bloc `{#if ...}`) transitionne vers sa sortie, tous les éléments qu'il
contient, incluant ceux n'ayant pas leurs propres transitions, sont gardés dans le DOM jusqu'à ce
que chaque transition du bloc ait été appliquée.

La directive `transition:` indique une transition _bidirectionnelle_, ce qui signifie qu'elle peut
être inversée en douceur lorsque la transition est en cours.

```svelte
<script>
	+++import { fade } from 'svelte/transition';+++

	let visible = $state(false);
</script>

<button onclick={() => visible = !visible}>basculer</button>

{#if visible}
	<div +++transition:fade+++>entre et sort en s'estompant</div>
{/if}
```

## Transitions intégrées [!VO]Built-in transitions

Une sélection de transitions intégrées peut être importée depuis le module
[`svelte/transition`](svelte-transition).

## Local vs global

Les transitions sont locales par défaut. Les transitions locales sont jouées uniquement lorsque le
bloc auquel elles appartiennent est créé ou détruit, mais _pas_ lorsque les blocs parent sont créés
ou détruits.

```svelte
{#if x}
	{#if y}
		<p transition:fade>entre et sort en s'estompant uniquement lorsque y change</p>

		<p transition:fade|global>entre et sort en s'estompant uniquement lorsque x et y changent</p>
	{/if}
{/if}
```

## Paramètres de transition [!VO]Transition parameters

Les transitions peuvent avoir des paramètres.

(Les doubles `{{accolades}}` ne sont pas une syntaxe spéciale ; il s'agit simplement d'un objet
défini au sein d'une balise d'expression.)

```svelte
{#if visible}
	<div transition:fade={{ duration: 2000 }}>entre et sort en s'estompant pendant 2 secondes</div>
{/if}
```

## Fonctions de transition personnalisées [!VO]Custom transition functions

```js
/// copy: false
// @noErrors
transition = (node: HTMLElement, params: any, options: { direction: 'in' | 'out' | 'both' }) => {
	delay?: number,
	duration?: number,
	easing?: (t: number) => number,
	css?: (t: number, u: number) => string,
	tick?: (t: number, u: number) => void
}
```

Les transitions peuvent utiliser des fonctions personnalisées. Si l'objet renvoyé a une fonction
`css`, Svelte va générer des keyframes d'[animation
web](https://developer.mozilla.org/fr/docs/Web/API/Web_Animations_API).

L'argument `t` passé à `css` est une valeur entre `0` et `1` après l'application de la fonction
`easing`. Les transitions _entrantes_ vont de `0` à `1`, les transitions _sortantes_ vont de `1` à
`0` – autrement dit, `1` représente l'élément dans son état normal, sans qu'aucune transition ne lui
ait été appliquée. L'argument `u` est égal à `1 - t`.

La fonction est appelée de manière répétée _avant_ le début de la transition, avec des valeurs de
`t` et `u` différentes.

```svelte
<!--- file: App.svelte --->
<script>
	import { elasticOut } from 'svelte/easing';

	/** @type {boolean} */
	export let visible;

	/**
	 * @param {HTMLElement} node
	 * @param {{ delay?: number, duration?: number, easing?: (t: number) => number }} params
	 */
	function whoosh(node, params) {
		const existingTransform = getComputedStyle(node).transform.replace('none', '');

		return {
			delay: params.delay || 0,
			duration: params.duration || 400,
			easing: params.easing || elasticOut,
			css: (t, u) => `transform: ${existingTransform} scale(${t})`
		};
	}
</script>

{#if visible}
	<div in:whoosh>entre en trombe</div>
{/if}
```

Une fonction de transition personnalisée peut également renvoyer une fonction `tick`, qui sera
appelée _pendant_ la transition avec les mêmes arguments `t` et `u`.

> [!NOTE] Si vous avez la possibilité d'utiliser `css` au lieu de `tick`, faites-le - les animations
> web sont gérées hors du fil d'exécution principal (_main thread_), ce qui permet d'éviter des
> ralentissements sur des appareils moins performants.

```svelte
<!--- file: App.svelte --->
<script>
	export let visible = false;

	/**
	 * @param {HTMLElement} node
	 * @param {{ speed?: number }} params
	 */
	function typewriter(node, { speed = 1 }) {
		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

		if (!valid) {
			throw new Error(`Cette transition ne fonctionne que sur des éléments ayant un unique noeud
enfant de type texte`);
		}

		const text = node.textContent;
		const duration = text.length / (speed * 0.01);

		return {
			duration,
			tick: (t) => {
				const i = ~~(text.length * t);
				node.textContent = text.slice(0, i);
			}
		};
	}
</script>

{#if visible}
	<p in:typewriter={{ speed: 1 }}>Portez ce vieux whisky au juge blond qui fume</p>
{/if}
```

Si une transition renvoie une fonction au lieu d'un objet de transition, la fonction sera appelée
dans la micro-tâche suivante. Cela permet de coordonner plusieurs transitions, rendant les [effets
de crossfade](/tutorial/deferred-transitions) possibles.

Les fonctions de transitions acceptent également un troisième argument, `options`, qui peut contenir
des informations à propos de la transition.

Les valeurs disponibles dans l'objet `options` sont :

- `direction` – `in`, `out`, ou `both` selon le type de transition

## Évènements de transition [!VO]Transition events

Un élément possédant des transitions va déclencher les évènements suivants en plus des évènements
standards du DOM :

- `introstart`
- `introend`
- `outrostart`
- `outroend`

```svelte
{#if visible}
	<p
		transition:fly={{ y: 200, duration: 2000 }}
		onintrostart={() => (status = "l'entrée a démarré")}
		onoutrostart={() => (status = 'la sortie a démarré')}
		onintroend={() => (status = "l'entrée est terminée")}
		onoutroend={() => (status = 'la sortie est terminée')}
	>
		Entre et sort en volant
	</p>
{/if}
```
