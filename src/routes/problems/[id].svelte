<script lang="ts" context="module">
	export async function load({ params }: Load) {
		const { data, error } = await supabase.from('problems').select().eq('name', params.id);

		return {
			props: {
				problem: data && data[0],
				error
			}
		};
	}
</script>

<script lang="ts">
	import { browser } from '$app/env';

	import { goto, invalidate } from '$app/navigation';
	import supabase from '$lib/db';
	import Icon from '@iconify/svelte';
	import type { Load } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	export let problem: Problem;

	let solved = false;
	let showSubjects = false;
	let showSolved = false;

	let seconds = 0;
	let minutes = 0;
	let hours = 0;

	let interval: NodeJS.Timer;
	let saveInterval: NodeJS.Timer;

	let input = '';

	onMount(() => {
		const time = JSON.parse(localStorage.getItem(`time-${problem.id}`) || '0') as {
			seconds: string;
			minutes: string;
			hours: string;
		};

		if (!time) return;

		hours = parseInt(time.hours);
		minutes = parseInt(time.minutes);
		seconds = parseInt(time.seconds);

		solved = localStorage.getItem(`${problem.id}`) === '1';
		showSubjects = solved;
		showSolved = solved;
	});

	function startTimer() {
		if (localStorage.getItem(`${problem.id}`) !== '1') {
			localStorage.setItem(`${problem.id}`, '0');
		}
		interval = setInterval(() => {
			seconds++;
			if (seconds >= 60) {
				seconds = 0;
				minutes++;
				if (minutes >= 60) {
					minutes = 0;
					hours++;
				}
			}
		}, 1000);

		// Every 30 seconds, save the time to local storage
		saveInterval = setInterval(() => {
			localStorage.setItem(
				`time-${problem.id}`,
				JSON.stringify({
					hours,
					minutes,
					seconds
				})
			);
		}, 5000);
	}

	function stopTimer() {
		clearInterval(interval);
		clearInterval(saveInterval);
	}

	function addLeadingZero(num: number) {
		if (num < 10) {
			return '0' + num;
		}
		return num;
	}

	async function makeSubmission() {
		await supabase
			.from('problems')
			.update({ solvedBy: [...problem.solvedBy, input] })
			.match({ name: problem.name });
		localStorage.setItem(`${problem.id}`, '1');
		input = '';
	}
</script>

<svelte:head>
	<title>{problem.name} | Intern</title>
</svelte:head>

<div class="w-3/4 m-auto my-16" transition:slide>
	<div
		class="flex items-center justify-center flex-col md:flex-row cursor-pointer"
		on:click={() => goto('/')}
	>
		<Icon icon="simple-icons:leetcode" class="w-16 h-16 md:mr-6 mb-2 md:mb-0" />
		<h1 class="text-xl font-bold">{problem.name}</h1>
		<a class="md:ml-auto" href={problem.url} target="_blank">
			<button
				class="md:ml-auto  ml-auto px-8 py-2 border-2 rounded transition-all hover:bg-white hover:text-slate-800 my-5 md:my-0 mb-20 md:mb-0"
				>Ver problema</button
			>
		</a>
	</div>
	<div class="flex justify-center items-center flex-col ">
		<h2 class="text-xl font-bold">{solved ? 'Tiempo Transcurrido' : 'Temporizador'}</h2>
		<div class={'w-full md:w-1/2'}>
			<div class="w-full text-center text-7xl my-5">
				{addLeadingZero(hours)}:{addLeadingZero(minutes)}:{addLeadingZero(seconds)}
			</div>
			{#if !solved}
				<div class="flex justify-around items-center flex-col md:flex-row">
					<button
						class="py-2 mt-4 w-full sm:w-2/6 border-2 border-white/50  text-center rounded rounded-l-none bg-slate-500/10 transition-all hover:bg-slate-900"
						on:click={startTimer}
						>Empezar
					</button>
					<button
						class="py-2 mt-4 w-full sm:w-2/6 border-2 border-white/50  text-center rounded rounded-l-none bg-slate-500/10 transition-all hover:bg-slate-900"
						on:click={stopTimer}
						>Pausar
					</button>
				</div>
			{/if}
		</div>
		{#if !solved}
			<h2 class="text-xl mt-20 font-bold">¿Resolviste el problema?</h2>
			<div class={'w-full md:w-1/2 flex flex-col md:flex-row'}>
				<input
					bind:value={input}
					class="py-2 px-4 mt-4 w-full md:w-4/6 border-2 border-white/50 md:border-r-0 rounded md:rounded-r-none bg-slate-500/10 transition-all shadow-md shadow-pink-300/20 focus:outline-none focus:shadow-lg focus:shadow-pink-300/20"
					placeholder="Tu nombre"
				/>
				<button
					class="py-2 mt-4 w-full md:w-2/6 border-2 border-white/50  text-center rounded md:rounded-l-none bg-slate-500/10 transition-all hover:bg-slate-900"
					on:click={makeSubmission}
					>Subir
				</button>
			</div>
		{/if}
		<h2 class="text-xl font-bold mt-20">Temas:</h2>
		<div
			class={`py-2 mt-4 w-full md:w-1/2 border-2 border-white/50 text-center rounded bg-slate-500/10 cursor-pointer transition-all text-gray-300 ${
				showSubjects ? 'blur-none' : 'blur-md'
			}`}
			on:click={() => (showSubjects = !showSubjects)}
		>
			{problem && problem.topics.join(', ')}
		</div>

		<h2 class="text-xl mt-10 font-bold">Resuelto por:</h2>
		<div
			class={`py-2 mt-4 w-full md:w-1/2 border-2 border-white/50 text-center rounded bg-slate-500/10 cursor-pointer transition-all ${
				showSolved ? 'blur-none' : 'blur-md'
			}`}
			on:click={() => (showSolved = !showSolved)}
		>
			{#if problem.solvedBy.length === 0}
				<span class="text-gray-300">No hay resoluciones</span>
			{:else}
				<span class="text-gray-300">{problem.solvedBy.join(', ')}</span>
			{/if}
			<!-- {problem && problem.solvedBy.join(',')} -->
		</div>
	</div>
</div>
