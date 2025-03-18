---
title: Matchers de paramètres
path: /colors/ff3e00
---

Pour empêcher le routeur de matcher des entrées non valides, vous pouvez spécifier un _matcher_. Par
exemple, vous pourriez vouloir une route comme `/colors/[value]` pour matcher les valeurs
hexadécimales comme `/colors/ff3e00` mais pas les couleurs nommées comme `/colors/octarine` ou toute
autre entrée arbitraire.

D'abord, créez un nouveau fichier appelé `src/params/hex.js` et exportez-y une fonction `match` :

```js
/// file: src/params/hex.js
export function match(value) {
	return /^[0-9a-f]{6}$/.test(value);
}
```

Puis, pour utiliser le nouveau matcher, renommez `src/routes/colors/[color]` en
`src/routes/colors/[color=hex]`.

Désormais, dès que quelqu'un navigue vers cette route, SvelteKit va vérifier que `color` est une
value `hex` valide. Si ce n'est pas le cas, SvelteKit va essayer de matcher d'autres routes, avant
de finir par renvoyer une 404.

> [!NOTE] Les matchers sont exécutées à la fois sur le serveur et dans le navigateur.
