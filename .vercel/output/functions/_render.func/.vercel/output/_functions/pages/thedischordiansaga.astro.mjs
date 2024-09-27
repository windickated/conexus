import { c as createComponent, r as renderTemplate, a as renderComponent } from '../chunks/astro/server_CmcIHm7_.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/stories_2fVoUydP.mjs';
import { T as TilesCollection } from '../chunks/TilesCollection_CtvH6FC6.mjs';
export { renderers } from '../renderers.mjs';

const $$TheDischordianSaga = createComponent(($$result, $$props, $$slots) => {
  const title = "The Dischordian Saga | CoNexus";
  const header = "The Dischordian Saga";
  const subheading = `
The Dischordian Saga led to the creation of CoNexus and tells the epic narrative of wars between Artificial Intelligence and Humanity.
<a href="https://magiceden.io/collections/ethereum/0xfa511d5c4cce10321e6e86793cc083213c36278e" target="_blank">Potentials</a>
vote on
<a href="https://governance.degenerousdao.com/" target="_blank">story nodes</a>
weekly, thus activating CoNexus story games and guiding the franchise's direction.
`;
  const arrow = true;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "header": header, "subheading": subheading, "arrow": arrow }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "TilesCollection", TilesCollection, { "sectionName": "The Dischordian Saga", "client:load": true, "client:component-hydration": "load", "client:component-path": "@components/TilesCollection.svelte", "client:component-export": "default" })} ` })}`;
}, "/Users/dima/Desktop/conexus/src/pages/TheDischordianSaga.astro", void 0);

const $$file = "/Users/dima/Desktop/conexus/src/pages/TheDischordianSaga.astro";
const $$url = "/TheDischordianSaga";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$TheDischordianSaga,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
