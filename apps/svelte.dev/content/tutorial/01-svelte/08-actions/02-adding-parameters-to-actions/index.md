---
title: Ajouter des paramètres
---

Comme avec les transitions et les animations, une action peut prendre un argument, avec lequel la
fonction de l'action sera appelée en plus de l'élément auquel l'action appartient.

Dans cet exercice, nous voulons ajouter un tooltip au `<button>` en utilisant la librairie
[`Tippy.js`](https://atomiks.github.io/tippyjs/). L'action est déjà câblée avec `use:tooltip`, mais
si vous survolez le bouton (ou si vous le sélectionnez avec le clavier) le tooltip s'affiche vide.

D'abord, l'action doit accepter une fonction qui renvoie des options à fournir à Tippy :

```js
/// file: App.svelte
function tooltip(node, +++fn+++) {
	$effect(() => {
		const tooltip = tippy(node, +++fn()+++);

		return tooltip.destroy;
	});
}
```

> [!NOTE] Nous passons une fonction, plutôt que les options elles-mêmes, car la fonction `tooltip`
> n'est pas rejouée lorsque les options changent.

Puis, nous devons passer les options à l'action :

```svelte
/// file: App.svelte
<button use:tooltip+++={() => ({ content })}+++>
	Survolez-moi
</button>
```

> [!NOTE] En Svelte 4, les actions renvoyaient un object avec des méthodes `update` et `destroy`.
> Ceci fonctionne toujours, mais nous recommandons de plutôt utiliser `$effect`, puisqu'il fournit
> plus de flexibilité et de granularité.
