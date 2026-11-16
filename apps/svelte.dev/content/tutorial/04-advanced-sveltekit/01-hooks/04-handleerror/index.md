---
title: handleError
---

Le hook `handleError` vous permet d'intercepter les erreurs et de déclencher certains
comportements, comme avertir un canal Slack ou envoyer des données vers un service de gestion des
logs.

Comme vous vous en souvenez d'un [précédent exercice](error-basics), une erreur est _inconnue_ si
elle n'a pas été créée avec l'utilitaire `error` importé depuis `@sveltejs/kit`. Cela signifie
généralement que quelque chose dans votre application doit être réparé. Le comportement par défaut
est de logguer sur le serveur :

Toute erreur est fournie à `handleError`. La propriété `kind` vous indique si elle est originaire de
votre application via `error(...)` (`'app'`), de SvelteKit (`'framework'`), d'une validation de
fonction distante (`'validation'`, uniquement sur le serveur), ou d'une source inconnue
(`'unknown'`). Le comportement par défaut est d'afficher les erreurs inconnues :

```js
/// file: src/hooks.server.js
export function handleError({ kind, error }) {
	if (kind === 'unknown') {
		console.error(error);
	}
}
```

Si vous naviguez vers `/the-bad-place`, vous verrez ceci en oeuvre — la page d'erreur est affichée,
et si vous ouvrez le terminal (en utilisant le bouton à droite de la barre d'URL), vous verrez le
message venant de `src/routes/the-bad-place/+page.server.js`.

Notez que nous ne montrons _pas_ le message d'erreur à l'utilisateur ou utilisatrice. En effet, les
messages d'erreurs peuvent inclure des informations sensibles qui au mieux vont ajouter de la
confusion, au pire pourraient profiter à d'éventuelles personnes mal intentionnées. Au lieu de ça,
l'objet [`App.Error`](/docs/kit/types#Error) disponible dans votre application — représenté comme
`page.error` dans vos pages `+error.svelte`, et utilisé pour remplir `%sveltekit.error.message%`
dans vos page de secours `src/error.html` — est simplement ceci pour les erreurs inconnues :

<!-- prettier-ignore-start -->
```js
{
	status: 500,
	message: 'Internal Error'
}
```
<!-- prettier-ignore-end -->

Dans certaines situations, vous pourriez vouloir personnaliser cet objet. Pour cela, vous pouvez
renvoyer un objet depuis `handleError` pour les erreurs `unknown` :

```js
/// file: src/hooks.server.js
export function handleError({ kind, error }) {
	if (kind === 'unknown') {
		console.error(error);

		+++return {
			message: 'tout va bien',
			code: 'JEREMYBEARIMY'
		};+++
	}
}
```

Puisque le `status` est omis, il garde sa valeur par défaut `500`. Vous pouvez renvoyer un `status`
différent si vous souhaitez changer le statut utilisé pour afficher la page d'erreur.

Pour les erreurs d'application, de framework ou de validation, ne rien renvoyer depuis `handleError`
préserve leurs valeurs `status`, `message` et autres propriétés existantes sécurisées.

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
