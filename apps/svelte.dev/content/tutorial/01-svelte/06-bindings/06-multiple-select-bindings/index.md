---
title: Selects multiples
---

Un élément `<select>` peut avoir plusieurs attributs `multiple`, ce qui lui fera remplir un tableau
plutôt que de sélectionner une valeur unique.

Remplacez les checkbox par un `<select multiple>` :

```svelte
/// file: App.svelte
<h2>Parfums</h2>

+++<select multiple bind:value={flavours}>+++
	{#each ['cookies', 'menthe chocolat', 'fraise'] as flavour}
+++		<option>{flavour}</option>+++
	{/each}
+++</select>+++
```

Notez que nous pouvons omettre l'attribut `value` sur l'`<option>`, car la valeur est identique au
contenu de l'élément.

> [!NOTE] Maintenez la touche `control` (ou la touche `command` sur MacOS) pour sélectionner
> plusieurs options à la fois.
