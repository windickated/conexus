<script lang="ts">
  import stories from "../data/stories";
  import StoryTile from "../components/StoryTile.svelte";
  import { afterUpdate } from "svelte";

  export let sectionName: string;
  export let filters: boolean = false;
  export let bigCollection: boolean = false;

  let tilesArray: any = stories.filter(
    (section) => section.section === sectionName
  )[0].subsection;

  const allStories = tilesArray[0].story;

  let isSorting: boolean = false;
  let searchField: string;
  let selectedGenres: string[];
  let showGenres: boolean = false;
  const showGenresFilter = () => (showGenres = true);
  const hideGenresFilter = () => {
    if (showGenres) showGenres = false;
  };

  let filteredTiles: any[] = allStories;
  let sortedTiles: any[];

  afterUpdate(() => {
    if (searchField) {
      resetGenresFilter();
      filteredTiles = allStories.filter((story: any) => {
        if (story.title.toLowerCase().match(searchField.toLowerCase()))
          return story;
      });
    } else if (selectedGenres && selectedGenres.length == 0) {
      filteredTiles = allStories;
      resetGenresFilter();
      searchField = "";
    }
    sortedTiles = filteredTiles.sort((a: any, b: any) => {
      if (isSorting) {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
      } else {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
      }
      return 0;
    });
    filteredTiles = sortedTiles;
    tilesArray[0].story = filteredTiles;
  });

  function genreSelector(this: HTMLElement) {
    if (searchField) searchField = "";
    this.classList.toggle("selected");
    if (this.className.match("selected"))
      this.style.color = "rgba(51, 226, 230)";
    else this.style.color = "inherit";
    selectedGenres = Array.from(document.querySelectorAll(".selected")).map(
      (genre) => {
        return genre.innerHTML;
      }
    );
    filteredTiles = allStories.filter((story: any) => {
      let matchingTile: boolean = false;
      selectedGenres.map((genre) => {
        if (story.genre.includes(genre)) matchingTile = true;
      });
      if (matchingTile) return story;
    });
  }

  const resetGenresFilter = () => {
    const genresList = document.querySelectorAll(".genre");
    selectedGenres = [];
    genresList.forEach((genre: any) => {
      if (Array.from(genre.classList).includes("selected")) {
        genre.classList.remove("selected");
        genre.style.color = "inherit";
      }
    });
  };
</script>

<svelte:window on:click={hideGenresFilter} />

{#each tilesArray as subsection}
  <div
    class="collection-header"
    style="align-items: {filters ? '' : 'flex-start'}"
  >
    <p class="tiles-collection-legend">
      {subsection.name}
      {#if bigCollection}
        {tilesArray[0].story.length}
        {#if tilesArray[0].story.length === 1}
          Story
        {:else}
          Stories
        {/if}
      {/if}
    </p>
    {#if filters}
      <section class="filters">
        <div class="sort-genres-filters">
          <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions
        a11y-no-static-element-interactions -->
          <div
            class="filter blur"
            on:click={() => {
              isSorting = !isSorting;
            }}
            style="background-color: {isSorting
              ? 'rgba(45, 90, 216, 0.9)'
              : 'rgba(22, 30, 95, 0.75)'}"
          >
            <img class="filter-image" src="/icons/sort.png" alt="Sort" />
          </div>

          <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions
        a11y-no-static-element-interactions -->
          <div
            class="filter blur"
            on:click|stopPropagation={showGenresFilter}
            style="background-color: {selectedGenres &&
            selectedGenres.length > 0
              ? 'rgba(45, 90, 216, 0.9)'
              : 'rgba(22, 30, 95, 0.75)'}"
          >
            <img class="filter-image" src="/icons/filter.png" alt="Filter" />
            <ul
              class="genres-list"
              style="display: {showGenres ? 'grid' : 'none'}"
              on:mouseleave={hideGenresFilter}
              on:blur={hideGenresFilter}
            >
              <li class="genre" on:click={genreSelector}>Action</li>
              <li class="genre" on:click={genreSelector}>Romance</li>
              <li class="genre" on:click={genreSelector}>Sci-Fi</li>
              <li class="genre" on:click={genreSelector}>Fantasy</li>
              <li class="genre" on:click={genreSelector}>Horror</li>
              <li class="genre" on:click={genreSelector}>Thriller</li>
              <li class="genre" on:click={genreSelector}>Comedy</li>
              <li class="genre" on:click={genreSelector}>History</li>
              <li class="genre" on:click={genreSelector}>Drama</li>
              <li class="genre" on:click={genreSelector}>Mystery</li>
              <li class="genre" on:click={genreSelector}>Sport</li>
              <li class="genre" on:click={genreSelector}>Biopic</li>
              <li class="genre" on:click={genreSelector}>Psychological</li>
              <li class="genre" on:click={genreSelector}>War</li>
              <li class="genre" on:click={genreSelector}>Crime</li>
            </ul>
          </div>
        </div>

        <div
          class="filter blur"
          style="background-color: {searchField
            ? 'rgba(45, 90, 216, 0.9)'
            : 'rgba(22, 30, 95, 0.75)'}"
        >
          <img class="filter-image" src="/icons/search.png" alt="Search" />
          <input
            bind:value={searchField}
            class="search-field"
            placeholder="Search story..."
          />
        </div>
      </section>
    {/if}
  </div>
  <section
    class="tiles-collection {bigCollection ? 'big-collection' : ''} blur"
  >
    {#each subsection.story as story}
      <StoryTile
        storyName={story.title}
        storyDescription={story.description}
        storyLink={story.storyLink}
        primaryThumbnail={story.primaryThumbnail}
        secondaryThumbnail={story.secondaryThumbnail
          ? story.secondaryThumbnail
          : undefined}
        descriptionPicture={story.descriptionImage}
        storyGenre={story.genre}
        playButton="PLAY NOW"
      />
    {/each}
  </section>
{/each}

<style>
  .tiles-collection {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    overflow-x: scroll;
    height: auto;
    margin: 1vw 2.5vw 3vw 2.5vw;
    padding: 2vw;
    background-image: radial-gradient(
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0),
      rgba(51, 226, 230, 0.1)
    );
    border: 0.1vw solid rgba(51, 226, 230, 0.5);
    border-radius: 1vw;
    filter: drop-shadow(0 0 1vw rgba(51, 226, 230, 0.25));
    overflow-y: hidden;
  }

  .tiles-collection::-webkit-scrollbar {
    height: 0.75vw;
  }

  .tiles-collection::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .tiles-collection::-webkit-scrollbar-thumb {
    background: linear-gradient(
      to right,
      rgba(51, 226, 230, 0.15),
      rgba(51, 226, 230, 0.3),
      rgba(51, 226, 230, 0.15)
    );
    border-radius: 1vw;
  }

  .big-collection {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    justify-items: center;
    overflow-x: hidden;
  }

  .collection-header {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }

  .tiles-collection-legend {
    font-size: 3vw;
    line-height: 3vw;
    color: rgba(51, 226, 230, 0.85);
    margin-left: 4vw;
    -webkit-text-stroke: 0.03vw #33e2e6;
    text-shadow: 0 0 1vw rgba(51, 226, 230, 0.4);
  }

  .filters {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    margin-right: 2vw;
  }

  .filter {
    z-index: 1;
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 0.5vw 1vw;
    margin-inline: 0.25rem;
    background-color: rgba(22, 30, 95, 0.75);
    border: 0.1vw solid rgba(51, 226, 230, 0.5);
    border-radius: 1vw;
    cursor: pointer;
  }

  .filter-image {
    height: 2vw;
    width: auto;
    opacity: 0.8;
  }

  .sort-genres-filters {
    display: flex;
  }

  .genres-list {
    z-index: 2;
    position: absolute;
    bottom: -0.2vw;
    right: -0.2vw;
    display: grid;
    grid-template-columns: 10vw 10vw 10vw;
    row-gap: 1vw;
    justify-items: center;
    padding: 1vw;
    border: 0.1vw solid rgba(51, 226, 230, 0.5);
    border-radius: 1vw;
    background-color: #010020;
  }

  .genre {
    font-size: 1.5vw;
    line-height: 2vw;
  }

  .genre:hover,
  .genre:active {
    color: rgb(51, 226, 230);
    filter: drop-shadow(0 0 1vw rgba(51, 226, 230, 0.25));
  }

  .search-field {
    margin-left: 1vw;
    font-size: 2vw;
    line-height: 2.5vw;
    color: rgba(51, 226, 230, 0.9);
    background-color: rgba(1, 0, 32, 0.4);
    border: 0.1vw solid rgba(51, 226, 230, 0.5);
    border-radius: 0.5vw;
    outline: none;
    width: 15vw;
    transition: all 0.15s ease-in-out;
  }

  .search-field::placeholder {
    color: rgba(51, 226, 230, 0.5);
  }

  .search-field:focus {
    width: 25vw;
  }

  @media only screen and (max-width: 600px) {
    .tiles-collection {
      margin-bottom: 2em;
    }

    .collection-header {
      flex-flow: column-reverse nowrap;
      margin-block: 1em;
      gap: 0.5em;
    }

    .tiles-collection-legend {
      font-size: 1.5em;
      line-height: 1.5em;
    }

    .big-collection {
      grid-template-columns: 50% 50%;
    }

    .filters {
      width: 95vw;
      margin: 0 2.5vw;
      justify-content: space-between;
    }

    .filter {
      padding: 0.5em;
    }

    .filter-image {
      height: 1.5em;
    }

    .sort-genres-filters {
      flex-direction: row-reverse;
    }

    .search-field {
      font-size: 1em;
      line-height: 1.5em;
      margin-left: 0.5em;
      width: 30vw;
    }

    .search-field:focus {
      width: 50vw;
    }

    .genres-list {
      left: -0.2vw;
      top: -0.2vw;
      bottom: auto;
      right: auto;
      grid-template-columns: 40vw;
      row-gap: 0.75em;
      padding: 0.5em;
    }

    .genre {
      font-size: 0.9em;
      line-height: 1.5em;
    }
  }
</style>
