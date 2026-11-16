---
title: "L\'import de sous-chemin #lib"
---

Puisque SvelteKit utilise un routeur basé sur le système de fichiers, il est naturel de placer les
modules et les composants au niveau des routes qui les utilisent. Une bonne habitude est de "mettre
le code là où il est utilisé".

Parfois, un même code peut être utilisé en plusieurs endroits. Lorsque cela arrive, il est pratique
de pouvoir mettre ce code dans un endroit accessible par toutes les routes sans avoir besoin de
préfixer les imports avec `../../../../`. Dans cet application, le fichier `package.json` déclare un
[import de sous-chemin de paquet](https://nodejs.org/api/packages.html#subpath-imports) qui pointe
`#lib/*` vers le dossier `src/lib`.

```json
/// file: package.json
{
	// ...
	"imports": {
		"#lib": "./src/lib/index.js",
		"#lib/*": "./src/lib/*"
	}
}
```

C'est une fonctionnalité standard de Node qui est automatiquement appliquée à votre fichier
`package.json` lorsque vous mettez en place un nouveau projet SvelteKit via le CLI `sv`. Elle permet
à tout module se trouvant dans `src/lib` d'être accessible depuis n'importe quel module via `#lib`.

Les deux fichiers `+page.svelte` de cet exercice importent `src/lib/message.js`. Mais si vous
naviguez vers `/a/deeply/nested/route`, l'application plante car le prefix n'est plus valide. Mettez
l'import à jour pour utiliser plutôt `#lib/message.js` :

```svelte
/// file: src/routes/a/deeply/nested/route/+page.svelte
<script>
	import { message } from +++'#lib/message.js'+++;
</script>

<h1>une route profondément enfouie</h1>
<p>{message}</p>
```

Faites la même chose pour `src/routes/+page.svelte` :

```svelte
/// file: src/routes/+page.svelte
<script>
	import { message } from +++'#lib/message.js'+++;
</script>

<h1>accueil</h1>
<p>{message}</p>
```
