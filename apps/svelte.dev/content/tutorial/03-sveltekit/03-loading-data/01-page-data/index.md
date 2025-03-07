---
title: Données de page
path: /blog
---

Au final, le travail de SvelteKit se résume à trois choses :

1. **Routing** — déterminer quelle route correspond à une requête entrante
2. **Chargement** — récupérer les données nécessaires à l'affichage de la route
3. **Affichage** — générer le HTML (sur le serveur) ou mettre à jour le DOM (dans le navigateur)

Nous avons vu comment le routing et l'affichage fonctionnaient. Parlons maintenant de la partie du
milieu — le chargement.

Chaque page de votre application peut déclarer une fonction `load` dans un fichier `+page.server.js`
défini à côté d'un fichier `+page.svelte`. Comme le nom du fichier l'indique, ce module est
uniquement exécuté sur le serveur, même pour les navigations côté client. Ajoutons un fichier
`src/routes/blog/+page.server.js` afin de remplacer les liens définis en dur dans
`src/routes/blog/+page.svelte` par des vraies données d'articles de blog :

```js
/// file: src/routes/blog/+page.server.js
import { posts } from './data.js';

export function load() {
	return {
		summaries: posts.map((post) => ({
			slug: post.slug,
			title: post.title
		}))
	};
}
```

> [!NOTE] Dans le cadre de ce tutoriel, nous importons des données depuis `src/routes/blog/data.js`.
> Dans une vraie application, il est probable que vous chargiez ces données depuis une base de
> données ou un CMS, mais pour le moment nous le ferons de cette manière.

Nous pouvons accéder à ces données dans `src/routes/blog/+page.svelte` via la prop `data` :

```svelte
/// file: src/routes/blog/+page.svelte
+++<script>
	let { data } = $props();
</script>+++

<h1>blog</h1>

<ul>
---	<li><a href="/blog/one">un</a></li>
	<li><a href="/blog/two">deux</a></li>
	<li><a href="/blog/three">trois</a></li>---
+++	{#each data.summaries as { slug, title }}
		<li><a href="/blog/{slug}">{title}</a></li>
	{/each}+++
</ul>
```

Faisons maintenant la même chose pour la page d'article :

```js
/// file: src/routes/blog/[slug]/+page.server.js
import { posts } from '../data.js';

export function load({ params }) {
	const post = posts.find((post) => post.slug === params.slug);

	return {
		post
	};
}
```

```svelte
/// file: src/routes/blog/[slug]/+page.svelte
+++<script>
	let { data } = $props();
</script>+++

---<h1>blog post</h1>---
+++<h1>{data.post.title}</h1>
<div>{@html data.post.content}</div>+++
```

Il y a un dernier détail dont il faut s'occuper — l'utilisateur ou utilisatrice pourrait visiter une
page ayant une URL invalide, comme `/blog/nope`, et dans ce cas nous aimerions lui répondre une page
404 :

```js
/// file: src/routes/blog/[slug]/+page.server.js
+++import { error } from '@sveltejs/kit';+++
import { posts } from '../data.js';

export function load({ params }) {
	const post = posts.find((post) => post.slug === params.slug);

	+++if (!post) error(404);+++

	return {
		post
	};
}
```

Nous verrons la gestion des erreurs plus en détail dans des exercices à venir.
