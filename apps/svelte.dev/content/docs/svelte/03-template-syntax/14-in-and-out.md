---
title: in: and out:
---

Les directives `in:` et `out:` sont identiques à [`transition:`](transition), excepté le fait que
les transitions ainsi créées ne sont pas bidirectionnelles - une transition `in` va continuer
d'être "jouée" en parallèle de la transition `out`, plutôt que d'être inversée, si le bloc est sorti
du DOM pendant que la transition `in` est toujours en cours. Si une transition `out` est annulée,
les transitions vont reprendre du début.

```svelte
<script>
  import { fade, fly } from 'svelte/transition';

  let visible = $state(false);
</script>

<label>
  <input type="checkbox" bind:checked={visible}>
  visible
</label>

{#if visible}
	<div in:fly={{ y: 200 }} out:fade>entre en volant, sort en s'estompant</div>
{/if}
```
