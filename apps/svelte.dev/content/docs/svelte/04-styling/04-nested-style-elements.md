---
title: Éléments <style> imbriqués
---

Il ne peut y avoir qu'une seule balise `<style>` à la racine d'un composant.

Toutefois, il est possible d'avoir une balise `<style>` imbriquée dans d'autres éléments ou blocs
logiques.

Dans ce cas, la balise `<style>` sera ajoutée telle quelle dans le DOM ; aucun scope ou traitement
ne sera appliqué à cette balise `<style>`.

```svelte
<div>
	<style>
		/* cette balise `<style>` sera ajoutée telle quelle */
		div {
			/* ceci s'appliquera à tous les éléments `<div>` du DOM */
			color: red;
		}
	</style>
</div>
```
