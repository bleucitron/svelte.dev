<script>
	import { navigating } from '$app/state';

	let { children } = $props();

	let previous = $state();
	let start = $state();
	let end = $state();

	$effect(() => {
		if (navigating.to) {
			start = Date.now();
			end = null;
			previous = navigating;
		} else {
			end = Date.now();
		}
	});
</script>

<nav>
	<a href="/">accueil</a>
	<a href="/slow-a" data-sveltekit-preload-data>lent-a</a>
	<a href="/slow-b">lent-b</a>
</nav>

{@render children()}

{#if previous && end}
<p>la navigation de {previous.from.url.pathname} à {previous.to.url.pathname} a mis <strong>{end -
	start} ms</strong></p>
{/if}
