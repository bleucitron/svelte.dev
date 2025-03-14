---
title: Recharger la page
---

Généralement, SvelteKit va naviguer entre les pages sans rafraîchir la page. Dans cet exercice, si
l'on navigue entre `/` et `/about`, le timer continue de tourner.

Dans de rares situations, vous pourriez vouloir désactiver ce comportement. Vous pouvez le faire en
ajoutant l'attribut `data-sveltekit-reload` sur un lien individuel, ou sur tout élément qui contient
des liens :

```svelte
/// file: src/routes/+layout.svelte
<nav +++data-sveltekit-reload+++>
	<a href="/">accueil</a>
	<a href="/about">à propos</a>
</nav>
```

Pour plus d'informations sur les options de lien disponibles et leurs valeurs, consultez la
[documentation sur les options de lien](/docs/kit/link-options).
