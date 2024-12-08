---
title: Aperçu
---

Svelte 5 a introduit des changements majeurs à l'API de Svelte, notamment les
[runes](what-are-runes), [snippets](snippet) et les attributs d'évènement. En conséquence, certaines
fonctionnalités de Svelte 3 et 4 sont dépréciées (même si elles restent encore supportées
actuellement, sauf mention contraire), et seront à terme supprimées. Nous recommandons que [migriez
votre code existant](v5-migration-guide) incrémentalement.

Les pages suivantes documentent ces fonctionnalités pour :
- les personnes utilisant toujours Svelte 3/4
- les personnes utilisant Svelte 5, mais avec des composants n'ayant pas encore été migrés

Puisque la syntaxe de Svelte 3/4 fonctionne toujours en Svelte 5, nous distinguerons entre le _mode
legacy_ et le _mode runes_. Si un composant est en mode runes (que vous simplement activer en
utilisant les runes, ou en définissant explicitement l'option de compilateur `runes: true`), les
fonctionnalités du mode legacy n'y sont plus disponibles.

Si vous êtes uniquement intéressé•e par la syntaxe de Svelte 3/4, vous pouvez retrouver sa
documentation sur [v4.svelte.dev](https://v4.svelte.dev) (en anglais).
