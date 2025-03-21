---
title: Fonctions de chargement universelles
---

Dans une [section précédente sur le chargement](page-data), nous avons chargé des données sur le
serveur en utilisant les fichiers `+page.server.js` et `+layout.server.js`. C'est très pratique si
vous avez besoin de récupérez des données directement depuis une base de données, ou si vous
souhaitez lire les cookies.

Parfois cela n'a pas de sens de charger des données depuis le serveur lorsque vous naviguez via la
navigation côté client :
Par exemple :

- Vous chargez de données depuis une API externe
- Vous souhaitez utiliser des données stockées en mémoire si disponibles
- Vous souhaitez retarder la navigation tant qu'une image n'a pas été préchargée, pour éviter les
  apparitions soudaines
- Vous avez besoin de renvoyer depuis `load` quelque chose qui ne peut pas être sérialisé (SvelteKit
  utilise [devalue](https://github.com/Rich-Harris/devalue) pour transformer les données de serveur en
  JSON), comme un composant ou un store

Dans cet exercice, nous avons affaire à ce dernier cas. Les fonctions de serveur `load` dans les
fichiers `src/routes/red/+page.server.js`, `src/routes/green/+page.server.js` et
`src/routes/blue/+page.server.js` renvoient un constructeur de `component`, qui ne peut pas être
sérialisé en tant que données. Si vous naviguez vers `/red`, `/green` ou `/blue`, vous verrez une
erreur "Data returned from `load` ... is not serializable" s'afficher dans le terminal.

Pour transformer les fonctions `load` de serveur en fonctions `load` universelles, renommez chaque
fichier `+page.server.js` en `+page.js`. Désormais, les fonctions seront exécutées sur le serveur
pendant le rendu côté serveur, mais seront également exécutées dans le navigateur lorsque
l'application sera hydratée ou lorsque l'utilisateur navigue côté client.

Nous pouvons utiliser le `component` renvoyé depuis ces fonctions `load` comme tout autre valeur,
notamment dans `src/routes/+layout.svelte` :

```svelte
/// file: src/routes/+layout.svelte
<nav
	class={[page.data.color && 'has-color']}
	style:background={page.data.color ?? 'var(--bg-2)'}
>
	<a href="/">acuueil</a>
	<a href="/red">rouge</a>
	<a href="/green">vert</a>
	<a href="/blue">bleu</a>

+++	{#if page.data.component}
		<page.data.component />
	{/if}+++
</nav>
```

Voir la [documentation](/docs/kit/load#Universal-vs-server) pour en savoir plus sur la différence
entre les fonctions `load` de serveur et universelles, et quand utiliser l'une ou l'autre.
