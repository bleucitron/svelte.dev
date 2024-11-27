---
title: svelte/legacy
---

Ce module fournit plusieurs fonctions à utiliser pendant votre migration, puisque certaines
anciennes fonctionnalités ne peuvent pas être remplacées à l'identique par de nouvelles. Tous les
imports sont étiquetés dépréciés et doivent être migrés manuellement quand vous en aurez l'occasion.



```js
// @noErrors
import {
	asClassComponent,
	createBubbler,
	createClassComponent,
	handlers,
	nonpassive,
	once,
	passive,
	preventDefault,
	run,
	self,
	stopImmediatePropagation,
	stopPropagation,
	trusted
} from 'svelte/legacy';
```

## asClassComponent

<blockquote class="tag deprecated note">


N'utilisez ceci qu'en tant que solution temporaire pour migrer votre code impératif vers Svelte 5.

</blockquote>

Prend la fonction du composant et renvoie un constructeur de composant compatible avec Svelte 4.

<div class="ts-block">

```dts
function asClassComponent<
	Props extends Record<string, any>,
	Exports extends Record<string, any>,
	Events extends Record<string, any>,
	Slots extends Record<string, any>
>(
	component:
		| SvelteComponent<Props, Events, Slots>
		| Component<Props>
): ComponentType<
	SvelteComponent<Props, Events, Slots> & Exports
>;
```

</div>



## createBubbler

<blockquote class="tag deprecated note">

N'utilisez ceci qu'en tant que solution temporaire pour migrer automatiquement des évènments
délégués vers Svelte 5.

</blockquote>

Fonction pour créer une fonction `bubble` qui mime le comportement Svelte 4 de `on:click` sans
gestionnaire associé.

<div class="ts-block">

```dts
function createBubbler(): (
	type: string
) => (event: Event) => boolean;
```

</div>



## createClassComponent

<blockquote class="tag deprecated note">

N'utilisez ceci qu'en tant que solution temporaire pour migrer votre code impératif vers Svelte 5.

</blockquote>

Prend les mêmes options qu'un composant Svelte 4 ou la fonction de composant, et renvoie un
composant compaatible avec Svelte 4.

<div class="ts-block">

```dts
function createClassComponent<
	Props extends Record<string, any>,
	Exports extends Record<string, any>,
	Events extends Record<string, any>,
	Slots extends Record<string, any>
>(
	options: ComponentConstructorOptions<Props> & {
		component:
			| ComponentType<SvelteComponent<Props, Events, Slots>>
			| Component<Props>;
	}
): SvelteComponent<Props, Events, Slots> & Exports;
```

</div>



## handlers

Fonction pour mimer les différents gestionnaires d'évènements disponible en Svelte 4.

<div class="ts-block">

```dts
function handlers(
	...handlers: EventListener[]
): EventListener;
```

</div>



## nonpassive

Remplacement du modificateur d'évènement `nonpassive`, implémenté comme une action.

<div class="ts-block">

```dts
function nonpassive(
	node: HTMLElement,
	[event, handler]: [
		event: string,
		handler: () => EventListener
	]
): void;
```

</div>



## once

Remplacement du modificateur d'évènement `once`.

<div class="ts-block">

```dts
function once(
	fn: (event: Event, ...args: Array<unknown>) => void
): (event: Event, ...args: unknown[]) => void;
```

</div>



## passive

Remplacement du modificateur d'évènement `passive`, implémenté comme une action.

<div class="ts-block">

```dts
function passive(
	node: HTMLElement,
	[event, handler]: [
		event: string,
		handler: () => EventListener
	]
): void;
```

</div>



## preventDefault

Remplacement du modificateur d'évènement `preventDefault`.

<div class="ts-block">

```dts
function preventDefault(
	fn: (event: Event, ...args: Array<unknown>) => void
): (event: Event, ...args: unknown[]) => void;
```

</div>



## run

<blockquote class="tag deprecated note">

N'utilisez ceci qu'en tant que solution temporaire pour migrer votre code de composant vers Svelte
5.

</blockquote>

Exécute la fonction fournie immédiatement et une seule fois sur le serveur, et fonctionne comme
`$effect.pre` sur le client.

<div class="ts-block">

```dts
function run(fn: () => void | (() => void)): void;
```

</div>



## self

Remplacement du modificateur d'évènement `self`.

<div class="ts-block">

```dts
function self(
	fn: (event: Event, ...args: Array<unknown>) => void
): (event: Event, ...args: unknown[]) => void;
```

</div>



## stopImmediatePropagation

Remplacement du modificateur d'évènement `stopImmediatePropagation`.

<div class="ts-block">

```dts
function stopImmediatePropagation(
	fn: (event: Event, ...args: Array<unknown>) => void
): (event: Event, ...args: unknown[]) => void;
```

</div>



## stopPropagation

Remplacement du modificateur d'évènement `stopPropagation`.

<div class="ts-block">

```dts
function stopPropagation(
	fn: (event: Event, ...args: Array<unknown>) => void
): (event: Event, ...args: unknown[]) => void;
```

</div>



## trusted

Remplacement du modificateur d'évènement `trusted`.

<div class="ts-block">

```dts
function trusted(
	fn: (event: Event, ...args: Array<unknown>) => void
): (event: Event, ...args: unknown[]) => void;
```

</div>



## LegacyComponentType

Support using the component as both a class and function during the transition period

<div class="ts-block">

```dts
type LegacyComponentType = {
	new (o: ComponentConstructorOptions): SvelteComponent;
	(
		...args: Parameters<Component<Record<string, any>>>
	): ReturnType<
		Component<Record<string, any>, Record<string, any>>
	>;
};
```

</div>


