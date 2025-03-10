<script>
	let { children } = $props();
</script>

<nav>
	<a href="/">accueil</a>
	<a href="/a">a</a>
	<a href="/b">b</a>
</nav>

{@render children()}
