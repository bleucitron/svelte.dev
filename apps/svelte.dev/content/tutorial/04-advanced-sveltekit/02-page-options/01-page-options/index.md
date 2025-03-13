---
title: Bases
---

Dans le chapitre sur le [chargement de données](/tutorial/kit/page-data), nous avons vu comment vous
pouviez exporter des fonctions `load` depuis des fichiers `+page.js`, `+page.server.js`,
`+layout.ts` et `+layout.server.js`. Nous pouvons aussi exporter différentes **options de page**
depuis ces modules :

- `ssr` — si oui ou non les pages devraient être rendues sur le serveur
- `csr` — si oui ou non le code de SvelteKit doit être chargé sur le client
- `prerender` — si oui ou non les pages devraient être prérendues au moment de la compilation,
  plutôt qu'au moment de chaque requête
- `trailingSlash` — si oui ou non les caractères slash à la fin des URLs devraient être supprimés,
  ajoutés, ou ignorés automatiquement

Dans les exercices suivants, nous allons étudier chacune de ces options l'un après l'autre.

Les options de page peuvent s'appliquer à des pages individuelles (si exportées depuis `+page.js` ou
`+page.server.js`), ou à des groupes de pages (si exportées depuis `+layout.js` ou
`+layout.server.js`). Pour définir une même option pour toute l'application, exportez-la depuis le
layout racine. Les layouts et pages enfants vont surcharger les valeurs d'options définies dans les
layouts parents, donc — par exemple — vous pouvez activer le prérendu pour votre application toute
entière, puis le désactiver pour les pages qui ont besoin d'être rendues dynamiquement.

Vous pouvez mélanger ces options dans différentes zones de votre application — vous pourriez
prérendre vos pages promotionnelles, rendre dynamiquement sur le serveur vos pages affichant des
données, et traiter vos pages d'administration comme une SPA gérée sur le client. Cela rend
SvelteKit très versatile.
