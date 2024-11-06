---
title: TypeScript
---

<!-- - [basically what we have today](https://svelte.dev/docs/typescript)
- built-in support, but only for type-only features
- generics
- using `Component` and the other helper types
- using `svelte-check` -->

Vous pouvez utiliser TypeScript dans vos composants Svelte. Les extensions d'IDE comme l'[extension
VS Code de Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) vous
permettent de visualiser les erreurs directement dans votre éditeur, et
[`svelte-check`](https://www.npmjs.com/package/svelte-check) fait la même chose en ligne de
commande, ce que vous pouvez utiliser dans votre CI.

## `<script lang="ts">`

Pour utiliser TypeScript dans vos composants Svelte, ajoutez `lang="ts"` à vos balises `script` :

```svelte
<script lang="ts">
	let name: string = 'les gens';

	function greet(name: string) {
		alert(`Coucou ${name} !`);
	}
</script>

<button onclick={(e: Event) => greet(e.target.innerText)}>
	{name as string}
</button>
```

Faire cela vous permet d'utiliser les fonctionnalités de _type_ de TypeScript, c'est-à-dire toutes
les fonctionnalités qui disparaissent lorsque vous transpilez vers JavaScript, comme les annotations
de type ou les déclarations d'interface. Les fonctionnalités qui demandent au compilateur TypeScript
de générer du code ne sont pas supportées. Ceci inclut :

- l'utilisation d'enums
- l'utilisation des modificateurs `private`, `protected` ou `public` dans les fonctions de
constructeur couplée à l'initialisation de propriétés.
- l'utilisation de fonctionnalités qui ne sont pas encore intégrées au standard ECMASCript (c-à-d
qui ne sont pas en stage 4 du processus TC39), et donc pas encore implémentées dans Acorn, le parser
que nous utilisons pour interpréter JavaScript.

Si vous souhaitez utiliser une de ces fonctionnalités, vous aurez besoin de mettre en place un
préprocesseur de `script`.

## Mise en place de préprocesseurs [!VO]Preprocessor setup

Pour utiliser les fonctionnalités TypeScript _non restreintes au type_ au sein de vos composants,
vous aurez besoin d'ajouter un préprocesseur qui va transformer TypeScript en JavaScript.

```ts
/// file: svelte.config.js
// @noErrors
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	// Notez le `{ script: true }` additionnel
	preprocess: vitePreprocess({ script: true })
};

export default config;
```

### Utiliser SvelteKit ou Vite [!VO]Using SvelteKit or Vite

La manière la plus simple de commencer est de pré-construire un nouveau projet SvelteKit avec `npx
sv create`, de suivre les instructions et de choisir l'option TypeScript.

```ts
/// file: svelte.config.js
// @noErrors
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess()
};

export default config;
```

Si vous n'avez pas besoin ou ne souhaitez pas profiter de toutes les fonctionnalités que SvelteKit a
à offrir, vous pouvez également pré-construire un projet Svelte grâce à Vite en lançant `npm create
vite@latest` et en choisissant l'option `svelte-ts`.

Dans les deux cas, un fichier `svelte.config.ts` avec l'option `vitePreprocess` sera ajouté à votre
projet. Vite/SvelteKit viendra lire ce fichier de configuration.

### Autres outils de build [!VO]Other build tools

Si vous utilisez plutôt des outils comme Rollup ou Webpack, installez leurs plugins Svelte
respectifs. Pour Rollup il s'agit de
[rollup-plugin-svelte](https://github.com/sveltejs/rollup-plugin-svelte), et pour Webpack il s'agit
de [svelte-loader](https://github.com/sveltejs/svelte-loader). Dans les deux cas vous aurez besoin
d'installer `typescript` et `svelte-preprocess` et d'ajouter le préprocesseur à la configuration de
plugin (référrez-vous aux READMEs respectifs pour plus d'infos). Si vous commencez un nouveau
projet, vous pouvez aussi utiliser le template [rollup](https://github.com/sveltejs/template) ou
[webpack](https://github.com/sveltejs/template-webpack) pour mettre en place votre projet à partir
d'un script.

> [!NOTE] Si vous commencez un nouveau projet, nous recommandons plutôt d'utiliser SvelteKit ou
> Vite.

## Paramètres de tsconfig.json [!VO]tsconfig.json settings

Lorsque vous utilisez TypeScript, assurez-vous que votre fichier `tsconfig.json` soit correctement
défini.

- Utilisez une [`target`](https://www.typescriptlang.org/tsconfig/#target) qui soit au moins
`ES2022`, ou bien une `target` d'au moins `ES2015` avec
[`useDefineForClassFields`](https://www.typescriptlang.org/tsconfig/#useDefineForClassFields). Ceci
permet de s'assurer que les déclarations de rune dans les champs de classes restent intactes, pour
permettre au compilateur de fonctionner correctement
- Mettez [`verbatimModuleSyntax`](https://www.typescriptlang.org/tsconfig/#verbatimModuleSyntax) à
`true` pour conserver les imports tels quels
- Mettez [`isolatedModules`](https://www.typescriptlang.org/tsconfig/#isolatedModules) à `true` pour
	que chaque fichier soit considéré en isolation. TypeScript a quelques fonctionnalités qui
nécessitent une analyse croisée de fichiers ainsi qu'une compilation, ce que le compilateur de
Svelte et des outils comme Vite ne font pas

## Typer les `$props` [!VO]Typing `$props`

Vous pouvez typer les `$props` comme un objet normal qui possèderait certaines propriétés.

```svelte
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		propRequise: number;
		propOptionnelle?: boolean;
		snippetAvecUnArgumentString: Snippet<[string]>;
		gestionnaireEvenement: (arg: string) => void;
		[key: string]: unknown;
	}

	let {
		requiredProperty,
		optionalProperty,
		snippetWithStringArgument,
		eventHandler,
		...everythingElse
	}: Props = $props();
</script>

<button onclick={() => eventHandler('bouton cliqué')}>
	{@render snippetWithStringArgument('coucou')}
</button>
```

## `$props` génériques [!VO]Generic `$props`

Les composants peuvent déclarer des relations génériques entre leurs propriétés. Vous pouvez avoir
par exemple un composant de liste qui reçoit en props une liste d'éléments ainsi qu'un callback
ayant pour argument un élément de la liste. Pour déclarer que la propriété `items` et le callback
`select` traitent de données du même type, ajoutez l'attribut `generics` à la balise `script` :

```svelte
<script lang="ts" generics="Item extends { text: string }">
	interface Props {
		items: Item[];
		select(item: Item): void;
	}

	let { items, select }: Props = $props();
</script>

{#each items as item}
	<button onclick={() => select(item)}>
		{item.text}
	</button>
{/each}
```

Le contenu de `generics` est ce que vous mettriez entre les chevrons `<...>` d'une fonction
générique. Autrement dit, vous pouvez utiliser plusieurs génériques, `extends`, ainsi que des types
par défaut.

## Typer des composants haut-niveau [!VO]Typing wrapper components

Si vous construisez un composant qui englobe un élément natif, vous pourriez vouloir exposer tous
les attributs de l'élément sous-jacent à l'utilisateur. Dans ce cas, utilisez (ou héritez) l'une des
interfaces fournies par `svelte/elements`. Voici un exemple pour un composant `Button` :

```svelte
<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let { children, ...rest }: HTMLButtonAttributes = $props();
</script>

<button {...rest}>
	{@render children?.()}
</button>
```

Tous les éléments n'ont pas nécessairement de définition de type dédiée. Pour ceux qui n'en ont pas,
utilisez `SvelteHTMLElements` :

```svelte
<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	let { children, ...rest }: SvelteHTMLElements['div'] = $props();
</script>

<div {...rest}>
	{@render children?.()}
</div>
```

## Typer `$state` [!VO]Typing `$state`

Vous pouvez typer `$state` comme toute autre variable.

```ts
let count: number = $state(0);
```

Si vous ne fournissez pas de valeur initiale à `$state`, son type sera en partie `undefined`.

```ts
// @noErrors
// Error: Type 'number | undefined' is not assignable to type 'number'
let count: number = $state();
```

Si vous savez que la variable _sera_ définie avant que vous vous en serviez, castez cette variable
avec `as`. Ceci est particulièrement utile lorsque vous utilisez des classes :

```ts
class Counter {
	count = $state() as number;
	constructor(initial: number) {
		this.count = initial;
	}
}
```

## Le type `Component` [!VO]The `Component` type

Les composants Svelte sont de type `Component`. Vous pouvez vous en servir, ainsi que les types
associés, pour exprimer toute une variété de contraintes.

Cela sert notamment avec les composant dynamiques pour restreindre quels sont les composants qui
peuvent leur être fournis :

```svelte
<script lang="ts">
	import type { Component } from 'svelte';

	interface Props {
		// seuls les composants qui au plus la propriété "prop"
		// peuvent être fournis
		ComposantDynamique: Component<{ prop: string }>;
	}

	let { ComposantDynamique }: Props = $props();
</script>

<ComposantDynamique prop="foo" />
```

> [!LEGACY] En Svelte 4, les composants étaient de type `SvelteComponent`

Pour extraire le type des propriétés d'un composant, utilisez `ComponentProps`.

```ts
import type { Component, ComponentProps } from 'svelte';
import MonComposant from './MonComposant.svelte';

function withProps<TComponent extends Component<any>>(
	component: TComponent,
	props: ComponentProps<TComponent>
) {}

// Affiche une erreur si le deuxième argument n'a pas les props attendues
// par le composant en premier argument
withProps(MonComposant, { foo: 'bar' });
```

Pour déclarer qu'une variable attend le constructeur ou une instance d'un composant :

```svelte
<script lang="ts">
	import MyComponent from './MyComponent.svelte';

	let componentConstructor: typeof MyComponent = MyComponent;
	let componentInstance: MyComponent;
</script>

<MyComponent bind:this={componentInstance} />
```

## Améliorer les types natifs du DOM [!VO]Enhancing built-in DOM types

Svelte fait son maximum pour fournir les types de tous les éléments du DOM existants. Il se peut que
parfois, vous vouliez utiliser des attributs expérimentaux ou des évènements personnalisés venant
d'une action. Dans ces cas-là, TypeScript va lever une erreur, vous disant qu'il ne connait pas ces
types. S'il s'agit d'attributs ou d'évènements standards non-expérimentaux, cela peut simplement
être un oubli dans nos [définitions de types
HTML](https://github.com/sveltejs/svelte/blob/main/packages/svelte/elements.d.ts). Dans ce cas, vous
pouvez ouvrir une issue et/ou une PR pour corriger le problème.

Dans le cas d'un attribut/évènement personnalisé ou expérimental, vous pouvez améliorer les types de
cette manière :

```ts
/// file: additional-svelte-typings.d.ts
declare namespace svelteHTML {
	// améliorer les éléments
	interface IntrinsicElements {
		'mon-element-perso': { unattribut: string; 'on:event': (e: CustomEvent<any>) => void };
	}
	// améliorer les attributs
	interface HTMLAttributes<T> {
		// si vous souhaitez utiliser l'évènement beforeinstallprompt
		onbeforeinstallprompt?: (event: any) => any;
		// If you want to use myCustomAttribute={..} (note: all lowercase)
		// si vous souhaitez utiliser myCustomAttribute={..} (note: tout en minuscules)
		mycustomattribute?: any; // vous pouvez remplacer any avec quelque chose de plus spécifique
	}
}
```

Puis, assurez-vous que le fifhier `.d.ts` est référencé dans votre fichier `tsconfig.json`. S'il
possède quelque chose comme `"include": ["src/**/*"]` et que votre `.d.ts` se trouve dans le dossier
`src`, cela devrait fonctionner. Il se peut que vous ayez besoin de recharger votre éditeur pour que
les changements soient pris en compte.

Vous pouvez aussi déclarer des types en augmentant le module `svelte/elements` de la façon suivante
:

```ts
/// file: additional-svelte-typings.d.ts
import { HTMLButtonAttributes } from 'svelte/elements';

declare module 'svelte/elements' {
	export interface SvelteHTMLElements {
		'bouton-perso': HTMLButtonAttributes;
	}

	// permet un contrôle plus granulaire sur l'élément sur lequel vous voulez ajouter des types
	export interface HTMLButtonAttributes {
		attributtresexperimental?: string;
	}
}

export {}; // assure que ceci n'est pas un module ambiant, sans quoi les types seraient écrasés
```
