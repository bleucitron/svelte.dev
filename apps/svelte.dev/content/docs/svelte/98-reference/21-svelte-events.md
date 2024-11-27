---
title: svelte/events
---



```js
// @noErrors
import { on } from 'svelte/events';
```

## on

Attache un gestionnaire d'évènement à `window` et renvoie une fonction qui supprime le gestionnaire.
Utiliser ceci plutôt que `addEventListener` va préserver l'ordre correct des gestionnaires ajoutés
déclarativement (en utilisant des attributs comme `onclick`), qui utilisent la délégation
d'évènements pour des raisons de performance.

<div class="ts-block">

```dts
function on<Type extends keyof WindowEventMap>(
	window: Window,
	type: Type,
	handler: (
		this: Window,
		event: WindowEventMap[Type]
	) => any,
	options?: AddEventListenerOptions | undefined
): () => void;
```

</div>

<div class="ts-block">

```dts
function on<Type extends keyof DocumentEventMap>(
	document: Document,
	type: Type,
	handler: (
		this: Document,
		event: DocumentEventMap[Type]
	) => any,
	options?: AddEventListenerOptions | undefined
): () => void;
```

</div>

<div class="ts-block">

```dts
function on<
	Element extends HTMLElement,
	Type extends keyof HTMLElementEventMap
>(
	element: Element,
	type: Type,
	handler: (
		this: Element,
		event: HTMLElementEventMap[Type]
	) => any,
	options?: AddEventListenerOptions | undefined
): () => void;
```

</div>

<div class="ts-block">

```dts
function on<
	Element extends MediaQueryList,
	Type extends keyof MediaQueryListEventMap
>(
	element: Element,
	type: Type,
	handler: (
		this: Element,
		event: MediaQueryListEventMap[Type]
	) => any,
	options?: AddEventListenerOptions | undefined
): () => void;
```

</div>

<div class="ts-block">

```dts
function on(
	element: EventTarget,
	type: string,
	handler: EventListener,
	options?: AddEventListenerOptions | undefined
): () => void;
```

</div>




