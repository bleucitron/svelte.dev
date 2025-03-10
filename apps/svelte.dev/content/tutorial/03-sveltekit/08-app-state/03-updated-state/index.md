---
title: updated
---

L'état `updated` contient `true` ou `false` selon qu'une nouvelle version de l'application soit
déployée ou non depuis la première ouverture de la page. Pour que cela fonctionne, votre fichier
`svelte.config.js` doit préciser `kit.version.pollInterval`.

```svelte
/// file: src/routes/+layout.svelte
<script>
	import { page, navigating, +++updated+++ } from '$app/state';
</script>
```

La détection de changements de version ne se produit qu'en production, pas en développement. Pour
cette raison `updated.current` sera toujours à `false` dans ce tutoriel.

Vous pouvez manuellement vérifier si de nouvelles versions existent, indépendamment de
`pollInterval`, en exécutant `updated.check()`.

```svelte
/// file: src/routes/+layout.svelte

+++{#if updated.current}+++
	<div class="toast">
		<p>
			Une nouvelle version de l'application est disponible

			<button onclick={() => location.reload()}>
				recharger la page
			</button>
		</p>
	</div>
+++{/if}+++
```

> [!NOTE] Avant SvelteKit 2.12, vous deviez utiliser `$app/stores` pour cela, qui fournit un store
> `$page` contenant les mêmes informations. Si vous utilisez actuellement `$app/stores`, nous vous
> conseillons de migrer vers `$app/state` (ce qui requiert Svelte 5).
