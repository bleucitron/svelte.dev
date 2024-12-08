---
title: svelte/motion
---



```js
// @noErrors
import {
	Spring,
	Tween,
	prefersReducedMotion,
	spring,
	tweened
} from 'svelte/motion';
```

## Spring

<blockquote class="since note">

Disponible à partir de la version 5.8.0

</blockquote>

Un utilitaire permettant de créer un valeur évoluant à la manière d'un ressort. Les changements de
valeur de `spring.target` vont déclencher l'évolution de `spring.current` vers cette valeur au cours
du temps, en prenant en compte les paramètres de `spring.stiffness` et `spring.damping`.

```svelte
<script>
	import { Spring } from 'svelte/motion';

	const spring = new Spring(0);
</script>

<input type="range" bind:value={spring.target} />
<input type="range" bind:value={spring.current} disabled />
```

<div class="ts-block">

```dts
class Spring<T> {/*…*/}
```

<div class="ts-block-property">

```dts
constructor(value: T, options?: SpringOpts);
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
static of<U>(fn: () => U, options?: SpringOpts): Spring<U>;
```

<div class="ts-block-property-details">

Crée un ressort dont la valeur est liée à la valeur de retour de `fn`. Ceci doit être appelé à la
racine d'un effet (par exemple, pendant l'initialisation d'un composant).

```svelte
<script>
	import { Spring } from 'svelte/motion';

	let { number } = $props();

	const spring = Spring.of(() => number);
</script>
```

</div>
</div>

<div class="ts-block-property">

```dts
set(value: T, options?: SpringUpdateOpts): Promise<void>;
```

<div class="ts-block-property-details">

Met la valeur de `spring.target` à `value` et renvoie une `Promise` qui se résout si et lorsque
`spring.current` atteint cette valeur.

Si `options.instant` vaut `true`, `spring.current` vaut immédiatement `spring.target`.

Si `options.preserveMomentum` est fournie, le ressort va continuer sur sa trajectoire pendant le
nombre de millisecondes fourni. Cela permet de simuler des mouvements plus "relâchés".

</div>
</div>

<div class="ts-block-property">

```dts
damping: number;
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
precision: number;
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
stiffness: number;
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
target: T;
```

<div class="ts-block-property-details">

La valeur finale du ressort.
Cette propriété n'existe que sur la classe `Spring`, pas sur le store legacy `spring`.

</div>
</div>

<div class="ts-block-property">

```dts
get current(): T;
```

<div class="ts-block-property-details">

La valeur courante du ressort.
Cette propriété n'existe que sur la classe `Spring`, pas sur le store legacy `spring`.

</div>
</div></div>



## Tween

<blockquote class="since note">

Disponible à partir de la version 5.8.0

</blockquote>

Un utilitaire permettant de créer une valeur évoluant de manière "douce" vers sa valeur finale. Les
changements de valeur de `tween.target` vont déclencher l'évolution de `tween.current` vers cette
valeur au cours du temps, en prenant en compte les options `delay`, `duration`, et `easing`.

```svelte
<script>
	import { Tween } from 'svelte/motion';

	const tween = new Tween(0);
</script>

<input type="range" bind:value={tween.target} />
<input type="range" bind:value={tween.current} disabled />
```

<div class="ts-block">

```dts
class Tween<T> {/*…*/}
```

<div class="ts-block-property">

```dts
static of<U>(fn: () => U, options?: TweenedOptions<U> | undefined): Tween<U>;
```

<div class="ts-block-property-details">

Crée un tween dont la valeur est liée à la valeur de retour de `fn`.
Ceci doit être appelé à la racine d'un effet (par exemple, pendant l'initialisation d'un composant).

```svelte
<script>
	import { Tween } from 'svelte/motion';

	let { number } = $props();

	const tween = Tween.of(() => number);
</script>
```

</div>
</div>

<div class="ts-block-property">

```dts
constructor(value: T, options?: TweenedOptions<T>);
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
set(value: T, options?: TweenedOptions<T> | undefined): Promise<void>;
```

<div class="ts-block-property-details">

Met la valeur de `tween.target` à `value` et renvoie une `Promise` qui se résout si et lorsque que
`tween.current` atteint cette valeur.

Si des `options` sont fournies, elles vont écraser les valeurs par défaut du tween.

</div>
</div>

<div class="ts-block-property">

```dts
get current(): T;
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
set target(v: T);
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
get target(): T;
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
#private;
```

<div class="ts-block-property-details"></div>
</div></div>



## prefersReducedMotion

<blockquote class="since note">

Disponible à partir de la version 5.7.0

</blockquote>

Une [media query](/docs/svelte/svelte-reactivity#MediaQuery) qui correspond au choix de
l'utilisateur ou l'utilisatrice d'activer l'[option de réduire la quantité des
animations](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).

```svelte
<script>
	import { prefersReducedMotion } from 'svelte/motion';
	import { fly } from 'svelte/transition';

	let visible = $state(false);
</script>

<button onclick={() => visible = !visible}>
	toggle
</button>

{#if visible}
	<p transition:fly={{ y: prefersReducedMotion.current ? 0 : 200 }}>
		entre en volant, sauf si l'utilisateur veut moins d'animations
	</p>
{/if}
```

<div class="ts-block">

```dts
const prefersReducedMotion: MediaQuery;
```

</div>



## spring

<blockquote class="tag deprecated note">

Utilisez plutôt [`Spring`](/docs/svelte/svelte-motion#Spring)

</blockquote>

La fonction `spring` de Svelte crée un store dont la valeur est animée avec un mouvement qui simule
le comportement d'un ressort. Ceci signifie que lorsque la valeur du store change, au lieu de
transitionner avec un mouvement linéaire, elle "rebondit" comme le ferait un ressort, en fonction
des paramètres physiques fournis. Ceci ajoute un certain niveau de réalisme aux mouvements et
permet d'améliorer l'expérience utilisateur.

<div class="ts-block">

```dts
function spring<T = any>(
	value?: T | undefined,
	opts?: SpringOpts | undefined
): Spring<T>;
```

</div>



## tweened

<blockquote class="tag deprecated note">

Utilisez plutôt [`Tween`](/docs/svelte/svelte-motion#Tween)

</blockquote>

La fonction `tweened` de Svelte crée un store spécial permettant de fournir des transitions de
valeur "douces" au fil du temps.

<div class="ts-block">

```dts
function tweened<T>(
	value?: T | undefined,
	defaults?: TweenedOptions<T> | undefined
): Tweened<T>;
```

</div>



## Spring

<div class="ts-block">

```dts
interface Spring<T> extends Readable<T> {/*…*/}
```

<div class="ts-block-property">

```dts
set(new_value: T, opts?: SpringUpdateOpts): Promise<void>;
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
update: (fn: Updater<T>, opts?: SpringUpdateOpts) => Promise<void>;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">déprécié</span> N'existe que sur le store legacy `spring`, pas sur la
classe `Spring`

</div>

</div>
</div>

<div class="ts-block-property">

```dts
subscribe(fn: (value: T) => void): Unsubscriber;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">déprécié</span> N'existe que sur le store legacy `spring`, pas sur la
classe `Spring`

</div>

</div>
</div>

<div class="ts-block-property">

```dts
precision: number;
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
damping: number;
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
stiffness: number;
```

<div class="ts-block-property-details"></div>
</div></div>

## Tweened

<div class="ts-block">

```dts
interface Tweened<T> extends Readable<T> {/*…*/}
```

<div class="ts-block-property">

```dts
set(value: T, opts?: TweenedOptions<T>): Promise<void>;
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
update(updater: Updater<T>, opts?: TweenedOptions<T>): Promise<void>;
```

<div class="ts-block-property-details"></div>
</div></div>


