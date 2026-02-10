---
title: Styles de composants
tags: styles-global, styles-custom-properties
---

Il est parfois nécessaire d'influencer les styles au sein d'un composant enfant. Peut-être que nous
voulons colorier ces boîtes en rouge, vert et bleu.

Une façon de faire cela est d'utiliser le modificateur CSS `:global`, qui vous permet de cibler sans
discrimination les éléments au sein d'autres composants :

```svelte
/// file: App.svelte
<style>
	.boxes :global(.box:nth-child(1)) {
		background-color: red;
	}

	.boxes :global(.box:nth-child(2)) {
		background-color: green;
	}

	.boxes :global(.box:nth-child(3)) {
		background-color: blue;
	}
</style>
```

Mais il y a beaucoup de raison de ne _pas_ faire ça. D'abord, c'est extrêmement verbeux. Ensuite,
c'est fragile — tout changement dans les détails d'implémentation de `Box.svelte` pourrait casser le
sélecteur.

Mais surtout, c'est malpoli. Les composants devraient être capables de décider eux-mêmes quels
styles peuvent être contrôlés "de l'extérieur", de la même manière qu'ils décident quelles variables
sont exposées en tant que props. `:global` ne devrait être utilisé qu'en dernier recours, pour
contourner cette règle.

Dans `Box.svelte`, modifiez `background-color` pour qu'il soit déterminé par une [propriété CSS
personnalisée](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) :

```svelte
/// file: Box.svelte
<style>
	.box {
		width: 5em;
		height: 5em;
		border-radius: 0.5em;
		margin: 0 0 1em 0;
		background-color: +++var(--color, #ddd)+++;
	}
</style>
```

Tout élément parent (comme `<div class="boxes">`) peut définir la valeur de `--color`, mais nous
pouvons aussi la définir sur des composants individuels :

```svelte
/// file: App.svelte
<div class="boxes">
	<Box +++--color="red"+++ />
	<Box +++--color="green"+++ />
	<Box +++--color="blue"+++ />
</div>
```

Les valeurs peuvent être dynamiques, comme tout autre attribut.

> [!NOTE] Cette fonctionnalité fonctionne en entourant chaque composant dans un élément avec
> `display: contents`, lorsque nécessaire, et en y appliquant les propriétés personnalisées. Si vous
> inspectez les éléments, vous verrez ce genre de markup :
>
> ```svelte
> <svelte-css-wrapper style="display: contents; --color: red;">
> 	<!-- contents -->
> </svelte-css-wrapper>
> ```
>
> Grâce à `display: contents`, ceci n'affectera pas votre layout, mais l'élément supplémentaire
> _peut_ impacter des sélecteurs comme `.parent > .child`.
