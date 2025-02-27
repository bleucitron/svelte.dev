<script>
	import FlakyComponent from './FlakyComponent.svelte';
</script>


<svelte:boundary onerror={(e) => console.error(e)}>
	<FlakyComponent />

	{#snippet failed(error, reset)}
		<p>Oups ! {error.message}</p>
		<button onclick={reset}>Réinitialiser</button>
	{/snippet}
</svelte:boundary>
