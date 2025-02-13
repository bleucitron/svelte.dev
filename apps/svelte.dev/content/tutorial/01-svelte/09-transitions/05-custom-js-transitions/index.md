---
title: Transition JS personnalisées
---

Bien que vous deviez généralement utiliser autant que possible le CSS pour les transitions, certains
effets ne peuvent pas être créés sans JavaScript, comme l'effet "machine à écrire" :

```js
/// file: App.svelte
function typewriter(node, { speed = 1 }) {
	const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

	if (!valid) {
		throw new Error(`Cette transition ne fonctionne que sur des éléments possédant un seul noeud
texte`);
	}

	+++const text = node.textContent;
	const duration = text.length / (speed * 0.01);

	return {
		duration,
		tick: (t) => {
			const i = Math.trunc(text.length * t);
			node.textContent = text.slice(0, i);
		}
	};+++
}
```
