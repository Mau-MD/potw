<script lang="ts">
	import '../app.css';
	import bg from '$lib/assets/hero.jpg';

	import NProgress from 'nprogress';
	import { navigating } from '$app/stores';
	import 'nprogress/nprogress.css';

	$: {
		if ($navigating) {
			NProgress.start();
		}

		if (!$navigating) {
			NProgress.done();
		}
	}
</script>

<svelte:head>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://potw.vercel.app" />
	<meta property="og:title" content="Problemas de la Semana" />
	<meta property="og:description" content="Tres problemas para resolver a la semana:)" />
</svelte:head>
<main>
	<div
		class="bg-[#0C1221] text-white min-h-[110vh] md:min-h-[100vh] w-[100vw] bg-right overflow-x-hidden"
		style="background-image: url({bg});"
	>
		<slot />
	</div>
</main>
