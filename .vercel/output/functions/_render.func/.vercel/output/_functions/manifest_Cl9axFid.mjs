import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_GfudMyeC.mjs';
import 'es-module-lexer';
import { d as decodeKey } from './chunks/astro/server_CmcIHm7_.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/dima/Desktop/conexus/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BB6uRyKX.js"}],"styles":[{"type":"external","src":"/_astro/Collabs.DE6IJP8a.css"},{"type":"external","src":"/_astro/Collabs.D8pasN30.css"}],"routeData":{"route":"/collabs","isIndex":false,"type":"page","pattern":"^\\/Collabs\\/?$","segments":[[{"content":"Collabs","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Collabs.astro","pathname":"/Collabs","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BB6uRyKX.js"}],"styles":[{"type":"external","src":"/_astro/Collabs.DE6IJP8a.css"},{"type":"external","src":"/_astro/Collabs.D8pasN30.css"}],"routeData":{"route":"/communitypicks","isIndex":false,"type":"page","pattern":"^\\/CommunityPicks\\/?$","segments":[[{"content":"CommunityPicks","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/CommunityPicks.astro","pathname":"/CommunityPicks","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BB6uRyKX.js"}],"styles":[{"type":"external","src":"/_astro/Collabs.DE6IJP8a.css"},{"type":"external","src":"/_astro/Collabs.D8pasN30.css"}],"routeData":{"route":"/thedischordiansaga","isIndex":false,"type":"page","pattern":"^\\/TheDischordianSaga\\/?$","segments":[[{"content":"TheDischordianSaga","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/TheDischordianSaga.astro","pathname":"/TheDischordianSaga","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BB6uRyKX.js"}],"styles":[{"type":"external","src":"/_astro/Collabs.DE6IJP8a.css"},{"type":"external","src":"/_astro/index.59pSRVcC.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/dima/Desktop/conexus/src/pages/Collabs.astro",{"propagation":"none","containsHead":true}],["/Users/dima/Desktop/conexus/src/pages/CommunityPicks.astro",{"propagation":"none","containsHead":true}],["/Users/dima/Desktop/conexus/src/pages/TheDischordianSaga.astro",{"propagation":"none","containsHead":true}],["/Users/dima/Desktop/conexus/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/Collabs@_@astro":"pages/collabs.astro.mjs","\u0000@astro-page:src/pages/CommunityPicks@_@astro":"pages/communitypicks.astro.mjs","\u0000@astro-page:src/pages/TheDischordianSaga@_@astro":"pages/thedischordiansaga.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/Users/dima/Desktop/conexus/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_Cl9axFid.mjs","@components/TilesCollection.svelte":"_astro/TilesCollection.D9VdhDfS.js","@components/Menu.svelte":"_astro/Menu.BqvnRFWL.js","@components/Profile.svelte":"_astro/Profile.DUHgu6u4.js","@astrojs/svelte/client.js":"_astro/client.CWY0IrnN.js","/astro/hoisted.js?q=0":"_astro/hoisted.BB6uRyKX.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/Collabs.DE6IJP8a.css","/_astro/Collabs.D8pasN30.css","/_astro/index.59pSRVcC.css","/Upcoming.avif","/conexusBG.avif","/favicon.png","/logo.avif","/title.avif","/title.png","/_astro/Collabs.DjfM9PW9.css","/_astro/Menu.BqvnRFWL.js","/_astro/Profile.DUHgu6u4.js","/_astro/TilesCollection.D9VdhDfS.js","/_astro/account.CmXSchs1.js","/_astro/client.CWY0IrnN.js","/_astro/hoisted.BB6uRyKX.js","/_astro/index.Cz-7uHCl.js","/_astro/stories.vO6mAdw0.js","/icons/backArrow.avif","/icons/checkmark.png","/icons/close.png","/icons/coinbase.png","/icons/copyicon.png","/icons/delete.png","/icons/email.png","/icons/filter.png","/icons/fullscreen-exit.png","/icons/fullscreen.png","/icons/google.png","/icons/invisibleicon.png","/icons/loading.svg","/icons/mail.png","/icons/option-selector.png","/icons/play.png","/icons/profileIcon.avif","/icons/quit-fullscreen.png","/icons/quit.png","/icons/replay.png","/icons/search.png","/icons/step-arrow-fullscreen.png","/icons/step-arrow.png","/icons/visibleicon.png","/icons/voice.png","/icons/volume.png","/icons/walletconnect.png"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"A2MVf+bLaeFfp0N+QdAiZKvVPNwVJZwQItoZuTS0tao=","experimentalEnvGetSecretEnabled":false});

export { manifest };
