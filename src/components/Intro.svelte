<script lang="ts">
  import stories from "../data/stories.ts";
  import MenuTile from "./MenuTile.svelte";

  const sections: string[] = [];
  stories.map((story, i) => (sections[i] = story.section));

  const menuText: string[] = [
    "A new world with no limits awaits you.",
    "Within CoNexus, you will transcend the boundaries of reality as we know it.",
  ];
</script>

<section class="conexus-menu-tiles blur">
  <p class="menu-text-0">{menuText[0]}</p>

  {#each sections as sectionName}
    <MenuTile {sectionName} />
  {/each}

  <p class="menu-text-1">{menuText[1]}</p>
</section>

<style>
  .conexus-menu-tiles {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 1vw 2.5vw;
    margin-bottom: 3vw;
    padding: 2vw;
    background-color: rgba(1, 0, 32, 0.75);
    border: 0.1vw solid rgba(51, 226, 230, 0.5);
    border-radius: 2.5vw;
    filter: drop-shadow(0 0 1vw rgba(51, 226, 230, 0.25));
  }

  .menu-text-0,
  .menu-text-1 {
    text-align: center;
    font-size: 2vw;
    line-height: 2.5vw;
    color: rgba(255, 255, 255, 0.75);
  }

  .menu-text-0 {
    margin: 1vw 15vw;
    margin-bottom: 3vw;
  }

  .menu-text-1 {
    margin: 1vw;
    margin-top: 3vw;
  }

  @media only screen and (max-width: 600px) {
    .menu-text-0,
    .menu-text-1 {
      font-size: inherit;
      line-height: 1.6em;
    }
  }
</style>
