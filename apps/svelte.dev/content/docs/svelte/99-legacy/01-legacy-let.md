---
title: Déclarations réactives let/var
---

En mode runes, un état réactif est explicitement déclaré avec la [rune `$state`]($state).

En mode legacy, les variables déclarées à la racine d'un composant sont automatiquement considérées
comme étant _réactives_. Réassigner ou muter ces variables (`count += 1` ou `object.x = y`) provoque
une mise à jour de l'interface.

```svelte
<script>
	let count = 0;
</script>

<button on:click={() => count += 1}>
	clics: {count}
</button>
```

Puisque la réactivité du mode legacy de Svelte est basée sur les _assignations_, l'utilisation de
méthodes de tableaux comme `.push()` et `.splice()` ne déclencheront pas de mises à jour. Une
assignation consécutive est nécessaire pour "dire" au compilateur de mettre à jour l'interface :

```svelte
<script>
	let numbers = [1, 2, 3, 4];

	function addNumber() {
		// l'exécution de cette méthode ne déclenche pas de mise à jour
		numbers.push(numbers.length + 1);

		// cette assignation déclenche les mises à jour
		// de tout ce qui dépend de `numbers`
		numbers = numbers;
	}
</script>
```
