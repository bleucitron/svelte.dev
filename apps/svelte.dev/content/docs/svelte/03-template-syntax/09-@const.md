---
title: {@const ...}
---

La balise `{@const ...}` définit une constante locale.

```svelte
{#each boxes as box}
	{@const area = box.width * box.height}
	{box.width} * {box.height} = {area}
{/each}
```

L'usage de `{@const}` est uniquement autorisé immédiatement en enfant d'un bloc - `{#if ...}`,
`{#each ...}`, `{#snippet ...}`, etc. – ou d'un `<Composant />`.
