<script>
	let { children } = $props();
</script>

{@render children()}

<form method="POST" action="/logout">
	<button>se déconnecter</button>
</form>
