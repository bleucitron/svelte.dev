<script>
	let { children } = $props();
</script>

<nav>
	<a href="/">par défaut</a>
	<a href="/en">anglais</a>
	<a href="/de">allemand</a>
	<a href="/fr">français</a>
</nav>

{@render children()}
