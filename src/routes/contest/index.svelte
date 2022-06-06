<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';

	import ContestUser from '$lib/components/ContestUser.svelte';
	import Icon from '@iconify/svelte';

	export let prevLeetcodeData: LeetcodeUser[] = [];
	export let currLeetcodeData: LeetcodeUser[] = [];

	let showGuests = false;
	let previousPath = '';

	afterNavigate((navigation) => {
		previousPath = navigation.from?.pathname || '/';
		if (previousPath === navigation.to.pathname) {
			previousPath = '/';
		}
	});

	export let images = [
		'https://i.imgur.com/Sc0JHaF.jpg',
		'https://i.imgur.com/RZ8F58R.jpg',
		'https://i.imgur.com/KQbpFf2.jpg',
		'https://i.imgur.com/ItW7cAs.jpg',
		'https://i.imgur.com/Ksp5CWp.jpg',
		'https://i.imgur.com/L6FVwvB.jpg'
	];
</script>

<svelte:head>
	<title>Concurso | Intern</title>
</svelte:head>
<div
	class="flex items-center justify-center gap-4 mt-10 absolute left-10 px-4 py-2 rounded-md transition-all hover:bg-white hover:text-black"
	on:click={() => goto(previousPath)}
>
	<Icon icon="akar-icons:chevron-left" class="w-4 h-4" />
	<button>Atras</button>
</div>
<div
	class="md:w-[80vw] m-auto min-h-min flex flex-col items-center justify-center  mb-10 md:my-10 my-20"
	style="min-height: inherit;"
>
	<div class="mb-20 text-center ">
		<h1 class="text-4xl font-bold mb-2 ">Concurso Leetcode</h1>
		<p class="text-gray-200">Primero que llegue a 150 puntos gana.</p>
		<p class="text-gray-200">Easy > 1 - Medium > 3 - Hard > 5</p>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-5  w-full  gap-10">
		{#each currLeetcodeData as user, i}
			{#if i < 5}
				<ContestUser
					{user}
					prevUser={prevLeetcodeData[i]}
					photo={images[i]}
					guest={i >= 5}
					index={i}
				/>
			{/if}
		{/each}
	</div>

	{#if showGuests}
		<div class="grid grid-cols-1 md:grid-cols-1  w-full  gap-10 mt-20">
			{#each currLeetcodeData as user, i}
				{#if i >= 5}
					<ContestUser
						{user}
						prevUser={prevLeetcodeData[i]}
						photo={images[i]}
						guest={i >= 5}
						index={i}
					/>
				{/if}
			{/each}
		</div>
	{/if}
	<button
		class="border-2 border-white px-4 py-2 rounded-md transition-all hover:bg-white hover:text-black mt-20"
		on:click={() => (showGuests = !showGuests)}
		>{showGuests ? 'Ocultar Invitados' : 'Ver Invitados'}</button
	>
</div>
