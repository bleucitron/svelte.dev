---
title: $state
---

La rune `$state` vous permet de créer un _état réactif_, ce qui signifie que votre UI _réagit_
lorsque cet état évolue.

```svelte
<script>
	let count = $state(0);
</script>

<button onclick={() => count++}>
	clics: {count}
</button>
```

À la différence d'autres frameworks que vous avez peut-être croisés, il n'y a pas d'API pour
interagir avec un état – `count` est juste un nombre, et non un objet ou une fonction, et vous
pouvez le mettre à jour comme vous mettriez à jour n'importe quelle variable.

### L'état profond

Si `$state` est utilisé avec un tableau ou un objet simple, le résultat est un _proxy d'état_
profondément réactif. Les
[Proxys](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
permettent à Svelte d'exécuter du code lors de la lecture ou de l'écriture de propriétés, en
particulier via des méthodes comme `array.push(...)`, déclenchant des mises à jour granulaires.

> [!NOTE] Les classes comme `Set` et `Map` ne seront pas transformées en Proxy, mais Svelte fournit
> des implémentations réactives pour plusieurs built-ins similaires que vous pouvez importer depuis
> [`svelte/reactivity`](./svelte-reactivity).

L'état est transformé en Proxy de manière récursive jusqu'à ce que Svelte trouve autre chose qu'un
tableau ou un objet simple. Dans un cas comme celui-là...

```js
let todos = $state([
	{
		done: false,
		text: 'ajouter plus de todos'
	}
]);
```

... modifier une propriété d'un élément individuel du tableau va déclencher des mises à jour pour
tous les éléments de votre UI qui dépendent spécifiquement de cette propriété :

```js
let todos = [{ done: false, text: 'add more todos' }];
// ---cut---
todos[0].done = !todos[0].done;
```

Si vous ajoutez un nouvel objet à ce tableau via `.push`, celui-ci sera également transformé en
Proxy :

```js
// @filename: ambient.d.ts
declare global {
	const todos: Array<{ done: boolean, text: string }>
}

// @filename: index.js
// ---cut---
todos.push({
	done: false,
	text: 'déjeuner'
});
```

> [!NOTE] Lorsque vous mettez à jour les propriétés d'un Proxy, l'objet d'origine n'est _pas_ muté.

Notez que si vous déstructurez une valeur réactive, les références ne sont pas réactives – comme
pour du JavaScript classique, elles sont évaluées au moment de la déstructuration :

```js
let todos = [{ done: false, text: 'ajouter plus de tâches' }];
// ---cut---
let { done, text } = todos[0];

// ceci n'affectera pas la valeur de `done`
todos[0].done = !todos[0].done;
```

### Classes

Vous pouvez aussi utiliser `$state` avec les champs d'une classe (qu'ils soient publics ou privés) :

```js
// @errors: 7006 2554
class Todo {
	done = $state(false);
	text = $state();

	constructor(text) {
		this.text = text;
	}

	reset() {
		this.text = '';
		this.done = false;
	}
}
```

Lorsque vous appelez des méthodes en JavaScript, la valeur de
[`this`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/this) a de
l'importance. L'exemple suivant ne fonctionne pas, car la référence `this` dans la méthode `reset`
est le `<button>` plutôt que le `Todo` :

```svelte
<button onclick={todo.reset}>
	réinitialiser
</button>
```

Vous pouvez soit utiliser une fonction inlinée...

```svelte
<button onclick=+++{() => todo.reset()}>+++
	réinitialiser
</button>
```

... soit une fonction fléchée dans la définition de la classe :

```js
// @errors: 7006 2554
class Todo {
	done = $state(false);
	text = $state();

	constructor(text) {
		this.text = text;
	}

	+++reset = () => {+++
		this.text = '';
		this.done = false;
	}
}
```
> [!NOTE] Le compilateur transforme `done` et `text` en méthodes `get`/`set` sur le prototype de
> classe qui référencent des champs privés. Cela signifie que les propriétés ne sont pas
> énumérables.

## `$state.raw`

Si vous ne souhaitez pas que les objets et tableaux soient profondément réactifs, vous pouvez
utiliser `$state.raw`.

Un état déclaré avec `$state.raw` ne peut pas être muté ; il peut seulement être _réassigné_. En
d'autres mots, plutôt que de réassigner une propriété ou un objet, ou d'utiliser une méthode de
tableau comme `push`, remplacez entièrement l'objet ou le tableau si vous voulez le mettre à jour :

```js
let person = $state.raw({
	name: 'Heraclitus',
	age: 49
});

// ceci n'aura aucun effet
person.age += 1;

// ceci fonctionne, car nous créons une nouvelle personne
person = {
	name: 'Heraclitus',
	age: 50
};
```

Ceci peut améliorer la performance dans le cas de grands tableaux et objets que vous ne prévoyez de
toutes façons pas de muter, puisqu'il n'y a pas le surcoût de les rendre profondément réactifs.
Notez qu'un état `raw` peut _contenir_ des états réactifs (par exemple, un tableau `raw` d'objets
réactifs).

## `$state.snapshot`

Pour prendre un instantané statique d'un Proxy profondément réactif `$state`, utilisez
`$state.snapshot` :

```svelte
<script>
	let counter = $state({ count: 0 });

	function onclick() {
		// va afficher `{ count: ... }` plutôt que `Proxy { ... }`
		console.log($state.snapshot(counter));
	}
</script>
```

Ceci est pratique lorsque vous souhaitez passer un état à une librairie externe ou à une API qui
ne s'attend pas à recevoir un proxy, comme dans le cas de `structuredClone`.

## Passer de l'état à des fonctions [!VO]Passing state into functions

JavaScript est un langage qui _passe par valeur_ – lorsque vous appelez une fonction, les arguments
sont les _valeurs_ plutôt que les _variables_. En d'autres mots :

```js
/// file: index.js
// @filename: index.js
// ---cut---
/**
 * @param {number} a
 * @param {number} b
 */
function add(a, b) {
	return a + b;
}

let a = 1;
let b = 2;
let total = add(a, b);
console.log(total); // 3

a = 3;
b = 4;
console.log(total); // toujours 3!
```

Si `add` a besoin d'un accès aux valeurs _courantes_ de `a` et `b`, et de renvoyer la valeur `total`
mise à jour, vous devez utiliser plutôt des fonctions :

```js
/// file: index.js
// @filename: index.js
// ---cut---
/**
 * @param {() => number} getA
 * @param {() => number} getB
 */
function add(+++getA, getB+++) {
	return +++() => getA() + getB()+++;
}

let a = 1;
let b = 2;
let total = add+++(() => a, () => b)+++;
console.log(+++total()+++); // 3

a = 3;
b = 4;
console.log(+++total()+++); // 7
```

L'état dans Svelte fonctionne de la même façon – lorsque vous référencez quelque chose déclaré avec
la rune `$state`...

```js
let a = +++$state(1)+++;
let b = +++$state(2)+++;
```

... vous accédez à sa _valeur courante_.

Notez que le terme "fonctions" est large – il englobe les propriétés des proxies et les propriétés
[`get`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Functions/get) et
[`set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set)...

```js
/// file: index.js
// @filename: index.js
// ---cut---
/**
 * @param {{ a: number, b: number }} input
 */
function add(input) {
	return {
		get value() {
			return input.a + input.b;
		}
	};
}

let input = $state({ a: 1, b: 2 });
let total = add(input);
console.log(total.value); // 3

input.a = 3;
input.b = 4;
console.log(total.value); // 7
```

... toutefois si vous vous retrouvez à écrire du code similaire, envisagez plutôt l'utilisation de
[classes](#Classes).
