import {Image} from './Showcase';
import {ServiceIcon} from './Redesign';
import React from 'react';
import {ArrowRight,ArrowUpRight,Target,Users,ShieldCheck,FileText,Lightbulb,Code,ChartNoAxesColumnIncreasing} from 'lucide-react';
import {services} from './catalog';
import './ai-sample.css';
import './services-directory.css';

const groups = [
  ['Build & launch', 'Choose custom software for internal workflows, web development for browser-based experiences, mobile development for device-specific tasks, or product engineering for a focused release.', [
    ['software', 'Custom CRM · Business dashboards'],
    ['web',      'Business websites · Web applications'],
    ['mobile',   'iOS & Android · Cross-platform apps'],
    ['product',  'MVP development · SaaS engineering'],
  ]],
  ['Experience & growth', 'Clarify a product journey with UI/UX design, build a practical store, improve existing content or develop a focused interactive experience.', [
    ['design',     'User experience · Interface design'],
    ['ecommerce',  'Shopify · WooCommerce'],
    ['marketing',  'SEO · Content & campaigns'],
    ['games',      '2D games · Interactive experiences'],
  ]],
  ['Operate & improve', "Connect routine work, test important journeys and establish a manageable release and operating process. Assess blockchain only where a shared-record requirement justifies it.", [
    ['ai',         'AI assistants · Business automation'],
    ['qa',         'Web & mobile testing · Test automation'],
    ['cloud',      'Cloud deployment · CI/CD pipelines'],
    ['blockchain', 'Smart contracts · Traceability solutions'],
  ]],
];

/* ── Professional browser-frame image (mirrors Services-page reference) ── */
function HeroFrame() {
  return (
    <div className="sd-hero-frame">
      <div className="sd-hero-frame-inner">
        {/* browser chrome */}
        <div className="sd-frame-chrome">
          <span className="sd-chrome-dot" />
          <span className="sd-chrome-dot" />
          <span className="sd-chrome-dot" />
          <div className="sd-chrome-address">
            <span className="sd-chrome-lock">🔒</span>
            <span>cubusify.com / workspace</span>
          </div>
        </div>
        {/* main image */}
        <div className="sd-frame-screen">
          <Image
            id="product-engineering-hero"
            eager
            sizes="(max-width: 900px) calc(100vw - 36px), 720px"
            className="sd-frame-img"
          />
        </div>
        {/* right side panel — billing overlay card */}
        <div className="sd-frame-overlay">
          <div className="sd-overlay-card">
            <div className="sd-overlay-header">
              <span className="sd-overlay-avatar">MS</span>
              <span className="sd-overlay-name">Maya Shah</span>
            </div>
            <div className="sd-overlay-row"><span>Owner</span><b>Maya Shah</b></div>
            <div className="sd-overlay-row"><span>Status</span><b className="sd-overlay-badge">In review</b></div>
            <div className="sd-overlay-row"><span>Dates</span><b>May 6 – Jun 14, 2024</b></div>
            <div className="sd-overlay-row"><span>Milestone</span><b>Build</b></div>
            <div className="sd-overlay-divider"/>
            <p className="sd-overlay-label">Checklist</p>
            <div className="sd-overlay-check"><span className="sd-check-done">✓</span> Interface ready</div>
            <div className="sd-overlay-check"><span className="sd-check-done">✓</span> Tests ready</div>
            <div className="sd-overlay-check"><span className="sd-check-pend">○</span> Approval pending</div>
            <button className="sd-overlay-btn">Open task</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const benefits = [
  [Target,     'Clear scope',           'Aligned goals, transparent plans and predictable delivery.'],
  [Users,      'Connected delivery',    'A single team from strategy to launch.'],
  [ShieldCheck,'Support beyond launch', 'Ongoing improvements to keep you moving forward.'],
];

const process = [
  [FileText,                     'Understand your goals', 'We learn about your business, users and challenges.'],
  [Lightbulb,                    'Shape the approach',    'We recommend the right expertise and plan.'],
  [Code,                         'Build & connect',       'We design, develop and integrate everything.'],
  [ChartNoAxesColumnIncreasing,  'Review & improve',      'We launch, measure and keep optimising.'],
];

export default function ServicesDirectory() {
  return (
    <div className="ai-page sd-page">

      {/* ── Hero ── */}
      <section className="sd-hero ai-width">
        <div>
          <nav aria-label="Breadcrumb">
            <a href="/">Home</a><span>/</span>Services
          </nav>
          <span className="ai-eyebrow">CUBUSIFY SERVICES</span>
          <h1>Software Development<br/><span>&amp; Digital Services.</span></h1>
          <p>Compare services for a new product, an existing system or a workflow that needs improving. Start with the task and its constraints; we can help define the right mix of software, design, integration and support.</p>
          <a className="ai-button sd-hero-cta" href="/contact">
            Discuss your project <ArrowRight size={18}/>
          </a>
        </div>
        <HeroFrame/>
      </section>

      {/* ── Benefits strip ── */}
      <section className="sd-benefits ai-width">
        {benefits.map(([I,t,c]) => (
          <article key={t}>
            <span className="ai-icon"><I/></span>
            <div><h3>{t}</h3><p>{c}</p></div>
          </article>
        ))}
      </section>

      {/* ── Service groups ── */}
      <section className="sd-groups ai-width" aria-label="Explore all services">
        {groups.map(([title, copy, items]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{copy}</p>
            <div>
              {items.map(([slug, subtitle]) => {
                const s = services.find(x => x.slug === slug);
                return (
                  <a href={s.path} key={slug}>
                    <span className="directory-icon"><ServiceIcon service={s} size={22}/></span>
                    <div>
                      <h3>{s.title}</h3>
                      <p>{subtitle}</p>
                    </div>
                    <span className="sd-arrow"><ArrowRight size={14}/></span>
                  </a>
                );
              })}
            </div>
          </section>
        ))}
      </section>

      {/* ── SEO/AEO/GEO callout ── */}
      <section className="container growth-directory-link">
        <div>
          <span className="eyebrow">SEARCH & ANSWER DISCOVERY</span>
          <h2>SEO, AEO &amp; GEO.<br/>One connected approach.</h2>
          <p>Use the broader search strategy service for crawling, indexing and measurement; choose page-level SEO for existing copy, metadata and contextual links.</p>
        </div>
        <a className="button sd-geo-btn" href="/services/seo-aeo-geo">
          Explore visibility services <ArrowRight size={18}/>
        </a>
      </section>

      {/* ── Process steps ── */}
      <section className="sd-process ai-width">
        {process.map(([I, t, c], n) => (
          <article key={t}>
            <span className="ai-icon"><I/></span>
            <div><h3>{n+1}. {t}</h3><p>{c}</p></div>
            {n < 3 && <ArrowRight size={16}/>}
          </article>
        ))}
      </section>

      {/* ── CTA ── */}
      <section className="sd-cta ai-width">
        <div>
          <h2>Not sure where to start?</h2>
          <p>Bring the current workflow, existing systems and the outcome you want to improve. We can compare configuration, a focused enhancement and a new build before agreeing scope.</p>
        </div>
        <a className="ai-button" href="/contact">Start a conversation <ArrowUpRight size={18}/></a>
      </section>

    </div>
  );
}
