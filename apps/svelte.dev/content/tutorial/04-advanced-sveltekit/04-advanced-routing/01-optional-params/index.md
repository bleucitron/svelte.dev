---
title: Paramètres optionnels
---

Dans le premier chapitre sur le [routing](/tutorial/kit/pages), nous avons vu comment créer des
routes avec des [paramètres dynamiques](/tutorial/kit/params).

Parfois, il est pratique de pouvoir rendre un paramètre optionnel. Un exemple classique est lorsque
vous utilisez le chemin pour déterminer la locale — `/fr/...`, `/de/...` et ainsi de suite — mais
vous souhaitez aussi avoir une locale par défaut.

Pour faire cela, nous utilisons des doubles crochets. Renommez le dossier `[lang]` en `[[lang]]`.

L'application échoue à se compiler, car `src/routes/+page.svelte` et
`src/routes/[[lang]]/+page.svelte` correspondent toutes les deux à la route `/`. Supprimez
`src/routes/+page.svelte`. (Il est possible que vous deviez recharger l'application pour ne plus
avoir la page d'erreur).

Enfin, modifiez `src/routes/[[lang]]/+page.server.js` pour préciser la locale par défaut :

```js
/// file: src/routes/[[lang]]/+page.server.js
const greetings = {
	en: 'hello!',
	de: 'hallo!',
	fr: 'bonjour!'
};

export function load({ params }) {
	return {
		greeting: greetings[params.lang +++?? 'fr'+++]
	};
}
```
