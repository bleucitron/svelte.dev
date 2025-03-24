export const prerender = true;

export function GET() {
	return new Response(undefined, {
		status: 302,
		headers: { Location: 'https://discord.gg/75qau7Xuwu' }
	});
}
