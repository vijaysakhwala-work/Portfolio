// The blog index: light fields for every post (title, summary, dates, reading time). Always shipped.
// A post's body, key takeaways and FAQ are written in src/content/blog-*.js and split out by scripts/split-content.mjs;
// they load only on that post's page (see src/content/preload.js). Plain ES module: the prerender script imports it from Node.
import { postsLight } from './content/gen/posts-light.js';
import { getHeavy } from './content/store.js';

export { POST_ORDER } from './content/order.js';
export const posts = postsLight;
export const postBySlug = slug => posts.find(p => p.slug === slug) || null;
export const postBody = slug => getHeavy('post:' + slug);
export const readMinutes = p => p.minutes || 1;
export const fmtDate = iso => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export const headingId = text => String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
