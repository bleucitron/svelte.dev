---
title: Débuter avec Svelte
---

Nous recommandons d'utiliser [SvelteKit](../kit), le framework d'application officiel développé par
l'équipe Svelte, qui se base sur [Vite](https://vite.dev) :

```bash
npx sv create myapp
cd myapp
npm install
npm run dev
```

Ne vous inquiétez pas si vous ne connaissez pas encore Svelte ! Vous pouvez dans un premier temps
ignorer toutes les choses merveilleuses que SvelteKit apporte et vous y intéresser plus tard.

## Alternatives à SvelteKit [!VO]Alternatives to SvelteKit

Vous pouvez aussi utiliser Svelte directement avec Vite en exécutant `npm create vite@latest` et en
choisissant l'option `svelte`. De cette manière, `npm run build` va générer des fichiers HTML, JS et
CSS dans le dossier `dist` grâce à
[vite-plugin-svelte](https://github.com/sveltejs/vite-plugin-svelte). Dans la plupart des cas vous
aurez également certainement besoin de choisir une [librairie de routing](faq#Is-there-a-router).

Il existe également des plugins pour [Rollup](https://github.com/sveltejs/rollup-plugin-svelte),
[Webpack](https://github.com/sveltejs/svelte-loader) [et quelques
autres](https://sveltesociety.dev/packages?category=build-plugins), mais nous recommandons
l'utilisation de Vite.

## Outillage des éditeurs [!VO]Editor tooling

L'équipe de Svelte maintient une [extension VS
Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode), et des intégrations
sont également disponibles pour d'autres
[éditeurs](https://sveltesociety.dev/resources#editor-support) et outils.

Vous pouvez aussi vérifier la qualité de votre code dans votre terminal en utilisant [sv
check](https://github.com/sveltejs/cli).

## Obtenir de l'aide [!VO]Getting help

N'ayez pas peur de demander de l'aide dans le forum de discussion de notre serveur [Discord](/chat)
! Vous pourrez aussi trouver des réponses sur [Stack
Overflow](https://stackoverflow.com/questions/tagged/svelte).
