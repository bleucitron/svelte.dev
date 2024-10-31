---
title: Styles globaux
---

## :global(...)

Pour appliquer du style à un sélecteur de manière globale, utilisez le modificateur `:global(...)` :

```svelte
<style>
	:global(body) {
		/* s'applique à `<body>` */
		margin: 0;
	}

	div :global(strong) {
		/* s'applique à tous les éléments `<strong>`, quelque soit le composant
			qui sont dans des éléments `<div>` appartenant à ce composant*/
		color: goldenrod;
	}

	p:global(.big.red) {
		/* s'applique à tous les éléments `<p>` appartenant à ce composant
			qui ont `class="big red", même si celle-ci est ajoutée
			programmatiquement (par exemple par une librairie */
	}
</style>
```

Si vous souhaitez rendre des `@keyframes` accessibles globalement, vous aurez besoin de préfixer les
noms de vos keyframes avec `-global-`.

La partie `-global-` sera supprimée à la compilation, et le keyframe sera alors référencé en
utilisant `my-animation-name` ailleurs dans votre code.

```svelte
<style>
	@keyframes -global-my-animation-name {
		/* le code est défini ici */
	}
</style>
```

## :global

Pour appliquer globalement des styles à un groupe de sélecteurs, créez un bloc `:global {...} :

```svelte
<style>
	:global {
		/* s'applique à toutes les `<div>` de votre application */
		div { ... }

		/* s'applique à tous les `<p>` de votre application */
		p { ... }
	}

	.a :global {
		/* s'applique à les éléments `.b .c .d`, quelque soit le composant
			qui est dans un élément `.a` de ce composant */
		.b .c .d {...}
	}
</style>
```

> [!NOTE] Le deuxième exemple ci-dessus peut aussi être écrit avec un sélecteur équivalent
> `.a :global .b .c .d`, où tout ce qui se trouve après `:global` est hors du scope. Toutefois la
> forme imbriquée est à privilégier.
