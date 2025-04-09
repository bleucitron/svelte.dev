---
title: Blocs each à clé
---

Par défaut, mettre à jour la value d'un bloc `#each` va déclencher l'ajout ou la suppression de
noeuds du DOM à la _fin_ du bloc si sa taille change, et mettre à jour le DOM restant. Ceci peut ne
pas être ce que vous souhaitez.

Ce genre de problématique est plus facile à montrer qu'à expliquer. Dans `Thing.svelte`, `name` est
une prop dynamique, but `emoji` est une constante.

Cliquez sur le bouton `Supprimer le premier élément` plusieurs fois, et notez ce qu'il se passe :

1. Le dernier composant est supprimé.
2. La valeur de `name` est ensuite mise à jour dans les noeuds restants du DOM (le noeud de texte
   contenant 'donut' contient maintenant 'oeuf', etc.), mais pas l'emoji.

> [!NOTE] Si vous venez de React, ceci peut vous paraître étrange, car vous êtes habitué•e au
> re-rendu complet du composant lorsque l'état change. Svelte fonctionne différemment : le composant
> est "joué" une seule fois, et les mises à jour suivantes sont "chirurgicales". Ceci permet
> d'accélérer les rendus et vous donne plus de contrôle.

Une façon de corriger ce problème pourrait être de transformer l'`emoji` en une valeur
[`$derived`](derived-state). Mais il est plus logique de supprimer uniquement le premier composant
`<Thing>` plutôt que de supprimer le _dernier_ et de mettre à jour tous les autres.

Pour faire cela, nous devons préciser une _clé_ unique pour chaque itération du bloc `each` :

```svelte
/// file: App.svelte
{#each things as thing (+++thing.id+++)}
	<Thing name={thing.name}/>
{/each}
```

> [!NOTE] Vous pouvez utiliser n'importe quel objet comme clé, puisque Svelte utilise une `Map` en
> interne — autrement dit vous pourriez écrire `(thing)` au lieu de `(thing.id)`. Néanmoins,
> utiliser une chaîne de caractères ou un nombre est en général plus sécurisé, puisque cela permet
> de faire persister l'identité des éléments même si les références des objets changent, par exemple
> lorsque vous rafraîchissez les données depuis un serveur d'API.
