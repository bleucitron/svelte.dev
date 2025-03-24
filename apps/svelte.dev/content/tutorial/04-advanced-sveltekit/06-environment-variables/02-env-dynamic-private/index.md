---
title: $env/dynamic/private
---

Si vous avez besoin de lire les valeurs de variables d'environnement lorsque l'application est
exécutée, plutôt que lorsqu'elle est compilée, vous pouvez utiliser `$env/dynamic/private` plutôt
que `$env/static/private`:

```js
/// file: src/routes/+page.server.js
import { redirect, fail } from '@sveltejs/kit';
import { +++env+++ } from '$env/+++dynamic+++/private';

export function load({ cookies }) {
	if (cookies.get('allowed')) {
		redirect(307, '/welcome');
	}
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		if (data.get('passphrase') === +++env.+++PASSPHRASE) {
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
