import React, { useEffect, useRef, useState } from 'react';
import { useSite } from '../lib/site-context';
import { blank } from '../lib/proof';
import { TECHN, tech } from '../lib/site';
import { Icon } from './icons';

export const Dash = () => <span className="dash">—</span>;
export const val = v => (blank(v) ? <Dash /> : v);

/* Headings rise from a mask the first time they scroll into view */
export function Heading({ as: Tag = 'h2', children, id, className, style }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (!('IntersectionObserver' in window)) { el.classList.add('in'); return; }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); } }), { threshold: 0.35 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <Tag id={id} className={className} style={style}><span className="rev" ref={ref}><span>{children}</span></span></Tag>;
}

/* A screenshot in a browser frame. With no picture (src is null) the frame shows an empty image holder instead;
   empty frames carry blank-only, so PROOF.showBlanks = false hides them at launch. */
export function BrowserFrame({ url, src, alt = '', eager = false }) {
  if (!src) {
    return (
      <div className="bf bf-empty blank-only" aria-hidden="true">
        <div className="bf-bar"><i /><i /><i /><span className="bf-url mono">{url}</span></div>
        <div className="bf-body"><Holder label="Screenshot" size="1120 × 630" /></div>
      </div>
    );
  }
  return (
    <div className="bf">
      <div className="bf-bar"><i /><i /><i /><span className="bf-url mono">{url}</span></div>
      <div className="bf-body"><img className="on" src={src} alt={alt} width="560" height="315" loading={eager ? 'eager' : 'lazy'} decoding="async" /></div>
    </div>
  );
}

/* The empty-picture surface: hatched, with what goes here and the size to use. Fills its positioned parent. */
export function Holder({ label = 'Image', size, icon = 'image' }) {
  return (
    <div className="ph" aria-hidden="true">
      <Icon name={icon} /><b>{label}</b>{size && <small className="mono">{size} px · empty, add image</small>}
    </div>
  );
}

/* A person's photo, or a monogram holder with their initials until a photo is added */
export function PersonPhoto({ src, name = '', size = 'md' }) {
  if (src) return <img className={'person person-' + size} src={src} alt={name} width="160" height="160" loading="lazy" />;
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
  return <span className={'person person-ph person-' + size} aria-hidden="true">{initials || <Icon name="users" />}</span>;
}

export function TechChip({ t }) {
  return t.startsWith('txt:') ? <li className="t">{t.slice(4)}</li> : <li><img src={tech(t)} alt="" width="14" height="14" loading="lazy" decoding="async" />{TECHN[t]}</li>;
}

/* tiny syntax highlighter that returns React nodes (no innerHTML) */
const HL = /(\/\/[^\n]*|^#[^\n]*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')|\b(const|await|async|if|return|export|default|true|false)\b|\b(\d+(?:\.\d+)?)\b|([A-Za-z_$][\w$]*)(?=\()|([A-Za-z_$][\w$]*)(?=\s*:)/g;
export function highlightLine(line) {
  const out = []; let last = 0, m; const re = new RegExp(HL.source, 'g');
  while ((m = re.exec(line))) {
    if (m.index > last) out.push(line.slice(last, m.index));
    const c = m[1] ? 'c' : m[2] ? 's' : m[3] ? 'k' : m[4] ? 'n' : m[5] ? 'f' : 'p';
    out.push(<span key={m.index} className={'t-' + c}>{m[0]}</span>); last = re.lastIndex;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}
export function CodeWindow({ file, code, animate = false }) {
  const { copy } = useSite(); const [done, setDone] = useState(false);
  return (
    <div className="cw">
      <div className="cw-bar"><span className="dots"><i /><i /><i /></span><span>{file}</span>
        <button className="cw-copy" type="button" onClick={() => { copy(code, <>Copied <span className="mono">{file}</span></>); setDone(true); setTimeout(() => setDone(false), 1500); }}><span>{done ? 'Copied' : 'Copy'}</span></button></div>
      <pre><code>{code.split('\n').map((l, i) => <span className="ln" style={{ '--i': i }} key={i}>{highlightLine(l) .length ? highlightLine(l) : ' '}</span>)}</code></pre>
    </div>
  );
}

export function Breadcrumb({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>{items.map(([label, href], i) => <li key={label}>{href ? <a href={href}>{label}</a> : <span aria-current="page">{label}</span>}</li>)}</ol>
    </nav>
  );
}

/* Standard top of an inner page. Exactly one h1 per page. */
export function PageHero({ crumbs, title, lead, children, aside, tone, kicker }) {
  return (
    <header className={'phero' + (tone ? ' ' + tone : '')}>
      <div className="wrap phero-in">
        <div>
          {crumbs && <Breadcrumb items={crumbs} />}
          {kicker && <div className="kicker">{kicker}</div>}
          <h1>{title}</h1>
          {lead && <p className="phero-lead">{lead}</p>}
          {children && <div className="actions">{children}</div>}
        </div>
        {aside && <div className="phero-aside">{aside}</div>}
      </div>
    </header>
  );
}

export function CtaBand({ title = 'Tell us where the map ends.', text = 'Describe the goal, the deadline and what you already have. A reply is on its way within 24 hours.' }) {
  return (
    <section className="cta-band" aria-label="Start a project">
      <div className="wrap cta-in"><div><h2>{title}</h2><p>{text}</p></div><a className="btn" href="/contact">Start your project</a></div>
    </section>
  );
}

/* Inline text: [label](/path) links and **bold**. Built as React nodes, never innerHTML. */
const RT = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
export function RichText({ text }) {
  const out = []; let last = 0, m, k = 0; const re = new RegExp(RT.source, 'g'); const s = String(text || '');
  while ((m = re.exec(s))) {
    if (m.index > last) out.push(s.slice(last, m.index));
    if (m[1]) out.push(<a key={k++} href={m[2]} {...(/^https?:/.test(m[2]) ? { rel: 'noopener' } : {})}>{m[1]}</a>);
    else out.push(<strong key={k++}>{m[3]}</strong>);
    last = re.lastIndex;
  }
  if (last < s.length) out.push(s.slice(last));
  return <>{out}</>;
}

/* An image frame that is empty on purpose. Give it a src later and it becomes a real figure.
   Empty frames carry the blank-only class, so PROOF.showBlanks = false hides every one at launch. */
const SLOT_KIND = { desktop: ['Desktop view', '1600 × 1000'], mobile: ['Mobile view', '780 × 1688'], wide: ['Wide image', '1600 × 900'], square: ['Square image', '1200 × 1200'] };
export function ImageSlot({ ratio = 'desktop', src, alt = '', label, brief, caption, eager = false }) {
  if (src) {
    return (
      <figure className={'fig ratio-' + ratio}>
        <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    );
  }
  const [name, size] = SLOT_KIND[ratio] || SLOT_KIND.wide;
  return (
    <figure className={'imgslot blank blank-only ratio-' + ratio} aria-hidden="true">
      <div className="imgslot-box">
        <span className="imgslot-name">{label || name}</span>
        <span className="imgslot-size mono">{size} px · empty, add image</span>
        {brief && <span className="imgslot-brief">{brief}</span>}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/* Desktop and mobile views side by side. Both frames are empty until slots.js gets paths. */
export function DeviceDuo({ title, text, desktop = {}, mobile = {}, id }) {
  return (
    <section className={'pgsec duo-sec' + (desktop.src || mobile.src ? '' : ' blank-only')} id={id} aria-label={title}>
      <div className="wrap">
        <div className="pg-head"><h2>{title}</h2>{text && <p>{text}</p>}</div>
        <div className="duo">
          <ImageSlot ratio="desktop" src={desktop.src} alt={desktop.alt} />
          <ImageSlot ratio="mobile" src={mobile.src} alt={mobile.alt} />
        </div>
      </div>
    </section>
  );
}
