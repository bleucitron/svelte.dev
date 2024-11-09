---
title: Éléments personnalisés
---

<!-- - [basically what we have today](https://svelte.dev/docs/custom-elements-api) -->

Les composants Svelte peuvent aussi être compilés en éléments personnalisés (aussi connus sous le
nom de composants web, ou _web components_), en utilisant l'option de compilateur `customElement:
true`. Il est recommandé de définir un nom de balise pour le composant, et ce en utilisant
l'[élément `<svelte:options>`](svelte-options).

```svelte
<svelte:options customElement="mon-element" />

<script>
	let { name = 'tout le monde' } = $props();
</script>

<h1>Coucou {name} !</h1>
<slot />
```

Vous pouvez oubliez le nom de balise pour tous les composants internes que vous ne souhaitez pas
exposer, et les utiliser comme des composants normaux. Les composants consommateurs d'un composant
non nommé peuvent toujours le nommer ultérieurement si nécessaire, en utilisant la propriété
statique `element` qui contient le constructeur de l'élément personnalisé et qui est disponible
lorsque l'option de compilateur `customElement` vaut `true`.

```js
// @noErrors
import MonElement from './MonElement.svelte';

customElements.define('mon-element', MonElement.element);
```

Une fois qu'un élément personnalisé a été défini, il peut être utilisé comme un élément DOM
classique :

```js
document.body.innerHTML = `
	<my-element>
		<p>Ceci est du contenu slotté</p>
	</my-element>
`;
```

Toutes les [props](basic-markup#Component-props) sont exposées comme propriétés de l'élément DOM
(tout étant des attributs de lecture/ecriture, lorsque possible).

```js
// @noErrors
const el = document.querySelector('mon-element');

// récupère la valeur courante de la prop `name`
console.log(el.name);

// définit une nouvelle valeur, qui va ainsi modifier le shadow DOM
el.name = 'les gens';
```

Notez que vous avez besoin de lister toutes les propriétés explicitement, en effet écrire `let props
= $props()` sans déclarer `props` dans les [options de composant](#Component-options) signifie que
Svelte ne peut pas connaître les props à exposer comme propriétés de l'élément DOM.

## Cycle de vie du composant [!VO]Component lifecycle

Les éléments personnalisés sont créés à partir de composants Svelte avec une approche d'"emballage".
Cela signifie que le composant Svelte interne n'a pas conscience d'être un élément personnalisé.
L'élément personnalisé parent – celui qui "emballe" – a la responsabilité de gérer correctement son
cycle de vie.

Lorsqu'un élément personnalisé est créé, le composant Svelte qu'il emballe n'est _pas_ créé tout de
suite. Il ne sera créé que lors du premier _tick_ suivant l'exécution de `connectedCallback`. Les
propriétés assignées à l'élément personnalisé avant qu'il ne soit ajouté au DOM sont temporairement
sauvegardées puis définies lors de la création du composant, pour que leurs valeurs ne soient pas
perdues. Ceci ne fonctionne toutefois pas si vous essayez d'exécuter des fonctions exportées depuis
l'élément personnalisé, elles ne seront disponibles qu'après le montage de l'élément. Si vous avez
besoin d'exécuter ce genre de fonctions avant la création du composant, vous pouvez contourner le
problème en utilisant l'[option `extend`](#Component-options).

Lorsqu'un élément personnalisé écrit en Svelte est créé ou mis à jour, le shadow DOM reflètera la
valeur lors du prochain tick, et non immédiatement. Ainsi, les mises à jour peuvent être cumulées,
et les modifications de DOM – qui détachent l'élément temporairement (mais de manière synchrone) du
DOM – ne découlenet pas sur le démontage du composant interne.

Le composant Svelte interne est détruit lors du premier tick suivant l'exécution de
`disconnectedCallback`.

## Options de composant [!VO]Component options

Depuis Svelte 4, lorque vous construisez un élément personnalisé, vous pouvez ajuster certains
aspects en définissant un objet `customElement` dans `<svelte:options>`. Cet objet peut contenir les
propriétés suivantes :

- `tag: string` : une propriété `tag` optionnelle pour le nom de l'élément personnalisé. Si défini,
	un élément personnalisé portant ce nom sera défini avec le registre `customElements` du document
lors de l'import de ce composant
- `shadow` : une propriété optionnelle qui peut être définie à `"none"` pour renoncer à la création
	de la racine du Shadow DOM. Noter que les styles ne sont alors plus encapsulés, et vous ne pouvez
	plus utiliser de slots
- `props` : une propriété optionnelle pour modifier certains détails et comportements des propriétés
	de votre composant. Elle offre les paramètres suivants :
	- `attribute: string`: Pour mettre à jour une prop d'élément personnalisé, vous avez deux
	alternatives : soit définir la propriété sur la référence de l'élément personnalisé comme illustré
	plus haut, ou utiliser un attribut HTML. Dans le deuxième cas, le nom par défaut de l'attribut est
	le nom de la propriété en minuscules. Vous pouvez modifier cela en assignant `attribute: "<desired
	name>"`
	- `reflect: boolean` : Par défaut, les mises à jour de props ne se reflètent pas sur le DOM. Pour
		activer ce comportement, utilisez `reflect: true`
	- `type: 'String' | 'Boolean' | 'Number' | 'Array' | 'Object'` : Lorsque la valeur d'un attribut
	est convertie en valeur de prop et reflétée sur le DOM, la valeur de la prop est supposée être une
	`String` par défaut. Ce n'est pas toujours le cas. Par exemple, pour un nombre, utilisez `type:
	"Number"`
		Vous n'avez pas besoin de lister toutes les propriétés, celles qui ne seront pas listées
	utiliseront les paramètres par défaut.
- `extend` : une propriété optionnelle qui attend une fonction en argument. Cette fonction prend en
	entrée la classe de l'élément personnalisée générée par Svelte et suppose que vous renvoyiez une
classe d'élément personnalisé. Ceci est utile lorsque vous avez des constraintes spécifiques sur le
cycle de vie de votre élément personnalisé ou souhaitez améliorer la classe pour, par exemple,
utiliser
[`ElementInternals`](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals#examples)
pour une meilleure intégration des formulaires HTML.

```svelte
<svelte:options
	customElement={{
		tag: 'custom-element',
		shadow: 'none',
		props: {
			name: { reflect: true, type: 'Number', attribute: 'element-index' }
		},
		extend: (customElementConstructor) => {
			// Étend la classe pour lui permettre de participer dans les formulaires HTML
			return class extends customElementConstructor {
				static formAssociated = true;

				constructor() {
					super();
					this.attachedInternals = this.attachInternals();
				}

				// Ajoutez la fonction ici, pas plus bas dans le composant, de sorte
				// qu'elle soit toujours disponible, pas uniquement lorsque le composant
				// Svelte interne est monté
				randomIndex() {
					this.elementIndex = Math.random();
				}
			};
		}
	}}
/>

<script>
	let { elementIndex, attachedInternals } = $props();
	// ...
	function check() {
		attachedInternals.checkValidity();
	}
</script>

...
```

## Mises en garde et limitations [!VO]Caveats and limitations

Les éléments personnalisés sont un moyen utile pour empaqueter des composants et les rendre
consommables dans une application n'utilisant pas Svelte, pusiqu'ils fonctionnent tout aussi bien en
JS vanille qu'avec [la plupart des frameworks](https://custom-elements-everywhere.com/). Il y a en
revanche quelques différences importantes qu'ils important de connaître :

- Les styles sont _encapsulés_, plutôt que simplement _scopés_ (sauf si vous avez défini l'option
`shadow: "none"`). Ceci implique que les styles non liés au composant (comme ceux que vous pourriez
définir dans un fichier `global.css`) ne s'appliqueront pas à l'élément personnalisé. Cela vaut
également pour les styles ayant le modificateur `:global(...)`
- Au lieu d'être extrait dans un fichier `.css` distinct, les styles sont inlinés dans le composant
en tant que chaîne de caractères JavaScript
- Les éléments personnalisés ne sont en général pas adaptés pour effectuer du rendu côté serveur,
puisque le shadow DOM est invisible tant que les scripts JavaScript n'ont pas été chargés
- Avec Svelte, le contenu slotté est rendu de manière "paresseuse" (_lazily_). Dans le DOM
classique, il est rendu immédiatement (_eagerly_). En d'autres termes, le contenu slotté sera créé
même si l'élément `<slot>` du composant est dans un bloc `{#if ...}`. De même, inclure un `<slot>`
dans un bloc `{#each ...}` ne va pas conduire à ce que le contenu slotté soit rendu plusieurs fois
- La directive `let:` dépréciée n'a pas d'effet, puisque les éléments personnalisés n'ont aucun
moyen de passer des données au composant parent remplissant le slot
- Des polyfills sont nécessaires pour assurer le support de navigateurs plus anciens
- Vous pouvez utiliser la fonctionnalité Svelte de contexte entre des composants Svelte standards au
	sein d'un élément personnalisé, mais vous ne pouvez pas vous servir d'un même contexte pour
différents éléments personnalisés. Autrement dit, vous ne pouvez pas utiliser `setContext` sur un
élément personnalisé parent et lire ce contexte avec `getContext` dans un élément personnalisé
enfant
