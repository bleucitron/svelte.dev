---
title: Évènements de transition
---

Il peut être utilise de savoir lorsque les transitions démarrent et se terminent. Svelte génère des
évènements que vous pouvez écouter comme tout autre évènement DOM :

```svelte
/// file: App.svelte
<p
	transition:fly={{ y: 200, duration: 2000 }}
+++	onintrostart={() => status = 'début de l\'entrée'}
	onoutrostart={() => status = 'début de la sortie'}
	onintroend={() => status = 'fin de l\'entrée'}
	onoutroend={() => status = 'fin de la sortie'}+++
>
	Entre et sort en volant
</p>
```
