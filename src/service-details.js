// Service content. `serviceDetails` is the light index (SEO fields and the AI one-liner), always shipped.
// The long text is written in src/content/services-*.js, split out by scripts/split-content.mjs and loaded only on that
// service's pages (see src/content/preload.js). Plain ES module: the prerender script imports it from Node.
import { serviceLight } from './content/gen/services-light.js';
import { getHeavy } from './content/store.js';

export const serviceDetails = serviceLight;
/* Full service content, or null when this page's text has not been loaded */
export const fullService = slug => { const h = getHeavy('svc:' + slug); return h ? { ...serviceLight[slug], ...h } : null; };
/* A sub-service: the light fields always, the full text once the service's chunk is loaded */
export const subDetail = (serviceSlug, subSlug) => {
  const l = serviceLight[serviceSlug]?.subs?.[subSlug]; if (!l) return null;
  const h = getHeavy('svc:' + serviceSlug)?.subs?.[subSlug];
  return h ? { ...l, ...h } : l;
};
