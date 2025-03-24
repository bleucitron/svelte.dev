---
title: $env/dynamic/public
---

Comme avec les [variables d'environnement privées](/tutorial/kit/env-static-private), il est
préférable d'utiliser des valeurs statiques si possible, mais si nécessaire nous pouvons plutôt
utiliser des valeurs dynamiques :

```svelte
/// file: src/routes/+page.svelte
<script>
	import { +++env+++ } from '$env/+++dynamic+++/public';
</script>

<main
	style:background={+++env.+++PUBLIC_THEME_BACKGROUND}
	style:color={+++env.+++PUBLIC_THEME_FOREGROUND}
>
	{+++env.+++PUBLIC_THEME_FOREGROUND} sur {+++env.+++PUBLIC_THEME_BACKGROUND}
</main>
```
