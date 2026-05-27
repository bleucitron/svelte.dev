---
title: La balise attach
tags: attachments
---

Les attachements sont essentiellement des fonctions de cycle agissant au niveau de l'élément. Ils
sont utiles pour des choses comme :

- s'interfacer avec des librairies tierces
- charger des images en différé ("lazy-loading")
- afficher des tooltips
- ajouter des gestionnaires d'évènements personnalisés

Dans cette application, vous pouvez gribouiller sur le `<canvas>`, et changer les couleurs et la
taille du pinceau via le menu. Mais si vous ouvrez le menu et parcourez les options avec la touche
Tab, vous constaterez que le focus n'est pas _piégé_ au sein de la modale.

> [!NOTE] Safari ne fournit le focus avec la touche Tab qu'aux champs textes et aux menus pop-up, et
> ce par défaut. Pour suivre cet exercice dans Safari, utilisez Option + Tab ou activer l'option
> permettant d'utiliser Tab pour focaliser dans les options avancées de Safari.

Nous pouvons corriger cela avec un attachement. Importer `trapFocus` depuis
`attachments.svelte.js`...

```svelte
/// file: App.svelte
<script>
	import Canvas from './Canvas.svelte';
	+++import { trapFocus } from './attachments.svelte.js';+++

	const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'white', 'black'];

	let selected = $state(colors[0]);
	let size = $state(10);
	let showMenu = $state(true);
</script>
```

... puis ajoutez-le au menu avec la balise `{@attach}` :

```svelte
/// file: App.svelte
<div class="menu" +++{@attach trapFocus}+++>
```

Jetons un coup d'oeil à la fonction `trapFocus` dans le fichie `attachments.svelte.js`. Une fonction
d'attachement est exécutée avec un `node` — l'élément `<div class="menu">` dans notre cas — lorsque
le noeud est monté dans le DOM. Les attachements sont exécutés dans des [effets](effects), et sont
donc ré-exécutés à chaque fois qu'un état lu dans la fonction est mis à jour.

D'abord, nous avons besoin d'ajouter un gestionnaire d'évènement qui intercepte les utilisations de
la touche Tab :

```js
/// file: attachments.svelte.js
focusable()[0]?.focus();
+++const off = on(node, 'keydown', handleKeydown);+++
```

> [!NOTE] [`on`](/docs/svelte/svelte-events#on) est une surcouche par-dessus `addEventListener` qui
> utilise la <a href="/docs/svelte/basic-markup#Events-Event-delegation">délégation
> d'évènements</a>. Elle renvoie une fonction qui supprime ce gestionnaire.

Puis, nous devons faire un peu de nettoyage lorsque le noeud est démonté — supprimer le gestionnaire
d'évènements, et rétablir le focus à l'endroit où il se trouvait avant le montage de l'élément.
Comme pour les effets, un attachement peut renvoyer une fonction de nettoyage, qui sera exécutée
immédiatement avant que l'attachement ne soit ré-exécuté, ou après que l'élément ne soit supprimé du
DOM :

```js
/// file: attachments.svelte.js
focusable()[0]?.focus();
const off = on(node, 'keydown', handleKeydown);

+++return () => {
	off();
	previous?.focus();
};+++
```

Désormais, lorsque vous ouvrez le menu, vous pouvez parcourir en boucle les options avec la touche
Tab.
