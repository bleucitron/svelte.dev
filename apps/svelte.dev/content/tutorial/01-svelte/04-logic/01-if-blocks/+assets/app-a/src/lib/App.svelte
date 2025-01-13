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
