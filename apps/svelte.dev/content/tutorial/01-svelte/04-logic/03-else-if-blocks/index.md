---
title: Blocs else-if
---

Plusieurs conditions peuvent être 'chaînées' avec `else if` :

```svelte
/// file: App.svelte
{#if count > 10}
	<p>{count} est plus grand que 10</p>
+++{:else if count < 5}
	<p>{count} est plus petit que 5</p>+++
{:else}
	<p>{count} est entre +++5+++ et 10</p>
{/if}
```
