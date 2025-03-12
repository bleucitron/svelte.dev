---
title: L'objet RequestEvent
---

L'objet `event` passé à `handle` est le même objet — une instance de
[`RequestEvent`](/docs/kit/@sveltejs-kit#RequestEvent) — que celui passé aux [routes
d'API](get-handlers) dans les fichiers `+server.js`, aux [actions de formulaires](the-form-element)
dans les fichiers `+page.server.js`, et aux fonctions `load` dans les fichiers `+page.server.js` et
`+layout.server.js`.

Il contient des propriétés et méthodes utiles, dont certaines que nous avons déjà rencontré :

- `cookies` — l'[API cookies](cookies)
- `fetch` — l'[API Fetch](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API) standard, avec
  des supers pouvoirs
- `getClientAddress()` — une fonction pour récupérer l'adresse IP du client
- `isDataRequest` — `true` si le navigateur demande des données pour une page pendant une navigation
  côté client, `false` si une page/route est requêtée directement
- `locals` — un endroit pour mettre des données arbitraires
- `params` — les paramètres de route
- `request` — l'objet [Request](https://developer.mozilla.org/fr/docs/Web/API/Request)
- `route` — un objet avec une propriété `id` représentant la route correspondante
- `setHeaders(...)` — une fonction pour [définir les en-têtes HTTP](headers) de la réponse
- `url` — un objet [URL](https://developer.mozilla.org/fr/docs/Web/API/URL) représentant la requête
  courante

Un cas d'usage classique est l'ajout de données dans `event.locals` via `handle` afin que ces
données soient lues dans les fonctions `load` à venir :

```js
/// file: src/hooks.server.js
export async function handle({ event, resolve }) {
	+++event.locals.answer = 42;+++
	return await resolve(event);
}
```

```js
/// file: src/routes/+page.server.js
export function load(+++event+++) {
	return {
		message: `la réponse est ${+++event.locals.answer+++}`
	};
}
```
