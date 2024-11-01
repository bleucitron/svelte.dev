---
title: $props
---

Les données d'entrée d'un composant sont appelées des _props_, abbréviation de _propriétés_. Vous
pouvez fournir des props aux composants de la même manière que vous passeriez des attributs aux
éléments :

```svelte
<!--- file: App.svelte --->
<script>
	import MyComponent from './MyComponent.svelte';
</script>

<MyComponent adjective="cool" />
```

De l'autre côté, dans `MyComponent.svelte`, les props sont accessibles grâce à la rune `$props`...

```svelte
<!--- file: MyComponent.svelte --->
<script>
	let props = $props();
</script>

<p>ce composant est {props.adjective}</p>
```

... bien que plus souvent, il est plus pratique de
[déstructurer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
vos props :

```svelte
<!--- file: MyComponent.svelte --->
<script>
	let +++{ adjective }+++ = $props();
</script>

<p>ce composant est {+++adjective+++}</p>
```

## Valeurs par défaut [!VO]Fallback values

Déstructurer permet de déclarer des valeurs par défaut, qui sont utilisées si le composant parent ne
définit pas une prop donnée :

```js
let { adjective = 'content' } = $props();
```

> [!NOTE] Les valeurs par défaut ne sont pas transformées en proxys d'état réactifs (voir [Mise à
> jour des props](#Updating-props) pour plus d'infos).

## Renommer des props [!VO]Renaming props

Vous pouvez aussi utiliser la syntaxe d'assignation par déstructuration pour renommer des props, ce
qui est nécessaire si leur identifiant est invalide ou si c'est un mot-clé réservé par JavaScript,
comme `super` :

```js
let { super: trouper = 'lights are gonna find me' } = $props();
```

## Props de reste [!VO]Rest props

Enfin, nous pouvons utiliser une _propriété de reste_ pour obtenir, eh bien, le reste des props :

```js
let { a, b, c, ...others } = $props();
```

## Mise à jour des props [!VO]Updating props

Les références à une prop à l'intérieur d'un composant se mettent à jour lorque la prop elle-même se
met à jour – lorsque `count` change dans `App.svelte`, elle va également changer dans
`Child.svelte`. Mais le composant enfant est capable d'écraser la valeur de la prop, ce qui peut
être utile pour des états temporaires qui ne seront pas sauvegardés
([démo](/playground/untitled#H4sIAAAAAAAAE6WQ0WrDMAxFf0WIQR0Wmu3VTQJln7HsIfVcZubIxlbGRvC_DzuBraN92qPula50tODZWB1RPi_IX16jLALWSOOUq6P3-_ihLWftNEZ9TVeOWBNHlNhGFYznfqCBzeRdYHh6M_YVzsFNsNs3pdpGd4eBcqPVDMrNxNDBXeSRtXioDgO1zU8ataeZ2RE4Utao924RFXQ9iHXwvoPHKpW1xY4g_Bg0cSVhKS0p560Za95612ZC02ONrD8ZJYdZp_rGQ37ff_mSP86Np2TWZaNNmdcH56P4P67K66_SXoK9pG-5dF5Z9QEAAA==)).

```svelte
<!--- file: App.svelte --->
<script>
	import Child from './Child.svelte';

	let count = $state(0);
</script>

<button onclick={() => (count += 1)}>
	clics (parent): {count}
</button>

<Child {count} />
```

```svelte
<!--- file: Child.svelte --->
<script>
	let { count } = $props();
</script>

<button onclick={() => (count += 1)}>
	clics (child): {count}
</button>
```

Bien que vous puissiez temporairement _réassigner_ des props, vous ne devriez pas _muter_ de props,
à moins qu'elles soient définies comme [bindable]($bindable).

Si une props est un objet classique, la mutation n'aura aucun effet
([démo](/playground/untitled#H4sIAAAAAAAAE3WQwU7DMBBEf2W1QmorQgJXk0RC3PkBwiExG9WQrC17U4Es_ztKUkQp9OjxzM7bjcjtSKjwyfKNp1aLORA4b13ADHszUED1HFE-3eyaBcy-Mw_O5eFAg8xa1wb6T9eWhVgCKiyD9sZJ3XAjZnTWCzzuzfAKvbcjbPJieR2jm_uGy-InweXqtd0baaliBG0nFgW3kBIUNWYo9CGoxE-UsgvIpw2_oc9-LmAPJBCPDJCggqvlVtvdH9puErEMlvVg9HsVtzuoaojzkKKAfRuALVDfk5ZZW0fmy05wXcFdwyktlUs-KIinljTXrRVnm7-kL9dYLVbUAQAA)
:

```svelte
<!--- file: App.svelte --->
<script>
	import Child from './Child.svelte';
</script>

<Child object={{ count: 0 }} />
```

```svelte
<!--- file: Child.svelte --->
<script>
	let { object } = $props();
</script>

<button onclick={() => {
	// n'a aucun effet
	object.count += 1
}}>
	clicks: {object.count}
</button>
```

Toutefois, si la props est un proxy réactif, les mutations _auront_ un effet, mais vous aurez un
warning
[`_ownership_invalid_mutation`](runtime-warnings#Client-warnings-ownership_invalid_mutation), car le
composant mute un état qui ne lui "appartient" pas
([démo](/playground/untitled#H4sIAAAAAAAAE3WR0U7DMAxFf8VESBuiauG1WycheOEbKA9p67FA6kSNszJV-XeUZhMw2GN8r-1znUmQ7FGU4pn2UqsOes-SlSGRia3S6ET5Mgk-2OiJBZGdOh6szd0eNcdaIx3-V28NMRI7UYq1awdleVNTzaq3ZmB43CndwXYwPSzyYn4dWxermqJRI4Np3rFlqODasWRcTtAaT1zCHYSbVU3r4nsyrdPMKTUFKDYiE4yfLEoePIbsQpqfy3_nOVMuJIqg0wk1RFg7GOuWfwEbz2wIDLVatR_VtLyBagNTHFIUMCqtoZXeIfAOU1JoUJsR2IC3nWTMjt7GM4yKdyBhlAMpesvhydCC0y_i0ZagHByMh26WzUhXUUxKnpbcVnBfUwhznJnNlac7JkuIURL-2VVfwxflyrWcSQIAAA==))
:

```svelte
<!--- file: App.svelte --->
<script>
	import Child from './Child.svelte';

	let object = $state({count: 0});
</script>

<Child {object} />
```

```svelte
<!--- file: Child.svelte --->
<script>
	let { object } = $props();
</script>

<button onclick={() => {
	// va mettre à jour le count ci-dessous,
	// mais avec un warning. Ne mutez pas
	// des objets que vous ne possédez pas !
	object.count += 1
}}>
	clics: {object.count}
</button>
```

La valeur par défaut d'une prop non déclarée avec `$bindable` n'est pas affectée – elle n'est pas
tranformée en proxy réactif d'état – ce qui implique que les mutations ne provoqueront pas de mise à
jour
([démo](/playground/untitled#H4sIAAAAAAAAE3WQwU7DMBBEf2VkIbUVoYFraCIh7vwA4eC4G9Wta1vxpgJZ_nfkBEQp9OjxzOzTRGHlkUQlXpy9G0gq1idCL43ppDrAD84HUYheGwqieo2CP3y2Z0EU3-En79fhRIaz1slA_-nKWSbLQVRiE9SgPTetbVkfvRsYzztttugHd8RiXU6vr-jisbWb8idhN7O3bEQhmN5ZVDyMlIorcOddv_Eufq4AGmJEuG5PilEjQrnRcoV7JCTUuJlGWq7-YHYjs7NwVhmtDnVcrlA3iLmzLLGTAdaB-j736h68Oxv-JM1I0AFjoG1OzPfX023c1nhobUoT39QeKsRzS8owM8DFTG_pE6dcVl70AQAA)) :

```svelte
<!--- file: Child.svelte --->
<script>
	let { object = { count: 0 } } = $props();
</script>

<button onclick={() => {
	// n'a pas d'éffet si la valeur par défaut est utilisée
	object.count += 1
}}>
	clics: {object.count}
</button>
```

En résumé : ne mutez pas les props. Vous pouvez soit utiliser des props de callback pour communiquer
des changements, ou – si le parent et l'enfant partagent le même objet – utiliser la rune
[`$bindable`]($bindable).

## Typage [!VO]Type safety

Vous pouvez ajouter du typage à vos composants en annotant vos props, comme vous le feriez avec
toute autre déclaration de variable. En TypeScript, cela peut ressembler à ça...

```svelte
<script lang="ts">
	let { adjective }: { adjective: string } = $props();
</script>
```

... tandis qu'en JSDoc vous pouvez écrire ceci :

```svelte
<script>
	/** @type {{ adjective: string }} */
	let { adjective } = $props();
</script>
```

Vous pouvez, bien sûr, séparer la déclaration de type de l'annotation :

```svelte
<script lang="ts">
	interface Props {
		adjective: string;
	}

	let { adjective }: Props = $props();
</script>
```

L'ajout de types est recommandé, car il permet aux personnes utilisant votre composant de découvrir
facilement les props à fournir.
