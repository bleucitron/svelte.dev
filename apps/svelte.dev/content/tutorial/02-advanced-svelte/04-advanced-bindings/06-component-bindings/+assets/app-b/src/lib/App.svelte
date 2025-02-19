<script>
	import Keypad from './Keypad.svelte';

	let pin = $state('');

	let view = $derived(pin
		? pin.replace(/\d(?!$)/g, '•')
		: 'entrer votre code pin');

	function onsubmit() {
		alert(`vous avez entré ${pin}`);
	}
</script>

<h1 style="opacity: {pin ? 1 : 0.4}">
	{view}
</h1>

<Keypad bind:value={pin} {onsubmit} />
