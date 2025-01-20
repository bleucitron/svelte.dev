---
title: Inputs numériques
---

Dans le DOM, chaque valeur d'input est une chaîne de caractères. Cela n'est pas très pratique
lorsqu'il s'agit d'inputs numériques — `type="number"` et `type="range"` — puisque cela signifie que
vous devez vous souvenir de transformer la valeur de `input.value` avant de vous en servir.

Avec `bind:value`, Svelte s'occupe de ça pour vous :

```svelte
/// file: App.svelte
<label>
	<input type="number" +++bind:+++value={a} min="0" max="10" />
	<input type="range" +++bind:+++value={a} min="0" max="10" />
</label>

<label>
	<input type="number" +++bind:+++value={b} min="0" max="10" />
	<input type="range" +++bind:+++value={b} min="0" max="10" />
</label>
```
