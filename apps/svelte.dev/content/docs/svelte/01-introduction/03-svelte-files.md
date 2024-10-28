---
title: Fichiers .svelte
---

Les composants sont les briques de base des application Svelte. Ils sont écrits dans des fichiers
`.svelte`, en utilisant une version augmentée de HTML.

Les trois sections – script, styles, et markup – sont optionnelles.

<!-- prettier-ignore -->
```svelte
/// file: MyComponent.svelte
<script module>
	// la logique de module s'écrit ici
	// (ceci n'est pas souvent utile)
</script>

<script>
	// la logique d'instance s'écrit ici
</script>

<!-- le markup (avec ou sans éléments) s'écrit ici -->

<style>
	/* les styles s'écrivent ici */
</style>
```

## `<script>`

Un bloc `<script>` contient du JavaScript (ou du TypeScript, lorsque vous utilisez l'attribut
`lang="ts"`) qui est exécuté lorsqu'une instance est créée. Les variables déclarées (ou importées)
au niveau racine peuvent être référencées dans le markup du composant.

En plus du code JavaScript normal, vous pouvez utiliser des _runes_ pour déclarer des [props de
composant]($props) et ajouter de la réactivité à votre composant. Les runes sont décrites dans la
prochaine section.

<!-- TODO describe behaviour of `export` -->

## `<script module>`

Une balise `<script>` possédant un attribut `module` n'est exécutée qu'une seule fois – la première
fois que le module est évalué – plutôt que pour chaque instance de composant. Les variables
déclarées dans ce bloc peuvent être référencées ailleurs dans le composant, mais pas l'inverse.

```svelte
<script module>
	let total = 0;
</script>

<script>
	total += 1;
	console.log(`instancié ${total} fois`);
</script>
```

Vous pouvez `export`er des liaisons depuis ce bloc, elles deviendront des exports du module copmilé.
Vous ne pouvez pas utiliser `export default`, puisque l'export par défaut est le composant lui-même.

> [!NOTE] Si vous utilisez TypeScript et importez dans un fichier `ts` de tels exports depuis un
> bloc `module`, assurez-vous que votre éditeur soit configuré correctement pour permettre à
> TypeScript d'avoir conscience de ces exports. C'est le cas avec notre extension VSCode et avec le
> plugin IntelliJ, mais dans d'autres cas vous aurez peut-être besoin de configurer notre [plugin
> d'éditeur dédié à TypeScript](https://www.npmjs.com/package/typescript-svelte-plugin).

> [!LEGACY]
> Avec Svelte 4, cette balise script se définit en utilisant `<script context="module">`.

## `<style>`

Le CSS à l'intérieur d'un bloc `<style>` sera scopé à ce composant.

```svelte
<style>
	p {
		/* ceci va uniquement affecter les éléments <p> définis dans ce composant */
		color: burlywood;
	}
</style>
```

Pour plus d'explications, rendez-vous dans la section concernant le [style](scoped-styles).
