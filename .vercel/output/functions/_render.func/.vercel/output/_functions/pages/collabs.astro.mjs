import { c as createComponent, r as renderTemplate, a as renderComponent } from '../chunks/astro/server_CmcIHm7_.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/stories_2fVoUydP.mjs';
import { T as TilesCollection } from '../chunks/TilesCollection_CtvH6FC6.mjs';
export { renderers } from '../renderers.mjs';

const $$Collabs = createComponent(($$result, $$props, $$slots) => {
  const title = "Collabs | CoNexus";
  const header = "Collabs";
  const subheading = `
Collabs are stories that are custom-written to add depth to the partners of DeGenerous DAO.`;
  const arrow = true;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "header": header, "subheading": subheading, "arrow": arrow }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "TilesCollection", TilesCollection, { "sectionName": "Collabs", "client:load": true, "client:component-hydration": "load", "client:component-path": "@components/TilesCollection.svelte", "client:component-export": "default" })} ` })}`;
}, "/Users/dima/Desktop/conexus/src/pages/Collabs.astro", void 0);

const $$file = "/Users/dima/Desktop/conexus/src/pages/Collabs.astro";
const $$url = "/Collabs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Collabs,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
