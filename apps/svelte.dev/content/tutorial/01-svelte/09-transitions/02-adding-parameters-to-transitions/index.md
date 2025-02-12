---
title: Ajouter des paramètres
---

Les fonctions de transition peuvent accepter des paramètres. Remplacez la transition `fade` par
`fly`...

```svelte
/// file: App.svelte
<script>
	import { +++fly+++ } from 'svelte/transition';

	let visible = $state(true);
</script>
```

... et appliquez-la à `<p>` avec quelques options :

```svelte
/// file: App.svelte
<p transition:+++fly={{ y: 200, duration: 2000 }}+++>
	Entre et sort en +++volant+++
</p>
```

Notez que la transition est _réversible_ — si vous ré-appuyez sur la checkbox pendant la transition,
celle-ce sera inversée depuis sa position courante, plutôt que de recommencer depuis le début ou la
fin.
