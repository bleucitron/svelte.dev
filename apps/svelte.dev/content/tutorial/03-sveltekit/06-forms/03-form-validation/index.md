---
title: Validation
---

Les utilisateurs et utilisatrices sont des personnes malicieuses, et peuvent soumettre tout type de
données n'ayant pas toujours du sens si on leur en laisse l'opportunité. Pour les empêcher de
provoquer le chaos, il est important de valider les données de formulaire.

La première ligne de défense est la [validation intégrée des
formulaires](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#using_built-in_form_validation)
du navigateur, qui permet facilement, par exemple, de définir un `<input>` comme requis :

```svelte
/// file: src/routes/+page.svelte
<form method="POST" action="?/create">
	<label>
		ajouter une tâche
		<input
			name="description"
			autocomplete="off"
			+++required+++
		/>
	</label>
</form>
```

Essayer d'appuyer sur Entrée alors que l'`<input>` est vide.

Ce genre de validation est utile, mais ne suffit pas. Certaines règles de validation (comme
l'unicité par exemple) ne peuvent pas être exprimées avec des attributs d'`<input>`, et dans tous
les cas, si l'utilisateur ou l'utilisatrice est une hackeuse chevronnée, elle pourrait tout à fait
supprimer les attributs en question en utilisant les outils de développement du navigateur. Pour
empêcher ce genre de filouteries, vous devriez systématiquement mettre en place de la validation
côté serveur.

Dans le fichier `src/lib/server/database.js`, validez que la description existe et est unique :

```js
/// file: src/lib/server/database.js
export function createTodo(userid, description) {
+++	if (description === '') {
		throw new Error('une tâche doit avoir une description');
	}+++

	const todos = db.get(userid);

+++	if (todos.find((todo) => todo.description === description)) {
		throw new Error('chaque tâche doit être unique');
	}+++

	todos.push({
		id: crypto.randomUUID(),
		description,
		done: false
	});
}
```

Essayez de soumettre une tâche dupliquée. Beurk ! SvelteKit nous amène vers une page d'erreur
bizarre et peu accueillante. Sur le serveur, nous avons défini une erreur "chaque tâche doit être
unique" mais SvelteKit cache les messages d'erreurs inattendues aux utilisateurs et utilisatrices
car ils pourraient contenir des données sensibles.

Il serait bien mieux de rester sur la même page et de fournir une indication de ce qui ne va pas
afin que la personne puisse corriger le problème. Pour faire cela, nous pouvons utiliser la fonction
`fail` fournie par SvelteKit pour renvoyer des données depuis l'action avec un code HTTP approprié :

```js
/// file: src/routes/+page.server.js
+++import { fail } from '@sveltejs/kit';+++
import * as db from '$lib/server/database.js';

export function load({ cookies }) {...}

export const actions = {
	create: async ({ cookies, request }) => {
		const data = await request.formData();

+++		try {+++
			db.createTodo(cookies.get('userid'), data.get('description'));
+++		} catch (error) {
			return fail(422, {
				description: data.get('description'),
				error: error.message
			});
		}+++
	}
```

Dans le fichier `src/routes/+page.svelte`, nous pouvons accéder à la valeur renvoyée via la prop
`form`, qui est remplie uniquement après la soumission d'un formulaire :

```svelte
/// file: src/routes/+page.svelte
<script>
	let { data, +++form+++ } = $props();
</script>

<div class="centered">
	<h1>todos</h1>

	+++{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}+++

	<form method="POST" action="?/create">
		<label>
			ajouter une tâche :
			<input
				name="description"
				+++value={form?.description ?? ''}+++
				autocomplete="off"
				required
			/>
		</label>
	</form>
```

> [!NOTE] Vous pouvez aussi renvoyer des données depuis une action _sans_ les entourer de `fail` —
> par exemple pour afficher un message "succès !" lorsque des données ont été enregistrées avec
> succès — ces données seront également fournies dans la prop `form`.
