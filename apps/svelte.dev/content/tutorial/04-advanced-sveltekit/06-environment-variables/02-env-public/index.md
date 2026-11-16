---
title: $app/env/public
---

Certaines variables d'environnement peuvent être exposées en toute sécurité dans le navigateur. Dans
cet exercice, nous en utiliserons deux pour contrôler le thème de couleurs de la page.

Ajoutez des valeurs aux deux variables d'environnement du fichier `.env` :

```env
/// file: .env
THEME_BACKGROUND=+++"steelblue"+++
THEME_FOREGROUND=+++"bisque"+++
```

Ensuite, créez un fichier `src/env.js`. Importez `defineEnvVars` depuis `@sveltejs/kit/env`, et
configurez les deux variables avec `public: true` :

```js
/// file: src/env.js
import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	THEME_BACKGROUND: {
		public: true
	},
	THEME_FOREGROUND: {
		public: true
	}
});
```

Vous pouvez maintenant importer les variables dans `src/routes/+page.svelte` en utilisant
`$app/env/public` :

```svelte
/// file: src/routes/+page.svelte
<script>
---	const THEME_BACKGROUND = 'white';
	const THEME_FOREGROUND = 'black';---
+++	import {
		THEME_BACKGROUND,
		THEME_FOREGROUND
	} from '$app/env/public';+++
</script>
```

Les variables d'environnement sont dynamiques par défaut, ce qui signifie que leurs valeurs sont
lues lorsque l'application démarre. Si une variable est connue lorsque l'application est compilée,
vous pouvez ajouter `static: true` à sa configuration pour inliner sa valeur dans le code compilé,
ce qui permet des optimisations comme l'élimination de code mort.

> [!NOTE] Avant SvelteKit 3, vous n'aviez pas l'option de déclarer un fichier `env.js` — à la place,
> vous deviez préfixer vos variables d'environnement avec `PUBLIC_` pour les rendre disponibles via
> `$env/dynamic/public` et `$env/static/public`.
