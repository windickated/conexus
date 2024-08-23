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
			<img class="image" src="/icons/loading.svg" alt="" />
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

	.heading h2 {
		margin: 0;
	}

	.line {
		height: 0.2rem;
		background-color: var(--fg-color);
		flex-grow: 1;
	}

	.step_number {
		padding: 0.75rem 1.5rem;
		border: 0.2rem solid var(--fg-color);
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

	.controls img {
		height: 2rem;
		aspect-ratio: 1/1;
	}

	.controls button {
		cursor: pointer;
	}

	.controls button:hover {
		filter: brightness(0.7);
	}

	.image,
	.image-wrapper {
		align-self: center;
		width: 1024px;
		height: 512px;
		max-width: calc(90vw - 0.5rem);
		aspect-ratio: 1/1;
		object-fit: cover;
		box-shadow: 0.5rem 0.5rem 0 var(--accent-color);
	}

	.image-wrapper {
		width: calc(1024px + 0.5rem);
		height: calc(512px + 0.5rem);
		max-width: 90vw;
		--border-size: 2rem;
		clip-path: polygon(
			0 0,
			calc(100% - var(--border-size)) 0,
			100% var(--border-size),
			100% 100%,
			var(--border-size) 100%,
			0 calc(100% - var(--border-size))
		);
	}

	.buttons {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: stretch;
		gap: 0.75rem;
	}

	.buttons button {
		text-align: start;
		font-weight: bold;
		font-size: 1.2rem;
		padding: 0.25rem;
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	button::before {
		content: "";
		height: 1.5rem;
		width: 0.25rem;
		background-color: var(--fg-color);
		display: inline-block;
		margin-right: 1rem;
	}

	button:disabled {
		filter: brightness(0.7);
	}

	button:not(:disabled):hover {
		background: linear-gradient(
			to right,
			transparent 1rem,
			var(--accent-color) 1rem,
			transparent
		);
	}

	button:not(:disabled):hover::before {
		background-color: var(--accent-color);
	}

	button:not(:disabled):active,
	button:not(:disabled):focus {
		filter: brightness(0.7);
		background: linear-gradient(
			to right,
			transparent 1rem,
			var(--accent-color) 1rem,
			transparent
		);
	}

	button:not(:disabled):active::before,
	button:not(:disabled):focus::before {
		background-color: var(--accent-color);
	}

	button:focus {
		filter: brightness(0.65);
	}
</style>
