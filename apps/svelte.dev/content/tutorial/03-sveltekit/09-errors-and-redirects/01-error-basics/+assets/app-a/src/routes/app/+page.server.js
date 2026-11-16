import { error } from '@sveltejs/kit';

export function load() {
	error(420, 'Gardez votre calme');
}
