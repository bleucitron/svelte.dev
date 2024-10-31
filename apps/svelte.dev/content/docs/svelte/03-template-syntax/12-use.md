---
title: use:
---

Les actions sont des fonctions appelées lorsqu'un élément est monté. Elles sont ajoutées grâce à la
directive `use:`, et vont généralement utiliser un `$effect` afin qu'elles puissent réinitialiser
n'importe quel état lorsque l'élément est démonté.

```svelte
<!--- file: App.svelte --->
<script>
	/** @type {import('svelte/action').Action} */
	function myaction(node) {
		// le node a été monté dans le DOM

		$effect(() => {
			// la mise en place se fait ici

			return () => {
				// le nettoyage ici
			};
		});
	}
</script>

<div use:monaction>...</div>
```

Une action peut être exécutée avec un argument :

```svelte
<!--- file: App.svelte --->
<script>
	/** @type {import('svelte/action').Action} */
	function myaction(node, +++data+++) {
		// ...
	}
</script>

<div use:monaction={+++data+++}>...</div>
```

L'action est exécutée une seule fois (mais pas pendant le rendu côté serveur) – elle ne sera _pas_
rejouée si l'argument change.

> [!LEGACY]
> Avant l'introduction de la rune `$effect`, les actions pouvaient renvoyer un objet avec les
> méthodes `update` et `destroy`, où `update` était exécutée avec la valeur de l'argument la plus
> récente. L'utilisation d'effets est à prioriser.

## Typage [!VO]Typing

L'interface `Action` attend trois arguments de types, tous optionnels – un type de noeud (qui peut
être `Element` si l'action s'applique à tout type de noeud), un paramètre, et n'importe quel
gestionnaire d'évènement personnalisé créé par l'action :

```svelte
<!--- file: App.svelte --->
<script>
	import { on } from 'svelte/events';

	/**
	 * @type {import('svelte/action').Action<
	 * 	HTMLDivElement,
	 * 	null,
	 * 	{
	 * 		onswiperight: (e: CustomEvent) => void;
	 * 		onswipeleft: (e: CustomEvent) => void;
	 * 		// ...
	 * }>}
	 */
	function gestures(node) {
		$effect(() => {
			// ...
			node.dispatchEvent(new CustomEvent('swipeleft'));

			// ...
			node.dispatchEvent(new CustomEvent('swiperight'));
		});
	}
</script>

<div
	use:gestures
	onswipeleft={next}
	onswiperight={prev}
>...</div>
```
