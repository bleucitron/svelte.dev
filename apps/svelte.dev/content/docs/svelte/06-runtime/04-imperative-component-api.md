---
title: API de composant impérative
---

<!-- better title needed?

- mount
- unmount
- render
- hydrate
- how they interact with each other -->

Chaque application Svelte débute par créer un composant racine de manière impérative. Sur le client
ce composant racine est monté sur un élément spécifique. Sur le serveur, vous souhaitez plutôt
renvoyer une chaîne de caractères HTML à construire plus tard. Les fonctions suivantes vous aident à
réaliser ces actions.

## `mount`

Instancie un composant et le monte sur la cible fournie :

```js
// @errors: 2322
import { mount } from 'svelte';
import App from './App.svelte';

const app = mount(App, {
	target: document.querySelector('#app'),
	props: { some: 'property' }
});
```

Vous pouvez monter plusieurs composants par page, et vous pouvez également monter des composants
depuis votre application, par exemple lorsque vous créez un composant d'infobulle et voulez
l'attacher à l'élément survolé.

Notez les effets (dont les callbacks `onMount` et les fonctions d'action) ne seront pas exécutés
lors de l'exécution de `mount` ce qui est au contraire le cas lors de l'exécution de `new App(...)`
en Svelte 4. Si vous avez besoin de forcer l'exécution d'effets en attente (par exemple dans le
contexte d'un test par exemple), vous pouvez le faire grâce à `flushSync()`.

## `unmount`

Démonte un composant créé avec [`mount`(#mount)] ou [`hydrate`](#hydrate) :

```js
// @errors: 1109
import { mount, unmount } from 'svelte';
import App from './App.svelte';

const app = mount(App, {...});

// plus tard...
unmount(app);
```

## `render`

Seulement disponible sur le serveur et lorsque vous compilez avec l'option `server`. Prend un
composant en argument et renvoie un objet avec des propriétés `body` et `head`, qui vous pouvez
utiliser pour remplir le HTML lorsque vous effectuez le rendu côté serveur de votre application :

```js
// @errors: 2724 2305 2307
import { render } from 'svelte/server';
import App from './App.svelte';

const result = render(App, {
	props: { some: 'property' }
});
result.body; // HTML à mettre quelque part dans une balise `<body>`
result.head; // HTML à mettre quelque part dans une balise `<head>`
```

## `hydrate`

Similaire à `mount`, mais va réutiliser tout HTML construit par le rendu côté serveur de Svelte
(venant de la fonction [`render`(#render)]) au sein de l'élément cible, puis le rendre interactif :

```js
// @errors: 2322
import { hydrate } from 'svelte';
import App from './App.svelte';

const app = hydrate(App, {
	target: document.querySelector('#app'),
	props: { some: 'property' }
});
```

Comme pour `mount`, les effets ne seront pas exécutées lors de l'exécution de `hydrate` – exécutez
`flushSync()` immédiatement après si vous en avez besoin.
