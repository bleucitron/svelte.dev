---
title: <svelte:self>
---

L'élément `<svelte:self>` permet à un composant de s'inclure lui-même, récursivement.

Cet élément ne peut pas apparaître à la racine de votre markup ; il doit être placé dans un bloc
`if`, un bloc `each`, ou passé à un slot de composant pour ne pas créer de boucle infinie.

```svelte
<script>
	export let count;
</script>

{#if count > 0}
	<p>compte à rebours... {count}</p>
	<svelte:self count={count - 1} />
{:else}
	<p>décollage !</p>
{/if}
```

> [!NOTE]
> En Svelte 5+, ce concept est obsolète, car les composants peuvent s'importer eux-mêmes :
> ```svelte
> <!--- file: App.svelte --->
> <script>
> 	import Self from './App.svelte'
> 	export let count;
> </script>
>
> {#if count > 0}
> 	<p>compte à rebours... {count}</p>
> 	<Self count={count - 1} />
> {:else}
> 	<p>décollage !</p>
> {/if}
> ```
