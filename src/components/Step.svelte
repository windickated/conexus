<script lang="ts">
	import Slider from "@components/music/Slider.svelte";
	import { fullscreen, story, loading } from "@stores/conexus";
	import { background_volume, tts_volume } from "@stores/volumes";
	import type { StepData } from "@stores/types";

	$: step = $story?.step_data as StepData;
</script>

<div class="image-wrapper">
	<div class="image-wrapper">
		{#if step.image}
			<img class="image" src={`data:image/png;base64,${step.image}`} alt="" />
		{:else}
			<img class="image" src="/loading.svg" alt="" />
		{/if}
	</div>
</div>

<div class="controls">
	<Slider src="/icons/volume.svg" volume={background_volume} />
	<Slider src="/icons/volume.svg" volume={tts_volume} restartable />

	<div class="spacer"></div>

	<button class="c" on:click={() => fullscreen.update(old => !old)}>
		{#if $fullscreen}
			<img src="/icons/fullscreen_exit.svg" alt="Exit fullscreen mode" />
		{:else}
			<img src="/icons/fullscreen.svg" alt="Enter fullscreen mode" />
		{/if}
	</button>
</div>

<p>{step.story}</p>

<div class="heading">
	<h2>Options</h2>
	<div class="line"></div>
	<strong class="step_number"
		>Step {`${step.step < 10 ? "0" : ""}${step.step}`}</strong
	>
</div>

<div class="buttons">
	{#each step.options as option, i}
		<button
			disabled={$loading}
			class="c"
			on:click={() => $story?.next_step(i + 1)}>{option}</button
		>
	{/each}
</div>

<style>
	.heading {
		display: flex;
		gap: 1rem;
		align-items: center;
		padding: 2rem;
	}

	h2 {
		margin: 0;
	}

	.line {
		height: 0.2rem;
		/* background-color: imports.$fg-color; */
		flex-grow: 1;
	}

	.step_number {
		padding: 0.75rem 1.5rem;
		/* border: .2rem solid imports.$fg-color; */
		border-radius: 1rem;
	}

	.controls {
		display: flex;
		align-items: center;
		margin: 2rem;
		gap: 3rem;
	}

	.spacer {
		flex-grow: 1;
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
