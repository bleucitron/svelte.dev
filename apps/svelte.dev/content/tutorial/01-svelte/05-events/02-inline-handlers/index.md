---
title: Gestionnaires inline
---

Vous pouvez aussi déclarer des gestionnaires d'évènement de manière inline :

```svelte
/// file: App.svelte
<script>
	let m = $state({ x: 0, y: 0 });

	---function onpointermove(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}---
</script>

<div
	onpointermove={+++(event) => {
		m.x = event.clientX;
		m.y = event.clientY;
	}+++}
	role="presentation"
>
	Le pointeur se trouve à la position {Math.round(m.x)} x {Math.round(m.y)}
</div>
```
