<script>
	let yes = $state(false);
</script>

<label>
	<input type="checkbox" bind:checked={yes} />
	Oui ! Envoyez des emails de spam régulièrement
</label>

{#if yes}
	<p>
		Merci. Nous bombarderons votre boîte de réceloption et vendrons vos données personnelles.
	</p>
{:else}
	<p>
		Vous devez acceptez pour continuer. Si vous ne payez pas, vous êtes le produit.
	</p>
{/if}

<button disabled={!yes}>Abonnez-vous</button>
