import React, { Suspense, lazy, useState } from 'react';
import { PageHero, BrowserFrame, Heading, CtaBand, Dash, ImageSlot, PersonPhoto } from '../components/ui';
import { Icon as Pic } from '../components/icons';
import { Tile, SERVICE_ICON, SERVICE_ACC } from '../components/icons';
import { ContactSection, ContactForm, FaqSection, FaqList, Credentials, CredentialsBlock, Leaders, RoleCards, WhySection } from '../sections/HomeB';
import { industries, ind, services, svc, workProjects, IND_ORDER, IND_POS, IND_CAP, industryPageImg, workImg, founderImg, GLYPH, DEMO_FOR, HIRE_STEPS, FAQ, ROLES, MODELS } from '../lib/site';
import { PROOF } from '../lib/proof';

/* ---------- Industries ---------- */
export function IndustriesPage() {
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['Industries', null]]} title="Built around your industry." lead="Different businesses. Different workflows. Software that fits yours." />
      <section className="pgsec"><div className="wrap">
        <div className="tile-grid">{IND_ORDER.map(sl => <a key={sl} className="ind-tile" href={'/industries/' + sl} style={{ '--pos': IND_POS[sl], '--tint': ind[sl].color }}>{industryPageImg(sl) ? <img src={industryPageImg(sl)} alt="" width="900" height="600" loading="lazy" decoding="async" /> : <span className="ind-ph blank-only" aria-hidden="true"><Pic name="image" />Industry image</span>}<div><h2>{ind[sl].name}</h2><p>{IND_CAP[sl]}</p></div></a>)}</div>
        <p className="note">Illustrative images, not photographs of Cubusify clients or employees.</p>
      </div></section>
      <CtaBand title="Not on the list?" text="Tell us about your workflow. We will tell you honestly whether we are the right team." />
    </>
  );
}
export function IndustryPage({ industry: i }) {
  const demo = DEMO_FOR[i.demo];
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['Industries', '/industries'], [i.name, null]]} title={i.name} lead={<>{i.role && <strong>{i.role}</strong>}{i.copy}</>}
        aside={<ImageSlot ratio="desktop" label="Industry image" src={industryPageImg(i.slug)} alt="" />}>
        <a className="btn" href="/contact">Discuss your project</a>
        <a className="btn ghost" href={demo ? '/demo-studio#' + demo[0] : '/demo-studio'}>Try {demo ? 'the ' + demo[1].toLowerCase() : 'the demos'}</a>
      </PageHero>
      <section className="pgsec"><div className="wrap">
        <div className="pg-head"><Heading id="ind-built-h">What we build for {i.name}.</Heading></div>
        <div className="fit" data-n={i.examples.length || 3}>
          {i.examples.map(e => <div className="sub-card" key={e}><span className="gb">{i.name.slice(0, 2)}</span><h3>{e}</h3></div>)}
          {i.examples.length === 0 && [0, 1, 2].map(k => <div className="sub-card blank blank-only" key={k}><h3 className="dash">Example solution</h3><p className="dash">Add a typical project for this industry.</p></div>)}
        </div>
      </div></section>
      <section className="pgsec"><div className="wrap">
        <div className="pg-head"><h2>Services we bring to {i.name}.</h2></div>
        <div className="fit" data-n="4">{['software', 'web', 'ai', 'mobile'].map(sl => <a className="sub-card" key={sl} href={svc[sl].path} data-acc={SERVICE_ACC[sl]}><Tile name={SERVICE_ICON[sl]} /><h3>{svc[sl].title}</h3><p>{svc[sl].headline}</p><span className="go">Explore {svc[sl].title}</span></a>)}</div>
        <p className="note">Photograph is illustrative, not a picture of a Cubusify client or employee.</p>
      </div></section>
      <CtaBand />
    </>
  );
}

/* ---------- Work ---------- */
const CATS = ['Websites', 'Apps', 'Software', 'Automation'];
export function WorkPage() {
  const [cat, setCat] = useState('All');
  const list = workProjects.filter(w => cat === 'All' || w.category === cat);
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['Our Work', null]]} title="Work that shows how we think." lead="Twelve design concepts across websites, apps, software and automation. They are not client projects. Real case studies appear here once each client has approved them." />
      <section className="pgsec"><div className="wrap">
        <div className="filters" role="group" aria-label="Filter projects">{['All', ...CATS].map(c => <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}</div>
        <div className="work-grid">
          {list.map(w => <a key={w.slug} className="wc" href={'/work/' + w.slug}><BrowserFrame url={'cubusify.com/work/' + w.slug} src={workImg(w.slug)} alt={w.name + ': ' + w.title} /><h2 style={{ fontSize: 'clamp(1.15rem,1.7vw,1.45rem)', marginTop: '1rem', letterSpacing: '-.035em' }}>{w.name}: {w.title}</h2><p>{w.intro}</p><div className="meta"><span>{w.label}</span><span>{w.industry}</span><span>{w.category}</span></div></a>)}
          <div className="case-slot blank blank-only"><h3>Real case study <span className="draft">blank</span></h3><dl className="case-fields">{['Client', 'Problem', 'What we built', 'Verified result'].map(k => <div key={k}><dt>{k}</dt><dd>—</dd></div>)}</dl></div>
        </div>
      </div></section>
      <CtaBand />
    </>
  );
}
export function WorkDetail({ project: w }) {
  const more = workProjects.filter(x => x.slug !== w.slug && x.category === w.category).concat(workProjects.filter(x => x.slug !== w.slug && x.category !== w.category)).slice(0, 3);
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['Our Work', '/work'], [w.name, null]]} title={<>{w.name}: {w.title}</>} lead={w.intro} aside={<BrowserFrame url={'cubusify.com/work/' + w.slug} src={workImg(w.slug)} alt={w.name + ' concept preview'} eager />}>
        <a className="btn" href="/contact">Start something like this</a>
      </PageHero>
      <section className="pgsec"><div className="wrap">
        <dl className="facts">{[['Industry', w.industry], ['Focus', w.focus], ['Platform', w.platform], ['Status', w.label]].map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      </div></section>
      <section className="pgsec"><div className="wrap case">
        {[['The idea', w.idea], ['The challenge', w.challenge], ['The approach', w.approach]].map(([h, t]) => <article key={h}><h3>{h}</h3><p>{t}</p></article>)}
      </div></section>
      <section className="pgsec"><div className="wrap"><div className="pg-head"><h2>More work.</h2><p>{w.name} is a design concept, not a client project.</p></div>
        <div className="work-grid">{more.map(x => <a key={x.slug} className="wc" href={'/work/' + x.slug}><BrowserFrame url={'cubusify.com/work/' + x.slug} src={workImg(x.slug)} alt={x.name + ': ' + x.title} /><h3>{x.name}: {x.title}</h3><div className="meta"><span>{x.label}</span><span>{x.category}</span></div></a>)}</div></div></section>
      <CtaBand />
    </>
  );
}

/* ---------- About ---------- */
const VALUES = [['Ownership', 'We take responsibility and follow through.'], ['Transparency', 'Clear conversations. Honest expectations.'], ['Quality', 'Care in the details. Pride in the outcome.'], ['Long-term relationships', 'We stay invested beyond the first project.']];
const PARTNER = [['You’re heard', 'We listen to your goals, context and concerns before deciding the next step.'], ['You stay involved', 'Clear milestones and regular conversations keep decisions and progress visible.'], ['We grow together', 'We review what matters, learn together and keep looking ahead.']];
export function AboutPage() {
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['About Us', null]]} title="Built on trust. Driven by shared ambition." lead="We care about the people behind every idea, and the progress we can create together.">
        <a className="btn" href="/contact">Start a conversation</a>
      </PageHero>
      <section className="pgsec"><div className="wrap two-col">
        <div className="pg-head"><Heading id="story-h">A small beginning. A lasting commitment.</Heading></div>
        <div><p style={{ margin: 0, fontSize: '1.2rem' }}>Cubusify started with a simple belief: every business deserves a partner who listens, takes ownership and follows through.</p><p style={{ fontSize: '1.2rem' }}>Our purpose is to make progress feel clear, collaborative and personal, from the first conversation to the next chapter.</p></div>
      </div></section>
      <section className="pgsec"><div className="wrap"><div className="quote-band"><PersonPhoto src={founderImg()} name="Vijay Sakhwala" size="lg" /><div><blockquote>Your goals become our commitment.</blockquote><p>I started Cubusify to build lasting partnerships, grounded in honesty, thoughtful work and a genuine understanding of what matters to you. We treat your business as our own.</p><p><b>Vijay Sakhwala</b>, Founder, Cubusify</p></div></div></div></section>
      <section className="pgsec"><div className="wrap"><div className="pg-head"><Heading id="purpose-h">Our purpose and principles.</Heading><p>Our mission, vision and values define who we are and guide every solution we build.</p></div>
        <ul className="pillars">{[['Our Mission', 'To solve meaningful business challenges with technology that people can rely on.'], ['Our Vision', 'To be the partner businesses turn to when they need more than a product built.'], ['Our Core Values', 'We believe trust is built through the way we work. We take ownership, speak openly, and follow through on our commitments.']].map(([h, t]) => <li className="pillar" key={h}><h3>{h}</h3><p>{t}</p></li>)}</ul></div></section>
      <section className="pgsec"><div className="wrap"><div className="pg-head"><h2>The principles behind our promise.</h2></div>
        <ul className="pillars" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(15rem,1fr))' }}>{VALUES.map(([h, t]) => <li className="pillar" key={h}><h3>{h}</h3><p>{t}</p></li>)}</ul></div></section>
      <section className="pgsec"><div className="wrap"><div className="pg-head"><h2>What working with us feels like.</h2><p>A partnership built around your business. Thoughtful decisions. Clear accountability. A shared commitment to progress.</p></div>
        <ol className="process" style={{ gridTemplateColumns: 'repeat(3,minmax(0,1fr))' }}>{PARTNER.map(([h, t], i) => <li key={h}><span className="n">{i + 1}</span><h3>{h}</h3><p>{t}</p></li>)}</ol></div></section>
      <Credentials />
      <section className="pgsec"><div className="wrap"><div className="pg-head"><h2>Leadership.</h2></div><div className="why" style={{ background: 'none', padding: 0, color: 'inherit' }}><Leaders /></div></div></section>
      <CtaBand title="Let’s write your next chapter." text="Tell us where you want to go." />
    </>
  );
}

/* ---------- Hire Team ---------- */
export function TeamPage() {
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['Hire Team', null]]} title="The right team. Ready for your next move." lead="Work with a dedicated team that understands your goals and takes ownership of delivery.">
        <a className="btn" href="#team-enquiry">Build your team</a>
      </PageHero>
      <section className="pgsec"><div className="wrap"><ul className="pillars">{[['Dedicated collaboration', 'Work as one team, focused on your success.'], ['Clear communication', 'Regular updates and transparent progress.'], ['Flexible engagement', 'Scale and adapt as your needs evolve.']].map(([h, t]) => <li className="pillar" key={h}><h3>{h}</h3><p>{t}</p></li>)}</ul></div></section>
      <section className="pgsec"><div className="wrap"><div className="pg-head"><Heading id="roles-h">Expertise on tap.</Heading><p>Bring in the skills your product needs, from one accountable team.</p></div><RoleCards /></div></section>
      <section className="pgsec"><div className="wrap"><div className="pg-head"><h2>How it works.</h2></div>
        <ol className="process">{HIRE_STEPS.map(([t, d], i) => <li key={t}><span className="n">{i + 1}</span><h3>{t}</h3><p>{d}</p></li>)}</ol></div></section>
      <section className="pgsec" id="team-enquiry"><div className="wrap enquiry-grid"><div><Heading id="shape-h">Let’s shape your team.</Heading><p className="lead">Tell us what you’re building and where you need support.</p></div><ContactForm hire /></div></section>
    </>
  );
}

/* ---------- Careers ---------- */
export function CareersPage() {
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['Careers', null]]} title="Build useful things. Care about the details." lead="We’re interested in people who combine thoughtful design, practical engineering and clear communication." />
      <section className="pgsec"><div className="wrap two-col">
        <div className="pg-head"><Heading id="care-h">Care. Clarity. Ownership.</Heading><p>Thoughtful work starts with people who care about the details.</p></div>
        <div><h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)' }}>Good work starts with good people.</h2>
          <p style={{ fontSize: '1.15rem' }}>Interested in design, development or collaborating on a project? Tell us what you enjoy building and share a link to your work.</p>
          <ul className="career-values"><li>Clear communication</li><li>Care for the end user</li><li>Ownership of your work</li></ul>
          <p style={{ marginTop: '1.6rem' }}><a className="btn" href="mailto:hello@cubusify.com?subject=Career%20or%20collaboration%20enquiry">Introduce yourself</a></p>
          <p className="note">We review introductions when a relevant opportunity arises.</p></div>
      </div></section>
      <CtaBand />
    </>
  );
}

/* ---------- Contact ---------- */
export function ContactPage() {
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['Contact Us', null]]} title="Start your project with Cubusify." lead="Share your idea and our experts will get back to you within 24 hours." />
      <ContactSection asPage />
      <FaqSection />
    </>
  );
}

/* ---------- Legal ---------- */
const LEGAL = {
  privacy: ['Privacy', 'How this website handles the information you choose to share.', [['Project enquiries', 'The contact form prepares an email in your own email application. The brief is not submitted to a server by this website. If you send that email, Cubusify receives the details you include and uses them to discuss your enquiry.'], ['Interactive demos', 'Demo inputs and actions remain in the current browser session. They use sample data. Please avoid entering confidential or sensitive information into the playgrounds.'], ['Hosting and external services', 'The website is designed for Cloudflare hosting. Your hosting provider may process technical request data needed to serve and secure the website. This build does not install advertising trackers or third-party analytics. Fonts are hosted with the site.'], ['Your choices', 'For questions about an enquiry or to request correction or deletion of information you have emailed us, contact hello@cubusify.com.']]],
  terms: ['Website terms', 'A clear explanation of this website and its sample experiences.', [['Concept demonstrations', 'The interactive experiences use sample data. They do not create real orders, appointments, transactions, deployments or external messages. AI examples use scripted responses.'], ['Project agreements', 'The website describes capabilities and examples. Deliverables, schedule, payment, ownership and support are agreed in the project contract before work begins.'], ['Illustrative content', 'Solution showcases are demonstration concepts. Industry photographs are illustrative images and do not identify clients or team members.'], ['Contact', 'For questions about the website or a proposed project, email hello@cubusify.com.']]]
};
export function LegalPage({ type }) {
  const [h, intro, parts] = LEGAL[type];
  return (
    <article className="prose"><nav className="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><span aria-current="page">{h}</span></li></ol></nav>
      <h1>{h}</h1><p className="intro">{intro}</p>
      {parts.map(([t, p]) => <section key={t}><h2>{t}</h2><p>{p}</p></section>)}
    </article>
  );
}

/* ---------- Demo Studio (the existing interactive demos) ---------- */
const LiveStudio = lazy(() => import('../LiveStudio'));
export function DemoStudioPage() {
  return (
    <Suspense fallback={<div className="wrap" style={{ paddingTop: '9rem' }}><h2>Cubusify Live Demo Studio</h2><p>Explore interactive Ecommerce, Fitness Application, Animated Snake, CRM and WhatsApp + Sheets concepts.</p><p role="status">Loading interactive experiences…</p></div>}><LiveStudio /></Suspense>
  );
}

export function NotFound() {
  return <PageHero crumbs={[['Home', '/']]} title="Let’s get you back on track." lead="That page isn’t part of this website."><a className="btn" href="/">Back to Cubusify</a></PageHero>;
}
