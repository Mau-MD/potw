<script lang="ts">
	import Icon from '@iconify/svelte';
	import { fade } from 'svelte/transition';

	export let name: string;
	export let platform: string;

	export let solved = false;
	export let started = false;

	export let loading: boolean;

	export let challenging = false;

	$: truncated = name.length > 12 ? name.substring(0, 12) + '...' : name;
</script>

<div
	class={`transition-all hover:shadow-pink-500/40 hover:scale-105 shadow-pink-500/20 shadow-lg ${
		loading ? 'blur-lg' : 'blur-none'
	}`}
>
	{#if solved || started || challenging}
		<div
			class={`text-center ${
				solved ? 'bg-pink-700' : challenging ? 'bg-orange-500' : 'bg-cyan-700'
			} text-[12px] rounded-t-lg`}
		>
			{solved ? 'Resuelto' : challenging ? 'Desafiante' : 'Empezado'}
		</div>
	{/if}
	<div
		class={`border-2  p-4 rounded w-[300px] shadow-lg  cursor-pointer transition-all  flex items-center justify-start px-8`}
	>
		<Icon icon="simple-icons:leetcode" class="w-8 h-8 mr-4" />
		<div class="flex flex-col">
			<span class="text-gray-400 text-sm">{platform.toUpperCase()}</span>
			{truncated}
		</div>
		<Icon icon="ant-design:caret-right-filled" class="w-4 h-4 ml-auto" />
	</div>
</div>
