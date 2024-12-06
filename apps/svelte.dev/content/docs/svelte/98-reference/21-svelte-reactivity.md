---
title: svelte/reactivity
---

Svelte fournit des versions réactives de différents utilitaires intégrés comme `SvelteMap`,
`SvelteSet` et `SvelteURL`. Ces utilitaires peuvent être importés depuis `svelte/reactivity` et
utilisés de la même manière que leurs équivalents natifs.

```svelte
<script>
	import { SvelteURL } from 'svelte/reactivity';

	const url = new SvelteURL('https://example.com/path');
</script>

<!-- les changements de valeur de ces inputs... -->
<input bind:value={url.protocol} />
<input bind:value={url.hostname} />
<input bind:value={url.pathname} />

<hr />

<!-- vont mettre à jour `url` et vice-versa -->
<input bind:value={url.href} />
```



```js
// @noErrors
import {
	MediaQuery,
	SvelteDate,
	SvelteMap,
	SvelteSet,
	SvelteURL,
	SvelteURLSearchParams,
	createSubscriber
} from 'svelte/reactivity';
```

## MediaQuery

<blockquote class="since note">

Disponible depuis la version 5.7.0

</blockquote>

Crée une media query et fournit une propriété `current` qui reflète si oui ou non celle-ci
correspond.

Servez-vous en avec précaution – pendant le rendu côté serveur, il n'y a aucun moyen de connaître la
valeur correcte, causant potentiellement des problèmes de contenu lors de l'hydratation.
Si vous pouvez utiliser une media query en CSS pour obtenir le même résultat, faites-le.

```svelte
<script>
	import { MediaQuery } from 'svelte/reactivity';

	const large = new MediaQuery('min-width: 800px');
</script>

<h1>{large.current ? 'écran large' : 'écran pas large'}</h1>
```

<div class="ts-block">

```dts
class MediaQuery {/*…*/}
```

<div class="ts-block-property">

```dts
constructor(query: string, matches?: boolean | undefined);
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `query` Une chaîne de caractères de media query
- `matches` Valeur de secours pour le serveur

</div>

</div>
</div>

<div class="ts-block-property">

```dts
get current(): boolean;
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
#private;
```

<div class="ts-block-property-details"></div>
</div></div>



## SvelteDate

<div class="ts-block">

```dts
class SvelteDate extends Date {/*…*/}
```

<div class="ts-block-property">

```dts
constructor(...params: any[]);
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
#private;
```

<div class="ts-block-property-details"></div>
</div></div>



## SvelteMap

<div class="ts-block">

```dts
class SvelteMap<K, V> extends Map<K, V> {/*…*/}
```

<div class="ts-block-property">

```dts
constructor(value?: Iterable<readonly [K, V]> | null | undefined);
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
set(key: K, value: V): this;
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
#private;
```

<div class="ts-block-property-details"></div>
</div></div>



## SvelteSet

<div class="ts-block">

```dts
class SvelteSet<T> extends Set<T> {/*…*/}
```

<div class="ts-block-property">

```dts
constructor(value?: Iterable<T> | null | undefined);
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
add(value: T): this;
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
#private;
```

<div class="ts-block-property-details"></div>
</div></div>



## SvelteURL

<div class="ts-block">

```dts
class SvelteURL extends URL {/*…*/}
```

<div class="ts-block-property">

```dts
get searchParams(): SvelteURLSearchParams;
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
#private;
```

<div class="ts-block-property-details"></div>
</div></div>



## SvelteURLSearchParams

<div class="ts-block">

```dts
class SvelteURLSearchParams extends URLSearchParams {/*…*/}
```

<div class="ts-block-property">

```dts
[REPLACE](params: URLSearchParams): void;
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
#private;
```

<div class="ts-block-property-details"></div>
</div></div>



## createSubscriber

<blockquote class="since note">

Disponible depuis la version 5.7.0

</blockquote>

Renvoie une fonction `subscribe` qui, si appelée dans un effet (incluant les expressions du
template), appelle son callback `start` avec une fonction `update`. Chaque fois que `update` est
appelée, l'effect sera rejoué.

Si `start` renvoie une fonction, celle-ci sera appelée lorsque l'effet sera détruit.

Si `subscribe` est appelée dans plusieurs effets, `start` ne sera appelé qu'une seule fois tant que
les effets sont actifs, et la fonction de "destruction" renvoyée ne sera appelée que lorsque tous
les effets concernées seront détruits.

On comprend mieux cette fonctionnalité avec un exemple. Voici l'implémentation de
[`MediaQuery`](/docs/svelte/svelte-reactivity#MediaQuery) :

```js
// @errors: 7031
import { createSubscriber } from 'svelte/reactivity';
import { on } from 'svelte/events';

export class MediaQuery {
	#query;
	#subscribe;

	constructor(query) {
		this.#query = window.matchMedia(`(${query})`);

		this.#subscribe = createSubscriber((update) => {
			// lorsque l'évènement `change` se produit, rejoue tout effet qui lit `this.current`
			const off = on(this.#query, 'change', update);

			// arrête d'écouter lorsque tous les effets sont détruits
			return () => off();
		});
	}

	get current() {
		this.#subscribe();

		// renvoie l'état courant de la query, que l'on soit ou non dans un effet
		return this.#query.matches;
	}
}
```

<div class="ts-block">

```dts
function createSubscriber(
	start: (update: () => void) => (() => void) | void
): () => void;
```

</div>




