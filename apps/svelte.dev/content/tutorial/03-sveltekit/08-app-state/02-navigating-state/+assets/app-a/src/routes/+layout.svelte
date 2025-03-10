<script>
	import { page } from '$app/state';
	let { children } = $props();
</script>

<nav>
	<a href="/" aria-current={page.url.pathname === '/'}>
		accueil
	</a>

	<a href="/about" aria-current={page.url.pathname === '/about'}>
		à propos
	</a>
</nav>

{@render children()}
