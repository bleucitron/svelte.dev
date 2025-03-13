---
title: prerender
---

Le pré-rendu est le fait de générer le HTML d'une page une seule fois, au moment de la compilation,
plutôt que dynamiquement à chaque requête.

L'avantage est que servir du contenu statique est très peu coûteux mais très performant, vous
permettant de facilement servir à un grand nombre de personnes votre contenu sans vous soucier des
en-têtes de contrôle de cache (que l'on peut facilement mal définir).

La contrepartie est que le processus de build prend plus longtemps, et que le contenu pré-rendu ne
peut être mis à jour que par une nouvelle compilation et un déploiement d'une nouvelle version de
votre application.

Pour pré-rendre une page, définissez `prerender` à `true` :

```js
/// file: src/routes/+page.server.js
export const prerender = true;
```

Dans ce tutoriel, ceci n'aura pas d'effet observable, puisque l'application est exécutée en mode
`dev`.

Toutes les pages ne peuvent pas être pré-rendues. La règle d'or est la suivante : pour qu'un contenu
puisse être pré-rendu, deux personnes lambda le requêtant directement doivent obtenir exactement le
même contenu du serveur, et la page ne doit pas contenir d'actions de formulaires. Les pages avec
des paramètres de routes dynamiques peuvent être pré-rendues tant qu'elles sont précisées dans le
champ de configuration [`prerender.entries`](/docs/kit/configuration#prerender) ou qu'elles sont
accessibles en suivant des liens venant de pages qui _sont_ définies dans `prerender.entries`.

> [!NOTE] Définir `prerender` à `tree` dans votre fichier `+layout.server.js` racine fait de votre
> application SvelteKit un générateur de site statique (SSG) de facto.
