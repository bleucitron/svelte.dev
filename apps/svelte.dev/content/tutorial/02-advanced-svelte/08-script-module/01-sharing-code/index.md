---
title: Partager du code
---

Dans tous les exemples que nous avons vu jusqu'ici, le bloc `<script>` contenait du code qui était
exécuté lorsque chaque instance de composant est initialisée. Pour la grande majorité des
composants, vous n'avez pas besoin de plus.

Très occasionnellement, vous aurez besoin d'exécuter du code en dehors d'une instance individuelle
d'un composant. Par exemple, si on revient sur notre player audio personnalisé qu'on a vu dans un
[exercice précédent](media-elements), il est possible de jouer les quatres pistes en même temps. Il
serait plus pratique que la lecture d'une piste arrête toutes les autres.

Nous pouvons faire ça en déclarant un bloc `<script module>`. Le code contenu à l'intérieur ne sera
joué qu'une seule fois, la première fois que le module est évalué, plutôt que lorsqu'un composant
est instantié. Mettez le code suivant tout en haut de `AudioPlayer.svelte` (notez qu'il s'agit d'une
balise script _distincte_) :

```svelte
/// file: AudioPlayer.svelte
+++<script module>
	let current;
</script>+++
```

Il est maintenant possible pour les instances de composant de "discuter" entre elles sans aucune
gestion d'état particulière :

```svelte
/// file: AudioPlayer.svelte
<audio
	src={src}
	bind:currentTime={time}
	bind:duration
	bind:paused
+++	onplay={(e) => {
		const audio = e.currentTarget;

		if (audio !== current) {
			current?.pause();
			current = audio;
		}
	}}+++
	onended={() => {
		time = 0;
	}}
/>
```
