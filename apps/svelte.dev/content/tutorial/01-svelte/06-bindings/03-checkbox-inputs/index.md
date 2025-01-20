---
title: Checkbox
---

Les checkbox sont utilisées pour activer ou désactiver des états. Plutôt que de créer une liaison à
`input.value`, nous pouvons créer une liaison avec `input.checked` :

```svelte
/// file: App.svelte
<input type="checkbox" +++bind:+++checked={yes}>
```
