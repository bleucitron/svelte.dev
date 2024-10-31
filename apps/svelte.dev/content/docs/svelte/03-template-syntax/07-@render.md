---
title: {@render ...}
---

Pour afficher un [snippet](snippet), utiliser une balise `{@render ...}`.

```svelte
{#snippet sum(a, b)}
	<p>{a} + {b} = {a + b}</p>
{/snippet}

{@render sum(1, 2)}
{@render sum(3, 4)}
{@render sum(5, 6)}
```

L'expression peut être un identifiant comme `sum`, ou une expression JavaScript arbitraire :

```svelte
{@render (cool ? snippetCool : snippetNul)()}
```

## Snippets optionnels [!VO]Optional snippets

Si le snippet est potentiellement `undefined` – par exemple parce que c'est une valeur pas encore
définie – vous pouvez alors utiliser le chaînage optionnel pour ne l'afficher que lorsqu'il sera
défini :

```svelte
{@render children?.()}
```

Vous pouvez également utiliser un bloc [`{#if ...}`](if) avec une clause `:else` pour afficher du
contenu par défaut :

```svelte
{#if children}
	{@render children()}
{:else}
	<p>contenu par défaut</p>
{/if}
```
