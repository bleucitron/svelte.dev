---
title: style:
---

La directive de `style:` fournit un raccourci pour définir plusieurs styles sur un élément.

```svelte
<!-- ces écritures sont équivalentes -->
<div style:color="red">...</div>
<div style="color: red;">...</div>
```

La valeur peut contenir des expressions arbitraires :

```svelte
<div style:color={myColor}>...</div>
```

La forme raccourcie est permise :

```svelte
<div style:color>...</div>
```

Plusieurs styles peuvent être définis sur un même élément :

```svelte
<div style:color style:width="12rem" style:background-color={darkMode ? 'black' : 'white'}>...</div>
```

Pour définir un style comme important, vous pouvez utiliser le modificateur `|important` :

```svelte
<div style:color|important="red">...</div>
```

Lorsque des directives de `style:` sont combinées avec des attributs `style`, les directives seront
prioritaires :

```svelte
<div style="color: blue;" style:color="red">Ceci sera rouge</div>
```
