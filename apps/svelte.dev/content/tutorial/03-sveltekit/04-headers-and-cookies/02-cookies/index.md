---
title: Lire et écrire des cookies
---

La fonction [`setHeaders`](headers) ne peut pas être utilisée pour définir l'en-tête `Set-Cookie`. À
la place, vous devez utiliser l'API `cookies`.

Dans vos fonctions `load`, vous pouvez lire un cookie avec `cookies.get(name, options)` :

```js
/// file: src/routes/+page.server.js
export function load(+++{ cookies }+++) {
	+++const visited = cookies.get('visited');+++

	return {
		visited: visited === 'true'
	};
}
```

Pour définir un cookie, utilisez `cookies.set(name, value, options)`. Il est fortement recommandé de
définir explicitement le `path` lorsque vous définissez un cookie, puisque le comportement par
défaut des navigateurs est de définir le cookie sur le chemin parent du chemin courant — ce qui est
plutôt inutile.

```js
/// file: src/routes/+page.server.js
export function load({ cookies }) {
	const visited = cookies.get('visited');

	+++cookies.set('visited', 'true', { path: '/' });+++

	return {
		visited: visited === 'true'
	};
}
```

Désormais, si vous rechargez l'iframe, `Bonjour étranger !` devient `Bonjour cher ami !`.

Appeler `cookies.set(name, ...)` déclenche l'écriture de l'en-tête `Set-Cookie`, mais va _aussi_
mettre à jour la map de cookies interne, impliquant que les appels suivants à `cookies.get(name)`
pendant la même requête renverrons la valeur à jour. Sous le capot, l'API `cookies` utilise le
paquet populaire `cookie` — les options passées à `cookies.get` et `cookies.set` correspondent aux
options de `parse` et `serialize` dans la [documentation](https://github.com/jshttp/cookie#api) de
`cookie`. SvelteKit définit les options suivantes par défaut pour sécuriser un peu plus vos cookies
:

```js
{
	httpOnly: true,
	secure: true,
	sameSite: 'lax'
}
```
