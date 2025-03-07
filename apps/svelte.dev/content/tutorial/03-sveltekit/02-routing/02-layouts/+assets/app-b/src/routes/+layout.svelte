<script>
	let { children } = $props();
</script>

<nav>
	<a href="/">accueil</a>
	<a href="/about">à propos</a>
</nav>

{@render children()}
