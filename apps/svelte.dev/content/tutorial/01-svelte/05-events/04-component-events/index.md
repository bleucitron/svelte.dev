---
title: Évènements de composant
---

Vous pouvez passer des gestionnaires d'évènement aux composants comme n'importe quelle autre prop.
Dans `Stepper.svelte`, ajoutez les props `increment` et `decrement`...

```svelte
/// file: Stepper.svelte
<script>
	let { +++increment, decrement+++ } = $props();
</script>
```

... et connectez les :

```svelte
/// file: Stepper.svelte
<button +++onclick={decrement}+++>-1</button>
<button +++onclick={increment}+++>+1</button>
```

Dans `App.svelte`, définissez les gestionnaires :

```svelte
<Stepper
	+++increment={() => value += 1}+++
	+++decrement={() => value -= 1}+++
/>
```
