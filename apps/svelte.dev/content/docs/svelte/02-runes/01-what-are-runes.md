---
title: C'est quoi une rune ?
---

> [!NOTE] **rune** /ro͞on/ _nom_
>
> Une lettre ou caractère graphique utilisé comme symbole magique ou mystique.

Les runes sont les symboles utilisés dans les fichiers `.svelte` et `.svelte.js`/`.svelte.ts` pour
contrôler le compilateur Svelte. Si vous pensez Svelte comme un langage, les runes font partie de sa
syntaxe – elles sont des _mots-clés_.

Les runes ont un préfixe `$` et ressemblent à des fonctions :

```js
let message = $state('coucou');
```

Néanmoins, elles diffèrent des fonctions JavaScript habituelles de manière importante :

- Vous n'avez pas besoin de les importer – elles font partie du langage
- Elles ne représentent pas de valeurs – vous ne pouvez pas les assigner à une variable ou les
passer comme argument à une fonction
- Comme pour les mots-clés JavaScript, elles ne sont valides que dans certaines positions (le
compilateur vous préviendra si vous les utilisez au mauvais endroit)

> [!LEGACY]
> Les runes n'existaient pas avant Svelte 5.
