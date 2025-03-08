---
title: Amélioration progressive
---

Puisque nous utilisont un `<form>`, notre application fonctionne même si l'utilisateur ou
utilisatrice n'a pas accès à JavaScript ([ce qui arrive plus souvent que vous le
pensez](https://kryogenix.org/code/browser/everyonehasjs.html)). C'est super, car cela veut dire que
notre application est résiliente.

La plupart du temps toutefois, les internautes _ont_ accès à JavaScript. Dans ces cas-là, nous
pouvons _améliorer progressivement_ l'expérience de la même façon que SvelteKit améliore
progressivement les éléments `<a>` en utilisant du routing côté client.

Importez la fonction `enhance` depuis `$apps/forms`...

```svelte
/// file: src/routes/+page.svelte
<script>
	+++import { enhance } from '$app/forms';+++

	let { data, form } = $props();
</script>
```

... et ajoutez la directive `use:enhance` aux éléments `<form>` :

```svelte
/// file: src/routes/+page.svelte
<form method="POST" action="?/create" +++use:enhance+++>
```

```svelte
/// file: src/routes/+page.svelte
<form method="POST" action="?/delete" +++use:enhance+++>
```

Et c'est tout ! Désormais, lorsque JavaScript est accessible, `use:enhance` va émuler le
comportement natif du navigateur à l'exception du rechargement complet de la page. Il va donc :

- mettre à jour la prop `form`
- invalider toutes les données lors d'une réponse de succès, provoquant le ré-exécutions des
  fonctions `load`
- naviguer vers la nouvelle page si la réponse est une redirection
- afficher la page d'erreur la plus proche si une erreur se produit

Maintenant que nous mettons à jour la page plutôt que la recharger, nous pouvons faire des choses
stylées comme transitions :

```svelte
/// file: src/routes/+page.svelte
<script>
	+++import { fly, slide } from 'svelte/transition';+++
	import { enhance } from '$app/forms';

	let { data, form } = $props();
</script>
```

```svelte
/// file: src/routes/+page.svelte
<li +++in:fly={{ y: 20 }} out:slide+++>...</li>
```
