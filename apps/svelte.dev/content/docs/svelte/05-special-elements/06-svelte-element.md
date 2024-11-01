---
title: <svelte:element>
---

```svelte
<svelte:element this={expression} />
```

L'élément `<svelte:element>` vous permet d'afficher un élément dont le type n'est pas connu au
moment de l'écriture du code, par exemple lorsqu'il vient d'un CMS. Toute propriété ou gestionnaire
d'évènement présents seront ajoutés à l'élément.

La seule liaison possible est `bind:this`, puisque les liaisons intégrées de Svelte ne fonctionnent
pas avec les éléments génériques.

Si `this` a une valeur nullish, l'élément et ses enfants ne seront pas affichés.

Si `this` est le nom d'un [élément
vide](https://developer.mozilla.org/fr/docs/Glossary/Void_element) (comme `br`) et
`<svelte:element>` possède des éléments enfant, une erreur sera levée à l'exécution en mode
développement :

```svelte
<script>
	let tag = $state('hr');
</script>

<svelte:element this={tag}>
	Ce texte ne peut pas apparaître dans un élément hr
</svelte:element>
```

Svelte fait tout son possible d'inférer le namespace adéquat en fonction de ce qui entoure
l'élément, mais ce n'est pas toujours possible. Vous pouvez le rendre explicite en lui ajoutant
l'attribut `xmlns` :

```svelte
<svelte:element this={tag} xmlns="http://www.w3.org/2000/svg" />
```

`this` needs to be a valid DOM element tag, things like `#text` or `svelte:head` will not work.
