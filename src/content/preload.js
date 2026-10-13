// Loads the long-form text for one route (a service page or a blog post) into the store.
// Every other page needs only the light index, so the home page ships none of this text.
import { routeInfo } from '../catalog.js';
import { postLoaders, svcLoaders } from './gen/loaders.js';
import { setHeavy } from './store.js';

const load = async (key, loader) => { if (loader) setHeavy(key, (await loader()).default); };
export async function preload(path) {
  const r = routeInfo(path);
  if (r.type === 'article') await load('post:' + r.article.slug, postLoaders[r.article.slug]);
  if (r.service) await load('svc:' + r.service.slug, svcLoaders[r.service.slug]);
}
export async function preloadAll() {
  await Promise.all([
    ...Object.entries(postLoaders).map(([k, l]) => load('post:' + k, l)),
    ...Object.entries(svcLoaders).map(([k, l]) => load('svc:' + k, l)),
  ]);
}
