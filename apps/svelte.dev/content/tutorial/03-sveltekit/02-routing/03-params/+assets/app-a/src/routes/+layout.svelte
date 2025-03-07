<script>
	let { children } = $props();
</script>

<nav>
	<a href="/">accueil</a>
	<a href="/blog">blog</a>
</nav>

{@render children()}
