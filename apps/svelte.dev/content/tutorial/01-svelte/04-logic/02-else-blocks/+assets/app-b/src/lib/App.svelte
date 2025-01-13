<script>
	let count = $state(0);

	function increment() {
		count += 1;
	}
</script>

<button onclick={increment}>
	Il y a eu {count}
	{count === 1 ? 'clic' : 'clics'}
</button>

{#if count > 10}
	<p>{count} est plus grand que 10</p>
{:else}
	<p>{count} est entre 0 et 10</p>
{/if}
