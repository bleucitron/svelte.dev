---
title: Méthodes de cycle de vie
---

<!-- - onMount/onDestroy
- mention that `$effect` might be better for your use case
- beforeUpdate/afterUpdate with deprecation notice?
- or skip this entirely and only have it in the reference docs? -->

En Svelte 5, le cycle de vie d'un composant n'est constitué que de deux parties : sa création et sa
destruction. Tout ce qui est entre les deux – les mises à jour des états – n'est pas directement lié
au composant en tant que tel ; seuls les morceaux qui ont besoin de réagir aux changements d'état
sont notifiés. Cela s'explique par le fait que sous le capot, la plus petite unité de changement
n'est pas le composant, mais les effets (de rendu) qu'un composant définit lors de son
initialisation. En conséquence, il n'existe pas de méthode permettant d'accéder à l'"avant mise à
jour"/"après mise à jour" (_before update_, _after update_).

## `onMount`

La fonction `onMount` définit un callback à exécuter dès que le composant est monté dans le DOM.
`onMount` doit être exécutée lors de l'initialisation du composant (mais n'a pas besoin d'être
exécutée _au sein_ du composant ; elle peut être appelée depuis un module extérieur).

`onMount` n'est pas exécutée lors du rendu serveur d'un composant.

```svelte
<script>
	import { onMount } from 'svelte';

	onMount(() => {
		console.log('le composant a été monté');
	});
</script>
```

Si une fonction est renvoyée par `onMount`, elle sera appelée lorsque le composant sera démonté.

```svelte
<script>
	import { onMount } from 'svelte';

	onMount(() => {
		const interval = setInterval(() => {
			console.log('bip');
		}, 1000);

		return () => clearInterval(interval);
	});
</script>
```

> [!NOTE] Ce comportement ne fonctionne que si la fonction passée à `onMount` renvoie une valeur de
> manière _synchrone_. Les fonctions `async` renvoient toujours une `Promise`, et en tant que telles
> ne peuvent pas renvoyer une fonction de manière _synchrone_.

## `onDestroy`

Définit un callback à exécuter juste avant que le composant ne soit détruit.

Parmi `onMount`, `beforeUpdate`, `afterUpdate` et `onDestroy`, c'est la seule de ces méthodes à
être exécutée lors du rendu côté serveur.

<div class="ts-block">

```dts
function onDestroy(fn: () => any): void;
```

</div>

```svelte
<script>
	import { onDestroy } from 'svelte';

	onDestroy(() => {
		console.log('le composant va être détruit');
	});
</script>
```

## `tick`

Même s'il n'y a pas de méthode "après mise à jour", vous pouvez tout de même utiliser `tick` pour
vous assurez que l'interface est mise à jour avant de continuer. `tick` renvoie une `Promise` qui
est résolue lorsque tous les mises à jour en attente ont été traitées, ou lors que la prochaine
micro-tâche si aucune mise à jour n'est prévue.

```svelte
<script>
	import { tick } from 'svelte';

	$effect.pre(() => {
		console.log('le composant va se mettre à jour');
		tick().then(() => {
				console.log('le composant vient de se mettre à jour');
		});
	});
</script>
```

## Dépréciés: `beforeUpdate` / `afterUpdate` [!VO]Deprecated: `beforeUpdate` / `afterUpdate`

Svelte 4 possédaient des méthodes qui étaient exécutées avant ou après que le composant en entier
soit mis à jour. Pour des raisons de rétro-compatibilité, ces méthodes ont été adaptées à Svelte 5,
mais ne sont pas disponibles dans les composants qui utilisent les runes.

```svelte
<script>
	import { beforeUpdate, afterUpdate } from 'svelte';

	beforeUpdate(() => {
		console.log('le composant va se mettre à jour');
	});

	afterUpdate(() => {
		console.log('le composant vient de se mettre à jour');
	});
</script>
```

Utilisez `$effect.pre` à la place de `beforeUpdate` et `$effect` à la place de `afterUpdate` – ces
runes offrent un contrôle plus granulaire et réagissent uniquement aux changements qui les
intéressent.

### Exemple d'une fenêtre de chat [!VO]Chat window example

Pour implémenter une fenêtre de chat qui défile automatiquement vers le bas lorsque de nouveaux
messages sont reçus (mais uniquement si vous étiez _déjà_ en bas de la fenêtre), nous avons besoin
de mesurer le DOM avant de le mettre à jour.

En Svelte 4, nous faisons cela avec `beforeUpdate`, mais cette approche est imparfaite – elle
s'exécute avant _chaque_ mise à jour, qu'elle soit pertinente ou non. Dans l'exemple ci-dessous,
nous avons besoin d'ajouter des vérifications comme `updatingMessages` pour nous assurer que nous ne
touchons pas à la position du défilement lorsque le mode sombre est activé ou désactivé.

Avec les rune, nous pouvons utiliser `$effect.pre`, qui fonctionne comme `$effect` mais est exécuté
avant la mise à jour du DOM. Tant que la variable `messages` est explicitement référencée dans le
corps de l'effet, cet effet sera ré-exécutée lorsque la variable `messages` est mise à jour, mais
_pas_ lorsque la variable `theme` change.

`beforeUpdate`, et sa tout aussi problématique contrepartie `afterUpdate`, sont donc dépréciées par
Svelte 5.


- [Avant](/playground/untitled#H4sIAAAAAAAAE31WXa_bNgz9K6yL1QmWOLlrC-w6H8MeBgwY9tY9NfdBtmlbiywZkpyPBfnvo2zLcZK28AWuRPGI5OGhkEuQc4EmiL9eAskqDOLg97oOZoE9125jDigs0t6oRqfOsjap5rXd7uTO8qpW2sIFEsyVxn_qjFmcAcstar-xPN3DFXKtKgi768IVgQku0ELj3Lgs_kZjWIEGNpAzYXDlHWyJFZI1zJjeh4O5uvl_DY8oUkVeVoFuJKYls-_CGYS25Aboj0EtWNqel0wWoBoLTGZgmdgDS9zW4Uz4NsrswPHoyutN4xInkylstnBxdmIhh8m7xzqmoNE2Wq46n1RJQzEbq4g-JQSl7e-HDx-GdaTy3KD9E3lRWvj5Zu9QX1QN20dj7zyHz8s-1S6lW7Cpz3RnXTcm04hIlfdFuO8p2mQ5-3a06cqjrn559bF_2NHOnRZ5I1PLlXQNyQT-hedMHeUEDyjtdMxsa4n2eIbNhlTwhyRthaOKOmYtniwF6pwt0wXa6MBEg0OibZec27gz_dk3UrZ6hB2LLYoiv521Yd8Gt-foTrfhiCDP0lC9VUUhcDLU49Xe_9943cNvEArHfAjxeBTovvXiNpFynfEDpIIZs9kFbg52QbeNHWZzebz32s7xHco3nJAJl1nshmhz8dYOQJDyZetnbb2gTWe-vEeWlrfpZMavr56ldb29eNt6UXvgwgFbp_WC0tl2RK25rGk6lYz3nUI2lzvBXGHhPZPGWmKUXFNBKqdaW259wl_aHbiqoVIZdpE60Nax6IOujT0LbFFxIVTCxCRR2XloUcYNvSbnGHKBp763jHoj59xiZWJI0Wm0P_m3MSS985xkasn-cFq20xTDy3J5KFcjgUTD69BHdcHIjz431z28IqlxGcPSfdFnrGDZn6gD6lyo45zyHAD-btczf-98nhQxHEvKfeUtOVkSejD3q-9X7JbzjGtsdUxlKdFU8qGsT78uaw848syWMXz85Waq2Gnem4mAn3prweq4q6Y3JEpnqMmnPoFRgmd3ySW0LLRqSKlwYHriCvJvUs2yjMaaoA-XzTXLeGMe45zmhv_XAno3Mj0xF7USuqNvnE9H343QHlq-eAgxpbTPNR9yzUkgLjwSR0NK4wKoxy-jDg-9vy8sUSToakzW-9fX13Em9Q8T6Z26uZhBN36XUYo5q7ggLXBZoub2Ofv7g6GCZfTxe034NCjiudXj7Omla0eTfo7QBPOcYxbE7qG-vl3_B1G-_i_JCAAA)
- [Après](/playground/untitled#H4sIAAAAAAAAE31WXa-jNhD9K7PsdknUQJLurtRLPqo-VKrU1327uQ8GBnBjbGSb5KZR_nvHgMlXtyIS9njO-MyZGZRzUHCBJkhez4FkNQZJ8HvTBLPAnhq3MQcUFmlvVKszZ1mbTPPGbndyZ3ndKG3hDJZne7hAoVUNYY8JV-RBPgIt2AprhA18MpZZnIQ50_twuvLHNRrDSjRXj9fwiCJTBLIKdCsxq5j9EM4gtBU3QD8GjWBZd14xWYJqLTCZg2ViDyx1W4cz4dv0hsiB49FRHkyfsCgws3GjcTKZwmYLZ2feWc9o1W8zJQ2Fb62i5JUQRNRHgs-fx3WsisKg_RN5WVn4-WrvUd9VA9tH4-AcwbfFQIpkLWByvWzqSe2sk3kyjUlOec_XPU-3TRaz_75tuvKoi19e3OvipSpamVmupJM2F_gXnnJ1lBM8oLQjHceys8R7PMFms4HwD2lRhzeEe-EsvluSrHe2TJdo4wMTLY48XKwPzm0KGm2r5ajFtRYU4TWOY7-ddWHfxhDP0QkQhnf5PWRnVVkKnIx8fZsOb5dR16nwG4TCCRdCMphWQ7z1_DoOcp3zA2SCGbPZBa5jd0G_TRxmc36Me-mG6A7l60XIlMs8ce2-OXtrDyBItdz6qVjPadObzx-RZdV1nJjx64tXad1sz962njceOHfAzmk9JzrbXqg1lw3NkZL7vgE257t-uMDcO6attSSokpmgFqVMO2U93e_dDlzOUKsc-3t6zNZp6K9cG3sS2KGSUqiUiUmq8tNYoJwbmvpTAoXA96GyjCojI26xNglk6DpwOPm7NdRYp4ia0JL94bTqRiGB5WJxqFY37RGPoz3c6i4jP3rcUA7wmhqNywQW7om_YQ2L4UQdUBdCHSPiOQJ8bFcxHzeK0jKBY0XcV95SkCWlD9t-9eOM3TLKucauiyktJdpaPqT19ddF4wFHntsqgS-_XE01e48GMwnw02AtWZP02QyGVOkcNfk072CU4PkduZSWpVYt9SkcmJ64hPwHpWF5ziVls3wIFmmW89Y83vMeGf5PBxjcyPSkXNy10J18t3x6-a6CDtBq6SGklNKeazFyLahB3PVIGo2UbhOgGi9vKjzW_j6xVFFD17difXx5ebll0vwvkcGpn4sZ9MN3vqFYsJoL6gUuK9TcPrO_PxgzWMRfflSEr2NHPJf6lj1957rRpH8CNMG84JgHidUtXt4u_wK21LXERAgAAA==)

<!-- prettier-ignore -->
```svelte
<script>
	import { ---beforeUpdate, afterUpdate,--- tick } from 'svelte';

	---let updatingMessages = false;---
	let theme = +++$state('dark')+++;
	let messages = +++$state([])+++;

	let viewport;

	---beforeUpdate(() => {---
	+++$effect.pre(() => {+++
		---if (!updatingMessages) return;---
		+++messages;+++
		const autoscroll = viewport && viewport.offsetHeight + viewport.scrollTop > viewport.scrollHeight - 50;

		if (autoscroll) {
			tick().then(() => {
				viewport.scrollTo(0, viewport.scrollHeight);
			});
		}

		---updatingMessages = false;---
	});

	function handleKeydown(event) {
		if (event.key === 'Enter') {
			const text = event.target.value;
			if (!text) return;

			---updatingMessages = true;---
			messages = [...messages, text];
			event.target.value = '';
		}
	}

	function toggle() {
		toggleValue = !toggleValue;
	}
</script>

<div class:dark={theme === 'dark'}>
	<div bind:this={viewport}>
		{#each messages as message}
			<p>{message}</p>
		{/each}
	</div>

	<input +++onkeydown+++={handleKeydown} />

	<button +++onclick+++={toggle}> Activer / Désactiver le mode sombre </button>
</div>
```
