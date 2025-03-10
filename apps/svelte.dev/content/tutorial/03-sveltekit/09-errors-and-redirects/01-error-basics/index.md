---
title: Bases
---

Il y a deux types d'erreurs dans SvelteKit — les erreurs _prévues_ et les erreurs _imprévues_.

Une erreurs prévue est une erreur ayant été jetée via l'utilitaire
[`error`](/docs/kit/@sveltejs-kit#error) importé depuis `@sveltejs/kit`, comme dans
`src/routes/expected/+page.server.js` :

```js
/// file: src/routes/expected/+page.server.js
import { error } from '@sveltejs/kit';

export function load() {
	error(420, 'Gardez votre calme');
}
```

Toute autre erreur — comme celle dans `src/routes/unexpected/+page.server.js` — est traitée comme
une erreur imprévue :

```js
/// file: src/routes/unexpected/+page.server.js
export function load() {
	throw new Error('Boum !');
}
```

Lorsque vous jetez une erreur prévue, vous dites à SvelteKit "t'inquiète pas, je sais ce que je
fais". Une erreur imprévue, au contraire, est supposée comme étant un bug de votre application.
Lorsqu'une erreur imprévue est jetée, son message et sa trace seront loguées dans la console.

> [!NOTE] Dans un chapitre à venir, nous verrons comment ajouter une gestion d'erreur personnalisée
> en utilisant le hook `handleError`.

Si vous cliquez sur les liens de cette application, vous remarquerez une différence importante : le
message de l'erreur prévue est affiché à l'utilisateur, tandis que le message de l'erreur imprévue
est remplacé par un message générique "Internal Error" et un statut 500. Nous faisons cela car les
messages d'erreur peuvent contenir des données sensibles.
