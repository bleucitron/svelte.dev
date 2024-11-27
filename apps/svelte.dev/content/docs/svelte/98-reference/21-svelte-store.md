---
title: svelte/store
---



```js
// @noErrors
import {
	derived,
	fromStore,
	get,
	readable,
	readonly,
	toStore,
	writable
} from 'svelte/store';
```

## derived

Store de dérivation de valeur synchronisant un ou plusieurs stores de lecture en appliquant une
fonction d'aggregation sur leurs valeurs.

<div class="ts-block">

```dts
function derived<S extends Stores, T>(
	stores: S,
	fn: (
		values: StoresValues<S>,
		set: (value: T) => void,
		update: (fn: Updater<T>) => void
	) => Unsubscriber | void,
	initial_value?: T | undefined
): Readable<T>;
```

</div>

<div class="ts-block">

```dts
function derived<S extends Stores, T>(
	stores: S,
	fn: (values: StoresValues<S>) => T,
	initial_value?: T | undefined
): Readable<T>;
```

</div>



## fromStore

<div class="ts-block">

```dts
function fromStore<V>(store: Writable<V>): {
	current: V;
};
```

</div>

<div class="ts-block">

```dts
function fromStore<V>(store: Readable<V>): {
	readonly current: V;
};
```

</div>



## get

Récupère la valeur courante d'un store en s'y abonnant puis en s'y désabonnant immédiatement.

<div class="ts-block">

```dts
function get<T>(store: Readable<T>): T;
```

</div>



## readable

Crée un store `Readable` (de lecture) qui permet la lecture de sa valeur via abonnement.

<div class="ts-block">

```dts
function readable<T>(
	value?: T | undefined,
	start?: StartStopNotifier<T> | undefined
): Readable<T>;
```

</div>



## readonly

Prend un store et renvoie un nouveau store en lecture seule dérivé de l'original.

<div class="ts-block">

```dts
function readonly<T>(store: Readable<T>): Readable<T>;
```

</div>



## toStore

<div class="ts-block">

```dts
function toStore<V>(
	get: () => V,
	set: (v: V) => void
): Writable<V>;
```

</div>

<div class="ts-block">

```dts
function toStore<V>(get: () => V): Readable<V>;
```

</div>



## writable

Crée un store `Writable` (d'écriture) qui permet la mise à jour de sa valeur et sa lecture via
abonnement.

<div class="ts-block">

```dts
function writable<T>(
	value?: T | undefined,
	start?: StartStopNotifier<T> | undefined
): Writable<T>;
```

</div>



## Readable

Interface du store `Readable` permettant uniquement la lecture.

<div class="ts-block">

```dts
interface Readable<T> {/*…*/}
```

<div class="ts-block-property">

```dts
subscribe(this: void, run: Subscriber<T>, invalidate?: () => void): Unsubscriber;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `run` callback d'abonnement
- `invalidate` callback de nettoyage

</div>

Permet l'abonnement aux mises à jour de valeur.

</div>
</div></div>

## StartStopNotifier

Callbacks de notification Start et Stop.

Cette fonction est exécutée lorsqu'un premier abonné s'abonne.

<div class="ts-block">

```dts
type StartStopNotifier<T> = (
	set: (value: T) => void,
	update: (fn: Updater<T>) => void
) => void | (() => void);
```

</div>

## Subscriber

Callback pour informer des mises à jour de valeur.

<div class="ts-block">

```dts
type Subscriber<T> = (value: T) => void;
```

</div>

## Unsubscriber

Permet de se désabonner des mises à jour de valeur.

<div class="ts-block">

```dts
type Unsubscriber = () => void;
```

</div>

## Updater

Callback pour mettre à jour une valeur.

<div class="ts-block">

```dts
type Updater<T> = (value: T) => T;
```

</div>

## Writable

Interface du store `Writable` permettant la lecture et l'écriture.

<div class="ts-block">

```dts
interface Writable<T> extends Readable<T> {/*…*/}
```

<div class="ts-block-property">

```dts
set(this: void, value: T): void;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `value` valeur à définir

</div>

Définit une valeur et informe les abonnés.

</div>
</div>

<div class="ts-block-property">

```dts
update(this: void, updater: Updater<T>): void;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `updater` callback

</div>

Met à jour la valeur en utilisant un callback et informe les abonnés.

</div>
</div></div>


