import { PRERENDER } from '$env/static/private';
import { docs, index } from '$lib/server/content';
import type { BannerData, NavigationLink } from '@sveltejs/site-kit';

// by default, all pages are prerendered
export const prerender = PRERENDER !== 'false';

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

const banner: BannerData = {
	id: 'french-in-progress',
	start: new Date('24 Oct, 2024 00:00:00 UTC'),
	end: new Date('31 Oct, 2026 00:00:00 UTC'),
	arrow: false,
	content: {
		lg: "⚠️ Le contenu SvelteKit n'est pas encore entièrement traduit ⚠️",
		sm: '⚠️ Traduction en cours... ⚠️'
	},
	href: 'https://github.com/bleucitron/svelte.dev'
};

export const load = async () => {
	return {
		nav_links,
		banner
	};
};
