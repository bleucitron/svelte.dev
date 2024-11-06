---
title: Tests
---

Les tests vous aident à écrire et maintenir votre code et vous protègent contre les régressions. Les
frameworks de test vous aident à ça, vous permettant de décrire des assertions ou des attentes sur
le comportement de votre code. Svelte ne vous oriente pas sur tel ou tel framework à utiliser – vous
pouvez écrire des tests unitaires, des tests d'intégration, des tests end-to-end en utilisant des
solutions comme [Vitest](https://vitest.dev/), [Jasmine](https://jasmine.github.io/),
[Cypress](https://www.cypress.io/) et [Playwright](https://playwright.dev/)

## Tests unitaires et d'intégration avec Vitest [!VO]Unit and integration testing using Vitest

Les tests unitaires vous permettent de tester des petites parties isolées de votre code. Les tests
d'intégration vous permettent de vérifier comment des morceaux de votre application fonctionnent
ensemble. Si vous utilisez Vite (notamment via SvelteKit), nous vous recommandons d'utiliser
[Vitest](https://vitest.dev/).

Pour commencer, installer Vitest :

```bash
npm install -D vitest
```

Puis ajuster votre fichier `vite.config.js` :

<!-- prettier-ignore -->
```js
/// file: vite.config.js
import { defineConfig } from +++'vitest/config'+++;

export default defineConfig({
	// ...
	// Dit à Vitest d'utiliser les points d'entrée `browser` dans les fichiers `package.json`, même si
	// Vitest utilise Node
	resolve: process.env.VITEST
		? {
				conditions: ['browser']
			}
		: undefined
});
```

> [!NOTE] Si charger la version navigateur de tous vos paquets n'est pas possible, parce que vous
> testez également des librairies backend, [vous pourriez avoir également besoin d'une configuration
> d'alias](https://github.com/testing-library/svelte-testing-library/issues/222#issuecomment-1909993331)

Vous pouvez maintenant écrire vos tests unitaires dans des fichiers `.js/.ts` :

```js
/// file: multiplier.svelte.test.js
import { flushSync } from 'svelte';
import { expect, test } from 'vitest';
import { multiplier } from './multiplier.js';

test('Multiplier', () => {
	let double = multiplier(0, 2);

	expect(double.value).toEqual(0);

	double.set(5);

	expect(double.value).toEqual(10);
});
```

### Utiliser les runes dans vos fichiers de test [!VO]Using runes inside your test files

Il est possible d'utiliser les runes dans vos fichiers de test. Assurez-vous d'abord que votre
bundler sache diriger le fichier à travers le compilateur Svelte avant que le test soit lancé, et ce
en ajoutant `.svelte` au nom du fichier (par ex. `multiplier.svelte.test.js`). Vous pourrez ensuite
utiliser les runes dans vos tests.

```js
/// file: multiplier.svelte.test.js
import { flushSync } from 'svelte';
import { expect, test } from 'vitest';
import { multiplier } from './multiplier.svelte.js';

test('Multiplier', () => {
	let count = $state(0);
	let double = multiplier(() => count, 2);

	expect(double.value).toEqual(0);

	count = 5;

	expect(double.value).toEqual(10);
});
```

Si le code testé utilise des effets, vous aurez besoin de placer le test dans un `$effect.root` :

```js
/// file: logger.svelte.test.js
import { flushSync } from 'svelte';
import { expect, test } from 'vitest';
import { logger } from './logger.svelte.js';

test('Effet', () => {
	const cleanup = $effect.root(() => {
		let count = $state(0);

		// logger utilise un $effect pour afficher les mises à jour de son input
		let log = logger(() => count);

		// les effets sont en général exécutés après une micro-tâche,
		// utiliser `flushSync` pour exécuter tous les effets en attente de manière synchrone
		flushSync();
		expect(log.value).toEqual([0]);

		count = 1;
		flushSync();

		expect(log.value).toEqual([0, 1]);
	});

	cleanup();
});
```

### Tests de composants [!VO]Component testing

Il est possible de tester vos composants en isolation en utilisant Vitest.

> [!NOTE] Avant d'écrire des tests de composant, posez-vous la question de si vous avez réellement
> besoin de tester le composant, ou si vous souhaitez plutôt tester la logique _au sein_ de votre
> composant. Si c'est le cas, envisagez d'extraire cette logique afin de pouvoir la tester
> indépendamment du composant.

Pour commencer, installer jsdom (une librairie qui simule les APIs du DOM) :

```bash
npm install -D jsdom
```

Puis ajustez votre `vite.config.js` :

```js
/// file: vite.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		/* ... */
	],
	test: {
		// Si vous testez des composants côté client, vous aurez besoin de mettre en place un
		// environnement DOM. Si tous vos fichiers ne sont pas compatibles avec cet environnement, vous
		// pouvez plutôt ajouter un commentaire `// @vitest-environment jsdom` en haut des fichiers de
		// test.

		environment: 'jsdom'
	},

	// Dit à Vitest d'utiliser les points d'entrée `browser` dans les fichiers `package.json`, même si
	// Vitest utilise Node
	resolve: process.env.VITEST
		? {
				conditions: ['browser']
			}
		: undefined
});
```

Vous pouvez ensuite créer un fichier de test dans lequel importer le composant à tester, interagir
avec lui programmatiquement et définir les résultats attendus :

```js
/// file: component.test.js
import { flushSync, mount, unmount } from 'svelte';
import { expect, test } from 'vitest';
import Component from './Component.svelte';

test('Component', () => {
	// Instantier le composant en utilisant l'API Svelte `mount`
	const component = mount(Component, {
		target: document.body, // `document` existe grâce à jsdom
		props: { initial: 0 }
	});

	expect(document.body.innerHTML).toBe('<button>0</button>');

	// Clic sur le bouton, puis synchronisation des changements pour définir les attentes de manière
	// synchrone
	document.body.querySelector('button').click();
	flushSync();

	expect(document.body.innerHTML).toBe('<button>1</button>');

	// Suppression du composant du DOM
	unmount(component);
});
```

Même le processus est plutôt simple à mettre en place, celui-ci est aussi bas niveau et plutôt
fragile, puisque la structure de composant peut beaucoup évoluer. Des outils comme
[@testing-library/svelte](https://testing-library.com/docs/svelte-testing-library/intro/) peuvent
aider à industrialiser l'écriture de vos tests. Le test ci-dessus peut ainsi être ré-écrit comme
ceci :

```js
/// file: component.test.js
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import Component from './Component.svelte';

test('Component', async () => {
	const user = userEvent.setup();
	render(Component);

	const button = screen.getByRole('button');
	expect(button).toHaveTextContent(0);

	await user.click(button);
	expect(button).toHaveTextContent(1);
});
```

Lorsque vous écrivez des tests de composant qui impliquent des liaisons à double sens, du contexte
ou des props de snippet, il est recommandé de créer un composant parent spécifiquement pour votre
test, et interagir avec ce composant. `@testing-library/svelte` montre quelques [exemples de cette
technique](https://testing-library.com/docs/svelte-testing-library/example).

## Tests E2E avec Playwright [!VO]E2E tests using Playwright

Les tests E2E ("end to end" en anglais, qui se traduit par "de bout en bout") vous permettent de
tester votre application toute entière depuis le point de vue de vos utilisateurs. Cette section
prend [Playwright](https://playwright.dev/) comme exemple, mais vous pouvez aussi utiliser d'autres
solutions comme [Cypress](https://www.cypress.io/) ou [NightwatchJS](https://nightwatchjs.org/).

Pour commencer à utiliser Playwright, vous pouvez soit l'installer via l'[extension VS
Code](https://playwright.dev/docs/getting-started-vscode), soit l'installer depuis votre ligne de
commande en utilisant `npm init playwright`. Vous pouvez aussi l'installer via le CLI d'installation
de Svelte, qui se lance avec `npx sv create`.

Une fois l'installation terminée, vous devriez voir apparaître un dossier `tests` ainsi qu'un
fichier de configuration de Playwright. Il se peut que vous ayez besoin d'ajuster cette
configuration pour dire à Playwright ce qu'il doit faire avant de lancer les tests – principalement
lancer votre application sur un port particulier :

```js
/// file: playwright.config.js
const config = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
};

export default config;
```

Vous pouvez maintenant commencer à écrire vos tests. Ils n'ont aucune conscience que Svelte existe
en tant que framework, il vous faudra donc surtout interagir avec le DOM, et écrire vos assertions.

```js
// @errors: 2307 7031
/// file: tests/hello-world.spec.js
import { expect, test } from '@playwright/test';

test("la page d'accueil a le h1 prévu", async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toBeVisible();
});
```
