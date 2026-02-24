---
title: Inputs texte
tags: template-bind
---

De manière générale, la donnée circule en _descendant_ — un composant parent peut définir des props
sur un composant enfant, et un composant peut définir des attributs sur un élément, mais pas
l'inverse.

Parfois, il peut être utile d'ignorer cette règle. Prenez le cas du élément `<input>` dans ce
composant — nous _pourrions_ ajouter un gestionnaire d'évènement `oninput` qui définit la valeur de
`name` à `event.target.value`, mais ça semble un peu... compliqué. Et ça peut empirer avec d'autres
éléments de formulaires, comme nous le verrons plus tard.

Au lieu de faire ça, nous pouvons utiliser la directive `bind:value` :

```svelte
/// file: App.svelte
<input +++bind:+++value={name}>
```

Ceci signifie que les changements à `name` vont mettre à jour `<input>`, tout autant que les
changements de `<input>` vont mettre à jour `name`.
