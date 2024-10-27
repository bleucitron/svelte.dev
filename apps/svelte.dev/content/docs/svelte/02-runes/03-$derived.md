---
title: $derived
---

Vous pouvez déclarer un état dérivé avec la rune `$derived` :

```svelte
<script>
	let count = $state(0);
	let doubled = $derived(count * 2);
</script>

<button onclick={() => count++}>
	{doubled}
</button>

<p>Le double de {count} vaut {doubled}</p>
```

L'expression à l'intérieur de `$derived(...)` ne doit pas contenir d'effet de bord. Svelte empêchera
les changements d'état (par ex. `count++`) à l'intérieur d'expressions dérivées.

Comme avec `$state`, vous pouvez définir les champs d'une classe en utilisant `$derived`.

> [!NOTE] Le code d'un composant Svelte est uniquement exécuté à sa création. Sans la rune
> `$derived`, `doubled` maintiendrait sa valeur originale même si `count` change de valeur.

## `$derived.by`

Parfois, certaines derivations complexes nécessitent plus qu'une simple expression. Dans ces cas là,
vous pouvez utiliser `$derived.by`, qui prend une fonction comme argument.

```svelte
<script>
	let numbers = $state([1, 2, 3]);
	let total = $derived.by(() => {
		let total = 0;
		for (const n of numbers) {
			total += n;
		}
		return total;
	});
</script>

<button onclick={() => numbers.push(numbers.length + 1)}>
	{numbers.join(' + ')} = {total}
</button>
```

Par essence, `$derived(expression)` est équivalent à `$derived.by(() => expression)`.

## Comprendre les dépendences

Tout ce qui est lu de manière synchrone au de l'expression de `$derived` (ou du corps de la fonction
de `$derived.by`) est considérée comme une _dépendence_ de l'état dérivé. Lorsqu'un des états dont
il dépend est mis à jour, l'état dérivé sera marqué comme _sale_ et recalculé la prochaine fois que
sa valeur est lue.

Pour exempter un morceau d'état d'être considéré comme une dépendance, utilisez
[`untrack`](svelte#untrack).
