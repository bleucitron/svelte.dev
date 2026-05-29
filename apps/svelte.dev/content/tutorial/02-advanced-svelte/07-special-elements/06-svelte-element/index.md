---
title: <svelte:element>
---

Parfois vous ne savez pas à l'avance quel élément doit être affiché. Plutôt que d'écrire une
interminable liste de blocs `{#if ...}`...

```svelte
/// file: App.svelte
{#if selected === 'h1'}
	<h1>Je suis un élément <code>&amp;lt;h1&amp;gt;</code></h1>
{:else}
	<p>TODO autres</p>
{/if}
```

...nous pouvons utiliser `<svelte:element>` :

```svelte
/// file: App.svelte
+++<svelte:element this={selected}>
	Je suis un élément <code>&amp;lt;{selected}&amp;gt;</code>
</svelte:element>+++
```

La valeur `this` peut être n'importe quelle chaîne de caractères — si cette valeur est falsy, aucun
élément n'est rendu.
