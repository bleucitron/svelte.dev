---
title: {#await ...}
---

```svelte
<!--- copy: false  --->
{#await expression}...{:then name}...{:catch name}...{/await}
```

```svelte
<!--- copy: false  --->
{#await expression}...{:then name}...{/await}
```

```svelte
<!--- copy: false  --->
{#await expression then name}...{/await}
```

```svelte
<!--- copy: false  --->
{#await expression catch name}...{/await}
```

Les blocs `await` vous permettent de gérer les trois états possible d'une
[`Promise`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise)
(_promesse_) – en attente, résolue, ou rejetée.

```svelte
{#await promise}
	<!-- la promesse est en attente -->
	<p>en attente de la résolution de la promesse...</p>
{:then value}
	<!-- la promesse a été résolue ou bien ce n'est pas une promesse -->
	<p>La valeur vaut {value}</p>
{:catch error}
	<!-- la promesse a été rejetée -->
	<p>Quelque chose s'est mal passé : {error.message}</p>
{/await}
```

> [!NOTE] Lors du rendu côté serveur, seule la branche d'attente sera considérée.
>
> Si l'expression fournie n'est pas une `Promise`, seule la branche `:then` sera considérée, même
> lors du rendu côté serveur.

Le bloc `catch` peut être omis si vous n'avez pas besoin d'afficher quoi que ce soit lors que la
promesse est rejetée (ou si aucune erreur n'est possible).

```svelte
{#await promise}
	<!-- la promesse est en attente -->
	<p>en attente de la résolution de la promesse...</p>
{:then value}
	<!-- la promesse a été résolue ou bien ce n'est pas une promesse -->
	<p>La valeur vaut {value}</p>
{/await}
```

Si l'état d'attente ne vous intéresse pas, vous pouvez aussi ignorer le bloc initial.

```svelte
{#await promise then value}
	<p>La valeur vaut {value}</p>
{/await}
```

De même, si vous souhaitez uniquement afficher l'état d'erreur, vous pouvez ignorer le bloc `then`.

```svelte
{#await promise catch error}
	<p>Voici l'erreur : {error}</p>
{/await}
```

> [!NOTE] Vous pouvez utiliser `#await` avec
> [`import(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)
> pour afficher des composants de manière différée :
>
> ```svelte
> {#await import('./Component.svelte') then { default: Component }}
> 	<Component />
> {/await}
> ```

