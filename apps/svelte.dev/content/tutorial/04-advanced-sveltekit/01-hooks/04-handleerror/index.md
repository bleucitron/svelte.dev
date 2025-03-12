---
title: handleError
---

Le hook `handleError` vous permet d'intercepter des erreurs imprévues et de déclencher certains
comportements, comme avertir un canal Slack ou envoyer des données vers un service de gestion des
logs.

Comme vous vous en souvenez d'un [précédent exercice](error-basics), une erreur est _imprévue_ si
elle n'a pas été créée avec l'utilitaire `error` importé depuis `@sveltejs/kit`. Cela signifie
généralement que quelque chose dans votre application doit être réparé. Le comportement par défaut
est de logguer sur le serveur :

```js
/// file: src/hooks.server.js
export function handleError({ event, error }) {
	console.error(error.stack);
}
```

Si vous naviguez vers `/the-bad-place`, vous verrez ceci en oeuvre — la page d'erreur est affichée,
et si vous ouvrez le terminal (en utilisant le bouton à droite de la barre d'URL), vous verrez le
message venant de `src/routes/the-bad-place/+page.server.js`.

Notez que nous ne montrons _pas_ le message d'erreur à l'utilisateur ou utilisatrice. En effet, les
messages d'erreurs peuvent inclure des informations sensibles qui au mieux vont ajouter de la
confusion, au pire pourraient profiter à d'éventuelles personnes mal intentionnées. Au lieu de ça,
l'objet d'erreur disponible dans votre application — représenté comme `page.error` dans vos pages
`+error.svelte`, ou dans `%sveltekit.error%` sur la page de secours `src/error.html` — est
simplement :

<!-- prettier-ignore-start -->
```js
{
	message: 'Internal Error' // ou 'Not Found' pour une 404
}
```
<!-- prettier-ignore-end -->

Dans certaines situations, vous pourriez vouloir personnaliser cet objet. Pour cela, vous pouvez
renvoyer un objet depuis `handleError` :

```js
/// file: src/hooks.server.js
export function handleError({ event, error }) {
	console.error(error.stack);

	return {
		message: 'tout va bien',
		code: 'JEREMYBEARIMY'
	};
}
```

Vous pouvez maintenant référencer des propriétés autres que `message` dans une page d'erreur
personnalisée. Créez le fichier `src/routes/+error.svelte` :

```svelte
/// file: src/routes/+error.svelte
<script>
	import { page } from '$app/state';
</script>

<h1>{page.status}</h1>
<p>{page.error.message}</p>
<p>code d'erreur : {page.error.code}</p>
```
