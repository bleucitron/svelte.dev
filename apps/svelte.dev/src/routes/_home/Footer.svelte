<script lang="ts">
	import { Section } from '@sveltejs/site-kit/components';
</script>

<Section>
	<p class="copyright">
		© {new Date().getFullYear()} Svelte contributors. Svelte est un
		<a href="https://github.com/sveltejs/svelte">logiciel libre et ouvert</a> publié sous la licence
		MIT.
	</p>
</Section>

<style>
	.copyright {
		text-align: center;
	}
</style>
