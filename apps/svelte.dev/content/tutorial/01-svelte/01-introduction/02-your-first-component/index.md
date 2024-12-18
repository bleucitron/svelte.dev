---
title: Votre premier composant
---

Avec Svelte, une application est composée d'un ou plusieurs _composants_. Un composant est un bloc
de code réutilisable encapsulant du HTML, du CSS et du JavaScript fonctionnant ensemble, le tout
écrit dans un fichier `.svelte`. Le fichier `App.svelte`, ouvert dans l'éditeur de code sur la
droite, est un composant simple.

## Ajouter des données [!VO]Adding data

Un composant qui ne fait qu'afficher du markup statique n'est pas très intéressant. Ajoutons-lui des
données.

D'abord, ajoutez une balise script à votre composant et déclarez une variable `name` :

```svelte
/// file: App.svelte
+++<script>
	let name = 'Svelte';
</script>+++

<h1>Bonjour tout le monde !</h1>
```

Puis, nous pouvons utiliser `name` dans le markup :

```svelte
/// file: App.svelte
<h1>Bonjour +++{name}+++ !</h1>
```

Dans les accolades, il est possible de mettre autant de JavaScript que l'on souhaite. Essayez de
remplacer `name` par `name.toUppercase()` pour accueillir plus bruyamment.

```svelte
/// file: App.svelte
<h1>Bonjour {name+++.toUpperCase()+++} !</h1>
```
