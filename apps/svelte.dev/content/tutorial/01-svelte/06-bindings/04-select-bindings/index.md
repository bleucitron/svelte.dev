---
title: Liaisons de select
---

Nous pouvons aussi utiliser `bind:value` avec des éléments `<select>` :

```svelte
/// file: App.svelte
<select
    +++bind:+++value={selected}
    onchange={() => answer = ''}
>
```

Notez que les valeurs d'`<option>` sont des objets plutôt que des chaînes de caractères. Svelte s'en
fiche.

> [!NOTE] Puisque nous n'avons pas défini de valeur initiale pour `selected`, la liaison va
> automatiquement utiliser la valeur par défaut (la première dans la liste). Faites toutefois
> attention — tant que la liaison n'est pas initialisée, `selected` reste à `undefined`, ce qui
> empêche de facto de référencer aveuglément `selected` en écrivant par exemple `selected.id` dans
> le template.
