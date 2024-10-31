---
title: {#key ...}
---

```svelte
<!--- copy: false  --->
{#key expression}...{/key}
```

Les blocs `key` détruisent et recréent leur contenu lorsque la valeur d'une expression change.
Lorsqu'utilisés autour de composants, ils déclenchent leur réinstanciation et réinitialisation :

```svelte
{#key value}
	<Component />
{/key}
```

C'est également utile si vous souhaitez déclencher une transition à chaque fois qu'une valeur change
:

```svelte
{#key value}
	<div transition:fade>{value}</div>
{/key}
```
