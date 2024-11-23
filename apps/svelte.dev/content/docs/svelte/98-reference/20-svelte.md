---
title: svelte
---



```js
// @noErrors
import {
	SvelteComponent,
	SvelteComponentTyped,
	afterUpdate,
	beforeUpdate,
	createEventDispatcher,
	createRawSnippet,
	flushSync,
	getAllContexts,
	getContext,
	hasContext,
	hydrate,
	mount,
	onDestroy,
	onMount,
	setContext,
	tick,
	unmount,
	untrack
} from 'svelte';
```

## SvelteComponent

Ceci était la classe de base pour les composants Svelte en Svelte 4. Les composants Svelte 5+ sont
d'une nature complètement différente. Pour le typeage, utilisez plutôt `Component`. Pour instancier
des composants, utilisez plutôt `mount`.
Voir le [guide de migration](/docs/svelte/v5-migration-guide#Components-are-no-longer-classes) pour
plus d'infos.

<div class="ts-block">

```dts
class SvelteComponent<
	Props extends Record<string, any> = Record<string, any>,
	Events extends Record<string, any> = any,
	Slots extends Record<string, any> = any
> {/*…*/}
```

<div class="ts-block-property">

```dts
static element?: typeof HTMLElement;
```

<div class="ts-block-property-details">

La version "élément personnalisé" du composant. Seulement présente si le composant est compilé avec
l'option de compilateur `customElement`.

</div>
</div>

<div class="ts-block-property">

```dts
[prop: string]: any;
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
constructor(options: ComponentConstructorOptions<Properties<Props, Slots>>);
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">déprécié</span> Cette méthode n'existe que si vous utilisez
l'utilitaire de compatibilité `asClassComponent`, qui est une solution bouche-trou. Voir le [guide de
migration](https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes) pour
plus d'infos.

</div>

</div>
</div>

<div class="ts-block-property">

```dts
$destroy(): void;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">déprécié</span> Cette méthode n'existe que si vous utilisez un des
utilitaires de compatibilité legacy, qui sont une solution bouche-trou. Voir le [guide de
migration](https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes) pour
plus d'infos.

</div>

</div>
</div>

<div class="ts-block-property">

```dts
$on<K extends Extract<keyof Events, string>>(
	type: K,
	callback: (e: Events[K]) => void
): () => void;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">déprécié</span> Cette méthode n'existe que si vous utilisez un des
utilitaires de compatibilité legacy, qui sont une solution bouche-trou. Voir le [guide de
migration](https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes) pour
plus d'infos.

</div>

</div>
</div>

<div class="ts-block-property">

```dts
$set(props: Partial<Props>): void;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">déprécié</span> Cette méthode n'existe que si vous utilisez un des
utilitaires de compatibilité legacy, qui sont une solution bouche-trou. Voir le [guide de
migration](https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes) pour
plus d'infos.

</div>

</div>
</div></div>

## SvelteComponentTyped

<blockquote class="tag deprecated note">

Utilisez plutôt `Component`. Voir le [guide de
migration](/docs/svelte/v5-migration-guide#Components-are-no-longer-classes) pour
plus d'infos.

</blockquote>

<div class="ts-block">

```dts
class SvelteComponentTyped<
	Props extends Record<string, any> = Record<string, any>,
	Events extends Record<string, any> = any,
	Slots extends Record<string, any> = any
> extends SvelteComponent<Props, Events, Slots> {}
```

</div>

## afterUpdate

<blockquote class="tag deprecated note">

Utilisez plutôt [`$effect`}(/docs/svelte/$effect)

</blockquote>

Programme l'exécution d'un callback immédiatement après la mise à jour du composant.

La première exécution du callback aura lieu après le `onMount` initial.

En mode runes, utilisez plutôt `$effect`.

<div class="ts-block">

```dts
function afterUpdate(fn: () => void): void;
```

</div>



## beforeUpdate

<blockquote class="tag deprecated note">

Utilisez plutôt [`$effect.pre`](/docs/svelte/$effect#$effect.pre).

</blockquote>

Programme l'exécution d'un callback immédiatement avant la mise à jour du composant.

La première exécution du callback aura lieu avant le `onMount` initial.

En mode runes, utilisez plutôt `$effect.pre`.

<div class="ts-block">

```dts
function beforeUpdate(fn: () => void): void;
```

</div>



## createEventDispatcher

<blockquote class="tag deprecated note">

Utilisez plutôt des props de callback et/ou la rune `$host()` – voir le [guide de
migration](/docs/svelte/v5-migration-guide#Event-changes-Component-events).

</blockquote>

Crée un générateur d'évènement qui peut être utilisé pour générer des [évènements de
composant](/docs/svelte/legacy-on#Component-events). Les générateurs d'évènement sont des fonctions
qui prennent deux arguments : `name` et `detail`.

Les évènements de composant créés avec `createEventDispatcher` créent un
[CustomEvent](https://developer.mozilla.org/fr/docs/Web/API/CustomEvent). Ces évènements ne
["bubblent"](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture)
pas. L'argument `detail` correspond à la propriété
[CustomEvent.detail](https://developer.mozilla.org/fr/docs/Web/API/CustomEvent/detail) et peut
contenir tout type de données.

Le générateur d'évènement peut être typé pour réduire les noms d'évènement autorisés et typer
l'argument `detail` :

```ts
const dispatch = createEventDispatcher<{
 loaded: never; // ne prend pas d'argument detail
 change: string; // prend un argument detail obligatoire de type string
 optional: number | null; // prend un argument detail optionnel de type number
}>();
```

<div class="ts-block">

```dts
function createEventDispatcher<
	EventMap extends Record<string, any> = any
>(): EventDispatcher<EventMap>;
```

</div>



## createRawSnippet

Crée un snippet programmtiquement.

<div class="ts-block">

```dts
function createRawSnippet<Params extends unknown[]>(
	fn: (...params: Getters<Params>) => {
		render: () => string;
		setup?: (element: Element) => void | (() => void);
	}
): Snippet<Params>;
```

</div>



## flushSync

Force le traitement de manière synchrone de tout changement d'état en attente (et de tous ceux qui
en résultent).

<div class="ts-block">

```dts
function flushSync(fn?: (() => void) | undefined): void;
```

</div>



## getAllContexts

Récupère la map complète des contextes appartenant au composant parent le plus proche. Doit être
exécuté pendant l'initialisation du composant. Utile, par exemple, si vous créez programmatiquement
un composant et souhaitez lui passer les contexte existant.

<div class="ts-block">

```dts
function getAllContexts<
	T extends Map<any, any> = Map<any, any>
>(): T;
```

</div>



## getContext

Récupère le contexte nommé `key` appartenant au composant parent le plus proche. Doit être exécuté
pendant l'initialisation du composant.

<div class="ts-block">

```dts
function getContext<T>(key: any): T;
```

</div>



## hasContext

Vérifie si une clé `key` a été définie dans le contexte d'un composant parent. Doit être exécuté
pendant l'initialisation du composant.

<div class="ts-block">

```dts
function hasContext(key: any): boolean;
```

</div>



## hydrate

Hydrate un composant sur la cible donnée et renvoie les exports et potentiellement les props du
composant (si compilé avec `accessors: true`).

<div class="ts-block">

```dts
function hydrate<
	Props extends Record<string, any>,
	Exports extends Record<string, any>
>(
	component:
		| ComponentType<SvelteComponent<Props>>
		| Component<Props, Exports, any>,
	options: {} extends Props
		? {
				target: Document | Element | ShadowRoot;
				props?: Props;
				events?: Record<string, (e: any) => any>;
				context?: Map<any, any>;
				intro?: boolean;
				recover?: boolean;
			}
		: {
				target: Document | Element | ShadowRoot;
				props: Props;
				events?: Record<string, (e: any) => any>;
				context?: Map<any, any>;
				intro?: boolean;
				recover?: boolean;
			}
): Exports;
```

</div>



## mount

Monte un composant sur la cible donnée et renvoie les exports et potentiellement les props du
composant (si compilé avec `accessors: true`). Les transitions seront jouées pendant le rendu
initial à moins que l'option `intro` soit définie à `false`.

<div class="ts-block">

```dts
function mount<
	Props extends Record<string, any>,
	Exports extends Record<string, any>
>(
	component:
		| ComponentType<SvelteComponent<Props>>
		| Component<Props, Exports, any>,
	options: MountOptions<Props>
): Exports;
```

</div>



## onDestroy

Programme l'exécution d'un callback immédiatement avant le démontage du composant.

Parmi `onMount`, `beforeUpdate`, `afterUpdate` et `onDestroy`, `onDestroy` est la seule fonction qui
est exécutée pendant le rendu côté serveur du composant.

<div class="ts-block">

```dts
function onDestroy(fn: () => any): void;
```

</div>



## onMount

La fonction `onMount` programme l'exécution d'un callback immédiatement avant le montage du
composant dans le DOM. Cette fonction doit être exécutée pendant l'initialisation du composant (mais
n'a pas besoin de vivre *dans* le composant ; elle peut être exécutée depuis un module extérieur).

Si une fonction est renvoyée de manière _synchrone_ depuis `onMount`, celle-ci sera appelée lorsque
le composant sera démonté.

`onMount` n'est pas exécutée lors du [rendu côté serveur des
composants](/docs/svelte/svelte-server#render).

<div class="ts-block">

```dts
function onMount<T>(
	fn: () =>
		| NotFunction<T>
		| Promise<NotFunction<T>>
		| (() => any)
): void;
```

</div>



## setContext

Associe un objet de `context` arbitraire avec le composant courant et la clé fournie `key`, et
renvoie cet objet. Le contexte est rendu disponible pour les enfants du composant (incluant les
contenus slottés) avec `getContext`.

Comme pour les fonctions de cycle de vie, cette fonction doit être exécutée lors de l'initialisation
du composant.

<div class="ts-block">

```dts
function setContext<T>(key: any, context: T): T;
```

</div>



## tick

Renvoie une promesse qui sera résolue lorsque tous les changements d'état en attente auront été
appliqués.

<div class="ts-block">

```dts
function tick(): Promise<void>;
```

</div>



## unmount

Démonte un composant précédemment monté avec `mount` ou `hydrate`.

<div class="ts-block">

```dts
function unmount(component: Record<string, any>): void;
```

</div>



## untrack

Lorsqu'utilisé dans un [`$derived`](/docs/svelte/$derived) ou un [`$effect`](/docs/svelte/$effect),
tout état lu dans la fonction `fn` ne sera pas traité comme dépendance.

```ts
$effect(() => {
	// ceci sera exécuté lorsque `data` change, mais pas lorsque `time` change
	save(data, {
		timestamp: untrack(() => time)
	});
});
```

<div class="ts-block">

```dts
function untrack<T>(fn: () => T): T;
```

</div>



## Component

Peut être utilisé pour créer des composants Svelte fortement typés.

#### Exemple :

Vous avez une librairie de composants sur npm appelée `component-library`, à partir de laquelle vous
exportez un composant appelé `MyComponent`. Vous souhaitez fournir du typage pour les personnes
utilisant Svelte+TypeScript. Vous créez donc un fichier `index.d.ts` :

```ts
import type { Component } from 'svelte';
export declare const MyComponent: Component<{ foo: string }> {}
```
Typer de cette manière permet aux IDEs comme VS Code ayant l'extension Svelte de fournir les
fonctionnalités intellisense, et donc d'utiliser le composants comme ceci dans un fichier Svelte
avec TypeScript :

```svelte
<script lang="ts">
	import { MyComponent } from "component-library";
</script>
<MyComponent foo={'bar'} />
```

<div class="ts-block">

```dts
interface Component<
	Props extends Record<string, any> = {},
	Exports extends Record<string, any> = {},
	Bindings extends keyof Props | '' = string
> {/*…*/}
```

<div class="ts-block-property">

```dts
(
	this: void,
	internals: ComponentInternals,
	props: Props
): {
	/**
	 * @deprecated Cette méthode n'existe que lorsque vous utilisez un des utilitaires de
	 * compatibilité, qui sont des solutions bouche-trous. Voir le [guide de migration](https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes)
	 * pour plus d'infos.
	 */
	$on?(type: string, callback: (e: any) => void): () => void;
	/**
	 * @deprecated Cette méthode n'existe que lorsque vous utilisez un des utilitaires de
	 * compatibilité, qui sont des solutions bouche-trous. Voir le [guide de migration](https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes).
	 * pour plus d'infos.
	 */
	$set?(props: Partial<Props>): void;
} & Exports;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `internal` Un objet interne utilisé par Svelte. Ne pas utiliser ou modifier.
- `props` Les props passées au composant.

</div>

</div>
</div>

<div class="ts-block-property">

```dts
element?: typeof HTMLElement;
```

<div class="ts-block-property-details">

La version "élément personnalisé" du composant. Seulement présente si le composant est compilé avec
l'option de compilateur `customElement`.

</div>
</div></div>

## ComponentConstructorOptions

<blockquote class="tag deprecated note">

In Svelte 4, components are classes. In Svelte 5, they are functions.

Utilisez plutôt `mount` pour instancier des composants.
Voir [guide de
migration](/docs/svelte/v5-migration-guide#Components-are-no-longer-classes)
pour plus d'infos.

</blockquote>

<div class="ts-block">

```dts
interface ComponentConstructorOptions<
	Props extends Record<string, any> = Record<string, any>
> {/*…*/}
```

<div class="ts-block-property">

```dts
target: Element | Document | ShadowRoot;
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
anchor?: Element;
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
props?: Props;
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
context?: Map<any, any>;
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
hydrate?: boolean;
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
intro?: boolean;
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
recover?: boolean;
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
sync?: boolean;
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
$$inline?: boolean;
```

<div class="ts-block-property-details"></div>
</div></div>

## ComponentEvents

<blockquote class="tag deprecated note">

Le nouveau type `Component` n'a pas de type dédié pour les Events. Utilisez plutôt `ComponentProps`.

</blockquote>

<div class="ts-block">

```dts
type ComponentEvents<Comp extends SvelteComponent> =
	Comp extends SvelteComponent<any, infer Events>
		? Events
		: never;
```

</div>

## ComponentInternals

Détails d'implémentation interne qui changent selon l'environnement.

<div class="ts-block">

```dts
type ComponentInternals = Branded<{}, 'ComponentInternals'>;
```

</div>

## ComponentProps

Type utilitaire pour obtenir les props qu'un certain composant attend.

Exemple : vous voulez vous assurer qu'une variable contient les props attendues par `MyComponent` :

```ts
import type { ComponentProps } from 'svelte';
import MyComponent from './MyComponent.svelte';

// Affiche une erreur si on ne fournit pas les bonnes props à MyComponent.
const props: ComponentProps<typeof MyComponent> = { foo: 'bar' };
```

> [!NOTE] En Svelte 4, vous feriez `ComponentProps<MyComponent>` car `MyComponent` était une classe.

Exemple : une fonction générique qui accepte un composant et en déduit le type de ses props :

```ts
import type { Component, ComponentProps } from 'svelte';
import MyComponent from './MyComponent.svelte';

function withProps<TComponent extends Component<any>>(
	component: TComponent,
	props: ComponentProps<TComponent>
) {};

// Affiche une erreur si le deuxième argument ne correspond pas aux props attendues par le composant
// fourni en premier argument.
withProps(MyComponent, { foo: 'bar' });
```

<div class="ts-block">

```dts
type ComponentProps<
	Comp extends SvelteComponent | Component<any, any>
> =
	Comp extends SvelteComponent<infer Props>
		? Props
		: Comp extends Component<infer Props, any>
			? Props
			: never;
```

</div>

## ComponentType

<blockquote class="tag deprecated note">

Ce type est obsolète lorsque vous utilisez le nouveau type `Component`.

</blockquote>

<div class="ts-block">

```dts
type ComponentType<
	Comp extends SvelteComponent = SvelteComponent
> = (new (
	options: ComponentConstructorOptions<
		Comp extends SvelteComponent<infer Props>
			? Props
			: Record<string, any>
	>
) => Comp) & {
	/** La version "élément personnalisé" du composant. N'est présent que si le composant est compilé
	 *  avec l'option de compilateur `customElement`.
	 */
	element?: typeof HTMLElement;
};
```

</div>

## EventDispatcher

<div class="ts-block">

```dts
interface EventDispatcher<
	EventMap extends Record<string, any>
> {/*…*/}
```

<div class="ts-block-property">

```dts
<Type extends keyof EventMap>(
	...args: null extends EventMap[Type]
		? [type: Type, parameter?: EventMap[Type] | null | undefined, options?: DispatchOptions]
		: undefined extends EventMap[Type]
			? [type: Type, parameter?: EventMap[Type] | null | undefined, options?: DispatchOptions]
			: [type: Type, parameter: EventMap[Type], options?: DispatchOptions]
): boolean;
```

<div class="ts-block-property-details"></div>
</div></div>

## MountOptions

Définit les options acceptées par la fonction `mount()`.

<div class="ts-block">

```dts
type MountOptions<
	Props extends Record<string, any> = Record<string, any>
> = {
	/**
	 * L'élément cible où le composant doit être monté.
	 */
	target: Document | Element | ShadowRoot;
	/**
	 * Un noeud optionnel dans `target`. Lorsque fourni, il est utilisé pour rendre le composant juste
	 * immédiatement avant lui.
	 */
	anchor?: Node;
	/**
	 * Permet la spécification des évènements.
	 * @deprecated Utilisez plutôt les props de callback.
	 */
	events?: Record<string, (e: any) => any>;
	/**
	 * Peut être obtenu via `getContext()` au niveau du composant.
	 */
	context?: Map<any, any>;
	/**
	 * Si oui ou non il faut jouer les transitions lors du rendu initial.
	 * @default true
	 */
	intro?: boolean;
} & ({} extends Props
	? {
			/**
			 * Component properties.
			 */
			props?: Props;
		}
	: {
			/**
			 * Component properties.
			 */
			props: Props;
		});
```

</div>

## Snippet

Le type d'un bloc `$snippet`. Vous pouvez l'utilisez pour (par exemple) exprimer le fait que votre
composant attend un snippet d'un certain type :

```ts
let { banner }: { banner: Snippet<[{ text: string }]> } = $props();
```
Vous pouvez uniquement appeler un snippet via la [balise `{@render ...}`](/docs/svelte/snippet).

<div class="ts-block">

```dts
interface Snippet<Parameters extends unknown[] = []> {/*…*/}
```

<div class="ts-block-property">

```dts
(
	this: void,
	// cette condition autorise les tuples mais pas les tableaux. Utiliser des tableaux nécessiterait
	// un type de paramètre de reste, ce qui n'est pas supporté. Si les paramètre de reste sont
  // ajoutés dans le futur, cette condition pourra être supprimée.
	...args: number extends Parameters['length'] ? never : Parameters
): {
	'{@render ...} doit être appelée avec un Snippet': "import type { Snippet } from 'svelte'";
} & typeof SnippetReturn;
```

<div class="ts-block-property-details"></div>
</div></div>
