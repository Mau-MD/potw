<script lang="ts">
	import Countdown from '$lib/components/Countdown.svelte';
	import ProblemCard from '$lib/components/ProblemCard.svelte';
	import supabase from '$lib/db';
	import type { Load } from '.svelte-kit/types/src/routes';
	import {
		differenceInHours,
		getISOWeek,
		nextMonday,
		startOfToday,
		differenceInSeconds
	} from 'date-fns';
	import { slide } from 'svelte/transition';
	import { browser } from '$app/env';
	import Icon from '@iconify/svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let problems: Problem[];

	let currPage = 0;
	$: MAX_PAGES = problems ? Math.ceil(problems.length / 3) : 0;
	const PROBLEMS_PER_PAGE = 3;

	let seconds = differenceInSeconds(nextMonday(startOfToday()), new Date());
	let minutes = Math.floor(seconds / 60);
	seconds %= 60;
	let hours = Math.floor(minutes / 60);
	minutes %= 60;
</script>

<div class="flex items-center justify-center h-full flex-col" transition:slide>
	<h1 class="text-5xl font-bold text-center px-4 md:px-0 ">
		<div class="flex justify-between text-base font-normal mb-5">
			{#if $page.params.number}
				<div
					class="flex items-center cursor-pointer transition-all hover:-translate-x-1 "
					on:click={() => goto(`/week/${Math.max(parseInt($page.params.number) - 1, 1)}`)}
				>
					<Icon icon="akar-icons:chevron-left" class="w-8 h-8 mr-4" />
					Semana Anterior
				</div>
			{:else}
				<div
					class="flex items-center cursor-pointer transition-all hover:-translate-x-1"
					on:click={() => goto(`/week/${getISOWeek(new Date()) - 17}`)}
				>
					<Icon icon="akar-icons:chevron-left" class="w-8 h-8 mr-4" />
					Semana Anterior
				</div>
			{/if}
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

	<div class="flex flex-col gap-4 ">
		{#each Array.from(Array(PROBLEMS_PER_PAGE).keys(), (x) => x + currPage * PROBLEMS_PER_PAGE) as index}
			{#if problems[index]}
				<a sveltekit:prefetch href={`/problems/${encodeURIComponent(problems[index].name)}`}>
					<ProblemCard
						name={problems[index].name}
						platform={problems[index].provider}
						loading={!browser}
						solved={browser && localStorage.getItem(`${problems[index].id}`) === '1'}
						started={browser && localStorage.getItem(`${problems[index].id}`) === '0'}
						challenging={problems[index].challenging}
					/></a
				>
			{/if}
		{/each}
	</div>
	<div />

	<div class="flex gap-2 mt-4">
		{#each Array.from(Array(MAX_PAGES).keys()) as pageIdx}
			<div
				class={`px-4 py-2 bg-gray-100/20 rounded-md cursor-pointer transition-all ${
					pageIdx === currPage ? 'bg-gray-100/40' : ''
				}`}
				on:click={() => (currPage = pageIdx)}
			>
				{pageIdx}
			</div>
		{/each}
	</div>

	<div
		class="relative md:absolute bottom-0 mt-10 md:mt-0 md:bottom-5 text-xl font-bold flex flex-col items-center"
	>
		<span class="font-normal text-sm mb-2 text-gray-300">Siguiente set de problemas</span>
		<Countdown secondsLeft={seconds} minutesLeft={minutes} hoursLeft={hours} />
	</div>
</div>
