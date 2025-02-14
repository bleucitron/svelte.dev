---
title: Stores
---

Avant l'introduction des runes en Svelte 5, les stores étaient la manière classique de gérer des
états réactifs en dehors des composants. Ce n'est plus le cas, mais vous rencontrerez encore des
stores lorsque vous utiliserez Svelte (ou SvelteKit, pour le moment), il est donc important de
savoir comment les utiliser.

> [!NOTE] Nous ne verrons pas ici comment créer vos propres stores personnalisés — pour cela, vous
> pouvez [consulter la documentation](/docs/svelte/stores).

Revisitons l'exemple de l'exercice sur la [réactivité universelle](universal-reactivity), mais en
implémentant cette fois l'état partagé avec un store.

Dans `shared.js`, nous exportons actuellement un `count`, qui est un nombre. Transformons-le en
store d'écriture :

```js
/// file: shared.js
+++import { writable } from 'svelte/store';+++

export const count = +++writable(0)+++;
```

Pour référencer la valeur du store, nous le préfixons avec le caractère `$`. Dans `Counter.svelte`,
mettez à jour le texte au sein du `<button>` pour qu'il n'affiche plus `[object Object]` :

```svelte
/// file: Counter.svelte
<button onclick={() => {}}>
	clics : {+++$count+++}
</button>
```

Enfin, ajoutez le gestionnaire d'évènements. Puisque c'est un store d'écriture, nous pouvons mettre
à jour la valeur programmatiquement en utilisant les méthodes `set` ou `update`...

```js
count.update((n) => n + 1);
```

... mais puisque nous sommes dans un composant, nous pouvons continuer d'utiliser le préfixe `$` :

```svelte
/// file: Counter.svelte
<button onclick={() => +++$count += 1+++}>
	clics : {$count}
</button>
```
