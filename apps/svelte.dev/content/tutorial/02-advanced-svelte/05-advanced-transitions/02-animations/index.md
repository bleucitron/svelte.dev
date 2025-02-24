---
title: Animations
---

Dans le [chapitre précédent](/tutorial/svelte/deferred-transitions), nous avons utilisé des
transitions retardées pour créer l'illusion du mouvement lorsque les éléments se déplacement d'une
liste à l'autre.

Pour compléter l'illusion, nous avons aussi besoin d'appliquer du mouvement sur les éléments qui ne
transitionnent _pas_. La directive `animate` sert à cela.

D'abord, importez la fonction `flip` — "flip" veut dire ['First, Last, Invert,
Play'](https://aerotwist.com/blog/flip-your-animations/) — depuis `svelte/animate` dans le fichier
`TodoList.svelte` :

```svelte
/// file: TodoList.svelte
<script>
	+++import { flip } from 'svelte/animate';+++
	import { send, receive } from './transition.js';

	let { todos, remove } = $props();
</script>
```

Puis ajoutez-le aux éléments `<li>` :

```svelte
/// file: TodoList.svelte
<li
	class={{ done: todo.done }}
	in:receive={{ key: todo.id }}
	out:send={{ key: todo.id }}
	+++animate:flip+++
>
```

Le mouvement est un peu lent dans notre cas, nous pouvons donc y ajouter un paramètre `duration` :

```svelte
/// file: TodoList.svelte
<li
	class={{ done: todo.done }}
	in:receive={{ key: todo.id }}
	out:send={{ key: todo.id }}
	animate:flip+++={{ duration: 200 }}+++
>
```

> [!NOTE] `duration` peut aussi être une fonction `d => milliseconds`, où `d` est le nombre de
> pixels que l'élément doit parcourir.

Notez que toutes les transitions et animations sont appliquées en CSS, plutôt qu'en JavaScript, ce
qui veut dire qu'elles ne bloqueront pas (ou ne seront pas bloquées par) le thread principal.
