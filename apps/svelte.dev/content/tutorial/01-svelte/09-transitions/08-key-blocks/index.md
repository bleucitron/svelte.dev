---
title: Blocs key
tags: template-key
---

Les blocs `#key` détruisent et reconstruisent leur contenu lorsque la valeur d'une expression
change. Ceci sert si vous souhaitez qu'un élément joue sa transition à chaque fois qu'une valeur
change plutôt qu'uniquement lorsqu'un élément entre ou sort du DOM.

Ici par exemple, nous voulons jouer la transition `typewriter` définie dans `transition.js` à chaque
fois que le message de chargement, c-à-d `i`, change. Entourez l'élément `<p>` dans un bloc `#key` :

```svelte
/// file: App.svelte
+++{#key i}+++
	<p in:typewriter={{ speed: 10 }}>
		{messages[i] || ''}
	</p>
+++{/key}+++
```
