---
title: {@html ...}
---

Pour injecter du HTML brut dans vos composants, utilisez la balise `{@html ...}` :

```svelte
<article>
	{@html content}
</article>
```

> [!NOTE] Assurez-vous soit d'échapper la chaîne fournie, soit de ne fournir que des valeurs qui
> sont sous votre contrôle pour votre protéger d'éventuelles attaques
> [XSS](https://owasp.org/www-community/attacks/xss/). N'affichez jamais de contenu non nettoyé.

L'expression doit être du HTML valide et autonome – le code suivant ne fonctionne pas, car `</div>`
n'est pas du code HTML valide :

```svelte
{@html '<div>'}contenu{@html '</div>'}
```

De plus, si vous fournissez du code Svelte, celui-ci ne sera pas compilé.

## Style [!VO]Styling

Le contenu affiché de cette manière est "invisible" pour Svelte, et ne sera donc pas concerné par
les [styles scopés](scoped-styles) – autrement dit, le code suivant ne fonctionnera pas, et les
styles de `a` et `img` seront considérés comme non utilisés :

<!-- prettier-ignore -->
```svelte
<article>
	{@html content}
</article>

<style>
	article {
		a { color: hotpink }
		img { width: 100% }
	}
</style>
```

Utilisez plutôt le modificateur `:global` pour cibler tout ce qui se trouve dans l'`<article>` :

<!-- prettier-ignore -->
```svelte
<style>
	article +++:global+++ {
		a { color: hotpink }
		img { width: 100% }
	}
</style>
```
