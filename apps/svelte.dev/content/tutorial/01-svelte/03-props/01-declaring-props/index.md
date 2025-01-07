---
title: Déclarer des props
---

Jusqu'à maintenant, nous avons exclusivement eu affaire à des états internes — c'est-à-dire des
valeurs qui ne sont accessibles uniquement au sein d'un composant donné.

Dans une vraie application, vous aurez besoin de passer des données d'un composant à ses enfants.
Pour faire cela, nous devons déclarer des _propriétés_, généralement surnommées 'props'. En Svelte,
nous faisons ça grâce à la rune `$props`. Modifiez le composant `Nested.svelte` :

```svelte
/// file: Nested.svelte
<script>
	let { answer } = +++$props()+++;
</script>
```
