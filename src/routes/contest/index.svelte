<script lang="ts">
	import ContestUser from '$lib/components/ContestUser.svelte';

	export let prevLeetcodeData: LeetcodeUser[] = [];
	export let currLeetcodeData: LeetcodeUser[] = [];

	export let images = [
		'https://i.imgur.com/Sc0JHaF.jpg',
		'https://i.imgur.com/RZ8F58R.jpg',
		'https://i.imgur.com/KQbpFf2.jpg',
		'https://i.imgur.com/ItW7cAs.jpg',
		'https://i.imgur.com/Ksp5CWp.jpg'
	];
</script>

<div
	class="md:w-[80vw] m-auto min-h-min flex flex-col items-center justify-center  mb-10 md:my-10 my-20"
	style="min-height: inherit;"
>
	<div class="mb-20 text-center ">
		<h1 class="text-4xl font-bold mb-2 ">Concurso Leetcode</h1>
		<p class="text-gray-200">Primero que llegue a 65 puntos gana.</p>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-5 w-full md:gap-0 gap-10">
		{#each currLeetcodeData as user, i}
			<ContestUser {user} prevUser={prevLeetcodeData[i]} photo={images[i]} />
		{/each}
	</div>
</div>
