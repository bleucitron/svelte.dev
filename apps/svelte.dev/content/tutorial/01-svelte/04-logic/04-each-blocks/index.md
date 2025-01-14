---
title: Bloc each
---

Lorsque vous construisez des interfaces utilisateur, vous avez souvent besoin de travailler avec des
listes de données. Dans cet exercice, nous avons répété le markup du `<button>` plusieurs fois — en
changeant la couleur à chaque fois — mais il en reste d'autres à ajouter.

Plutôt que copier, coller, modifier laborieusement, nous pouvons nous débarrasser de tout sauf du
premier bouton, puis nous servir d'un bloc `#each` :

```svelte
/// file: App.svelte
<div>
	+++{#each colors as color}+++
		<button
			style="background: red"
			aria-label="red"
			aria-current={selected === 'red'}
			onclick={() => selected = 'red'}
		></button>
	+++{/each}+++
</div>
```

> [!NOTE] L'expression (`colors` dans ce cas) peut être n'importe quel itérable ou objet de type
> tableau — autrement dit, tout ce qui est compatible avec
> [`Array.from`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/from).

Il nous reste à utiliser la variable `color` au lieu de `"red"` :

```svelte
/// file: App.svelte
<div>
	{#each colors as color}
		<button
			style="background: +++{color}+++"
			aria-label=+++{color}+++
			aria-current={selected === +++color+++}
			onclick={() => selected = +++color+++}
		></button>
	{/each}
</div>
```

Vous pouvez obtenir l'_indice_ courant en deuxième argument, comme ceci :

```svelte
/// file: App.svelte
<div>
	{#each colors as color, +++i}+++
		<button
			style="background: {color}"
			aria-label={color}
			aria-current={selected === color}
			onclick={() => selected = color}
		>+++{i + 1}+++</button>
	{/each}
</div>
```
