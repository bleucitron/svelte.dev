---
title: Passer des snippers aux composants
---

Puisque les snippets — comme les fonctions — ne sont que des valeurs, ils peuvent être passés aux
composants en tant que props.

Prenez ce composant `<FilteredList>`. Son travail est de filtrer les `data` qui lui sont fournies,
mais il n'a pas d'avis sur la façon dont les données doivent être rendues — c'est la responsabilité
du composant parent.

Nous avons déjà des snippets de définis. Commencez par les passer à `<FilteredList>` :

```svelte
/// file: App.svelte
<FilteredList
	data={colors}
	field="name"
	+++{header}+++
	+++{row}+++
></FilteredList>
```

Puis, de l'autre côté, déclarez `header` et `row` en tant que props :

```svelte
/// file: FilteredList.svelte
<script>
	let { data, field, +++header, row+++ } = $props();

	// ...
</script>
```

Enfin, remplacez le contenu par défaut par les balises de rendu :

```svelte
/// file: FilteredList.svelte
<div class="header">
	+++{@render header()}+++
</div>

<div class="content">
	{#each filtered as d}
		+++{@render row(d)}+++
	{/each}
</div>
```

Vous n'aurez plus jamais besoin de mémoriser le code hexa de `MistyRose` ou `PeachPuff`.
