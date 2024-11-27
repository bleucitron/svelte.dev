---
title: svelte/compiler
---



```js
// @noErrors
import {
	VERSION,
	compile,
	compileModule,
	migrate,
	parse,
	preprocess,
	walk
} from 'svelte/compiler';
```

## VERSION

La version actuelle, telle que définie dans `package.json`.

/docs/svelte-compiler#svelte-version

<div class="ts-block">

```dts
const VERSION: string;
```

</div>



## compile

`compile` convertit vos fichiers `.svelte` source en des modules JavaScript qui exportent un
composant.

<div class="ts-block">

```dts
function compile(
	source: string,
	options: CompileOptions
): CompileResult;
```

</div>



## compileModule

`compileModule` prend votre code JavaScript contentant des runes, et le transforme en modules
JavaScript.

<div class="ts-block">

```dts
function compileModule(
	source: string,
	options: ModuleCompileOptions
): CompileResult;
```

</div>



## migrate

Fait de son mieux pour migrer du code Svelte vers la syntaxe utilisant les runes, des attributs
d'évènement et des balises `@render`. Peut lever des erreurs si le code est trop complexe pour
effectuer la migration de manière automatique.

<div class="ts-block">

```dts
function migrate(
	source: string,
	{
		filename,
		use_ts
	}?:
		| {
				filename?: string;
				use_ts?: boolean;
		  }
		| undefined
): {
	code: string;
};
```

</div>



## parse

La fonction `parse` parse un composant, ne renvoyant que son Arbre Syntaxique Abstrait (AST).

L'option `modern` (`false` par défaut en Svelte 5) oblige le parser à renvoyer un AST moderne plutôt
qu'un AST legacy. `modern` aura pour valeur par défaut `true` en Svelte 6, et l'option sera
supprimée en Svelte 7.

<div class="ts-block">

```dts
function parse(
	source: string,
	options: {
		filename?: string;
		modern: true;
	}
): AST.Root;
```

</div>

<div class="ts-block">

```dts
function parse(
	source: string,
	options?:
		| {
				filename?: string;
				modern?: false;
		  }
		| undefined
): Record<string, any>;
```

</div>



## preprocess

La fonction `preprocess` fournit des hooks pratiques pour transformer du code source de composant
selon vos besoins. Par exemple, elle peut être utilisée pour convertir un bloc `<style lang="sass">`
en du CSS classique.

<div class="ts-block">

```dts
function preprocess(
	source: string,
	preprocessor: PreprocessorGroup | PreprocessorGroup[],
	options?:
		| {
				filename?: string;
		  }
		| undefined
): Promise<Processed>;
```

</div>



## walk

<blockquote class="tag deprecated note">

Remplacez ceci par `import { walk } from 'estree-walker'`

</blockquote>

<div class="ts-block">

```dts
function walk(): never;
```

</div>



## AST

<div class="ts-block">

```dts
namespace AST {
	export interface BaseNode {
		type: string;
		start: number;
		end: number;
	}

	export interface Fragment {
		type: 'Fragment';
		nodes: Array<
			Text | Tag | ElementLike | Block | Comment
		>;
	}

	export interface Root extends BaseNode {
		type: 'Root';
		/**
		 * Les options inline fournies par `<svelte:options>` - celles-ci écrasent celles passées à `compile(...)`
		 */
		options: SvelteOptions | null;
		fragment: Fragment;
		/** L'élément `<style>` parsé, s'il existe */
		css: Css.StyleSheet | null;
		/** L'élément `<script>` parsé, s'il existe */
		instance: Script | null;
		/** L'élément `<script module>` parsé, s'il existe */
		module: Script | null;
	}

	export interface SvelteOptions {
		// des infos start/end (nécéssaires pour les warnings et pour notre plugin Prettier)
		start: number;
		end: number;
		// options
		runes?: boolean;
		immutable?: boolean;
		accessors?: boolean;
		preserveWhitespace?: boolean;
		namespace?: Namespace;
		css?: 'injected';
		customElement?: {
			tag?: string;
			shadow?: 'open' | 'none';
			props?: Record<
				string,
				{
					attribute?: string;
					reflect?: boolean;
					type?:
						| 'Array'
						| 'Boolean'
						| 'Number'
						| 'Object'
						| 'String';
				}
			>;
			/**
			 * Est de type
			 * ```ts
			 * (ceClass: new () => HTMLElement) => new () => HTMLElement
			 * ```
			 */
			extend?: ArrowFunctionExpression | Identifier;
		};
		attributes: Attribute[];
	}

	/** Texte statique */
	export interface Text extends BaseNode {
		type: 'Text';
		/** Du texte avec les entités HTML décodées */
		data: string;
	  /** Le texte original, avec les entités HTML non décodées */
		raw: string;
	}

	/** Une expression de template (possiblement réactive) - `{...}` */
	export interface ExpressionTag extends BaseNode {
		type: 'ExpressionTag';
		expression: Expression;
	}

	/** Une expression de template HTML (possiblement réactive) - `{@html...}` */
	export interface HtmlTag extends BaseNode {
		type: 'HtmlTag';
		expression: Expression;
	}

	/** Un commentaire HTML */
	// TODO rename to disambiguate
	export interface Comment extends BaseNode {
		type: 'Comment';
	  /** le contenu du commentaire */
		data: string;
	}

	/** Une balise `{@const ...}` */
	export interface ConstTag extends BaseNode {
		type: 'ConstTag';
		declaration: VariableDeclaration & {
			declarations: [
				VariableDeclarator & {
					id: Pattern;
					init: Expression;
				}
			];
		};
	}

	/** Une balise `{@debug ...}` */
	export interface DebugTag extends BaseNode {
		type: 'DebugTag';
		identifiers: Identifier[];
	}

	/** Une balise `{@render foo(...)} */
	export interface RenderTag extends BaseNode {
		type: 'RenderTag';
		expression:
			| SimpleCallExpression
			| (ChainExpression & {
					expression: SimpleCallExpression;
			  });
	}

	/** Une directive `animate:` */
	export interface AnimateDirective extends BaseNode {
		type: 'AnimateDirective';
		/** Le 'x' de `animate:x` */
		name: string;
		/** Le 'y' de `animate:x={y}` */
		expression: null | Expression;
	}

	/** Une directive `bind:` */
	export interface BindDirective extends BaseNode {
		type: 'BindDirective';
		/** Le 'x' de `bind:x` */
		name: string;
		/** Le 'y' in `bind:x={y}` */
		expression:
			| Identifier
			| MemberExpression
			| SequenceExpression;
	}

	/** Une directive `class:` */
	export interface ClassDirective extends BaseNode {
		type: 'ClassDirective';
		/** Le 'x' de `class:x` */
		name: 'class';
		/** Le 'y' de `class:x={y}`, ou le `x` de `class:x` */
		expression: Expression;
	}

	/** Une directive `let:` */
	export interface LetDirective extends BaseNode {
		type: 'LetDirective';
		/** Le 'x' de `let:x` */
		name: string;
		/** Le 'y' de `let:x={y}` */
		expression:
			| null
			| Identifier
			| ArrayExpression
			| ObjectExpression;
	}

	/** Une directive `on:` */
	export interface OnDirective extends BaseNode {
		type: 'OnDirective';
		/** Le 'x' de `on:x` */
		name: string;
		/** Le 'y' de `on:x={y}` */
		expression: null | Expression;
		modifiers: string[];
	}

	/** Une directive `style:` */
	export interface StyleDirective extends BaseNode {
		type: 'StyleDirective';
		/** Le 'x' de `style:x` */
		name: string;
		/** Le 'y' de `style:x={y}` */
		value:
			| true
			| ExpressionTag
			| Array<ExpressionTag | Text>;
		modifiers: Array<'important'>;
	}

	// TODO have separate in/out/transition directives
	/** Une directive `transition:`, `in:` ou `out:` */
	export interface TransitionDirective extends BaseNode {
		type: 'TransitionDirective';
		/** Le 'x' de `transition:x` */
		name: string;
		/** Le 'y' de `transition:x={y}` */
		expression: null | Expression;
		modifiers: Array<'local' | 'global'>;
		/** `true` si ceci est une directive `transition:` ou `in:` */
		intro: boolean;
		/** `true` si ceci est une directive `transition:` ou `out:` */
		outro: boolean;
	}

	/** Une directive `use:` */
	export interface UseDirective extends BaseNode {
		type: 'UseDirective';
		/** Le 'x' de `use:x` */
		name: string;
		/** Le 'y' de `use:x={y}` */
		expression: null | Expression;
	}

	interface BaseElement extends BaseNode {
		name: string;
		attributes: Array<
			Attribute | SpreadAttribute | Directive
		>;
		fragment: Fragment;
	}

	export interface Component extends BaseElement {
		type: 'Component';
	}

	export interface TitleElement extends BaseElement {
		type: 'TitleElement';
		name: 'title';
	}

	export interface SlotElement extends BaseElement {
		type: 'SlotElement';
		name: 'slot';
	}

	export interface RegularElement extends BaseElement {
		type: 'RegularElement';
	}

	export interface SvelteBody extends BaseElement {
		type: 'SvelteBody';
		name: 'svelte:body';
	}

	export interface SvelteComponent extends BaseElement {
		type: 'SvelteComponent';
		name: 'svelte:component';
		expression: Expression;
	}

	export interface SvelteDocument extends BaseElement {
		type: 'SvelteDocument';
		name: 'svelte:document';
	}

	export interface SvelteElement extends BaseElement {
		type: 'SvelteElement';
		name: 'svelte:element';
		tag: Expression;
	}

	export interface SvelteFragment extends BaseElement {
		type: 'SvelteFragment';
		name: 'svelte:fragment';
	}

	export interface SvelteBoundary extends BaseElement {
		type: 'SvelteBoundary';
		name: 'svelte:boundary';
	}

	export interface SvelteHead extends BaseElement {
		type: 'SvelteHead';
		name: 'svelte:head';
	}

	/** Ceci n'est qu'une représentation intermédiaire lors du parsing, elle n'existe pas dans l'AST final */
	export interface SvelteOptionsRaw extends BaseElement {
		type: 'SvelteOptions';
		name: 'svelte:options';
	}

	export interface SvelteSelf extends BaseElement {
		type: 'SvelteSelf';
		name: 'svelte:self';
	}

	export interface SvelteWindow extends BaseElement {
		type: 'SvelteWindow';
		name: 'svelte:window';
	}

	/** Un bloc `{#each ...}` */
	export interface EachBlock extends BaseNode {
		type: 'EachBlock';
		expression: Expression;
		/** The `entry` in `{#each item as entry}`. `null` if `as` part is omitted */
		context: Pattern | null;
		body: Fragment;
		fallback?: Fragment;
		index?: string;
		key?: Expression;
	}

	/** Un `{#if ...}` */
	export interface IfBlock extends BaseNode {
		type: 'IfBlock';
		elseif: boolean;
		test: Expression;
		consequent: Fragment;
		alternate: Fragment | null;
	}

	/** Un bloc `{#await ...}` */
	export interface AwaitBlock extends BaseNode {
		type: 'AwaitBlock';
		expression: Expression;
		// TODO can/should we move these inside the ThenBlock and CatchBlock?
	  /** La valeur résolue dans le bloc `then` */
		value: Pattern | null;
		/** La raison du rejet dans le bloc `catch` */
		error: Pattern | null;
		pending: Fragment | null;
		then: Fragment | null;
		catch: Fragment | null;
	}

	export interface KeyBlock extends BaseNode {
		type: 'KeyBlock';
		expression: Expression;
		fragment: Fragment;
	}

	export interface SnippetBlock extends BaseNode {
		type: 'SnippetBlock';
		expression: Identifier;
		parameters: Pattern[];
		body: Fragment;
	}

	export interface Attribute extends BaseNode {
		type: 'Attribute';
		name: string;
		/**
	   * Les valeurs entre guillemets sont représentées par un tableau, même si elles ne contiennent pas d'expression comme `"{x}"`
		 */
		value:
			| true
			| ExpressionTag
			| Array<Text | ExpressionTag>;
	}

	export interface SpreadAttribute extends BaseNode {
		type: 'SpreadAttribute';
		expression: Expression;
	}

	export interface Script extends BaseNode {
		type: 'Script';
		context: 'default' | 'module';
		content: Program;
		attributes: Attribute[];
	}
}
```

</div>

## CompileError

<div class="ts-block">

```dts
interface CompileError extends ICompileDiagnostic {}
```

</div>

## CompileOptions

<div class="ts-block">

```dts
interface CompileOptions extends ModuleCompileOptions {/*…*/}
```

<div class="ts-block-property">

```dts
name?: string;
```

<div class="ts-block-property-details">

Définit le nom de la classe JavaScript compilée (même si le compilateur la renommera si elle devait
être en conflit avec d'autres variables dans le scope).
Si non spécifié, sera inférée depuis `filename`.

</div>
</div>

<div class="ts-block-property">

```dts
customElement?: boolean;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">par défaut</span> `false`

</div>

Si `true`, dit au compilateur de générer un constructeur d'élément personnalisé plutôt qu'un
composant Svelte classique.

</div>
</div>

<div class="ts-block-property">

```dts
accessors?: boolean;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">par défaut</span> `false`
- <span class="tag deprecated">déprécié</span> Ceci n'aura aucun effet en modes runes

</div>

Si `true`, des getters et setters seront créés pour les props du composant. Si `false`, ils ne
seront créés que pour des valeurs exportées (par ex. celles déclarées avec `const`, `class`, et
`function`).
Si compilée avec `customElement: true`, cette option vaut par défaut `true`.

</div>
</div>

<div class="ts-block-property">

```dts
namespace?: Namespace;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">par défaut</span> `'html'`

</div>

Le namespace de l'élément ; par ex. `"html"`, `"svt"`, `"mathml"`.

</div>
</div>

<div class="ts-block-property">

```dts
immutable?: boolean;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">par défaut</span> `false`
- <span class="tag deprecated">déprécié</span> Ceci n'aura aucun effet en mode runes

</div>

Si `true`, dit au compilateur que vous promettez de ne jamais muter d'objet.
Ceci lui permet d'être moins conservatif lors des vérifications de changements de valeur.

</div>
</div>

<div class="ts-block-property">

```dts
css?: 'injected' | 'external';
```

<div class="ts-block-property-details">

- `'injected'` : les styles seront inclus dans le `head` lors de `render(...)`, et injectés dans le
document (si non déjà présents) lorsque le composant sera monté. Pour les composants compilés en
tant qu'éléments personnalisés, les styles sont injectés dans le shadow root.
- `'external'` : le CSS ne sera renvoyé que dans le champ `css` du résultat de compilation. La
plupart des plugins Svelte de bundler mettent cette option à `'external` et utilisent le CSS qui est
généré statiquement pour obtenir de meilleures performances, puisque cela conduit à des bundles
JavaScript plus petits, et que l'output peut être servi en tant que fichiers `.css` pouvant être mis
en cache.
Cette option vaut toujours `'injected'` lorsque vous compilez avec l'option `customElement`.

</div>
</div>

<div class="ts-block-property">

```dts
cssHash?: CssHashGetter;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">par défaut</span> `undefined`

</div>

Une fonction qui prend un argument de forme `{ hash, css, name, filename }` et renvoie la chaîne de
caractères utilisée comme nom de classe pour le CSS scopé.
Par défaut elle renvoie `svelte-${hash(css)}`.

</div>
</div>

<div class="ts-block-property">

```dts
preserveComments?: boolean;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">par défaut</span> `false`

</div>

Si `true`, vos commentaires HTML seront préservés dans l'output. Par défaut ils sont supprimés.

</div>
</div>

<div class="ts-block-property">

```dts
preserveWhitespace?: boolean;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">par défaut</span> `false`

</div>

Si `true`, les espaces dans et entre les éléments sont gardés tels que vous les avez écrits, plutôt
supprimés ou fusionnés en un seul espace lorsque c'est possible.

</div>
</div>

<div class="ts-block-property">

```dts
runes?: boolean | undefined;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">par défaut</span> `undefined`

</div>

Définir à `true` pour forcer le compilateur en mode runes, même s'il n'y a pas d'indications de
l'usage de runes.
Définir à `false` pour forcer le compilateur à ignorer le mode runes, même s'il y
a des indications de l'usage de runes.
Définir à `undefined` (valeur par défaut) pour inférer le mode runes à partir du code du composant.
Vaut toujours `true` pour les modules JS/TS compilés avec Svelte.
Vaudra `true` par défaut en Svelte 6.
Notez que définir cette valeur à `true` dans votre `svelte.config.js` va forcer le mode runes pour
tout votre projet, en incluant les composants dans `node_modules`, ce qui n'est probablement pas ce
que vous souhaitez. Si vous utilisez Vite, envisagez plutôt l'utilisation de
[`dynamicCompileOptions`](https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md#dynamiccompileoptions)

</div>
</div>

<div class="ts-block-property">

```dts
discloseVersion?: boolean;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `true`

</div>

Si `true`, expose la version majeure de Svelte dans le navigateur en l'ajoutant à un `Set` stocké
dans l'objet global `window.__svelte.v`.

</div>
</div>

<div class="ts-block-property">

```dts
compatibility?: {/*…*/}
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">déprécié</span> Utilisez ceci uniquement comme une solution
temporaire avant de migrer votre code

</div>

<div class="ts-block-property-children"><div class="ts-block-property">

```dts
componentApi?: 4 | 5;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">par défaut</span> `5`

</div>

Applique une transformation de sorte que les exports par défaut des fichiers Svelte puisse toujours
être instanciés de la même façon qu'ils l'étaient en Svelte 4 – une classe lorsque vous compilez
pour le navigateur (comme si vous utilisiez `createClassComponent(MyComponent, {...})` depuis
`svelte/legacy`) ou un objet avec une méthode `.render(...)` lorsque vous compilez pour le serveur.

</div>
</div></div>

</div>
</div>

<div class="ts-block-property">

```dts
sourcemap?: object | string;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">par défaut</span> `null`

</div>

Une sourcemap initiale qui sera fusionnée dans la sourcemap finale.
C'est en général la sourcemap du préprocesseur.

</div>
</div>

<div class="ts-block-property">

```dts
outputFilename?: string;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">par défaut</span> `null`

</div>

Utilisé pour la sourcemap JavaScript.

</div>
</div>

<div class="ts-block-property">

```dts
cssOutputFilename?: string;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">par défaut</span> `null`

</div>

Utilisé pour la sourcemap CSS.

</div>
</div>

<div class="ts-block-property">

```dts
hmr?: boolean;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">par défaut</span> `false`

</div>

Si `true`, compile les composants de manière compatible avec le hot module reloading.

</div>
</div>

<div class="ts-block-property">

```dts
modernAst?: boolean;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">par défaut</span> `false`

</div>

Si `true`, renvoie la version moderne de l'AST.
Vaudra `true` par défaut dans Svelte 6, et l'option sera supprimée dans Svelte 7.

</div>
</div></div>

## CompileResult

La valeur de retour de `compile` importée depuis `svelte/compiler`.

<div class="ts-block">

```dts
interface CompileResult {/*…*/}
```

<div class="ts-block-property">

```dts
js: {/*…*/}
```

<div class="ts-block-property-details">

Le JavaScript compilé

<div class="ts-block-property-children"><div class="ts-block-property">

```dts
code: string;
```

<div class="ts-block-property-details">

Le code généré

</div>
</div>
<div class="ts-block-property">

```dts
map: SourceMap;
```

<div class="ts-block-property-details">

Une sourcemap

</div>
</div></div>

</div>
</div>

<div class="ts-block-property">

```dts
css: null | {
	/** Le code généré */
	code: string;
	/** Une sourcemap */
	map: SourceMap;
};
```

<div class="ts-block-property-details">

Le CSS compilé

</div>
</div>

<div class="ts-block-property">

```dts
warnings: Warning[];
```

<div class="ts-block-property-details">

Un tableau d'objets de warnings qui ont été généré pendant la compilation. Chaque warning a
plusieurs propriétés :
- `code` est une chaîne de caractères identifiant la catégory du warning
- `message` décrit le problème en des termes lisibles par l'humain
- `start` et `end`, si le warning est relatif à une position précise, sont des objets avec les
propriétés `line`, `column` et `character`

</div>
</div>

<div class="ts-block-property">

```dts
metadata: {/*…*/}
```

<div class="ts-block-property-details">

Les métadonnées concernant le composant compilé

<div class="ts-block-property-children"><div class="ts-block-property">

```dts
runes: boolean;
```

<div class="ts-block-property-details">

Si oui ou non le fichier a été compilé en mode runes, soit via une option explicite, soit inféré
depuis l'usage.
Avec l'option `compileModule`, ceci vaudra toujours `true`.

</div>
</div></div>

</div>
</div>

<div class="ts-block-property">

```dts
ast: any;
```

<div class="ts-block-property-details">

L'AST

</div>
</div></div>

## MarkupPreprocessor

Un préprocesseur de markup qui prend une chaîne de caractères représentant du code et en renvoie une
version compilée.

<div class="ts-block">

```dts
type MarkupPreprocessor = (options: {
	/**
	 * Le contenu complet du fichier Svelte
	 */
	content: string;
	/**
	 * Le nom du fichier Svelte
	 */
	filename?: string;
}) => Processed | void | Promise<Processed | void>;
```

</div>

## ModuleCompileOptions

<div class="ts-block">

```dts
interface ModuleCompileOptions {/*…*/}
```

<div class="ts-block-property">

```dts
dev?: boolean;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">par défaut</span> `false`

</div>

Si `true`, provoque l'ajout de code supplémentaire pour effectuer des vérifications lors de
l'exécution et fournir des informations de debug lors du développement.

</div>
</div>

<div class="ts-block-property">

```dts
generate?: 'client' | 'server' | false;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">par défaut</span> `'client'`

</div>

Si `"client"`, Svelte émet du code prévu pour être exécuté dans le navigateur.
Si `"server"`, Svelte émet du code prévu pour le rendu côté serveur.
Si `false`, rien n'est généré. Utile pour de l'outillage qui ne sert qu'aux warnings.

</div>
</div>

<div class="ts-block-property">

```dts
filename?: string;
```

<div class="ts-block-property-details">

Utile pour les aides au debug et les sourcemaps. Votre plugin de bundler le définit automatiquement.

</div>
</div>

<div class="ts-block-property">

```dts
rootDir?: string;
```

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">par défaut</span> `process.cwd() dans les environnements similairess à Node, undefined ailleurs`

</div>

Utile pour s'assurer que les noms de fichiers ne fassent pas fuiter des informations sur le système
de fichiers. Votre plugin de bundler le définit automatiquement.

</div>
</div>

<div class="ts-block-property">

```dts
warningFilter?: (warning: Warning) => boolean;
```

<div class="ts-block-property-details">

Une fonction qui prend un `Warning` en argument et renvoie un booléen.
Utilisez ceci pour filtrer les warnings. Renvoyez `true` pour garder le warning, `false` pour
l'ignorer.

</div>
</div></div>

## Preprocessor

Un préprocesseur de script et de style qui prend en argument une chaîne de caractères représentant
du code et renvoie une version processée.

<div class="ts-block">

```dts
type Preprocessor = (options: {
	/**
	 * Le contenu de la balise de script ou de style
	 */
	content: string;
	/**
	 * Les attributs de la balise de script ou de style
	 */
	attributes: Record<string, string | boolean>;
	/**
	 * Le contenu complet du fichier Svelte
	 */
	markup: string;
	/**
	 * Le nom du fichier Svelte
	 */
	filename?: string;
}) => Processed | void | Promise<Processed | void>;
```

</div>

## PreprocessorGroup

Un group de préprocesseur est un ensemble de préprocesseurs qui sont appliqués à un fichier Svelte.

<div class="ts-block">

```dts
interface PreprocessorGroup {/*…*/}
```

<div class="ts-block-property">

```dts
name?: string;
```

<div class="ts-block-property-details">

Nom du préprocesseur. Sera une option obligatoire dans la prochaine version majeure

</div>
</div>

<div class="ts-block-property">

```dts
markup?: MarkupPreprocessor;
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
style?: Preprocessor;
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
script?: Preprocessor;
```

<div class="ts-block-property-details"></div>
</div></div>

## Processed

Le résultat d'une exécution de préprocesseur. Si le préprocesseur ne renvoie pas de résultat, on
suppose que le code n'a pas changé.

<div class="ts-block">

```dts
interface Processed {/*…*/}
```

<div class="ts-block-property">

```dts
code: string;
```

<div class="ts-block-property-details">

Le nouveau code

</div>
</div>

<div class="ts-block-property">

```dts
map?: string | object;
```

<div class="ts-block-property-details">

Une sourcemap renvoyant vers le code original

</div>
</div>

<div class="ts-block-property">

```dts
dependencies?: string[];
```

<div class="ts-block-property-details">

Une liste de fichiers additionnels dont il faut écouter les changements

</div>
</div>

<div class="ts-block-property">

```dts
attributes?: Record<string, string | boolean>;
```

<div class="ts-block-property-details">

Uniquement pour les préprocesseurs de script ou de style : les attributs mis à jour à définir sur la
balise. Si `undefined`, les attributs ne seront pas modifiés.

</div>
</div>

<div class="ts-block-property">

```dts
toString?: () => string;
```

<div class="ts-block-property-details"></div>
</div></div>

## Warning

<div class="ts-block">

```dts
interface Warning extends ICompileDiagnostic {}
```

</div>


