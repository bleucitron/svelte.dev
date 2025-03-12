---
title: handleFetch
---

L'objet `event` a une méthode `fetch` qui se comporte comme l'[API Fetch
standard](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), avec des supers pouvoirs :

- elle peut servir à faire des requêtes authentifiées sur le serveur, puisqu'elle hérite des
en-têtes `cookie` et `authorization` de la requête entrante
- elle peut générer des requêtes relatives sur le serveur (normalement, `fetch` nécessite une URL
possédant une origine lorsqu'utilisée dans un contexte serveur)
- les requêtes internes (par ex. pour les routes `+server.js`) vont directement exécuter la fonction
	de gestion concernée lorsqu'exécutées sur le serveur, sans le surcoût d'un appel HTTP

Son comportement peut être modifié avec le hook `handleFetch`, qui par défaut ressemble à ça :

```js
/// file: src/hooks.server.js
export async function handleFetch({ event, request, fetch }) {
	return await fetch(request);
}
```

Par exemple, nous pourrions répondre aux requêtes demandant `src/routes/a/+server.js` avec des
réponses venant de `src/routes/b/+server.js` :

```js
/// file: src/hooks.server.js
export async function handleFetch({ event, request, fetch }) {
+++	const url = new URL(request.url);
	if (url.pathname === '/a') {
		return await fetch('/b');
	}+++

	return await fetch(request);
}
```

Plus tard, lorsque nous traiterons des [fonctions `load` universelles](universal-load-functions),
nous verrons que `event.fetch` peut aussi être appelée depuis le navigateur. Dans ce cas-là,
`handleFetch` est utile si vous avez des requêtes vers une URL publique comme
`https://api.yourapp.com` qui devraient être redirigées vers une URL interne (en évitant les
éventuels proxies et gestionnaires de charge qui pourraient se trouver entre le serveur d'API et
l'internet public) lorsqu'exécutées sur le serveur.
