<script>
	let questions = [
		{
			id: 1,
			text: `Où êtes-vous allé à l'école ?`
		},
		{
			id: 2,
			text: `Quel est le nom de jeune fille de votre mère ?`
		},
		{
			id: 3,
			text: `Quelle information personnelle une personne mal intentionnée pourrait aisément trouver
grâce à Google ?`
		}
	];

	let selected = $state();

	let answer = $state('');

	function handleSubmit(e) {
		e.preventDefault();

		alert(
			`vous avez répondu à la question ${selected.id} (${selected.text}) avec "${answer}"`
		);
	}
</script>

<h2>Questions pas du tout sécurisées</h2>

<form onsubmit={handleSubmit}>
	<select
		bind:value={selected}
		onchange={() => (answer = '')}
	>
		{#each questions as question}
			<option value={question}>
				{question.text}
			</option>
		{/each}
	</select>

	<input bind:value={answer} />

	<button disabled={!answer} type="submit">
		Envoyer
	</button>
</form>

<p>
	question sélectionnée {selected
		? selected.id
		: '[chargement...]'}
</p>
