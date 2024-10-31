---
title: Bases du markup
---

Le markup présent dans un composant Svelte peut être vu comme du HTML++.

## Balises [!VO]Tags

Une balise en minuscules, comme `<div>`, représente un élément HTML standard. Une balise en
majuscules ou une balise utilisant un point, comme `<Widget>` ou `<mon.machin>`, représente un
_composant_.

```svelte
<script>
	import Widget from './Widget.svelte';
</script>

<div>
	<Widget />
</div>
```

## Attributs des éléments [!VO]Element attributes

Par défaut, les attributs fonctionnent exactement comme leurs homologues HTML.

```svelte
<div class="foo">
	<button disabled>can't touch this</button>
</div>
```

Comme en HTML, les valeurs peuvent être fournies sans guillemets.

<!-- prettier-ignore -->
```svelte
<input type=checkbox />
```

Les valeurs d'attributs peuvent contenir des expressions JavaScript.

```svelte
<a href="page/{p}">page {p}</a>
```

Ou peuvent _être_ des expressions JavaScript.

```svelte
<button disabled={!clickable}>...</button>
```

Les attributs booléens sont inclus sur l'élément si leur valeur est
[truthy](https://developer.mozilla.org/fr/docs/Glossary/Truthy) et exclus si leur valeur est
[falsy](https://developer.mozilla.org/fr/docs/Glossary/Falsy).

Tous les autres attributs sont inclus sauf si leur valeur est
[nullish](https://developer.mozilla.org/fr/docs/Glossary/Nullish) (`null` ou `undefined`).

```svelte
<input required={false} placeholder="Ce champ n'est pas requis" />
<div title={null}>Cette div n'a pas d'attribut de titre</div>
```


> [!NOTE] Mettre une expression entre guillemets n'a pas d'effet sur comment la valeur est lue, mais
> en Svelte 6 cela entraînera la transformation de la valeur en string :
>
> <!-- prettier-ignore -->
> ```svelte
> <button disabled="{number !== 42}">...</button>
> ```

Lorsque le nom de l'attribut correspond au nom de sa valeur (`name={name}`), l'écriture peut
être remplacée par `{name}`.

```svelte
<button {disabled}>...</button>
<!-- équivalent à
<button disabled={disabled}>...</button>
-->
```

## Props de composant [!VO]Component props

Par convention, les valeurs passées aux composants sont appelées `_propriétés`, ou `_props`, plutôt
qu'_attributs_, qui sont une fonctionnalité du DOM.

Comme pour les éléments, `name={name}` peut être remplacé par le raccourci `{name}`.

```svelte
<Widget foo={bar} answer={42} text="coucou" />
```

Les _attributs décomposés_ permettre de fournir d'un coup plusieurs attributs ou propriétés à un
élément ou composant.

Un élément ou composant peut avoir plusieurs attributs décomposés, ponctués d'attributs normaux.

```svelte
<Widget {...things} />
```

## Évènements [!VO]Events

Écouter des évènements DOM est possible en ajoutant à un élément des attributs commençant par `on`.
Par exemple, pour écouter l'évènement `click`, ajoutez l'attribut `onclick` à un bouton :

```svelte
<button onclick={() =>cliquez moi</button>
```

Les attributs d'évènements sont sensibles à la casse. `onclick` écoute l'évènement `click`,
`onClick` écoute l'évènement `Click`, ce qui n'est pas la même chose. Ceci vous assure de pouvoir
écouter des évènements personnalisés ayant des majuscules dans leur nom.

Puisque les évènements sont juste des attributs, les règles des attributs s'appliquent :

- vous pouvez utiliser la forme raccourcie : `<button {onclick}>cliquez moi</button>`
- vous pouvez les décomposer : `<button {...thisSpreadContainsEventAttributes}>cliquez moi</button>`

En termes de timing, les attributs d'évènement sont toujours déclenchés après les évènements venant
de liaisons (par ex. `oninput` est toujours déclenché après une mise à jour via `bind:value`). Sous
le capot, certains gestionnaires d'évènement sont directement attachés avec `addEventListener`,
tandis que d'autres sont _délégués_.

Lors de l'utilisation d'attributs d'évènement `ontouchstart` et `ontouchmove`, les gestionnaires
sont
[passifs](https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener#using_passive_listeners)
pour des raisons de performance. Cela améliore notablement la responsivité en laissant le navigateur
parcourir le document immédiatement, plutôt que d'attendre de savoir si le gestionnaire d'évènement
exécute `event.preventDefault()`.

Dans les rares cas où vous auriez besoin d'empêcher le comportement par défaut de ces évènements,
vous devriez plutôt utiliser [`on`](svelte-events#on) (par exemple dans une action).

### Délégation d'évènement [!VO]Event delegation

Pour réduire l'empreinte mémoire et améliorer les performances, Svelte utilise une technique appelée
délégation d'évènement. Ceci signifie que pour certains évènements – voir la liste plus bas – un
unique gestionnaire d'évènement "racine" prend la responsabilité de jouer tout gestionnaire présent
dans le parcours de l'évènement.

Il y a quelques inconvénients à avoir en tête :

- lorsque vous générez manuellement un évènement avec un gestionnaire délégué, assurez-vous de
définir l'option `{ bubbles: true }` ou bien l'évènement n'atteindra jamais la racine de
l'application.
- lorsque vous utilisez `addEventListener` directement, éviter d'appeler `stopPropagation` ou bien
l'évènement n'atteindra pas la racine de l'application et les gestionnaires ne seront pas invoqués.
De même, les gestionnaires ajoutés manuellement à la racine de l'application seront exécutés _avant_
les gestionnaires ajoutés déclarativement plus profondément dans le DOM (c-à-d avec
`onclick={...}`), à la fois pour les phases de capture et de bubbling. C'est pour ces raisons qu'il
est préférable d'utiliser la fonction `on` importée depuis `svelte/events` plutôt que d'utiliser
`addEventListener`, puisque cela vous assurera que l'ordre est préservé et que `stopPropagation` est
géré correctement.

Les gestionnaires des évènements suivants sont délégués :

- `beforeinput`
- `click`
- `change`
- `dblclick`
- `contextmenu`
- `focusin`
- `focusout`
- `input`
- `keydown`
- `keyup`
- `mousedown`
- `mousemove`
- `mouseout`
- `mouseover`
- `mouseup`
- `pointerdown`
- `pointermove`
- `pointerout`
- `pointerover`
- `pointerup`
- `touchend`
- `touchmove`
- `touchstart`

## Expressions texte [!VO]Text expressions

Une expression JavaScript peut être incluse en tant que texte en l'entourant d'accolades.

```svelte
{expression}
```

Les accolades peuvent être incluses dans un template Svelte en utilisant leur chaîne de caractères
d'[entité HTML](https://developer.mozilla.org/fr/docs/Glossary/Entity) : `&lbrace;`, `&lcub;`, or
`&#123;` pour `{` et `&rbrace;`, `&rcub;`, ou `&#125;` pour `}`.

Si vous utilisez la [notation
litérale](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/RegExp#literal_notation_and_constructor)
d'une expression régulière (`RegExp`), vous devrez l'entourer de parenthèses :

<!-- prettier-ignore -->
```svelte
<h1>Hello {name}!</h1>
<p>{a} + {b} = {a + b}.</p>

<div>{(/^[A-Za-z ]+$/).test(value) ? x : y}</div>
```

L'expression sera transformée en chaîne de caractères et échappée pour éviter les injections de
code. Si vous souhaitez afficher du HTML, utilisez plutôt la balise `{@html}`.

```svelte
{@html uneChaineDeCaracteresPotentiellementDangereuse}
```

> [!NOTE] Assurez-vous soit d'échapper la chaîne fournie, soit de ne fournir que des valeurs qui
> sont sous votre contrôle pour votre protéger d'éventuelles attaques
> [XSS](https://owasp.org/www-community/attacks/xss/).

## Commentaires [!VO]Comments

Vous pouvez écrire des commentaires HTML au sein de vos composants.

```svelte
<!-- ceci est un commentaire ! --><h1>Coucou tout le monde</h1>
```

Les commentaires commençant par `svelte-ignore` désactivent les warnings pour le bloc de markup
suivant. Ces sont généralement des warnings d'accessibilité ; ne les désactivez que pour une bonne
raison.

```svelte
<!-- svelte-ignore a11y-autofocus -->
<input bind:value={name} autofocus />
```

Vous pouvez ajouter un commentaire spécial commençant par `@component` qui s'affichera lorsque vous
survolerez le nom du composant dans d'autres fichiers.

````svelte
<!--
@component
- Vous pouvez utiliser la syntaxe Markdown ici.
- Vous pouvez aussi utiliser des blocs de code ici.
- Usage:
  ```html
  <Main name="Arethra">
  ```
-->
<script>
	let { name } = $props();
</script>

<main>
	<h1>
		Coucou {name}
	</h1>
</main>
````
