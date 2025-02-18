---
title: Ressorts
---

La classe `Spring`, permettant de simuler le comportement d'un ressort, est une alternative à
`Tween` qui fonctionne souvent mieux pour des valeurs qui changent souvent.

Dans cet exemple, nous avons un cercle suivant la souris, ainsi que deux valeurs — les coordonnées
du cercle et sa taille. Convertissons-les en ressorts :

```svelte
/// file: App.svelte
<script>
	+++import { Spring } from 'svelte/motion+++';

	let coords = +++new Spring+++({ x: 50, y: 50 });
	let size = +++new Spring+++(10);
</script>
```

Comme avec `Tween`, les ressorts ont une propriété d'écriture `target` et une propriété `current` en
lecture seule. Mettez à jour les gestionnaires d'évènements...

```svelte
<svg
	onmousemove={(e) => {
		coords.+++target+++ = { x: e.clientX, y: e.clientY };
	}}
	onmousedown={() => (size.+++target+++ = 30)}
	onmouseup={() => (size.+++target+++ = 10)}
	role="presentation"
>
```

... et les attributs du `<circle>` :

```svelte
<circle
	cx={coords.+++current+++.x}
	cy={coords.+++current+++.y}
	r={size.+++current+++}
></circle>
```

Les deux ressorts ont des valeurs de raideur (`stiffness`) et d'amortissement (`damping`), qui
contrôlent... la ressort-itude. Nous pouvons spécifier nos propres valeurs initiales :

```js
/// file: App.svelte
let coords = new Spring({ x: 50, y: 50 }, +++{
	stiffness: 0.1,
	damping: 0.25
}+++);
```

Faites bouger votre souris, et essayer de jouer avec les sliders pour ressentir comment les
changements sur la raideur et l'amortissement affectent le comportement du ressort. Notez que vous
pouvez changer les valeurs pendant que le ressort est encore en mouvement.
