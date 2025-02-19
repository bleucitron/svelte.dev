---
title: Liaisons de composant
---

Tout comme vous pouvez lier des propriétés d'éléments DOM, vous pouvez lier des props de composant.
Par exemple, nous pouvons lier la prop `value` de ce composant `<Keypad>` comme s'il s'agissait d'un
élément `<form>`.

D'abord, nous avons besoin de déclarer la prop comme étant _bindable_ (c-à-d acceptant une liaison).
Dans `Keypad.svelte`, mettez à jour la déclaration `$props()` pour utiliser la rune `$bindable` :

```js
/// file: Keypad.svelte
let { value +++= $bindable('')+++, onsubmit } = $props();
```

Puis, dans `App.svelte`, ajoutez une directive `bind:` :

```svelte
/// file: App.svelte
<Keypad +++bind:value={pin}+++ {onsubmit} />
```

Désormais, lorsque l'utilisateur interagit avec le clavier affiché, la valeur de `pin` du composant
parent est immédiatement mise à jour.

> [!NOTE] Utilisez les liaisons de composant avec parcimonie. Cela peut vite être difficile de
> suivre le flux de données au sein de votre application si vous en avez trop, particulièrement si
> vous n'avez pas de "source de vérité unique".
