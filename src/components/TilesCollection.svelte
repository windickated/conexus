<script lang="ts">
  import stories from "../data/stories";
  import StoryTile from "../components/StoryTile.svelte";

  export let sectionName: string;
  export let filters: boolean = false;

  let matchingSection = stories.filter(
    (section) => section.section === sectionName
  );
  let matchingSubsection: any = matchingSection[0].subsection;

  console.log(matchingSection);
  console.log(matchingSubsection);
</script>

{#if filters}
  <section class="filters">
    <div class="filter blur">
      <img
        class="filter-image"
        id="genre-filter"
        src="/icons/filter.png"
        alt="Filter"
      />
      <ul class="genres-list">
        <li class="genre">Action</li>
        <li class="genre">Romance</li>
        <li class="genre">Sci-Fi</li>
        <li class="genre">Fantasy</li>
        <li class="genre">Horror</li>
        <li class="genre">Thriller</li>
        <li class="genre">Comedy</li>
        <li class="genre">History</li>
        <li class="genre">Drama</li>
        <li class="genre">Mystery</li>
        <li class="genre">Sport</li>
        <li class="genre">Biopic</li>
        <li class="genre">Psychological</li>
        <li class="genre">War</li>
        <li class="genre">Crime</li>
      </ul>
    </div>

    <div class="filter blur">
      <img class="filter-image" src="/icons/search.png" alt="Search" />
      <input class="search-field" placeholder="Search..." />
    </div>
  </section>
{/if}

{#each matchingSubsection as subsection}
  <p class="tiles-collection-legend">
    {subsection.name}
  </p>
  <section class="tiles-collection {filters ? 'big-collection' : ''} blur">
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
    margin: 1vw 2.5vw;
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

  .tiles-collection-legend {
    font-size: 3vw;
    line-height: 3vw;
    padding-left: 7vw;
    margin: 2vw auto 0 auto;
    color: rgba(51, 226, 230, 0.85);
    -webkit-text-stroke: 0.03vw #33e2e6;
    text-shadow: 0 0 1vw rgba(51, 226, 230, 0.4);
  }

  .filters {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    margin-right: 1rem;
  }

  .filter {
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

  .genres-list {
    position: absolute;
    bottom: 0;
    right: 0;
    display: grid;
    grid-template-columns: 10vw 10vw 10vw;
    row-gap: 1vw;
    justify-items: center;
    padding: 1vw;
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
    background-color: rgba(51, 226, 230, 0.2);
    border: 0.1vw solid rgba(51, 226, 230, 0.5);
    border-radius: 0.5vw;
    outline: none;
    width: 10vw;
    transition: all 0.15s ease-in-out;
  }

  .search-field::placeholder {
    color: rgba(51, 226, 230, 0.6);
  }

  .search-field:focus {
    width: 20vw;
    background-color: rgba(51, 226, 230, 0.3);
  }

  @media only screen and (max-width: 600px) {
    .tiles-collection-legend {
      font-size: 1.5em;
      line-height: 1.5em;
    }

    .big-collection {
      grid-template-columns: 50% 50%;
    }

    .filter {
      padding: 0.5em;
    }

    .filter-image {
      height: 1.5em;
    }

    .search-field {
      font-size: 1em;
      line-height: 1.5em;
      margin-left: 0.5em;
      width: 20vw;
    }

    .search-field:focus {
      width: 50vw;
    }
  }
</style>
