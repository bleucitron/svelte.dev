---
title: Liaisons contenteditable
---

Les éléments avec un attribut `contenteditable` supportent les liaisons sur `textContent` et
`innerHTML` :

```svelte
/// file: App.svelte
<div +++bind:innerHTML={html}+++ contenteditable></div>
```
