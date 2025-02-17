---
title: Props de snippets implicites
---

Par commodité, les snippets déclarés directement au sein du composant deviennts des props _sur_ ce
composant. Prenez les snippets `header` et `row` et déplacez les dans `<FilteredList>` :

```svelte
/// file: App.svelte
<FilteredList
	data={colors}
	field="name"
	{header}
	{row}
>
	+++{#snippet header()}...{/snippet}+++

	+++{#snippet row(d)}...{/snippet}+++
</FilteredList>

---{#snippet header()}...{/snippet}---

---{#snippet row(d)}...{/snippet}---
```

Nous pouvons alors les supprimer des props passées explicitement :

```svelte
/// file: App.svelte
<FilteredList data={colors} field="name" ---{header} {row}--->
	{#snippet header()}...{/snippet}

	{#snippet row(d)}...{/snippet}
</FilteredList>
```

Tout contenu au sein d'un composant qui ne fait _pas_ partie d'un snippet déclaré devient un snippet
spécial appelé `children`. Puisque `header` n'a pas de paramètres, nous pouvons le transformer en
`children` en supprimant les balises de snippet...

```svelte
/// file: App.svelte
---{#snippet header()}---
<header>
	<span class="color"></span>
	<span class="name">nom</span>
	<span class="hex">hex</span>
	<span class="rgb">rgb</span>
	<span class="hsl">hsl</span>
</header>
---{/snippet}---
```

... et en renommant la prop `header` en `children` de l'autre côté :

```svelte
/// file: FilteredList.svelte
<script>
	let { data, field, +++children+++, row } = $props();

	// ...
</script>
```

```svelte
/// file: FilteredList.svelte
<div class="header">
	+++{@render children()}+++
</div>
```
