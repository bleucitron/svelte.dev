---
title: S'extraire d'un layout
editing_constraints:
  { 'create': ['/src/routes/a/b/c/+page@b.svelte', '/src/routes/a/b/c/+page@a.svelte'] }
---

D'habitude, une page hérite de chaque layout au-dessus d'elle, ce qui veut dire que
`src/routes/a/b/c/+page.svelte` hérite de quatres layouts :

- `src/routes/+layout.svelte`
- `src/routes/a/+layout.svelte`
- `src/routes/a/b/+layout.svelte`
- `src/routes/a/b/c/+layout.svelte`

Occasionnellement, il peut être utile de s'extraire de la hiérarchie actuelle de layouts. Nous
pouvons faire cela en ajoutant le caractère `@` suivi du nom du segment parent à partir duquel
réinitialiser l'héritage — par exemple `+page@b.svelte` va positionner `/a/b/c` dans
`src/routes/a/b/+layout.svelte`, tandis que `+page@a.svelte` le positionnerait dans
`src/routes/a/+layout.svelte`.

Réinitialisons toute la chaîne au niveau du layout racine, en renommant le fichier `+page@.svelte`.

> [!NOTE] Le layout racine s'applique à toutes les pages de votre application, vous ne pouvez pas
> vous en extraire.
