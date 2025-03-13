---
title: trailingSlash
---

Deux URLs comme `/foo` et `/foo/` ont beau se ressembler, elles sont en réalité différentes. Une URL
relative comme `./bar` va être résolue comme `/bar` dans le premier cas et comme `/foo/bar` dans le
second ; de plus les moteurs de recherche vont les traiter comme des entrées différentes, impactant
négativement votre référencement.

Pour faire court, gérer au petit bonheur la chance les "trailing slashes" (slashs de fin d'URL) est
une mauvaise idée. Par défaut, SvelteKit supprime les trailing slashes, ce qui veut dire qu'une
requête vers `/foo/` va en réalité être redirigée vers `/foo`.

Si vous préférez vous assurez qu'un trailing slash est toujours présent, vous pouvez préciser
l'option `trailingSlash` de cette manière :

```js
/// file: src/routes/always/+page.server.js
export const trailingSlash = 'always';
```

Pour gérer les deux situations (nous ne recommendons pas de faire ça), utiliser `'ignore'` :

```js
/// file: src/routes/ignore/+page.server.js
export const trailingSlash = 'ignore';
```

La valeur par défaut est `'never'`.

La présence ou non des trailing slashes affecte le pré-rendu. Une URL comme `/always/` sera
enregistrée sur le disque comme `always/index.html` alors qu'une URL comme `/never` sera enregistrée
comme `never.html`.
