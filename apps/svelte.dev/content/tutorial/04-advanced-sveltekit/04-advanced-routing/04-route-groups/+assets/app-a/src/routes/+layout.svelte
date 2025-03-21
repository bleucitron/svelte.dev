<script>
	let { children } = $props();
</script>

<nav>
	<a href="/">accueil</a>
	<a href="/about">à propos</a>
	<a href="/account">compte</a>
	<a href="/app">app</a>
</nav>

{@render children()}
