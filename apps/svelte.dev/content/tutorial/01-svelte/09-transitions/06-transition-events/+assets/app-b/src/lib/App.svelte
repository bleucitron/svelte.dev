<script>
	import { fly } from 'svelte/transition';

	let visible = $state(true);
	let status = $state('en attente...');
</script>

<p>statut : {status}</p>

<label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>

{#if visible}
	<p
		transition:fly={{ y: 200, duration: 2000 }}
		onintrostart={() => status = 'début de l\'entrée'}
		onoutrostart={() => status = 'début de la sortie'}
		onintroend={() => status = 'fin de l\'entrée'}
		onoutroend={() => status = 'fin de la sortie'}
	>
		Entre et sort en volant
	</p>
{/if}
