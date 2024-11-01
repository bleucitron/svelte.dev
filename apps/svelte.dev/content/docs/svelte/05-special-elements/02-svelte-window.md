---
title: <svelte:window>
---

```svelte
<svelte:window onevent={handler} />
```

```svelte
<svelte:window bind:prop={value} />
```

L'élement `<svelte:window>` vous permet d'ajouter des gestionnaires d'évènement à l'objet `window`
sans vous soucier de les supprimer lorsque que le composant est détruit, ni vérifier l'existance de
`window` lors du rendu côté serveur.

Cet élément ne peut être défini qu'à la racine de votre composant – il ne peut pas être dans un bloc
ou un élément.

```svelte
<script>
	function handleKeydown(event) {
		alert(`la touche ${event.key} a été enfoncée !`);
	}
</script>

<svelte:window onkeydown={handleKeydown} />
```

Vous pouvez aussi lier les propriétés suivantes :

- `innerWidth`
- `innerHeight`
- `outerWidth`
- `outerHeight`
- `scrollX`
- `scrollY`
- `online` — un alias de `window.navigator.onLine`
- `devicePixelRatio`

Toutes exceptées `scrollX` et `scrollY` sont en lecture seule.

```svelte
<svelte:window bind:scrollY={y} />
```

> [!NOTE] Notez que la page ne défilera pas automatiquement à la valeur initiale pour éviter des
> problèmes d'accessibilité. Seuls les changements de valeur de `scrollX` et `scrollY` (lorsque
> liées) ayant lieu après l'initialisation du composant déclencheront un défilement. Si vous avez
> une raison légitime de faire défiler lors du rendu du composant, vous pouvez appeler `scrollTo()`
> dans un `$effect`.
