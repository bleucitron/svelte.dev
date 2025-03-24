---
title: $env/static/public
---

Certaines variables d'environnement _peuvent_ être exposées sans risque dans le navigateur.
Celles-ci sont différenciées des variables d'environnement privées grâce à un préfixe `PUBLIC_`.

Ajoutez des valeurs aux deux variables d'environnement publiques dans le fichier `.env` :

```env
/// file: .env
PUBLIC_THEME_BACKGROUND=+++"steelblue"+++
PUBLIC_THEME_FOREGROUND=+++"bisque"+++
```

Puis, importez les dans `src/routes/+page.svelte` :

```svelte
/// file: src/routes/+page.svelte
<script>
---	const PUBLIC_THEME_BACKGROUND = 'white';
	const PUBLIC_THEME_FOREGROUND = 'black';---
+++	import {
		PUBLIC_THEME_BACKGROUND,
		PUBLIC_THEME_FOREGROUND
	} from '$env/static/public';+++
</script>
```
