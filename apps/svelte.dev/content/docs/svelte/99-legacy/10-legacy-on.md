---
title: on:
---

En mode runes, les gestionnaires d'évènements sont fournis comme n'importe quel attribut ou prop.

En mode legacy, il faut utiliser la directive `on:` :

```svelte
<!--- file: App.svelte --->
<script>
	let count = 0;

	/** @param {MouseEvent} event */
	function handleClick(event) {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	compteur : {count}
</button>
```

Les gestionnaires peuvent être déclarés de manière inline sans pénaliser les performances :

```svelte
<button on:click={() => (count += 1)}>
	compteur : {count}
</button>
```

Vous pouvez ajouter des _modificateurs_ aux gestionnaires d'évènement d'éléments grâce au caractère
`|`.

```svelte
<form on:submit|preventDefault={handleSubmit}>
	<!-- le comportement par défaut de `submit` est
				empêché, pour éviter un rechargement de la page -->
</form>
```

Les modificateurs suivants sont disponibles :

- `preventDefault` — appelle `event.preventDefault()` avant d'exécuter le gestionnaire
- `stopPropagation` — appelle `event.stopPropagation()`, empêchant l'évènement d'atteindre l'élément
suivant
- `stopImmediatePropagation` - appelle `event.stopImmediatePropagation()`, empêchant les autres
gestionnaires du même évènement d'être exécutés
- `passive` — améliore la performance du défilement pour les évènements touch/wheel (Svelte
l'ajoute automatiquement lorsque cela ne pose pas de problème)
- `nonpassive` — définit explicitement `passive: false`
- `capture` — déclenche le gestionnaire pendant la phase de _capture_ plutôt que pendant la phase de
_bubbling_
- `once` — supprime le gestionnaire après sa première exécution
- `self` — ne déclenche le gestionnaire que si `event.target` est l'élément lui-même
- `trusted` — ne déclenche le gestionnaire que si `event.isTrusted` vaut `true`. C'est-à-dire sir
l'évènement est déclenché par une action de l'utilisateur

Les modificateurs peuvent être chaînés, par ex. `on:click|once|capture={...}`.

Si la directive `:on` est utilisée sans valeur, le composant va _relayer_ l'évènement, ce qui
signifie qu'un composant parent de celui-ci peut écouter cet évènement.

```svelte
<button on:click>
	Le composant lui-même va émettre l'évènement click
</button>
```

Il est possible d'avoir plusieurs gestionnaires d'évènement pour le même évènement :

```svelte
<!--- file: App.svelte --->
<script>
	let count = 0;

	function increment() {
		count += 1;
	}

	/** @param {MouseEvent} event */
	function log(event) {
		console.log(event);
	}
</script>

<button on:click={increment} on:click={log}>
	clics : {count}
</button>
```

## Évènements de composant [!VO]Component events

Les composants peuvent générer des évènemnts en créant un _dispatcher_ lors de leur
initialisation :

```svelte
<!--- file: Stepper.svelte -->
<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<button on:click={() => dispatch('decrement')}>décrémenter</button>
<button on:click={() => dispatch('increment')}>incrémenter</button>
```

`dispatch` crée un [`CustomEvent`](https://developer.mozilla.org/fr/docs/Web/API/CustomEvent).
Si un deuxième argument est fourni, il devient alors la propriété `detail` sur l'objet de
l'évènement.

Un composant parent de ce composant peut alors écouter les évènements que ce dernier émet :

```svelte
<script>
	import Stepper from './Stepper.svelte';

	let n = 0;
</script>

<Stepper
	on:decrement={() => n -= 1}
	on:increment={() => n += 1}
/>

<p>n : {n}</p>
```

Les évènements de composants ne "bubblent" pas – un composant parent peut uniquement écouter les
évènements de ses enfants directs.

Mis à part `once`, les modificateurs ne sont pas applicables sur les gestionnaires d'évènement de
composant.

> [!NOTE]
> Si vous prévoyez une éventuelle migration vers Svelte 5, utilisez plutôt des props de callback
> pour vos gestionnaires d'évènement. Cela facilitera votre migration, puisque
> `createEventDispatcher` est déprécié :
>
> ```svelte
> <!--- file: Stepper.svelte --->
> <script>
> 	export let decrement;
> 	export let increment;
> </script>
>
> <button on:click={decrement}>décrémenter</button>
> <button on:click={increment}>incrémenter</button>
> ```
