<script>
	import { roll } from './utils.js';

	let promise = $state(roll());
</script>

<button onclick={() => promise = roll()}>
	lancer les dés
</button>

{#await promise}
	<p>...les dés roulent</p>
{:then number}
	<p>vous avez obtenu un {number} !</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
