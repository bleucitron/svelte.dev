---
title: Effets
tags: rune-effect
---

Jusqu'à maintenant, nous avons uniquement parlé de réactivité en termes d'état. Mais ce n'est qu'une
partie de l'équation — l'état n'est réactif que si quelque chose _réagit_ à ses évolutions, sinon ça
ne serait qu'une variable stylée.

La chose qui réagit est appelée un _effet_. Nous avons déjà rencontré des effets — ceux que Svelte
crée pour vous pour mettre à jour le DOM en réponse aux changements d'états — mais vous pouvez aussi
créer votre propres effets avec la rune `$effect`.

> [!NOTE] La plupart du temps, vous ne devriez pas. `$effect` est plus un outil de dernier recours
> plutôt que quelque chose dont il faut se servir régulièrement. Il est presque toujours préférable
> de mettre vos effets de bord dans un [gestionnaire d'évènement](dom-events), par exemple.

Supposons que l'on veuille utiliser `setInterval` pour suivre depuis combien de temps le composant a
été monté.
Créons l'effet :

```svelte
/// file: App.svelte
<script>
	let elapsed = $state(0);
	let interval = $state(1000);

+++	$effect(() => {
		setInterval(() => {
			elapsed += 1;
		}, interval);
	});+++
</script>
```

Cliquez plusieurs fois sur le bouton 'accélérer' et notez que la valeur de `elapsed` augmente de
plus en plus vite, car nous appelons `setInterval` à chaque fois que `interval` diminue.

Si nous cliquons ensuite sur le bouton 'ralentir'... eh bien, ça ne fonctionne pas. C'est parce que
nous ne nettoyons pas les anciens intervalles lorsque l'effet est rejoué. Nous pouvons corriger ceci
en renvoyant une fonction de nettoyage :

```js
/// file: App.svelte
$effect(() => {
	+++const id =+++ setInterval(() => {
		elapsed += 1;
	}, interval);

+++	return () => {
		clearInterval(id);
	};+++
});
```

La fonction de nettoyage est appelée immédiatement avant que le fonction d'effet soit rejouée
lorsque `interval`, ainsi que lorsque le composant est détruit.

Si la fonction d'effet ne lit aucun état lorsqu'elle est jouée, elle ne sera exécutée qu'une seule
fois, lors du montage du composant.

> [!NOTE] Les effets ne sont pas exécutés pendant le rendu côté serveur.
