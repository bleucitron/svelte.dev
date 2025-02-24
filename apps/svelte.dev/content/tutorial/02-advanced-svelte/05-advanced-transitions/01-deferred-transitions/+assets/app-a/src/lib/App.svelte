<script>
	import TodoList from './TodoList.svelte';

	const todos = $state([
		{ id: 1, done: false, description: 'écrire de la doc' },
		{ id: 2, done: false, description: 'commencer à écrire un article de blog' },
		{ id: 3, done: true, description: 'acheter du lait' },
		{ id: 4, done: false, description: 'tondre la pelouse' },
		{ id: 5, done: false, description: 'nourrir la tortue' },
		{ id: 6, done: false, description: 'corriger des bugs' }
	]);

	let uid = todos.length + 1;

	function remove(todo) {
		const index = todos.indexOf(todo);
		todos.splice(index, 1);
	}
</script>

<div class="board">
	<input
		placeholder="qu'avez-besoin de faire ?"
		onkeydown={(e) => {
			if (e.key !== 'Enter') return;

			todos.push({
				id: uid++,
				done: false,
				description: e.currentTarget.value
			});

			e.currentTarget.value = '';
		}}
	/>

	<div class="todo">
		<h2>à faire</h2>
		<TodoList todos={todos.filter((t) => !t.done)} {remove} />
	</div>

	<div class="done">
		<h2>fait</h2>
		<TodoList todos={todos.filter((t) => t.done)} {remove} />
	</div>
</div>

<style>
	.board {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-column-gap: 1em;
		max-width: 36em;
		margin: 0 auto;
	}

	.board > input {
		font-size: 1.4em;
		grid-column: 1/3;
		padding: 0.5em;
		margin: 0 0 1rem 0;
	}

	h2 {
		font-size: 2em;
		font-weight: 200;
	}
</style>
