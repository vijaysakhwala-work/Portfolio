import React, { useState } from 'react';
import { PageHero, Breadcrumb, Heading, CtaBand, RichText, ImageSlot, CodeWindow } from '../components/ui';
import { FaqList } from '../sections/HomeB';
import { posts, services, postBody, readMinutes, fmtDate, headingId } from '../lib/site';

const catLabel = c => c.toLowerCase();
const Meta = ({ p }) => (
  <p className="pc-meta">
    <span className="pc-cat">{catLabel(p.category)}</span>
    <time dateTime={p.published}>{fmtDate(p.published)}</time>
    <span>{readMinutes(p)} min read</span>
  </p>
);

/* One post as a card: empty cover frame, meta row, title, summary */
export function PostCard({ post: p, featured = false }) {
  return (
    <a className={'pc' + (featured ? ' pc-feat' : '')} href={'/blog/' + p.slug}>
      <ImageSlot ratio="wide" src={p.cover?.src} alt={p.cover?.alt} label="Cover image" />
      <div className="pc-body">
        <Meta p={p} />
        {featured ? <h2>{p.title}</h2> : <h3>{p.title}</h3>}
        <p className="pc-sum">{p.summary}</p>
        <span className="pc-go">Read the guide</span>
      </div>
    </a>
  );
}
export function PostGrid({ list }) {
  if (!list.length) return null;
  return <div className="pc-grid">{list.map(p => <PostCard key={p.slug} post={p} />)}</div>;
}

/* ---------- /blog ---------- */
export function BlogPage() {
  const cats = [...new Set(posts.map(p => p.category))];
  const [cat, setCat] = useState('All');
  const list = posts.filter(p => cat === 'All' || p.category === cat);
  const [first, ...rest] = list;
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['Blog', null]]} title="Software, AI and web guides for business teams." lead="Plain-language guides on choosing platforms, automating with AI, planning a first product and keeping a website fast and findable. Written to help you decide, not to sell." />
      <section className="pgsec"><div className="wrap">
        <div className="filters" role="group" aria-label="Filter articles by topic">
          {['All', ...cats].map(c => <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}>{c === 'All' ? 'All topics' : c.charAt(0) + c.slice(1).toLowerCase()}</button>)}
        </div>
        {first && <PostCard post={first} featured />}
        <PostGrid list={rest} />
        {!list.length && <p className="note">No articles in this topic yet.</p>}
      </div></section>
      <CtaBand title="Have a question the guides do not answer?" text="Describe what you are trying to do. We will tell you honestly what we would try first." />
    </>
  );
}

/* ---------- /blog/:slug ---------- */
const pathTitle = Object.fromEntries(services.flatMap(s => [[s.path, s.title], ...s.subs.map(x => [x.path, x.title])]));

function Block({ b, id }) {
  switch (b.t) {
    case 'h2': return <h2 id={id}>{b.x}</h2>;
    case 'h3': return <h3>{b.x}</h3>;
    case 'p': return <p><RichText text={b.x} /></p>;
    case 'ul': return <ul>{b.items.map((x, i) => <li key={i}><RichText text={x} /></li>)}</ul>;
    case 'ol': return <ol>{b.items.map((x, i) => <li key={i}><RichText text={x} /></li>)}</ol>;
    case 'table': return (
      <div className="tbl-wrap" role="region" aria-label={b.caption} tabIndex={0}>
        <table>
          <caption>{b.caption}</caption>
          <thead><tr>{b.head.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead>
          <tbody>{b.rows.map((r, i) => <tr key={i}>{r.map((c, j) => j === 0 ? <th key={j} scope="row"><RichText text={c} /></th> : <td key={j}><RichText text={c} /></td>)}</tr>)}</tbody>
        </table>
      </div>
    );
    case 'callout': return <aside className="callout"><b>{b.title}</b><p><RichText text={b.x} /></p></aside>;
    case 'code': return <div className="art-code"><CodeWindow file={b.file} code={b.code} /></div>;
    case 'figure': return <ImageSlot ratio={b.ratio || 'wide'} src={b.src} alt={b.alt} brief={b.brief} caption={b.caption} />;
    default: return null;
  }
}

export function ArticlePage({ article: light }) {
  const a = { takeaways: [], body: [], faq: [], ...light, ...(postBody(light.slug) || {}) }; // text loads per page
  const used = new Set();
  const ids = a.body.map(b => {
    if (b.t !== 'h2') return null;
    let id = headingId(b.x) || 'section', n = 2; const base = id;
    while (used.has(id)) id = base + '-' + n++;
    used.add(id); return id;
  });
  const toc = a.body.map((b, i) => b.t === 'h2' ? [ids[i], b.x] : null).filter(Boolean);
  if (a.faq?.length) toc.push(['faq', 'Frequently asked questions']);
  const related = posts.filter(p => p.slug !== a.slug).sort((x, y) => (y.category === a.category) - (x.category === a.category)).slice(0, 3);
  return (
    <>
      <header className="art-head"><div className="wrap">
        <Breadcrumb items={[['Home', '/'], ['Blog', '/blog'], [a.title, null]]} />
        <p className="pc-meta"><span className="pc-cat">{catLabel(a.category)}</span><span>{readMinutes(a)} min read</span></p>
        <h1>{a.title}</h1>
        <p className="art-sum">{a.summary}</p>
        <p className="art-by">By <a href="/about">the Cubusify team</a> · Published <time dateTime={a.published}>{fmtDate(a.published)}</time>{a.updated !== a.published && <> · Updated <time dateTime={a.updated}>{fmtDate(a.updated)}</time></>}</p>
        <ImageSlot ratio="wide" src={a.cover?.src} alt={a.cover?.alt} brief={a.cover?.brief} label="Cover image" eager />
      </div></header>

      <div className="wrap art-layout">
        <nav className="toc" aria-label="On this page">
          <b>On this page</b>
          <ol>{toc.map(([id, t]) => <li key={id}><a href={'#' + id}>{t}</a></li>)}</ol>
          <a className="btn toc-cta" href="/contact">Talk to us</a>
        </nav>

        <article className="art-body">
          {a.takeaways?.length > 0 && (
            <section className="takeaways" aria-labelledby="kt-h">
              <h2 id="kt-h">Key takeaways</h2>
              <ul>{a.takeaways.map((t, i) => <li key={i}><RichText text={t} /></li>)}</ul>
            </section>
          )}
          {a.body.map((b, i) => <Block key={i} b={b} id={ids[i]} />)}

          {a.faq?.length > 0 && (
            <section className="art-faq" id="faq" aria-labelledby="faq-h">
              <h2 id="faq-h">Frequently asked questions</h2>
              <FaqList items={a.faq} />
            </section>
          )}

          <aside className="about-box" aria-label="About this guide">
            <b>About this guide</b>
            <p>Written by the Cubusify team. Cubusify designs and builds software, websites, mobile apps and AI automation. Details change, so check vendor documentation before you commit to a decision. Questions about this topic? <a href="/contact">Start a conversation</a> or read <a href="/about">how we work</a>.</p>
          </aside>
        </article>
      </div>

      {a.services?.length > 0 && (
        <section className="pgsec"><div className="wrap">
          <div className="pg-head"><Heading id="rel-svc-h">Related services.</Heading></div>
          <div className="fit" data-n={a.services.length}>{a.services.map(p => <a className="sub-card" key={p} href={p}><h3>{pathTitle[p] || p}</h3><span className="go">Explore {pathTitle[p] || 'the service'}</span></a>)}</div>
        </div></section>
      )}
      <section className="pgsec"><div className="wrap">
        <div className="pg-head"><h2>Keep reading.</h2></div>
        <PostGrid list={related} />
      </div></section>
      <CtaBand title="Ready to turn this into a plan?" text="Share your goal and what you already have. A reply is on its way within 24 hours." />
    </>
  );
}
