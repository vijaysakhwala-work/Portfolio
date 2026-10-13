// The full, hand-written content, merged. Node only (generator, validator, build checks).
// The browser never imports this: it gets src/content/gen/* instead.
import { details as build } from './services-build.js';
import { details as growth } from './services-growth.js';
import { details as ai } from './services-ai.js';
import { details as ops } from './services-ops.js';
import { posts as p1 } from './blog-1.js';
import { posts as p2 } from './blog-2.js';
import { posts as p3 } from './blog-3.js';
import { posts as p4 } from './blog-4.js';
import { POST_ORDER } from './order.js';

export const serviceFull = { ...build, ...growth, ...ai, ...ops };
const all = [...p1, ...p2, ...p3, ...p4];
export const postsFull = [
  ...POST_ORDER.map(slug => all.find(p => p.slug === slug)).filter(Boolean),
  ...all.filter(p => !POST_ORDER.includes(p.slug)),
];
