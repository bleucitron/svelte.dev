---
title: Réactivité universelle
---

Dans les exercices précédents, nous avons utilisé des runes pour ajouter de la réactivité dans nos
composants. Mais nous pouvons également utiliser les runes _en dehors_ des composants, par exemple,
pour partager un état global.

Les composants `<Counter>` de cet exercice importent tous un objet `counter` depuis `shared.js`.
Mais il s'agit d'un objet normal, et rien ne se produit lorsque vous cliquez sur les boutons.
Ajoutons `$state(...)` autour de l'objet :

```js
/// file: shared.js
export const counter = +++$state({+++
	count: 0
+++})+++;
```

Ceci provoque une erreur, car vous ne pouvez pas utiliser de runes dans des fichiers `.js` normaux,
uniquement dans des fichiers `.svelte.js`.
Corrigeons cela — renommez le fichier en `shared.svelte.js`.

Puis, mettons à jour la déclaration d'import dans `Counter.svelte` :

```svelte
/// file: Counter.svelte
<script>
	import { counter } from './shared+++.svelte+++.js';
</script>
```

Désormais, lorsque vous cliquez sur n'importe quel bouton, les trois se mettent à jour
simultanément.

> [!NOTE] Vous ne pouvez pas exporter une déclaration `$state` depuis un module si la déclaration
> est réassignée (plutôt que juste mutée), car les importateurs n'aurait alors aucun moyen d'en
> être mis au courant.
