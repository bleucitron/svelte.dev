---
title: Transitions globales
---

D'ordinaire, les transitions ne sont jouées sur les éléments que lorsque l'élément qui les contient
directement est ajouté ou supprimé. Dans l'exemple ci-dessous, changer la visibilité de la liste
complète ne déclenche pas les transitions des éléments de liste individuels.

Nous voudrions plutôt que les transitions soient jouées lorsque nous interagissons avec la checkbox,
et pas uniquement lors que des éléments individuels sont ajoutés ou supprimés grâce au slider.

Nous pouvons faire cela avec une transition _globale_, qui est jouée lorsque _n'importe quel_ bloc
contenant les transitions est ajouté ou supprimé :

```svelte
/// file: App.svelte
<div transition:slide+++|global+++>
	{item}
</div>
```

> [!NOTE] En Svelte 3, les transitions étaient globales par défaut, et vous deviez ajouter le
> modificateur `|local` pour les rendre locales.
