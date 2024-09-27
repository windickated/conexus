import { c as createComponent, r as renderTemplate, a as renderComponent } from '../chunks/astro/server_CmcIHm7_.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/stories_2fVoUydP.mjs';
import { T as TilesCollection } from '../chunks/TilesCollection_CtvH6FC6.mjs';
export { renderers } from '../renderers.mjs';

const $$CommunityPicks = createComponent(($$result, $$props, $$slots) => {
  const title = "Community Picks | CoNexus";
  const header = "Community Picks";
  const subheading = `
Community Picks are stories that aren't bound to any project or genre but have been demanded, written, or voted in by the
<a href="https://magiceden.io/collections/ethereum/0xfa511d5c4cce10321e6e86793cc083213c36278e" target="_blank">Potentials</a>
holders.`;
  const arrow = true;
  const filters = true;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "header": header, "subheading": subheading, "arrow": arrow }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "TilesCollection", TilesCollection, { "sectionName": "Community Picks", "filters": filters, "client:load": true, "client:component-hydration": "load", "client:component-path": "@components/TilesCollection.svelte", "client:component-export": "default" })} ` })}`;
}, "/Users/dima/Desktop/conexus/src/pages/CommunityPicks.astro", void 0);

const $$file = "/Users/dima/Desktop/conexus/src/pages/CommunityPicks.astro";
const $$url = "/CommunityPicks";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CommunityPicks,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
