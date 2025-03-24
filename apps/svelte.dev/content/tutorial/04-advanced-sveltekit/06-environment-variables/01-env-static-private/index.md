---
title: $env/static/private
---

Les variables d'environnement — comme les clés d'API et les identifiants de base de données —
peuvent être ajoutés à un fichier `.env`, et seront rendues disponibles dans votre application.

> [!NOTE] Vous pouvez aussi utiliser des fichiers `.env.local` ou `.env.[mode]` — voir [la
> documentation de Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) pour plus
> d'informations. Assurez-vous d'ajouter tout fichier qui contiendrait des informations sensibles
> dans votre fichier `.gitignore` !
>
> Les variables d'environnement dans `process.env` sont aussi disponible via `$env/static/private`.

Dans cet exercice, nous voulons autoriser l'utilisateur ou l'utilisatrice à entrer sur le site s'il
ou elle connaît le mot de passe correct, en utilisant une variable d'environnement.

D'abord, dans le fichier `.env`, ajoutez une nouvelle variable d'environnement :

```env
/// file: .env
PASSPHRASE=+++"sésame ouvre toi"+++
```

Ouvez le fichier `src/routes/+page.server.js`. Importez `PASSPHRASE` depuis `$env/static/private` et
utilisez-le dans l'[action de formulaire](/tutorial/kit/the-form-element) :

```js
/// file: src/routes/+page.server.js
import { redirect, fail } from '@sveltejs/kit';
+++import { PASSPHRASE } from '$env/static/private';+++

export function load({ cookies }) {
	if (cookies.get('allowed')) {
		redirect(307, '/welcome');
	}
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		if (data.get('passphrase') === +++PASSPHRASE+++) {
			cookies.set('allowed', 'true', {
				path: '/'
			});

			redirect(303, '/welcome');
		}

		return fail(403, {
			incorrect: true
		});
	}
};
```

Le site est maintenant accessible à toute personne connaissant le mot de passe.

## Garder les secrets [!VO]Keeping secrets

Il est primordial que les données sensibles ne soient pas accidentellement envoyées au navigateur,
où elles peuvent être facilement dérobées par des hackers et autres canailles.

SvelteKit facilite la prévention de ce genre d'évènements. Notez ce qu'il se passe si nous essayons
d'importer `PASSPHRASE` dans `src/routes/+page.svelte` :

```svelte
/// file: src/routes/+page.svelte
<script>
	+++import { PASSPHRASE } from '$env/static/private';+++
	let { form } = $props();
</script>
```

Une erreur s'affiche, nous indiquant que `$env/static/private` ne peut pas être importée dans du
code côté client. Ce module ne peut être importé que dans des modules ne s'exécutant que sur le
serveur :

- `+page.server.js`
- `+layout.server.js`
- `+server.js`
- tout module dont le nom termine par `.server.js`
- tout module dans le dossier `src/lib/server`

À leur tour, ces modules peuvent uniquement être importés par d'_autres_ modules de serveur.

## Statique vs dynamique [!VO]Static vs dynamic

Le `static` dans `$env/static/private` indique que ces valeurs sont connues au moment de la
compilation, et peuvent être _remplacées de manière statique_. Ceci permet des optimisations
pratiques :

```js
import { FEATURE_FLAG_X } from '$env/static/private';

if (FEATURE_FLAG_X === 'enabled') {
	// le code dans ce bloc sera supprimé du code généré
	// si FEATURE_FLAG_X n'est pas activé
}
```

Dans certaines situations vous pourriez avoir besoin de vous référer à des variables d'environnement
_dynamiques_ — en d'autres mots, pas connues avant l'exécution de l'application. Nous verrons ce cas
dans le prochain exercice.
