<script lang="ts">
  import { afterUpdate } from "svelte";

  import { fullscreen, story, loading } from "@stores/conexus";
  import { background_volume, tts_volume } from "@stores/volumes";
  import { storyTitle as _storyTitle, CoNexus } from "../lib/conexus";
  import type { StepData } from "../lib/conexus";

  import Slider from "./music/Slider.svelte";

  $: step = $story?.step_data as StepData;

  let stepFont = "Verdana";

  let width: number;
  let innerWidth: number;

  let image: HTMLElement;
  let controlBar: HTMLElement;
  let quitButton: HTMLElement;
  let resizeButton: HTMLElement;
  let fullscreenButton: HTMLElement;
  let storyInfo: HTMLElement;

  let isFullsize: boolean = false;
  let isHidden: boolean;

  const storyTitle: string =
    _storyTitle.charAt(0).toUpperCase() + _storyTitle.slice(1);

  afterUpdate(() => {
    if (width > 600) {
      if (innerWidth >= 1920) {
        image.style.height = isFullsize ? "60rem" : "40rem";
      } else {
        image.style.height = isFullsize ? "90vw" : "50vw";
      }
      if ($fullscreen) {
        hideControlBar();
      } else {
        if (isHidden) showControlBar();
      }
    } else {
      image.style.height = "512px";
      if (isHidden) showControlBar();
    }
  });

  const hideControlBar = () => {
    isHidden = true;
    controlBar.style.backgroundColor = "rgba(0,0,0,0)";
    controlBar.style.border = "none";
    controlBar.style.marginBottom = "0";
    controlBar.style.backdropFilter = "none";
    quitButton.style.opacity = "0.5";
    quitButton.style.backgroundColor = "rgba(1, 0, 32, 0.5)";
    resizeButton.style.opacity = "0.5";
    fullscreenButton.style.opacity = "0.5";
    storyInfo.style.opacity = "0.25";
  };

  const showControlBar = () => {
    isHidden = false;
    controlBar.style.backgroundColor = "rgba(36, 65, 189, 0.75)";
    controlBar.style.border = "0.05vw solid rgba(51, 226, 230, 0.5)";
    controlBar.style.marginBottom = "4vw";
    controlBar.style.backdropFilter = "blur(1em)";
    quitButton.style.opacity = "1";
    quitButton.style.backgroundColor = "rgba(51, 226, 230, 0.25)";
    resizeButton.style.opacity = "1";
    fullscreenButton.style.opacity = "1";
    storyInfo.style.opacity = "1";
  };
</script>

<svelte:window bind:outerWidth={width} bind:innerWidth />

<div class="step-wrapper" style="font-family: {stepFont}">
  <div class="image-wrapper" bind:this={image}>
    {#if step.image}
      <img class="image" src={`data:image/png;base64,${step.image}`} alt="" />
    {:else}
      <img class="image loading-image" src="/icons/loading.svg" alt="" />
    {/if}
  </div>

  <p class="story-text">{step.story}</p>

  {#if $story?.step_data?.end}
    <hr />

    <h2 class="summary-title">Story Summary</h2>

    <p class="summary-text">{step.summary}</p>

    <h2 class="trait">AI identified you as <strong>{step.trait}</strong></h2>

    <div class="options-container">
      <button class="option menu-option" on:click={() => story.set(null)}
        >Return to main menu</button
      >
    </div>
  {:else}
    <div class="options-container">
      {#each step.options as option, i}
        <button
          style="font-family: {stepFont}"
          disabled={$loading}
          class="option"
          on:click={() => $story?.next_step(i + 1)}
        >
          <img
            class="option-selector"
            src="/icons/option-selector.png"
            alt="Option"
          />
          <span>{option}</span>
        </button>
      {/each}
    </div>
  {/if}

  <div class="control-bar" bind:this={controlBar}>
    <div class="story-info-container">
      <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
      <div
        bind:this={quitButton}
        class="quit-wrapper"
        on:click={() => window.open("/", "_self")}
        role="button"
        tabindex="0"
      >
        <img class="quit" src="/icons/quit.png" alt="Quit" />
      </div>

      <div class="story-info" bind:this={storyInfo}>
        {storyTitle} - Step {`${step.step < 10 ? "0" : ""}${step.step}`}
      </div>
    </div>

    <div class="controls">
      <Slider {isHidden} src="/icons/volume.png" volume={background_volume} />
      <Slider
        {isHidden}
        src="/icons/voice.png"
        volume={tts_volume}
        restartable
      />

      <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
      <div
        bind:this={resizeButton}
        class="resize-wrapper"
        on:click={() => {
          isFullsize = !isFullsize;
        }}
        role="button"
        tabindex="0"
      >
        <img
          class="resize"
          src={isFullsize ? "/icons/smallsize.png" : "/icons/bigsize.png"}
          alt={isFullsize ? "Big" : "Small"}
        />
      </div>

      <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
      <div
        bind:this={fullscreenButton}
        class="fullscreen-wrapper"
        on:click={() => fullscreen.update((old) => !old)}
        role="button"
        tabindex="0"
      >
        <img
          class="fullscreen"
          src={$fullscreen
            ? "/icons/fullscreen-exit.png"
            : "/icons/fullscreen.png"}
          alt={($fullscreen ? "Exit" : "Enter") + " fullscreen mode"}
        />
      </div>
    </div>
  </div>
</div>

<style>
  .step-wrapper {
    font-family: sans-serif;
    font-weight: bold;
    word-spacing: 0.4em;
  }

  hr {
    width: 100%;
    margin: 2vw auto;
    border: 0.1vw solid rgba(51, 226, 230, 0.5);
  }

  button {
    font-family: "PT Serif Caption", "serif";
    cursor: pointer;
  }

  .image-wrapper {
    align-self: center;
    width: 95%;
    height: 50vw;
    margin-block: 4vw 2vw;
    margin-inline: auto;
    border: 0.05vw solid rgba(51, 226, 230, 0.25);
    border-radius: 1em;
    filter: drop-shadow(0 0 0.5vw rgba(51, 226, 230, 0.25));
    -webkit-backdrop-filter: blur(1em);
    backdrop-filter: blur(1em);
    background-color: rgba(51, 226, 230, 0.05);
    transition: cubic-bezier(0.19, 1, 0.22, 1) 1s;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1em;
  }

  .loading-image {
    height: 100%;
    object-fit: contain;
  }

  .story-text,
  .summary-text {
    padding-block: 1vw;
    width: 94%;
    font-size: 1.5vw;
    line-height: 3vw;
    margin-inline: auto;
  }

  .summary-title,
  .trait {
    font-size: 2vw;
    line-height: 4vw;
    color: rgba(51, 226, 230, 0.5);
  }

  .summary-title {
    margin: 0;
  }

  .trait strong {
    color: rgba(51, 226, 230, 1);
    filter: drop-shadow(0 0 0.5vw rgba(51, 226, 230, 0.5));
  }

  .options-container {
    width: 93%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 1vw;
    margin-block: 2vw;
    margin-inline: auto;
    border: 0.05vw solid rgba(51, 226, 230, 0.5);
    border-radius: 1em;
    background-color: rgba(51, 226, 230, 0.05);
    -webkit-backdrop-filter: blur(1em);
    backdrop-filter: blur(1em);
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
    background-color: rgba(0, 0, 0, 0);
    border: none;
  }

  .menu-option {
    justify-content: center;
  }

  .option-selector {
    height: 2vw;
    width: auto;
    opacity: 0.8;
  }

  .option:hover,
  .option:active {
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
    width: 91%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-top: 2vw;
    margin-inline: auto;
    margin-bottom: 4vw;
    padding: 1vw 2vw;
    background-color: rgba(36, 65, 189, 0.75);
    border: 0.05vw solid rgba(51, 226, 230, 0.5);
    border-radius: 1em;
    -webkit-backdrop-filter: blur(1em);
    backdrop-filter: blur(1em);
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
    align-items: center;
    gap: 1vw;
  }

  .fullscreen-wrapper,
  .resize-wrapper,
  .quit-wrapper {
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
    flex-shrink: 0;
  }

  .quit {
    height: 100%;
  }

  .fullscreen,
  .resize {
    height: 2vw;
  }

  .fullscreen-wrapper:hover,
  .fullscreen-wrapper:active,
  .resize-wrapper:hover,
  .resize-wrapper:active,
  .quit-wrapper:hover,
  .quit-wrapper:active {
    opacity: 0.75 !important;
  }

  @media screen and (max-width: 600px) {
    hr {
      width: 90%;
      margin: 1.5em auto;
    }

    .image-wrapper {
      height: 512px;
    }

    .story-info {
      font-size: 1em;
      line-height: 1.5em;
    }

    .story-text,
    .summary-text {
      width: 90%;
      margin-top: 0.75em;
      font-size: 1em;
      line-height: 1.75em;
      color: #dedede;
    }

    .summary-title,
    .trait {
      color: rgba(51, 226, 230, 0.75);
      font-size: 1.2em;
      line-height: 3em;
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
      margin-top: 1em;
      flex-flow: column nowrap;
      padding: 0.5em;
      gap: 0.5em;
      border-radius: 0.5em;
    }

    .story-info {
      font-size: 1em;
      line-height: 1.5em;
    }

    .controls {
      width: 100%;
      justify-content: space-between;
    }

    .fullscreen-wrapper,
    .resize-wrapper,
    .quit-wrapper {
      height: 2em;
      width: 2em;
      padding: 0.1em;
      border-radius: 0.5em;
    }

    .resize-wrapper {
      display: none;
    }

    .quit-wrapper {
      margin-right: 1em;
    }

    .quit {
      height: 90%;
    }

    .fullscreen,
    .resize {
      height: 1em;
    }
  }

  @media screen and (min-width: 1920px) {
    hr {
      width: 100rem;
      border: 0.1rem solid rgba(51, 226, 230, 0.5);
      margin: 2rem auto;
    }

    .image-wrapper {
      width: 100rem;
      max-height: 60rem;
      margin-block: 2rem 1rem;
    }

    .story-text,
    .summary-text {
      width: 98rem;
      padding-block: 1rem;
      margin-top: 1rem;
      font-size: 1.5rem;
      line-height: 3rem;
      color: #dedede;
    }

    .options-container {
      width: 98rem;
      padding: 1rem;
      margin-block: 1rem;
    }

    .option {
      font-size: 1.75rem;
      line-height: 4rem;
      padding: 0.5rem 1rem;
    }

    .option-selector {
      height: 1.5rem;
    }

    .summary-title,
    .trait {
      font-size: 1.5rem;
      line-height: 3rem;
      -webkit-text-stroke: 0.1rem;
      margin: 0;
    }

    .trait {
      margin-bottom: 2rem;
    }

    .control-bar {
      width: 96rem;
      margin-top: 2rem;
      padding: 1rem 2rem;
    }

    .story-info {
      font-size: 1.5rem;
    }

    .fullscreen-wrapper,
    .resize-wrapper,
    .quit-wrapper {
      height: 2rem;
      width: 2rem;
      padding: 0.5rem;
    }

    .fullscreen,
    .resize {
      height: 1.5rem;
    }
  }
</style>
