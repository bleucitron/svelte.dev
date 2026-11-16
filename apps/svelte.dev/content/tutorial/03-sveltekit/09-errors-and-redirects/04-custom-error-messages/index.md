---
title: Personnaliser le message d'erreur
---

La page d'erreur dans l'exercice précédent est plutôt statique. Vous avez peut-être envie d'afficher
le message d'erreur afin d'aider les gens dans leurs démarches avec votre service support.

Pour cela, SvelteKit vous fournit `page.error` (qui contient les propriétés `status` et `message` de
l'erreur, et toute propriété personnalisée), ainsi que `page.status`. Ajoutons-les à la page
`+error.svelte` :

```svelte
/// file: src/routes/+error.svelte
<script>
	+++import { page } from '$app/state';+++

	let online = typeof navigator !== 'undefined'
		? navigator.onLine
		: true;
</script>

+++{#if page.status === 404}
	<h1>Introuvable</h1>
{:else +++if !online}
	<h1>Vous êtes hors-ligne</h1>
{:else}
	<h1>Oups !</h1>
	---<p>Quelque chose s'est mal passé</p>---
	+++<p>{page.error.message}</p>+++
{/if}
```

C'est mieux, mais l'erreur inconnue de la page "À propes" a le message "Internal Error" — comment
est-ce possible ? C'est parce que SvelteKit est prudent et vous empêche d'afficher accidentellement
des informations sensibles dans le message d'erreur.

Pour personnaliser ce message, implémentez le hook `handleError` dans les fichiers `hooks.server.js`
et `hooks.client.js`. Ces hooks reçoivent chaque erreur jetée lors du chargement, du rendu ou de la
réponse à une requête ; la propriété `kind` vous informe d'où provient chaque erreur. Nous voulons
uniquement révéler le message original pour les erreurs `'unknown'`. Ne rien renvoyer pour `'app'`,
`'framework'` et les erreurs de validation côté serveur `'validation'` préserve leurs informations
existantes, qui ne posent pas de problèmes à être affichées.

```js
// hooks.server.js
export function handleError(+++{ kind, error }+++) {
    +++if (kind === 'unknown') {
        return { message: error instanceof Error ? error.message : 'Internal Error' };
    }+++
}
```

```js
// hooks.client.js
export function handleError(+++{ kind, error }+++) {
    +++if (kind === 'unknown') {
        return { message: error instanceof Error ? error.message : 'Internal Error' };
    }+++
}
```

Vous pouvez également appeler vos services de suivi d'erreur dans ces hooks.

Notez que vous pouvez renvoyer plus de propriétés si vous le souhaitez. Peu importe la forme de
l'objet que vous renvoyez, celui-ci sera fusionné avec l'objet original et le tout rendu disponible
dans `page.error`. Renvoyer un `statut` change également le status utilisé pour afficher la page
d'erreur. Vous pouvez en apprendre plus sur ce sujet (et sur comment rendre le tout typé !) dans la
[documentation sur les erreurs](/docs/kit/errors).

> [!NOTE] Lorsque vous gérez des erreurs, faites attention à ne pas supposer que l'erreur est un
> objet `Error`, car n'importe quoi peut être jeté. Assurez-vous également de ne pas exposer des
> informations sensibles en relayant trop d'informations
