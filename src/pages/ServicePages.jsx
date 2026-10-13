import React from 'react';
import { PageHero, BrowserFrame, Heading, CtaBand, CodeWindow, RichText, DeviceDuo } from '../components/ui';
import { Icon, Tile, iconFor, SERVICE_ICON, SERVICE_ACC } from '../components/icons';
import { LeadText, splitLead } from '../components/text';
import JumpNav from '../components/JumpNav';
import { FaqList } from '../sections/HomeB';
import { PostGrid } from './BlogPages';
import { services, svc, GROUPS, STACK, TECHN, tech, svcImg, PROCESS, FAQ, aiForSub, DEMO_FOR, serviceDetails, fullService, subDetail, postBySlug } from '../lib/site';
import { slotFor } from '../lib/slots';

const GROUP_NOTE = { Build: 'Software, websites, apps and products.', 'Experience and growth': 'Design, stores, search and play.', 'Operate and improve': 'AI, quality, cloud and traceability.' };
const groupOf = slug => (GROUPS.find(([, list]) => list.includes(slug)) || [''])[0];

/* ---------- small shared pieces ---------- */
const STEP_ICONS = ['search', 'compass', 'code', 'trending-up'];
export function ProcessList() {
  return (
    <ol className="fit row4 steps" data-n={PROCESS.length}>
      {PROCESS.map(([t, d], i) => (
        <li key={t} className="reveal-up">
          <Tile name={STEP_ICONS[i]} /><span className="step-n mono">Step {i + 1}</span>
          <h3>{t}</h3><p>{d}</p>
        </li>
      ))}
    </ol>
  );
}
export function StackRow({ slug }) {
  const list = STACK[slug] || [];
  return (
    <ul className="stack-row">
      {list.map(t => <li key={t}><img src={tech(t)} alt="" width="21" height="21" loading="lazy" />{TECHN[t]}</li>)}
      {list.length === 0 && [0, 1, 2].map(i => <li key={i} className="blank blank-only">+ add technology</li>)}
    </ul>
  );
}
/* A checklist with round tick icons. Takes its colour from the nearest data-acc. */
const Checks = ({ items }) => (
  <ul className="checks">{items.map(t => <li key={t}><span className="chk"><Icon name="check" /></span><span><RichText text={t} /></span></li>)}</ul>
);
/* Icon cards: icon, heading, one-sentence takeaway, and the rest behind "Read more". The icon is chosen from the title. */
function Cards({ items, numbered = true, two = false, className = '' }) {
  return (
    <ul className={'fit cards' + (two ? ' two' : '') + (className ? ' ' + className : '')} data-n={items.length}>
      {items.map((b, i) => (
        <li key={b.title} className="card reveal-up">
          <div className="card-top"><Tile name={iconFor(b.title, i)} />{numbered && <span className="card-n mono">{String(i + 1).padStart(2, '0')}</span>}</div>
          <h3>{b.title}</h3>
          <LeadText text={b.text} />
        </li>
      ))}
    </ul>
  );
}
/* The "in short" card: the first sentence of a definition is the headline, the rest follows in normal text. */
function DefnCard({ text }) {
  const [lead, rest] = splitLead(text, { whole: 0 });
  return (
    <div className="defn-card">
      <span className="eyebrow"><Icon name="info" />In short</span>
      <p className="defn-lead"><RichText text={lead} /></p>
      {rest && <p className="defn-rest"><RichText text={rest} /></p>}
    </div>
  );
}
const SectionHead = ({ id, title, text, icon }) => (
  <div className="pg-head sec-icon-head">
    {icon && <Tile name={icon} size="lg" />}
    <div><Heading id={id}>{title}</Heading>{text && <p>{text}</p>}</div>
  </div>
);

/* /services */
export function ServicesPage() {
  const specialisms = services.reduce((n, s) => n + s.subs.length, 0);
  const facts = [
    ['grid', services.length + ' services', 'Software, web, mobile, design, ecommerce, AI and more.'],
    ['layers', specialisms + ' specialisms', 'Each has its own page, deliverables and FAQs.'],
    ['sparkles', 'AI in every service', 'Always with a person checking the result.'],
    ['flag', 'Milestones and demos', 'See working progress, not just reports.'],
  ];
  const aiServices = services.filter(s => serviceDetails[s.slug]?.aiOneLiner);
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['Services', null]]} title="Everything your business runs on." lead="Twelve development services, one accountable team: custom software, websites, mobile apps, ecommerce, design, AI automation, testing, cloud and more. Pick the one you need, or tell us the result you want and we will shape the rest." >
        <a className="btn" href="/contact">Get a quote</a><a className="btn ghost" href="/demo-studio">Try the demos</a>
      </PageHero>
      <section className="pgsec" style={{ paddingTop: 0 }}><div className="wrap">
        <ul className="fit row4 facts-strip" data-n={facts.length}>{facts.map(([ic, t, d]) => <li key={t}><Tile name={ic} /><div><b>{t}</b><span>{d}</span></div></li>)}</ul>
      </div></section>
      <section className="pgsec"><div className="wrap">
        <ul className="groups-nav" aria-label="Jump to a service">{services.map(s => <li key={s.slug} data-acc={SERVICE_ACC[s.slug]}><a href={'#' + s.slug}><span className="ico"><Icon name={SERVICE_ICON[s.slug]} /></span>{s.title}</a></li>)}</ul>
        {GROUPS.map(([g, slugs]) => (
          <div key={g}>
            <div className="group-h" data-acc={SERVICE_ACC[slugs[0]]}><span className="group-bar" aria-hidden="true" /><h2>{g}</h2><p>{GROUP_NOTE[g]}</p></div>
            {slugs.map(sl => { const s = svc[sl]; const d = serviceDetails[sl]; return (
              <article className="feature" id={sl} key={sl} data-acc={SERVICE_ACC[sl]}>
                <div className="feature-text">
                  <h3 className="feature-title"><Tile name={SERVICE_ICON[sl]} size="lg" />{s.title}</h3>
                  <p className="head">{s.headline}</p><p>{s.description}</p>
                  <ul className="sub-links">{s.subs.map(x => <li key={x.slug}><a href={x.path}><Icon name="check-circle" />{x.title}</a></li>)}</ul>
                  {d?.aiOneLiner && <p className="ai-line"><Icon name="sparkles" /><span><b>With AI:</b> {d.aiOneLiner}</span></p>}
                  <a className="btn" href={s.path}>Explore {s.title}</a>
                </div>
                <a href={s.path} aria-label={s.title}><BrowserFrame url={'cubusify.com' + s.path} src={svcImg(sl)} alt={s.title + ' page preview'} /></a>
              </article>); })}
          </div>
        ))}
      </div></section>

      <section className="pgsec ai-index" id="ai-everywhere" aria-labelledby="aie-h"><div className="wrap">
        <SectionHead id="aie-h" icon="sparkles" title="AI inside every service." text="AI is part of how we work across the board, always with a person checking the result. Here is what it does in each service." />
        <ul className="fit ai-index-grid" data-n={aiServices.length}>{aiServices.map(s => (
          <li key={s.slug} data-acc={SERVICE_ACC[s.slug]} className="reveal-up"><a href={s.path + '#ai'}><Tile name={SERVICE_ICON[s.slug]} /><h3>{s.title}</h3><p>{serviceDetails[s.slug].aiOneLiner}</p><span className="go">See the AI details <Icon name="arrow-right" /></span></a></li>
        ))}</ul>
      </div></section>

      <section className="pgsec"><div className="wrap"><SectionHead id="how-h" icon="workflow" title="How every service works." text="The same four steps, whatever we are building." /><ProcessList /></div></section>
      <CtaBand />
    </>
  );
}

/* The AI section of a service page: what AI does here, and where a person stays in charge. */
function AiBand({ s, d }) {
  const isAi = s.slug === 'ai';
  const LADDER_ICONS = ['message', 'workflow', 'bot', 'activity'];
  return (
    <section className="ai-band" id="ai" aria-labelledby="ai-h"><div className="wrap">
      <div className="ai-grid">
        <div className="ai-lead">
          <span className="ai-chip"><Icon name="sparkles" />AI</span>
          <Heading id="ai-h">{d.aiTitle}</Heading>
          <LeadText text={d.aiIntro} className="ai-intro" whole={150} />
          <p className="ai-guard"><Icon name="shield-check" /><span><b>People stay in control.</b> <RichText text={d.aiGuardrail} /></span></p>
          {!isAi && <a className="btn" href="/services/ai">Explore AI &amp; Automation</a>}
        </div>
        <ul className="ai-cards">
          {d.aiUses.map((u, i) => (
            <li key={u.title} className="reveal-up"><Tile name={iconFor(u.title, i + 2)} /><h3>{u.title}</h3><LeadText text={u.text} whole={120} /></li>
          ))}
        </ul>
      </div>
      {isAi && d.aiLadder && (
        <div className="ai-sub">
          <h3 className="ai-h3">From first assistant to monitored operation</h3>
          <ol className="fit row4 ladder2" data-n={d.aiLadder.length}>{d.aiLadder.map((x, i) => (
            <li key={x.title} className="reveal-up"><span className="rung"><Icon name={LADDER_ICONS[i]} /></span><span className="rung-n mono">Level {i + 1}</span><h4>{x.title}</h4><LeadText text={x.text} whole={120} /></li>
          ))}</ol>
        </div>
      )}
      {isAi && d.aiSafety && (
        <div className="ai-sub">
          <h3 className="ai-h3">How we keep AI safe and useful</h3>
          <ul className="fit safety2" data-n={d.aiSafety.length}>{d.aiSafety.map((x, i) => (
            <li key={x.title} className="reveal-up"><Tile name={iconFor(x.title, i)} /><h4>{x.title}</h4><LeadText text={x.text} whole={120} /></li>
          ))}</ul>
        </div>
      )}
    </div></section>
  );
}

/* /services/:slug */
export function ServicePage({ service: s }) {
  const d = fullService(s.slug);
  const demo = DEMO_FOR[s.demo];
  const slots = slotFor(s.path);
  const acc = SERVICE_ACC[s.slug];
  const others = services.filter(x => x.slug !== s.slug);
  const near = [...others.slice(others.findIndex(x => x.slug > s.slug) < 0 ? 0 : others.findIndex(x => x.slug > s.slug)), ...others].slice(0, 4);
  const related = (d?.related || []).map(postBySlug).filter(Boolean);
  const faqItems = d?.faq || FAQ.filter(f => !f.blank).slice(0, 4);
  return (
    <div className="svc-page" data-acc={acc}>
      <PageHero crumbs={[['Home', '/'], ['Services', '/services'], [s.title, null]]} title={s.title} lead={<><strong>{s.headline}</strong>{s.description}</>}
        kicker={<><Tile name={SERVICE_ICON[s.slug]} size="sm" /><span>{groupOf(s.slug)}</span><span className="dot" aria-hidden="true" /><span>{s.subs.length} specialisms</span></>}
        aside={<BrowserFrame url={'cubusify.com' + s.path} src={svcImg(s.slug)} alt={s.title + ' page preview'} eager />}>
        <a className="btn" href="/contact">Discuss your project</a>
        {demo && <a className="btn ghost" href={'/demo-studio#' + demo[0]}>Try the {demo[1].toLowerCase()}</a>}
      </PageHero>

      {d && (
        <>
          <JumpNav items={[['what-we-build', 'What we build', 'layers'], ['ai', 'AI details', 'sparkles'], ['benefits', 'Benefits', 'star'], ['how-we-work', 'How we work', 'workflow'], ['faq', 'FAQ', 'message']]} />

          <section className="pgsec"><div className="wrap defn-grid">
            <div className="defn-col">
              <h2 className="sr-only">Overview of {s.title}</h2>
              <DefnCard text={d.definition} />
              <div className="pair">
                <article className="mini"><h3><Tile name="target" size="sm" />The need</h3><LeadText text={d.overview[0]} /></article>
                <article className="mini"><h3><Tile name="compass" size="sm" />How we approach it</h3><LeadText text={d.overview[1]} /></article>
              </div>
            </div>
            <aside className="who" aria-labelledby="who-h">
              <h2 id="who-h"><Tile name="user-check" size="sm" />Who it is for</h2>
              <Checks items={d.idealFor} />
              <a className="btn" href="/contact">Talk it through</a>
            </aside>
          </div></section>

          <section className="pgsec" id="what-we-build"><div className="wrap">
            <SectionHead id="build-h" icon={SERVICE_ICON[s.slug]} title={'What we build in ' + s.title + '.'} text="The pieces of work this service covers, in the order they usually matter." />
            <Cards items={d.build} />
          </div></section>
        </>
      )}

      <section className="pgsec"><div className="wrap">
        <SectionHead id="inside-h" icon="grid" title="Choose a specialism." text={'Each part of ' + s.title + ' has its own page with what is included and how AI helps.'} />
        <ul className="fit specs" data-n={s.subs.length}>{s.subs.map(x => (
          <li key={x.slug} className="reveal-up"><a className="spec" href={x.path}>
            <Tile name={iconFor(x.title, 0)} /><span><b>{x.title}</b><span>{x.description}</span></span><Icon name="arrow-right" className="go-ic" />
          </a></li>
        ))}</ul>
      </div></section>

      {d && <AiBand s={s} d={d} />}

      <DeviceDuo id="views" title={'See ' + s.title + ' on desktop and mobile.'} text="Every project is designed and tested for large and small screens." desktop={{ src: slots.desktop, alt: slots.alt }} mobile={{ src: slots.mobile, alt: slots.alt }} />

      {d && (
        <section className="pgsec" id="benefits"><div className="wrap">
          <SectionHead id="ben-h" icon="star" title="What you get from it." />
          <div className="split2">
            <ul className="fit two benefit-cards" data-n={d.benefits.length}>{d.benefits.map((b, i) => (
              <li key={b.title} className="card reveal-up"><Tile name={iconFor(b.title, i + 1)} /><h3>{b.title}</h3><LeadText text={b.text} /></li>
            ))}</ul>
            <aside className="receive" aria-labelledby="recv-h">
              <h3 id="recv-h"><Tile name="package" size="sm" />What you receive</h3>
              <Checks items={d.deliverables} />
            </aside>
          </div>
        </div></section>
      )}

      <section className="pgsec" id="how-we-work"><div className="wrap"><SectionHead id="proc-h" icon="workflow" title="How we work." text="A clear plan, visible progress, and a handover you own." /><ProcessList /></div></section>

      <section className="pgsec" id="faq"><div className="wrap two-col">
        <div><SectionHead id="tools-h" icon="terminal" title="Tools we use for this." text="Technologies from our own project assets. Blank slots are waiting for the team to confirm them." /><StackRow slug={s.slug} /></div>
        <div><SectionHead id="faq-h" icon="message" title="Common questions." /><FaqList items={faqItems} /></div>
      </div></section>

      {related.length > 0 && (
        <section className="pgsec"><div className="wrap">
          <SectionHead id="read-h" icon="book" title="Worth reading first." text={'Practical guides that go with ' + s.title + '.'} />
          <PostGrid list={related} />
        </div></section>
      )}

      <section className="pgsec"><div className="wrap">
        <SectionHead id="more-h" icon="compass" title="More from Cubusify." />
        <ul className="fit specs" data-n={near.length}>{near.map(x => (
          <li key={x.slug} data-acc={SERVICE_ACC[x.slug]} className="reveal-up"><a className="spec" href={x.path}>
            <Tile name={SERVICE_ICON[x.slug]} /><span><b>{x.title}</b><span>{x.headline}</span></span><Icon name="arrow-right" className="go-ic" />
          </a></li>
        ))}</ul>
      </div></section>
      <CtaBand />
    </div>
  );
}

/* /services/:slug/:sub */
export function SubServicePage({ service: s, sub }) {
  const ai = aiForSub(sub), demo = DEMO_FOR[sub.demo];
  const d0 = subDetail(s.slug, sub.slug);
  const d = d0?.includes ? d0 : null; // light fields only until this service's text has loaded
  const parent = fullService(s.slug);
  const slots = slotFor(s.path + '/' + sub.slug);
  const related = (parent?.related || []).map(postBySlug).filter(Boolean);
  return (
    <div className="svc-page" data-acc={SERVICE_ACC[s.slug]}>
      <PageHero crumbs={[['Home', '/'], ['Services', '/services'], [s.title, s.path], [sub.title, null]]} title={sub.title} lead={sub.description}
        kicker={<><Tile name={SERVICE_ICON[s.slug]} size="sm" /><a href={s.path}>{s.title}</a><span className="dot" aria-hidden="true" /><span>{groupOf(s.slug)}</span></>}
        aside={ai ? <CodeWindow file={ai.file} code={ai.code} /> : <BrowserFrame url={'cubusify.com' + sub.path} src={svcImg(s.slug)} alt={s.title + ' page preview'} eager />}>
        <a className="btn" href="/contact">Discuss your project</a>
        {demo && <a className="btn ghost" href={'/demo-studio#' + demo[0]}>Try the {demo[1].toLowerCase()}</a>}
      </PageHero>

      {d && <JumpNav items={[['included', 'What is included', 'layers'], ['ai', 'AI details', 'sparkles'], ['best-for', 'Best for', 'user-check'], ['faq', 'FAQ', 'message']]} />}

      <section className="pgsec"><div className="wrap two-col sub-intro">
        <div className="defn-col">
          {d ? <DefnCard text={d.definition} /> : (
            <div className="pg-head" style={{ marginBottom: '1.2rem' }}><Heading id="part-h">Part of {s.title}.</Heading><p>{s.headline} {s.description}</p></div>
          )}
          {ai && <p className="fine2">The code beside the title is an illustrative example, not production code.</p>}
          {d && (
            <div id="included" className="sub-block">
              <h2 className="block-h"><Tile name="layers" size="sm" />What is included</h2>
              <Cards items={d.includes} two />
            </div>
          )}
          <div className="sub-block"><h2 className="block-h"><Tile name="terminal" size="sm" />Tools we use for this</h2><StackRow slug={s.slug} /></div>
        </div>
        <ul className="side-list" aria-label={'More in ' + s.title}>
          {s.subs.map(x => <li key={x.slug}><a href={x.path} aria-current={x.slug === sub.slug ? 'page' : undefined}><Tile name={iconFor(x.title, 0)} size="sm" /><span><b>{x.title}</b><span>{x.description}</span></span></a></li>)}
          <li><a href={s.path}><Tile name="arrow-right" size="sm" /><span><b>Back to {s.title}</b><span>{s.headline}</span></span></a></li>
        </ul>
      </div></section>

      {d && (
        <section className="pgsec"><div className="wrap">
          <div className="ai-panel" id="ai">
            <div className="ai-panel-main">
              <span className="ai-chip"><Icon name="sparkles" />AI</span>
              <h2>{d.aiTitle}</h2>
              <LeadText text={d.aiText} whole={120} />
            </div>
            <ul className="ai-points">{d.aiPoints.map((p, i) => <li key={p}><Tile name={iconFor(p, i + 2)} size="sm" /><span><RichText text={p} /></span></li>)}</ul>
          </div>
        </div></section>
      )}

      <DeviceDuo id="views" title={sub.title + ' on desktop and mobile.'} text="Designed and tested for large and small screens." desktop={{ src: slots.desktop, alt: slots.alt }} mobile={{ src: slots.mobile, alt: slots.alt }} />

      {d && (
        <section className="pgsec" id="best-for"><div className="wrap two-col">
          <aside className="who" aria-labelledby="best-h"><h2 id="best-h"><Tile name="user-check" size="sm" />Best for</h2><Checks items={d.bestFor} /></aside>
          <aside className="receive" aria-labelledby="get-h"><h2 id="get-h"><Tile name="package" size="sm" />What you receive</h2><Checks items={d.deliverables} /></aside>
        </div></section>
      )}

      <section className="pgsec"><div className="wrap"><SectionHead id="proc2-h" icon="workflow" title="How we work." text="The same four steps, from the first conversation to the handover." /><ProcessList /></div></section>

      {d && (
        <section className="pgsec" id="faq"><div className="wrap two-col">
          <SectionHead id="faq2-h" icon="message" title={'Questions about ' + sub.title + '.'} text="Straight answers. For cost and timing, tell us about your project and we will give you an honest view." />
          <FaqList items={d.faq} />
        </div></section>
      )}

      {related.length > 0 && (
        <section className="pgsec"><div className="wrap">
          <SectionHead id="read2-h" icon="book" title="Worth reading first." />
          <PostGrid list={related} />
        </div></section>
      )}
      <CtaBand />
    </div>
  );
}
