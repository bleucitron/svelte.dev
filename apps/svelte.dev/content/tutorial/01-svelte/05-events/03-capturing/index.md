---
title: Capture
---

En général, les gestionnaires d'évènement sont exécutés pendant la phase de
[\_bubbling](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Event_bubbling).
Remarquez ce qu'il se passe si vous tapez quelque chose dans l'`<input>` de cet exemple — le
gestionnaire "intérieur" est joué en premier, puisque l'évènement "bubble" depuis la cible vers
la racine du document, suivi par le gestionnaire "extérieur".

Parfois, vous voulez que les gestionnaires soient joués plutôt pendant la phase de _capture_.
Ajoutez `capture` à la fin du nom de l'évènement :

```svelte
/// file: App.svelte
<div onkeydown+++capture+++={(e) => alert(`<div> ${e.key}`)} role="presentation">
	<input onkeydown+++capture+++={(e) => alert(`<input> ${e.key}`)} />
</div>
```

Désormais, l'ordre relatif est inversé. Si des gestionnaires de capture et de non-capture existent
en même temps pour un même évènement, les gestionnaires de capture seront joués en premier.
