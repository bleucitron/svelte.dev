---
title: Styles
---

Comme en HTML, vous pouvez ajoutez une balise `<style>` à votre composant. Ajoutons du style à notre
élément `<p>` :

```svelte
/// file: App.svelte
<p>Ceci est un paragraphe.</p>

<style>
+++	p {
		color: goldenrod;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}+++
</style>
```

Il est important de comprendre que ces règles sont _scopées au composant_, c'est-à-dire qu'elles ne
s'appliquent que sur les éléments définis dans ce composant. Vous ne risquez pas de modifier
accidentellement le style des éléments `<p>` ailleurs dans votre application, comme nous le verrons
dans l'exercice suivant.
