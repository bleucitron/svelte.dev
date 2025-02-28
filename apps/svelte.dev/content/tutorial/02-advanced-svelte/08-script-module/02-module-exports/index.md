---
title: Exports
---

Tout ce qui exporté depuis un bloc de script `module` devient un export du module lui-même.
Exportons une fonction `stopAll` :

```svelte
/// file: AudioPlayer.svelte
<script module>
	let current;

+++	export function stopAll() {
		current?.pause();
	}+++
</script>
```

Nous pouvons maintenant importer `stopAll` dans `App.svelte`...

```svelte
/// file: App.svelte
<script>
	import AudioPlayer, +++{ stopAll }+++ from './AudioPlayer.svelte';
	import { tracks } from './tracks.js';
</script>
```

... et l'utiliser dans un gestionnaire d'évènement :

```svelte
/// file: App.svelte
<div class="centered">
	{#each tracks as track}
		<AudioPlayer {...track} />
	{/each}

+++	<button onclick={stopAll}>
		arrêter tout
	</button>+++
</div>
```

> [!NOTE] Vous ne pouvez pas avoir d'export par défaut, car le composant lui-même _est_ l'export par
> défaut
