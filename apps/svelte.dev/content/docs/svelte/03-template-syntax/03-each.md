---
title: {#each ...}
---

```svelte
<!--- copy: false  --->
{#each expression as name}...{/each}
```

```svelte
<!--- copy: false  --->
{#each expression as name, index}...{/each}
```

Vous pouvez itérer sur des valeurs en utilisant un bloc `#each`. Les valeurs en questions peuvent
être des tableaux, des objets similaires à des tableaux (c-à-d tout ce qui possède une propriété
`length`), ou des itérables comme `Map` et `Set` – autrement dit, tout ce qui peut être utilisé avec
`Array.from`.

```svelte
<h1>Shopping list</h1>
<ul>
	{#each items as item}
		<li>{item.name} x {item.qty}</li>
	{/each}
</ul>
```

Un bloc `#each` peut également préciser un _index_, correspondant au deuxième argument d'un callback
`array.map(...)`.

```svelte
{#each items as item, i}
	<li>{i + 1}: {item.name} x {item.qty}</li>
{/each}
```

## Les blocs `each` à clé [!VO]Keyed each blocks

```svelte
<!--- copy: false  --->
{#each expression as name (key)}...{/each}
```

```svelte
<!--- copy: false  --->
{#each expression as name, index (key)}...{/each}
```

Si une expression _key_ est fournie – qui se doit d'identifier de manière unique chaque élément de
la liste – Svelte va s'en servir pour remplacer finement les éléments de la liste lorsque celle-ci
change, plutôt que d'ajouter ou supprimer les éléments à la fin. La clé (_key_) peut être n'importe
quel objet, mais les chaînes de caractères et les nombres sont recommandés car il permettent à
l'identité de persister lorsque les objets eux-mêmes changent.

```svelte
{#each items as item (item.id)}
	<li>{item.name} x {item.qty}</li>
{/each}

<!-- ou avec la valeur d'index additionnelle -->
{#each items as item, i (item.id)}
	<li>{i + 1}: {item.name} x {item.qty}</li>
{/each}
```

Vous pouvez déstructurer librement ou utiliser comme bon vous semble le paramètre de reste dans les
blocs `#each`.

```svelte
{#each items as { id, name, qty }, i (id)}
	<li>{i + 1}: {name} x {qty}</li>
{/each}

{#each objects as { id, ...rest }}
	<li><span>{id}</span><MyComponent {...rest} /></li>
{/each}

{#each items as [id, ...rest]}
	<li><span>{id}</span><MyComponent values={rest} /></li>
{/each}
```

## Blocs `each` sans élément [!VO]Each blocks without an item

```svelte
<!--- copy: false  --->
{#each expression}...{/each}
```

```svelte
<!--- copy: false  --->
{#each expression, index}...{/each}
```

Dans le cas où vous souhaitez uniquement afficher quelque chose `n` fois, vous pouvez omettre le
`as`
([demo](/playground/untitled#H4sIAAAAAAAAE3WR0W7CMAxFf8XKNAk0WsSeUEaRpn3Guoc0MbQiJFHiMlDVf18SOrZJ48259_jaVgZmxBEZZ28thgCNFV6xBdt1GgPj7wOji0t2EqI-wa_OleGEmpLWiID_6dIaQkMxhm1UdwKpRQhVzWSaVORJNdvWpqbhAYVsYQCNZk8thzWMC_DCHMZk3wPSThNQ088I3mghD9UwSwHwlLE5PMIzVFUFq3G7WUZ2OyUvU3JOuZU332wCXTRmtPy1NgzXZtUFp8WFw9536uWqpbIgPEaDsJBW90cTOHh0KGi2XsBq5-cT6-3nPauxXqHnsHJnCFZ3CvJVkyuCQ0mFF9TZyCQ162WGvteLKfG197Y3iv_pz_fmS68Hxt8iPBPj5HscP8YvCNX7uhYCAAA=)):

```svelte
<div class="chess-board">
	{#each { length: 8 }, rank}
		{#each { length: 8 }, file}
			<div class:black={(rank + file) % 2 === 1}></div>
		{/each}
	{/each}
</div>
```

## Blocs `else` [!VO]Else blocks

```svelte
<!--- copy: false  --->
{#each expression as name}...{:else}...{/each}
```

Un bloc `#each` peut également avoir une clause `{:else}`, qui sera affichée si la liste est vide.

```svelte
{#each todos as todo}
	<p>{todo.text}</p>
{:else}
	<p>Rien à faire aujourd'hui !</p>
{/each}
```
