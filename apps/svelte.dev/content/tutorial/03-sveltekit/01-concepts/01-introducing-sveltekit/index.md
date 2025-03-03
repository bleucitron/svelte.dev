---
title: C'est quoi SvelteKit?
---

Alors que Svelte est un _framework de composants_, SvelteKit est un _framework d'application_ (ou
"metaframework", selon à qui vous demandez), dont l'objectif est de résoudre les problématiques
complexes liées à la construction d'une application taillée pour la production :

- Routing
- Rendu côté serveur
- Chargement des données
- Service workers
- Intégration de TypeScript
- Pré-rendu
- Single-page apps
- Empaquetage de librairie
- Optimisation des builds de production
- Déploiements sur différentes solutions d'hébergements
- ... et bien d'autres

Les applications SvelteKit sont par défaut rendues sur le serveur (comme les applications
"multi-pages" traditionnelles, ou MPAs) afin de bénéficier d'excellentes performances au premier
chargement ainsi que de bonnes caractéristiques de référencement, mais transitionnent ensuite sur de
la navigation côté client (comme le font les SPAs modernes) pour éviter de recharger brutalement
tous les morceaux de l'application (comme par exemple d'éventuels script tiers activant des
analytics) lors que l'on navigue. Les applications SvelteKit peuvent être exécutées partout où
JavaScript existe, même si — comme nous le verrons — vos utilisateurs et utilisatrices n'ont pas
forcément de JavaScript pour en profiter.

Si tout cela semble compliqué, ne vous en faites pas : SvelteKit est un framework qui vous aide à
progresser ! Commencez par des choses simples, et ajoutez de nouvelles fonctionnalités au fur et à
mesure de vos besoins.

## Structure d'un projet

Sur la droite, dans le visualisateur de fichiers, vous verrez un certain nombre de fichiers que
SvelteKit s'attend à trouver dans un projet.

`package.json` doit vous être familier si vous êtes habitué•e à travailler avec Node.js. Ce fichier
liste les dépendances du projet — incluant `svelte` et `@sveltejs/kit` — ainsi que des `scripts`
permettant d'interagir avec certaines commandes du CLI de SvelteKit. (Il y a actuellement la
commande `npm run dev` qui tourne dans la fenêtre du bas.)

> [!NOTE] Notez que ce fichier précise aussi `"type": "module"`, ce qui signifie que les fichiers
> `.js` sont traités comme des modules JavaScript par défaut, plutôt que comme des fichiers
> CommonJS, format aujourd'hui déprécié.

`svelte.config.js` contient votre configuration de projet. Nous n'avons pas besoin de nous soucier
de ce fichier pour le moment, mais si vous êtez curieux ou curieuse, [jetez un oeil à la
documentation](/docs/kit/configuration).

`vite.config.js` contient la configuration de [Vite](https://vitejs.dev/). Puisque SvelteKit utilise
Vite, vous pouvez utiliser les [fonctionnalités de Vite](https://vitejs.dev/guide/features.html)
comme le remplacement de modules à la volée (HMR), l'intégration de TypeScript, la gestion des
fichiers statiques, et d'autres.

`src` est l'endroit où se trouve le code de votre application. `src/app.html` est votre gabarit de
page (SvelteKit remplace les `%sveltekit.head%` et `%sveltekit.body%` par ce qui est approprié), et
le dossier `src/routes` définit les [routes](/tutorial/kit/pages) de votre application.

Enfin, le dossier `static` contient tout asset (comme les fichiers `favicon.png` ou `robots.txt`)
qui devraient être inclus lors du déploiement de votre application.
