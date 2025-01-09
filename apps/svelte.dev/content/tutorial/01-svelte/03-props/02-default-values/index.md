---
title: Valeurs par défaut
---

Nous pouvons facilement définir des valeurs de props par défaut dans `Nested.svelte` :

```svelte
/// file: Nested.svelte
<script>
	let { answer +++= 'un mystère'+++ } = $props();
</script>
```

Si on ajoutons maintenant un deuxième composant _sans_ une prop `answer`, celui-ci va utiliser la
valeur par défaut :

```svelte
/// file: App.svelte
<Nested answer={42}/>
+++<Nested />+++
```
