<script lang="ts">
	import Slider from "@components/music/Slider.svelte";
	import { fullscreen, story } from "@stores/conexus";
	import { background_volume, tts_volume } from "@stores/volumes";
	import type { StepData } from "@stores/types";

	$: step = $story?.step_data as StepData;
</script>

<div class="image-wrapper">
	{#if step.image}
		<img class="image" src={`data:image/png;base64,${step.image}`} alt="" />
	{:else}
		<img class="image" src="/loading.svg" alt="" />
	{/if}
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
	<h2>Summary</h2>
	<div class="line"></div>
	<strong class="step_number"
		>Step {`${step.step < 10 ? "0" : ""}${step.step}`}</strong
	>
</div>

<p>{step.summary}</p>

<h2 class="trait">AI identified you as <strong>{step.trait}</strong></h2>

<div class="buttons">
	<button class="c" on:click={() => story.set(null)}>Return to main menu</button
	>
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
		width: 512px;
		max-width: calc(90vw - 0.5rem);
		aspect-ratio: 1/1;
		object-fit: cover;
		box-shadow: 0.5rem 0.5rem 0 var(--accent-color);
	}

	.image-wrapper {
		width: calc(512px + 0.5rem);
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

	.trait {
		font-size: 1.5rem;
	}

	.trait strong {
		color: var(--link-color);
		text-decoration: underline white;
		text-decoration-thickness: 0.2rem;
		text-underline-offset: 0.2rem;
	}
</style>
