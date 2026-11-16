---
title: Bases
---

Il y a deux principaux types d'erreurs dans SvelteKit — les erreurs _d'application_ et les erreurs
_inconnues_.

Une erreur d'application est une erreur ayant été jetée via l'utilitaire
[`error`](/docs/kit/@sveltejs-kit#error) importé depuis `@sveltejs/kit`, comme dans
`src/routes/app/+page.server.js` :

```js
/// file: src/routes/app/+page.server.js
import { error } from '@sveltejs/kit';

export function load() {
	error(420, 'Gardez votre calme');
}
```

Toute autre erreur — comme celle dans `src/routes/unknown/+page.server.js` — est traitée comme
une erreur imprévue :

```js
/// file: src/routes/unknown/+page.server.js
export function load() {
	throw new Error('Boum !');
}
```

Lorsque vous jetez une erreur d'application, vous dites à SvelteKit "t'inquiète pas, je sais ce que
je fais". Une erreur inconnue, au contraire, est supposée comme étant un bug de votre application.
Lorsqu'une erreur inconnue est jetée, son message et sa trace seront loguées dans la console.

> [!NOTE] Dans un chapitre à venir, nous verrons comment ajouter une gestion d'erreur personnalisée
> en utilisant le hook `handleError`.

Si vous cliquez sur les liens de cette application, vous remarquerez une différence importante : le
message de l'erreur d'application est affiché à l'utilisateur, tandis que le message de l'erreur
inconnue est remplacé par un message générique "Internal Error" et un statut 500. Nous faisons cela
car les messages d'erreur peuvent contenir des données sensibles.
