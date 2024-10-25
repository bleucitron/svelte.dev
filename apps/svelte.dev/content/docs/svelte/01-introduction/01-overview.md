---
title: Aperçu
---

Svelte est un framework permettant de construire des interfaces sur le web. Il utilise un
compilateur pour transformer les composants écrits en HTML, CSS et JavaScript...

```svelte
<!--- file: App.svelte --->
<script>
	function greet() {
		alert('Bienvenue sur Svelte !');
	}
</script>

<button onclick={greet}>cliquez moi</button>

<style>
	button {
		font-size: 2em;
	}
</style>
```

... en du code JavaScript léger et optimisé.

Vous pouvez vous en servir pour construire ce que vous voulez sur le web, depuis des composants
isolés jusqu'à des applications full-stack ambitieuses (en utilisant le framework d'application
compagnon de Svelte, [SvelteKit](../kit)) et tout ce que vous pouvez imaginer entre les deux.

Ces pages servent de documentation de référence. Si vous débutez avec Svelte, nous vous recommandons
de commencer par le [tutoriel interactif](/tutorial) et de revenir ici lorsque vous aurez des
questions.

Vous pouvez aussi essayer Svelte directement dans le [bac à sable](/playground) ou sur
[StackBlitz](https://sveltekit.new), s'il vous faut un environnement plus complet.

