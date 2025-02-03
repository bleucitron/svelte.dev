---
title: La directive de style
---

Comme avec `class`, vous pouvez écrire vos attributs `style` de manière inlinée, car Svelte n'est en
réalité que du HTML un peu pimpé :

```svelte
/// file: App.svelte
<button
	class="card"
	+++style="transform: {flipped ? 'rotateY(0)' : ''}; --bg-1: palegoldenrod; --bg-2: black; --bg-3: goldenrod"+++
	onclick={() => flipped = !flipped}
>
```

Lorsque vous avez beaucoup de styles, cela peut commencer à être un peu le bazar. Nous pouvons
ranger un peu les choses en utilisant la directive `style:` :

```svelte
/// file: App.svelte
<button
	class="card"
+++	style:transform={flipped ? 'rotateY(0)' : ''}
	style:--bg-1="palegoldenrod"
	style:--bg-2="black"
	style:--bg-3="goldenrod"+++
	onclick={() => flipped = !flipped}
>
```
