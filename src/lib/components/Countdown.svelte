<script lang="ts">
	import { onMount } from 'svelte';

	export let hoursLeft = 0;
	let minutesLeft = 0;
	let secondsLeft = 0;

	let timer: NodeJS.Timer;

	$: {
		if (secondsLeft == 0) {
			if (minutesLeft == 0) {
				if (hoursLeft == 0) {
					clearInterval(timer);
					break $;
				}
				minutesLeft = 60;
				hoursLeft = hoursLeft - 1;
			}
			secondsLeft = 59;
			minutesLeft = minutesLeft - 1;
		}
	}

	onMount(() => {
		timer = setInterval(() => {
			secondsLeft -= 1;
		}, 1000);
	});
</script>

<div>
	{hoursLeft}:{minutesLeft}:{secondsLeft}
</div>
