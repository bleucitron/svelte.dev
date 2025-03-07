---
title: Pages
---

SvelteKit utilise un routeur basé sur votre système de fichiers, ce qui signifie que les _routes_ de
votre application — en d'autres termes, ce que l'application doit afficher lorsque quelqu'un navigue
vers une URL particulière — sont définies par les dossiers de votre projet.

Chaque fichier `+page.svelte` dans le dossier `src/routes` crée une page dans votre application.
Dans cet exemple, nous avons actuellement une seule page — `src/routes/+page.svelte`, qui est liée à
`/`. Si on navigue vers `/about`, une page d'erreur 404 Not Found s'affiche.

Corrigeons cela. Ajoutons une deuxième page, `src/routes/about/+page.svelte`, copions-y le contenu
de `src/routes/+page.svelte`, et modifions la :

```svelte
/// file: src/routes/about/+page.svelte
<nav>
	<a href="/">accueil</a>
	<a href="/about">à propos</a>
</nav>

<h1>+++à propos+++</h1>
<p>ceci est la page +++à propos+++.</p>
```

Nous pouvons maintenant naviguer entre les pages `/` et `/about`.

> [!NOTE] À la différence des applications multi-pages traditionnelles, faire des aller-retours
> entre la page `/about` et la page d'accueil (par exemple) met à jour le contenu de la page
> courante, comme pour une SPA. Ceci nous offre le meilleur des deux mondes — un premier rendu
> rapide grâce au rendu côté serveur, puis une navigation instantanée. (Ce comportement peut être
> [configuré](/docs/kit/page-options).)
