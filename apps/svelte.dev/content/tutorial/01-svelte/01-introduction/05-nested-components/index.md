---
title: Composants imbriqués
---

Écrire toute votre application au sein d'un seul et même composant ne serait pas très pratique. Au
lieu de ça, nous pouvons importer des composants depuis d'autres fichiers et les inclure dans notre
markup.

Ajoutez une balise `<script>` en haut de `App.svelte` afin d'importer `Nested.svelte`...

```svelte
/// file: App.svelte
+++<script>
	import Nested from './Nested.svelte';
</script>+++
```

... et ajoutez une instance du composant `<Nested />` :

```svelte
/// file: App.svelte
<p>Ceci est un paragraphe.</p>
+++<Nested />+++
```

Notez que même si `Nested.svelte` possède un élément `<p>`, les styles de `App.svelte` ne s'y
appliquent pas.

> [!NOTE] Les noms de composant ont leur première lettre en majuscules, pour les distinguer des
> éléments HTML.
