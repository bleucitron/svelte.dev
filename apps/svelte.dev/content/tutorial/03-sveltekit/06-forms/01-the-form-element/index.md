---
title: L'élément <form>
---

Dans le chapitre sur le [chargement des données](page-data), nous avons vu comment récupérer des
données venant du serveur dans le navigateur. Parfois, vous avez besoin d'envoyer des données dans
la direction opposée, et c'est là que `<form>` — la méthode native de la plateforme web de soumettre
des données — rentre en jeu.

Construisons une application de Todo. Nous avons déjà une base de données en mémoire définie dans
`src/lib/server/database.js`, et notre fonction `load` de `src/routes/+page.server.js` utilise l'API
[`cookies`](/docs/kit/load#Cookies) afin d'avoir une liste par utilisateur, mais nous avons besoin
d'un `<form>` pour ajouter de nouveaux éléments :

```svelte
/// file: src/routes/+page.svelte
<h1>todos</h1>

+++<form method="POST">
	<label>
		ajouter un élément :
		<input
			name="description"
			autocomplete="off"
		/>
	</label>
</form>+++

<ul class="todos">
```

Si nous entrons quelque chose dans l'élément `<input>` et que nous appuyons sur Entrée, la
navigateur fait une requête POST (grâce à l'attribut `method="POST"`) vers la route courante. Mais
cela renvoie une erreur car nous n'avons pas créé d'_action_ sur le serveur permettant de gérer
cette request POST. Faisons ça maintenant :

```js
/// file: src/routes/+page.server.js
import * as db from '$lib/server/database.js';

export function load({ cookies }) {
	// ...
}

+++export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		db.createTodo(cookies.get('userid'), data.get('description'));
	}
};+++
```

Le contenu de `request` est un objet
[Request](https://developer.mozilla.org/fr/docs/Web/API/Request) standard ; `await
request.formData()` renvoie une instance de
[`FormData`](https://developer.mozilla.org/fr/docs/Web/API/FormData).

Lorsque nous appuyons maintenant sur Entrée, la base de données est mise à jour et la page se
recharge avec les nouvelles données.

Notez que nous n'avons pas eu besoin d'écrire de code impliquant `fetch` ou similaire — les données
se mettent à jour automatiquement. Et puis nous avons utilisé un élément `<form>`, cette
application fonctionnerait même si JavaScript était désactivé ou indisponible.
