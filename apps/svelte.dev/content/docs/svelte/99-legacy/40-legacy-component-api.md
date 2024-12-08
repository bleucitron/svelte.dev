---
title: API de composant impérative
---

L'API servant à interagir avec un composant de Svelte 3 et 4 est différente de celle de Svelte 5.
Notez que cette page ne s'applique _pas_ aux composants en mode legacy d'une application Svelte 5.

## Créer un composant [!VO]Creating a component

```ts
// @noErrors
const component = new Component(options);
```

Un composant prévu pour le client – c'est-à-dire un composant compilé avec `generate: 'dom'` (ou
l'option `generate` non définie) est une classe JavaScript.

```ts
// @noErrors
import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		// en supposant que App.svelte contient quelque chose
		// comme `export let answer`
		answer: 42
	}
});
```

Les options d'initialisation suivantes peuvent être fournies :

| option    | par défaut  | description                                                                                          |
| --------- | ----------- | ---------------------------------------------------------------------------------------------------- |
| `target`  | **aucun**   | Un `HTMLElement` ou `ShadowRoot` cible dans lequel rendre le composant. Cette option est obligatoire |
| `anchor`  | `null`      | Un enfant de `target` qui doit être immédiatement après le composant à rendre                        |
| `props`   | `{}`        | Un objet de propriétés à fournir au composant                                                        |
| `context` | `new Map()` | Une `Map` de contexte racine contenant des paires clé-valeur à fournir au composant                  |
| `hydrate` | `false`     | Voir ci-dessous                                                                                      |
| `intro`   | `false`     | Si `true`, les transitions seront jouées lors du rendu initial, sans attendre un changement d'état   |

Les enfants existante de `target` sont laissés à leur place.

L'option `hydrate` dit à Svelte d'améliorer le DOM existant (en général venant du rendu côté
serveur) plutôt que de créer de nouveaux éléments. Ceci ne fonctionne que si le composant a été
compilé avec l'[option `hydratable: true`](/docs/svelte-compiler#compile). L'hydratation des
éléments `<head>` ne fonctionne correctement que si leur rendu côté serveur a également été compilé
avec `hydratable: true`, ce qui ajoute un marqueur à chaque élément de `<head>` afin que le
composant sache quels élément du `<head>` il est responsable d'enlever lors de l'hydratation.

Bien que les enfants de `target` sont normalement laissés intacts, `hydrate: true` va supprimer tous
les enfants de la cible. Pour cette raison, l'option `anchor` ne peut pas être utilisée avec
`hydrate: true`.

Le DOM existant n'a pas besoin de correspondre au composant – Svelte va "réparer" le DOM au fur et à
mesure.

```ts
/// file: index.js
// @noErrors
import App from './App.svelte';

const app = new App({
	target: document.querySelector('#server-rendered-html'),
	hydrate: true
});
```

> [!NOTE]
> Avec Svelte 5+, utilisez plutôt [`mount`](svelte#mount)

## `$set`

```ts
// @noErrors
component.$set(props);
```

Définit programmatiquement des props sur une instance. `component.$set({ x: 1 })` est équivalent à
`x = 1` dans le bloc `<script>` du composant.

Appeler cette méthode programme une mise à jour lors de la prochaine micro-tâche – le DOM n'est
_pas_ mis à jour de manière synchrone.

```ts
// @noErrors
component.$set({ answer: 42 });
```

> [!NOTE]
> Avec Svelte 5+, utiliser plutôt `$state` pour créer une prop de composant et la mettre à jour
>
> ```js
> // @noErrors
> let props = $state({ answer: 42 });
> const component = mount(Component, { props });
> // ...
> props.answer = 24;
> ```

## `$on`

```ts
// @noErrors
component.$on(ev, callback);
```

Provoque l'appel de la fonction `callback` chaque fois que le composant génère un `event`.

Une fonction est renvoyée par `.$on`, celle-ci supprimera le gestionnaire d'évènement lors de son
appel.

```ts
// @noErrors
const off = component.$on('selected', (event) => {
	console.log(event.detail.selection);
});

off();
```

> [!NOTE]
> Avec Svelte 5+, passer plutôt des callbacks en props

## `$destroy`

```js
// @noErrors
component.$destroy();
```

Supprime un composant du DOM et déclenche les éventuels callbacks prévus par `onDestroy`.

> [!NOTE]
> Avec Svelte 5+, utilisez plutôt [`unmount`](svelte#unmount)

## Props de composant [!VO]Component props

```js
// @noErrors
component.prop;
```

```js
// @noErrors
component.prop = value;
```

Si un composant est compilé avec `accessors: tru`, chaque instance aura des getters et des setters
correspondant à chacune des props du composant. Définir une valeur déclenchera alors une mise à jour
_synchrone_ plutôt que la mise à jour par défaut asynchrone habituellement déclenchée par
`component.$set(...)`.

Par défaut, `accessors` vaut `false`, à moins que vous ne compiliez en tant qu'élément personnalisé.

```js
// @noErrors
console.log(component.count);
component.count += 1;
```

> [!NOTE]
> Avec Svelte 5+, ce concept est obsolète. Si vous souhaitez rendre des propriétés accessibles
> depuis l'extérieur, vous pouvez les `export`er

## API de composant côté serveur [!VO]Server-side component API

```js
// @noErrors
const result = Component.render(...)
```

À la différence des composants client, les composants serveur n'ont pas d'existence après leur rendu
– leur unique mission est de créer du HTML et du CSS. Pour cette raison, leur API est un peu
différente.

Un composant serveur expose une méthode `render` qui peut être appelée avec des props optionnelles.
Elle renvoie un objet avec des propriétés `head`, `html` et `css`, où `head` contient le contenu de
tous les éléments `<svelte:head>` rencontrés.

Vous pouvez importer un composant Svelte directement dans Node en utilisant `svelte/register`.

```js
// @noErrors
require('svelte/register');

const App = require('./App.svelte').default;

const { head, html, css } = App.render({
	answer: 42
});
```

La méthode `.render()` accepte les paramètres suivants :

| parameter | par défaut | description                                        |
| --------- | ---------- | -------------------------------------------------- |
| `props`   | `{}`       | Un objet de propriétés à fournir au composant      |
| `options` | `{}`       | Un objet d'options                                 |

L'objet `options` accepte les options suivantes :

| parameter | par défaut  | description                                                                           |
| --------- | ----------- | ------------------------------------------------------------------------------------- |
| `context` | `new Map()` | Une `Map` de paires clé-valeur représentant un contexte racine à fournir au composant |

```js
// @noErrors
const { head, html, css } = App.render(
	// props
	{ answer: 42 },
	// options
	{
		context: new Map([['context-key', 'context-value']])
	}
);
```

> [!NOTE]
> Avec Svelte 5+, utilisez plutôt [`render`](svelte-server#render)
