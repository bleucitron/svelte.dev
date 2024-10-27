---
title: $effect
---

Les effets permettent à votre application de _faire des choses_. Lorsque Svelte exécute une fonction
d'effet, il détermine les états (et d'états dérivés) qui sont lus, (à moins qu'ils ne soient
exemptés par [`untrack`](svelte#untrack)), et ré-exécute la fonction lorsque ces états changent.

La plupart des effets dans une application Svelte sont créés par Svelte lui-même – c'est ce qui
permet de mettre à jour le texte dans `<h1>coucou {name} !</h1>` lorsque que `name` change, par
exemple.

Mais vous pouvez aussi créer vos propres effets avec la rune `$effect`, ce qui sert lorsque vous
avez besoin de synchroniser un système extérieur (que ce soit une librairie, un élément
`<canvas>`, ou quelque chose sur le réseau) avec un état au sein de votre application Svelte.

> [!NOTE] Évitez de trop vous servir des effets ! Lorsque trop de choses sont gérés via des effets,
> le code devient difficile à comprendre et à maintenir. Voir la partie [quand ne pas utiliser
> d'effet](#when-not-to-use-effects) pour en savoir plus sur les moyens de les éviter.

Vos effets sont exécutés après le montage du composant dans le DOM, et lors d'une
[micro-tâche](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide) juste
après la mise à jour de l'état
([démo](/playground/untitled#H4sIAAAAAAAAE31S246bMBD9lZF3pSRSAqTVvrCAVPUP2sdSKY4ZwJJjkD0hSVH-vbINuWxXfQH5zMyZc2ZmZLVUaFn6a2R06ZGlHmBrpvnBvb71fWQHVOSwPbf4GS46TajJspRlVhjZU1HqkhQSWPkHIYdXS5xw-Zas3ueI6FRn7qHFS11_xSRZhIxbFtcDtw7SJb1iXaOg5XIFeQGjzyPRaevYNOGZIJ8qogbpe8CWiy_VzEpTXiQUcvPDkSVrSNZz1UlW1N5eLcqmpdXUvaQ4BmqlhZNUCgxuzFHDqUWNAxrYeUM76AzsnOsdiJbrBp_71lKpn3RRbii-4P3f-IMsRxS-wcDV_bL4PmSdBa2wl7pKnbp8DMgVvJm8ZNskKRkEM_OzyOKQFkgqOYBQ3Nq89Ns0nbIl81vMFN-jKoLMTOr-SOBOJS-Z8f5Y6D1wdcR8dFqvEBdetK-PHwj-z-cH8oHPY54wRJ8Ys7iSQ3Bg3VA9azQbmC9k35kKzYa6PoVtfwbbKVnBixBiGn7Pq0rqJoUtHiCZwAM3jdTPWCVtr_glhVrhecIa3vuksJ_b7TqFs4DPyriSjd5IwoNNQaAmNI-ESfR2p8zimzvN1swdCkvJHPH6-_oX8o1SgcIDAAA=)).

```svelte
<script>
	let size = $state(50);
	let color = $state('#ff3e00');

	let canvas;

	$effect(() => {
		const context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);

		// ceci va être rejoué lorsque `color` ou `size` change
		context.fillStyle = color;
		context.fillRect(0, 0, size, size);
	});
</script>

<canvas bind:this={canvas} width="100" height="100" />
```

Les ré-exécutions sont mutualisées (i.e. changer `color` et `size` au même moment ne va pas
déclencher deux ré-exécutions distinctes), et se produisent après que les éventuelles modifications
du DOM aient eu lieu.

Vous pouvez places des `$effect` n'importe où, pas uniquement à la racine d'un composant, tant qu'il
est exécuté lors de l'initialisation du composant (ou lorsqu'un effet parent est actif). Il est
ensuite attaché au cycle de vie du composant (ou de l'effet parent) et sera donc détruit lorsque du
démontage du composant (ou lorsque l'effet parent est détruit).

Vous pouvez renvoyer une fonction depuis `$effect`, qui sera immédiatement exécutée avant la
ré-exécution de l'effet, et lorsque celui-ci est détruit
([démo](/playground/untitled#H4sIAAAAAAAAE42RQY-bMBCF_8rI2kPopiXpMQtIPfbeW6m0xjyKtWaM7CFphPjvFVB2k2oPe7LmzXzyezOjaqxDVKefo5JrD3VaBLVXrLu5-tb3X-IZTmat0hHv6cazgCWqk8qiCbaXouRSHISMH1gop4coWrA7JE9bp7PO2QjjuY5vA8fDYZ3hUh7QNDCy2yWUFzTOUilpSj9aG-linaMKFGACtKCmSwvGGYGeLQvCWbtnMq3m34grajxHoa1JOUXI93_V_Sfz7Oz7Mafj0ypN-zvHm8dSAmQITP_xaUq2IU1GO1dp80I2Uh_82dao92Rl9R8GvgF0QrbrUFstcFeq0PgAkha0LoICPoeB4w1SJUvsZcj4rvcMlvmvGlGCv6J-DeSgw2vabQnJlm55p7nM0rcTctYei3HZxZSl7XHVqkHEM3k2zpqXfFyj393zU05fpyI6f0HI0hUoPoamC9roKDeo2ivBH1EnCQOmX9NfYw2GHrgCAAA=))

```svelte
<script>
	let count = $state(0);
	let milliseconds = $state(1000);

	$effect(() => {
		// ceci sera recréé lorsque `milliseconds` change
		const interval = setInterval(() => {
			count += 1;
		}, milliseconds);

		return () => {
			// si un callback est fourni, il sera rejoué
			// a) immédiatement avant que l'effet ne se rejoue
			// b) lorsque que le composant est démonté
			clearInterval(interval);
		};
	});
</script>

<h1>{count}</h1>

<button onclick={() => (milliseconds *= 2)}>ralentir</button>
<button onclick={() => (milliseconds /= 2)}>accélérer</button>
```

### Comprendre les dépendances

`$effect` détecte automatiquement toute valeur réactive (`$state`, `$derived`, `$props`) qui est lue
de manière _synchrone_ à l'intérieur de son corps de fonction et l'enregistre en tant que
dépendance. Lorsque ces dépendances changent, l'`$effect` va planifier une ré-exécution.

Les valeurs qui sont lues de manière _asynchrones_ – après un `await` ou à l'intérieur d'un
`setTimeout`, par exemple – ne seront pas considérées comme dépendances. Ici, le canvas sera repeint
lorsque `color` change, mais pas lorsque `size` change
([démo](/playground/untitled#H4sIAAAAAAAAE31T246bMBD9lZF3pWSlBEirfaEQqdo_2PatVIpjBrDkGGQPJGnEv1e2IZfVal-wfHzmzJyZ4cIqqdCy9M-F0blDlnqArZjmB3f72XWRHVCRw_bc4me4aDWhJstSlllhZEfbQhekkMDKfwg5PFvihMvX5OXH_CJa1Zrb0-Kpqr5jkiwC48rieuDWQbqgZ6wqFLRcvkC-hYvnkWi1dWqa8ESQTxFRjfQWsOXiWzmr0sSLhEJu3p1YsoJkNUcdZUnN9dagrBu6FVRQHAM10sJRKgUG16bXcGxQ44AGdt7SDkTDdY02iqLHnJVU6hedlWuIp94JW6Tf8oBt_8GdTxlF0b4n0C35ZLBzXb3mmYn3ae6cOW74zj0YVzDNYXRHFt9mprNgHfZSl6mzml8CMoLvTV6wTZIUDEJv5us2iwMtiJRyAKG4tXnhl8O0yhbML0Wm-B7VNlSSSd31BG7z8oIZZ6dgIffAVY_5xdU9Qrz1Bnx8fCfwtZ7v8Qc9j3nB8PqgmMWlHIID6-bkVaPZwDySfWtKNGtquxQ23Qlsq2QJT0KIqb8dL0up6xQ2eIBkAg_c1FI_YqW0neLnFCqFpwmreedJYT7XX8FVOBfwWRhXstZrSXiwKQjUhOZeMIleb5JZfHWn2Yq5pWEpmR7Hv-N_wEqT8hEEAAA=)) :

```ts
// @filename: index.ts
declare let canvas: {
	width: number;
	height: number;
	getContext(type: '2d', options?: CanvasRenderingContext2DSettings): CanvasRenderingContext2D;
};
declare let color: string;
declare let size: number;

// ---cut---
$effect(() => {
	const context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);

	// cet effet sera rejoué lorsque `color` change...
	context.fillStyle = color;

	setTimeout(() => {
		// ... mais pas lorsque `size` change
		context.fillRect(0, 0, size, size);
	}, 0);
});
```

Un effet est seulement rejoué lorsque l'objet qu'il lit change, pas lorsqu'une propriété de cet
objet change. (If vous souhaitez observer les changement _à l'intérieur_ d'un objet lors de vos
développements, vous pouvez utiliser [`$inspect`]($inspect).)

```svelte
<script>
	let state = $state({ value: 0 });
	let derived = $derived({ value: state.value * 2 });

	// ceci sera joué une seule fois, car `state` n'est jamais réassigné (seulement muté)
	$effect(() => {
		state;
	});

	// ceci sera rejoué à chaque fois que `state.value` change...
	$effect(() => {
		state.value;
	});

	// ... et ceci également, car `derived` est un nouvel objet à chaque fois
	$effect(() => {
		derived;
	});
</script>

<button onclick={() => (state.value += 1)}>
	{state.value}
</button>

<p>Le double de {state.value} vaut {derived.value}</p>
```

Un effet dépend uniquement des valeurs qu'il a lues la dernière fois qu'il a été joué. Si `a`
est vrai, les changements affectant `b` [ne déclencheront pas la ré-exécution de cet
effet](/playground/untitled#H4sIAAAAAAAAE3WQ0WrDMAxFf0U1hTow1vcsMfQ7lj3YjlxEXTvEymC4_vfFC6Ewtidxde8RkrJw5DGJ9j2LoO8oWnGZJvEi-GuqIn2iZ1x1istsa6dLdqaJ1RAG9sigoYdjYs0onfYJm7fdMX85q3dE59CylA30CnJtDWxjSNHjq49XeZqXEChcT9usLUAOpIbHA0yzM78oColGhDVofLS3neZSS6mqOz-XD51ZmGOAGKwne-vztk-956CL0kAJsi7decupf4l658EUZX4I8yTWt93jSI5wFC3PC5aP8g0Aje5DcQEAAA==).

```ts
let a = false;
let b = false;
// ---cut---
$effect(() => {
	console.log('effet');

	if (a || b) {
		console.log('intérieur du bloc if');
	}
});
```

## `$effect.pre`

Dans de rares cas, vous pourriez avoir besoin d'exécuter votre code _avant_ que le DOM ne soit mis à
jour. Pour cela, nous avons accès à la rune `$effect.pre` :

```svelte
<script>
	import { tick } from 'svelte';

	let div = $state();
	let messages = $state([]);

	// ...

	$effect.pre(() => {
		if (!div) return; // pas encore monté

		// référence à la longueur du tableau `messages` afin que ce code soit rejoué lorsque celle-ci
		// change
		messages.length;

		// scroll automatique lorsque de nouveaux messages sont ajoutés
		if (div.offsetHeight + div.scrollTop > div.scrollHeight - 20) {
			tick().then(() => {
				div.scrollTo(0, div.scrollHeight);
			});
		}
	});
</script>

<div bind:this={div}>
	{#each messages as message}
		<p>{message}</p>
	{/each}
</div>
```

Le timing mis à part, `$effect.pre` fonctionne exactement comme `$effect`.

## `$effect.tracking`

La rune `$effect.tracking` est une fonctionnalité avancée qui vous informe de si le code est exécuté
au sein d'un contexte de suivi (_tracking_), comme un effet ou bien dans le template
([démo](/playground/untitled#H4sIAAAAAAAACn3PwYrCMBDG8VeZDYIt2PYeY8Dn2HrIhqkU08nQjItS-u6buAt7UDzmz8ePyaKGMWBS-nNRcmdU-hHUTpGbyuvI3KZvDFLal0v4qvtIgiSZUSb5eWSxPfWSc4oB2xDP1XYk8HHiSHkICeXKeruDDQ4Demlldv4y0rmq6z10HQwuJMxGVv4mVVXDwcJS0jP9u3knynwtoKz1vifT_Z9Jhm0WBCcOTlDD8kyspmML5qNpHg40jc3fFryJ0iWsp_UHgz3180oBAAA=))
:

```svelte
<script>
	console.log('lors de la mise en place du composant :', $effect.tracking()); // false

	$effect(() => {
		console.log('dans l\'effet :', $effect.tracking()); // true
	});
</script>

<p>dans le template: {$effect.tracking()}</p> <!-- true -->
```

Cela vous permet (par exemple) de mettre en place des choses comme des abonnements sans causer de
fuites de mémoire, en les mettant dans des effets enfant. Voici une fonction `readable` qui écoute
les changements d'un callback tant qu'elle se trouve dans un contexte de suivi :

```ts
import { tick } from 'svelte';

export default function readable<T>(
	initial_value: T,
	start: (callback: (update: (v: T) => T) => T) => () => void
) {
	let value = $state(initial_value);

	let subscribers = 0;
	let stop: null | (() => void) = null;

	return {
		get value() {
			// si dans un contexte de suivi...
			if ($effect.tracking()) {
				$effect(() => {
					// ... et qu'il n'y a pas encore d'abonné...
					if (subscribers === 0) {
						// ... invoquer la fonction et écouter les changements pour mettre à jour l'état
						stop = start((fn) => (value = fn(value)));
					}

					subscribers++;

					// le callback de retour est appelé lorsqu'un abonné se désabonne
					return () => {
						tick().then(() => {
							subscribers--;
							// si c'était le dernier abonné...
							if (subscribers === 0) {
								// ... arrêter d'écouter les changements
								stop?.();
								stop = null;
							}
						});
					};
				});
			}

			return value;
		}
	};
}
```

## `$effect.root`

La rune `$effect.root` est une fonctionnalité avancée qui crée un scope non suivi qui ne
s'auto-nettoie pas. Cela est utile pour les effets imbriqués que vous souhaitez contrôler
manuellement. Cette rune permet également la création d'effets en dehors de la phase
d'initialisation du composant.

```svelte
<script>
	let count = $state(0);

	const cleanup = $effect.root(() => {
		$effect(() => {
			console.log(count);
		});

		return () => {
			console.log('nettoyage de l\'effet racine');
		};
	});
</script>
```

## Quand ne pas utiliser `$effect` [!VO]When not to use `$effect`

En général, `$effect` est plutôt considéré comme un dernier recours – pratique pour des choses comme
les analytics ou la manipulation directe du DOM – plutôt qu'un outil que vous devriez utiliser
souvent. En particulier, évitez de vous en servir pour synchroniser un état. Plutôt que faire
ceci...

```svelte
<script>
	let count = $state(0);
	let doubled = $state();

	// ne faites pas ça !
	$effect(() => {
		doubled = count * 2;
	});
</script>
```

... faites ceci :

```svelte
<script>
	let count = $state(0);
	let doubled = $derived(count * 2);
</script>
```

> [!NOTE] Pour des choses plus compliquées qu'une simple expression comme `count * 2`, vous pouvez
> aussi utiliser `$derived.by`.

Vous pourriez être tenté•e de faire des choses tordues avec les effets pour lier une valeur à une
autre. L'exemple suivant montre deux inputs pour "argent dépensé" et "argent restant" qui sont
connectés l'un à l'autre. Si vous en mettez un à jour, l'autre s'ajuste automatiquement. N'utilisez
pas d'effets pour faire ça
([démo](/playground/untitled#H4sIAAAAAAAACpVRy26DMBD8FcvKgUhtoIdeHBwp31F6MGSJkBbHwksEQvx77aWQqooq9bgzOzP7mGTdIHipPiZJowOpGJAv0po2VmfnDv4OSBErjYdneHWzBJaCjcx91TWOToUtCIEE3cig0OIty44r5l1oDtjOkyFIsv3GINQ_CNYyGegd1DVUlCR7oU9iilDUcP8S8roYs9n8p2wdYNVFm4csTx872BxNCcjr5I11fdgonEkXsjP2CoUUZWMv6m6wBz2x7yxaM-iJvWeRsvSbSVeUy5i0uf8vKA78NIeJLSZWv1I8jQjLdyK4XuTSeIdmVKJGGI4LdjVOiezwDu1yG74My8PLCQaSiroe5s_5C2PHrkVGAgAA).

```svelte
<script>
	let total = 100;
	let spent = $state(0);
	let left = $state(total);

	$effect(() => {
		left = total - spent;
	});

	$effect(() => {
		spent = total - left;
	});
</script>

<label>
	<input type="range" bind:value={spent} max={total} />
	{spent}/{total} dépensé
</label>

<label>
	<input type="range" bind:value={left} max={total} />
	{left}/{total} restant
</label>
```

Utilisez plutôt des callbacks lorsque c'est possible
([démo](/playground/untitled#H4sIAAAAAAAACo1SMW6EMBD8imWluFMSIEUaDiKlvy5lSOHjlhOSMRZeTiDkv8deMEEJRcqdmZ1ZjzzxqpZgePo5cRw18JQA_sSVaPz0rnVk7iDRYxdhYA8vW4Wg0NnwzJRdrfGtUAVKQIYtCsly9pIkp4AZ7cQOezAoEA7JcWUkVBuCdol0dNWrEutWsV5fHfnhPQ5wZJMnCwyejxCh6G6A0V3IHk4zu_jOxzzPBxBld83PTr7xXrb3rUNw8PbiYJ3FP22oTIoLSComq5XuXTeu8LzgnVA3KDgj13wiQ8taRaJ82rzXskYM-URRlsXktejjgNLoo9e4fyf70_8EnwncySX1GuunX6kGRwnzR_BgaPNaGy3FmLJKwrCUeBM6ZUn0Cs2mOlp3vwthQJ5i14P9st9vZqQlsQIAAA==)).

```svelte
<script>
	let total = 100;
	let spent = $state(0);
	let left = $state(total);

	function updateSpent(e) {
		spent = +e.target.value;
		left = total - spent;
	}

	function updateLeft(e) {
		left = +e.target.value;
		spent = total - left;
	}
</script>

<label>
	<input type="range" value={spent} oninput={updateSpent} max={total} />
	{spent}/{total} dépensé
</label>

<label>
	<input type="range" value={left} oninput={updateLeft} max={total} />
	{left}/{total} restant
</label>
```

Si vous avez besoin d'utiliser des liaisons, peu importe la raison (par exemple lorsque vous voulez
quelque chose comme un `$derived` que l'on peut modifier manuellement), envisagez l'utilisation de
getters et setters pour synchroniser l'état
([démo](/playground/untitled#H4sIAAAAAAAACpWRwW6DMBBEf8WyekikFOihFwcq9TvqHkyyQUjGsfCCQMj_XnvBNKpy6Qn2DTOD1wu_tRocF18Lx9kCFwT4iRvVxenT2syNoDGyWjl4xi93g2AwxPDSXfrW4oc0EjUgwzsqzSr2VhTnxJwNHwf24lAhHIpjVDZNwy1KS5wlNoGMSg9wOCYksQccerMlv65p51X0p_Xpdt_4YEy9yTkmV3z4MJT579-bUqsaNB2kbI0dwlnCgirJe2UakJzVrbkKaqkWivasU1O1ULxnOVk3JU-Uxti0p_-vKO4no_enbQ_yXhnZn0aHs4b1jiJMK7q2zmo1C3bTMG3LaZQVrMjeoSPgaUtkDxePMCEX2Ie6b_8D4WyJJEwCAAA=)).

```svelte
<script>
	let total = 100;
	let spent = $state(0);

	let left = {
		get value() {
			return total - spent;
		},
		set value(v) {
			spent = total - v;
		}
	};
</script>

<label>
	<input type="range" bind:value={spent} max={total} />
	{spent}/{total} dépensé
</label>

<label>
	<input type="range" bind:value={left.value} max={total} />
	{left.value}/{total} restant
</label>
```

Si vous devez absolument mettre à jour un `$state` dans un effet et que cela déclenche une boucle
infinie parce que vous lisez et écrivez un même `$state`, utilisez [untrack](svelte#untrack).
