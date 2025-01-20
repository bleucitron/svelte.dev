---
title: Étaler les évènements
---

Nous pouvons aussi ["étaler" (_spread_)](spread-props) les gestionnaires d'évènements sur les
éléments. Ici, nous avons défini un gestionnaire `onclick` dans `App.svelte` — tout ce qu'il reste à
faire est de passer les props au `<button>` dans `BigRedButton.svelte` :

```svelte
/// file: BigRedButton.svelte
<button +++{...props}+++>
	Push
</button>
```
