---
title: updated
---

L'état `updated` contient `true` ou `false` selon qu'une nouvelle version de l'application soit
déployée ou non depuis la première ouverture de la page. Pour que cela fonctionne, votre fichier
`svelte.config.js` doit préciser `kit.version.pollInterval`.

L'état `updated` vaut `true` si une nouvelle version de l'application a été déployée depuis la
première ouverture de la page.

La vérification régulière de la version se fait une fois toutes les heures, par défaut. SvelteKit
vérifie également s'il existe une nouvelle version lorsqu'il reçoit des nouvelles réponses aux
requêtes de données, aux appels de fonctions distantes et aux actions de formulaires, et lorsque
l'onglet récupère le focus ou redevient visible. Cet exercise définit un intervalle de vérification
`version.pollInterval` plus court dans le fichier `vite.config` pour en faire la démonstration

```svelte
/// file: src/routes/+layout.svelte
<script>
	import { page, navigating, +++updated+++ } from '$app/state';
</script>
```

Les vérifications de version ne se produisent qu'en production, pas en développement. Pour
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
> `$page` contenant les mêmes informations. Ce store a été supprimé en faveur de `$app/state` avec
> SvelteKit 3.

> [!NOTE] SvelteKit 2 ne faisait aucune vérification par défaut, en ne vérifiait l'existence de
> nouvelles versions que lorsque `updated.check()` était exécutée ou lorsqu'une navigation échouait.
