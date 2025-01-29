<script>
	let scoops = $state(1);
	let flavours = $state([]);

	const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
</script>

<h2>Taille</h2>

{#each [1, 2, 3] as number}
	<label>
		<input
			type="radio"
			name="scoops"
			value={number}
			bind:group={scoops}
		/>

		{number} {number === 1 ? 'boule' : 'boules'}
	</label>
{/each}

<h2>Parfums</h2>

{#each ['cookies', 'menthe-chocolat', 'fraise'] as flavour}
	<label>
		<input
			type="checkbox"
			name="flavours"
			value={flavour}
			bind:group={flavours}
		/>

		{flavour}
	</label>
{/each}

{#if flavours.length === 0}
	<p>Merci de sélectionner au moins un parfum.</p>
{:else if flavours.length > scoops}
	<p>Vous ne pouvez pas demander plus de parfums que de boules !</p>
{:else}
	<p>
		Vous avez commandé {scoops} {scoops === 1 ? 'boule' : 'boules'}
		de parfum : {formatter.format(flavours)}
	</p>
{/if}
