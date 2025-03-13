<script>
	import { browser } from '$app/environment';

	let count = $state(0);

	function increment() {
		count += 1;
	}
</script>

<h1>Rendu {browser ? 'par le navigateur' : 'par le serveur'}</h1>

<button onclick={increment}>
	Clics : {count}
</button>
