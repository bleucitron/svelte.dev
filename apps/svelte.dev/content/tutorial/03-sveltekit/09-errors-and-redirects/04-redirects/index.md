---
title: Redirections
---

Nous pouvons utiliser la mécanique `redirect` pour rediriger d'une page à l'autre.

Créez une nouvelle fonction `load` dans `src/routes/a/+page.server.js` :

```js
/// file: src/routes/a/+page.server.js
import { redirect } from '@sveltejs/kit';

export function load() {
	redirect(307, '/b');
}
```

Une navigation vers `/a` va maintenant nous amener directement vers `/b`.

Vous pouvez `redirect(...)` dans les fonctions `load`, les actions de formulaire, les routes d'API
et le hook `handle`, dont nous parlerons dans un futur chapitre.

Les codes de statut les plus courants sont :

- `303` — pour les actions de formulaire, suite à une soumission réussie
- `307` — pour les redirections temporaires
- `308` — pour les redirections permanentes
