// Pure text helpers for the full (source) posts. Used by the generator and the validator, never by the browser.
const strip = s => String(s || '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\*\*/g, '');
export function postText(p) {
  const parts = [p.summary];
  for (const b of p.body) {
    if (b.x) parts.push(b.x);
    if (b.items) parts.push(...b.items);
    if (b.head) parts.push(...b.head);
    if (b.rows) b.rows.forEach(r => parts.push(...r));
  }
  return parts.map(strip).join(' ');
}
export const wordCount = p => postText(p).split(/\s+/).filter(Boolean).length;
export const readMinutes = p => Math.max(1, Math.round(wordCount(p) / 220));
