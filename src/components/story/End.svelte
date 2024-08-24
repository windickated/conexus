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
		<img class="image" src="/icons/loading.svg" alt="" />
	{/if}
</div>

<p class="story-text">{step.story}</p>

<hr>

<p class="summary-text">{step.summary}</p>

<h2 class="trait">AI identified you as <strong>{step.trait}</strong></h2>

<div class="options-container">
	<button class="option" on:click={() => story.set(null)}>Return to main menu</button
	>
</div>

<div class="control-bar">
	<div class="step-number">
		Step {`${step.step < 10 ? "0" : ""}${step.step}`}
	</div>

	<div class="controls">
		<Slider src="/icons/volume.png" volume={background_volume} />
		<Slider src="/icons/voice.png" volume={tts_volume} restartable />

		<div class="fullscreen-wrapper">
			<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
			<img
				class="fullscreen"
				on:click={() => fullscreen.update(old => !old)}
				src={$fullscreen ? "/icons/fullscreen_exit.png" : "/icons/fullscreen.png"}
				alt={($fullscreen ? 'Exit' : 'Enter') + ' fullscreen mode'}
			/>
		</div>
	</div>
</div>


<style>
	hr {
		width: 1024px;
		max-width: calc(100% - 0.5rem);
		margin: 2vw 0;
		border: 0.1vw solid rgba(51, 226, 230, 0.5);
	}

	button {
		font-family: 'PT Serif Caption', 'serif';
		cursor: pointer;
	}

	.image-wrapper {
		align-self: center;
		width: 1024px;
		height: 512px;
		max-width: calc(100% - 0.5rem);
		margin-bottom: 2vw;
		border: 0.05vw solid rgba(51, 226, 230, 0.25);
		border-radius: 1em;
		filter: drop-shadow(0 0 0.5vw rgba(51, 226, 230, 0.25));
	}

	.image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 1em;
	}

	.story-text, .summary-text {
		padding: 1vw 2vw;
		width: 1024px;
		max-width: calc(100% - 0.5rem);
		font-size: 1.5vw;
		line-height: 3vw;
	}

	.trait {
		font-size: 2vw;
		line-height: 4vw;
		color: rgba(51, 226, 230, 0.8)
	}

	.trait strong {
		color: rgba(51, 226, 230, 1)
	}

	.options-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		padding: 1vw;
		margin-block: 2vw;
		border: 0.05vw solid rgba(51, 226, 230, 0.5);
		border-radius: 1em;
		background-color: rgba(51, 226, 230, 0.1);
		-webkit-backdrop-filter: blur(2vw);
		backdrop-filter: blur(2vw);
	}

	.option {
		text-align: center;
		font-weight: bold;
		font-size: 2vw;
		line-height: 4vw;
		padding: 1vw 2vw;
		color: rgba(51, 226, 230, 0.8);
		background-color: rgba(0,0,0,0);
		border: none;
	}

	.option:hover, .option:active {
		color: rgba(51, 226, 230, 1);
		filter: drop-shadow(0 0 0.5vw rgba(51, 226, 230, 0.25));
	}

	.option:disabled {
		opacity: 0.5;
		cursor: auto;
	}

	.option:disabled:hover,
	.option:disabled:active {
		color: rgba(51, 226, 230, 0.8);
		filter: none;
	}

	.control-bar {
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		margin-top: 2vw;
		padding: 1vw 2vw;
		background-color: rgba(36, 65, 189, 0.75);
		border: 0.05vw solid rgba(51, 226, 230, 0.5);
		border-radius: 1em;
	}

	.step-number {
		font-size: 2vw;
	}

	.controls {
		display: flex;
		flex-flow: row nowrap;
		gap: 1vw;
	}

	.fullscreen-wrapper {
		height: 3.5vw;
		width: 3.5vw;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.5vw;
		background-color: rgba(1, 0, 32, 0.5);
		border: 0.05vw solid rgba(51, 226, 230, 0.5);
		border-radius: 1em;
	}

	.fullscreen {
		height: 2vw;
		cursor: pointer;
	}

	.fullscreen:hover {
		opacity: 0.5;
	}


	@media screen and (max-width: 600px) {
		hr {
			margin: 1.5em 0;
		}

		.story-text, .summary-text {
			font-size: 1em;
			line-height: 1.75em;
		}

		.trait {
			font-size: 1.2em;
			line-height: 3em;
		}

		.option {
			font-size: 1em;
			line-height: 2em;
			padding: 0.5em 1em;
		}

		.control-bar {
			flex-flow: column nowrap;
			padding: 0.5em;
			gap: 0.5em;
		}

		.step-number {
			font-size: 1em;
			line-height: 1.5em;
		}

		.controls {
			width: 100%;
			justify-content: space-between;
		}

		.fullscreen-wrapper {
			height: 2em;
			width: 2em;
			padding: 0.1em;
		}

		.fullscreen {
			height: 1em;
		}
	}
</style>