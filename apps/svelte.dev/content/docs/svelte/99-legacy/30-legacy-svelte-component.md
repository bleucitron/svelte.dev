---
title: <svelte:component>
---

En mode runes, `<MyComponent>` va être re-rendu si la valeur de `MyComponent` change.

En mode legacy, ça ne sera pas le cas – il est necéssaire d'utiliser `<svelte:component>`, qui va
détruire et reconstruire l'instance du composant lorsque la valeur de son expression `this` sera
mise à jour :

```svelte
<svelte:component this={MyComponent} />
```

Si `this` est falsy, aucun composant n'est rendu.
