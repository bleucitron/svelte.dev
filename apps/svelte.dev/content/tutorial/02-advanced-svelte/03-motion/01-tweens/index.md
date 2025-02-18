---
title: Valeurs interpolées (_tween_)
---

Souvent, une bonne manière de communiquer qu'une valeur est en train de changer est d'utiliser du
mouvement (_motion_). Svelte fournit des classes permettant d'ajouter du mouvement à vos interfaces
utilisateur.

Importez la classe `Tween` depuis `svelte/motion` :

```svelte
/// file: App.svelte
<script>
	+++import { Tween } from 'svelte/motion';+++

	let progress = $state(0);
</script>
```

Transformez `progress` en instance de `Tween` :

```svelte
/// file: App.svelte
<script>
	import { Tween } from 'svelte/motion';

	let progress = +++new Tween+++(0);
</script>
```

La classe `Tween` possède une propriété d'écriture `target` ainsi qu'une propriété `current` en
lecture seule — modifiez l'élément `<progress>`...

```svelte
<progress value={progress.+++current+++}></progress>
```

... et chacun des gestionnaires d'évènement :

```svelte
<button onclick={() => (progress.+++target+++ = 0)}>
	0%
</button>
```

Un clic sur les boutons va déclencher l'animation de la barre de progression vers sa nouvelle
valeur. C'est un peu saccadé et pas très satisfaisant. Ajoutons-lui une fonction de lissage :

```svelte
/// file: App.svelte
<script>
	import { Tween } from 'svelte/motion';
	+++import { cubicOut } from 'svelte/easing';+++

	let progress = new Tween(0, +++{
		duration: 400,
		easing: cubicOut
	}+++);
</script>
```

> [!NOTE] Le module `svelte/easing` contient les [équations de lissage de
> Penner](https://web.archive.org/web/20190805215728/http://robertpenner.com/easing/), mais vous
> pouvez également fournir votre propre fonction `p => t` où `p` et `t` sont des valeurs entre 0 et
>
> 1.

Voici la liste complète d'options disponibles sur `Tween` :

- `delay` — délai en millisecondes avant le début de l'interpolation
- `duration` — soit la durée de l'interpolation en millisecondes, ou bien une fonction `(from, to)
	=> millisecondes` vous permettant de (par ex.) préciser des interpolations plus longues pour des
  changements de valeur plus importants
- `easing` — une fonction `p => t`
- `interpolate` — une fonction personnalisée `(from, to) => t => value` servant à interpoler entre
  des valeurs de type arbitraire. Par défaut, Svelte n'est capable d'interpoler qu'entre des nombres,
  des dates, et des objets et tableaux de même forme (tant qu'ils contiennent uniquement des nombres,
  dates et autres objets et tableaux valides). Si vous souhaitez interpoler (par exemple) entre des
  chaînes de caractères représentant des couleurs ou des matrices de transformation, vous pouvez
  fournir un interpolateur personnalisé

Vous pouvez aussi appeler `progress.set(value, options)` plutôt que d'assigner directement à
`progress.target`, et dans ce cas `options` va écraser les options par défaut. La méthode `set`
renvoie une promesse qui est résolue lorsque l'interpolation se termine.
