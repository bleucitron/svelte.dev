---
title: $inspect
---

> [!NOTE] `$inspect` ne fonctionne que lors du développement. Dans un build de production, ell n'est
> jamais exécutée.

La rune `$inspect` est plus ou moins équivalente à `console.log`, si ce n'est qu'elle va déclencher
sa ré-exécution si sont argument est mis à jour. `$inspect` suit les changements d'états reactifs de
manière profonde, ce qui signifie que mettre à jour quelque chose au sein d'un objet ou d'un tableau
en utilisant la réactivité fine va déclencher sa ré-exécution
([démo](/playground/untitled#H4sIAAAAAAAACkWQ0YqDQAxFfyUMhSotdZ-tCvu431AXtGOqQ2NmmMm0LOK_r7Utfby5JzeXTOpiCIPKT5PidkSVq2_n1F7Jn3uIcEMSXHSw0evHpAjaGydVzbUQCmgbWaCETZBWMPlKj29nxBDaHj_edkAiu12JhdkYDg61JGvE_s2nR8gyuBuiJZuDJTyQ7eE-IEOzog1YD80Lb0APLfdYc5F9qnFxjiKWwbImo6_llKRQVs-2u91c_bD2OCJLkT3JZasw7KLA2XCX31qKWE6vIzNk1fKE0XbmYrBTufiI8-_8D2cUWBA_AQAA)).

```svelte
<script>
	let count = $state(0);
	let message = $state('coucou');

	$inspect(count, message); // sera affiché dans la console lorsque `count` ou `message` change
</script>

<button onclick={() => count++}>Incrémenter</button>
<input bind:value={message} />
```

## $inspect(...).with

`$inspect` renvoie une propriété `with`, que vous pouvez exécuter avec un callback, qui sera ensuite
utilisé à la place de `console.log`. Le premier argument du callback est soit `"init"` ou `"update"`
; les arguments suivants sont les valeurs passées à `$inspect`
([démo](/playground/untitled#H4sIAAAAAAAACkVQ24qDMBD9lSEUqlTqPlsj7ON-w7pQG8c2VCchmVSK-O-bKMs-DefKYRYx6BG9qL4XQd2EohKf1opC8Nsm4F84MkbsTXAqMbVXTltuWmp5RAZlAjFIOHjuGLOP_BKVqB00eYuKs82Qn2fNjyxLtcWeyUE2sCRry3qATQIpJRyD7WPVMf9TW-7xFu53dBcoSzAOrsqQNyOe2XUKr0Xi5kcMvdDB2wSYO-I9vKazplV1-T-d6ltgNgSG1KjVUy7ZtmdbdjqtzRcphxMS1-XubOITJtPrQWMvKnYB15_1F7KKadA_AQAA))

```svelte
<script>
	let count = $state(0);

	$inspect(count).with((type, count) => {
		if (type === 'update') {
			debugger; // ou  `console.trace`, ou ce que vous voulez
		}
	});
</script>

<button onclick={() => count++}>Incrémenter</button>
```

Une manière pratique de trouver l'origine d'une mise à jour est de fournir `console.trace` à `with`
:

```js
// @errors: 2304
$inspect(stuff).with(console.trace);
```
