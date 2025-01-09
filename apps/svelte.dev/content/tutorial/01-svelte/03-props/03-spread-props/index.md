---
title: Étaler les props
---

Dans cet exercice, nous avons oublié de passer dans `App.svelte` la prop `name` attendue par
`PackageInfo.svelte`, ce qui implique que l'élément `<code>` est vide et que le lien vers npm est
cassé.

Nous _pourrions_ corriger cela en ajoutant la prop...

```svelte
/// file: App.svelte
<PackageInfo
	+++name={pkg.name}+++
	version={pkg.version}
	description={pkg.description}
	website={pkg.website}
/>
```

... mais puisque les propriétés de `pkg` correspondent aux props attendues par le composant, nous
pouvons à la place les 'étaler' sur le composant :

```svelte
/// file: App.svelte
<PackageInfo +++{...pkg}+++ />
```

> [!NOTE] À l'inverse, dans `PackageInfo.svelte` nous pouvons obtenir un objet contenant toutes les
> props qui lui sont passées en utilisant la propriété de reste...
>
> ```js
> let { name, ...stuff } = $props();
> ```
>
> ...ou en ne
> [déstructurant](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
> pas du tout :
>
> ```js
> let stuff = $props();
> ```
>
> ... et dans ce cas vous pouvez accéder aux propriétés via leur path :
>
> ```js
> console.log(stuff.name, stuff.version, stuff.description, stuff.website);
> ```
