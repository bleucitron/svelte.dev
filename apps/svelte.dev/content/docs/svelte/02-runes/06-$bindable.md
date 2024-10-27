---
title: $bindable
---

D'ordinaire, les props se déplacent dans un seul sens, du parent vers l'enfant. Ceci permet de
clarifier la manière dont les données circulent au sein de votre application.

Avec Svelte, les props de composant peuvent être _liées_ (_"bound"_), ce qui signifie que les
données peuvent également remonter de l'enfant vers le parent. Ce n'est pas quelque chose que vous
devriez faire trop souvent, mais cela peut simplifier votre code si utilisé de manière sporadique et
précautionneuse.

Cela signifie aussi qu'un proxy d'état peut être _muté_ dans l'enfant.

> [!NOTE] La mutation est aussi possible avec des props normales, mais est fortement déconseillée –
> Svelte vous préviendra si son compilateur détecte qu'un composant mute un état qu'il ne "contrôle"
> pas.

Pour déclarer une prop comme pouvant être liée ("bindable"), il faut utiliser la rune `$bindable` :

<!-- prettier-ignore -->
```svelte
/// file: FancyInput.svelte
<script>
	let { value = $bindable(), ...props } = $props();
</script>

<input bind:value={value} {...props} />

<style>
	input {
		font-family: 'Comic Sans MS';
		color: deeppink;
	}
</style>
```

Désormais, un composant qui utilise `<FancyInput>` peut ajouter la directive [`bind`](bind)
([démo(/playground/untitled#H4sIAAAAAAAAE3WQwWrDMBBEf2URBSfg2nfFMZRCoYeecqx6UJx1IyqvhLUONcb_XqSkTUOSk1az7DBvJtEai0HI90nw6FHIJIhckO7i78n7IhzQctS2OuAtvXHESByEFFVoeuO5VqTYdN71DC-amvGV_MDQ9q6DrCjP0skkWymKJxYZOgxBfyKs4SGwZlxke7TWZcuVoqo8-1P1z3lraCcP2g64nk4GM5S1osrXf0JV-lrkgvGbheR-wDm_g30V8JL-1vpOCZFogpQsEsWcemtxscyhKArfOx9gjps0Lq4hzRVfemaYfu-PoIqqwKPFY_XpaIqj4tYRP7a6M3aUkD27zjSw0RTgbZN6Z8WNs66XsEP03tBXUueUJFlelvYx_wCuI3leNwIAAA==)])

<!-- prettier-ignore -->
```svelte
/// App.svelte
<script>
	import FancyInput from './FancyInput.svelte';

	let message = $state('coucou');
</script>

<FancyInput bind:value={message} />
<p>{message}</p>
```

Le composant parent n'est pas _obligé_ d'utiliser `bind:` – il peut se contenter de fournir une prop
normale. Certains parents n'ont pas envie d'écouter ce que leurs enfants ont à leur dire.

Dans ce cas, vous pouvez préciser une valeur par défaut à utiliser lorsqu'aucune prop n'est fournie
:

```js
/// file: FancyInput.svelte
let { value = $bindable('défaut'), ...props } = $props();
```
