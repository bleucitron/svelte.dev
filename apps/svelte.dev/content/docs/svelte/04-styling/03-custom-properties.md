---
title: Propriétés personnalisées
---

Vous pouvez fournir des propriétés CSS personnalisées – tant statiques que dynamiques – à vos
composants :

```svelte
<Slider
	bind:value
	min={0}
	max={100}
	--track-color="black"
	--thumb-color="rgb({r} {g} {b})"
/>
```

Le code ci-dessus est en substance l'équivalent de ceci :

```svelte
<svelte-css-wrapper style="display: contents; --track-color: black; --thumb-color: rgb({r} {g} {b})">
	<Slider
		bind:value
		min={0}
		max={100}
	/>
</svelte-css-wrapper>
```

Pour un élément SVG, le compilateur utilisera plutôt un `<g>` :

```svelte
<g style="--track-color: black; --thumb-color: rgb({r} {g} {b})">
	<Slider
		bind:value
		min={0}
		max={100}
	/>
</g>
```

Au sein du composant, nous pouvons lire ces propriétés personnalisées (et fournir des valeurs par
défaut) en utilisant
[`var(...)`](https://developer.mozilla.org/fr/docs/Web/CSS/Using_CSS_custom_properties) :

```svelte
<style>
	.track {
		background: var(--track-color, #aaa);
	}

	.thumb {
		background: var(--thumb-color, blue);
	}
</style>
```

Vous n'avez pas _besoin_ de préciser les valeurs directement sur le composant ; tant que les
propriétés personnalisées sont sur un élément parent, le composant peut les utiliser. Il est courant
de définir des propriétés personnalisées sur l'élément `:root` dans une feuille de styles globale
afin qu'elles s'appliquent à toute votre application.

> [!NOTE] Même si l'élément supplémentaire n'aura pas d'influence sur votre layout, il va tout de
> même affecter tout sélecteur CSS qui (par exemple) utiliserait le combinateur `>` pour cibler un
> élément directement enfant de son conteneur.
