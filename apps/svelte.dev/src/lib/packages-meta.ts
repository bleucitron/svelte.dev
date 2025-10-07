import type { PackageDefinition, PackageKey, PackageManual, PackageNpm } from './server/content';

const FEATURED: {
	title: string;
	description?: string;
	packages: PackageDefinition[];
}[] = [
	{
		title: 'Adds-ons pour le CLI de Svelte',
		description:
			'Le <a href="/docs/cli">CLI de Svelte</a> vous permet d\'ajouter instantanément des fonctionnalités à un nouveau projet ou à un projet existant, grâce à <code>npx sv add</code>',
		packages: [
			{
				name: 'tailwindcss',
				svAlias: 'tailwind',
				description: 'Un framework CSS centré sur des utilitaires'
			},
			{
				name: 'drizzle-orm',
				svAlias: 'drizzle',
				description:
					"Un ORM TypeScript compatible serverless vous offrant des requêtes d'APIs à la fois relationelles et SQL-like"
			},
			{
				name: 'mdsvex',
				svAlias: 'mdsvex',
				description:
					'Un pré-processeur Markdown vous permettant de mettre du Mardown dans votre code Svelte et du code Svelte dans votre Markdown'
			},
			{
				name: 'lucia',
				svAlias: 'lucia',
				description:
					"Un outil d'authentification basé sur des mots de passe de sessions et utilisant Drizzle"
			},
			{
				name: 'storybook',
				svAlias: 'storybook',
				description: "Développez, documentez et testez vos composants d'interface en isolation"
			},
			{
				name: 'prettier',
				svAlias: 'prettier',
				description: 'Un formatteur code avec des opinions'
			},
			{
				name: 'eslint',
				svAlias: 'eslint',
				description: 'Trouvez et corrigez les problèmes dans votre code'
			},
			{ name: 'vitest', svAlias: 'vitest', description: 'Un framework de tests basé sur Vite' },
			{
				name: 'playwright',
				svAlias: 'playwright',
				description: "De l'automatisation de navigateur permettant de faire des tests end-to-end"
			},
			{
				name: '@inlang/paraglide-js',
				svAlias: 'paraglide',
				description:
					'Une librairie i18n basée sur un compilateur qui émet des fonctions de message pouvant être tree-shakées'
			},
			{
				name: 'vite-plugin-devtools-json',
				svAlias: 'devtools-json',
				description:
					'Génère des paramètres de project pour les DevTools de Chromium lors de vos développements'
			}
		]
	},
	{
		title: 'Librairies de composants',
		packages: [
			{
				name: 'shadcn-svelte',
				description: 'Un portage de shadcn/ui, construit avec Bits UI et Tailwind CSS'
			},
			{
				name: 'bits-ui',
				description: 'Des primitives headless de composants — ajoutez vos propres styles'
			},
			{
				name: '@skeletonlabs/skeleton',
				description: 'Un système de design adaptatif basé sur Tailwind CSS'
			},
			{
				name: 'flowbite-svelte',
				description:
					"Un portage officiel pour Svelte de Flowbite, une librairie d'interface basé sur Tailwind CSS"
			},
			{
				name: '@ark-ui/svelte',
				description: 'Une librairie de composants headless basée sur Zag.js'
			},
			{
				name: 'daisyui',
				description: 'Un ensemble de classes encapsulant les styles Tailwind CSS'
			},
			{ name: 'svelte-material-ui', description: 'Une implémentation de Material UI (Google)' },
			{ name: 'carbon-components-svelte' },
			{
				name: 'melt',
				description: 'Une librairie de composants headless bas niveau'
			},
			{ name: '@sveltestrap/sveltestrap' }
		]
	},
	{
		title: 'Adaptateurs SvelteKit',
		packages: [
			{ name: '@sveltejs/adapter-node', description: 'Compile un serveur Node autonome' },
			{
				name: '@sveltejs/adapter-cloudflare',
				description: 'Compile votre application pour Cloudflare'
			},
			{ name: '@sveltejs/adapter-netlify', description: 'Compile votre application pour Netlify' },
			{ name: '@sveltejs/adapter-vercel', description: 'Compile votre application pour Vercel' },
			{ name: '@sveltejs/adapter-static', description: 'Compile votre site statique' },
			{ name: '@deno/svelte-adapter', description: 'Compile votre application pour Deno Deploy' },
			{ name: 'amplify-adapter', description: 'Compile votre application pour AWS Amplify' },
			{
				name: 'svelte-kit-sst',
				description: 'Compile votre application pour AWS Lambda et AWS Lamda@Edge'
			},
			{ name: 'svelte-adapter-bun', description: 'Compile votre application pour Bun' },
			{
				name: 'svelte-adapter-appengine',
				description: 'Compile votre application pour Google Cloud App Engine'
			},
			{
				name: 'sveltekit-adapter-chrome-extension',
				description:
					"Compile votre application en tant qu'extension Chrome utilisant un manifeste v3"
			},
			{
				name: '@slicemachine/adapter-sveltekit',
				description: 'Intégration avec la Slice Machine de Prismic'
			}
		]
	},
	{
		title: 'Contenu',
		packages: [
			{
				name: 'mdsvex',
				description:
					'Mettez du Markdown dans vos fichiers Svelte et du code Svelte dans vos fichiers Markdown'
			},
			{
				name: '@content-collections/core',
				description: 'Transformez votre contenu en collections de données typées'
			},
			{
				name: 'svelte-exmarkdown',
				description: 'Composant extensible pour faire du rendu Markdown'
			},
			{
				name: '@magidoc/plugin-svelte-marked',
				description: 'Parser de Markdown qui supporte Github Flavored Markdown'
			},
			{
				name: '@prismicio/svelte',
				description: 'Composant et utilitaires permettant de récupérer du contenu Prismic'
			},
			{ name: 'carta-md' },
			{
				name: '@sveltepress/vite',
				description: 'Un outil de création de site centré sur le contenu'
			},
			{
				name: '@evidence-dev/evidence',
				description:
					'Un framework permettant de construire et de publier des produits basés sur des données en utilisant SQL, Markdown, and AI'
			},
			{ name: 'svelte-pdf', description: 'Fait le rendu de documents PDF en utilisant PDF.js' },
			{ name: 'typewriter-editor' }
		]
	},
	{
		title: 'Dataviz',
		packages: [
			{
				name: 'layerchart',
				description:
					'Composants de graphiques composables permettant de construire une grande variété de visualisations'
			},
			{
				name: 'layercake',
				description: 'Crée des graphiques responsives pouvant fonctionner sans JavaScript'
			},
			{
				name: 'svelte-maplibre',
				description:
					'Publiez des cartes sur votre site avec du rendu de tuiles vectorielles accéléré par GPU'
			},
			{
				name: '@xyflow/svelte',
				description:
					'Composant personnalisable permettant de construire des interfaces et diagrammes basés sur des noeuds'
			},
			{
				name: 'svelte-maplibre-gl',
				description: 'Construisez de cartes web interactives avec MapLibre GL'
			}
		]
	},
	{
		title: 'Auth',
		packages: [
			{ name: 'better-auth', description: "Bibliothèque complète d'authentification" },
			{
				name: '@supabase/ssr',
				description:
					"Bibliothèque server-side pour faire de l'authentification basée sur des cookies avec SvelteKit"
			},
			{
				name: 'altcha',
				description:
					"Widget CAPTCHA orienté vie privée, respectant les régulations internationales et les critères d'accessibilité WCAG"
			},
			{
				name: 'svelte-clerk',
				description: 'Implémentation non-officielle de Clerk'
			},
			{ name: 'svelte-session-manager', description: 'Store de session JWT' },
			{
				name: 'svelte-kit-sessions',
				description: 'Bibliothèque de gestion de session pour SvelteKit'
			},
			{ name: '@passlock/sveltekit' }
		]
	},
	{
		title: 'Services tiers',
		packages: [
			{ name: '@sentry/svelte' },
			{ name: '@sentry/sveltekit' },
			{ name: 'svelte-stripe', description: 'Ajoutez des éléments Stripe à votre projet' },
			{
				name: 'svelte-clerk',
				description: 'Implémentation non officielle de Clerk'
			},
			{
				name: '@storyblok/svelte',
				description: 'Intégration du CMS headless Storyblok dans votre projet'
			},
			{
				name: '@inlang/paraglide-js',
				description:
					'Une bibliothèque i18n basée sur un compilateur qui génère des fonctions de messages pouvant être tree-shakées'
			}
		]
	},
	{
		title: 'Internationalisation (i18n)',
		packages: [
			{
				name: '@inlang/paraglide-js',
				description:
					'Une bibliothèque i18n basée sur un compilateur qui génère des fonctions de messages pouvant être tree-shakées'
			},
			{ name: '@wuchale/svelte', description: "De l'i18n Protobuf-like à partir de code brut" },
			{ name: 'i18n-js' }
		]
	},
	{
		title: 'Media',
		packages: [
			{ name: '@sveltejs/enhanced-img' },
			{
				name: '@unpic/svelte',
				description: "Composant responsif d'image qui s'intègre avec les CDNs populaires"
			},
			{ name: '@poppanator/sveltekit-svg' },
			{ name: 'svelte-easy-crop', description: 'Un composant permettant de cropper les images' },
			{
				name: '@uppy/svelte',
				description:
					'Uploadez des fichiers depuis votre ordinateur ou depuis des services de stockage en ligne'
			},
			{ name: 'scrolly-video' }
		]
	},
	{
		title: 'Composants individuels',
		packages: [
			{
				name: '@tanstack/svelte-table',
				description:
					'Interfaces headless permettant de construire des tables et grilles de données puissantes'
			},
			{
				name: '@ai-sdk/svelte',
				description:
					"Bibliothèque permettant de construire des applications et agents basés sur l'IA"
			},
			{
				name: '@tanstack/svelte-virtual',
				description: 'Interfaces headless permettant de virtualiser des éléments de défilement'
			},
			{
				name: 'virtua',
				description:
					'Un composant de liste et grille virtuelles, sans configuration, rapide et léger (~3kO)'
			},
			{ name: '@event-calendar/core' }
		]
	},
	{
		title: 'Animations',
		packages: [
			{ name: '@threlte/core' },
			{ name: '@neoconfetti/svelte', description: 'Explosion de confettis' },
			{ name: 'svelte-motion', description: "Bibliothèque d'animation basé sur framer-motion" },
			{ name: '@lottiefiles/svelte-lottie-player', description: "Lecteur d'animation Lottie" },
			{
				name: '@tsparticles/svelte',
				description:
					"Créez facilement des effets personnalisables de particules, de confettis et de feux d'artifices"
			}
		]
	},
	{
		title: 'SEO',
		packages: [
			{
				name: 'svelte-meta-tags',
				description:
					'Composants de référencement avec des fonctionnalités puissantes et du support pour JSON-LD'
			},
			{
				name: 'super-sitemap',
				description:
					"Un générateur de sitemap SvelteKit rendant impossible pour vous d'oublier d'ajouter vos paths"
			},
			{
				name: 'svelte-seo',
				description: 'Ajoutez des balises meta, Open Graph et JSON-LD à votre site'
			},
			{
				name: 'svead',
				description:
					'Définissez des données meta, canoniques, de titre, pour les balises Open Graph Twitter et Facebook, ainsi que des données schema.org'
			}
		]
	},
	{
		title: 'Outillage dev',
		packages: [
			{ name: 'svelte-render-scan', description: 'Outil de déboggage visuel' },
			{ name: 'svelte-inspect-value', description: "Composant permettant d'inspecter des valeurs" }
		]
	},
	{
		title: 'Icônes',
		description:
			'Voir la <a href="/docs/kit/icons">documentation sur les icônes</a> pour les bonnes pratiques lorsque vous utilisez une bibliothèque d\'icônes',
		packages: [
			{ name: '@iconify/tailwind4' },
			{ name: '@unocss/preset-icons' },
			{ name: '@lucide/svelte', description: 'De jolies icônes consistantes' },
			{ name: 'svelte-awesome', description: 'Des icônes Font Awesome pour Svelte' },
			{ name: 'phosphor-svelte', description: "Une famille d'icônes propres" },
			{ name: 'unplugin-icons', description: 'Un plugin Vite qui fournit des icônes à la demande' }
		]
	},
	{
		title: 'Tests',
		description:
			'Vous pouvez trouver la <a href="/docs/svelte/testing">documentation sur les tests</a> pertinente lors de la mise en place',
		packages: [
			{
				name: '@testing-library/svelte',
				description: 'Utilitaires de tests pour les interactions DOM'
			},
			{
				name: 'playwright',
				description: "Des outils d'automatisation de navigateur pour les tests end-to-end"
			},
			{ name: 'vitest' }
		]
	},
	{
		title: 'Plugins de bundler',
		description:
			'Si vous utilisez SvelteKit ou un framework similaire, cette partie est déjà gérée. Si vous <a href="/docs/svelte/getting-started#Alternatives-to-SvelteKit">mettez les choses en place vous-même</a>, vous aurez besoin d\'plugin pour dire à votre bundler comment compiler les fichiers Svelte',
		packages: [
			{ name: '@sveltejs/vite-plugin-svelte' },
			{ name: 'rollup-plugin-svelte' },
			{ name: 'svelte-loader', description: 'Compilez les composants Svelte avec webpack' },
			{ name: 'esbuild-svelte', description: 'Compilez les composants Svelte avec esbuild' }
		]
	},
	{
		title: 'Routing',
		description:
			'Le routeur officiel est <a href="/docs/kit">SvelteKit</a>, mais voici quelques alternatives',
		packages: [
			{ name: 'svelte5-router' },
			{ name: '@roxi/routify', description: 'Routes basée sur la structure de fichiers' },
			{ name: 'svelte-pathfinder', description: "Un routeur léger basé sur l'état" },
			{ name: 'universal-router' }
		]
	},
	{
		title: 'Chargement de données',
		description:
			'Nous recommandons d\'utiliser les <a href="/docs/kit/remote-functions">fonctions distantes</a>, mais pour des besoins spécifiques vous pouvez utiliser ces alternatives',
		packages: [
			{
				name: '@tanstack/svelte-query',
				description:
					'Primitives permettant de gérer, mettre en cache, et synchroniser des données distantes asynchrones'
			},
			{ name: '@urql/svelte', description: 'Client GraphQL personnalisable' },
			{ name: 'houdini', description: 'Le framework GraphQL qui disparaît' },
			{
				name: 'trpc-sveltekit',
				description: 'Un adaptateur SvelteKit pour tRPC.io qui supporte Node, Vercel et Netlify'
			},
			{
				name: '@orpc/svelte-query',
				description: 'Des APIs typées de bout en bout et qui respectent les standard OpenAPI'
			},
			{ name: 'sswr' }
		]
	},
	{
		title: 'Formulaires',
		description:
			'SvelteKit a une <a href="/docs/kit/remote-functions#form">gestion des formulaires intégrées</a>, mais vous pouvez aussi utiliser ces paquets',
		packages: [
			{
				name: 'sveltekit-superforms',
				description: 'Bibliothèque de validation de formulaire client-side et server-side'
			},
			{
				name: 'formsnap',
				description: 'Composants de formulaires accessibles basés sur sveltekit-superforms'
			},
			{ name: 'felte', description: 'Une bibliothèque de formulaire extensible' },
			{ name: '@tanstack/svelte-form', description: 'Des formulaires typées et puissants' }
		]
	}
];

const OFFICIAL = [
	/^@sveltejs\//,
	'prettier-plugin-svelte',
	'svelte',
	'svelte2tsx',
	'eslint-plugin-svelte',
	'sv',
	'svelte-loader',
	'rollup-plugin-svelte'
];
function is_official(pkg: string): boolean {
	for (const official of OFFICIAL) {
		if (official instanceof RegExp) {
			if (official.test(pkg)) return true;
			continue;
		}

		if (official === pkg) return true;
	}

	return false;
}

function is_outdated(iso: string): boolean {
	// 2 years
	return +new Date() - +new Date(iso) > 2 * 365 * 24 * 60 * 60 * 1000;
}

/**
 * Checks if a semver range supports Svelte versions 3.x, 4.x, and 5.x
 */
function supports_svelte_versions(version_range: string): {
	3: boolean;
	4: boolean;
	5: boolean;
} {
	if (!version_range) return { 3: false, 4: false, 5: false };

	// Initialize result object
	const result = { 3: false, 4: false, 5: false };

	// Handle version range with OR operators first before any other processing
	if (version_range.includes('||')) {
		const ranges = version_range.split('||').map((r) => r.trim());

		// Check each range and combine results with OR logic
		for (const range of ranges) {
			const range_result = supports_svelte_versions(range);
			result[3] = result[3] || range_result[3];
			result[4] = result[4] || range_result[4];
			result[5] = result[5] || range_result[5];
		}

		return result;
	}

	// Handle exact version with equals sign
	if (version_range.startsWith('=')) {
		const exact_version = version_range.substring(1);
		return supports_svelte_versions(exact_version);
	}

	// Handle hyphen ranges directly (not part of a complex expression)
	if (version_range.includes(' - ')) {
		// Split by hyphen and trim whitespace
		const parts = version_range.split('-').map((p) => p.trim());
		// Handle "x - y" format correctly
		if (parts.length === 2) {
			const start = parseFloat(parts[0]);
			const end = parseFloat(parts[1]);

			result[3] = start <= 3 && end >= 3;
			result[4] = start <= 4 && end >= 4;
			result[5] = start <= 5 && end >= 5;

			return result;
		}
	}

	// Handle complex version ranges with both upper and lower bounds in the same expression
	// Examples: ">=1.0.0 <=4.9.9", ">=3.0.0 <6.0.0", ">3.0.0-rc.1 <3.1.0"
	if (
		version_range.includes(' ') &&
		(version_range.includes('<') ||
			version_range.includes('<=') ||
			version_range.includes('>=') ||
			version_range.includes('>'))
	) {
		// Process for complex range with multiple constraints
		let includes_version_3 = true;
		let includes_version_4 = true;
		let includes_version_5 = true;

		// Split by spaces to get individual constraints
		const constraints = version_range
			.split(' ')
			.filter(
				(c) => c.startsWith('<') || c.startsWith('<=') || c.startsWith('>') || c.startsWith('>=')
			);

		// If we couldn't parse any valid constraints, return false
		if (constraints.length === 0) {
			return { 3: false, 4: false, 5: false };
		}

		// Special case handling for pre-release specific ranges (e.g., ">3.0.0-rc.1 <3.1.0")
		if (constraints.some((c) => c.includes('-'))) {
			// Identify if this is a narrow range for a specific major version
			let major_version = null;

			for (const constraint of constraints) {
				const match = constraint.match(/[<>=]+\s*(\d+)/);
				if (match) {
					const version = parseInt(match[1]);
					if (major_version === null) {
						major_version = version;
					} else if (major_version !== version) {
						major_version = null; // Different major versions, not a narrow range
						break;
					}
				}
			}

			// If we identified a specific major version for this pre-release constraint
			if (major_version !== null) {
				result[3] = major_version === 3;
				result[4] = major_version === 4;
				result[5] = major_version === 5;
				return result;
			}
		}

		for (const constraint of constraints) {
			if (constraint.startsWith('>=')) {
				const version_number = parseFloat(constraint.substring(2));
				// Check lower bounds for each version
				if (version_number > 3) includes_version_3 = false;
				if (version_number > 4) includes_version_4 = false;
				if (version_number > 5) includes_version_5 = false;
			} else if (constraint.startsWith('>')) {
				const version_number = parseFloat(constraint.substring(1));
				// Check lower bounds for each version
				if (version_number >= 3) includes_version_3 = false;
				if (version_number >= 4) includes_version_4 = false;
				if (version_number >= 5) includes_version_5 = false;
			} else if (constraint.startsWith('<=')) {
				const version_number = parseFloat(constraint.substring(2));
				// Check upper bounds for each version
				if (version_number < 3) includes_version_3 = false;
				if (version_number < 4) includes_version_4 = false;
				if (version_number < 5) includes_version_5 = false;
			} else if (constraint.startsWith('<')) {
				const version_number = parseFloat(constraint.substring(1));
				// Check upper bounds for each version
				if (version_number <= 3) includes_version_3 = false;
				if (version_number <= 4) includes_version_4 = false;
				if (version_number <= 5) includes_version_5 = false;
			}
		}

		result[3] = includes_version_3;
		result[4] = includes_version_4;
		result[5] = includes_version_5;

		return result;
	}

	// Handle exact major version format
	if (/^[0-9]+$/.test(version_range)) {
		const version = parseInt(version_range);
		result[3] = version === 3;
		result[4] = version === 4;
		result[5] = version === 5;
		return result;
	}

	// Handle caret ranges
	if (version_range.startsWith('^')) {
		const major_version = parseInt(version_range.substring(1).split('.')[0]);
		result[3] = major_version === 3;
		result[4] = major_version === 4;
		result[5] = major_version === 5;
		return result;
	}

	// Handle pre-release versions directly (e.g., 5.0.0-next.42)
	if (/^([0-9]+)\.([0-9]+)\.([0-9]+)-/.test(version_range)) {
		const match = version_range.match(/^([0-9]+)\./);
		if (match) {
			// Extract major version from the pre-release
			const major_version = parseInt(match[1]);
			result[3] = major_version === 3;
			result[4] = major_version === 4;
			result[5] = major_version === 5;
			return result;
		}
	}

	// Handle tilde ranges
	if (version_range.startsWith('~')) {
		const major_version = parseInt(version_range.substring(1).split('.')[0]);
		result[3] = major_version === 3;
		result[4] = major_version === 4;
		result[5] = major_version === 5;
		return result;
	}

	// Handle wildcard (*) by itself, which means any version
	if (version_range === '*') {
		return { 3: true, 4: true, 5: true };
	}

	// Handle * and x ranges (e.g., "3.x", "4.*")
	if (/^([0-9]+)\.(x|\*)/.test(version_range)) {
		const match = version_range.match(/^([0-9]+)\./);
		if (match) {
			const major_version = parseInt(match[1]);
			result[3] = major_version === 3;
			result[4] = major_version === 4;
			result[5] = major_version === 5;
			return result;
		}
	}

	// Handle >= ranges
	if (version_range.startsWith('>=')) {
		const version_number = parseFloat(version_range.substring(2));
		result[3] = version_number <= 3;
		result[4] = version_number <= 4;
		result[5] = version_number <= 5;
		return result;
	}

	// Handle > ranges
	if (version_range.startsWith('>')) {
		const version_number = parseFloat(version_range.substring(1));
		result[3] = version_number < 3;
		result[4] = version_number < 4;
		result[5] = version_number < 5;
		return result;
	}

	// Handle <= ranges
	if (version_range.startsWith('<=')) {
		const version_number = parseFloat(version_range.substring(2));
		result[3] = version_number >= 3;
		result[4] = version_number >= 4;
		result[5] = version_number >= 5;
		return result;
	}

	// Handle < ranges
	if (version_range.startsWith('<')) {
		const version_number = parseFloat(version_range.substring(1));
		result[3] = version_number > 3;
		result[4] = version_number > 4;
		result[5] = version_number > 5;
		return result;
	}

	// Handle exact versions (like 3.0.0, 4.1.2, etc.)
	if (/^[0-9]+\.[0-9]+\.[0-9]+$/.test(version_range)) {
		const major_version = parseInt(version_range.split('.')[0]);
		result[3] = major_version === 3;
		result[4] = major_version === 4;
		result[5] = major_version === 5;
		return result;
	}

	// Handle x-ranges (3.x.x, 4.x, etc.)
	if (version_range.includes('.x') || version_range.includes('.*')) {
		const major_version = parseInt(version_range.split('.')[0]);
		result[3] = major_version === 3;
		result[4] = major_version === 4;
		result[5] = major_version === 5;
		return result;
	}

	return result;
}

function remove_ending_by(str: string, endings: string[]): string {
	for (const ending of endings) {
		if (str.endsWith(ending)) {
			return str.slice(0, -ending.length);
		}
	}
	return str;
}

function calculate_description(pkg: PackageKey & PackageNpm): string {
	const found = FEATURED.flatMap((f) => f.packages).find((p) => p.name === pkg.name);
	if (found && found.description) return remove_ending_by(found.description, ['.']);

	let desc = pkg.npm_description ?? 'NO DESCRIPTION!';
	const replaces = [
		// strip out markdown links
		{ key: /\[(.*?)\]\((.*?)\)/g, value: '$1' }
	];
	for (const { key, value } of replaces) {
		desc = desc.replace(key, value);
	}
	return remove_ending_by(desc, ['.']);
}

function calculate_homepage(pkg: PackageKey & PackageNpm): string {
	return remove_ending_by(pkg.homepage ?? '', ['#readme']);
}

export const PACKAGES_META = {
	FEATURED,

	calculate_description,
	calculate_homepage,

	is_official,
	is_outdated,
	supports_svelte_versions
};
