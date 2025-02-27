---
title: <svelte:boundary>
---

Pour éviter que des erreurs laissent votre application cassée, vous pouvez contenir ces erreurs au
sein d'une _frontière d'erreur_ en utilisant l'élément `<svelte:boundary>`.

Dans cet exemple, `<FlakyComponent>` contient un bug — cliquer sur le bouton va définir `mouse` à
`null`, ce qui implique que les expressions `{mouse.x}` et `{mouse.y}` du template ne pourront pas
être calculées, et vont provoquer une erreur.

Dans un monde idéal nous nous contenterions de corriger le bug. Mais ce n'est pas toujours possible
— parfois nous n'avons pas accès au code du composant, et parfois il suffit de se protéger contre
l'inattendu. Commencez par entourer `<FlakyComponent />` par `<svelte:boundary>` :

```svelte
<!--- file: App.svelte --->
+++<svelte:boundary>+++
	<FlakyComponent />
+++</svelte:boundary>+++
```

Jusque là, rien n'a changé, car la frontière ne précise pas de gestionnaire. Ajoutez un
[snippet](snippets-and-render-tags) `failed` pour fournir quelque chose à afficher lorsqu'une erreur
se produit :

```svelte
<!--- file: App.svelte --->
<svelte:boundary>
	<FlakyComponent />

+++	{#snippet failed(error)}
		<p>Oups ! {error.message}</p>
	{/snippet}+++
</svelte:boundary>
```

Désormais, lorsque nous cliquons sur le bouton, le contenu de la frontière est remplacé par le
snippet. Nous pouvons essayer de réinitialiser les choses en utilisant le deuxième argument que l'on
peut fournir à `failed` :

```svelte
<!--- file: App.svelte --->
<svelte:boundary>
	<FlakyComponent />

	{#snippet failed(error+++, reset+++)}
		<p>Oups ! {error.message}</p>
		+++<button onclick={reset}>Réinitialiser</button>+++
	{/snippet}
</svelte:boundary>
```

Nous pouvons aussi préciser un gestionnaire `onerror`, qui sera appelé avec les mêmes arguments que
ceux fournis au snippet `failed` :

```svelte
<!--- file: App.svelte --->
<svelte:boundary +++onerror={(e) => console.error(e)}+++>
	<FlakyComponent />

	{#snippet failed(error, reset)}
		<p>Oups ! {error.message}</p>
		<button onclick={reset}>Réinitialiser</button>
	{/snippet}
</svelte:boundary>
```

Ceci est utile pour envoyer des informations à propos de l'erreur à un service de suivi, ou pour
ajouter une interface visuelle en dehors de la frontière.
