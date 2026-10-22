import {canon} from './links';
import React,{useEffect,useRef,useState} from 'react';
import {
  ArrowUpRight, Search, MessageCircle, Sparkles,
  FileSearch, Route, ChartNoAxesColumnIncreasing, Check,
  Zap, Globe, Brain, TrendingUp
} from 'lucide-react';
import './seo-growth.css';

const disciplines = [
  {
    name: 'SEO',
    label: 'Search Engine Optimisation',
    icon: Search,
    color: '#0965ff',
    bg: 'linear-gradient(135deg,#eef5ff,#deeeff)',
    title: 'Be easier to find.',
    copy: 'Give search engines and visitors a clear, dependable website.',
    items: [
      'Technical health, crawling and indexing',
      'Useful content and keyword intent',
      'Internal links, structured data and performance',
    ],
  },
  {
    name: 'AEO',
    label: 'Answer Engine Optimisation',
    icon: MessageCircle,
    color: '#8b5cf6',
    bg: 'linear-gradient(135deg,#f3eeff,#e8d8ff)',
    title: 'Make the answer clear.',
    copy: 'Help people get a useful answer without working through unnecessary detail.',
    items: [
      'Answer-first page structure',
      'Clear definitions and practical FAQs',
      'Readable summaries with supporting detail',
    ],
  },
  {
    name: 'GEO',
    label: 'Generative Engine Optimisation',
    icon: Sparkles,
    color: '#06b6d4',
    bg: 'linear-gradient(135deg,#e0f9ff,#c9f3fe)',
    title: 'Make expertise understandable.',
    copy: 'Organise original expertise so AI-assisted discovery can understand and reference it.',
    items: [
      'Consistent business and topic information',
      'Original sources, examples and clear attribution',
      'Accessible, crawlable content and topical coverage',
    ],
  },
];

const processSteps = [
  [FileSearch,               'Audit the foundations',  'Review crawling, indexing, page structure, content, performance and the enquiry journey.'],
  [Route,                    'Agree the priorities',   'Separate urgent fixes from content opportunities and define a realistic first phase.'],
  [Search,                   'Improve what matters',   'Implement agreed technical changes, internal links, helpful pages and accurate metadata.'],
  [ChartNoAxesColumnIncreasing, 'Measure and refine', 'Compare relevant page and query performance with the agreed baseline. Record what changed, account for seasonality and campaigns, and prioritise qualified enquiries alongside traffic.'],
];

const deliverables = [
  'Technical audit with prioritised issues and evidence',
  'Content and question map tied to customer needs',
  'Agreed metadata, internal linking and schema improvements',
  'Clearer landing pages and enquiry journeys',
  'Performance recommendations and accessible content structure',
  'A baseline, reporting notes and a practical next-step roadmap',
];

const usecases = [
  ['Service businesses',       'Explain expertise and help prospects choose the right next step.',              '/services/web'],
  ['Commerce',                 'Organise collections, product information and useful buying guidance.',          '/services/ecommerce'],
  ['Software & SaaS',          'Make complex capabilities understandable through clear use cases.',              '/services/product'],
  ['Healthcare & professional','Build clear, responsibly sourced explanations around genuine expertise.',        '/industries/healthcare'],
];

const faqs = [
  ['Do SEO, AEO and GEO need separate websites?', 'No. They work best as one strategy for a useful, accessible website. We align technical foundations, helpful answers and original expertise instead of creating duplicate pages.'],
  ['Can you guarantee rankings or AI citations?',  'No. Search rankings and generative answers are controlled by third parties. We can deliver an agreed audit, fixes, content and measurement plan; visibility and traffic depend on competition, demand and platform behavior.'],
  ['What will we receive?',                        'An evidence-based audit, prioritised action plan, agreed technical and content changes, and a reporting handover. We define the exact deliverables before starting.'],
  ['Does structured data guarantee a rich result?','No. Accurate structured data can describe relevant visible information. Eligibility and presentation depend on the platform; we avoid unsupported ratings, claims and special AI-markup promises.'],
  ['Can you improve our existing website?',        'Yes. We first assess your content, routes, indexing, performance and conversion journey. A focused set of improvements may be more useful than a complete rebuild.'],
  ['How do you measure progress?',                 'We agree a baseline and practical measures such as valid indexed pages, relevant search impressions, useful content coverage, enquiry completion and measured performance. We distinguish observed results from estimates.'],
];

const stats = [
  [TrendingUp, 'Audit', 'Crawling & indexing'],
  [Globe, 'Content', 'Distinct useful pages'],
  [Brain, 'Links', 'Connected customer journeys'],
  [Zap, 'Measure', 'Queries & enquiries'],
];

function CountUp({value}){
  const m=/^(d+)(.*)$/.exec(value),end=m?+m[1]:0,suffix=m?m[2]:'';
  const [n,setN]=useState(end),ref=useRef(null);
  useEffect(()=>{
    if(!m||matchMedia('(prefers-reduced-motion: reduce)').matches||typeof IntersectionObserver==='undefined')return;
    let raf,start;setN(0);
    const o=new IntersectionObserver(([e])=>{if(!e.isIntersecting)return;o.disconnect();
      const tick=t=>{start=start??t;const p=Math.min(1,(t-start)/1400);setN(Math.round(end*(1-Math.pow(1-p,3))));if(p<1)raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick)},{threshold:.4});
    o.observe(ref.current);
    return()=>{o.disconnect();cancelAnimationFrame(raf)};
  },[value]);
  return <strong ref={ref} aria-label={value}>{m?n+suffix:value}</strong>;
}

export default function SeoGrowthPage() {
  return (
    <div className="sg-page">

      {/* ── HERO ── */}
      <section className="sg-hero container">
        {/* ambient orbs */}
        <div className="sg-orb sg-orb-1" aria-hidden="true"/>
        <div className="sg-orb sg-orb-2" aria-hidden="true"/>



        <div className="sg-hero-layout">
          <div className="sg-hero-copy">
            <span className="sg-eyebrow">SEARCH &amp; ANSWER DISCOVERY</span>
            <h1>SEO, AEO &amp; GEO.<br/><span>Strategy &amp; Implementation.</span></h1>
            <p>Build a practical search plan around public accessibility, distinct service content, useful answers and a measurable enquiry journey. Start with a website audit and agree the highest-value implementation work.</p>
            <div className="sg-hero-actions">
              <a className="sg-btn-primary" href="/contact/">
                Discuss your goals <ArrowUpRight size={17}/>
              </a>
              <a className="sg-btn-secondary" href="#approach">See our approach ↓</a>
            </div>
          </div>

          {/* Animated triple-disc visual */}
          <div className="sg-orbit-wrap" aria-hidden="true">
            <div className="sg-orbit-ring sg-ring-outer"/>
            <div className="sg-orbit-ring sg-ring-inner"/>
            <div className="sg-orbit-center">
              <Search size={36} strokeWidth={1.5}/>
            </div>
            <div className="sg-orbit-pill sg-pill-seo">SEO</div>
            <div className="sg-orbit-pill sg-pill-aeo">AEO</div>
            <div className="sg-orbit-pill sg-pill-geo">GEO</div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="sg-stats">
          {stats.map(([Icon, val, label]) => (
            <div key={label} className="sg-stat">
              <span className="sg-stat-icon"><Icon size={18}/></span>
              <CountUp value={val}/>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── THREE DISCIPLINES ── */}
      <section className="sg-section container">
        <div className="sg-section-head">
          <span className="sg-eyebrow">THREE LENSES. ONE USEFUL WEBSITE.</span>
          <h2>Clarity for people.<br/><span>Structure for discovery.</span></h2>
        </div>
        <div className="sg-disciplines">
          {disciplines.map(({name, label, icon: Icon, color, bg, title, copy, items}) => (
            <article key={name} className="sg-discipline-card" style={{'--dc': color, '--db': bg}}>
              <div className="sg-dc-top">
                <span className="sg-dc-badge" style={{background: color+'18', color}}>{name}</span>
                <span className="sg-dc-icon" style={{background: color+'15', color}}><Icon size={22}/></span>
              </div>
              <p className="sg-dc-label">{label}</p>
              <h3>{title}</h3>
              <p className="sg-dc-copy">{copy}</p>
              <ul>
                {items.map(x => (
                  <li key={x}><span className="sg-check" style={{color}}><Check size={14}/></span>{x}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="sg-section sg-process-section" id="approach">
        <div className="container">
          <div className="sg-section-head sg-head-light">
            <span className="sg-eyebrow sg-eyebrow-light">FROM BASELINE TO BETTER DECISIONS</span>
            <h2>A practical plan.<br/><span>Visible work at every step.</span></h2>
          </div>
          <div className="sg-process">
            {processSteps.map(([Icon, t, c], n) => (
              <article key={t} className="sg-process-card">
                <div className="sg-process-num">0{n+1}</div>
                <span className="sg-process-icon"><Icon size={24}/></span>
                <h3>{t}</h3>
                <p>{c}</p>
                {n < 3 && <div className="sg-process-arrow">→</div>}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELIVERABLES ── */}
      <section className="sg-section container">
        <div className="sg-deliverables">
          <div>
            <span className="sg-eyebrow">WHAT YOU TAKE AWAY</span>
            <h2>More than<br/><span>a list of keywords.</span></h2>
            <p>A plan your team can understand, improvements you can inspect and a clear handover.</p>
          </div>
          <ul className="sg-deliverables-list">
            {deliverables.map(x => (
              <li key={x}>
                <span className="sg-check-circle"><Check size={14}/></span>
                {x}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="sg-section container">
        <span className="sg-eyebrow">BUILT AROUND YOUR BUSINESS</span>
        <h2>The right questions.<br/><span>In the right context.</span></h2>
        <div className="sg-usecases">
          {usecases.map(([t, c, url]) => (
            <a href={canon(url)} key={t} className="sg-usecase-card">
              <h3>{t}</h3>
              <p>{c}</p>
              <span className="sg-usecase-arrow"><ArrowUpRight size={18}/></span>
            </a>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sg-section container">
        <div className="sg-faq-wrap">
          <div>
            <span className="sg-eyebrow">GOOD QUESTIONS. CLEAR ANSWERS.</span>
            <h2>Before we begin.</h2>
          </div>
          <div className="sg-faq-list">
            {faqs.map(([q, a]) => (
              <details key={q} className="sg-faq">
                <summary>{q}<span className="sg-faq-icon">+</span></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sg-cta container">
        <div className="sg-cta-orb" aria-hidden="true"/>
        <span className="sg-eyebrow sg-eyebrow-light">LET'S MAKE THE NEXT STEP CLEAR</span>
        <h2>Start with your website.<br/><span>Agree what to improve.</span></h2>
        <p>Share your website, target customers and available search data. We can define a technical and content roadmap, then scope the implementation against your commercial priorities.</p><p>For focused page rewrites, explore <a href="/services/marketing/search-engine-optimisation/">on-page SEO and content optimisation</a>. Prepare with our <a href="/blog/seo-aeo-geo-where-to-start/">website improvement planning guide</a>.</p>
        <div className="sg-cta-actions">
          <a className="sg-btn-primary" href="/contact/">Talk to Cubusify <ArrowUpRight size={17}/></a>
        </div>
      </section>

    </div>
  );
}
