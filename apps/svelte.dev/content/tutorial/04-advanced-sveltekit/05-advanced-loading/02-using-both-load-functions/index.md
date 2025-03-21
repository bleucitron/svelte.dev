---
title: Utilisez les deux fonction load
---

Occasionnellement, vous pourriez avoir besoin d'une fonction `load` de serveur ET d'une fonction
`load` universelle. Par exemple, vous pourriez avoir besoin de renvoyer des données depuis le
serveur, mais aussi renvoyer une valeur qui ne peut pas être sérialisée comme donnée de serveur.

Dans cet exemple, nous voulons renvoyer un composant différent depuis `load` selon que les données
reçues de `src/routes/+page.server.js` sont `cool` ou non.

Nous pouvons accéder aux données de serveur dans `src/routes/+page.js` via la propriété `data` :

```js
/// file: src/routes/+page.js
export async function load(+++{ data }+++) {
	const module = +++data.cool+++
		? await import('./CoolComponent.svelte')
		: await import('./BoringComponent.svelte');

	return {
		component: module.default,
		message: +++data.message+++
	};
}
```

> [!NOTE] Notez que les données ne sont pas fusionnées — nous devons renvoyer `message`
> explicitement depuis la fonction `load`.
