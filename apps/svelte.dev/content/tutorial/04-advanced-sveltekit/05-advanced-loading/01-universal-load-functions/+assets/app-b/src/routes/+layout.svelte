<script>
	import { page } from '$app/state';

	let { children } = $props();
</script>

<nav
	class={[page.data.color && 'has-color']}
	style:background={page.data.color ?? 'var(--bg-2)'}
>
	<a href="/">accueil</a>
	<a href="/red">rouge</a>
	<a href="/green">vert</a>
	<a href="/blue">bleu</a>

	{#if page.data.component}
		<page.data.component />
	{/if}
</nav>

{@render children()}

<style>
	nav.has-color,
	nav.has-color a {
		color: white;
	}
</style>
