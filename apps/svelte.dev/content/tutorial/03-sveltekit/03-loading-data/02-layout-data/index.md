---
title: Données de layout
path: /blog
---

Tout comme les fichiers `+layout.svelte` créent de l'interface pour chaque route enfant, les
fichiers `+layout.server.js` chargent des données pour chaque route enfant.

Supposons que nous aimerions ajouter une barre "plus d'articles" à notre page d'article. Nous
_pourrions_ renvoyer `summaries` depuis notre fonction `load` du fichier
`src/routes/blog/[slug]/+page.server.js`, comme nous le faisons dans
`src/routes/blog/+page.server.js`, mais cela serait répétitif.

Nous allons plutôt renommer `src/routes/blog/+page.server.js` en
`src/routes/blog/+layout.server.js`. Notez que la route `/blog` continue de fonctionner —
`data.summaries` est toujours disponible dans la page.

Maintenant, ajoutons une barre latérale dans le layout de notre page d'articles :

```svelte
/// file: src/routes/blog/[slug]/+layout.svelte
<script>
	let { data, children } = $props();
</script>

<div class="layout">
	<main>
		{@render children()}
	</main>

+++	<aside>
		<h2>Plus d'articles</h2>
		<ul>
			{#each data.summaries as { slug, title }}
				<li>
					<a href="/blog/{slug}">{title}</a>
				</li>
			{/each}
		</ul>
	</aside>+++
</div>

<style>
	@media (min-width: 640px) {
		.layout {
			display: grid;
			gap: 2em;
			grid-template-columns: 1fr 16em;
		}
	}
</style>
```

Le layout (et toute page sous ce layout) hérite de `data.summaries` venant du `+layout.server.js`
parent.

Lorsque nous naviguons d'un article à l'autre, nous avons uniquement besoin de charger les données
de l'article lui-même — les données de layout sont toujours valides. Voir la documentation sur
l'[invalidation](/docs/kit/load#Rerunning-load-functions) pour en apprendre plus.
