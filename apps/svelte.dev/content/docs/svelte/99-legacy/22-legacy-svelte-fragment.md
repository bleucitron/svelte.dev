---
title: <svelte:fragment>
---

L'élément	`<svelte:fragment>` permet de placer du contenu dans un [slot nommé](legacy-slots) sans
rajouter un élément contenant supplémentaire dans le DOM, conservant ainsi intacte la structure de
votre document.

```svelte
<!--- file: Widget.svelte --->
<div>
	<slot name="header">Aucun en-tête n'a été fourni</slot>
	<p>Du contenu entre l'en-tête et le pied-de-page</p>
	<slot name="footer" />
</div>
```

```svelte
<!--- file: App.svelte --->
<script>
	import Widget from './Widget.svelte';
</script>

<Widget>
	<h1 slot="header">Hello</h1>
	<svelte:fragment slot="footer">
		<p>Tous droits réservés</p>
		<p>Copyright (c) 2019 Svelte Industries</p>
	</svelte:fragment>
</Widget>
```

> [!NOTE]
> En Svelte 5+, ce concept est obsolète, car les snippets ne créent pas d'élément contenant
