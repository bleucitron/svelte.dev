<script>
	let selection = $state('');

	const onselectionchange = (e) => {
		selection = document.getSelection().toString();
	};
</script>

<svelte:document />

<h1>Sélectionner ce texte pour déclencher des évènements</h1>
<p>Sélection : {selection}</p>
