---
title: Usines à attachements
---

Il est courant d'avoir besoin d'un attachement qui dépend de certains paramètres ou de l'état d'un
composant. Dans ce scénario, vous pouvez utiliser une [usine à
attachement](/docs/svelte/@attach#Attachment-factories) — une fonction qui _renvoie_ un attachement.

Dans cet exercice, nous voulons ajouter un tooltip au `<button>` en utilisant la librairie
[`Tippy.js`](https://atomiks.github.io/tippyjs/). L'attachement est déjà câblé avec `{@attach
tooltip}`, mais si vous survolez le bouton (ou si vous le focalisez avec le clavier), le tooltip
s'affiche vide.

D'abord, nous avons besoin de convertir notre attachement classique en fonction d'_usine_ qui
renvoie un attachement.

```js
/// file: App.svelte
function tooltip(---node---) {
+++	return (node) => {+++
		const tooltip = tippy(node);
		return tooltip.destroy;
+++	};+++
}
```

Puis, l'usine doit accepter les options que nous voulons passer à Tippy (dans ce cas, uniquement
`content`) :

```js
/// file: App.svelte
function tooltip(+++content+++) {
	return (node) => {
		const tooltip = tippy(node+++, { content }+++);
		return tooltip.destroy;
	};
}
```

> [!NOTE] L'expression `tooltip(content)` est exécutée au sein d'un effet, l'attachement est donc
> détruit et recréé lorsque que `content` est mis à jour.

Enfin, nous devons appeler l'usine à attachement et lui passer l'argument `content` dans notre
balise `{@attach}` :

```svelte
/// file: App.svelte
<button {@attach tooltip+++(content)+++}>
	Survolez-moi
</button>
```
