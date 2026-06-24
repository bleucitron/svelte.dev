<script lang="ts">
	import { page } from '$app/state';
	import { browser } from '$app/env';

	// we don't want to use <svelte:window bind:online> here,
	// because we only care about the online state when
	// the page first loads
	const online = browser ? navigator.onLine : true;
</script>

<svelte:head>
	<title>{page.status}</title>
</svelte:head>

<div class="outer">
	<div class="inner">
		{#if online}
			{#if page.status === 404}
				<h1>Introuvable !</h1>
				<p>
					Si vous vous attendiez à trouver quelque chose ici, merci de faire un tour du côté du
					<a href="/chat"> serveur Discord </a> et parlez nous-en, ou ouvrez une issue sur
					<a href="https://github.com/bleucitron/svelte.dev/issues">GitHub</a>. Merci !
				</p>
			{:else}
				<h1>Beurk !</h1>

				<p>
					Quelque chose s'est mal passé lors du rendu de cette page. Merci d'essayer de recharger.
				</p>

				<p>
					Si l'erreur persiste, merci de nous le faire savoir sur <a href="/chat">Discord</a> ou sur
					<a href="https://github.com/sveltejs/svelte.dev/issues">GitHub</a>. Merci !
				</p>
			{/if}
		{:else}
			<h1>Il semblerait que vous soyez hors ligne</h1>
			<p>Rechargez la page une fois que vous avez retrouvé une connexion internet.</p>
		{/if}
	</div>
</div>

<style>
	.outer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0 var(--sk-page-padding-side) 6rem var(--sk-page-padding-side);
		width: 100%;
		height: 100%;
	}

	.inner {
		max-width: 48rem;
		text-align: center;
		text-wrap: balance;

		a {
			text-wrap: nowrap;
		}
	}

	p {
		margin: 1em auto;
	}
</style>
