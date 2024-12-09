---
title: {#snippet ...}
---

```svelte
<!--- copy: false  --->
{#snippet name()}...{/snippet}
```

```svelte
<!--- copy: false  --->
{#snippet name(param1, param2, paramN)}...{/snippet}
```

Les snippets, ainsi que les [balises de rendu (_render tags_)](@render) sont un moyen de créer des
morceaux de markup réutilisables dans vos composants. Plutôt que d'écrire du code dupliqué comme
[ceci](/playground/untitled#H4sIAAAAAAAAE5VUYW-kIBD9K8Tmsm2yXXRzvQ-s3eR-R-0HqqOQKhAZb9sz_vdDkV1t000vRmHewMx7w2AflbIGG7GnPlK8gYhFv42JthG-m9Gwf6BGcLbVXZuPSGrzVho8ZirDGpDIhldgySN5GpEMez9kaNuckY1ANJZRamRuu2ZnhEZt6a84pvs43mzD4pMsUDDi8DMkQFYCGdkvsJwblFq5uCik9bmJ4JZwUkv1eoknWigX2eGNN6aGXa6bjV8ybP-X7sM36T58SVcrIIV2xVIaA41xeD5kKqWXuqpUJEefOqVuOkL9DfBchGrzWfu0vb-RpTd3o-zBR045Ga3HfuE5BmJpKauuhbPtENlUF2sqR9jqpsPSxWsMrlngyj3VJiyYjJXb1-lMa7IWC-iSk2M5Zzh-SJjShe-siq5kpZRPs55BbSGU5YPyte4vVV_VfFXxVb10dSLf17pS2lM5HnpPxw4Zpv6x-F57p0jI3OKlVnhv5V9wPQrNYQQ9D_f6aGHlC89fq1Z3qmDkJCTCweOGF4VUFSPJvD_DhreVdA0eu8ehJJ5x91dBaBkpWm3ureCFPt3uzRv56d4kdp-2euG38XZ6dsnd3ZmPG9yRBCrzRUvi-MccOdwz3qE-fOZ7AwAhlrtTUx3c76vRhSwlFBHDtoPhefgHX3dM0PkEAAA=)...

```svelte
{#each images as image}
	{#if image.href}
		<a href={image.href}>
			<figure>
				<img src={image.src} alt={image.caption} width={image.width} height={image.height} />
				<figcaption>{image.caption}</figcaption>
			</figure>
		</a>
	{:else}
		<figure>
			<img src={image.src} alt={image.caption} width={image.width} height={image.height} />
			<figcaption>{image.caption}</figcaption>
		</figure>
	{/if}
{/each}
```

... vous pouvez écrire
[ceci](/playground/untitled#H4sIAAAAAAAAE5VUYW-bMBD9KxbRlERKY4jWfSA02n5H6QcXDmwVbMs-lnaI_z6D7TTt1moTAnPvzvfenQ_GpBEd2CS_HxPJekjy5IfWyS7BFz0b9id0CM62ajDVjBS2MkLjqZQldoBE9KwFS-7I_YyUOPqlRGuqnKw5orY5pVpUduj3mitUln5LU3pI0_UuBp9FjTwnDr9AHETLMSeHK6xiGoWSLi9yYT034cwSRjohn17zcQPNFTs8s153sK9Uv_Yh0-5_5d7-o9zbD-UqCaRWrllSYZQxLw_HUhb0ta-y4NnJUxfUvc7QuLJSaO0a3oh2MLBZat8u-wsPnXzKQvTtVVF34xK5d69ThFmHEQ4SpzeVRediTG8rjD5vBSeN3E5JyHh6R1DQK9-iml5kjzQUN_lSgVU8DhYLx7wwjSvRkMDvTjiwF4zM1kXZ7DlF1eN3A7IG85e-zRrYEjjm0FkI4Cc7Ripm0pHOChexhcWXzreeZyRMU6Mk3ljxC9w4QH-cQZ_b3T5pjHxk1VNr1CDrnJy5QDh6XLO6FrLNSRb2l9gz0wo3S6m7HErSgLsPGMHkpDZK31jOanXeHPQz-eruLHUP0z6yTbpbrn223V70uMXNSpQSZjpL0y8hcxxpNqA6_ql3BQAxlxvfpQ_uT9GrWjQC6iRHM8D0MP0GQsIi92QEAAA=)
:

```svelte
{#snippet figure(image)}
	<figure>
		<img src={image.src} alt={image.caption} width={image.width} height={image.height} />
		<figcaption>{image.caption}</figcaption>
	</figure>
{/snippet}

{#each images as image}
	{#if image.href}
		<a href={image.href}>
			{@render figure(image)}
		</a>
	{:else}
		{@render figure(image)}
	{/if}
{/each}
```

Comme avec les déclarations de fonctions, les snippets peuvent avoir un nombre arbitraire de
paramètres, qui peuvent avoir des valeurs par défaut, et vous pouvez déstructurer chaque paramètre.
Vous ne pouvez cependant pas utiliser de paramètre de reste.

## Portée de snippet [!VO]Snippet scope

Les snippets peuvent être déclarés n'importe où dans votre composant. Ils peuvent référencer des
valeurs déclarées en dehors de leur définition, par exemple dans une balise `<script>` ou un bloc
`{#each ...}` ([demo](/playground/untitled#H4sIAAAAAAAAE12P0QrCMAxFfyWrwhSEvc8p-h1OcG5RC10bmkyQ0n-3HQPBx3vCPUmCemiDrOpLULYbUdXqTKR2Sj6UA7_RCKbMbvJ9Jg33XpMcW9uKQYEAIzJ3T4QD3LSUDE-PnYA4YET4uOkGMc3W5B3xZrtvbVP9HDas2GqiZHqhMW6Tr9jGbG_oOCMImcUCwrIpFk1FqRyqpRpn0cmjHdAvnrIzuscyq_4nd3dPPD01ukE_NA6qFj9hvMYvGjJADw8BAAA=))...

```svelte
<script>
	let { message = `ça me fait plaisir de te voir` } = $props();
</script>

{#snippet hello(name)}
	<p>salut {name} ! {message} !</p>
{/snippet}

{@render hello('alice')}
{@render hello('bob')}
```

... et ils sont "visibles" par tout ce qui se trouve dans la même portée lexicale (c-à-d les
balises soeurs, et les enfants de ces balises) :

```svelte
<div>
	{#snippet x()}
		{#snippet y()}...{/snippet}

		<!-- pas de souci -->
		{@render y()}
	{/snippet}

	<!-- ceci va générer une erreur, puisque `y` est hors de portée -->
	{@render y()}
</div>

<!-- ceci va aussi générer une erreur, puisque `x` est hors de portée -->
{@render x()}
```

Les snippets peuvent se référencer eux-mêmes et les uns les autres
([demo](/playground/untitled#H4sIAAAAAAAAE2WPTQqDMBCFrxLiRqH1Zysi7TlqF1YnENBJSGJLCYGeo5tesUeosfYH3c2bee_jjaWMd6BpfrAU6x5oTvdS0g01V-mFPkNnYNRaDKrxGxto5FKCIaeu1kYwFkauwsoUWtZYPh_3W5FMY4U2mb3egL9kIwY0rbhgiO-sDTgjSEqSTvIDs-jiOP7i_MHuFGAL6p9BtiSbOTl0GtzCuihqE87cqtyam6WRGz_vRcsZh5bmRg3gju4Fptq_kzQBAAA=))
:

```svelte
{#snippet blastoff()}
	<span>🚀</span>
{/snippet}

{#snippet countdown(n)}
	{#if n > 0}
		<span>{n}...</span>
		{@render countdown(n - 1)}
	{:else}
		{@render blastoff()}
	{/if}
{/snippet}

{@render countdown(10)}
```

## Passer des snippets aux composants [!VO]Passing snippets to components

Au sein du template, les snippets sont des valeurs comme les autres. Ainsi, ils peuvent être passés
aux composants en tant que props
([demo](/playground/untitled#H4sIAAAAAAAAE41SwY6bMBD9lRGplKQlYRMpF5ZF7T_0ttmDwSZYJbZrT9pGlv-9g4Fkk-xhxYV5vHlvhjc-aWQnXJK_-kSxo0jy5IcxSZrg2fSF-yM6FFQ7fbJ1jxSuttJguVd7lEejLcJPVnUCGquPMF9nsVoPjfNnohGx1sohMU4SHbzAa4_t0UNvmcOcGUNDzFP4jeccdikYK2v6sIWQ3lErpui5cDdPF_LmkVy3wlp5Vd5e2U_rHYSe_kYjFtl1KeVnTkljBEIrGBd2sYy8AtsyLlBk9DYhJHtTR_UbBDWybkR8NkqHWyOr_y74ZMNLz9f9AoG6ePkOJLMHLBp-xISvcPf11r0YUuMM2Ysfkgngh5XphUYKkJWU_FFz2UjBkxztSYT0cihR4LOn0tGaPrql439N-7Uh0Dl8MVYbt1jeJ1Fg7xDb_Uw2Y18YQqZ_S2U5FH1pS__dCkWMa3C0uR0pfQRTg89kE4bLLLDS_Dxy_Eywuo1TAnPAw4fqY1rvtH3W9w35ZZMgvU3jq8LhedwkguCHRhT_cMU6eVA5dKLB5wGutCWjlTOslupAxxrxceKoD2hzhe2qbmXHF1v1bbOcNCtW_zpYfVI8h5kQ4qY3mueHTlesW2C7TOEO4hcdwzgf3Nc7cZxUKKC4yuNhvIX_MlV_Xk0EAAA=))
:

```svelte
<script>
	import Table from './Table.svelte';

	const fruits = [
		{ name: 'pommes', qty: 5, price: 2 },
		{ name: 'bananes', qty: 10, price: 1 },
		{ name: 'cerises', qty: 20, price: 0.5 }
	];
</script>

{#snippet header()}
	<th>fruit</th>
	<th>qté</th>
	<th>prix</th>
	<th>total</th>
{/snippet}

{#snippet row(d)}
	<td>{d.name}</td>
	<td>{d.qty}</td>
	<td>{d.price}</td>
	<td>{d.qty * d.price}</td>
{/snippet}

<Table data={fruits} {header} {row} />
```

On peut voir cette technique comme une façon de passer du contenu à un composant, plutôt que des
données. Le concept est similaire à celui des slots pour les composants web.

Pour simplifier l'écriture, les snippets déclarés directement _à l'intérieur_ d'un composant
deviennent implicitement des props _sur_ le composant ([demo](/playground/untitled#H4sIAAAAAAAAE41Sy27bMBD8lYVcwHYrW4kBXxRFaP-htzgHSqQsojLJkuu2BqF_74qUrfhxCHQRh7MzO9z1SSM74ZL8zSeKHUSSJz-MSdIET2Y4uD-iQ0Fnp4-2HpDC1VYaLHdqh_JgtEX4yapOQGP1AebrLJzWsXD-QjQi1lo5JMZRooNXeBuwHXoYLHOYM2OoiXkKv_GUwzYFY2VNFxvo0xtqxRR9F-7z04X8fE-uW2GtnJQ3E_tpvYV-oL9Ti0U2hVJFjMMZslcfW-5DWj9zShojEFrBuLCLZR_9CmzLQCwy-psw8rxBgvkNhhpZd8F8NppE7Stbq_8u-GTKS8_XQ9Keqnl5BZP1AzTYP2bDV7i7_9hLEeda0iocNJeNFDzJ0R5Fn142JzA-uzsdBfLhldPxPdMhIPS0H1-M1cYtlnejwdBDfBXZjHXTFOg4BhuOtvTfrVDEmAZG2ew5ezYV-Ew2fVzVAivNTyPHzwSr29AlMAe8f6g-zuWDts-GusAmdBSkv3P7qnB4GpMEEHwsRPEPV6yTe5VDJxp8iXClLRmtnGG1VHva3oCPHQd9QJsrbFd1Kzu-2Khvz8uzZsXqX3urj4rnMBNCXNUG83zf6Yp1C2yXKdxA_KJjGOfRfb0Vh7MKDShEuV-M9_4_nq6svF4EAAA=)) :

```svelte
<!-- ceci est sémantiquement la même chose qu'au-dessus -->
<Table data={fruits}>
	{#snippet header()}
		<th>fruit</th>
		<th>qté</th>
		<th>prix</th>
		<th>total</th>
	{/snippet}

	{#snippet row(d)}
		<td>{d.name}</td>
		<td>{d.qty}</td>
		<td>{d.price}</td>
		<td>{d.qty * d.price}</td>
	{/snippet}
</Table>
```

Tout contenu à l'intérieur d'une balise de composant qui n'est pas une déclaration de snippet
fait implicitement partie du snippet `children` ([demo](/playground/untitled#H4sIAAAAAAAAE41S247aMBD9lVFYCegGsiDxks1G7T_0bdkHJ3aI1cR27aEtsvzvtZ0LZeGhiiJ5js-cmTMemzS8YybJ320iSM-SPPmmVJImeFEhML9Yh8zHRp51HZDC1JorLI_iiLxXUiN8J1XHoNGyh-U2i9F2SFy-epon1lIY9IwzRwNv8B6wI1oIJXNYEqV8E8sUfuIlh0MKSvPaX-zBpZ-oFRH-m7m7l5m8uyfXLdOaX5X3V_bL9gAu0D98i0V2NSWKwQ4lSN7s0LKLbgtsyxgXmT9NiBe-iaP-DYISSTcj4bcLI7hSDEHL3yu6dkPfBdLS0m1o3nk-LW9gX-gBGss9ZsMXuLu32VjZBdfRaelft5eUN5zRJEd9Zi6dlyEy_ncdOm_IxsGlULe8o5qJNFgE5x_9SWmpzGp9N2-MXQxz4c2cOQ-lZWQyF0Jd2q_-mjI9U1fr4FBPE8iuKTbjjRt2sMBK0svIsQtG6jb2CsQAdQ_1x9f5R9tmIS-yPToK-tNkQRQGL6ObCIIdEpH9wQ3p-Enk0LEGXwe4ktoX2hhFai5Ofi0jPnYc9QF1LrDdRK-rvXjerSfNitQ_TlqeBc1hwRi7yY3F81MnK9KtsF2n8Amis44ilA7VtwfWTyr-kaKV-_X4cH8BTOhfRzcEAAA=)) :

```svelte
<!--- file: App.svelte --->
<Button>cliquez-moi</Button>
```

```svelte
<!--- file: Button.svelte --->
<script>
	let { children } = $props();
</script>

<!-- le résultat sera <button>cliquez-moi</button> -->
<button>{@render children()}</button>
```

> [!NOTE] Notez que vous ne pouvez pas avoir une prop appelée `children` si vous avez également du
> contenu au sein du composant — pour cette raison, vous devriez éviter de définir des props avec ce
> nom.

Vous pouvez déclarer des props de snippet comme étant optionnelles. Vous pouvez soit utiliser le
chaînage optionnel pour ne rien afficher du tout si le snippet n'est pas défini...

```svelte
<script>
    let { children } = $props();
</script>

{@render children?.()}
```

... soit utiliser un bloc `#if` pour afficher du contenu par défaut :

```svelte
<script>
    let { children } = $props();
</script>

{#if children}
    {@render children()}
{:else}
		contenu par défaut
{/if}
```

## Typer les snippets [!VO]Typing snippets

Les snippets implémentent l'interface `Snippet` importée depuis `'svelte'` :

```svelte
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		data: any[];
		children: Snippet;
		row: Snippet<[any]>;
	}

	let { data, children, row }: Props = $props();
</script>
```

Avec ce changement, des petits gribouillis rouges vont apparaître si vous essayez d'utiliser le
composant sans fournir une prop `data` et un snippet `row`. Notez que le type d'argument fourni à
`Snippet` est un tuple, puisque les snippets peuvent avoir plusieurs paramètres.

Nous pouvons restreindre encore un peu le typage en déclarant un générique, de sorte que `data` et
`row` soient toujours du même type :

```svelte
<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';

	let {
		data,
		children,
		row
	}: {
		data: T[];
		children: Snippet;
		row: Snippet<[T]>;
	} = $props();
</script>
```

## Exporter des snippets [!VO]Exporting snippets

Les snippets déclarés à la racine d'un fichier `.svelte` peuvent être exportés depuis un `<script
module>` pour qu'ils soient utilisés par d'autres composants, tant qu'ils ne référencent pas de
déclarations présentes dans un `<script>` non "`module`" (que ce soit directement ou indirectement,
vis d'autres snippets)
([demo](/playground/untitled#H4sIAAAAAAAAE3WPwY7CMAxEf8UyB1hRgdhjl13Bga8gHFJipEqtGyUGFUX5dxJUtEB3b9bYM_MckHVLWOKut50TMuC5tpbEY4GnuiGP5T6gXG0-ykLSB8vW2oW_UCNZq7Snv_Rjx0Kc4kpc-6OrrfwoVlK3uQ4CaGMgwsl1LUwXy0f54J9-KV4vf20cNo7YkMu22aqAz4-oOLUI9YKluDPF4h_at-hX5PFyzA1tZ84N3fGpf8YfUU6GvDumLqDKmEqCjjCHUEX4hqDTWCU5PJ6Or38c4g1cPu9tnAEAAA==))
:


```svelte
<script module>
	export { add };
</script>

{#snippet add(a, b)}
	{a} + {b} = {a + b}
{/snippet}
```

> [!NOTE]
> Ceci nécessite Svelte 5.5.0 ou plus récent

## Snippets programmatiques [!VO]Programmatic snippets

Les snippets peuvent être créés programmatiquement avec l'API
[`createRawSnippet`](svelte#createRawSnippet). Cela ne concerne que des cas avancés.

## Snippets et slots [!VO]Snippets and slots

En Svelte 4, du contenu peut être fourni aux composants en utilisant des [slots](legacy-slots). Les
snippets sont plus puissants et plus polyvalents, de sorte que les slots sont dépréciés avec Svelte
5.
