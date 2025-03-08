---
title: Personnaliser use:enhance
---

Avec `use:enhance`, nous pouvons aller plus loin que simplement nous contenter d'émuler le
comportement natif du navigateur. En fournissant un callback, nous pouvons ajouter des choses comme
des **états d'attente** et des **interfaces optimistes**. Simulons un réseau dégradé en ajoutant un
retard artificiel sur nos deux actions :

```js
/// file: src/routes/+page.server.js
export const actions = {
	create: async ({ cookies, request }) => {
		+++await new Promise((fulfil) => setTimeout(fulfil, 1000));+++
		...
	},

	delete: async ({ cookies, request }) => {
		+++await new Promise((fulfil) => setTimeout(fulfil, 1000));+++
		...
	}
};
```

Lorsque nous créons ou supprimons des tâches, cela prend maintenant une seconde complète avant que
l'interface ne se mette à jour, laissant l'utilisateur ou l'utilisatrice le temps de se demander si
quelque chose ne va pas. Pour résoudre cela, ajoutons un état local...

```svelte
/// file: src/routes/+page.svelte
<script>
	import { fly, slide } from 'svelte/transition';
	import { enhance } from '$app/forms';

	let { data, form } = $props();

+++	let creating = $state(false);
	let deleting = $state([]);+++
</script>
```

... et activons `creating` dans le premier `use:enhance` :

```svelte
/// file: src/routes/+page.svelte
<form
	method="POST"
	action="?/create"
+++	use:enhance={() => {
		creating = true;

		return async ({ update }) => {
			await update();
			creating = false;
		};
	}}+++
>
	<label>
		ajouter une tâche :
		<input
			+++disabled={creating}+++
			name="description"
			value={form?.description ?? ''}
			autocomplete="off"
			required
		/>
	</label>
</form>
```

Nous pouvons alors afficher un message pendant que les données sont enregistrées :

```svelte
/// file: src/routes/+page.svelte
<ul class="todos">
	<!-- ... -->
</ul>

+++{#if creating}
	<span class="saving">sauvegarde en cours...</span>
{/if}+++
```

Pour ce qui est des suppressions, nous n'avons pas vraiment besoin d'attendre que le serveur valide
quelque chose — nous pouvons juste mettre à jour l'interface immédiatement :

```svelte
/// file: src/routes/+page.svelte
<ul class="todos">
	{#each +++data.todos.filter((todo) => !deleting.includes(todo.id))+++ as todo (todo.id)}
		<li in:fly={{ y: 20 }} out:slide>
			<form
				method="POST"
				action="?/delete"
				+++use:enhance={() => {
					deleting = [...deleting, todo.id];
					return async ({ update }) => {
						await update();
						deleting = deleting.filter((id) => id !== todo.id);
					};
				}}+++
			>
				<input type="hidden" name="id" value={todo.id} />
				<button aria-label="Marquer comme fait">✔</button>

				{todo.description}
			</form>
		</li>
	{/each}
</ul>
```

> [!NOTE] `use:enhance` est très personnalisable — vous pouvez annuler des soumissions avec
> `cancel()`, gérer les redirections, contrôler la réinitialisation du formulaire, parmi d'autres.
> [Voir la documentation](/docs/kit/$app-forms#enhance) pour plus de détails.
