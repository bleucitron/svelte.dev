---
title: <svelte:boundary>
---

```svelte
<svelte:boundary onerror={handler}>...</svelte:boundary>
```

> [!NOTE]
> Cette fonctionnalité a été ajoutée avec la version 5.3.0

Les frontières (_boundaries_) vous permettent d'éviter que des erreurs se produisant dans des
parties de votre application fassent s'effondrer l'entièreté de l'application, et de traiter
correctement ces erreurs tout en permettant d'assurer un comportement normal.

Si une erreur se produit lors du rendu ou de la mise à jour des enfants d'un élément
`<svelte:boundary>`, ou lors de l'exécution d'une fonction [`$effect`]($effect) qui y serait
définie, son contenu sera alors supprimé.

Les erreurs se produisant en dehors du processus de rendu (par exemple, dans des gestionnaires
d'évènement) ne sont _pas_ traitées pas les frontières d'erreurs.

## Propriétés [!VO]Properties

Pour que les frontières puissent fonctionner, l'une des propriétés `failed` et `onerror` doit être
fournie en props.

### `failed`

Si un snippet `failed` est fourni, il sera rendu avec l'erreur levée et une fonction `reset`
permettant de recréer le contenu
([demo](/playground/hello-world#H4sIAAAAAAAAE3VRy26DMBD8lS2tFCIh6JkAUlWp39Cq9EBg06CAbdlLArL87zWGKk8ORnhmd3ZnrD1WtOjFXqKO2BDGW96xqpBD5gXerm5QefG39mgQY9EIWHxueRMinLosti0UPsJLzggZKTeilLWgLGc51a3gkuCjKQ7DO7cXZotgJ3kLqzC6hmex1SZnSXTWYHcrj8LJjWTk0PHoZ8VqIdCOKayPykcpuQxAokJaG1dGybYj4gw4K5u6PKTasSbjXKgnIDlA8VvUdo-pzonraBY2bsH7HAl78mKSHZpgIcuHjq9jXSpZSLixRlveKYQUXhQVhL6GPobXAAb7BbNeyvNUs4qfRg3OnELLj5hqH9eQZqCnoBwR9lYcQxuVXeBzc8kMF8yXY4yNJ5oGiUzP_aaf_waTRGJib5_Ad3P_vbCuaYxzeNpbU0eUMPAOKh7Yw1YErgtoXyuYlPLzc10_xo_5A91zkQL_AgAA)).

```svelte
<svelte:boundary>
	<ComposantFragile />

	{#snippet failed(error, reset)}
		<button onclick={reset}>oups ! essaye encore</button>
	{/snippet}
</svelte:boundary>
```

> [!NOTE]
> Comme avec tout [snippet passé à un composant](snippet#Passing-snippets-to-components), le snippet
> `failed` peut être passé explicitement comme propriété...
>
> ```svelte
> <svelte:boundary {failed}>...</svelte:boundary>
> ```
>
> ... ou implicitement en le déclarant directement dans la frontière, comme montré dans la l'exemple
> ci-dessus.

### `onerror`

Si une fonction `onerror` est fournie, celle-ci sera appelée avec les même arguments `error` et
`reset` que le snippet `failed`. Cela est utile pour traiter les erreurs via des services de gestion
d'erreur...

```svelte
<svelte:boundary onerror={(e) => report(e)}>
	...
</svelte:boundary>
```

... ou pour utiliser `error` et `reset` en dehors de la frontière elle-même :

```svelte
<script>
	let error = $state(null);
	let reset = $state(() => {});

	function onerror(e, r) {
		error = e;
		reset = r;
	}
</script>

<svelte:boundary {onerror}>
	<ComposantFragile />
</svelte:boundary>

{#if error}
	<button onclick={() => {
		error = null;
		reset();
	}}>
		oups ! essaye encore
	</button>
{/if}
```

Si une erreur se produit dans la fonction `onerror` (ou si vous y levez une erreur), celle-ci sera
gérée par une éventuelle frontière parente, si elle existe.
