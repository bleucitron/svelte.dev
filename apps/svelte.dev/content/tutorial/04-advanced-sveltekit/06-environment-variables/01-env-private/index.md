---
title: $app/env/private
---

Des variables d'environnement — comme des clés d'API ou des identifiants de base de données —
peuvent être ajoutées à un fichier `.env` et seront rendues disponibles dans votre application.

> [!NOTE] Vous pouvez également utiliser des fichiers `.env.local` ou `.env.[mode]` — voir la
> [documentation de Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) pour plus
> d'informations. Assurez-vous d'ajouter tout fichier contenant des informations sensibles à votre
> fichier `.gitignore` !

Dans cet exercice, nous voulons permettre à l'utilisateur ou utilisatrice d'accéder au site si elle
connaît le mot de passe correct, le tout en utilisant une variable d'environnement.

D'abord, dans un fichier `.env`, ajoutez une nouvelle variable d'environnement :

```env
/// file: .env
PASSPHRASE=+++"Sésame, ouvre-toi"+++
```

Ensuite, créez un fichier `src/env.js`, importez-y `defineEnvVars` depuis `@sveltejs/kit/env`, et
déclarez-y `PASSPHRASE` :

```js
/// file: src/env.js
import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	PASSPHRASE: {}
});
```

Les variables d'environnement sont privées par défaut, `PASSPHRASE` est donc maintenant disponible
dans `$app/env/private`.

Ouvrez `src/routes/+page.server.js`. Importez la variable nommée et utilisez-la dans l'[action de
formulaire](/tutorial/kit/the-form-element) :

```js
/// file: src/routes/+page.server.js
import { redirect, fail } from '@sveltejs/kit';
+++import { PASSPHRASE } from '$app/env/private';+++

export function load({ cookies }) {
	if (cookies.get('allowed')) {
		redirect(307, '/welcome');
	}
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		if (data.get('passphrase') === +++PASSPHRASE+++) {
			cookies.set('allowed', 'true');

			redirect(303, '/welcome');
		}

		return fail(403, {
			incorrect: true
		});
	}
};
```

Le site est désormais accessible à quiconque connaît le mot de passe correct.

## Garder des secrets [!VO]Keeping secrets

Il est important que des informations sensibles ne puissent pas être envoyées accidentellement au
navigateur, où elles pourraient être facilement dérobées par des hackeurs et des vilains.

SvelteKit vous permet de facilement empêcher ceci de se produire. Notez ce qu'il se passe si nous
essayons d'importer `PASSPHRASE` dans `src/routes/+page.svelte` :

```svelte
/// file: src/routes/+page.svelte
<script>
	+++import { PASSPHRASE } from '$app/env/private';+++
	let { form } = $props();
</script>
```

Un message d'erreur s'affiche par dessus votre fenêtre, nous informant que le module
`$app/env/private` ne peut pas être importé dans du code client. Il peut uniquement être importé
dans des modules réservés au serveur, ce qui inclut :

- les modules serveur de SvelteKit `+page.server.js`, `+layout.server.js`, `+server.js` et
  `hooks.server.js`
- les modules ayant un segment `server` dans leur chemin, comme `server.js`, `foo.server.js` ou
  `foo.server.test.js`
- les modules dans un dossier `server`, à l'exception des dossiers `server` dans `src/routes` ou
  `static`

À leur tour, ces modules peuvent uniquement être importés par d'_autres_ modules de serveur.

## Dynamique vs statique [!VO]Dynamic vs static

Les variables d'environnement sont dynamiques par défaut — leurs valeurs sont lues lors de
l'exécution de l'application, plutôt qu'être définies lors de la compilation. Ceci signifie que vous
pouvez compilez votre application une fois et la déployer dans différents environnements avec
différentes valeurs.

Si une valeur est connue au moment de la compilation, vous pouvez ajouter `static: true` à sa
définition. Par exemple, ajoutez une option à votre fichier `.env` :

```env
/// file: .env
PASSPHRASE="open sesame"
FEATURE_FLAG_X=enabled
```

Pour déclarez-la statique :

```js
/// file: src/env.js
import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	PASSPHRASE: {},
	FEATURE_FLAG_X: {
		static: true
	}
});
```

Les valeurs statiques sont inlinées dans votre code applicatif, permettant des optimisations
pratiques comme l'élimination de code mort :

```js
import { FEATURE_FLAG_X } from '$app/env/private';

if (FEATURE_FLAG_X === 'enabled') {
	// le code ici sera supprimé du code compilé
	// si FEATURE_FLAG_X n'est pas activée
}
```

> [!NOTE] Avant SvelteKit 3, vous n'aviez pas l'option de déclarer un fichier `env.js` — à la place,
> les variables d'environnement privées étaient automatiquement rendues disponibles via
> `$env/dynamic/private` et `$env/static/private`.
