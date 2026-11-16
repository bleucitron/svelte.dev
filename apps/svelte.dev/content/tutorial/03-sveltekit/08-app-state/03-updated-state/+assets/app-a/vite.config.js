import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			version: {
				// idéalement, ceci devrait être quelque de déterministe,
				// comme la sortie de `git rev-parse HEAD`
				name: Date.now().toString(),

				// on utilise un intervalle court pour cette démo plutôt que la valeur par défaut d'une heure
				pollInterval: 5000
			}
		})
	]
});
