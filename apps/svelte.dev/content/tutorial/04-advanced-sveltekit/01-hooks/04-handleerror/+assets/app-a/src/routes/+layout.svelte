<script>
	let { children } = $props();
</script>

<nav>
	<a href="/">accueil</a>
	<a href="/the-good-place">endroit super</a>
	<a href="/the-bad-place">endroit nul</a>
</nav>

{@render children()}
