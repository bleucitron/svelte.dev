---
title: handle
---

SvelteKit fournit différents _hooks_, qui sont des manières d'intercepter et surcharger le
comportement par défaut du framework.

Le hook le plus important est `handle`, qui se trouve dans `src/hooks.server.js`. Il reçoit un
objet `event` ainsi qu'une fonction `resolve`, et renvoie un objet
[`Response`](https://developer.mozilla.org/fr/docs/Web/API/Response).

`resolve` en est la pierre angulaire : SvelteKit fait correspondre l'URL de la requête entrante à
une route de votre application, importe le code correspondant (les fichiers `+page.server.js` et
`+page.svelte`, et ainsi de suite), charge les données requises par la route, et génère la réponse.

Le hook `handle` par défaut a cette tête là :

```js
/// file: src/hooks.server.js
export async function handle({ event, resolve }) {
	return await resolve(event);
}
```

Pour les pages (et donc pas pour les [routes d'API](get-handlers)), vous pouvez modifier le HTML
généré avec `transformPageChunk` :

```js
/// file: src/hooks.server.js
export async function handle({ event, resolve }) {
	return await resolve(event, {
+++		transformPageChunk: ({ html }) => html.replace(
			'<body',
			'<body style="color: hotpink"'
		)+++
	});
}
```

Vous pouvez aussi entièrement créer de nouvelles routes :

```js
/// file: src/hooks.server.js
export async function handle({ event, resolve }) {
+++	if (event.url.pathname === '/ping') {
		return new Response('pong');
	}+++

	return await resolve(event, {
		transformPageChunk: ({ html }) => html.replace(
			'<body',
			'<body style="color: hotpink"'
		)
	});
}
```
