---
title: Liaisons de bloc each
---

Vous pouvez lier les propriétés au sein d'un bloc `each`.

```svelte
/// file: App.svelte
{#each todos as todo}
	<li class={{ done: todo.done }}>
		<input
			type="checkbox"
			+++bind:+++checked={todo.done}
		/>

		<input
			type="text"
			placeholder="Qu'avez-vous besoin de faire ?"
			+++bind:+++value={todo.text}
		/>
	</li>
{/each}
```
