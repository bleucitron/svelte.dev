---
title: svelte/action
---

## Action

Une "action" est une fonction qui est appelée lorsqu'un élément est créé.
Vous pouvez utiliser cette interface pour les typer.
L'exemple qui suit définit une action qui ne fonctionne que sur des éléments `<div>` et prend en
argument optionnel un paramètre qui a une valeur par défaut :

```ts
export const myAction: Action<HTMLDivElement, { someProperty: boolean } | undefined> = (node, param = { someProperty: true }) => {
	// ...
}
```
`Action<HTMLDivElement>` et `Action<HTMLDivElement, undefined>` signalent tous les deux que l'action
n'accepte pas de paramètre.

Vous pouvez renvoyer depuis la fonction un objet avec les méthodes `update` et `destroy`, et typer
d'éventuels attributs et évènements additionnels.
Voir l'interface `ActionReturn` pour plus de détails.

<div class="ts-block">

```dts
interface Action<
	Element = HTMLElement,
	Parameter = undefined,
	Attributes extends Record<string, any> = Record<
		never,
		any
	>
> {/*…*/}
```

<div class="ts-block-property">

```dts
<Node extends Element>(
	...args: undefined extends Parameter
		? [node: Node, parameter?: Parameter]
		: [node: Node, parameter: Parameter]
): void | ActionReturn<Parameter, Attributes>;
```

<div class="ts-block-property-details"></div>
</div></div>

## ActionReturn

Les actions peuvent renvoyer un objet contenant les deux propriétés définies dans cette interface.
Les deux sont optionnelles.
- `update`: une action peut avoir un paramètre. Cette méthode sera appelée lorsque ce paramètre sera
mis à jour, immédiatement après que Svelte aura appliqué les changements sur le markup.
`ActionReturn` et `ActionReturn<undefined>` signifient tous les deux que l'action n'accepte pas de
paramètre.
- `destroy`: méthode qui est appelée juste après le démontage de l'élément.

De plus, vous pouvez préciser quels attributs et évènements additionnels l'action permet sur
l'élément concerné. Ceci ne s'applique que sur les types TypeScript et n'a aucun effet lors de
l'exécution.

Exemple d'utilisation :
```ts
interface Attributes {
	newprop?: string;
	'on:event': (e: CustomEvent<boolean>) => void;
}

export function myAction(node: HTMLElement, parameter: Parameter): ActionReturn<Parameter, Attributes> {
	// ...
	return {
		update: (updatedParameter) => {...},
		destroy: () => {...}
	};
}
```

<div class="ts-block">

```dts
interface ActionReturn<
	Parameter = undefined,
	Attributes extends Record<string, any> = Record<
		never,
		any
	>
> {/*…*/}
```

<div class="ts-block-property">

```dts
update?: (parameter: Parameter) => void;
```

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

```dts
destroy?: () => void;
```

<div class="ts-block-property-details"></div>
</div></div>


