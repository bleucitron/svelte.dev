---
title: État brut
---

Dans les exercices précédents, nous avons vu que l'état est [profondément réactif](deep-state) — si
(par exemple) vous changez une propriété d'un objet, ou ajoutez un élément dans un tableau, cela
provoquera la mise à jour de l'interface. Ceci fonctionne en créant un
[proxy](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Proxy) qui
intercepte les lectures et écritures.

Parfois, ce n'est pas ce que vous souhaitez. Si vous ne changez pas les propriétés individuelles, ou
s'il est important de maintenir l'égalité de référence, vous pouvez alors utiliser un état brut
(_raw state_) à la place.

Dans cet exemple, nous avons un graphique montrant le cours de l'action Svelte augmentant doucement
mais sûrement. Nous voulons que le graphique se mette à jour lorsque de nouvelles données arrivent,
ce que nous pouvons faire en transformant `data` en état...

```js
/// file: App.svelte
let data = +++$state(poll())+++;
```

... mais il n'y a pas besoin de le rendre profondément réactif alors qu'il sera entièrement réécrit
quelques millisecondes plus tard. À la place, nous pouvons utiliser `$state.raw` :

```js
/// file: App.svelte
let data = +++$state.raw(poll())+++;
```

> [!NOTE] Muter un état brut n'aura aucun effet direct. En général, muter un état non réactif est
> fortement déconseillé
