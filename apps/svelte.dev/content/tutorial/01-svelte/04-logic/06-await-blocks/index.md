---
title: Blocs await
tags: template-await
---

La plupart des applications web doivent gérer des données asynchrones à un moment ou à un autre.
Svelte permet de facilement attendre (_await_) la valeur des
[promesses](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Using_promises)
directement dans votre markup :

```svelte
/// file: App.svelte
+++{#await promise}+++
	<p>...les dés roulent</p>
+++{:then number}
	<p>vous avez obtenu un {number} !</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}+++
```

> [!NOTE] Seule la `promise` la plus récente est traitée, ce qui signifie que vous n'avez pas besoin
> de vous préoccuper d'éventuelles race conditions.

Si vous savez que votre promesse ne peut pas être rejetée, vous pouvez omettre le bloc `catch`. Vous
pouvez également omettre le premier bloc si vous ne souhaitez rien afficher tant que la promesse
n'est pas résolue :

```svelte
{#await promise then number}
	<p>vous avez obtenu un {number} !</p>
{/await}
```
