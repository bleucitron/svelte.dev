<script>
	import { roll } from './utils.js';

	let promise = $state(roll());
</script>

<button onclick={() => promise = roll()}>
	lancer les dés
</button>

<p>...les dés roulent</p>
