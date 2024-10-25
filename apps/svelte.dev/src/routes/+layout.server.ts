import { docs, index } from '$lib/server/content';
import type { BannerData, NavigationLink } from '@sveltejs/site-kit';

const nav_links: NavigationLink[] = [
	{
		title: 'Docs',
		slug: 'docs',
		sections: [docs.topics['docs/svelte'], docs.topics['docs/kit'], docs.topics['docs/cli']].map(
			(topic) => ({
				title: topic.metadata.title,
				path: '/' + topic.slug, // this will make the UI show a flyout menu for the docs nav entry
				sections: topic.children.map((section) => ({
					title: section.metadata.title,
					sections: section.children.map((page) => ({
						title: page.metadata.title,
						path: '/' + page.slug
					}))
				}))
			})
		)
	},
	{
		title: 'Tutoriel',
		slug: 'tutorial',
		sections: index.tutorial.children.map((topic) => ({
			title: topic.metadata.title,
			sections: topic.children.map((section) => ({
				title: section.metadata.title,
				sections: section.children.map((page) => ({
					title: page.metadata.title,
					path:
						'/tutorial/' +
						(page.slug.includes('sveltekit/') ? 'kit' : 'svelte') +
						'/' +
						page.slug.split('/').pop()
				}))
			}))
		}))
	},
	{
		title: 'Bac à sable',
		slug: 'playground'
	},
	{
		title: 'Blog',
		slug: 'blog'
	}
];

const sections: Record<string, string> = {
	docs: 'Docs',
	playground: 'Bac à sable',
	blog: 'Blog',
	tutorial: 'Tutoriel',
	search: 'Recherche'
};

const banner: BannerData = {
	id: 'french-in-progress',
	start: new Date('24 Oct, 2024 00:00:00 UTC'),
	end: new Date('31 Oct, 2026 00:00:00 UTC'),
	arrow: false,
	content: {
		lg: "⚠️ Tout le contenu n'est pas encore traduit ⚠️",
		sm: '⚠️ Traduction en cours... ⚠️'
	},
	href: 'https://github.com/bleucitron/svelte.dev'
	// id: 'sveltehack2024',
	// start: new Date('22 Oct, 2024 00:00:00 UTC'),
	// end: new Date('15 December, 2024 23:59:59 UTC'),
	// arrow: true,
	// content: {
	// 	lg: 'Cast runes, win prizes: SvelteHack 2024',
	// 	sm: 'SvelteHack 2024'
	// },
	// href: 'https://hack.sveltesociety.dev/2024'
};

export const load = async ({ url }) => {
	const nav_title = sections[url.pathname.split('/')[1]!] ?? '';

	return {
		nav_title,
		nav_links,
		banner
	};
};
