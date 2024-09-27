import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_CE8IcpZo.mjs';
import { manifest } from './manifest_Cl9axFid.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/collabs.astro.mjs');
const _page2 = () => import('./pages/communitypicks.astro.mjs');
const _page3 = () => import('./pages/thedischordiansaga.astro.mjs');
const _page4 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/Collabs.astro", _page1],
    ["src/pages/CommunityPicks.astro", _page2],
    ["src/pages/TheDischordianSaga.astro", _page3],
    ["src/pages/index.astro", _page4]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "e4765abe-a41e-4e27-b564-3a575d6a4d48",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
