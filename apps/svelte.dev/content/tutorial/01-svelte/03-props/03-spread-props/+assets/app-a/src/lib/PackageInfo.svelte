<script>
	let { name, version, description, website } = $props();
</script>

<p>
	Le paquet <code>{name}</code> est {description}. Téléchargez la version {version} sur
	<a href="https://www.npmjs.com/package/{name}">npm</a> et <a href={website}>apprenez-en plus ici</a>
</p>
