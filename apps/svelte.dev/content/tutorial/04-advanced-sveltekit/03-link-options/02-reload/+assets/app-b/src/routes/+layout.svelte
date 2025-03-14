<script>
	import { onMount } from 'svelte';

	let { children } = $props();

	let seconds = $state(0);

	onMount(() => {
		const interval = setInterval(() => {
			seconds += 1;
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<nav data-sveltekit-reload>
	<a href="/">accueil</a>
	<a href="/about">à propos</a>
</nav>

{@render children()}

<p>la page est ouverte depuis {seconds} secondes</p>
