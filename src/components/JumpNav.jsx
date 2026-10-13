import React, { useEffect, useState } from 'react';
import { Icon } from './icons';

/* A sticky "on this page" bar. The link for the section being read is highlighted (scrollspy via IntersectionObserver,
   which works in every browser; the first link is active until the reader scrolls). */
export default function JumpNav({ items, label = 'On this page' }) {
  const [active, setActive] = useState(items[0][0]);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const els = items.map(([id]) => document.getElementById(id)).filter(Boolean);
    const seen = new Map();
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => seen.set(e.target.id, e.isIntersecting));
      const first = els.find(el => seen.get(el.id));
      if (first) setActive(first.id);
    }, { rootMargin: '-30% 0px -60% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <nav className="jump2" aria-label={label}>
      <ul className="wrap">
        {items.map(([id, text, icon]) => (
          <li key={id}><a href={'#' + id} aria-current={active === id ? 'true' : undefined}><Icon name={icon} />{text}</a></li>
        ))}
      </ul>
    </nav>
  );
}
