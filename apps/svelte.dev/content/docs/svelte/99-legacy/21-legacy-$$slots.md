---
title: $$slots
---

En mode runes, nous connaissons quels sont les [snippets](snippet) fournis à un composant, puisque
les snippets sont des props comme les autres.

En mode legacy, pour savoir si du contenu a été fourni pour un slot donné, il faut utiliser l'objet
`$$slots`, dont les clés sont les noms des slots passés au composant par son parent.

```svelte
<!--- file: Card.svelte --->
<div>
	<slot name="title" />
	{#if $$slots.description}
		<!-- ce <hr> et le slot ne seront affichés que si `slot="description"` est fourni -->
		<hr />
		<slot name="description" />
	{/if}
</div>
```

```svelte
<!--- file: App.svelte --->
<Card>
	<h1 slot="title">Blog Post Title</h1>
	<!-- aucun slot nommé "description" n'a été fourni, le slot optionnel ne sera donc pas affiché -->
</Card>
```
