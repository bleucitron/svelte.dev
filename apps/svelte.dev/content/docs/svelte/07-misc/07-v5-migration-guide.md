---
title: Guide de migration vers Svelte 5
---

La version 5 apporte une syntaxe et un système de réactivité revisités. Bien qu'il paraisse très
différent au premier abord, vous remarquerez très vite des ressemblances. Ce guide passe en revue
les changements de manière détaillée et vous aide à faire votre mise à jour. De plus, nous
fournissons également quelques informations sur _pourquoi_ nous avons fait ces changements.

Vous n'avez pas besoin de migrer vers la nouvelle syntaxe tout de suite – Svelte 5 continue de
supporter la syntaxe de la version 4, et il est possible de mélanger des composants utilisant la
nouvelle syntaxe avec des composants utilisant l'ancienne syntaxe. Nous pensons que beaucoup de gens
seront capables de mettre à jour Svelte en changeant initialement uniquement quelques lignes de
code. Nous proposons également un [script de migration](#Migration-script) qui vous aide avec
beaucoup de ces étapes automatiquement.

## Nouvelle syntaxe de réactivité [!VO]Reactivity syntax changes

La nouvelle API de runes est au coeur de Svelte 5. Les runes sont simplement des instructions pour
le compilateur qui informent Svelte à propos de la réactivité attendue. Syntactiquement, les runes
sont des fonctions dont le nom commence par un `$`.

### let -> $state

En Svelte 4, une déclaration `let` à la racine d'un composant était implicitement réactive. En
Svelte 5 les choses sont plus explicites : une variable est réactive lorsqu'elle a créée avec la
rune `$state`. Migrons le compteur ci-dessous en rune en l'entourant d'un `$state` :

```svelte
<script>
	let count = +++$state(+++0+++)+++;
</script>
```

Rien d'autre ne change. `count` est toujours le nombre lui-même, et vous pouvez le lire ou le
modifier directement, sans aucun intermédiaire comme `.value` ou `getCount()`.

> [!DETAILS] Pourquoi ce changement
> Le fait qu'une déclaration `let` à la racine d'un composant soit implicitement réactive
> fonctionnait très bien, mais cela impliquait que la réactivité était contrainte - déclarer un
> `let` à un autre endroit ne le rendait pas réactif. Cela vous forçait à utiliser des stores
> lorsque vous souhaitiez sortir du code d'un composant pour le réutiliser ailleurs. Cela signifiait
> également que vous deviez apprendre un modèle de réactivité complètement distinct, et au final
> cela se révélait souvent moins simple. Puisque la réactivité est plus explicite avec Svelte 5,
> vous pouvez continuer d'utiliser la même API en dehors de la racine des composants. Allez sur le
> [tutoriel](/tutorial) pour en apprendre plus.

### $: -> $derived/$effect

Avec Svelte 4, une déclaration `$:` à la racine d'un composant pouvait être utilisée pour déclarer
une dérivation, c-à-d un état entièrement défini par un calcul utilisant un autre état. Avec Svelte
5, ceci s'écrit en utilisant la rune `$derived` :

```svelte
<script>
	let count = +++$state(+++0+++)+++;
	---$:--- +++const+++ double = +++$derived(+++count * 2+++)+++;
</script>
```

Comme avec `$state`, rien d'autre ne change. `double` est toujours le nombre lui-même, et vous
pouvez le lire directement, sans intermédiaire comme `.value` ou `getDouble()`.

Une déclaration `$:` pouvait également être utilisée pour créer des effets de bord. Avec Svelte 5,
nous pouvons le faire en utilisant la rune `$effect` :

```svelte
<script>
	let count = +++$state(+++0+++)+++;
	---$:---+++$effect(() =>+++ {
		if (count > 5) {
			alert('Le compteur est trop élevé');
		}
	}+++);+++
</script>
```

> [!DETAILS] Pourquoi ce changement
> `$:` était un raccourci simple et efficace pour débuter : vous pouviez placer un `$:` devant la
> plupart de votre code, et cela fonctionnait. L'intuitivité était également un inconvénient lorsque
> votre code devenait de plus en plus complexe, parce que cela devenait difficile de raisonner sur
> les liens de réactivité entre les différents morceaux de code. L'intention de ce code était-elle
> de créer une dérivation, ou un effet de bord ? Avec `$derived` et `$effect`, vous devez choisir
> entre les deux (spoiler alert : 90% du temps vous voulez `$derived`), mais le futur-vous et les
> autres développeurs et développeuses de votre équipe vous remercieront.
>
> Il y avait également quelques inconvénients difficiles à détecter :
>
> - `$:` ne se mettait à jour que juste avant le rendu, ce qui signifiait que vous pouviez lire des
>   valeurs périmées entre deux rendus
> - `$:` n'était exécuté qu'une seule fois par tick, ce qui impliquait que des déclarations
>   pouvaient être exécutées moins souvent que vous ne le pensiez
> - les dépendances de `$:` étaient déterminées via analyse statique. Ceci fonctionnait dans la
>   plupart des cas, mais pouvait casser de manière subtile au cours d'un refactor lors duquel les
>   dépendances sont déplacées dans une fonction et ne sont en conséquence plus visibles
> - les déclarations `$:` étaient également ordonnées en utilisant l'analyse statique des
>   dépendances. Dans certains cas, il pouvait y avoir des égalités et l'ordre en résultait mauvais,
>   demandant des interventions manuelles. L'ordre pouvait aussi se briser lors d'un refactor qui
>   rendrait "invisibles" certaines dépendances
>
> Enfin, cette syntaxe n'était pas vraiment compatible avec TypeScript (notre outillage d'éditeur
> devait faire des circonvolutions pour le rendre compatible avec TypeScript), ce qui était bloquant
> pour rendre le modèle de réactivité de Svelte vraiment universel.
>
> `$derived` et `$effect` résolvent tous ces problèmes :
>
> - ils renvoient toujours la valeur la plus à jour
> - ils sont exécutés aussi souvent que nécéssaire pour rester stable
> - ils déterminent leurs dépendances lors de l'exécution, et sont donc insensibles aux refactors
> - ils exécutent leurs dépendences correctement et sont donc insensibles aux problèmes d'ordre
> - ils sont adaptés à l'utilisation de TypeScript

### export let -> $props

Avec Svelte 4, les propriétés d'un composant étaient déclarées en utilisant `export let`. Chaque
propriété nécessitait une déclaration. Avec Svelte 5, toutes les propriétés sont déclarées avec la
rune `$props`, via déstructuration :

```svelte
<script>
	---export let optional = 'unset';
	export let required;---
	+++let { optional = 'unset', required } = $props();+++
</script>
```

Il y a plusieurs cas dans lesquels la déclaration de propriétés est moins évidente que simplement
déclarer quelques `export let` :

- vous souhaitez renommer la propriété, par exemple parce que le nom est en conflit avec un
identifiant réservé (`class` par ex.)
- vous ne savez pas à l'avance à quelles autres propriétés vous attendre
- vous souhaitez transférer toutes les propriétés à un autre composant

Toutes ces situations nécessitent une syntaxe spéciale avec Svelte 4 :

- renommer : `export { klass as class}`
- autres propriétés : `$$restProps`
- toutes les propriétés : `$$props`

Avec Svelte 5, la rune `$props` rend ces situations plus simples sans ajouter de syntaxe spécifique
à Svelte :

- renommer : utilisez le renommage de propriété `let { class: klass } = $props();`
- autres propriétés : utilisez la décomposition `let { foo, bar, ...rest } = $props();`
- toutes les propriétés : ne déstructurez pas `let props = $props();`

```svelte
<script>
	---let klass = '';
	export { klass as class};---
	+++let { class: klass, ...rest } = $props();+++
</script>
<button class={klass} {...---$$restProps---+++rest+++}>cliquez moi</button>
```

> [!DETAILS] Pourquoi ce changement
> `export let` était l'un des choix d'API les plus controversés, et il y a eu beaucoup de débats
> autour de si vous deviez pensez aux propriétés comme étant `export`ées ou `import`ées. `$props`
> n'a pas ce problème. De plus, cette syntaxe est alignée avec les autres runes, dont la philosophie
> générale peut se résumer par "toute ce qui est relatif à la réactivité en Svelte est une rune".
>
> Il y avait également beaucoup de limitations liées à `export let`, qui requiert des API
> additionnelles, comme montré plus haut. `$props` réunit toutes ces API en un unique concept
> syntactique qui repose énormément sur la syntaxe JavaScript classique de déstructuration.

## Changements sur les évènements [!VO]Event changes

La gestion des évènements a été refondue avec Svelte 5. Alors qu'avec Svelte 4 il faut utiliser la
directive `:on` pour attacher un gestionnaire d'évènement à un élément, avec Svelte 5 ce ne sont que
des propriétés comme n'importe quelles autres (autrement dit, enlevez le `:`) :

```svelte
<script>
	let count = $state(0);
</script>

<button on---:---click={() => count++}>
	clics : {count}
</button>
```

Puisque ce ne sont que des propriétés, vous pouvez utiliser la syntaxe raccourcie...

```svelte
<script>
	let count = $state(0);

	function onclick() {
		count++;
	}
</script>

<button {onclick}>
	clics : {count}
</button>
```

... même si lorsque vous utilisez un gestionnaire d'évènement personnalisé il est généralement
recommandé d'utiliser un nom plus descriptif.

### Évènements de composant [!VO]Component events

Avec Svelte 4, les composants pouvaient émettre des évènements en créant un dispatcher avec
`createEventDispatcher`.

Cette fonction est dépréciée avec Svelte 5. À la place, les composants doivent accepter des _props
de callback_ – ce qui signifie que vous passez des fonctions comme propriétés à ces composants :

```svelte
<!--- file: App.svelte --->
<script>
	import Pump from './Pump.svelte';

	let size = $state(15);
	let burst = $state(false);

	function reset() {
		size = 15;
		burst = false;
	}
</script>

<Pump
	---on:---inflate={(power) => {
		size += power---.detail---;
		if (size > 75) burst = true;
	}}
	---on:---deflate={(power) => {
		if (size > 0) size -= power---.detail---;
	}}
/>

{#if burst}
	<button onclick={reset}>nouveau ballon</button>
	<span class="boom">💥</span>
{:else}
	<span class="balloon" style="scale: {0.01 * size}">
		🎈
	</span>
{/if}
```

```svelte
<!--- file: Pump.svelte --->
<script>
    ---import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    ---
	+++let { inflate, deflate } = $props();+++
	let power = $state(5);
</script>

<button onclick={() => ---dispatch('inflate', power)---+++inflate(power)+++}>
	gongler
</button>
<button onclick={() => ---dispatch('deflate', power)---+++deflate(power)+++}>
	dégonfler
</button>
<button onclick={() => power--}>-</button>
Puissance de la pompe : {power}
<button onclick={() => power++}>+</button>
```

### Remonter des évènements [!VO]Bubbling events

Plutôt que d'écrire `<button on:click>` pour "relayer" un évènement depuis l'élément vers le
composant, le composant devrait accepter une prop de callback `onclick` :

```svelte
<script>
	+++let { onclick } = $props();+++
</script>

<button ---on:click--- +++{onclick}+++>
	cliquez moi
</button>
```

Notez que ceci signifie également que vous pouvez _spread_ les gestionnaires d'évènement sur un
élément avec les autres propriétés plutôt que relayer péniblement chaque évènement séparément :

```svelte
<script>
	let props = $props();
</script>

<button ---{...$$props} on:click on:keydown on:all_the_other_stuff--- +++{...props}+++>
	cliquez moi
</button>
```

### Modificateurs d'évènement [!VO]Event modifiers

Avec Svelte 4, vous pouvez ajouter des modificateurs aux gestionnaires d'évènement :

```svelte
<button on:click|once|preventDefault={handler}>...</button>
```

Les modificateurs sont spécifiques à `on:` et ne sont pas compatibles avec la nouvelle syntaxe de
gestion des évènements. L'ajout de choses comme `event.preventDefault()` dans le gestionnaire
lui-même est préférable, puisque toute la logique est placée à un seul endroit plutôt que d'être
séparée entre gestionnaire et modificateur.

Puisque les gestionnaires d'évènements ne sont que des fonctions, vous pouvez créer vos propres
wrappers si nécessaire :

```svelte
<script>
	function once(fn) {
		return function (event) {
			if (fn) fn.call(this, event);
			fn = null;
		};
	}

	function preventDefault(fn) {
		return function (event) {
			event.preventDefault();
			fn.call(this, event);
		};
	}
</script>

<button onclick={once(preventDefault(handler))}>...</button>
```

Il y a trois modificateurs – `capture`, `passive` et `nonpassive` – qui ne peuvent pas être
exprimés comme des fonctions wrapper, puisqu'ils doivent être appliqués lorsque le gestionnaire
d'évènement est lié et non lorsqu'il est exécuté.

Pour `capture`, le modificateur s'ajoute au nom de l'évènement :

```svelte
<button onclickcapture={...}>...</button>
```

Changer l'option
[`passive`](https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener#am%C3%A9lioration_des_performances_de_d%C3%A9filement_avec_les_%C3%A9couteurs_passifs)
d'un gestionnaire d'évènement n'est en revanche pas quelque chose à prendre à la légère. Si vous
avez un cas d'usage – et ce n'est probablement pas le cas ! – il vous faudra utiliser une action
pour ajouter le gestionnaire d'évènement vous-même.

### Gestionnaires multiples [!VO]Multiple event handlers

Avec Svelte 4, ceci est possible :

```svelte
<button on:click={one} on:click={two}>...</button>
```

Les attributs/propriétés dupliquées – ce qui inclut donc maintenant les gestionnaires d'évènement –
ne sont pas permis. À la place, faites ceci :

```svelte
<button
	onclick={(e) => {
		one(e);
		two(e);
	}}
>
	...
</button>
```

Lorsque vous "étalez" des props, les gestionnaires d'évènement locaux doivent être appliqués _après_
le spread, ou ils risquent d'être écrasés :

```svelte
<button
	{...props}
	onclick={(e) => {
		doStuff(e);
		props.onclick?.(e);
	}}
>
	...
</button>
```

> [!DETAILS] Pourquoi ce changement
> `createEventDispatcher` a toujours été un peu pénible à utiliser :
>
> - importer la fonction
> - appeler la fonction pour obtenir une fonction de dispatch
> - exécuter la fonction de dispatch avec une chaîne de caractères et éventuellement une payload
> - récupérer la payload en question de l'autre côté via la propriété `.detail`, car l'évènement
>   lui-même était systématiquement un `CustomEvent`
>
> Il a toujours été possible d'utiliser des props de callback pour les composants, mais parce qu'il
> était nécessaire d'écouter les évènements du DOM avec `on:`, cela avait du sens d'utiliser
> `createEventDispatcher` pour les évènements de composant pour garder une consistance syntactique.
> Maintenant que nous avons les attributs d'évènement (`onclick`), c'est le contraire : les props de
> callback sont maintenant la méthode recommandée.
>
> La suppression des modificateurs d'évènement est indiscutablement un des changements ressemblant
> le plus à un retour en arrière pour celles et ceux qui ont apprécié la syntaxe raccourcie des
> modificateurs d'évènement. Étant donné qu'ils ne sont pas utilisés si souvent que ça, nous avons
> choisi de privilégier le côté explicite plutôt qu'une surface plus restreinte. Les modificateurs
> étaient également inconsistents, puisque la plupart d'entre eux n'étaient utilisables que sur des
> éléments DOM.
>
> L'utilisation de plusieurs gestionnaires pour le même évènement n'est également plus possible,
> mais cela était de toutes façon une méthode non-recommandée, car elle compliquait la lecture du
> code : s'il y avait beaucoup d'attributs, il devenait difficile de se rendre compte qu'il y avait
> deux gestionnaires à moins qu'ils ne soient positionnés juste à côté l'un de l'autre. De plus,
> cela laissait entendre que les deux gestionaires étaient indépendants, alors que quelque chose
> comme `event.stopImmediatePropagation()` dans `one` empêcherait `two` d'être exécuté.
>
> En dépréciant `createEventDispatcher` et la directive `on:` en faveur des props de callback et des
> propriétés normales d'éléments, cela nous permet de :
>
> - réduire la courbe d'apprentissage de Svelte
> - supprimer du boilerplate, particulièrement autour de `createEventDispatcher`
> - supprimer le surcoût de créer des objets `CustomEvent` pour des évènements qui n'ont peut-être
>   même pas de gestionnaire associé
> - ajouter la possibilité de spread les gestionnaires d'évènement
> - ajouter la possibilité de savoir quels gestionnaires sont fournis au composant
> - ajouter la possibilité d'exprimer si un gestionnaire donné est requis ou optionnel
> - augmenter la sécurité du typage (auparavant, il était dans les faits impossible pour Svelte de
>   garantir qu'un composant n'émettait pas un évènement particulier)

## Des snippets plutôt que des slots [!VO]Snippets instead of slots

Avec Svelte 4, du contenu peut être passé aux composants en utilisant des slots. Svelte 5 les
remplace par les snippets, qui sont plus puissants et plus flexibles. En conséquence, les slots sont
dépréciés par Svelte 5.

Ils continuent toutefois de fonctionner, et vous pouvez mélanger les snippets et les slots dans vos
composants.

Lorsque vous utilisez des éléments personnalisés, vous devez toujours utiliser `<slot />` comme
avant. Dans une version future, lorsque Svelte supprimera sa version interne des slots, les slots
des éléments personnalisés seront laissés tels quels, c-à-d générant une vraie balise DOM plutôt que
de la transformer.

### Contenu par défaut [!VO]Default content

Avec Svelte 4, la façon la plus simple de passer un morceau d'interface à un enfant était d'utiliser
un `<slot />`. Avec Svelte 5, vous pouvez faire cela en utilisant plutôt la prop `children`, qui
s'utilise avec `{@render children()}` :

```svelte
<script>
	+++let { children } = $props();+++
</script>

---<slot />---
+++{@render children?.()}+++
```

### Contenu générique multiple [!VO]Multiple content placeholders

Si vous souhaitiez plusieurs morceaux d'interface génériques, vous deviez utiliser les slots nommés.
Avec Svelte 5, vous pouvez plutôt utiliser des props, les nommer comme vous le souhaitez et les
afficher avec `{@render ...}` :

```svelte
<script>
	+++let { header, main, footer } = $props();+++
</script>

<header>
	---<slot name="header" />---
	+++{@render header()}+++
</header>

<main>
	---<slot name="main" />---
	+++{@render main()}+++
</main>

<footer>
	---<slot name="footer" />---
	+++{@render footer()}+++
</footer>
```

### Remonter des données [!VO]Passing data back up

Avec Svelte 4, vouss pouviez passer des données à un `<slot />` puis les récupérer avec `let:` dans
le composant parent. Avec Svelte 5, les snippets ont désormais cette responsabilité :

```svelte
<!--- file: App.svelte --->
<script>
	import List from './List.svelte';
</script>

<List items={['one', 'two', 'three']} ---let:item--->
	+++{#snippet item(text)}+++
		<span>{text}</span>
	+++{/snippet}+++
	---<span slot="empty">Pas encore d'éléments</span>---
	+++{#snippet empty()}
		<span>Pas encore d'éléments</span>
	{/snippet}+++
</List>
```

```svelte
<!--- file: List.svelte --->
<script>
	let { items, +++item, empty+++ } = $props();
</script>

{#if items.length}
	<ul>
		{#each items as entry}
			<li>
				---<slot item={entry} />---
				+++{@render item(entry)}+++
			</li>
		{/each}
	</ul>
{:else}
	---<slot name="empty" />---
	+++{@render empty?.()}+++
{/if}
```

> [!DETAILS] Pourquoi ce changement
> Les slots étaient simples à prendre en main, mais dans les cas d'usage avancés, la syntaxe
> devenait de plus en plus confuse et complexe :
>
> - la syntaxe `let:` n'était pas claire pour beaucoup de gens car elle _crée_ une variable alors
>   que toutes les autres directives `:` _reçoivent_ une variable
> - le scope d'une variable déclarée avec `let:` n'était pas clair. Dans l'example ci-dessus, il
>   semble que vous puissiez utiliser la prop de slot `item` dans le slot `empty`, mais ce n'est en
>   réalité pas possible
> - les slots nommés devaient être utilisés sur un élément utilisant l'attribut `slot`. Parfois vous
>   ne vouliez pas créer un élément, et il a donc fallu ajouter l'API `<svelte:fragment>`
> - les slots nommés pouvaient aussi être utilisés sur un composant, ce qui changeait la sémantique
>   de où les directives `let:` sont disponibles (même encore aujourd'hui les mainteneurs du projet
>   ne se souviennent pas toujours de comment ça fonctionne précisément)
>
> Les snippets résolvent tous ces problèmes en étant beaucoup clairs et lisibles. Ils sont de plus
> plus puissants puisqu'ils vous permettent de définir des sections d'interface que vous pouvez
> afficer _partout_, et pas seulement en les passant en props à un composant.

## Script de migration [!VO]Migration script

Vous devriez avoir maintenant une idée plus claire des changements apportés, notamment ce que change
la nouvelle syntaxe par rapport à l'ancienne. Vous avez probablement également compris que beaucoup
de ces migrations sont plutôt techniques et répétitives – des choses que vous n'avez pas envie de
faire à la main.

Nous sommes d'accord, c'est pourquoi nous fournissons un script de migration pour faire la plupart
de ces migrations automatiquement. Vous pouvez migrer votre projet en utilisant `npx sv migrate
svelte-5`. Ceci va faire les choses suivantes :

- mettre à jour les versions des dépendences principales dans votre `package.json`
- migrer votre code pour utiliser les runes (`let` -> `$state` etc.)
- migrer les éléments DOM pour qu'ils utilisent les attributs d'évènements (`on:click` -> `onclick`)
- migrer les créations de slots pour utiliser les balises de rendu (`<slot />` -> `{@render children()}`)
- migrer l'utilisation des slots pour utiliser des snippets (`<div slot="x">...</div>` -> `{#snippet
x()}<div>...</div>{/snippet}`)
- migrer les créations évidentes de composant (`new Component(...)` -> `mount(Component, ...)`)

Vous pouvez aussi migrer un seul composant à la fois dans VS Code via la commande `Migrate Component
to Svelte 5 Syntax`, ou dans notre bac à sable via le bouton `Migrer`.

Tout ne sera pas migré automatiquement, et certaines migrations auront besoin d'un nettoyage manuel
a posteriori. Les sections suivantes fournissent plus de détails sur ces situations.

### run

Vous remarquerez peut-être que le script de migration convertit certaines de vos déclarations `$:`
en une fonction `run` qui est importée depuis `svelte/legacy`. Ceci se produit si le script de
migration n'a pas pu déterminer avec certitude si une déclaration devrait être migrée en une rune
`$derived`, et en a déduit qu'il s'agissait d'un effet de bord. Dans certains cas il se peut que
cela soit faux, et il sera alors recommandé de le modifier manuellement pour utiliser plutôt un
`$derived`. Dans d'autres cas cela sera correct, mais puisque les déclarations `$:` sont également
exécutées sur le serveur alors que `$effect` non, c'est un changement risqué à faire tel quel. À la
place `run` est utilisé comme bouche-trou. `run` reproduit la plupart des caractéristiques de `$:`,
en ce qu'il n'est exécuté sur le serveur qu'une seule fois, et est exécuté comme `$effect.pre` sur
le client (`$effect.pre` est joué _avant_ que les changements ne soient appliqués au DOM ; dans la
plupart des cas vous voudrez utiliser plutôt `$effect`).

```svelte
<script>
	---import { run } from 'svelte/legacy';---
	---run(() => {---
	+++$effect(() => {+++
		// some side effect code
	})
</script>
```

### Modificateurs d'évènements [!VO]Event modifiers

Les modificateurs d'évènements ne sont pas applicables sur les attributs d'évènement (c-à-d que vous
ne pouvez pas écrire `onclick|preventDefault={...}`). En conséquence, lorsque vous migrez des
directives d'évènement vers des attributs d'évènement, une fonction est nécessaire pour remplacer
ces modificateurs. Ces fonctions sont importées depuis `svelte/legacy`, et devraient être remplacées
à terme par l'usage, par exemple, de `event.preventDefault()`.

```svelte
<script>
	---import { preventDefault } from 'svelte/legacy';---
</script>

<button
	onclick={---preventDefault---((event) => {
		+++event.preventDefault();+++
		// ...
	})}
>
	cliquez moi
</button>
```

### Choses non auto-migrées [!VO]Things that are not automigrated

Le script de migration ne convertit pas `createEventDispatcher`. Vous devrez les migrer
manuellement. La raison est qu'il est trop risqué de le faire automatiquement, cela pourrait
entraîner des incohérences problématiques pour les consommateurs du composant, ce que le script de
migration ne peut pas détecter.

Le script de migration ne convertit pas `beforeUpdate/afterUpdate`. Il ne le fait pas car il est
impossible de déterminer l'intention sous-jacente du code concerné. En règle générale, vous pouvez
les migrer en utilisant une combinaison de `$effect.pre` (est exécuté au même moment que l'était
`beforeUpdate`) et `tick` (importé depuis `svelte`, qui vous permet d'attendre que les changements
soient appliqués au DOM pour exécuter du code).

## Les composants ne sont plus des classes [!VO]Components are no longer classes

En Svelte 3 et 4, les composants sont des classes. En Svelte 5 ce sont des fonctions et doivent donc
être instanciés différemment. Si vous avez besoin d'instancier manuellement des composants, vous
devriez plutôt utiliser `mount` ou `hydrate` (importés depuis `svelte`). Si vous voyez cette erreur
en utilisant SvelteKit, essayez d'abord de mettre à jour SvelteKit, car sa version la plus récente
fournit le support de Svelte 5. Si vous utilisez Svelte sans SvelteKit, vous aurez certainement un
fichier `main.js` (ou similaire) que vous ajuster comme ceci :

```js
+++import { mount } from 'svelte';+++
import App from './App.svelte'

---const app = new App({ target: document.getElementById("app") });---
+++const app = mount(App, { target: document.getElementById("app") });+++

export default app;
```

`mount` et `hydrate` ont exactement la même API. La différence est que `hydrate` va récupérer le
HTML rendu sur le serveur par Svelte, le placer à l'endroit de sa cible, et l'hydrater. Les deux
renvoient un objet avec les exports du composant et potentiellement les accesseurs de propriété (si
compilé avec `accessors: true`). En revanche, elles n'ont pas de méthodes `$on`, `$set`, et
`$destroy` que vous connaissez peut-être de la précédente API utilisant les classes. Voici leurs
remplacements :

Pour remplacer `$on`, plutôt que d'écouter les évènements, passez les via la propriété `events` dans
l'argument d'options.

```js
+++import { mount } from 'svelte';+++
import App from './App.svelte'

---const app = new App({ target: document.getElementById("app") });
app.$on('event', callback);---
+++const app = mount(App, { target: document.getElementById("app"), events: { event: callback } });+++
```

> [!NOTE] Notez que l'utilisation de `events` n'est pas recommandée – utilisez plutôt des
> [callbacks](#Event-changes)

Pour remplacer `$set`, utilisez `$state` pour créer un object de propriétés réactives et les
manipuler. Si vous faites ceci dans un fichier `.js` ou `.ts`, pensez à ajuster le nom du fichier
pour y inclure `.svelte`, c-à-d `.svelte.js` ou `.svelte.ts`.

```js
+++import { mount } from 'svelte';+++
import App from './App.svelte'

---const app = new App({ target: document.getElementById("app"), props: { foo: 'bar' } });
app.$set({ foo: 'baz' });---
+++const props = $state({ foo: 'bar' });
const app = mount(App, { target: document.getElementById("app"), props });
props.foo = 'baz';+++
```

Pour remplacer `$destroy`, utilisez `unmount`.

```js
+++import { mount, unmount } from 'svelte';+++
import App from './App.svelte'

---const app = new App({ target: document.getElementById("app"), props: { foo: 'bar' } });
app.$destroy();---
+++const app = mount(App, { target: document.getElementById("app") });
unmount(app);+++
```

Comme solution bouche-trou, vous pouvez également utiliser `createClassComponent` ou
`asClassComponent` (importés depuis `svelte/legacy`) pour garder la même API post-instantiation que
Svelte 4.

```js
+++import { createClassComponent } from 'svelte/legacy';+++
import App from './App.svelte'

---const app = new App({ target: document.getElementById("app") });---
+++const app = createClassComponent({ component: App, target: document.getElementById("app") });+++

export default app;
```

Si le composant en question n'est pas sous votre contrôle, vous pouvez utiliser l'option de
compilateur `compatibility.componentApi` pour obternir une rétro-compatibilité automatique, ce qui
implique que le code utilisant `new Component(...)` continuera de fonctionner sans ajustements
(notez que ceci rajoute du code supplémentaire pour tous vos composants). Ceci va également ajouter
les méthodes `$set` et `$on` pour toutes les instances de composants que vous obtiendrez via
`bind:this`.

```js
/// svelte.config.js
export default {
	compilerOptions: {
		compatibility: {
			componentApi: 4
		}
	}
};
```

Notez que `mount` et `hydrate` ne sont _pas_ synchrones, ce que implique que des choses comme
`onMount` n'auront pas été appelées au moment où la fonction termine son exécution et que les blocs
de promesses n'auront pas encore été rendus (parce que `#await` attend la fin d'une micro-tâche pour
réagir à la potentielle résolution immédiate d'une promesse). Si vous avez besoin de ces garanties,
appelez `flushSync` (importé depuis `svelte`) après avoir appelé `mount` ou `hydrate`.

### Changements de l'API serveur [!VO]Server API changes

De même, les composants n'ont plus de méthode `render` lorsqu'ils sont compilés pour le rendu côté
serveur. Passez plutôt la fonction à `render` importé depuis `svelte/server` :

```js
+++import { render } from 'svelte/server';+++
import App from './App.svelte';

---const { html, head } = App.render({ props: { message: 'salut' }});---
+++const { html, head } = render(App, { props: { message: 'salut' }});+++
```

Avec Svelte 4, le rendu d'un composant en chaîne de caractères fournissait aussi le CSS pour tous
les composants. Avec Svelte 5 ce n'est plus le cas par défaut, car la plupart du temps vous utilisez
un outillage qui s'occupe de gérer cela d'une autre manière (SvelteKit par exemple). Si vous avez
besoin que `render` vous fournisse le CSS, vous pouvez mettre l'option de compilateur `injected` à
`'injected'`, les éléments `<style>` seront alors ajoutés au `head`.

### Changements sur le typage de composant [!VO]Component typing changes

Le passage des classes aux fonctions pour les composants est aussi reflété dans le typage :
`SvelteComponent`, la classe de base en Svelte 4, est dépréciée en faveur du nouveau type
`Component` qui définit la forme de la fonction d'un composant Svelte. Pour définir manuellement une
forme de composant dans un fichier `.d.ts`, vous pouvez écrire :

```ts
import type { Component } from 'svelte';
export declare const MyComponent: Component<{
	foo: string;
}>;
```

Pour déclarer qu'un composant d'un certain type est requis :

```svelte
<script lang="ts">
	import type { ---SvelteComponent--- +++Component+++ } from 'svelte';
	import {
		ComponentA,
		ComponentB
	} from 'component-library';

	---let component: typeof SvelteComponent<{ foo: string }>---
	+++let component: Component<{ foo: string }>+++ = $state(
		Math.random() ? ComponentA : ComponentB
	);
</script>

<svelte:component this={component} foo="bar" />
```

Les deux types utilitaires `ComponentEvents` et `ComponentType` sont aussi dépréciés.
`ComponentEvents` est obsolète car les évènements sont désormais définis en tant que props de
callback, et `ComponentType` est obsolète car le nouveau type `Component` est déjà le type du
composant (c-à-d `ComponentType<SvelteComponent<{ prop: string }>>` == `Component<{ prop: string
}>`).

### Changements liés à `bind:this`

Puisque les composants ne sont plus des classes, utiliser `bind:this` ne renvoie plus une instance
de classe possédant les méthodes `$set`, `$on` et `$destroy`. Cela renvoie uniquement les exports de
l'instance (`export function` / `export const`) et, si vous utilisez l'option `accessors`, une paire
de getter/setter pour chaque propriété.

## Gestion des espaces [!VO]Whitespace handling changed

Auparavant, Svelte utilisait un algorithme très complexe pour déterminer si les espace devaient être
gardés ou non. Svelte 5 simplifie ce processus, ce qui en rend la compréhension plus simple pour les
développeurs et développeuses. Les règles sont :

- Les espaces entre noeuds sont fusionnés en un seul
- Les espaces au début et à la fin d'une balise sont complètement supprimés
- Il y a quelques exceptions comme celle de garder les espaces au sein des balises `pre`

Comme avant, vous pouvez désactiver la réduction des espaces en utilisant l'option
`preserveWhitespace` dans les paramètres de compilation, ou composant par composant dans
`<svelte:option>`.

## Un navigateur moderne est requis [!VO]Modern browser required

Svelte 5 requiert un navigateur moderne (autrement dit, pas Internet Explorer) pour plusieurs
raisons :

- il se sert des
[`Proxies`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- les éléments avec des liaisons `clientWidth`/`clientHeight`/`offsetWidth`/`offsetHeight` utilisent
	[`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) plutôt qu'une
	bidouille tordue impliquant une `iframe`
- `<input type="range" bind:value={...} />` ne se sert que d'un gestionnaire d'évènement `input`,
plutôt qu'également écouter les évènements `change` comme fallback

L'option de compilateur `legacy`, qui générait beaucoup de code mais qui permettait de supporter
Internet Explorer, n'existe plus.

## Changements des options de compilateur [!VO]Changes to compiler options

- Les valeurs `false`/`true` (déjà dépréciées précédemment) et `"none"` ne sont plus des valeurs
valides pour l'option `css`
- L'option `legacy` a un rôle différent
- L'option `hydratable` a été supprimée. Les composants Svelte sont désormais toujours hydratables
- L'option `enableSourcemap` a été supprimée. Les sourcemaps sont désormais toujours générés, votre
	outillage peut choisir de les ignorer
- L'option `tag` a été supprimée. Utilisez plutôt `<svelte:options customElement="tag-name" />` au
dans votre fichier de composant
- Les options `loopGuardTimeout`, `format`, `sveltePath`, `errorMode` et `varsReport` ont été
supprimées

## La prop `children` est réservée [!VO]The `children` prop is reserved

Le contenu dans une balise de composant devient une prop de snippet appelée `children`. Vous ne
pouvez pas avoir une prop distincte qui porte ce nom.

## La notation "point" indique un composant [!VO]Dot notation indicates a component

Avec Svelte 4, `<foo.bar>` créait un élément avec un nom de balise `"foo.bar"`. Avec Svelte 5,
`foo.bar` est à la place traité comme un composant. Cette syntaxe est particulièrement utile dans
les blocs `#each` :

```svelte
{#each items as item}
	<item.component {...item.props} />
{/each}
```

## Breaking changes en mode runes [!VO]Breaking changes in runes mode

Certains breaking changes concernent uniquement les composants en mode runes.

### Les liaisons à des exports de composant sont interdites [!VO]Bindings to component exports are not allowed

Les exports provenant de composants en mode runes ne peuvent pas être impliquées directement dans
une liaison. Par exemple, écrire `export const foo = ...` dans le composant `A` puis écrire `<A
bind:foo />` provoque une erreur. Utilisez plutôt `bind:this` – `<A bind:this={a} />` – et accédez à
l'export via `a.foo`. Ce changement clarifie la séparation entre props et exports.

### Les liaisons doivent être explicitement définies avec `$bindable()` [!VO]Bindings need to be explicitly defined using `$bindable()`

Avec la syntaxe de Svelte 4, chaque propriété (déclarée via `export let`) peut accepter une liaison,
ce qui signifie que vous pouvez la lier avec `bind:`. En mode runes, les propriétés ne sont pas
liables par défait : vous devez les marquer comme props de liaison avec la rune `$bindable`.

Si une propriété de liaison a une valeur par défaut (par ex. `let { foo = $bindable('bar') } =
$props();`), vous devez lui passer une valeur non-`undefined` si vous décidez de lui créer une
liaison. Ceci empêche des comportements ambigus – le parent et l'enfant doivent avoir la même valeur
– et permet de meilleures performances (en Svelte 4, la valeur par défaut était reflétée sur le
parent, ce qui entraînait des cycles de rendu additionnels).

### L'option `accessors` est ignorée [!VO]`accessors` option is ignored

Définir l'option `accessors` à `true` rend les propriétés d'un composant directement accessibles sur
l'instance du composant. En mode runes, les propriétés ne sont jamais accessibles sur l'instance du
composant. Si vous avez besoin de les exposer, vous pouvez plutôt utiliser les exports de composant.

### L'option `immutable` est ignorée [!VO]`immutable` option is ignored

Définir l'option `immutable` n'a pas d'effet en mode runes. Ce concept est remplacé par la façon
dont `$state` et ses variations fonctionnent.

### Les classes ne sont plus "auto-réactives" [!VO]Classes are no longer "auto-reactive"

Avec Svelte 4, faire la chose suivante déclenche la réactivité :

```svelte
<script>
	let foo = new Foo();
</script>

<button on:click={() => (foo.value = 1)}>{foo.value}</button
>
```

Ceci s'explique par le fait que le compilateur de Svelte considère l'assignation à `foo.value` comme
une instruction pour mettre à jour tout ce qui référence `foo`. Avec Svelte 5, la réactivité est
déterminée au moment de l'exécution plutôt qu'à la compilation, ce qui implique que vous devriez
définir `value` comme un champ réactif `$state` sur la classe `Foo`. Entourer `new Foo()` avec
`$state(...)` n'aura aucun effet – seuls les objets simples et les tableaux sont profondément
réactifs.

### `<svelte:component>` n'est plus nécessaire [!VO]`<svelte:component>` is no longer necessary

En Svelte 4, les composants sont _statiques_ – si vous rendez `<Thing>`, que la valeur de `Thing`
change, [rien ne se produit](/playground/7f1fa24f0ab44c1089dcbb03568f8dfa?version=4.2.18). Pour le
rendre dynamique vous devez utiliser `<svelte:component>`.

Ce n'est plus le cas avec Svelte 5 :

```svelte
<script>
	import A from './A.svelte';
	import B from './B.svelte';

	let Thing = $state();
</script>

<select bind:value={Thing}>
	<option value={A}>A</option>
	<option value={B}>B</option>
</select>

<!-- ces deux écritures sont équivalentes -->
<Thing />
<svelte:component this={Thing} />
```

### Les évènements `touch` et `wheel` sont passifs [!VO]Touch and wheel events are passive

Lorsque vous utilisez les attributs d'évènements `onwheel`, `onmousewheel`, `ontouchstart` et
`ontouchmove`, les gestionnaires y sont attachés en mode
[passif](https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener#using_passive_listeners)
pour être en phase avec le comportement par défaut des navigateurs. Ceci améliore significativement
la responsivité en permettant au navigateur de faire défiler le document immédiatement, plutôt que
d'attendre de voir si le gestionnaire d'évènement appelle `event.preventDefault()`.

Dans les très rares cas où vous auriez besoin de ne pas avoir ce comportement par défaut, vous
pouvez alors utiliser [`on`](/docs/svelte/svelte-events#on) (par exemple au sein d'une action).

### La syntaxe des attributs/props est plus stricte [!VO]Attribute/prop syntax is stricter

Avec Svelte 4, les valeurs complexes d'attribut n'ont pas besoin d'être en guillemets :

<!-- prettier-ignore -->
```svelte
<Component prop=ceci{est}valide />
```

Cette écriture est une mauvaise idée. En mode runes, si vous souhaitez concaténer des choses, vous
devez entourer la valeur de guillemets :

```svelte
<Component prop="ceci{est}valide" />
```

Notez que Svelte 5 vous préviendra également si vous avez une expression simple entre guillements,
comme `reponse="{42}"` – en Svelte 6, ceci entraînera la conversion de la valeur en chaîne de
caractères, plutôt que de la passer en tant que nombre.

### La structure HTML est plus stricte [!VO]HTML structure is stricter

Avec Svelte 4, vous étiez autorisé•e à écrire du code HTML rendu côté serveur qui serait ensuite
réparé par le navigateur. Vous pouviez par exemple écrire ceci...

```svelte
<table>
	<tr>
		<td>salut</td>
	</tr>
</table>
```

... et le navigateur insérait automatiquement un élément `<tbody>` :

```svelte
<table>
	<tbody>
		<tr>
			<td>salut</td>
		</tr>
	</tbody>
</table>
```

Svelte 5 est plus strict au niveau de la structure HTML et lèvera une erreur de compilation dans les
cas où le navigateur aurait besoin de réparer le DOM.

## Autres breaking changes [!VO]Other breaking changes

### Validation de l'assignation à `@const` plus stricte [!VO]Stricter `@const` assignment validation

Les assignations à des parties déstructurées d'une déclaration `@const` ne sont plus permises. Cela
n'aurait jamais dû être possible.

### `:is(...)` et `:where(...)` sont scopés [!VO]:is(...) and :where(...) are scoped

Auparavant, Svelte n'analysait pas les sélecteurs au sein de `:is(...)` et de `:where(...)`, les
traitant de facto comme globaux. Svelte 5 les analyse dans le contexte du composant courant. Ainsi,
certains sélecteurs peuvent désormais être traités comme non utilisés s'ils ne se basaient que sur
ces traitements. Pour corriger cela, utilisez `:global(...)` dans les sélecteurs
`:is(...)`/`:where(...)`.

Si vous utilisez la directive Tailwind `@apply`, ajoutez un sélecteur `:global` pour conserver les
règles qui utilisent les sélecteurs `:is(...)` générés par Tailwind :

<!-- prettier-ignore -->
```css
main +++:global+++ {
	@apply bg-blue-100 dark:bg-blue-900;
}
```

### La position du hash CSS n'est plus déterministe [!VO]CSS hash position no longer deterministic

Auparavant, Svelte insérait systématiquement le hash CSS en dernière position. Ce n'est plus garanti
avec Svelte 5. Ce changement est problématique si vous [avez des sélecteurs CSS
bizarres](https://stackoverflow.com/questions/15670631/does-the-order-of-classes-listed-on-an-item-affect-the-css).

### Le CSS scopé utilisé :where(...) [!VO]Scoped CSS uses :where(...)

Pour éviter les problèmes causés par des changements de spécificité imprévisibles, les sélecteurs
CSS scopés utilisent désormais des modificateurs de sélecteurs de type `:where(.svelte-xyz123)` en
combinaison avec `.svelte-xyz123`, (où `xyz123` est, comme avant, un hash du contenu de `<style>`).
Vous pouvez en apprendre plus ce sujet [ici](https://github.com/sveltejs/svelte/pull/10443).

Dans le cas où vous avez besoin de supporter d'anciens navigateurs qui n'implémentent pas `:where`,
vous pouvez modifier manuellement le CSS généré, en contrepartie de changements de spécificité
imprévisibles :

```js
// @errors: 2552
css = css.replace(/:where\((.+?)\)/, '$1');
```

### Les codes d'erreur et d'avertissement ont été renommés [!VO]Error/warning codes have been renamed

Les codes d'erreur et d'avertissement ont été renommés. Ils utilisaient précédemment des tirets pour
séparer les mots, ils utilisent désormais des tirets bas (par ex. `foo-bar` devient `foo_bar`). De
plus, un petit nombre de codes ont été légèrement reformulés.

### Le nombre de namespaces a été réduit [!VO]Reduced number of namespaces

Le nombre de namespaces valides que vous pouvez passer à l'option de compilateur `namespace` a été
réduit à `html` (par défaut), `mathml` et `svg`.

Le namespace `foreign` était uniquement utile pour Svelte Native, que nous prévoyons de supporter de
manière différente dans une mise à jour mineure 5.x future.

### Changements concernant `beforeUpdate`/`afterUpdate` [!VO]beforeUpdate/afterUpdate changes

`beforeUpdate` n'est plus exécuté deux fois au rendu initial si son callback modifie une variable
référencée dans le template.

Les callbacks `afteUpdate` d'un composant parent sont désormais exécutés après les callbacks
`afterUpdate` des composants enfants.

`beforeUpdate/afterUpdate` ne sont plus exécutées lorsque le composant contient un `<slot>` et que
son contenu est mis à jour.

Les deux fonctions ne sont plus autorisées en mode runes – utilisez `$effect.pre(...)` et
`$effect(...)` à la place.

### Changement du comportement de `contenteditable` [!VO]`contenteditable` behavior change

Si vous avez un noeud `contenteditable` avec une liaison attachée _et_ une valeur réactive utilisé
dans son contenu (exemple : `<div contenteditable=true bind:textContent>count vaut {count}</div>`),
alors la valeur au sein de `contenteditable` ne sera pas mise à jour par les mises à jour de `count`
car la liaison prend immédiatement le contrôle total du contenu, qui sera donc uniquement mis à jour
à travers cette liaison.

### Les attributs `oneventname` n'acceptent plus de valeurs de type string [!VO]`oneventname` attributes no longer accept string values

En Svelte 4, il était possible de préciser des attributs d'évènement sous forme de chaînes de
caractères sur des éléments HTML :

```svelte
<button onclick="alert('salut')">...</button>
```

Ceci n'est pas recommandé, et n'est plus possible en Svelte 5, où les propriétés comme `onclick`
remplacent `on:click` comme mécanisme pour l'ajout de gestionnaires d'évènement.

### `null` et `undefined` deviennent la chaîne de caractères vide [!VO]`null` and `undefined` become the empty string

En Svelte 4, `null` et `undefined` était affichés comme leur chaîne de caractères correspondante.
Dans 99 cas sur 100 vous souhaitez plutôt qu'ils soient remplacés par la chaîne de caractères vide,
ce qui est également ce que la plupart des autres frameworks existants font. En conséquence, en
Svelte 5, `null` et `undefined` deviennent la chaîne de caractères vide.

### Les valeurs de `bind:files` peuvent uniquement être `null`, `undefined` ou `FileList` [!VO]`bind:files` values can only be `null`, `undefined` or `FileList`

La liaison `bind:files` est désormais à double sens. Dès lors, lorsque vous définissez une valeur,
celle-ci doit être soit falsy (`null` ou `undefined`) soit de type `FileList`.

### Les liaisons réagissent désormais aux réinitialisations de formulaires [!VO]Bindings now react to form resets

Auparavant, les liaisons ne prennaient pas en compte les évènement `reset` des formulaires, ce qui
impliquait que leurs valeurs pouvaient se désynchroniser du DOM. Svelte 5 corrige cela en plaçant un
gestionnaire `reset` sur le document et en invoquant les liaisons lorsque nécéssaire.

### `walk` n'est plus exportée [!VO]`walk` no longer exported

Le module `svelte/compiler` ré-exportait `walk` depuis `estree-walker` par commodité. Ce n'est plus
le cas avec Svelte 5 ; importez le directement depuis ce `estree-walker` si vous en avez besoin.

### Le contenu dans `svelte:options` est interdit [!VO]Content inside `svelte:options` is forbidden

Avec Svelte 4 vous pouviez avoir du contenu dans une balise `<svelte:options />`. Ce contenu était
ignoré, mais vous pouviez y écrire quelque chose. Avec Svelte 5, le contenu dans cette balise
provoque une erreur de compilation.

### Les éléments `<slot>` dans des shadowroot sont préservés [!VO]`<slot>` elements in declarative shadow roots are preserved

Svelte 4 remplaçait toutes les balises `<slot />` avec sa propre version des slots. Svelte 5 les
conserve dans le cas où ils sont enfants d'un élément `<template shadowrootmode="...">`.

### La balise `<svelte:element>` doit être une expression [!VO]`<svelte:element>` tag must be an expression

En Svelte 4, `<svelte:element this="div">` est du code valide. Ceci n'a que peu de sens – vous
devriez simplement écrire `<div>`. Dans le cas extrêmement rare où vous _avez besoin_ d'utiliser une
valeur litérale pour une raison précise, vous pouvez faire ceci :

```svelte
<svelte:element this=+++{+++"div"+++}+++>
```

Notez que là où Svelte 4 traitait `<svelte:element this="input">` (par exemple) de la même manière
que `<input>` pour déterminer quelles directives `bind:` pouvaient être appliquées, ce n'est pas le
cas de Svelte 5.

### `mount` joue les transitions par défaut [!VO]`mount` plays transitions by default

La fonction `mount` utilisée pour rendre un arbre de composant joue par défaut les transitions à
moins que l'option `intro` ait pour valeur `false`. Ceci diffère des anciens composants (qui étaient
des classes) qui, lorsqu'instanciés manuellement, ne jouaient pas les transitions par défaut.

### Les incohérences d'hydratation de `<img src={...}>` and `{@html ...}` ne sont pas réparées [!VO]`<img src={...}>` and `{@html ...}` hydration mismatches are not repaired

En Svelte 4, si la valeur d'un attribut `src` ou d'une balise `{@html ...}` différait entre le
server et le client (situation connue sous le nom d'"incohérence d'hydratation"), l'incohérence est
corrigée. Ceci a un coût élevé : définir un attribut `src` (même si sa valeur ne change pas)
déclenche le chargement des images et des iframes, et réinsérer un gros morceau d'HTML est un
procédé lent.

Puisque ces incohérences sont extrêmement rares, Svelte 5 suppose que les valeurs n'ont pas changé,
mais en mode développement, Svelte 5 vous préviendra qu'elles sont différentes. Pour forcer la mise
à jour, vous pouvez faire quelque chose comme ça :

```svelte
<script>
	let { markup, src } = $props();

	if (typeof window !== 'undefined') {
		// gardez les valeurs...
		const initial = { markup, src };

		// mettez-les à undefined...
		markup = src = undefined;

		$effect(() => {
			// ... et réinitialisez-les après le montage du composant
			markup = initial.markup;
			src = initial.src;
		});
	}
</script>

{@html markup}
<img {src} />
```

### L'hydratation fonctionne différemment [!VO]Hydration works differently

Svelte 5 utilise des commentaires lors du rendu côté serveur, commentaires qui sont utilisés pour
une hydratation plus robuste et plus efficace sur le client. Dès lors, vous ne devriez pas supprimer
ces commentaires du HTML généré si vous avez l'intention de l'hydrater ; de plus, si vous avez
manuellement écrit du HTML qui doit être hydraté par un composant Svelte, vous devez ajuster ce HTML
pour inclure ces commentaires aux endroits adéquats.

### Les attributs `onevent` sont délégués [!VO]`onevent` attributes are delegated

Les attributs d'évènement remplacent les directives : plutôt que d'écrire `on:click={gestionnaire}`,
vous écrivez désormais `onclick={gestionnaire}`. Pour des raisons de rétro-compatibilité, la syntaxe
`on:event` est toujours supportée et se comporte comme en Svelte 4. Certains des attributs `onevent`
sont cependant délégués, car ils se peut qu'ils n'atteignent jamais le gestionnaire de ce type
d'évènement à la racine.

### `--style-props` utilise un élément différent [!VO]`--style-props` uses a different element

Svelte 5 utilise un élément `<svelte-css-wrapper>` supplémentaire plutôt qu'une `<div>` pour
entourer le composant lorsque vous utilisez des propriétés CSS personnalisées.

<!-- TODO in final docs, add link to corresponding section for more details -->
