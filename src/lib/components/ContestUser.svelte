<script lang="ts">
	import { onMount } from 'svelte';

	export let user: LeetcodeUser;
	export let prevUser: LeetcodeUser;
	export let photo: string;

	let easy = 0;
	let medium = 0;
	let hard = 0;
	let points = 10;

	let pointsAnim = 0;

	let allTime = false;
	let isAnimating = true;

	let color = 'text-white';

	$: {
		if (user.place === 1) {
			color = 'text-yellow-400';
		} else if (user.place === 2) {
			color = 'text-gray-300';
		} else if (user.place === 3) {
			color = ' text-amber-700';
		}
	}

	$: {
		easy = user.easySolved - prevUser.easySolved;
		medium = user.mediumSolved - prevUser.mediumSolved;
		hard = user.hardSolved - prevUser.hardSolved;
		points = allTime
			? user.easySolved + 3 * user.mediumSolved + 7 * user.hardSolved
			: easy + 3 * medium + 7 * hard;
	}

	$: {
		if (!isAnimating) {
			pointsAnim = points;
		}
	}

	onMount(() => {
		const interval = setInterval(() => {
			pointsAnim += 1;
			if (pointsAnim > points) {
				pointsAnim = points;
				isAnimating = false;
				clearInterval(interval);
			}
		}, 80);
	});
</script>

<div class="flex flex-col items-center justify-center gap-10">
	<div class="w-[100px] h-[100px] bg-gray-400 rounded-[50%]">
		<img src={photo} class="w-full h-full object-cover rounded-[50%]" alt={user.username} />
	</div>
	<h2 class={`text-xl font-bold ${color}`}>
		#{user.place} - {user.username}
	</h2>
	<span class="font-bold text-5xl">{pointsAnim}</span>
	<div class="text-center">
		<p class="text-green-400 font-bold">
			Easy: {allTime ? user.easySolved : easy}
		</p>
		<p class="text-yellow-400 font-bold">Medium: {allTime ? user.mediumSolved : medium}</p>
		<p class="text-red-400 font-bold">Hard: {allTime ? user.hardSolved : hard}</p>
	</div>

	<button
		class="border-2 border-white px-4 py-2 rounded-md transition-all hover:bg-white hover:text-black"
		on:click={() => (allTime = !allTime)}>{allTime ? 'Ver Concurso' : 'Ver Histórico'}</button
	>
</div>
