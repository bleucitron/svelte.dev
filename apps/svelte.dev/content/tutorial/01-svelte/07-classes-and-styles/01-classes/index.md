---
title: L'attribut de classe
tags: template-class
---

Comme tout autre attribut, vous pouvez préciser les classes avec un attribut JavaScript. Ici, nous
pourrions ajouter une classe `flipped` à la carte :

```svelte
/// file: App.svelte
<button
	class="card {+++flipped ? 'flipped' : ''+++}"
	onclick={() => flipped = !flipped}
>
```

Ceci fonctionne comme attendu — si vous cliquez sur la carte, celle-ci va se retourner.

Nous pouvons néanmoins faire mieux. Ajouter ou supprimer une classe en fonction d'une condition est
un cas tellement courant dans le développement d'interfaces que Svelte vous permet de fournir un
objet ou un tableau qui sera converti en chaîne de caractères par
[clsx](https://github.com/lukeed/clsx).

```svelte
/// file: App.svelte
<button
	+++class={["card", { flipped }]}+++
	onclick={() => flipped = !flipped}
>
```

Ceci signifie 'ajoute toujours la classe `card`, et la classe `flipped` uniquement lorsque `flipped`
est truthy'.

Pour plus d'exemples sur comment combiner des classes conditionnelles, [consultez la documentation
de `class`](/docs/svelte/class).
