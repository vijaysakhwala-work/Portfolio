import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSite } from '../lib/site-context';
import { services, svc, GLYPH, GROUPS, STACK, AI_ITEMS, IND_ORDER, ind, IND_CAP, industryImg, svcImg, workImg, shot, workProjects, articles, EMAIL, tech, TECHN } from '../lib/site';
import { Icon as Pic } from './icons';
import { BrowserFrame, CodeWindow, TechChip } from './ui';

const WORK_CATS = ['Websites', 'Apps', 'Software', 'Automation'];
const WORK_STACK = { Websites: ['nextjs', 'react', 'cloudflare'], Apps: ['flutter', 'react', 'nodejs'], Software: ['react', 'nodejs', 'postgresql'], Automation: ['n8n', 'zapier', 'nodejs'] };
const Icon = ({ id }) => <svg aria-hidden="true"><use href={'#' + id} /></svg>;

function Item({ href, ico, title, small, hot, onHover, className = '', children }) {
  return (
    <a className={'mi ' + className + (hot ? ' is-hot' : '')} href={href} onPointerEnter={onHover} onFocus={onHover}>
      {children || <span className="ico">{ico}</span>}
      <span><span className="t"><b>{title}</b></span>{small && <small>{small}</small>}</span>
    </a>
  );
}

function Preview({ url, img, title, text, chips, stack }) {
  return (
    <div className="pv">
      <BrowserFrame key={img || url} url={url} src={img} alt="" />
      <div className="pv-cap"><h5>{title}</h5>{text && <p>{text}</p>}
        {chips && chips.length > 0 && <ul className="chips2">{chips.map(c => <li key={c}>{c}</li>)}</ul>}
        {stack && stack.length > 0 && <div className="stack"><em>stack</em>{stack.map(t => <span key={t}><img src={tech(t)} alt="" width="16" height="16" loading="lazy" />{TECHN[t]}</span>)}</div>}
      </div>
    </div>
  );
}

function ServicesPanel() {
  const [hot, setHot] = useState('software'); const s = svc[hot];
  return (
    <div>
      <div className="mp-grid">
        {GROUPS.map(([g, slugs]) => (
          <div className="mg" key={g}><h4>{g}</h4>
            {slugs.map(sl => { const x = svc[sl]; return <Item key={sl} href={x.path} ico={GLYPH[sl]} title={x.title} small={x.subs.slice(0, 2).map(y => y.title).join(', ')} hot={hot === sl} onHover={() => setHot(sl)} />; })}
          </div>
        ))}
        <Preview url={'cubusify.com' + s.path} img={svcImg(hot)} title={s.headline} text={s.description} chips={s.subs.map(x => x.title)} stack={STACK[hot]} />
      </div>
      <div className="mp-foot"><a href="/services">Explore all services</a><a href="/demo-studio">See how it works in Demo Studio</a><span className="mono">Tip: press <kbd>Ctrl</kbd> <kbd>K</kbd> to search every page</span></div>
    </div>
  );
}

function AIPanel() {
  const [i, setI] = useState(0); const [mode, setMode] = useState('code'); const a = AI_ITEMS[i];
  return (
    <div>
      <div className="mp-grid">
        <div><div className="mh">What we build</div>
          {AI_ITEMS.map((x, k) => <Item key={x.key} href={x.path} ico={x.glyph} title={x.title} small={x.text} hot={k === i} onHover={() => setI(k)} />)}
        </div>
        <div>
          <div className="tabs" role="tablist" aria-label="Example view">
            <button type="button" role="tab" aria-selected={mode === 'shot'} onClick={() => setMode('shot')}>Screenshot</button>
            <button type="button" role="tab" aria-selected={mode === 'code'} onClick={() => setMode('code')}>Code</button>
          </div>
          {mode === 'shot'
            ? <Preview url={'cubusify.com' + a.path} img={shot(a.shot)} title={a.title} text={a.text} />
            : <><CodeWindow key={a.key} file={a.file} code={a.code} /><p className="fine2">Illustrative example, not production code.</p></>}
        </div>
      </div>
      <div className="mp-foot"><a href="/services/ai">Explore AI and automation</a><span>Every assistant keeps a person in control of important decisions.</span></div>
    </div>
  );
}

function IndustriesPanel() {
  return (
    <div>
      <div className="mp-grid">
        <div><div className="mh">Built around your industry</div>
          <div className="mg-2">
            {IND_ORDER.map(sl => <a key={sl} className="mi photo" href={'/industries/' + sl}>{industryImg(sl) ? <img className="thumb" src={industryImg(sl)} alt="" width="46" height="46" loading="lazy" /> : <span className="thumb thumb-ph" aria-hidden="true"><Pic name="image" /></span>}<span><span className="t"><b>{ind[sl].name}</b></span><small>{IND_CAP[sl]}</small></span></a>)}
            <a className="mi wide" href="/contact"><span className="ico">?</span><span><span className="t"><b>Not listed?</b></span><small>Tell us about your workflow.</small></span></a>
          </div>
        </div>
        <div className="ex">
          <div className="ex-h"><b>Example: shipment tracking</b><span>logistics</span></div>
          <ol className="tl"><li className="done">Order placed <small>Mon 9:45</small></li><li className="done">Processing <small>Mon 10:30</small></li><li className="done">Out for delivery <small>Today 10:12</small></li><li>Delivered <small>Est. 12:00</small></li></ol>
          <pre className="json" aria-label="Sample API response"><span className="t-p">{'{ '}</span><span className="t-s">"order"</span>{': '}<span className="t-s">"CB-1042"</span>{',\n  '}<span className="t-s">"status"</span>{': '}<span className="t-s">"out_for_delivery"</span>{',\n  '}<span className="t-s">"eta"</span>{': '}<span className="t-s">"12:00"</span>{' }'}</pre>
        </div>
      </div>
      <div className="mp-foot"><a href="/industries">All industries</a><span>Sample data from our logistics concept.</span></div>
    </div>
  );
}

function WorkPanel() {
  const [hot, setHot] = useState('haven'); const w = workProjects.find(x => x.slug === hot);
  return (
    <div>
      <div className="mp-grid">
        <div><div className="mg-2">
          {WORK_CATS.map(c => <div className="mg" key={c}><h4>{c}</h4>
            {workProjects.filter(x => x.category === c).map(x => <Item key={x.slug} href={'/work/' + x.slug} className="proj" ico={x.name.slice(0, 2)} title={x.name} small={x.industry} hot={hot === x.slug} onHover={() => setHot(x.slug)} />)}
          </div>)}
        </div></div>
        <Preview url={'cubusify.com/work/' + w.slug} img={workImg(w.slug)} title={w.name + ': ' + w.title} text={w.label + ' for ' + w.industry.toLowerCase() + '.'} stack={WORK_STACK[w.category]} />
      </div>
      <div className="mp-foot"><a href="/work">View all work</a><span>These are design concepts that show how we think, not client projects.</span></div>
    </div>
  );
}

function CompanyPanel() {
  const { copy } = useSite();
  const rows = [['About Us', '/about', 'Get to know the team that takes ownership.', 'i'], ['Hire Team', '/team', 'The capabilities you can bring onto your project.', '+'], ['Careers', '/careers', 'Collaborate with Cubusify.', '#'], ['Blog', '/blog', 'Practical guides on software, AI and ecommerce.', 'Aa'], ['Certifications', '/about#credentials', 'Certificates, awards and client words.', '✓'], ['Contact Us', '/contact', 'Start a project or ask a question.', '@']];
  return (
    <div>
      <div className="mp-grid">
        <div><div className="mh">Company</div>{rows.map(r => <Item key={r[0]} href={r[1]} ico={r[3]} title={r[0]} small={r[2]} />)}</div>
        <div><div className="mh">From the blog</div>
          {articles.slice(0, 4).map(a => <a className="blog-i" key={a.slug} href={'/blog/' + a.slug}><span className="cat">{a.category.toLowerCase()}</span><b>{a.title}</b><small>{a.desc}</small></a>)}
        </div>
        <div className="co-card"><p>We treat your business as our own.</p><a className="btn" href="/contact">Start your project</a>
          <div className="mailrow"><span>{EMAIL}</span><button type="button" onClick={() => copy(EMAIL, <>Copied <span className="mono">{EMAIL}</span></>)}>copy</button></div></div>
      </div>
    </div>
  );
}

const MENUS = [['services', 'Services', ServicesPanel], ['ai', 'AI', AIPanel], ['industries', 'Industries', IndustriesPanel], ['work', 'Our Work', WorkPanel], ['company', 'Company', CompanyPanel]];
/* The stylesheet names each panel's grid after a short class (.mp-svc, .mp-ind, .mp-co), not after the menu key */
const PANEL_CLASS = { services: 'mp-svc', ai: 'mp-ai', industries: 'mp-ind', work: 'mp-work', company: 'mp-co' };

export default function Header() {
  const { openPalette, toggleTheme, isDark, copy } = useSite();
  const [current, setCurrent] = useState(null);
  const [solid, setSolid] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [mod, setMod] = useState('Ctrl');
  const [height, setHeight] = useState(0);
  const headerRef = useRef(null), panelRefs = useRef({}), openT = useRef(0), closeT = useRef(0), triggers = useRef([]);

  useEffect(() => { setMod(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent || '') ? '⌘' : 'Ctrl'); }, []);
  useEffect(() => { const f = () => setSolid(window.scrollY > 24); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f); }, []);

  const measure = useCallback(() => { const p = current && panelRefs.current[current]; setHeight(p ? p.offsetHeight : 0); }, [current]);
  useLayoutEffect(() => { measure(); }, [measure]);
  useEffect(() => {
    if (!current || !('ResizeObserver' in window)) return;
    const ro = new ResizeObserver(measure); const p = panelRefs.current[current]; if (p) ro.observe(p);
    window.addEventListener('resize', measure); return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, [current, measure]);

  const close = useCallback(() => { clearTimeout(openT.current); clearTimeout(closeT.current); setCurrent(null); }, []);
  const open = name => { clearTimeout(closeT.current); setCurrent(name); };

  useEffect(() => {
    const down = e => { if (current && headerRef.current && !headerRef.current.contains(e.target)) close(); };
    document.addEventListener('pointerdown', down); return () => document.removeEventListener('pointerdown', down);
  }, [current, close]);
  useEffect(() => { const k = e => { if (e.key === 'Escape' && drawer) setDrawer(false); }; document.addEventListener('keydown', k); return () => document.removeEventListener('keydown', k); }, [drawer]);
  useEffect(() => { const r = () => { if (window.innerWidth > 1100) setDrawer(false); }; window.addEventListener('resize', r); return () => window.removeEventListener('resize', r); }, []);

  const items = () => Array.from(headerRef.current.querySelectorAll('.nav .nav-btn, .nav .nav-link'));
  const onTriggerKey = (e, name) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); open(name); setTimeout(() => panelRefs.current[name]?.querySelector('a, button')?.focus(), 40); }
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const list = items(); const i = list.indexOf(e.currentTarget) + (e.key === 'ArrowRight' ? 1 : -1); list[(i + list.length) % list.length].focus(); }
  };
  const onKeyDown = e => { if (e.key === 'Escape' && current) { const t = headerRef.current.querySelector(`.nav-btn[data-menu="${current}"]`); close(); t && t.focus(); } };
  const onFocusOut = e => { if (current && e.relatedTarget && !headerRef.current.contains(e.relatedTarget)) close(); };

  return (
    <>
      <header ref={headerRef} className={'site-header' + (solid ? ' is-solid' : '') + (current ? ' is-open' : '') + (drawer ? ' drawer-open' : '')} id="header"
        onKeyDown={onKeyDown} onBlur={onFocusOut}
        onPointerLeave={e => { if (e.pointerType === 'mouse' && current) { clearTimeout(closeT.current); closeT.current = setTimeout(close, 260); } }}
        onPointerEnter={() => clearTimeout(closeT.current)}>
        <div className="topbar">
          <span>Software, design and AI. Surat, India, working worldwide.</span>
          <span className="topbar-r">
            <button className="copy-mail" type="button" aria-label={'Copy email address ' + EMAIL} onClick={() => copy(EMAIL, <>Copied <span className="mono">{EMAIL}</span></>)}><span className="mono">{EMAIL}</span><svg className="cp" aria-hidden="true"><use href="#i-copy" /></svg></button>
            <a href="/contact">Start a project</a>
          </span>
        </div>
        <div className="header-in">
          <a className="brand" href="/" aria-label="Cubusify home"><img src="/images/logo.png" alt="" width="32" height="32" />Cubusify</a>
          <nav className="nav" id="nav" aria-label="Main">
            {MENUS.slice(0, 3).map(([k, label]) => (
              <button key={k} className="nav-btn" type="button" data-menu={k} aria-expanded={current === k} aria-controls={'mp-' + k}
                onClick={() => (current === k ? close() : open(k))}
                onPointerEnter={e => { if (e.pointerType !== 'mouse') return; clearTimeout(closeT.current); if (current) open(k); else { clearTimeout(openT.current); openT.current = setTimeout(() => open(k), 90); } }}
                onPointerLeave={() => clearTimeout(openT.current)} onKeyDown={e => onTriggerKey(e, k)}>{label}<svg className="chev" aria-hidden="true"><use href="#i-chev" /></svg></button>
            ))}
            <a className="nav-link" href="/team" onPointerEnter={e => { if (e.pointerType === 'mouse' && current) { clearTimeout(closeT.current); closeT.current = setTimeout(close, 120); } }}>Hire Team</a>
            {MENUS.slice(3).map(([k, label]) => (
              <button key={k} className="nav-btn" type="button" data-menu={k} aria-expanded={current === k} aria-controls={'mp-' + k}
                onClick={() => (current === k ? close() : open(k))}
                onPointerEnter={e => { if (e.pointerType !== 'mouse') return; clearTimeout(closeT.current); if (current) open(k); else { clearTimeout(openT.current); openT.current = setTimeout(() => open(k), 90); } }}
                onPointerLeave={() => clearTimeout(openT.current)} onKeyDown={e => onTriggerKey(e, k)}>{label}<svg className="chev" aria-hidden="true"><use href="#i-chev" /></svg></button>
            ))}
            <a className="nav-link" href="/demo-studio" onPointerEnter={e => { if (e.pointerType === 'mouse' && current) { clearTimeout(closeT.current); closeT.current = setTimeout(close, 120); } }}><span className="live" aria-hidden="true" />Demo Studio</a>
          </nav>
          <div className="mega-wrap"><div className="mega" id="mega" style={{ height: current ? height : 0 }}>
            {MENUS.map(([k, , Panel]) => <div key={k} id={'mp-' + k} ref={el => (panelRefs.current[k] = el)} className={'mp ' + PANEL_CLASS[k] + (current === k ? ' is-on' : '')} data-name={k}><Panel /></div>)}
          </div></div>
          <div className="tools">
            <button className="search-btn" type="button" onClick={openPalette} aria-haspopup="dialog"><svg aria-hidden="true"><use href="#i-search" /></svg><span>Search the site</span><span className="kb" aria-hidden="true"><kbd>{mod}</kbd><kbd>K</kbd></span></button>
            <button className="icon-btn search-icon" type="button" onClick={openPalette} aria-label="Search the site" aria-haspopup="dialog"><svg aria-hidden="true"><use href="#i-search" /></svg></button>
            <button className="icon-btn theme-btn" type="button" onClick={toggleTheme} aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}><svg className="sun" aria-hidden="true"><use href="#i-sun" /></svg><svg className="moon" aria-hidden="true"><use href="#i-moon" /></svg></button>
            <a className="btn header-cta" href="/contact">Get a quote</a>
            <button className="icon-btn burger" type="button" aria-label={drawer ? 'Close navigation' : 'Open navigation'} aria-expanded={drawer} aria-controls="drawer" onClick={() => { setDrawer(v => !v); close(); }}><svg aria-hidden="true"><use href={drawer ? '#i-close' : '#i-menu'} /></svg></button>
          </div>
        </div>
      </header>
      <div className="scrim" aria-hidden="true" onClick={close} style={current ? { opacity: 1, visibility: 'visible', transitionDelay: '0s' } : undefined} />
      <div className="drawer" id="drawer" aria-label="Navigation" style={{ '--hh': '4.5rem' }}>
        <div className="drawer-in">
          <button className="search-btn" type="button" onClick={() => { setDrawer(false); openPalette(); }} aria-haspopup="dialog"><svg aria-hidden="true"><use href="#i-search" /></svg><span>Search the site</span></button>
          <div className="dwr">
            <DrawerGroup title="Services" rows={services.map(s => [GLYPH[s.slug], s.title, s.path])} />
            <DrawerGroup title="AI" rows={AI_ITEMS.slice(1).map(a => [a.glyph, a.title, a.path])} />
            <DrawerGroup title="Industries" rows={IND_ORDER.map(sl => [ind[sl].name.slice(0, 2), ind[sl].name, '/industries/' + sl])} />
            <DrawerGroup title="Our Work" rows={workProjects.map(w => [w.name.slice(0, 2), w.name + ', ' + w.category.toLowerCase(), '/work/' + w.slug])} />
            <DrawerGroup title="Company" rows={[['i', 'About Us', '/about'], ['+', 'Hire Team', '/team'], ['#', 'Careers', '/careers'], ['Aa', 'Blog', '/blog'], ['@', 'Contact Us', '/contact']]} />
            <a className="plain" href="/demo-studio">Demo Studio</a>
          </div>
          <div className="row"><a className="btn" href="/contact">Get a quote</a><button className="btn ghost" type="button" onClick={() => copy(EMAIL, <>Copied <span className="mono">{EMAIL}</span></>)}><span className="mono">{EMAIL}</span></button></div>
        </div>
      </div>
    </>
  );
}
function DrawerGroup({ title, rows }) {
  return (
    <details name="drawer-nav"><summary>{title}<svg aria-hidden="true"><use href="#i-chev" /></svg></summary>
      <div className="dl">{rows.map(r => <a key={r[2]} href={r[2]}><span className="ico">{r[0]}</span><span>{r[1]}</span></a>)}</div>
    </details>
  );
}
