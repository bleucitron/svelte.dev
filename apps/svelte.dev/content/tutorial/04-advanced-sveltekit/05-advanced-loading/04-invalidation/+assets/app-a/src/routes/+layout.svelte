<script>
	let { children } = $props();
</script>

<nav>
	<a href="/America/New_York">New York</a>
	<a href="/America/Sao_Paulo">São Paulo</a>
	<a href="/Europe/London">Londres</a>
	<a href="/Europe/Paris">Paris</a>
	<a href="/Africa/Cairo">Le Caire</a>
	<a href="/Asia/Shanghai">Shanghai</a>
	<a href="/Asia/Tokyo">Tokyo</a>
	<a href="/Australia/Sydney">Sydney</a>
	<a href="/America/Los_Angeles">Los Angeles</a>
</nav>

{@render children()}
