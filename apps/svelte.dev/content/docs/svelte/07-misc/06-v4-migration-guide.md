---
title: Guide de migration vers Svelte 4
---

Ce guide de migration fournit un aperçu de comment migrer Svelte de la version 3 à la version 4.
Voir les liens vers les PRs pour plus de détails sur chaque changement. Vous pouvez utiliser le
script de migration pour migrer certains de ces changements automatiquement : `npx
svelte-migrate@latest svelte-4`.

Si vous maintenez une librairie, vous devriez envisager le support à la fois de la version et de la
version 3, et pas uniquement de la version 4. Puisque la plupart des changements bloquants ne
concernent que peu de personnes, cela devrait être possible sans trop d'efforts. Et pensez à mettre
également à jour la gamme de versions de votre `peerDependencies`.

## Versions minimum requises [!VO]Minimum version requirements

- Passez à Node 16 ou supérieur. Les versions antérieures ne sont plus supportées
([#8566](https://github.com/sveltejs/svelte/issues/8566))
- Si vous utilisez SvelteKit, passer à 1.20.4 ou plus récent
([#sveltejs/kit#10172](https://github.com/sveltejs/kit/pull/10172))
- Si vous utilisez Vite sans SvelteKit, passez à `vite-plugin-svelte` 2.4.1 ou plus récent
([#8516](https://github.com/sveltejs/svelte/issues/8516))
- Si vous utilisez webpack, passer à webpack 5 ou supérieur et `svelte-loader` 3.1.8 ou plus
supérieur. Les versions plus anciennes ne sont plus supportées
([#8515](https://github.com/sveltejs/svelte/issues/8515),
[198dbcf](https://github.com/sveltejs/svelte/commit/198dbcf))
- Si vous utilisez Rollup, passez à `rollup-plugin-svelte` 7.1.5 ou supérieur
([198dbcf](https://github.com/sveltejs/svelte/commit/198dbcf))
- Si vous utilisez TypeScript, passez à TypeScript 5 ou supérieur. Les versions antérieures peuvent
	encore être compatibles, mais nous ne pouvons pas le garantir
([#8488](https://github.com/sveltejs/svelte/issues/8488))

## Conditions des navigateurs pour les bundlers [!VO]Browser conditions for bundlers

Les bundlers doivent maintenant préciser la condition `browser` lorsqu'ils compilent un bundle
frontend pour le navigateur. SvelteKit et Vite s'occupent de gérer cela automatiquement pour vous.
Si vous utilisez autre chose, il se peut que vous observiez des callbacks de cycle de vie tels que
`onMount` ne pas être appelés, et vous aurez alors besoin de mettre à jour la configuration de
résolution de module.
- Avec Rollup, vous pouvez faire cela dans le plugin `@rollup/plugin-node-resolve` en définissant
`browser: true` dans ses options. Voir la documentation de
[`rollup-plugin-svelte`](https://github.com/sveltejs/rollup-plugin-svelte/#usage) pour plus d'infos
- Avec webpack, vous pouvez faire cela en ajoutant `"browser"` dans le tableau de `conditionNames`.
	Vous pourriez aussi avoir besoin de mettre à jour votre configuration d'`alias`, si vous en avez
une. Voir la documentation de [`svelte-loader`](https://github.com/sveltejs/svelte-loader#usage)
pour plus d'infos

([#8516](https://github.com/sveltejs/svelte/issues/8516))

## Suppression du format CJS [!VO]Removal of CJS related output

Svelte ne supporte plus le format CommonJS (CJS) en sortie de son compilateur et a également
supprimé le hook `svelte/register` et la version du runtime CommonJS. Si vous a besoin de garder un
format compilé CJS, envisagez l'utilisation d'un bundler pour convertir le format ESM – que Svelte
fournit en sortie de compilation – en CJS dans une étape post-build.
([#8613](https://github.com/sveltejs/svelte/issues/8613))

## Types plus stricts pour les fonctions Svelte [!VO ]Stricter types for Svelte functions

Les types des fonctions `createEventDispatcher`, `Action`, `ActionReturn` et `onMount` sont
maintenant plus stricts :

- `createEventDispatcher` permet maintenant de préciser qu'une payload est optionnelle, requise ou
non existante, et ses exécutions sont vérifiées en conséquence.
([#7224](https://github.com/sveltejs/svelte/issues/7224))

```ts
// @errors: 2554 2345
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher<{
	optional: number | null;
	required: string;
	noArgument: null;
}>();

// Svelte version 3:
dispatch('optional');
dispatch('required'); // je peux toujours omettre l'argument de détail
dispatch('noArgument', 'surprise'); // je peux toujours ajouter un argument de détail

// Svelte version 4 avec TypeScript mode strict:
dispatch('optional');
dispatch('required'); // erreur, argument manquant
dispatch('noArgument', 'surprise'); // erreur, vous ne pouvez pas fournir d'argument
```

- `Action` et `ActionReturn` ont maintenant un type `undefined` par défaut pour leur argument, ce
qui signifie que vous devez typer le générique si vous souhaitez préciser que cette action attend un
paramètre. Le script de migration s'occupera de ça pour vous.
([#7442](https://github.com/sveltejs/svelte/pull/7442))

```ts
// @noErrors
---const action: Action = (node, params) => { ... } // ceci est maintenant un erreur si vous fournissez n'importe quel argument---
+++const action: Action<HTMLElement, string> = (node, params) => { ... } // l'argument est de type string+++
```

- `onMount` a désormais une erreur de type si vous lui faites renvoyer une fonction de manière
asynchrone, car cela entraînera très probablement un bug dans votre code : vous vous attendrez à ce
que le callback soit appelé au démontage du composant, ce qui ne se produit que pour les fonctions
renvoyées de manière synchrone ([#8136](https://github.com/sveltejs/svelte/issues/8136)).

```js
// @noErrors
// exemple où ce changement révèle un bug
onMount(
---	// nettoyage() n'est pas appelé car la fonction fournie à onMount est asynchrone
	async () => {
		const qqch = await foo();---
+++	// nettoyage est appelé car la fonction fournie à onMount est synchrone
	() => {
		foo().then(qqch => {...});
		// ...
		return () => nettoyage();
	}
);
```

## Éléments personnalisés avec Svelte [!VO]Custom Elements with Svelte

La création d'éléments personnalisés avec Svelte a été refondue et significativement améliorée.
L'option `tag` est déprécié en faveur de la nouvelle option `customElement` :

```svelte
---<svelte:options tag="mon-composant" />---
+++<svelte:options customElement="mon-composant" />+++
```

Ce changement a été introduit pour permettre [plus de
configurabilité](custom-elements#Component-options) dans des cas d'usage avancés. Le script de
migration ajustera votre code automatiquement. Le timing de mise à jour des propriétés a également
légèrement changé. ([#8457](https://github.com/sveltejs/svelte/issues/8457))

## SvelteComponentTyped est déprécié [!VO]SvelteComponentTyped is deprecated

`SvelteComponentTyped` est déprécié, puisque `SvelteComponent` permet maintenant de remplacer ses
capacités de typage. Remplacez toutes les instances de `SvelteComponentTyped` par `SvelteComponent`.

```js
---import { SvelteComponentTyped } from 'svelte';---
+++import { SvelteComponent } from 'svelte';+++

---export class Foo extends SvelteComponentTyped<{ aProp: string }> {}---
+++export class Foo extends SvelteComponent<{ aProp: string }> {}+++
```

Si vous avez précédemment utilisé `SvelteComponent` en tant qu'instance de composant, vous verrez
désormais peut-être une erreur de type quelque opaque, qui est résolue en changeant `: type
SvelteComponent` en `: typeof SvelteComponent<any>`.

```svelte
<script>
	import ComponentA from './ComponentA.svelte';
	import ComponentB from './ComponentB.svelte';
	import { SvelteComponent } from 'svelte';

	let component: typeof SvelteComponent+++<any>+++;

	function choseRandomly() {
		component = Math.random() > 0.5 ? ComponentA : ComponentB;
	}
</script>

<button on:click={choseRandomly}>random</button>
<svelte:element this={component} />
```

Le script de migration s'occupera de faire ces changements pour vous.
([#8512](https://github.com/sveltejs/svelte/issues/8512))

## Les transitions sont locales par défaut [!VO]Transitions are local by default

Les transitions sont maintenant locales par défaut pour éviter les confusions lors des navigations
entre pages. "local" signifie qu'une transition ne sera pas jouée si elle est définie au sein d'un
bloc de contrôle de flux imbriqué (`each`/`if`/`await`/`key`), et qu'un bloc parent qui n'est pas
son parent direct est créé ou détruit. Dans l'exemple suivant, l'animation d'intro `slide` ne sera
jouée que lorsque `success` passe de `false` à `true`, mais ne sera _pas_ jouée lorsque `show` pass
de `false` à `true` :

```svelte
{#if show}
	...
	{#if success}
		<p in:slide>Succès</p>
	{/each}
{/if}
```

Pour rendre des transitions globales, ajoutez le modificateur `|global` – ces transitions seront
jouées lorsque _n'importe quel_ bloc de contrôle de flux est créé ou détruit. Le script de migration
fera ces changements pour vous.
([#6686](https://github.com/sveltejs/svelte/issues/6686))

## Liaisons de slot par défaut [!VO]Default slot bindings

Les liaisons de slot par défaut ne sont plus exposées à slots nommés et inversement :

```svelte
<script>
	import Nested from './Nested.svelte';
</script>

<Nested let:count>
	<p>
		count dans le slot par défaut – disponible : {count}
	</p>
	<p slot="bar">
		count dans le slot "bar" – non disponible : {count}
	</p>
</Nested>
```

Cela rend les liaisons de slot plus consistentes car le comportement est non défini lorsque par
exemple le slot par défaut vient d'une liste, mais pas le slot nommé.
([#6049](https://github.com/sveltejs/svelte/issues/6049))

## Préprocessseurs [!VO]Preprocessors

L'ordre dans lequel les préprocesseurs sont appliqué a changé. Dorénavant, les préprocesseurs sont
exécutés dans l'ordre, et au sein d'un même groupe, l'order est : markup, script, style.

```js
// @errors: 2304
import { preprocess } from 'svelte/compiler';

const { code } = await preprocess(
	source,
	[
		{
			markup: () => {
				console.log('markup-1');
			},
			script: () => {
				console.log('script-1');
			},
			style: () => {
				console.log('style-1');
			}
		},
		{
			markup: () => {
				console.log('markup-2');
			},
			script: () => {
				console.log('script-2');
			},
			style: () => {
				console.log('style-2');
			}
		}
	],
	{
		filename: 'App.svelte'
	}
);

// Svelte 3 affiche :
// markup-1
// markup-2
// script-1
// script-2
// style-1
// style-2

// Svelte 4 affiche :
// markup-1
// script-1
// style-1
// markup-2
// script-2
// style-2
```

Ceci peut vous concerner si par exemple vous utilisez `MDsveX` – dans ce cas vous devriez vous
assurer qu'il est appliqué avant tout préprocesseur de script ou de style.

```js
// @noErrors
preprocess: [
---	vitePreprocess(),
	mdsvex(mdsvexConfig)---
+++	mdsvex(mdsvexConfig),
	vitePreprocess()+++
]
```

Chaque préprocesseur doit également avoir un nom.
([#8618](https://github.com/sveltejs/svelte/issues/8618))

## Nouveau package eslint [!VO]New eslint package

`eslint-plugin-svelte3` est déprécié. Il peut éventuellement toujours fonctionner avec Svelte 4,
mais nous n'offrons aucune garantie à ce niveau. Nous recommandons de passer à notre nouveau package
[eslint-plugin-svelte](https://github.com/sveltejs/eslint-plugin-svelte). Voir le [post
Github](https://github.com/sveltejs/kit/issues/10242#issuecomment-1610798405) pour obtenir des
instructions sur comment migrer. Alternativement, vous pouvez créer un nouveau projet en utilisant
`npm create svelte@latest`, sélectionner l'option eslint (et éventuellement TypeScript), puis copier
les fichiers correspondants dans votre projet existant.

## Autres changements bloquants [!VO]Other breaking changes

- l'attribut `inert` est maintenant appliqué aux éléments en train de sortir du DOM pour les rendre
	invisibles aux technologies d'assistance et éviter les interactions.
([#8628](https://github.com/sveltejs/svelte/pull/8628))
- l'environnement d'exécution utilise désormais `classList.toggle(name, boolean)`, qui peut ne pas
fonctionner avec de très vieux navigateurs. Envisagez l'utilisation d'un
[polyfill](https://github.com/eligrey/classList.js) si vous avez besoin de supporter ces
navigateurs. ([#8629](https://github.com/sveltejs/svelte/issues/8629))
- l'environnement d'exécution utilise désormais le constructor `CustomEvent`, qui peut ne pas
fonctionner avec de très vieux navigateurs. Envisagez l'utilisation d'un
[polyfill](https://github.com/theftprevention/event-constructor-polyfill/tree/master) si vous avez
besoin de supporter ces
navigateurs. ([#8629](https://github.com/sveltejs/svelte/issues/8775))
- les personnes implémentant de zéro leurs propres stores en utilisant l'interface
`StartStopNotifier` (qui est fournie aux fonctions de création de store comme `writable`) importée
depuis `svelte/store` doivent désormais fournir une fonction de mise à jour en plus de la fonction
passée en premier argument. Ceci n'a pas d'effet sur les personnes utilisant des stores ou créant
des stores à partir de stores Svelte existants.
([#6750](https://github.com/sveltejs/svelte/issues/6750))
- `derived` va dorénavant lever une erreur si on lui fournit des valeurs falsy plutôt que des
stores. ([#7947](https://github.com/sveltejs/svelte/issues/7947))
- les définitions de type pour `svelte/internal` ont été supprimées pour décourager l'usage de ces
méthodes internes ne faisant pas partie de l'API publique. La plupart de ces méthodes vont très
certainement évoluer pour Svelte 5.
- La suppression de noeuds DOM se fait dorénavant par batchs, ce qui change légèrement l'ordre des
évènements déclenchés si vous utilisez un `MutationObserver` sur ces éléments.
([#8763](https://github.com/sveltejs/svelte/pull/8763))
- si vous amélioriez le typage global via le namespace `svelte.JSX`, vous aurez peut-être besoin de
	migrer ce typage pour utiliser plutôt le namespace `svelteHTML`. De même, si vous utilisiez le
namespace `svelte.JSX` pour accéder à ses définitions de type, vous devrez peut-être migrer pour
importer plutôt ces types depuis `svelte/elements`. Vous trouverez plus d'informations sur ce sujet
[ici](https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md#im-getting-deprecation-warnings-for-sveltejsx--i-want-to-migrate-to-the-new-typings).
