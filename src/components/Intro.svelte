<script>
	import stories from "@components/tilesData.js";
	import MenuTile from "@components/menuTile.svelte";

	const sections = [];
	stories.map((story, i) => (sections[i] = story.section));

	const menuText = [
		"A new world with no limits awaits you.",
		"Within CoNexus, you will transcend the boundaries of reality as we know it.",
	];
</script>

<p class="menu-text-0">{menuText[0]}</p>

{#each sections as sectionName}
	<MenuTile {sectionName} />
{/each}

<p class="menu-text-1">{menuText[1]}</p>

<style>
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
</style>
