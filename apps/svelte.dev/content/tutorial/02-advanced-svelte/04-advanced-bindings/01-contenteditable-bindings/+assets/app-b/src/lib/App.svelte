<script>
	let html = $state('<p>Écrivez du texte !</p>');
</script>

<div bind:innerHTML={html} contenteditable></div>

<pre>{html}</pre>

<style>
	[contenteditable] {
		padding: 0.5em;
		border: 1px solid #eee;
		border-radius: 4px;
	}
</style>
