---
title: Attributs dynamiques
---

De la même manière que vous pouvez utiliser des accolades pour contrôler le texte, vous pouvez vous
en servir pour contrôler les attributs des éléments.

Notre image n'a pas de `src` — ajoutons-le lui :

```svelte
/// file: App.svelte
<img +++src={src}+++ />
```

C'est mieux. Mais si vous survolez l'`<img>` dans l'éditeur, Svelte vous avertit :

```
`<img>` element should have an alt attribute
```

_L'élément `<img>` doit avoir un attribut alt_

Lorsque l'on construit des applications web, il est important de s'assurer qu'elles sont
_accessibles_ au plus grand nombre, en incluant les personnes avec (par exemple) des difficultés de
vision ou de motricité, ou encore des personnes avec du matériel peu performant ou une mauvaise
connexion internet. L'accessibilité (abrégée en a11y) n'est pas toujours facile à mettre en place
correctement, mais Svelte vous aide à le faire en vous avertissant lorsque vous écrivez du markup
non accessible.

Dans ce cas, il manque l'attribut `alt` qui décrit l'image pour les personnes utilisant un lecteur
d'écran, ou pour les personnes avec une connexion internet lente ou peu fiable qui n'arrivent pas à
télécharger l'image.
Rajoutons cet attribut :

```svelte
/// file: App.svelte
<img src={src} +++alt="Un homme danse."+++ />
```

Nous pouvons utiliser les accolades _dans_ les attributs. Essayez plutôt d'écrire `"{name} danse"` —
n'oubliez pas de déclarer une variable `name` dans le bloc `<script>`.

## Raccourcis d'attributs [!VO]Shorthand attributes

Il est courant d'avoir un attribut dont le nom et la valeur sont égales, comme `src={src}`. Svelte
nous offre un raccourci pratique pour ces cas-là :

```svelte
/// file: App.svelte
<img +++{src}+++ alt="{name} danse." />
```
