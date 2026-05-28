<script>
	import { afterNavigate, beforeNavigate } from '$app/navigation';

	let { children } = $props();

	let previous = $state();
	let start = $state();
	let duration = $state();

	beforeNavigate(({ from, to }) => {
		if (from && to?.url) {
			start = Date.now();
			duration = null;
			previous = { from, to };
		}
	});

	afterNavigate(() => {
		if (previous) {
			duration = Date.now() - start;
		}
	});
</script>

<nav>
	<a href="/">accueil</a>
	<a href="/slow-a">lent-a</a>
	<a href="/slow-b">lent-b</a>
</nav>

{@render children()}

{#if previous && duration !== null}
	<p>la navigation de {previous.from.url.pathname} à {previous.to.url.pathname} a mis <strong>{end -
		start} ms</strong></p>
{/if}
