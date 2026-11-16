---
title: Matchers de paramètres
path: /colors/ff3e00
---

Pour empêcher le routeur de matcher des entrées non valides, vous pouvez spécifier un _matcher_. Par
exemple, vous pourriez vouloir une route comme `/colors/[color]` pour matcher les valeurs
hexadécimales comme `/colors/ff3e00` mais pas les couleurs nommées comme `/colors/octarine` ou toute
autre entrée arbitraire.

Les matchers sont définis dans le fichier `src/params.js`. Créez-le et utilisez `defineParams` pour
ajouter un matcher `hex` :

```js
/// file: src/params.js
import { defineParams } from '@sveltejs/kit/params';

export const params = defineParams({
	hex(value) {
		return /^[0-9a-f]{6}$/.test(value) ? value : undefined;
	}
});
```

Les matchers renvoient la valeur parsée qui sera ajoutée aux `page.params`, ou `undefined` si la
valeur ne correspond pas. Ici, une valeur hexadécimale valide est renvoyée inchangée, afin que
`page.params.color` reste une couleur.

Puis, pour utiliser le nouveau matcher, renommez `src/routes/colors/[color]` en
`src/routes/colors/[color=hex]`.

Désormais, dès que quelqu'un navigue vers cette route, SvelteKit va vérifier que `color` est une
value `hex` valide et utiliser la valeur renvoyée par le matcher. Si elle renvoie `undefined`,
SvelteKit va essayer de faire correspondre d'autres routes, avant d'éventuellement finir par
renvoyer une 404.

> [!NOTE] Les matchers sont exécutées à la fois sur le serveur et dans le navigateur.

> [!NOTE] Plutôt qu'une fonction, un matcher peut aussi être un [Standard
> Schema](https://standardschema.dev) tel qu'un schéma [Valibot](https://valibot.dev) ou
> [Zod](https://zod.dev). Voir la [documentation](/docs/kit/advanced-routing#Matching) pour en
> savoir plus.
