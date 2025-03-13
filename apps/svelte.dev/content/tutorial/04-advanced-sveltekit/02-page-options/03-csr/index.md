---
title: csr
---

Le rendu côté client est ce qui rend une page interactive — permettant l'incrémentation du compteur
lorsque vous cliquez sur le bouton de cette application — et permet à SvelteKit de mettre à jour la
page lors des navigations sans effectuer un rechargement complet.

Comme pour `ssr`, vous pouvez désactiver le rendu côté client :

```js
/// file: src/routes/+page.server.js
export const csr = false;
```

Cela signifie qu'aucun JavaScript ne sera servi au client, mais cela signifie aussi que vos
composants ne sont plus interactifs. Cela peut être une façon simple de vérifier si oui ou non votre
application est utilisable par des personnes qui — peu importe la raison — ne peuvent pas utiliser
JavaScript.
