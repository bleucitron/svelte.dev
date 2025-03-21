---
title: Groupes de routes
---

Comme nous l'avons vu dans l'[introduction sur le routing](/tutorial/kit/layouts), les layouts sont
un moyen de partager de l'interface et de la logique de données entre différentes routes.

Parfois, il est utile d'utiliser des layouts sans impacter la route — par exemple, vous pourriez
avoir besoin que les routes `/app` et `/account` soient derrière une authentification, tandis que
votre page `/about` soit ouverte à tout le monde. On peut faire ça avec un _groupe de routes_, qui
est un simple dossier entre parenthèses.

Créez un groupe `(authed)` en renommant `account` en `(authed)/account` et `app` en `(authed)/app`.

Désormais, nous pouvons contrôler l'accès à ces routes en créant
`src/routes/(authed)/+layout.server.js` :

```js
/// file: src/routes/(authed)/+layout.server.js
import { redirect } from '@sveltejs/kit';

export function load({ cookies, url }) {
	if (!cookies.get('logged_in')) {
		redirect(303, `/login?redirectTo=${url.pathname}`);
	}
}
```

Si vous essayez de visiter ces pages, vous serez dirigé•e vers la route `/login` qui a une action de
formulaire dans `src/routes/login/+page.server.js` qui définit le cookie `logged_in`.

Nous pouvons également ajouter de l'interface à ces deux routes en ajoutant un fichier
`src/routes/(authed)/+layout.svelte` :

```svelte
/// file: src/routes/(authed)/+layout.svelte
<script>
	let { children } = $props();
</script>

{@render children()}

<form method="POST" action="/logout">
	<button>se déconnecter</button>
</form>
```
