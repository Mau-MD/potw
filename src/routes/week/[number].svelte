<script context="module" lang="ts">
	export const load: Load = async ({ params }: { number: number }) => {
		const { data, error } = await supabase
			.from('problems')
			.select()
			.eq('week', params.number)
			.order('id', { ascending: true });

		console.log(data);
		return {
			props: {
				problems: data?.sort((a, b) => a.id - b.id),
				error
			}
		};
	};
</script>

<script lang="ts">
	import ProblemDashboard from '$lib/components/ProblemDashboard.svelte';
	import supabase from '$lib/db';
	import type { Load } from '.svelte-kit/types/src/routes';
	import { differenceInSeconds, nextMonday, startOfToday } from 'date-fns';

	export let problems: Problem[];

	let seconds = differenceInSeconds(nextMonday(startOfToday()), new Date());
	let minutes = Math.floor(seconds / 60);
	seconds %= 60;
	let hours = Math.floor(minutes / 60);
	minutes %= 60;
</script>

<svelte:head>
	<title>Problemas de la Semana | Intern</title>
</svelte:head>

<ProblemDashboard {problems} />

<!-- <div class="flex items-center justify-center h-full flex-col" transition:slide>
	<h1 class="text-5xl font-bold text-center px-4 md:px-0 ">
		<div class="flex justify-between text-base font-normal mb-5">
			<div
				class="flex items-center cursor-pointer transition-all hover:-translate-x-1"
				on:click={() => goto(`/week/${Math.max(parseInt($page.params.number) - 1, 1)}`)}
			>
				<Icon icon="akar-icons:chevron-left" class="w-8 h-8 mr-4" />
				Semana Anterior
			</div>
			{#if parseInt($page.params.number) + 1 <= getISOWeek(new Date()) - 16}
				<div
					class="flex items-center cursor-pointer transition-all hover:translate-x-1"
					on:click={() => goto(`/week/${parseInt($page.params.number) + 1}`)}
				>
					Siguiente Semana
					<Icon icon="akar-icons:chevron-right" class="w-8 h-8 ml-4" />
				</div>
			{/if}
		</div>
		Problemas de la Semana
	</h1>
	<h2 class="text-xl mt-5 text-gray-400 mb-[50px]">Intern CETYS</h2>

	<div class="flex flex-col gap-4">
		{#each problems as problem}
			<a sveltekit:prefetch href={`/problems/${encodeURIComponent(problem.name)}`}>
				<ProblemCard
					name={problem.name}
					platform={problem.provider}
					loading={!browser}
					solved={browser && localStorage.getItem(`${problem.id}`) === '1'}
					started={browser && localStorage.getItem(`${problem.id}`) === '0'}
					challenging={problem.challenging}
				/></a
			>
		{/each}
	</div>

	<div class="absolute bottom-5 text-xl font-bold flex flex-col items-center">
		<span class="font-normal text-sm mb-2 text-gray-300">Siguiente set de problemas</span>
		<Countdown secondsLeft={seconds} minutesLeft={minutes} hoursLeft={hours} />
	</div>
</div> -->
