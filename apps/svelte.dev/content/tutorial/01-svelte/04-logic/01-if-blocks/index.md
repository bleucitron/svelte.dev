---
title: Blocs if
---

Le HTML ne permet pas d'exprimer de la _logique_, comme des conditions ou des boucles. Svelte si.

Pour afficher du markup de manière conditionnelle, plaçons-le dans un bloc `if`. Ajoutons-lui un
peut de texte à afficher lorsque `count` est plus grand que `10` :

```svelte
/// file: App.svelte
<button onclick={increment}>
	Il y a eu {count}
	{count === 1 ? 'clic' : 'clics'}
</button>

+++{#if count > 10}
	<p>{count} est plus grand que 10</p>
{/if}+++
```

Essayez — mettez à jour le composant, et cliquez plusieurs fois sur le bouton.
