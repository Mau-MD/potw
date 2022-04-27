<script context="module" lang="ts">
	export async function load({}: Load) {
		const { data, error } = await supabase
			.from('problems')
			.select()
			.eq('week', getISOWeek(new Date()) - 16);

		return {
			props: {
				problems: data,
				error
			}
		};
	}
</script>

<script lang="ts">
	import Countdown from '$lib/components/Countdown.svelte';
	import ProblemCard from '$lib/components/ProblemCard.svelte';
	import supabase from '$lib/db';
	import type { Load } from '.svelte-kit/types/src/routes';
	import { differenceInHours, getISOWeek, nextMonday, startOfToday } from 'date-fns';
	import { slide } from 'svelte/transition';

	export let problems: Problem[];
</script>

<div class="flex items-center justify-center h-full flex-col" transition:slide>
	<h1 class="text-5xl font-bold text-center px-4 md:px-0 ">Problemas de la Semana</h1>
	<h2 class="text-xl mt-5 text-gray-400 mb-[100px]">Intern CETYS</h2>

	<div class="flex flex-col gap-4">
		{#each problems as problem}
			<a sveltekit:prefetch href={`/problems/${encodeURIComponent(problem.name)}`}>
				<ProblemCard
					name={problem.name}
					platform={problem.provider}
					solved={localStorage.getItem(`${problem.id}`) === '1'}
					started={localStorage.getItem(`${problem.id}`) === '0'}
				/></a
			>
		{/each}
	</div>

	<div class="absolute bottom-5 text-xl font-bold flex flex-col items-center">
		<span class="font-normal text-sm mb-2 text-gray-300">Siguiente set de problemas</span>
		<Countdown hoursLeft={differenceInHours(nextMonday(startOfToday()), new Date())} />
	</div>
</div>
