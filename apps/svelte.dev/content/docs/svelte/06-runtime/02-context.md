---
title: Contexte
---

<!-- - get/set/hasContext
- how to use, best practises (like encapsulating them) -->

La plupart du temps, un état concerne un uniquement un composant, et existe concrètement tant que
son composant existe dans l'application. Cependant il également possible de créer des états qui
concernent toute une section de l'application, voir l'application toute entière, et ces états-là
sont être gérés un peu différemment.

La façon la plus simple de faire cela est de créer un état global et de l'importer.

```ts
/// file: state.svelte.js
export const myGlobalState = $state({
	user: {
		/* ... */
	}
	/* ... */
});
```

```svelte
<!--- file: App.svelte --->
<script>
	import { myGlobalState } from './state.svelte.js';
	// ...
</script>
```

Cette technique a toutefois quelques inconvénients :

- cela ne fonctionne vraiment de manière sécurisée que si votre état global est uniquement utilisé
côté client – par exemple lorsque vous créez une application de type SPA qui ne construit aucun de
ses composants sur le serveur. Si votre état se trouve être géré et mis à jour sur le serveur, il
est très probable que cet état soit partagé entre les sessions et/ou les utilisateurs, provoquant
des bugs et des failles de sécurité
- cela peut donner la fausse impression que certains états sont globaux alors qu'ils ne concernent
en réalité qu'une petite portion de votre application

Svelte fournit quelques primitives de `context`e qui permettent de résoudre ces problèmes.

## Définir et récupérer un contexte [!VO]Setting and getting context

Pour associer un objet arbitraire avec le composant actuel, utiliser `setContext`.

```svelte
<script>
	import { setContext } from 'svelte';

	setContext('key', value);
</script>
```

Ce contexte est alors rendu disponible aux enfants du composant (dont le contenu défini dans des
slots), en utilisant `getContext`.

```svelte
<script>
	import { getContext } from 'svelte';

	const value = getContext('key');
</script>
```

`setContext` et `getContext` permettent de résoudre les problèmes listés plus haut :

- votre état n'est pas global, il est cantonné au scope du composant. Ainsi construire votre
composant sur le serveur est sécurisé et ne va pas faire "fuiter" l'état
- il est évident que l'état n'est pas global, mais plutôt restreint à un composant spécifique et à
son arbre d'enfants, et ne peut alors pas être utilisé dans d'autres parties de votre application

> [!NOTE] `setContext`/`getContext` doivent être exécutées lors de l'initialisation du composant.

Le contexte n'est pas réactif en soi. Si vous avez besoin de valeurs réactives dans votre contexte,
vous pouvez alors lui passer un objet `$state`, dont les propriétés _seront_ réactives.

```svelte
<!--- file: Parent.svelte --->
<script>
	import { setContext } from 'svelte';

	let value = $state({ count: 0 });
	setContext('counter', value);
</script>

<button onclick={() => value.count++}>incrémenter</button>
```

```svelte
<!--- file: Child.svelte --->
<script>
	import { getContext } from 'svelte';

	const value = getContext('counter');
</script>

<p>Le compteur vaut {value.count}</p>
```

Pour vérifier si une clé `key` a déjà été définie dans le contexte d'un composant parent, utiliser
`hasContext`.

```svelte
<script>
	import { hasContext } from 'svelte';

	if (hasContext('key')) {
		// faire quelque chose
	}
</script>
```

Vous pouvez aussi récupérer l'entièreté du contexte appartenant au composant parent le plus proche
en utilisant `getAllContexts`. Ceci est utile, par exemple, si vous créez un composant
programmatiquement et souhaitez lui fournir le contexte existant.

```svelte
<script>
	import { getAllContexts } from 'svelte';

	const contexts = getAllContexts();
</script>
```

## Encapsuler les interactions de contexte [!VO]Encapsulating context interactions

Lorsque vous application grandit, il peut être pertinent d'encapsuler la définition et la
récupération du contexte dans des fonctions utilitaires correctement typées.

```ts
// @errors: 2304
import { getContext, setContext } from 'svelte';

let userKey = Symbol('user');

export function setUserContext(user: User) {
	setContext(userKey, user);
}

export function getUserContext(): User {
	return getContext(userKey) as User;
}
```
