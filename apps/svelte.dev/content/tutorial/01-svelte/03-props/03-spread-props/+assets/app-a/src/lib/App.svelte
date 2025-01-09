<script>
	import PackageInfo from './PackageInfo.svelte';

	const pkg = {
		name: 'svelte',
		version: 5,
		description: 'rapide comme l\'éclair',
		website: 'https://sveltefr.dev'
	};
</script>

<PackageInfo
	version={pkg.version}
	description={pkg.description}
	website={pkg.website}
/>
