<script>
	let { form } = $props();
</script>

<form method="POST">
	<label>
		entrer le mot de passe
		<input name="passphrase" autocomplete="off" />
	</label>
</form>

{#if form?.incorrect}
	<p class="error">mauvais mot de passe !</p>
{/if}

<style>
	.error {
		color: red;
	}
</style>
