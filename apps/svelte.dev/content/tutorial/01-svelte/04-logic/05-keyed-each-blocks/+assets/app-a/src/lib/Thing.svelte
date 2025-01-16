<script>
	const emojis = {
		pomme: '🍎',
		banane: '🍌',
		carotte: '🥕',
		donut: '🍩',
		oeuf: '🥚'
	};

	// `name` est mis à jour lorsque les props changent
	let { name } = $props();

	// ... mais `emoji` est fixé lors de l'initialisation
	const emoji = emojis[name];
</script>

<p>{emoji} = {name}</p>
