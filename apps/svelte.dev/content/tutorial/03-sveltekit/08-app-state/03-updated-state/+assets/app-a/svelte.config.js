export default {
	kit: {
		version: {
			// idéalement, ceci doit être une valeur déterministe
			// comme la valeur de `git rev-parse HEAD`
			name: Date.now().toString(),

			// si undefined, aucune vérification automatique n'aura lieu
			pollInterval: 5000
		}
	}
};
