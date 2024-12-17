<script>
	import { page } from '$app/state';
</script>

{#if page.status === 404}
	<h1>Introuvable</h1>
	<p><a href="/">Go to /</a></p>
{:else}
	<p>
		Le rendu côté serveur a échoué avec un code HTTP
		<a
			target="_blank"
			href="https://http.dog/{page.status}"
			>{page.status}</a
		>
	</p>
{/if}

<style>
	h1 {
		font-weight: 200;
		font-size: 2rem;
		margin: 0 0 0.5em 0;
	}
</style>
