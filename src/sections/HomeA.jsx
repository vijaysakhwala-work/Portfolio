import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PROOF, blank } from '../lib/proof';
import { Icon as Pic } from '../components/icons';
import { services, svc, GLYPH, IND_ORDER, ind, IND_POS, industryImg, TECH_CATS, TECHN, tech, svcImg, STACK } from '../lib/site';
import { Heading } from '../components/ui';
import { useReducedMotion } from '../lib/site-context';

const Cube = () => <svg aria-hidden="true"><use href="#cube" /></svg>;

/* ---------- Trust strip ---------- */
function Stat({ s }) {
  const has = !blank(s.value), ref = useRef(null), reduce = useReducedMotion();
  const [n, setN] = useState(has ? s.value : 0);
  useEffect(() => {
    if (!has || reduce || !ref.current || !('IntersectionObserver' in window)) { setN(has ? s.value : 0); return; }
    setN(0);
    const io = new IntersectionObserver(es => { if (!es[0].isIntersecting) return; io.disconnect(); const t0 = performance.now(); (function tick(now) { const k = Math.min(1, (now - t0) / 1500); setN(Math.round(s.value * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(tick); })(t0); }, { threshold: 0.6 });
    io.observe(ref.current); return () => io.disconnect();
  }, [has, s.value, reduce]);
  return <div className={'stat' + (has ? '' : ' blank-only')}><dt>{s.label}</dt><dd ref={ref} className={has ? '' : 'is-blank'}>{has ? n + (s.suffix || '') : '—'}</dd></div>;
}
export function TrustStrip() {
  const P = PROOF;
  return (
    <section className="trust defer" id="trust" aria-labelledby="trust-h">
      <div className="wrap">
        <h2 className="sr-only" id="trust-h">Cubusify in numbers, and who trusts us</h2>
        <dl className="stats">{P.stats.map(s => <Stat key={s.label} s={s} />)}</dl>
        <div className="logos-head"><h3>Trusted by</h3>{!P.clients.length && <span className="draft blank-only">blank: add client logos, with permission</span>}</div>
        <ul className="logo-row">
          {P.clients.length ? P.clients.map(c => <li key={c.name}>{c.url ? <a href={c.url} target="_blank" rel="noopener"><img src={c.logo} alt={c.name} loading="lazy" decoding="async" height="36" /></a> : <img src={c.logo} alt={c.name} loading="lazy" decoding="async" height="36" />}</li>)
            : [0, 1, 2, 3, 4, 5].map(i => <li key={i} className="blank blank-only">Client logo</li>)}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Services index ---------- */
export function ServicesIndex() {
  const [cur, setCur] = useState(0);
  const wide = () => typeof window !== 'undefined' && window.matchMedia('(min-width: 900px)').matches;
  return (
    <section className="sec defer" id="services" aria-labelledby="svc-h">
      <div className="wrap">
        <div className="sec-head"><Heading id="svc-h">One team for everything your business runs on.</Heading><p>Choose a service to see what we build inside it.</p></div>
        <div className="svc-list">
          {services.map((s, i) => (
            <React.Fragment key={s.slug}>
              <button type="button" className="svc-btn" id={'sb-' + s.slug} aria-controls={'sp-' + s.slug} aria-expanded={cur === i}
                onClick={() => setCur(c => (c === i && !wide() ? -1 : i))} onPointerEnter={e => { if (e.pointerType === 'mouse' && wide()) setCur(i); }}>
                <span className="glyph"><Cube /></span><span className="name">{s.title}</span><span className="count">{s.subs.length} services</span>
              </button>
              <div className={'svc-panel' + (cur === i ? ' is-active' : '')} id={'sp-' + s.slug} role="region" aria-labelledby={'sb-' + s.slug}>
                <div className="svc-panel-in">
                  <h3>{s.headline}</h3><p className="d">{s.description}</p>
                  <ul>{s.subs.map((x, k) => <li key={x.slug} style={{ '--k': k }}><Cube /><div><b>{x.title}</b><span>{x.description}</span></div></li>)}</ul>
                  <a className="btn ghost" href={s.path}>Explore {s.title}</a>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Industries ---------- */
export function IndustryStrip() {
  const [open, setOpen] = useState(0);
  return (
    <section className="sec defer" id="industries" aria-labelledby="ind-h" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head"><Heading id="ind-h">Built around your industry.</Heading><p>Different businesses. Different workflows. Software that fits yours.</p></div>
        <div className="gallery">
          {IND_ORDER.map((sl, i) => {
            const x = ind[sl];
            return (
              <article key={sl} className={'pane' + (open === i ? ' is-open' : '')} style={{ '--pos': IND_POS[sl], '--tint': x.color }} onPointerEnter={e => { if (e.pointerType === 'mouse' && window.matchMedia('(min-width: 761px)').matches) setOpen(i); }}>
                {industryImg(sl) ? <img src={industryImg(sl)} alt="" width="900" height="600" loading="lazy" decoding="async" /> : <span className="pane-ph blank-only" aria-hidden="true"><Pic name="image" />Industry image</span>}
                <span className="pane-name">{x.name}</span>
                <button className="pane-toggle" type="button" aria-expanded={open === i} onClick={() => setOpen(i)} onFocus={() => setOpen(i)}><span className="sr-only">{x.name}: {x.role}</span></button>
                <div className="pane-info"><h3>{x.name}</h3><p>{x.role} {x.copy}</p>
                  {x.examples.length > 0 && <ul className="chips">{x.examples.map(e => <li key={e}>{e}</li>)}</ul>}
                  <a href={'/industries/' + sl}>See {x.name} solutions</a></div>
              </article>
            );
          })}
        </div>
        <p className="note">Illustrative images, not photographs of Cubusify clients or employees.</p>
      </div>
    </section>
  );
}

/* ---------- Tech stack: tabs whose panels stay findable with find-in-page ---------- */
export function TechGrid({ cat, compact }) {
  let n = 0;
  return (
    <div className="tech-grid">
      {cat.items.map(t => { const txt = t.startsWith('txt:'), name = txt ? t.slice(4) : TECHN[t];
        return <div className="tc" key={t} style={{ '--i': n++ }}><span className={'lg' + (txt ? ' txt' : '')}>{txt ? name.slice(0, 2) : <img src={tech(t)} alt="" width="22" height="22" loading="lazy" decoding="async" />}</span>{name}</div>; })}
      {!compact && Array.from({ length: cat.items.length ? 2 : 6 }).map((_, k) => <div className="tc blank blank-only" key={'b' + k} style={{ '--i': n++ }}>+ add technology</div>)}
    </div>
  );
}
export function TechStack() {
  const [sel, setSel] = useState(0), [linear, setLinear] = useState(false), wrap = useRef(null), tabs = useRef([]);
  useEffect(() => {
    if (!('onbeforematch' in HTMLElement.prototype)) { setLinear(true); return; }
    const el = wrap.current, h = e => { const p = e.target.closest('.tp'); if (p) setSel(+p.dataset.i); };
    el.addEventListener('beforematch', h); return () => el.removeEventListener('beforematch', h);
  }, []);
  /* React renders hidden="until-found" as a plain hidden attribute, so set the real value after each render */
  useLayoutEffect(() => {
    if (linear || !wrap.current || !('onbeforematch' in HTMLElement.prototype)) return;
    wrap.current.querySelectorAll('.tp').forEach((p, i) => { if (i === sel) p.removeAttribute('hidden'); else p.setAttribute('hidden', 'until-found'); });
  }, [sel, linear]);
  const key = (e, i) => {
    let j = i; if (e.key === 'ArrowRight') j = (i + 1) % TECH_CATS.length; else if (e.key === 'ArrowLeft') j = (i - 1 + TECH_CATS.length) % TECH_CATS.length; else if (e.key === 'Home') j = 0; else if (e.key === 'End') j = TECH_CATS.length - 1; else return;
    e.preventDefault(); setSel(j); tabs.current[j] && tabs.current[j].focus();
  };
  return (
    <section className="sec defer" id="stack" aria-labelledby="stack-h" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head split"><div><Heading id="stack-h">The tools we build with.</Heading><p>Choose a category. Slots marked blank are waiting for the team to confirm them.</p></div></div>
        <div className={'stack-wrap' + (linear ? ' linear' : '')} ref={wrap}>
          <div className="tabs2" role="tablist" aria-label="Technology categories" hidden={linear}>
            {TECH_CATS.map((c, i) => <button key={c.id} type="button" role="tab" id={'tt-' + c.id} ref={el => (tabs.current[i] = el)} aria-controls={'tp-' + c.id} aria-selected={sel === i} tabIndex={sel === i ? 0 : -1} onClick={() => setSel(i)} onKeyDown={e => key(e, i)}>{c.name}</button>)}
          </div>
          <div>
            {TECH_CATS.map((c, i) => (
              <div key={c.id} className="tp" id={'tp-' + c.id} data-i={i} role={linear ? undefined : 'tabpanel'} aria-labelledby={'tt-' + c.id} tabIndex={linear ? undefined : 0} hidden={linear || sel === i ? undefined : true}>
                <h3>{c.name}</h3><TechGrid cat={c} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Demo: a chat enquiry becomes a spreadsheet row ---------- */
export function DemoAutomation() {
  const reduce = useReducedMotion(), box = useRef(null);
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (reduce) { setStep(9); return; }
    if (!box.current || !('IntersectionObserver' in window)) { setStep(9); return; }
    let timers = [], running = false;
    const at = (ms, n) => timers.push(setTimeout(() => setStep(n), ms));
    const run = () => { timers.forEach(clearTimeout); timers = []; setStep(0); at(500, 1); at(1500, 2); at(2600, 3); at(3800, 4); at(4700, 5); at(5800, 6); at(6700, 7); at(7300, 8); at(8700, 9); timers.push(setTimeout(() => { if (running) run(); }, 12500)); };
    const io = new IntersectionObserver(es => { const on = es[0].isIntersecting; if (on && !running) { running = true; run(); } if (!on && running) { running = false; timers.forEach(clearTimeout); setStep(0); } }, { threshold: 0.4 });
    io.observe(box.current); return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, [reduce]);
  const b = (n, cls, text) => <div className={'b ' + cls + (step >= n ? ' show' : '')}>{text}</div>;
  return (
    <section className="sec defer" id="demos" aria-labelledby="demo-h" style={{ paddingTop: 0 }}>
      <div className="wrap demo-wrap">
        <div>
          <Heading id="demo-h">See the product. Try the possibilities.</Heading>
          <p style={{ margin: '1.1rem 0 0', color: 'var(--muted)', fontSize: '1.15rem', maxWidth: '30rem' }}>Try a complete journey before you decide what to build. Here a chat enquiry becomes a row in a spreadsheet, without anyone retyping it.</p>
          <div className="demo-links">{['Ecommerce', 'Fitness', 'Snake', 'CRM', 'WhatsApp and Sheets'].map((x, i) => <a key={x} href={'/demo-studio#' + ['store', 'fitness', 'snake', 'crm', 'automation'][i]}>{x}</a>)}</div>
        </div>
        <div>
          <div className={'auto' + (step === 7 ? ' fire' : '')} ref={box} role="img" aria-label="Sample automation: a customer chat enquiry is added to a spreadsheet as a new lead and the team is notified.">
            <div className="phone" aria-hidden="true"><div className="bar">Sample chat</div>
              {b(1, 'me', 'Hi, I need a booking app for my clinic.')}
              <div className={'typing' + (step === 2 ? ' show' : '')}><i /><i /><i /></div>
              {b(3, 'bot', 'Happy to help. What budget range are you considering?')}
              {b(4, 'me', '$5,000–$15,000')}
              <div className={'typing' + (step === 5 ? ' show' : '')}><i /><i /><i /></div>
              {b(6, 'bot', 'Thanks. I have shared this with the team. You will hear back within 24 hours.')}
            </div>
            <div className="flow" aria-hidden="true"><i className="pulse" /></div>
            <div className="sheet" aria-hidden="true"><div className="cap"><Cube />Leads sheet</div>
              <div className="scroller"><table><thead><tr><th>Name</th><th>Request</th><th>Budget</th><th>Status</th></tr></thead><tbody>
                <tr className="old"><td>Marco</td><td>Online store</td><td>$1,000–$5,000</td><td>Replied</td></tr>
                <tr className="old"><td>Priya</td><td>Custom CRM</td><td>$15,000+</td><td>In discussion</td></tr>
                <tr className={'new' + (step >= 8 ? ' show' : '')}><td><span className="c1">Asha</span></td><td><span className="c2">Clinic booking app</span></td><td><span className="c3">$5,000–$15,000</span></td><td><span className={'c4 pill' + (step >= 9 ? ' ok' : '')}>{step >= 9 ? 'Team notified' : 'New lead'}</span></td></tr>
              </tbody></table></div>
            </div>
          </div>
          <p className="fine">Sample data. No messages are sent and no spreadsheet is connected.</p>
        </div>
      </div>
    </section>
  );
}
