---
title: Définir les en-têtes
---

Dans une fonction `load` (ainsi que dans les [actions de formulaire](the-form-element), les
[hooks](handle) et les [routes d'API](get-handlers), que nous verrons plus tard), vous avez accès à
une fonction `setHeaders`, qui — sans suprise — peut être utilisée pour définir les en-têtes
(_headers_) sur la réponse.

Le plus souvent, cela sert à personnaliser le comportement de cache grâce à l'en-tête de réponse
[`Cache-Control`](https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Cache-Control), mais dans
le contexte de ce tutoriel nous allons plutôt faire quelque chose de moins recommandé et de plus
dramatique :

```js
/// file: src/routes/+page.server.js
export function load(+++{ setHeaders }+++) {
+++	setHeaders({
		'Content-Type': 'text/plain'
	});+++
}
```

(Il est possible que vous deviez recharger l'iframe pour en voir les effets.)
