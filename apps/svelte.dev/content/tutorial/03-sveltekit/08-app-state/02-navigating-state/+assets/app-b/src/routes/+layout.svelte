<script>
	import { page, navigating } from '$app/state';
	let { children } = $props();
</script>

<nav>
	<a href="/" aria-current={page.url.pathname === '/'}>
		accueil
	</a>

	<a href="/about" aria-current={page.url.pathname === '/about'}>
		à propos
	</a>

	{#if navigating.to}
		en cours de navigation vers {navigating.to.url.pathname}
	{/if}
</nav>

{@render children()}
