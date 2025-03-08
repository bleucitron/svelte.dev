---
title: Gestionnaires GET
---

SvelteKit vous permet de créer plus que de simples pages. Nous pouvons aussi créer des _routes
d'API_ en ajoutant un fichier `+server.js` qui exporte des fonctions correspondant aux méthodes HTTP
: `GET`, `PUT`, `POST`, `PATCH` et `DELETE`.

Cette application récupère des données depuis une route d'API `/roll` lorsque vous cliquez sur le
bouton. Créez cette route en ajoutant un fichier `src/routes/roll/+server.js` :

```js
/// file: src/routes/roll/+server.js
export function GET() {
	const number = Math.floor(Math.random() * 6) + 1;

	return new Response(number, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
```

Le clic sur le bouton fonctionne désormais.

Les gestionnaires de requête doivent renvoyer un objet
[Response](https://developer.mozilla.org/fr/docs/Web/API/Response/Response). Puisqu'il est courant
de renvoyer du JSON depuis une route d'API, SvelteKit fournit une fonction utilitaire pour générer
facilement ces réponses :

```js
/// file: src/routes/roll/+server.js
+++import { json } from '@sveltejs/kit';+++

export function GET() {
	const number = Math.floor(Math.random() * 6) + 1;

---	return new Response(number, {
		headers: {
			'Content-Type': 'application/json'
		}
	});---
+++	return json(number);+++
}
```
