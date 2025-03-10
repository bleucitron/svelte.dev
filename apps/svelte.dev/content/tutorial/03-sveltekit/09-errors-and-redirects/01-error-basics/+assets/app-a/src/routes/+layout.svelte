<script>
	let { children } = $props();
</script>

<nav>
	<a href="/">accueil</a>
	<a href="/expected">page avec une erreur prévue</a>
	<a href="/unexpected">page avec une erreur imprévue</a>
</nav>

{@render children()}
