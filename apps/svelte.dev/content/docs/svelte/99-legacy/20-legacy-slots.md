---
title: <slot>
---

Avec Svelte 5, du contenu peut être passé aux composants sous le forme de [snippets](snippet) et
affiché en utilisant des [balises render](@render).

En mode legacy, le contenu dans les balises de composant est considéré comme du _contenu slotté_,
qui peut être affiché par le composant en utilisant un élément `<slot>` :

```svelte
<!--- file: App.svelte --->
<script>
	import Modal from './Modal.svelte';
</script>

<Modal>Ceci est du contenu slotté</Modal>
```

```svelte
<!--- file: Modal.svelte --->
<div class="modal">
	<slot></slot>
</div>
```

> [!NOTE] Si vous souhaitez afficher un élément `<slot>` standard, vous pouvez utiliser
> `<svelte:element this={'slot'} />`.

## Slots nommés [!VO]Named slots

Un composant peut avoir des slots _nommés_ en plus du slot par défaut. Du côté du parent, ajoutez un
attribut `slot="..."` à un élément, composant ou [`<svelte:fragment>`](legacy-svelte-fragment), au
sein de la balise.

```svelte
<!--- file: App.svelte --->
<script>
	import Modal from './Modal.svelte';

	let open = true;
</script>

{#if open}
	<Modal>
		Ceci est du contenu slotté

		+++<div slot="buttons">+++
			<button on:click={() => open = false}>
				fermer
			</button>
		+++</div>+++
	</Modal>
{/if}
```

Du côté de l'enfant, ajoutez un élément `<slot name="...">` correspondant :

```svelte
<!--- file: Modal.svelte --->
<div class="modal">
	<slot></slot>
	<hr>
	+++<slot name="buttons"></slot>+++
</div>
```

## Contenu par défaut [!VO]Fallback content

Si aucun contenu slotté n'est fourni, un composant peut définir du contenu par défaut en le
déclarant dans l'élément `<slot>` :

```svelte
<slot>
	Ceci sera affiché si aucun contenu slotté n'est fourni
</slot>
```

## Fournir des données à du contenu slotté [!VO]Passing data to slotted content

Un même slot peut être affiché zéro ou plusieurs fois, et peut _remonter_ des valeurs au parent en
utilisant des props. Le parent expose ces valeurs au template de slot en utilisant la directive
`let:`.

```svelte
<!--- file: FancyList.svelte --->
<ul>
	{#each items as data}
		<li class="fancy">
			<!-- le `item` ici... -->
			<slot item={process(data)} />
		</li>
	{/each}
</ul>
```

```svelte
<!--- file: App.svelte --->
<!-- ... correspond au `item` ici : -->
<FancyList {items} let:item={processed}>
	<div>{processed.text}</div>
</FancyList>
```

Les règles classiques de raccourci de syntaxe – `let:item` est équivalent à `let:item={item}`, et
`<slot {item}>` est équivalent à `<slot item={item}>`.

Les slots nommés peuvent également exposer des valeurs. La directive `let:` doit se positionner sur
l'élément possédant l'attribut `slot`.

```svelte
<!--- file: FancyList.svelte --->
<ul>
	{#each items as item}
		<li class="fancy">
			<slot name="item" item={process(data)} />
		</li>
	{/each}
</ul>

<slot name="footer" />
```

```svelte
<!--- file: App.svelte --->
<FancyList {items}>
	<div slot="item" let:item>{item.text}</div>
	<p slot="footer">Copyright (c) 2019 Svelte Industries</p>
</FancyList>
```


