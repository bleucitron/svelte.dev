---
title: bind:
---

D"ordinaire, les données circulent vers le bas, du parent vers ses enfants. La directive `bind:`
permet de faire circuler les données dans l'autre sens, de l'enfant vers le parent.

La syntaxe générale est `bind:property={expression}`, où `expression` est une _lvalue_ (c-à-d une
variable ou une propriété d'objet). Lorsque l'expression est un identifiant du même nom que la
propriété, il est possible d'omettre l'expression – autrement dit ces deux écritures sont
équivalentes :

<!-- prettier-ignore -->
```svelte
<input bind:value={value} />
<input bind:value />
```

Svelte crée un gestionnaire d'évènement qui met à jour la valeur liée. Si un élément a déjà un
gestionnaire pour le même évènement, ce gestionnaire sera déclenché avant que la valeur liée soit
mise à jour.

La plupart des liaisons sont à _double sens_ (_two-way_), ce qui signifie que toute modification de
la valeur va impacter l'élément est vice-versa. Quelques liaisons sont en _lecture seule_
(_readonly_), ce qui signifie que les changements de valeur n'auront aucun effet sur l'élément.

## Function bindings

You can also use `bind:property={get, set}`, where `get` and `set` are functions, allowing you to perform validation and transformation:

```svelte
<input bind:value={
	() => value,
	(v) => value = v.toLowerCase()}
/>
```

In the case of readonly bindings like [dimension bindings](#Dimensions), the `get` value should be `null`:

```svelte
<div
	bind:clientWidth={null, redraw}
	bind:clientHeight={null, redraw}
>...</div>
```

> [!NOTE]
> Function bindings are available in Svelte 5.9.0 and newer.

## `<input bind:value>`

Une directive `bind:value` sur un élément `<input>` crée une liaison avec la propriété `value` de
l'input :

<!-- prettier-ignore -->
```svelte
<script>
	let message = $state('coucou');
</script>

<input bind:value={message} />
<p>{message}</p>
```

Dans le cas d'un input numérique (`type="number"` ou `type="range"`), la valeur sera transformée en
nombre
([démo](/playground/untitled#H4sIAAAAAAAAE6WPwYoCMQxAfyWEPeyiOOqx2w74Hds9pBql0IllmhGXYf5dKqwiyILsLXnwwsuI-5i4oPkaUX8yo7kCnKNQV7dNzoty4qSVBSr8jG-Poixa0KAt2z5mbb14TaxA4OCtKCm_rz4-f2m403WltrlrYhMFTtcLNkoeFGqZ8yhDF7j3CCHKzpwoDexGmqCL4jwuPUJHZ-dxVcfmyYGe5MAv-La5pbxYFf5Z9Zf_UJXb-sEMquFgJJhBmGyTW5yj8lnRaD_w9D1dAKSSj7zqAQAA))
:

```svelte
<script>
	let a = $state(1);
	let b = $state(2);
</script>

<label>
	<input type="number" bind:value={a} min="0" max="10" />
	<input type="range" bind:value={a} min="0" max="10" />
</label>

<label>
	<input type="number" bind:value={b} min="0" max="10" />
	<input type="range" bind:value={b} min="0" max="10" />
</label>

<p>{a} + {b} = {a + b}</p>
```

Si l'input est vide ou invalide (dans le cas de `type="number"`), la valeur sera `undefined`.

Depuis la version 5.6.0, si un `<input>` faisant partie d'un formulaire possède une valeur par
défaut `defaultValue`, il récupèrera cette valeur par défaut plutôt que la chaîne de caractères vide
lors de la réinitialisation du formulaire. Notez que pour le rendu initial, la valeur de la liaison
est prioritaire sauf s'il cette valeur est `null` ou `undefined`.

```svelte
<script>
	let value = $state('');
</script>

<form>
	<input bind:value defaultValue="pas la string vide">
	<input type="reset" value="Réinitialiser">
</form>
```

> [!NOTE]
> Utilisez les boutons de réinitialisation avec prudence, et assurez-vous que les utilisateurs et
> utilisatrices ne cliquent pas dessus accidentellement lorsqu'ils souhaitent soumettre le
> formulaire.

## `<input bind:checked>`

Les inputs de type checkbox et radio peuvent être liés avec `bind:checked` :

```svelte
<label>
	<input type="checkbox" bind:checked={accepted} />
	Accepter les conditions générales
</label>
```

Depuis la version 5.6.0, si un `<input>` faisant partie d'un formulaire possède une valeur par
défaut `defaultChecked`, il récupèrera cette valeur par défaut plutôt que `false` lors de la
réinitialisation du formulaire. Notez que pour le rendu initial, la valeur de la liaison
est prioritaire sauf s'il cette valeur est `null` ou `undefined`.

```svelte
<script>
	let checked = $state(true);
</script>

<form>
	<input type="checkbox" bind:checked defaultChecked={true}>
	<input type="reset" value="Réinitialiser">
</form>
```

## `<input bind:group>`

Les inputs qui fonctionnent en groupe peuvent utiliser `bind:group`.

```svelte
<script>
	let tortilla = $state('Nature');

	/** @type {Array<string>} */
	let fillings = $state([]);
</script>

<!-- les inputs radio groupés sont mutuellement exclusifs -->
<input type="radio" bind:group={tortilla} value="Nature" />
<input type="radio" bind:group={tortilla} value="Blé complet" />
<input type="radio" bind:group={tortilla} value="Épinards" />

<!-- les inputs checkbox groupés remplissent un tableau -->
<input type="checkbox" bind:group={fillings} value="Riz" />
<input type="checkbox" bind:group={fillings} value="Haricots" />
<input type="checkbox" bind:group={fillings} value="Fromage" />
<input type="checkbox" bind:group={fillings} value="Guacamole (extra)" />
```

> [!NOTE] `bind:group` ne fonctionne que si les inputs sont dans le même composant Svelte.

## `<input bind:files>`

Vous pouvez utiliser `bind:files` sur les éléments `<input>` de `type="file"` pour obtenir une
[`FileList` des fichiers sélectionnés](https://developer.mozilla.org/fr/docs/Web/API/FileList).
Lorsque vous souhaitez mettre à jour les fichiers programmatiquement, vous pouvez toujours utiliser
un objet `FileList`. Actuellement les objets `FileList` ne peuvent pas être construits directement,
vous aurez besoin de d'abord créer un nouvel objet
[`DataTransfer`](https://developer.mozilla.org/fr/docs/Web/API/DataTransfer) et en extraire les
`files`.

```svelte
<script>
	let files = $state();

	function clear() {
		files = new DataTransfer().files; // null ou undefined ne fonctionne pas
	}
</script>

<label for="avatar">Envoyer une image :</label>
<input accept="image/png, image/jpeg" bind:files id="avatar" name="avatar" type="file" />
<button onclick={clear}>supprimer</button>
```

Les objets `FileList` ne peuvent pas non plus être modifiés. Si vous souhaitez par ex. supprimer un
fichier de la liste, vous devez créer un nouvel objet `DataTransfer` et y ajouter uniquement les
fichiers que vous souhaitez garder.

> [!NOTE] `DataTransfer` peut ne pas être disponible dans certains runtimes JS de serveur. Ne pas
> initialiser l'état lié aux `files` permet d'éviter de potentielles erreurs si les composants sont
> générés côté serveur.

## `<select bind:value>`

Une liaison sur la valeur d'un élément `<select>` correspond à la propriété `value` de l'`<option>`
sélectionnée, ce qui peut être n'importe quelle valeur (pas uniquement des chaînes de caractères,
comme c'est normalement le cas dans le DOM).

```svelte
<select bind:value={selected}>
	<option value={a}>a</option>
	<option value={b}>b</option>
	<option value={c}>c</option>
</select>
```

Un élément `<select multiple>` se comporte comme un groupe de checkbox. La variable liée est un
tableau ayant une entrée correspondant à la propriété `value` de chaque `<option>` sélectionnée.

```svelte
<select multiple bind:value={fillings}>
	<option value="Riz">Riz</option>
	<option value="Haricots">Haricots</option>
	<option value="Fromage">Fromage</option>
	<option value="Guacamole (extra)">Guacamole (extra)</option>
</select>
```

Lorsque la valeur d'une `<option>` correspond à son contenu tezte, l'attribut n'est pas nécessaire.

```svelte
<select multiple bind:value={fillings}>
	<option>Riz</option>
	<option>Haricots</option>
	<option>Fromage</option>
	<option>Guacamole (extra)</option>
</select>
```

Vous pouvez fournir au `<select>` une valeur par défaut en ajoutant l'attribut `selected` à
l'`<option>` (ou à plusieurs `<option>` dans le cas d'un `<select multiple>`) qui doit être
initialement sélectionnée. Si le `<select>` fait partie d'un formulaire, il sera réinitialisé à
cette séletion initiale lors de la réinitialisation du formulaire. Notez que pour le rendu initial,
la valeur de la liaison est prioritaire sauf s'il cette valeur est `undefined`.

```svelte
<select bind:value={selected}>
	<option value={a}>a</option>
	<option value={b} selected>b</option>
	<option value={c}>c</option>
</select>
```

## `<audio>`

Les éléments `<audio>` ont leur propre jeu de liaisons – cinq à double sens...

- [`currentTime`](https://developer.mozilla.org/fr/docs/Web/API/HTMLMediaElement/currentTime)
- [`playbackRate`](https://developer.mozilla.org/fr/docs/Web/API/HTMLMediaElement/playbackRate)
- [`paused`](https://developer.mozilla.org/fr/docs/Web/API/HTMLMediaElement/paused)
- [`volume`](https://developer.mozilla.org/fr/docs/Web/API/HTMLMediaElement/volume)
- [`muted`](https://developer.mozilla.org/fr/docs/Web/API/HTMLMediaElement/muted)

... et sept en lecture seule :

- [`duration`](https://developer.mozilla.org/fr/docs/Web/API/HTMLMediaElement/duration)
- [`buffered`](https://developer.mozilla.org/fr/docs/Web/API/HTMLMediaElement/buffered)
- [`paused`](https://developer.mozilla.org/fr/docs/Web/API/HTMLMediaElement/paused)
- [`seekable`](https://developer.mozilla.org/fr/docs/Web/API/HTMLMediaElement/seekable)
- [`seeking`](https://developer.mozilla.org/fr/docs/Web/API/HTMLMediaElement/seeking_event)
- [`ended`](https://developer.mozilla.org/fr/docs/Web/API/HTMLMediaElement/ended)
- [`readyState`](https://developer.mozilla.org/fr/docs/Web/API/HTMLMediaElement/readyState)

```svelte
<audio src={clip} bind:duration bind:currentTime bind:paused></audio>
```

## `<video>`

Les éléments `<video>` ont les mêmes liaisons que les éléments [#audio], auxquels viennent s'ajouter
les liaisons en lecture seule
[`videoWidth`](https://developer.mozilla.org/fr/docs/Web/API/HTMLVideoElement/videoWidth) et
[`videoHeight`](https://developer.mozilla.org/fr/docs/Web/API/HTMLVideoElement/videoHeight).

## `<img>`

Les éléments `<img>` ont deux liaisons en lecture seule :

- [`naturalWidth`](https://developer.mozilla.org/fr/docs/Web/API/HTMLImageElement/naturalWidth)
- [`naturalHeight`](https://developer.mozilla.org/fr/docs/Web/API/HTMLImageElement/naturalHeight)

## `<details bind:open>`

Les éléments `<details>` acceptent une liaison sur la propriété `open`.

```svelte
<details bind:open={isOpen}>
	<summary>Comment réconforter un bug JavaScript ?</summary>
	<p>En le consolant.</p>
</details>
```

## Liaison Contenteditable [!VO]Contenteditable bindings

Les élément ayant l'attribut `contenteditable` acceptent les liaisons suivantes :

- [`innerHTML`](https://developer.mozilla.org/fr/docs/Web/API/Element/innerHTML)
- [`innerText`](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/innerText)
- [`textContent`](https://developer.mozilla.org/fr/docs/Web/API/Node/textContent)

> [!NOTE] Il y a des [différences subtiles entre `innerText` et
> `textContent`](https://developer.mozilla.org/fr/docs/Web/API/Node/textContent#differences_from_innertext)

<!-- for some reason puts the comment and html on same line -->
<!-- prettier-ignore -->
```svelte
<div contenteditable="true" bind:innerHTML={html} />
```

## Dimensions

Tous les éléments visibles acceptent les liaisons suivantes en lecture seule, dont les valeurs sont
mesurées avec `ResizeObserver` :

- [`clientWidth`](https://developer.mozilla.org/fr/docs/Web/API/Element/clientWidth)
- [`clientHeight`](https://developer.mozilla.org/fr/docs/Web/API/Element/clientHeight)
- [`offsetWidth`](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/offsetWidth)
- [`offsetHeight`](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/offsetHeight)

```svelte
<div bind:offsetWidth={width} bind:offsetHeight={height}>
	<Chart {width} {height} />
</div>
```

> [!NOTE] `display: inline` elements do not have a width or height (except for elements with 'intrinsic' dimensions, like `<img>` and `<canvas>`), and cannot be observed with a `ResizeObserver`. You will need to change the `display` style of these elements to something else, such as `inline-block`.

## bind:this

```svelte
<!--- copy: false --->
bind:this={dom_node}
```

Pour obtenir la référence d'un noeud du DOM, utilisez `bind:this`. La valeur liée sera `undefined`
jusqu'à ce que le composant soit monté – autrement dit, vous ne devriez vous servir de cette valeur
que dans un effet ou dans un gestionnaire d'évènement, mais pas lors de l'initialisation du
composant.

```svelte
<script>
	/** @type {HTMLCanvasElement} */
	let canvas;

	$effect(() => {
		const ctx = canvas.getContext('2d');
		drawStuff(ctx);
	});
</script>

<canvas bind:this={canvas} />
```

Les composants acceptent aussi des liaisons `bind:this`, vous permettant d'interagir
programmatiquement avec les instances de composant.

```svelte
<!--- file: App.svelte --->
<ShoppingCart bind:this={cart} />

<button onclick={() => cart.empty()}> Panier vide </button>
```

```svelte
<!--- file: ShoppingCart.svelte --->
<script>
	// Tous les exports d'instance sont accessibles sur l'objet de l'instance
	export function empty() {
		// ...
	}
</script>
```

## bind:_property_ pour les composants [!VO]bind:property for components

```svelte
bind:property={variable}
```

Vous pouvez créer des liaisons avec des props de composant en utilisant la même syntaxe que pour les
éléments.

```svelte
<Keypad bind:value={pin} />
```

Même si les props Svelte sont réactives sans avoir besoin de liaison, cette réactivité est par
défaut descendante vers le composant. Utiliser `bind:property` vous permet de changer la propriété
depuis l'intérieur du composant pour faire remonter sa valeur en dehors du composant.

Pour définir une propriété comme acceptant une liaison (_bindable_), utilisez la rune
[`$bindable`]($bindable) :

```svelte
<script>
	let { propEnLectureSeule, propAcceptantUneLiaison = $bindable() } = $props();
</script>
```

Déclarer une propriété comme bindable signifie qu'elle _peut_ être utilisée avec `bind:`, pas
qu'elle _doit_ être utilisée avec `bind:`.

Les propriétés bindables peuvent avoir des valeurs par défaut :

```svelte
<script>
	let { propAcceptantUneLiaison = $bindable('valeur par défaut') } = $props();
</script>
```

Cette valeur par défaut s'applique _seulement_ lorsque la propriété n'est pas liée. Si la propriété
est liée et une valeur par défaut est définie, le parent se doit de fournir une valeur autre que
`undefined`, sans quoi une erreur de runtime sera levée. Ceci permet d'éviter les situations où il
est difficile de comprendre quelle devrait être la bonne valeur utilisée.

