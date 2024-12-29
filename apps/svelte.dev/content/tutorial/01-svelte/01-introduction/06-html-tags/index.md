---
title: Balises HTML
---

Par défaut, les chaînes de caractères sont insérées comme du texte brut, ce qui signifie que `<` et
`>` n'ont pas de sens particulier.

Mais vous avez parfois besoin d'afficher du HTML directement dans un composant. Par exemple, les
mots que vous lisez en ce moment-même existent dans un fichier markdown qui est inclus dans cette
page en tant que morceau de HTML.

En Svelte, vous pouvez faire cela avec la balise dédiée `{@html ...}` :

```svelte
/// file: App.svelte
<p>{+++@html+++ string}</p>
```

> [!NOTE] Important : Svelte n'effectue aucun nettoyage de l'expression dans `{@html ...}` avant de
> l'insérer dans le DOM. Ceci n'est pas un problème si le contenu est quelque chose que vous
> maîtrisez, comme un article que vous avez écrit. Mais s'il s'agit de contenu utilisateur que vous
> ne maîtrisez pas, par ex. un commentaire sur un article, il est alors impératif de l'"échapper"
> manuellement, sans quoi vous risquez d'exposer vos utilisateurs et utilisatrices à des attaques de
> type <a href="https://owasp.org/www-community/attacks/xss/" target="_blank">Cross-Site
> Scripting</a> (XSS).
