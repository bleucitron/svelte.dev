<script>
	import { Section } from '@sveltejs/site-kit/components';
</script>

<Section --max-width="200rem">
	<h2>rejoignez notre communauté</h2>
	<p>
		Notre petite soeur, <a href="https://www.sveltesociety.dev/">Svelte Society</a>, organise des
		évèvements partout dans le monde.
	</p>
	<p>Il y a une place qui vous attend sur <a href="/chat">notre serveur Discord</a>.</p>

	<figure>
		<enhanced:img
			src="./summit.png?w=800;1200;2000;2800;4400"
			alt="Photos du Svelte Summit de 2022 à Stockholm par Marcel Cutts"
		/>
		<figcaption>Photos par <a href="https://x.com/marcelcutts">Marcel Cutts</a></figcaption>
	</figure>
</Section>

<style>
	figure {
		position: relative;
	}

	figcaption {
		position: relative;
		top: max(-2vw, calc(-0.02 * (120rem + 2 * var(--sk-page-padding-side))));
		font: var(--sk-font-body-small);
		margin: 0 auto;
		padding: 0 var(--sk-page-padding-side);
		color: var(--sk-text-4);
		text-align: center;

		a {
			text-wrap: nowrap;
			color: inherit;
			text-decoration: underline;
		}
	}

	img {
		width: 100%;
		height: auto;
	}

	h2,
	p {
		text-align: center;
	}
</style>
