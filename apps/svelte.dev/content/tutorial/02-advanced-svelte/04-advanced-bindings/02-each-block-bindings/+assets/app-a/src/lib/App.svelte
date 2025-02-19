<script>
	let todos = $state([
		{ done: false, text: 'finir le tutoriel de Svelte' },
		{ done: false, text: 'construire une appli' },
		{ done: false, text: 'dominer le monde' }
	]);

	function add() {
		todos.push({
			done: false,
			text: ''
		});
	}

	function clear() {
		todos = todos.filter((t) => !t.done);
	}

	let remaining = $derived(todos.filter((t) => !t.done).length);
</script>

<div class="centered">
	<h1>todos</h1>

	<ul class="todos">
		{#each todos as todo}
			<li class={{ done: todo.done }}>
				<input
					type="checkbox"
					checked={todo.done}
				/>

				<input
					type="text"
					placeholder="Qu'avez-vous besoin de faire ?"
					value={todo.text}
				/>
			</li>
		{/each}
	</ul>

	<p>{remaining} restants</p>

	<button onclick={add}>
		Ajouter
	</button>

	<button onclick={clear}>
		Supprimer les terminés
	</button>
</div>

<style>
	.centered {
		max-width: 20em;
		margin: 0 auto;
	}

	.done {
		opacity: 0.4;
	}

	li {
		display: flex;
	}

	input[type="text"] {
		flex: 1;
		padding: 0.5em;
		margin: -0.2em 0;
		border: none;
	}
</style>
