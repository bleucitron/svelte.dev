---
title: Styles scopés
---

Les composants Svelte peuvent inclure un élément `<style>` contenant du CSS appartenant au
composant. Ce CSS est _scopé_ par défaut, ce qui signifie que les styles ne seront pas appliqués aux
éléments de la page qui ne sont pas définis par le composant en question.

Ceci est possible en ajoutant une classe aux éléments concernés, classe dont le nom est basé sur un
hash des styles du composant (par ex. `svelte-123xyz`).

```svelte
<style>
	p {
		/* ceci n'affectera que les éléments `<p>` dans ce composant */
		color: burlywood;
	}
</style>
```

## Spécificité [!VO]Specificity

Chaque sélecteur scopé reçoit un incrément de
[spécificité](https://developer.mozilla.org/fr/docs/Web/CSS/Specificity) de 0-1-0, résultant de
l'application de la classe de scope (par ex. `.svelte-123xyz`). Cela signifie que (par example) un
sélecteur `p` défini sur un composant aura priorité sur un sélecteur `p` défini dans une feuille de
style globale, même si la feuille de style globale est chargée plus tard.

Dans certains cas, la classe de scope doit être ajoutée plusieurs fois à un sélecteur, mais après le
premier ajout, cette classe est ajoutée en utilisant `:where(.svelte-xyz123)` pour ne pas
incrémenter de nouveau la spécificité.

## Keyframes scopés [!VO]Scoped keyframes

Si un composant définit des `@keyframes`, leur nom est scopé au composant en utilisant la même
approche de hashing. Toute règle `animation` du composant sera ajustée de la même manière :

```svelte
<style>
	.bouncy {
		animation: bounce 10s;
	}

	/* ces keyframes ne sont accessibles que dans ce composant */
	@keyframes bounce {
		/* ... *.
	}
</style>
```



