import React from 'react';
import { Icon } from './icons';
import { RichText } from './ui';

/* Scannable text: the first sentence is the takeaway, the rest sits behind a native <details> "Read more".
   <details> stays in the page for search engines, screen readers and the browser's find-in-page. */
const ABBR = /\b(e\.g|i\.e|vs|etc|approx|inc|no|fig|eg|ie)\.$/i;
const balanced = s => (s.match(/\[/g) || []).length === (s.match(/\]/g) || []).length && (s.match(/\(/g) || []).length === (s.match(/\)/g) || []).length && (s.match(/\*\*/g) || []).length % 2 === 0;

/* [lead, rest]. Short texts stay whole. The lead is at least `minLead` characters so it can stand alone. */
export function splitLead(text, { whole = 170, minLead = 40 } = {}) {
  const s = String(text || '').trim();
  if (s.length <= whole) return [s, ''];
  const re = /[.!?](?=\s+[A-Z0-9“"(\[])/g;
  let m;
  while ((m = re.exec(s))) {
    const head = s.slice(0, m.index + 1);
    if (head.length < minLead || ABBR.test(head) || !balanced(head)) continue;
    return [head, s.slice(m.index + 1).trim()];
  }
  return [s, ''];
}

export function More({ children }) {
  return (
    <details className="more">
      <summary><span className="m-closed">Read more</span><span className="m-open">Show less</span><Icon name="chevron-down" /></summary>
      <p>{children}</p>
    </details>
  );
}

export function LeadText({ text, className = '', whole, minLead }) {
  const [lead, rest] = splitLead(text, { whole, minLead });
  return (
    <>
      <p className={'lt' + (className ? ' ' + className : '')}><RichText text={lead} /></p>
      {rest && <More><RichText text={rest} /></More>}
    </>
  );
}
