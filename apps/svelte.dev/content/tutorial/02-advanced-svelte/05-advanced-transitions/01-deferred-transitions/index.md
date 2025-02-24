---
title: Transitions retardées
---

Une fonctionnalité particulièrement puissante du moteur de transitions de Svelte est la capacité à
_retarder_ les transitions, afin qu'elles puissent être coordonnées entre plusieurs éléments.

Prenez cette paire de listes de choses à faire, dans lesquelles l'activation d'un todo l'envoie dans
la liste opposée. Dans la vraie vie, les objets ne se comportent pas comme ça — au lieu de
disparaître et de réapparaître ailleurs, ils se déplacent au fur et à mesure sur des positions
intermédiaires. Utiliser le déplacement peut grandement aider les utilisateurs et utilisatrices à
comprendre ce qu'il se passe dans votre application.

Nous pouvons créer cet effet en utilisant la fonction `crossfade`, comme utilisée dans le fichier
`transition.js`, qui crée un couple de transitions appelées `send` et `receive`. Lorsqu'un élément
est "envoyé", Svelte cherche un élément correspondant étant "reçu", et génère une transition qui
transforme l'élément vers la position de sa contreparie et le fait disparaître en fondu. Lorsqu'un
élément est "reçu", le contraire se produit. S'il n'y a pas de contrepartie, la transition
`fallback` est utilisée.

Ouvrez `TodoList.svelte`. D'abord, importez les transitions `send` et `receive` depuis
`transition.js` :

```svelte
/// file: TodoList.svelte
<script>
	+++import { send, receive } from './transition.js';+++

	let { todos, remove } = $props();
</script>
```

Puis, ajoutez-les à l'élément `<li>`, en utilisant la propriété `todo.id` comme clé de
correspondance des éléments :

```svelte
/// file: TodoList.svelte
<li
	class={{ done: todo.done }}
	+++in:receive={{ key: todo.id }}+++
	+++out:send={{ key: todo.id }}+++
>
```

Désormais, lorsque vous interagissez avec les éléments, ils se déplacent de manière fluide vers leur
nouvelle position. Les éléments qui ne se déplacent pas subissent toujours un "saut" bizarre — nous
règlerons ce problème dans le prochain exercice.
