import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSite } from '../lib/site-context';
import { services, industries, articles, workProjects, slugify, GLYPH, EMAIL } from '../lib/site';

const ITEMS = [];
const add = (type, title, href, glyph, kw = '', sub = '') => ITEMS.push({ type, title, href, path: href.replace(/^\/#/, '/#'), glyph, kw: kw + ' ' + type, sub });
add('Page', 'Home', '/', '~', 'start top hero');
add('Page', 'Services', '/services', 'S', 'what we build');
add('Page', 'Industries', '/industries', 'I', 'sectors');
add('Page', 'Demo Studio', '/demo-studio', '▶', 'demos try playground ecommerce fitness snake crm whatsapp sheets');
add('Page', 'Our Work', '/work', 'W', 'case studies projects concepts');
add('Page', 'Hire Team', '/team', 'HT', 'hire developers engineers designers team dedicated');
add('Page', 'About Us', '/about', 'i', 'company story mission values founder');
add('Page', 'Careers', '/careers', '#', 'jobs collaborate');
add('Page', 'Blog', '/blog', 'Aa', 'articles guides insights');
add('Page', 'Contact', '/contact', '@', 'quote enquiry email form project');
add('Page', 'Tech stack', '/#stack', 'TS', 'technologies tools react node java flutter docker');
add('Page', 'Certifications', '/#credentials', '✓', 'iso 9001 27001 soc gdpr hipaa pci awards testimonials compliance');
add('Page', 'FAQ', '/#faq', '?', 'questions answers cost ownership');
add('Page', 'Privacy policy', '/privacy', 'P'); add('Page', 'Terms of service', '/terms', 'T');
services.forEach(s => {
  add('Service', s.title, s.path, GLYPH[s.slug], s.headline + ' ' + s.description, s.headline);
  s.subs.forEach(x => add('Service', x.title, x.path, GLYPH[s.slug], s.title + ' ' + x.description, s.title));
});
industries.forEach(i => add('Industry', i.name, '/industries/' + i.slug, i.name.slice(0, 2), i.copy + ' ' + i.examples.join(' '), i.role));
workProjects.forEach(w => add('Work', w.name, '/work/' + w.slug, w.name.slice(0, 2), w.title + ' ' + w.industry + ' ' + w.category, w.title));
articles.forEach(a => add('Blog', a.title, '/blog/' + a.slug, 'Aa', a.desc + ' ' + a.category, a.category.toLowerCase()));

function score(q, t) {
  q = q.toLowerCase(); t = t.toLowerCase(); if (!q) return 1;
  const i = t.indexOf(q); if (i >= 0) return 200 - Math.min(i, 150) + (i === 0 ? 60 : 0) + (t.length === q.length ? 60 : 0);
  let qi = 0, s = 0, last = -2;
  for (let k = 0; k < t.length && qi < q.length; k++) if (t[k] === q[qi]) { s += k === last + 1 ? 5 : 1; if (k === 0 || /[\s/\-]/.test(t[k - 1])) s += 3; last = k; qi++; }
  return qi === q.length ? s : 0;
}
const HEAD = { Service: 'Services', Industry: 'Industries', Work: 'Our work', Blog: 'Blog', Page: 'Pages' };

export default function Palette() {
  const { paletteOpen, closePalette, toggleTheme, copy } = useSite();
  const dlg = useRef(null), input = useRef(null);
  const [q, setQ] = useState(''); const [sel, setSel] = useState(0);

  const ACTIONS = useMemo(() => [
    { title: 'Get a quote', sub: 'Open the enquiry form', glyph: '>', kw: 'contact project hire', run: () => { window.location.assign('/contact'); } },
    { title: 'Copy email address', sub: EMAIL, glyph: 'cp', kw: 'mail clipboard', run: () => copy(EMAIL, <>Copied <span className="mono">{EMAIL}</span></>) },
    { title: 'Toggle theme', sub: 'Switch between light and dark', glyph: 'UI', kw: 'dark light mode appearance', run: toggleTheme },
    { title: 'Open Demo Studio', sub: 'Try the interactive demos', glyph: '▶', kw: 'demos play', run: () => { window.location.assign('/demo-studio'); } },
    { title: 'Browse services', sub: 'See every service', glyph: '{ }', kw: 'what we build', run: () => { window.location.assign('/services'); } },
    { title: 'Browse industries', sub: 'See every industry', glyph: 'I', kw: 'sectors', run: () => { window.location.assign('/industries'); } }
  ], [copy, toggleTheme]);

  const results = useMemo(() => {
    const raw = q.trim(); let out = [];
    if (raw.startsWith('>')) {
      const aq = raw.slice(1).trim();
      ACTIONS.forEach(a => { const s = score(aq, a.title + ' ' + a.kw); if (s) out.push({ s, head: 'Actions', a }); });
      return out.sort((x, y) => y.s - x.s);
    }
    if (!raw) {
      ACTIONS.slice(0, 3).forEach(a => out.push({ s: 1, head: 'Actions', a }));
      services.slice(0, 6).forEach(s => out.push({ s: 1, head: 'Services', it: ITEMS.find(x => x.href === s.path) }));
      return out;
    }
    const ql = raw.toLowerCase();
    ITEMS.forEach(it => { const hay = it.title + ' ' + it.kw + ' ' + it.href; const s = Math.max(score(raw, it.title) * 2, score(raw, hay)); if (s) out.push({ s, direct: hay.toLowerCase().includes(ql), head: HEAD[it.type], it }); });
    ACTIONS.forEach(a => { const hay = a.title + ' ' + a.kw; const s = score(raw, hay); if (s) out.push({ s: s * 0.8, direct: hay.toLowerCase().includes(ql), head: 'Actions', a }); });
    if (out.some(r => r.direct)) out = out.filter(r => r.direct);
    out.sort((x, y) => y.s - x.s); out = out.slice(0, 40);
    const order = []; out.forEach(r => { if (!order.includes(r.head)) order.push(r.head); });
    return out.sort((x, y) => order.indexOf(x.head) - order.indexOf(y.head));
  }, [q, ACTIONS]);

  useEffect(() => { setSel(0); }, [q]);
  useEffect(() => {
    const d = dlg.current; if (!d) return;
    if (paletteOpen && !d.open) { setQ(''); if (d.showModal) d.showModal(); else d.setAttribute('open', ''); setTimeout(() => input.current && input.current.focus(), 10); }
    if (!paletteOpen && d.open) { if (d.close) d.close(); else d.removeAttribute('open'); }
  }, [paletteOpen]);
  /* global shortcuts: Ctrl or Cmd + K, and / */
  const { openPalette } = useSite();
  useEffect(() => {
    const k = e => {
      const tag = (e.target && e.target.tagName) || '';
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); paletteOpen ? closePalette() : openPalette(); }
      else if (e.key === '/' && !paletteOpen && !/INPUT|TEXTAREA|SELECT/.test(tag) && !(e.target && e.target.isContentEditable)) { e.preventDefault(); openPalette(); }
    };
    document.addEventListener('keydown', k); return () => document.removeEventListener('keydown', k);
  }, [paletteOpen, closePalette, openPalette]);

  const choose = i => {
    const r = results[i]; if (!r) return; closePalette();
    if (r.a) setTimeout(r.a.run, 60); else setTimeout(() => window.location.assign(r.it.href), 60);
  };
  const onKey = e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(results.length - 1, s + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel(s => Math.max(0, s - 1)); }
    else if (e.key === 'Enter') { e.preventDefault(); choose(sel); }
    else if (e.key === 'Escape') { e.preventDefault(); closePalette(); }
    else if (e.key === 'Tab') e.preventDefault();
  };
  useEffect(() => { const el = document.getElementById('po-' + sel); el && el.scrollIntoView({ block: 'nearest' }); }, [sel]);
  const hl = (t) => { const raw = q.trim().startsWith('>') ? q.trim().slice(1).trim() : q.trim(); const i = raw ? t.toLowerCase().indexOf(raw.toLowerCase()) : -1; return i < 0 ? t : <>{t.slice(0, i)}<mark>{t.slice(i, i + raw.length)}</mark>{t.slice(i + raw.length)}</>; };

  let head = '';
  return (
    <dialog className="pal" id="pal" closedby="any" aria-label="Search Cubusify" ref={dlg} onClose={closePalette} onClick={e => { if (e.target === dlg.current) closePalette(); }}>
      <div className="pal-card">
        <div className="pal-in">
          <svg aria-hidden="true"><use href="#i-search" /></svg>
          <input id="pal-q" ref={input} type="text" role="combobox" aria-expanded="true" aria-controls="pal-list" aria-autocomplete="list" aria-activedescendant={results.length ? 'po-' + sel : undefined} autoComplete="off" spellCheck="false" placeholder="Search services, work, industries. Type > for actions" aria-label="Search" value={q} onChange={e => setQ(e.target.value)} onKeyDown={onKey} />
          <kbd>Esc</kbd>
        </div>
        <ul className="pal-list" id="pal-list" role="listbox" aria-label="Results">
          {!results.length && <li className="pal-empty" role="presentation">No results for <b>{q}</b>. Try a service, an industry, or <kbd>&gt;</kbd> for actions.</li>}
          {results.map((r, i) => {
            const o = r.a || r.it, showHead = r.head !== head; head = r.head;
            return (
              <React.Fragment key={i}>
                {showHead && <li className="pal-h" role="presentation">{r.head}</li>}
                <li id={'po-' + i} role="option" aria-selected={i === sel} className="pal-o" onPointerMove={() => setSel(i)} onClick={() => choose(i)}>
                  <span className="ico">{o.glyph}</span>
                  <span className="pt"><b>{hl(r.a ? r.a.title : r.it.title)}</b>{(r.a ? r.a.sub : r.it.sub) && <small>{r.a ? r.a.sub : r.it.sub}</small>}</span>
                  <span className="rt">{r.a ? 'action' : r.it.href}</span>
                </li>
              </React.Fragment>
            );
          })}
        </ul>
        <div className="pal-foot"><span><kbd>↑</kbd><kbd>↓</kbd> move</span><span><kbd>↵</kbd> open</span><span><kbd>&gt;</kbd> actions</span><span><kbd>Esc</kbd> close</span></div>
      </div>
    </dialog>
  );
}
