export function handleError({ kind, error }) {
	if (kind === 'unknown') {
		console.error(error);

		return {
			message: 'tout va bien',
			code: 'JEREMYBEARIMY'
		};
	}
}
