---
title: {@debug ...}
---

La balise `{@debug ...}` offre une alternative à `console.log(...)`. Elle permet de logger les
valeurs de variables spécifiques lorsqu'elles changent, et met en pause l'exécution si vous avez les
outils de développement ouverts.

```svelte
<script>
	let user = {
		firstname: 'Ada',
		lastname: 'Lovelace'
	};
</script>

{@debug user}

<h1>Coucou {user.firstname} !</h1>
```

`{@debug ...}` attend une liste de noms de variables séparés par des virgules (mais pas
d'expressions arbitraires).

```svelte
<!-- Compile -->
{@debug user}
{@debug user1, user2, user3}

<!-- ne compile PAS -->
{@debug user.firstname}
{@debug myArray[0]}
{@debug !isReady}
{@debug typeof user === 'object'}
```

La balise `{@debug}` utilisée sans aucun argument va ajouter une déclaration `debugger` qui sera
déclenchée lorsque _n'importe_ quel état change, plutôt que celui de variables spécifiques.

