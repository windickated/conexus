<script lang="ts">
	import Slider from "@components/music/Slider.svelte";
	import { fullscreen, story, loading } from "@stores/conexus";
	import { background_volume, tts_volume } from "@stores/volumes";
	import { storyTitle as _storyTitle } from "@lib/conexus";
	import type { StepData } from "@stores/types";

	$: step = $story?.step_data as StepData;

	const storyTitle: string = _storyTitle.charAt(0).toUpperCase() + _storyTitle.slice(1);
</script>


<div class="image-wrapper">
	{#if step.image}
		<img class="image" src={`data:image/png;base64,${step.image}`} alt="" />
	{:else}
		<img class="image" src="/icons/loading.svg" alt="" />
	{/if}
</div>

<p class="story-text">{step.story}</p>

<div class="options-container">
	{#each step.options as option, i}
		<button
			disabled={$loading}
			class="option"
			on:click={() => $story?.next_step(i + 1)}>
				<img class="option-selector" src="/icons/option-selector.png" alt="Option" />
				<span>{option}</span>
			</button
		>
	{/each}
</div>

<div class="control-bar">
	<div class="story-info-container">
		<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
		<div class="quit-wrapper" on:click={() => story.set(null)}
			role="button" tabindex="0">
			<img
				class="quit"
				src="/icons/quit.png"
				alt="Quit"
			/>
		</div>

		<div class="story-info">
			{storyTitle} - Step {`${step.step < 10 ? "0" : ""}${step.step}`}
		</div>
	</div>

	<div class="controls">
		<Slider src="/icons/volume.png" volume={background_volume} />
		<Slider src="/icons/voice.png" volume={tts_volume} restartable />

		<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
		<div class="fullscreen-wrapper" on:click={() => fullscreen.update(old => !old)}
			role="button" tabindex="0">
			<img
				class="fullscreen"
				src={$fullscreen ? "/icons/fullscreen-exit.png" : "/icons/fullscreen.png"}
				alt={($fullscreen ? 'Exit' : 'Enter') + ' fullscreen mode'}
			/>
		</div>
	</div>
</div>


<style>
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

	.story-text {
		padding: 1vw 2vw;
		width: 1024px;
		max-width: calc(100% - 0.5rem);
		font-size: 1.5vw;
		line-height: 3vw;
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
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		gap: 0.75em;
		text-align: start;
		font-weight: bold;
		font-size: 2vw;
		line-height: 4vw;
		padding: 1vw 2vw;
		color: rgba(51, 226, 230, 0.8);
		background-color: rgba(0,0,0,0);
		border: none;
	}

	.option-selector {
		height: 2vw;
		width: auto;
		opacity: 0.8;
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

	.story-info-container {
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
	}

	.story-info {
		font-size: 2vw;
	}

	.controls {
		display: flex;
		flex-flow: row nowrap;
		gap: 1vw;
	}

	.fullscreen-wrapper, .quit-wrapper {
		height: 3.5vw;
		width: 3.5vw;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.5vw;
		background-color: rgba(1, 0, 32, 0.5);
		border: 0.05vw solid rgba(51, 226, 230, 0.5);
		border-radius: 1em;
		cursor: pointer;
	}

	.quit-wrapper {
		background-color: rgba(51, 226, 230, 0.25);
		margin-right: 2vw;
	}

	.quit {
		height: 100%;
	}

	.fullscreen {
		height: 2vw;
	}

	.fullscreen-wrapper:hover, .fullscreen-wrapper:active,
	.quit-wrapper:hover, .quit-wrapper:active {
		opacity: 0.75;
	}


	@media screen and (max-width: 600px) {
		.story-info {
			font-size: 1em;
			line-height: 1.5em;
		}

		.story-text {
			font-size: 1em;
			line-height: 1.75em;
		}

		.option {
			font-size: 1em;
			line-height: 2em;
			padding: 0.5em 1em;
		}

		.option-selector {
			height: 1em;
		}

		.control-bar {
			flex-flow: column nowrap;
			padding: 0.5em;
			gap: 0.5em;
		}

		.story-info {
			font-size: 1em;
			line-height: 1.5em;
		}

		.controls {
			width: 100%;
			justify-content: space-between;
		}

		.fullscreen-wrapper, .quit-wrapper {
			height: 2em;
			width: 2em;
			padding: 0.1em;
		}

		.quit-wrapper {
			margin-right: 1em;
		}

		.quit {
			height: 90%;
		}

		.fullscreen {
			height: 1em;
		}
	}
</style>
