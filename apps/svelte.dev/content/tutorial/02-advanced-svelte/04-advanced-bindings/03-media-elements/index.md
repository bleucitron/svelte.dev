---
title: Éléments media
---

Vous pouvez lier les propriétés des éléments `<audio>` et `<video>`, facilitant la construction
d'une interface personnalisée de player audio (par exemple), comme `AudioPlayer.svelte`.

D'abord, ajoutez l'élément `<audio>` avec ses liaisons (nous utiliserons la forme raccourcie pour
`src`, `duration` et `paused`) :

```svelte
/// file: AudioPlayer.svelte
<div class={['player', { paused }]}>
+++	<audio
		{src}
		bind:currentTime={time}
		bind:duration
		bind:paused
	></audio>+++

	<button
		class="play"
		aria-label={paused ? 'play' : 'pause'}
	></button>
```

Ensuite, ajoutez un gestionnaire d'évènement au `<button>` qui modifie `paused` :

```svelte
/// file: AudioPlayer.svelte
<button
	class="play"
	aria-label={paused ? 'play' : 'pause'}
	+++onclick={() => paused = !paused}+++
></button>
```

Notre player audio a désormais des fonctionnalités de base. Ajoutons-lui la possibilité de chercher
un point précis sur une piste en déplaçant le slider. Dans le gestionnaire `pointerdown` du slider,
il y a une fonction `seek` dans laquelle nous pouvons mettre à jour `time` :

```js
/// file: AudioPlayer.svelte
function seek(e) {
	const { left, width } = div.getBoundingClientRect();

	let p = (e.clientX - left) / width;
	if (p < 0) p = 0;
	if (p > 1) p = 1;

	+++time = p * duration;+++
}
```

Lorsque la piste se termine, soyez sympa — rembobinez :

```svelte
/// file: AudioPlayer.svelte
<audio
	{src}
	bind:currentTime={time}
	bind:duration
	bind:paused
+++	onended={() => {
		time = 0;
	}}+++
></audio>
```

La liste complète des liaisons possibles pour `<audio>` et `<video>` est la suivante — sept liaisons
en _lecture seule_...

- `duration` — la durée totale, en secondes
- `buffered` — un tableau d'objets `{start, end}`
- `seekable` — idem
- `played` — idem
- `seeking` — booléen
- `ended` — booléen
- `readyState` — nombre entre 0 et 4 (inclus)

... et cinw liaisons _bilatérales_ :

- `currentTime` — la position courante de la tête de lecture, en secondes
- `playbackRate` — la vitesse de lecture (`1` est 'normal')
- `paused` — celle-ci parle pour elle-même
- `volume` — une valeur entre 0 et 1
- `muted` — un booléen où `true` signifie "en sourdine"

Les vidéos ont en plus les liaisons de lecture seule `videoWidth` et `videoHeight`.
