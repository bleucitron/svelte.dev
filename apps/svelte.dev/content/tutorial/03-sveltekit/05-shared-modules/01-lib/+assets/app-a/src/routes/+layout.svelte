<script>
	let { children } = $props();
</script>

<nav>
	<a href="/">accueil</a>
	<a href="/a/deeply/nested/route">une route profondément enfouie</a>
</nav>

{@render children()}
