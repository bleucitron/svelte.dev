---
title: svelte/server
---



```js
// @noErrors
import { render } from 'svelte/server';
```

## render

Seulement disponible sur le serveur et lorsque vous compilez avec l'option `server.`

Prend un composant et renvoie un objet avec les propriétés `body` et `head`, que vous pouvez
utiliser pour remplir votre HTML lors du rendu côté serveur de votre application.

<div class="ts-block">

```dts
function render<
	Comp extends SvelteComponent<any> | Component<any>,
	Props extends ComponentProps<Comp> = ComponentProps<Comp>
>(
	...args: {} extends Props
		? [
				component: Comp extends SvelteComponent<any>
					? ComponentType<Comp>
					: Comp,
				options?: {
					props?: Omit<Props, '$$slots' | '$$events'>;
					context?: Map<any, any>;
				}
			]
		: [
				component: Comp extends SvelteComponent<any>
					? ComponentType<Comp>
					: Comp,
				options: {
					props: Omit<Props, '$$slots' | '$$events'>;
					context?: Map<any, any>;
				}
			]
): RenderOutput;
```

</div>




