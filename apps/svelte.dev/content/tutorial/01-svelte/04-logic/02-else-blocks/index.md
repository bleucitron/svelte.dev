---
title: Blocs else
---

De la même manière qu'en JavaScript, un bloc `if` peut avoir un bloc `else` :

```svelte
/// file: App.svelte
{#if count > 10}
	<p>{count} est plus grand que 10</p>
+++{:else}
	<p>{count} est entre 0 et 10</p>+++
{/if}
```

`{#...}` ouvre un bloc. `{/...}` ferme un bloc. `{:...}` _continue_ un bloc. Félicitations — vous
avez déjà appris presque toute la syntaxe que Svelte rajoute au HTML.
