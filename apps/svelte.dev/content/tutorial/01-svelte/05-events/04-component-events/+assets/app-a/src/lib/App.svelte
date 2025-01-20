<script>
	import Stepper from './Stepper.svelte';

	let value = $state(0);
</script>

<p>La valeur actuelle est {value}</p>

<Stepper />
