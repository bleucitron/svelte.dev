---
title: In et out
---

À la place de la directive `transition`, un élément peut avoir une directive `in` ou `out`, ou les
deux à la fois. Importez `fade` en même temps que `fly`...

```js
/// file: App.svelte
import { +++fade+++, fly } from 'svelte/transition';
```

... puis remplacez la directive `transition` avec des directives `in` et `out` distinctes :

```svelte
/// file: App.svelte
<p +++in+++:fly={{ y: 200, duration: 2000 }} +++out:fade+++>
	Entre +++en volant, sort en s'estompant+++
</p>
```

Dans ce cas, les transitions ne sont _pas_ inversées.
