---
title: Layouts
---

Différentes routes de votre application partagent en général des bouts d'interface. Plutôt que de
répéter le code de ces interfaces dans chaque composant `+page.svelte`, nous pouvons utiliser un
composant `+layout.svelte` qui s'applique à toutes les routes du même dossier.

Dans cet exemple, nous avons deux routes, `src/routes/+page.svelte` et
`src/routes/about/+page.svelte`, qui contiennent la même interface de navigation. Créeons un nouveau
fichier, `src/routes/+layout.svelte`...

```
src/routes/
├ about/
│ └ +page.svelte
+++├ +layout.svelte+++
└ +page.svelte
```

... et déplaçons le contenu dupliqué des fichiers `+page.svelte` dans le nouveau fichier
`+layout.svelte`. La balise `{@render children()}` est l'endroit où le contenu de la page sera
affiché :

```svelte
/// file: src/routes/+layout.svelte
<script>
	let { children } = $props();
</script>

<nav>
	<a href="/">accueil</a>
	<a href="/about">à propos</a>
</nav>

{@render children()}
```

Un fichier `+layout.svelte` s'applique à toutes les routes enfant, incluant la route `+page.svelte`
se trouvant au même niveau (si elle existe). Vous pouvez imbriquer des layouts sur un nombre
indéfini de niveaux.
