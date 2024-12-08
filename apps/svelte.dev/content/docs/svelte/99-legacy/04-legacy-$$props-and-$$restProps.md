---
title: $$props et $$restProps
---

En mode runes, récupérer un objet contenant toutes les props fournies est facile, en utilisant la
rune [`$props`]($props).

En mode legacy, il faut utiliser `$$props` et `$$restProps` :

- `$props` contient toutes les props fournies, en incluant celles individuellement déclarées avec le
	mot-clé `export`
- `$$restProps` contient toutes les props fournies _sauf_ celles individuellement déclarées

Par exemple, un composant `<Button>` pourrait avoir besoin de fournir toutes ses props à un élément
`<button>`, à l'exception de la prop `variant` :

```svelte
<script>
	export let variant;
</script>

<button {...$$restProps} class="variant-{variant} {$$props.class ?? ''}">
	cliquez moi
</button>

<style>
	.variant-danger {
		background: red;
	}
</style>
```

En Svelte 3 ou 4, utiliser `$$props` et `$$restProps` impactent légèrement les performances, ils
doivent donc être utilisés uniquement lorsque nécessaire.
