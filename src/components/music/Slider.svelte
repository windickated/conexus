<script lang="ts">
	import type { Writable } from "svelte/store";

	import type { VolumeControl } from "@stores/types";

	export let src: string;
	export let volume: Writable<VolumeControl>;

	export let restartable: boolean = false;

	$: v = !$volume.muted ? $volume.volume : 0;

	const mute = () => {
		volume.update(v => ({ ...v, muted: !v.muted }));
	};

	const update = (e: Event) => {
		const target = e.target as HTMLInputElement;

		volume.set({ muted: false, volume: +target.value, restart: false });
	};

	const restart = () => {
		volume.update(v => ({ ...v, restart: true }));
	};
</script>

<div>
	<button class="c" on:click={mute}>
		<img {src} alt="Adjust volume" />
	</button>
	<input
		type="range"
		min="0"
		max="1"
		step="0.01"
		value={v}
		on:change={update}
	/>
	{#if restartable}
		<button class="c" on:click={restart}>
			<img src="/icons/replay.svg" alt="Adjust volume" />
		</button>
	{/if}
</div>

<style>
	div {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	img {
		height: 2rem;
		aspect-ratio: 1/1;
	}

	button {
		cursor: pointer;

		&:hover {
			filter: brightness(0.7);
		}
	}
</style>
