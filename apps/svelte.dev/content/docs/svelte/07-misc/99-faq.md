---
title: Foire aux questions
---

## Je débute avec Svelte. Par où dois-je commencer ? [!VO]I'm new to Svelte. Where should I start?

Nous pensons que la meilleure manière de commencer est de jouer avec le [tutoriel](/tutorial)
interactif. Chacune de ses étapes est dédiée à un aspect particulier et est facile à suivre. Vous
modifierez et exécuterez des vrais composants Svelte directement dans votre navigateur.

Cinq à dix minutes devraient vous suffire pour vous mettre en jambes. Une heure et demie devrait
vous amener à la fin du tutoriel.

## Où puis-je obtenir de l'aide ? [!VO]Where can I get support?

Si votre problème concerne une syntaxe particulière, la [documentation de référence](/docs/svelte)
devrait répondre à la plupart de vos questions.

Stack Overflow est un forum populaire permettant de poser des questions orientées code ou de
demander de l'aide sur une erreur spécifique. Vous pouvez parcourir les questions existantes avec le
label [Svelte](https://stackoverflow.com/questions/tagged/svelte+or+svelte-3) ou poser [votre propre
question](https://stackoverflow.com/questions/ask?tags=svelte) !

Il existe également des forums et chats en ligne qui permettent de discuter au sujet des bonnes
pratiques, de l'architecture d'application, ou simplement si vous souhaitez rencontrer d'autres
utilisateurs et utilisatrices de Svelte. [Notre Discord](/chat) ou le [canal
Reddit](https://www.reddit.com/r/sveltejs/) en sont de bons exemples. Si vous avez une question
relative à du code qui vous semble être une question que quelqu'un d'autre a déjà posée, Stack
Overflow est généralement plus adapté.

## Y a t'il des ressources tierces ? [!VO]Are there any third-party resources?

Svelte Society maintient une [liste de livres et vidéos](https://sveltesociety.dev/resources).

## Comment activer la coloration syntaxique de VS Code pour mes fichiers .svelte ? [!VO]How can I get VS Code to syntax-highlight my .svelte files?

Il y a une [extension VS Code officielle pour
Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## Y a t'il un outil pour formatter automatiquement mes fichiers .svelte ? [!VO]Is there a tool to automatically format my .svelte files?

Vous pouvez utiliser Prettier avec le plugin
[prettier-plugin-svelte](https://www.npmjs.com/package/prettier-plugin-svelte).

## Comment documenter mes composants ? [!VO]How do I document my components?

Dans les éditeurs qui supportent le Language Server de Svelte, vous pouvez documenter vos
composants, fonctions et exports en utilisant des commentaires dédiés.

````svelte
<script>
	/** Comment appeler l'utilisateur ? */
	export let name = 'tout le monde';
</script>

<!--
@component
Voici de la documentation pour ce composant.
Elle s'affichera au survol.

- vous pouvez écrire du Markdown ici
- vous pouvez aussi écrire des blocs de code ici
- Usage :
  ```tsx
  <main name="Arethra">
  ```
-->
<main>
	<h1>
		Bonjour, {name}
	</h1>
</main>
````

Note : le `@component` est nécessaire dans le commentaire HTML qui décrit votre composant.

## Est-ce que Svelte passe à l'échelle ? [!VO]Does Svelte scale?

Nous prévoyons d'écrire un article de blog sur le sujet, mais en attendant, vous pouvez aller vous
informer sur cette [issue](https://github.com/sveltejs/svelte/issues/2546).

## Y a t'il une librairie de composants ? [!VO]Is there a UI component library?

Il existe plusieurs librairies de composants. Vous pouvez les retrouver dans la [section "Design
systems" de la page des composants](https://sveltesociety.dev/packages?category=design-system) sur
le site de Svelte Society.

## Comment tester une application Svelte ? [!VO]How do I test Svelte apps?

La façon dont votre application est structurée et comment sa logique est définie vont déterminer la
meilleure manière de vous assurer qu'elle est correctement testée. Il est important de noter que
toutes les logiques ne sont pas bonnes à mettre dans des composants - ceci inclut des sujets comme
la transformation de données, la gestion d'état inter-composants, l'affichage de logs, entre autres
choses. Rappelez-vous que la librairie Svelte a sa propre suite de tests, vous n'avez donc pas
besoin d'écrire des tests pour valider les implémentations de comportements fournis par Svelte.

Une application Svelte peut avoir généralement trois niveaux de tests : Unitaires, Composant, et
End-to-End (E2E)

_Tests Unitaires_ : l'objectif est de tester la logique métier en isolation. Il s'agit souvent de
valider des fonctions individuelles et des cas marginaux. Vous pouvez les garder légers et rapides à
exécuter en minimisant la zone de responsabilité de ces tests, et si vous sortez un maximum de
logique de vos composants Svelte, vous pourrez tester une plus grande partie de votre application
grâce à eux. Lorsque vous créez un nouveau projet SvelteKit, vous aurez la possibilité de mettre en
place [Vitest](https://vitest.dev/) pour vos tests unitaires. Il existe d'autres librairies dédiées
aux tests unitaires que vous pouvez également utiliser.

_Tests de Composant_ : Valider qu'un composant Svelte se monte correctement et se comporte comme
prévu lors de son cycle de vie requiert un outillage fournissant un Document Object Model (DOM). Les
composants peuvent être compilés (puisque Svelte est un compilateur et non une simple librairie) et
montés pour permettre des assertions sur la structure des éléments, les gestionnaires d'évènement,
l'état, et toute autre fonctionnalité fournie par un composant Svelte. Les outils pour tester des
composants vont de l'implémentation en mémoire comme jsdom couplée à un test runner comme
[Vitest](https://vitest.dev/), jusqu'à des solutions qui embarquent un vrai navigateur pour fournir
des fonctionnalités de tests visuels comme [Playwright](https://playwright.dev/docs/test-components)
ou [Cypress](https://www.cypress.io/).

_Tests End-to-End_ : Pour vous assurer que vos utilisateurs et utilisatrices sont capables
d'interagir avec votre application, il est nécessaire de la considérer comme un tout et de la tester
d'une manière qui soit la plus proche possible des conditions de production. Vous pouvez faire cela
en écrivant des tests end-to-end (E2E) qui chargent une version déployée de votre application et
interagissent avec elle pour simuler la manière dont quelqu'un le ferait. Lorsque vous créez un
nouveau projet SvelteKit, vous avez la possibilité de mettre en place
[Playwright](https://playwright.dev/) pour vos tests end-to-end. Il existe également plusieurs
autres librairies de tests E2E si vous le souhaitez.

Voici quelques ressources pour vous lancer dans les tests :

- [Svelte Testing Library](https://testing-library.com/docs/svelte-testing-library/example/)
- [Svelte Component Testing in Cypress](https://docs.cypress.io/guides/component-testing/svelte/overview)
- [Example using vitest](https://github.com/vitest-dev/vitest/tree/main/examples/sveltekit)
- [Example using uvu test runner with JSDOM](https://github.com/lukeed/uvu/tree/master/examples/svelte)
- [Test Svelte components using Vitest & Playwright](https://davipon.hashnode.dev/test-svelte-component-using-vitest-playwright)
- [Component testing with WebdriverIO](https://webdriver.io/docs/component-testing/svelte)

## Y a t'il un routeur ? [!VO]Is there a router?

La librairie officielle de routing est [SvelteKit](/docs/kit). SvelteKit fournit un routeur basé sur
le système de fichiers, du rendu côté serveur (SSR), et du rafraîchissement instantané de modules
(HMR), le tout dans une seule et même librairie simple à utiliser. C'est un outil similaire à
Next.js pour React.

Cependant, vous pouvez utiliser n'importe quelle librairie de routing. Beaucoup de gens utilisent
[page.js](https://github.com/visionmedia/page.js). Il y a également
[navaid](https://github.com/lukeed/navaid), qui est très similaire. Ainsi que
[universal-router](https://github.com/kriasoft/universal-router), qui est isomorphe sur les routes
enfant, mais sans support d'historique intégré.

Si vous préférez une approche HTML déclarative, vous pouvez utiliser la librairie isomorphe
[svelte-routing](https://github.com/EmilTholin/svelte-routing) ainsi qu'un fork de celle-ci appelé
[svelte-navigator](https://github.com/mefechoel/svelte-navigator) qui inclut des fonctionnalités
supplémentaires.

Si vous avez besoin de routing basé sur des hashs côté client, renseignez-vous sur
[svelte-spa-router](https://github.com/ItalyPaleAle/svelte-spa-router) ou
[abstract-state-router](https://github.com/TehShrike/abstract-state-router/).

[Routify](https://routify.dev) est un autre routeur basé sur le système de fichiers, similaire au
routeur de SvelteKit. Sa version 3 supporte le SSR natif de Svelte.

Vous pouvez retrouver une [liste maintenue par la communauté des routeurs disponibles sur
sveltesociety.dev](https://sveltesociety.dev/packages?category=routers).

## Comment construire une application mobile avec Svelte [!VO]How do I write a mobile app with Svelte?

Même si la plupart des applications mobiles sont construites sans JavaScript, si vous souhaitez
capitaliser sur vos composants et votre connaissance de Svelte pour construire une application
mobile, vous pouvez transformer une [SPA SvelteKit](https://kit.svelte.dev/docs/single-page-apps) en
une application mobile en utilisant [Tauri](https://v2.tauri.app/start/frontend/sveltekit/) ou
[Capacitor](https://capacitorjs.com/solution/svelte). Les fonctionnalités mobile comme la caméra, la
géolocalisation ou les notifications push sont disponibles via des plugins pour chacune des
plateformes.

Svelte Native était une option disponible pour Svelte 4, mais Svelte 5 n'est actuellement pas
compatible. Svelte Native vous permet d'écrire des apps NativeScript en utilisant des composants
Svelte contenant des [composants d'UI NativeScript](https://docs.nativescript.org/ui/) plutôt que
des éléments DOM, ce qui est similaire à ce que React Native permet.

## Puis-je dire à Svelte de ne pas supprimer mes styles non utilisés ? [!VO]Can I tell Svelte not to remove my unused styles?

Non. Svelte supprime les styles inutiles de vos composants et vous en avertit pour éviter
d'éventuels problèmes qui pourraient en découler.

Le scoping des styles de composant de Svelte fonctionne en générant une classe unique pour chaque
composant, l'ajoutant aux éléments concernés sous le contrôle de Svelte présents dans le composant,
puis en l'ajoutant à tous les sélecteurs dans les styles de ce composant. Lorsque le compilateur ne
peut pas savoir à quels éléments un sélecteur de style doit d'appliquer, le garder conduirait à deux
mauvaises options :

- S'il garde le sélecteur et y ajoute la classe de scope, le sélecteur ne va probablement pas
correspondre aux éléments attendus dans le composant, et encore moins s'ils ont été créés par un
composant enfant ou par `{@html ...}`.
- S'il garde le sélecteur sans y ajouter la classe de scope, le style correspondant devient un style
global, impactant toute votre page.

Si vous avez besoin de styliser quelque chose que Svelte ne peut pas identifier au moment de la
compilation, vous aurez besoin d'utiliser explicitement des styles globaux via `:global(...)`. Mais
rappelez-vous que vous pouvez utiliser `:global(...)` autour de certaines parties d'un sélecteur.
`.foo :global(.bar) { ... }` va s'appliquer à tout élément `.bar` qui serait présent dans les
éléments `.foo` au sein du composant. Tant qu'il y a un élément parent comme source dans le
composant actuel, les sélecteurs globaux partiels comme celui-là avant devraient satisfaire vos
besoins dans l'immense majorité des cas.

## Svelte 2 est-il toujours disponible ? [!VO]Is Svelte v2 still available?

Aucune nouvelle fonctionnalité n'y est ajouté, et aucun bug ne sera vraisemblablement corrigé, à
moins qu'ils ne soient véritablement affreux ou qu'ils présentent des risques graves de sécurité.

La documenation est toujours disponible [ici](https://v2.svelte.dev/guide) (en anglais uniquement).

## Comment puis-je activer le hot module reloading ? [!VO]How do I do hot module reloading?

Nous recommandons d'utiliser [SvelteKit](/docs/kit), qui supporte par défaut le HMR et est construit
sur la base de [Vite](https://vitejs.dev/) et de
[svelte-hmr](https://github.com/sveltejs/svelte-hmr). Il existe également des plugins maintenus par
la communauté pour [rollup](https://github.com/rixo/rollup-plugin-svelte-hot) et
[webpack](https://github.com/sveltejs/svelte-loader).
