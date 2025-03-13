---
title: ssr
---

Le rendu côté serveur (SSR) est le processus de génération du HTML sur le serveur, et est ce que
SvelteKit fait par défaut. Le SSR permet de meilleures performances et une [meilleure
résilience](https://kryogenix.org/code/browser/everyonehasjs.html), ainsi qu'un meilleur
référencement (SEO) — bien que certains moteurs de recherche peuvent indexer des contenus générés
sur le navigateur avec JavaScript, cela est peu fréquent et moins fiable.

Ceci étant dit, certains composants _ne peuvent pas_ être rendus sur le serveur, peut-être
parcequ'ils ont besoin d'accéder immédiatement aux variables globales du navigateur, comme `window`.
Si possible, vous devriez modifier ces composants pour qu'ils _puissent_ être rendus sur le serveur,
mais sinon, vous pouvez alors désactiver le SSR :

```js
/// file: src/routes/+page.server.js
export const ssr = false;
```

> [!NOTE] Définir `ssr` à `false` dans votre fichier `+layout.server.js` racine fait de votre
> application une SPA de facto.
