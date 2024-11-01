---
title: <svelte:options>
---

```svelte
<svelte:options option={value} />
```

L'élément `<svelte:options>` permet de définir des options de compilateur pour le composant dans
lequel il est défini. Vous pouvez en apprendre plus dans [la section dédiée au
compilateur](svelte-compiler#compile) Les options possibles sont :

- `runes={true}` — force un composant à être en _mode runes_ (voir la section [APIs
legacy](legacy-overview))
- `runes={false}` — force un composant à être en _mode legacy_
- `namespace="..."` — le namespace dans lequel ce composant sera utilisé, peut être `"html"` (par
défaut), `"svg"` ou `"mathml"`
- `customElement={...}` — les [options](custom-elements#Component-options) à utiliser lorsque vous
souhaitez compiler ce composant en composant personnalisé. Si une chaîne de caractères est fournie,
elle est utilisée comme option `tag`
- `css="injected"` – le composant injectera ses styles inlinés : lors du rendu côté serveur, les
styles seront injectés dans une balise `<style>` du `<head>`, lors du rendu côté client, les styles
seront chargées via JavaScript

> [!LEGACY] Options dépréciées
> Svelte 4 a également les options suivantes. Elles sont dépréciées en Svelte 5 et
> non-fonctionnelles en mode runes.
>
> - `immutable={true}` – vous n'utilisez jamais de données mutables, permettant au compilateur de se
>   contenter de vérifier les équalités par référence pour déterminer si des valeurs ont changé
> - `immutable={false}` – le comportement par défaut. Svelte sera plus conservatif au sujet de
>   déterminer si ou non des objets mutables ont changé
> - `accessors={true}` – ajouter des getters et setters pour les props du composant
> - `accessort={false}` – le comportement par défaut

```svelte
<svelte:options customElement="my-custom-element" />
```
