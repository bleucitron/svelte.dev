---
title: Stores
---

<!-- - how to use
- how to write
- TODO should the details for the store methods belong to the reference section? -->

Un _store_ est un objet qui permet des accès réactifs à une valeur via un simple _contrat de store_.
Le [module `svelte/store`](../svelte-store) contient des implémentations minimales de stores
satisfaisant ce contrat.

Chaque fois que vous avez une référence à un store, vous pouvez accéder à sa valeur au sein d'un
composant en utilisant le caractère `$`. Ceci va indiquer à Svelte qu'il doit déclarer la variable
préfixée, s'abonner aux changements du store au moment de l'initialisation du composant, et s'en
désabonner lorsqu'approprié.

Les assignations à des variables préfixées avec `$` nécessitent que la variable non préfixée soit un
store d'écriture, et va conduire à un appel à la méthode `.set` du store.

Notez que le store doit être déclaré à la racine du composant – et non dans un bloc `#if` ou une
fonction, par exemple.

Les variables locales (qui ne représentent pas des valeurs de store) ne doivent _pas_ être préfixées
pas `$`.

```svelte
<script>
	import { writable } from 'svelte/store';

	const count = writable(0);
	console.log($count); // affiche 0

	count.set(1);
	console.log($count); // affiche 1

	$count = 2;
	console.log($count); // affiche 2
</script>
```

## Quand utiliser des stores

Avant Svelte 5, les stores étaient la solution à utiliser pour créer des états réactifs accessibles
dans différents composant, ou bien pour factoriser de la logique. Avec les runes, les besoins
d'utilisation de stores se sont grandement réduits.

- lorsque vous voulez factoriser de la logique, il est plus efficace de tirer profit de la
réactivité universelle des runes : vous pouvez utiliser les runes en dehors de la racine d'un
composant, et même vous en servir dans des fichiers JavaScript ou TypeScript (en utilisant les
extensions `.svelte.js` ou `.svelte.ts`)
- lorsque vous voulez créer un état partagé, vous pouvez créer un objet `$state` contenant les
valeurs dont vous avez besoin et ensuite manipuler cet état

```ts
/// file: state.svelte.js
export const userState = $state({
	name: 'nom',
	/* ... */
});
```

```svelte
<!--- file: App.svelte --->
<script>
	import { userState } from './state.svelte.js';
</script>

<p>User name: {userState.name}</p>
<button onclick={() => {
	userState.name = 'nouveau nom';
}}>
	modifier le nom
</button>
```

Les stores sont toujours une bonne solution lorsque vous avez des flux de données asynchrones
complexes, ou lorsqu'il est important que vous contrôliez manuellement la mise à jour des valeurs ou
l'écoute des changements. Si vous êtes familier•e•s de RxJs et souhaitez vous servir de ces
connaissances, le `$` peut être pratique pour vous.

## svelte/store

Le module `svelte/store` contient une implémentation de store minimale qui satisfait le contrat de
store. Il fournit des méthodes pour créer des stores que vous pouvez mettre à jour depuis
l'extérieur, des stores que vous pouvez créer depuis l'intérieur, et des méthodes pour combiner et
dériver des stores.

### `writable`

Fonction qui crée un store dont les valeurs peuvent être définies depuis l'"extérieur" des
composants. Ils sont créés en tant qu'objets avec des méthodes additionnelles `set` et `update`.

`set` est une méthode qui prend un argument qui est la valeur à définir. La valeur du store devient
la valeur de passée en argument si la valeur du store n'est pas déjà égale à cette valeur.

`update` est une méthode qui prend un callback en argument. Le callback prend la valeur existante du
store comme argument et renvoie une nouvelle valeur définissant la nouvelle valeur du store.

```js
/// file: store.js
import { writable } from 'svelte/store';

const count = writable(0);

count.subscribe((value) => {
	console.log(value);
}); // affiche '0'

count.set(1); // affiche '1'

count.update((n) => n + 1); // affiche '2'
```

Si une fonction est passée en deuxième argument, elle sera exécutée lorsque le nombre d'abonnés
passe de zéro à un (mais pas de un à deux, etc.). Cette fonction a comme arguments une fonction
`set` qui change la valeur du store, et une fonction `update` qui fonctionne comme la méthode
`update` du store, prenant un callback en argument pour calculer la nouvelle valeur du store à
partir de l'ancienne valeur. Cette fonction doit renvoyer une fonction `stop` qui sera appelée
lorsque le nombre d'abonnés passe de un à zéro.

```js
/// file: store.js
import { writable } from 'svelte/store';

const count = writable(0, () => {
	console.log('premier abonné');
	return () => console.log('plus aucun abonné');
});

count.set(1); // rien ne se passe

const unsubscribe = count.subscribe((value) => {
	console.log(value);
}); // affiche 'premier abonné', puis '1'

unsubscribe(); // affiche 'plus aucun abonné'
```

Notez que la valeur de `writable` est perdue lorsque celui-ci est détruit, par exemple lorsque la
page est rafraîchie. Cependant, vous pouvez ecrire votre propre logique pour synchroniser la valeur
avec par exemple le `localStorage`.

### `readable`

Crée un store dont la valeur ne peut être lue depuis l'"extérieur" ; le premier argument est la
valeur initiale du store, le deuxième argument est le même que le deuxième argument de
`writable`.

```ts
import { readable } from 'svelte/store';

const time = readable(new Date(), (set) => {
	set(new Date());

	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

	return () => clearInterval(interval);
});

const ticktock = readable('tick', (set, update) => {
	const interval = setInterval(() => {
		update((sound) => (sound === 'tic' ? 'tac' : 'tic'));
	}, 1000);

	return () => clearInterval(interval);
});
```

### `derived`

Crée un store qui dérive d'un ou plusieurs stores. Le callback est exécuté une première fois lorsque
le premier abonné s'abonne, et à chaque fois que les dépendances du store changent de valeur.

Dans la version la plus simple, `derived` prend un seul store, et le callback renvoie une valeur
dérivée.

```ts
// @filename: ambient.d.ts
import { type Writable } from 'svelte/store';

declare global {
	const a: Writable<number>;
}

export {};

// @filename: index.ts
// ---cut---
import { derived } from 'svelte/store';

const doubled = derived(a, ($a) => $a * 2);
```

Le callback peut définir une valeur de manière asynchrone en acceptant un deuxième argument, `set`,
ainsi qu'un troisième argument optionnel, `update`, et en exécutant l'un ou l'autre
lorsqu'approprié.

Dans ce cas, vous pouvez aussi passer un troisième argument à `derived` – la valeur initiale du
store dérivé avant que `set` ou `update` ne soit exécuté pour la première fois. Si aucune valeur
initiale n'est définie, la valeur initiale du store sera `undefined`.

```ts
// @filename: ambient.d.ts
import { type Writable } from 'svelte/store';

declare global {
	const a: Writable<number>;
}

export {};

// @filename: index.ts
// @errors: 18046 2769 7006
// ---cut---
import { derived } from 'svelte/store';

const delayed = derived(
	a,
	($a, set) => {
		setTimeout(() => set($a), 1000);
	},
	2000
);

const delayedIncrement = derived(a, ($a, set, update) => {
	set($a);
	setTimeout(() => update((x) => x + 1), 1000);
	// chaque fois que $a change sa valeur, ceci met à jour le store
	// dérivé avec deux valeurs, $a immédiatement puis $a + 1 une seconde plus tard
});
```

Si le callback renvoie une fonction, celle-ci sera exécutée a) juste avant que le callback soit de
nouveau exécuté, ou lorsque b) le dernier abonné se désabonne.

```ts
// @filename: ambient.d.ts
import { type Writable } from 'svelte/store';

declare global {
	const frequency: Writable<number>;
}

export {};

// @filename: index.ts
// ---cut---
import { derived } from 'svelte/store';

const tick = derived(
	frequency,
	($frequency, set) => {
		const interval = setInterval(() => {
			set(Date.now());
		}, 1000 / $frequency);

		return () => {
			clearInterval(interval);
		};
	},
	2000
);
```

Dans les deux cas, un tableau d'arguments peut être passé en premier argument à la place d'un seul
et unique store.

```ts
// @filename: ambient.d.ts
import { type Writable } from 'svelte/store';

declare global {
	const a: Writable<number>;
	const b: Writable<number>;
}

export {};

// @filename: index.ts

// ---cut---
import { derived } from 'svelte/store';

const summed = derived([a, b], ([$a, $b]) => $a + $b);

const delayed = derived([a, b], ([$a, $b], set) => {
	setTimeout(() => set($a + $b), 1000);
});
```

### `readonly`

Cette fonction est un simple utilitaire pour créer un store en lecture seule à partir d'un store
existante. Vous pouvez toujours vous abonner aux changements du store original en utilisant le
nouveau store.

```js
import { readonly, writable } from 'svelte/store';

const writableStore = writable(1);
const readableStore = readonly(writableStore);

readableStore.subscribe(console.log);

writableStore.set(2); // console: 2
// @errors: 2339
readableStore.set(2); // ERROR
```

### `get`

En général, vous devriez lire la valeur d'un store en vous y abonnant et en vous servant de la
valeur lorsque celle-ci évolue dans le temps. Occasionnellement, vous pourriez avoir besoin de
récupérer la valeur d'un store auquel vous n'êtes pas abonné. `get` vous permet de faire cela.

> [!NOTE] Ceci fonctionne en créant un abonnement, en lisant la vvaleur, puis en se désabonnant. Il
> est donc recommandé de ne pas s'en servir dans du code pouvant impacter la performance.

```ts
// @filename: ambient.d.ts
import { type Writable } from 'svelte/store';

declare global {
	const store: Writable<string>;
}

export {};

// @filename: index.ts
// ---cut---
import { get } from 'svelte/store';

const value = get(store);
```

## Contrat de store [!VO]Store contract

```ts
// @noErrors
store = { subscribe: (subscription: (value: any) => void) => (() => void), set?: (value: any) => void }
```

Vous pouvez créer vos propres stores sans vous baser sur [`svelte/store`](../svelte-store), en
implémentant le _contrat de store_ vous-même :

1. Un store doit contenir une méthode `.subscribe`, qui doit accepter en argument une fonction
	 d'abonnement. Cette fonction d'abonnement doit être exécutée immédiatement et de manière
synchrone avec la valeur plus récente du store lorsque `.subscribe` est appelée. Toutes les
fonctions d'abonnement actives d'un store doivent ensuite être appelées de manière synchrone lorsque
la valeur du store est mise à jour.
2. La méthode `.subscribe` doit renvoyer une fonction de désabonnement. Exécuter une fonction de
	 désabonnement doit arrêter son abonnement, et la fonction d'abonnement correspondante ne doit
ensuite plus être appelée par le store.
3. Un store  peut _optionnellement_ contenir une méthode `.set`, qui doit accepter en argument une
	 nouvelle valeur pour le store, et qui appellera de manière synchrone toutes les fonctions
d'abonnement actives du store. Un tel store est appelé un _store d'écriture_.

Pour des raisons d'interopérabilité avec les Observables de RxJs, la méthode `.subscribe` est aussi
autorisée à renvoyer un objet avec une méthode `.unsubscribe`, plutôt que de renvoyer directement
une fonction de désabonnement. Notez cependant qu'à moins que `.subscribe` n'appelle de manière
synchrone la fonction d'abonnement (ce qui n'est pas requis par la spécification d'Observable),
Svelte verra la valeur du store comme étant `undefined`, et ce jusqu'à ce que la fonction
d'abonnement soit exécutée.
