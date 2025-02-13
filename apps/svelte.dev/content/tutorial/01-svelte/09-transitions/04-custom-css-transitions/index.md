---
title: Transitions CSS personnalisées
---

Le module `svelte/transition` possède un certain nombre de transitions prédéfinies, mais il est très
facile de créer les vôtres. À titre d'exemple, voici le code source de la transition `fade` :

```js
function fade(node, { delay = 0, duration = 400 }) {
	const o = +getComputedStyle(node).opacity;

	return {
		delay,
		duration,
		css: (t) => `opacity: ${t * o}`
	};
}
```

La fonction prend deux arguments — le noeud auquel la transition est appliquée, et tout paramètre
qui a fourni — et renvoie un objet de transition qui peut avoir les propriétés suivantes :

- `delay` — délai en millisecondes avant que la transition ne débute
- `duration` — durée de la transition en millisecondes
- `easing` — une fonction de lissage `p => t` (voir le chapitre sur le [tweening](/tutorial/svelte/tweens))
- `css` — une fonction `(t, u) => css`, où `u === 1 - t`
- `tick` — une fonction `(t, u) => {...}` qui a de l'effet sur le noeud

La valeur de `t` est `0` au début de l'entrée ou à la fin de la sortie, et `1` à la fin de l'entrée
ou le début de la sortie.

La plupart du temps vous devriez renvoyer la propriété `css` et _non_ la propriété `tick`, puisque
les animations CSS sont exécutées sur un autre thread que le tread principal, pour éviter de
surcharger ce dernier. Svelte "simule" la transition et construit une animation CSS, puis la laisse
se jouer.

Par exemple, la transition `fade` génère une animation CSS qui ressemble à ça :

<!-- prettier-ignore-start -->
```css
0% { opacity: 0 }
10% { opacity: 0.1 }
20% { opacity: 0.2 }
/* ... */
100% { opacity: 1 }
```
<!-- prettier-ignore-end -->

Nous pouvons toutefois être bien plus créatifs. Créons quelque chose de totalement non nécessaire :

```svelte
/// file: App.svelte
<script>
	import { fade } from 'svelte/transition';
	+++import { elasticOut } from 'svelte/easing';+++

	let visible = $state(true);

	function spin(node, { duration }) {
		return {
			duration,
			css: (t, u) => +++{
				const eased = elasticOut(t);

				return `
					transform: scale(${eased}) rotate(${eased * 1080}deg);
					color: hsl(
						${Math.trunc(t * 360)},
						${Math.min(100, 1000 * u)}%,
						${Math.min(50, 500 * u)}%
					);`
			}+++
		};
	}
</script>
```

Souvenez-vous : un grand pouvoir amène de grandes responsabilités.
