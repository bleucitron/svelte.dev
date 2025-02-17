---
title: Snippets et balises de rendu
---

Les snippets vous permettent de réutiliser du contenu au sein d'un composant, sans avoir besoin de
l'extraire dans un fichier séparé.

Dans cet exercice, nous créons un tableau de [trois singes
sages](https://fr.wikipedia.org/wiki/Singes_de_la_sagesse), avec leur séquence d'échappement unicode
et leur entité HTML. Nous n'avons pour le moment qu'un seul singe.

Bien sûr, nous pourrions dupliquer le markup. Ou bien nous pourrions créer un tableau d'objets `{
emoji, description }` et le passer à un bloc `{#each ...}`. Mais une meilleure solution est
d'encapsuler le markup dans un block réutilisable.

Commencez par _déclarer un snippet_ :

```svelte
/// file: App.svelte
+++{#snippet monkey()}+++
	<tr>
		<td>{emoji}</td>
		<td>{description}</td>
		<td>\u{emoji.charCodeAt(0).toString(16)}\u{emoji.charCodeAt(1).toString(16)}</td>
		<td>&amp#{emoji.codePointAt(0)}</td>
	</tr>
+++{/snippet}+++
```

Le singer n'est plus visible, car nous n'avons pas encore _rendu_ le snippet. Faisons-le maintenant
:

```svelte
/// file: App.svelte
<tbody>
	{#snippet monkey()}...{/snippet}

	+++{@render monkey()}+++
</tbody>
```

Avant de pouvoir réutiliser le snippet pour le reste de nos singes, nous devons passer des données
au snippet. Les snippets peuvent ne pas avoir d'arguments, ou bien en avoir, sans limite de nombre :

```svelte
/// file: App.svelte
<tbody>
	+++{#snippet monkey(emoji, description)}...{/snippet}+++

	+++{@render monkey('🙈', 'ne pas voir')}+++
</tbody>
```

> [!NOTE] Vous pouvez aussi déstructurer les arguments, si vous préfèrez.

Ajoutez le reste des singes :

- `'🙈', 'ne pas voir'`
- `'🙉', 'ne pas entendre'`
- `'🙊', 'ne pas parler'`

Enfin, supprimez le bloc `<script>`, car il ne sert plus à rien :

```svelte
/// file: App.svelte
---<script>
	let emoji = '🙈';
	let description = 'ne pas voir';
</script>---
```

> [!NOTE] Les snippets peuvent être déclarés n'importe où dans votre composant, mais, comme les
> fonctions, ils ne sont accessibles par les balises de rendu que dans le même "scope" ou un scope
> enfant.
