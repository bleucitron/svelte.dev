<script>
	let { children } = $props();
</script>

<nav>
	<a href="/">accueil</a>
	<a href="/app">page avec une erreur d'application</a>
	<a href="/unknown">page avec une erreur inconnue</a>
</nav>

{@render children()}
