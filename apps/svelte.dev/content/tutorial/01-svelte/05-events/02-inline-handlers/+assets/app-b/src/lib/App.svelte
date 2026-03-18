<script>
	let m = $state({ x: 0, y: 0 });
</script>

<div
	onpointermove={(event) => {
		m.x = event.clientX;
		m.y = event.clientY;
	}}
	role="presentation"
>
	Le pointeur se trouve à la position {Math.round(m.x)} x {Math.round(m.y)}
</div>

<style>
	div {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		padding: 1rem;
	}
</style>
