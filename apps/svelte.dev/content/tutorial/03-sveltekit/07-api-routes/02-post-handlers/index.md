---
title: Gestionnaires POST
---

Vous pouvez également ajouter des gestionnaires qui mutent les données, comme `POST`. Dans la
plupart des cas, vous devriez plutôt utiliser les [actions de formulaire](the-form-element) — vous
écrirez moins de code, et cela fonctionnera sans JavaScript, rendant votre application plus
résiliente.

Dans le gestionnaire d'évènement `keydown` de l'`<input>` "ajouter une tâche", envoyons des données
au serveur :

```svelte
/// file: src/routes/+page.svelte
<input
	type="text"
	autocomplete="off"
	onkeydown={async (e) => {
		if (e.key !== 'Enter') return;

		const input = e.currentTarget;
		const description = input.value;

+++		const response = await fetch('/todo', {
			method: 'POST',
			body: JSON.stringify({ description }),
			headers: {
				'Content-Type': 'application/json'
			}
		});+++

		input.value = '';
	}}
/>
```

Ici, nous envoyons du JSON à la route d'API `/todo` — en utilisant le `userid` venant des cookies de
l'utilisateur — et nous recevons en réponse l'`id` de la nouvelle tâche créée.

Créez la route `/todo` en ajoutant un fichier `src/routes/todo/+server.js` avec un gestionnaire
`POST` qui appelle `createTodo` importé depuis `src/lib/server/database.js` :

```js
/// file: src/routes/todo/+server.js
import { json } from '@sveltejs/kit';
import * as database from '$lib/server/database.js';

export async function POST({ request, cookies }) {
	const { description } = await request.json();

	const userid = cookies.get('userid');
	const { id } = await database.createTodo({ userid, description });

	return json({ id }, { status: 201 });
}
```

Comme avec les fonctions `load` et les actions de formulaire, la `request` est un objet
[Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) standard ; `await
request.json()` fournit les données que nous avons envoyées depuis le gestionnaire d'évènement.

Nous renvoyons une réponse avec un statut [201 Created](https://http.dog/201) ainsi que l'`id` de la
nouvelle tâche créée dans notre base. En revenant au niveau du gestionnaire d'évènement, nous
pouvons utiliser cette valeur pour mettre à jour la page :

```svelte
/// file: src/routes/+page.svelte
<input
	type="text"
	autocomplete="off"
	onkeydown={async (e) => {
		if (e.key !== 'Enter') return;

		const input = e.currentTarget;
		const description = input.value;

		const response = await fetch('/todo', {
			method: 'POST',
			body: JSON.stringify({ description }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

+++		const { id } = await response.json();

		const todos = [...data.todos, {
			id,
			description
		}];

		data = { ...data, todos };+++

		input.value = '';
	}}
/>
```

> [!NOTE] Vous devriez toujours uniquement mettre à jour `data` de sorte à récupérer le même
> résultat que si vous aviez rechargé la page. La prop `data` n'est pas _profondément_ réactive, ce
> qui implique que vous devez la remplacer par une nouvelle valeur — les mutations comme `data.todos
= todos` ne vont pas provoquer de re-rendu.
