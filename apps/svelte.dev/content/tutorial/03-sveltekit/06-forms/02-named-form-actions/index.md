---
title: Actions de formulaire nommées
---

Une page qui possède une seule action est, en pratique, plutôt rare. La plupart du temps vous aurez
besoin d'avoir plusieurs actions sur la même page. Dans cette application, ajouter une tâche ne
suffit pas — nous aimerions pouvoir les supprimer une fois qu'elles sont terminées.

Commencez par remplacer notre action `default` avec les actions `create` et `delete` :

```js
/// file: src/routes/+page.server.js
export const actions = {
	+++create+++: async ({ cookies, request }) => {
		const data = await request.formData();
		db.createTodo(cookies.get('userid'), data.get('description'));
	}+++,+++

+++	delete: async ({ cookies, request }) => {
		const data = await request.formData();
		db.deleteTodo(cookies.get('userid'), data.get('id'));
	}+++
};
```

> [!NOTE] Les actions par défault (`default`) ne peuvent pas coexister avec les actions nommées.

L'élément `<form>` a un attribut optionnel `action`, qui est similaire à l'attribut `href` d'un
élément `<a>`. Mettez à jour le formulaire existant pour le faire pointer vers la nouvelle action
`create` :

```svelte
/// file: src/routes/+page.svelte
<form method="POST" +++action="?/create"+++>
	<label>
		ajouter une tâche :
		<input
			name="description"
			autocomplete="off"
		/>
	</label>
</form>
```

> [!NOTE] L'attribut `action` peut être n'importe quelle URL — si l'action était définie sur une
> autre page, vous pourriez avoir quelque chose comme `/todos?/create`. Puisque l'action est sur
> _cette_ page, nous pouvons omettre complètement le chemin, ce qui explique que l'attribut `action`
> a une valeur commençant par `?`.

Ensuite, nous souhaitons créer un formulaire pour chaque tâche, ainsi qu'un `<input>` caché qui
l'identifie de manière unique :

```svelte
/// file: src/routes/+page.svelte
<ul class="todos">
	{#each data.todos as todo (todo.id)}
		<li>
+++			<form method="POST" action="?/delete">
				<input type="hidden" name="id" value={todo.id} />
				<span>{todo.description}</span>
				<button aria-label="Marquer comme fait"></button>
			</form>+++
		</li>
	{/each}
</ul>
```
