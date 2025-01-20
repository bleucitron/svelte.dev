<script>
	import Stepper from './Stepper.svelte';

	let value = $state(0);
</script>

<p>La valeur actuelle est {value}</p>

<Stepper
	increment={() => value += 1}
	decrement={() => value -= 1}
/>
