---
title: Autres gestionnaires
---

Nous pouvons également ajouter des gestionnaires pour d'autres verbes HTTP. Ajouter une route
`/todo/[id]` en créant un fichier `src/routes/todo/[id]/+server.js` ayant les gestionaires `PUT` et
`DELETE` pour activer et supprimer les tâches, en utilisant les fonctions `toggleTodo` et
`deleteTodo` importées depuis `src/lib/server/database.js` :

```js
/// file: src/routes/todo/[id]/+server.js
import * as database from '$lib/server/database.js';

export async function PUT({ params, request, cookies }) {
	const { done } = await request.json();
	const userid = cookies.get('userid');

	await database.toggleTodo({ userid, id: params.id, done });
	return new Response(null, { status: 204 });
}

export async function DELETE({ params, cookies }) {
	const userid = cookies.get('userid');

	await database.deleteTodo({ userid, id: params.id });
	return new Response(null, { status: 204 });
}
```

Puisque nous n'avons pas besoin de renvoyer des données au navigateur, nous renvoyons un objet
[Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) vide avec un status [204 No
Content](https://http.dog/204).

Nous pouvons maintenant interagir avec ce endpoint au sein de notre gestionnaire d'évènement :

```svelte
/// file: src/routes/+page.svelte
<label>
	<input
		type="checkbox"
		checked={todo.done}
		onchange={async (e) => {
			const done = e.currentTarget.checked;

+++			await fetch(`/todo/${todo.id}`, {
				method: 'PUT',
				body: JSON.stringify({ done }),
				headers: {
					'Content-Type': 'application/json'
				}
			});+++
		}}
	/>
	<span>{todo.description}</span>
	<button
		aria-label="Marquer comme fait"
		onclick={async (e) => {
+++			await fetch(`/todo/${todo.id}`, {
				method: 'DELETE'
			});

			const todos = data.todos.filter((t) => t !== todo);

			data = { ...data, todos };+++
		}}
	></button>
</label>
```
