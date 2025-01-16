<script>
	import Thing from './Thing.svelte';

	let things = $state([
		{ id: 1, name: 'pomme' },
		{ id: 2, name: 'banane' },
		{ id: 3, name: 'carotte' },
		{ id: 4, name: 'donut' },
		{ id: 5, name: 'oeuf' }
	]);
</script>

<button onclick={() => things.shift()}>
	Supprimer le premier élément
</button>

{#each things as thing}
	<Thing name={thing.name} />
{/each}
