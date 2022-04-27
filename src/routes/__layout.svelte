<script lang="ts">
	import '../app.css';
	import bg from '$lib/assets/hero.jpg';
</script>

<main>
	<div
		class="bg-[#0C1221] text-white h-[100vh] w-[100vw] bg-right overflow-x-hidden"
		style="background-image: url({bg});"
	>
		<slot />
	</div>
</main>
