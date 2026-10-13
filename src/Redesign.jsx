import './contact-envelope.css';
import BeamHero from './BeamHero';
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Menu, X, ChevronDown, Code2, Monitor, Smartphone, Sparkles, Layers,
  PenTool, ShoppingBag, ShieldCheck, Cloud, Blocks, Megaphone, Gamepad2,
  FileCheck2, BarChart3, Headphones, Target, Users, Check, Play, Mail,
  MapPin, Quote, Package, Truck, CircleCheck, Building2,
  User, Phone, Globe, DollarSign, Pencil, Paperclip, Send, Award, UserCheck, Heart,
} from 'lucide-react';
import { services, industries } from './catalog';
import { Demo } from './Demos';
import { proof, contactEmail, industryCaptions } from './content';

const icons = { Code2, Monitor, Smartphone, Sparkles, Layers, PenTool, ShoppingBag, ShieldCheck, Cloud, Blocks, Megaphone, Gamepad2 };
export function ServiceIcon({ service, size = 24 }) {
  const Icon = icons[service.icon] || Code2;
  return <Icon size={size} aria-hidden="true" />;
}
export function Brand() {
  return <a className="brand" href="/" aria-label="Cubusify home"><img style={{objectFit:"contain"}} src="/images/company-logo.png" alt="" width="32" height="32" /><span>Cubusify</span></a>;
}

const company = [['About Us', '/about'], ['Careers', '/careers'], ['Our Team', '/team'], ['Blog', '/blog'], ['Contact Us', '/contact']];
const companyMenu = company.filter(([, path]) => ['/about', '/contact'].includes(path));
const serviceGroups = [
  ['Build', ['software', 'web', 'mobile', 'product']],
  ['Experience & growth', ['design', 'ecommerce', 'marketing', 'games']],
  ['Operate & improve', ['ai', 'qa', 'cloud', 'blockchain']],
];

function MenuContent({ name }) {
  if (name === 'Company') return <div className="company-dropdown"><div><span className="eyebrow">YOUR BUSINESS. OUR COMMITMENT.</span><h3>One partner.<br />Shared ambition.</h3><p>Get to know the team that takes ownership.</p></div><div>{companyMenu.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div></div>;
  if (name === 'Industries') return <div className="industry-dropdown">{industries.map(i => <a key={i.slug} href={'/industries/' + i.slug}><img src={i.image} alt="" /><span><b>{i.name}</b><small>{industryCaptions[i.slug]}</small></span></a>)}</div>;
  if (name === 'AI') return <div className="ai-dropdown"><div><span className="eyebrow">PRACTICAL AI</span><h3>Give your team<br />time for what matters.</h3><a className="button" href="/services/ai">Explore AI &amp; automation</a></div><div>{services.find(s => s.slug === 'ai').subs.map(s => <a href={s.path} key={s.slug}><Sparkles size={21} /><span><b>{s.title}</b><small>{s.description}</small></span></a>)}</div></div>;
  return <div className="service-dropdown"><div className="service-dropdown-groups">{serviceGroups.map(([title, slugs]) => <div key={title}><h3>{title}</h3>{slugs.map(slug => { const s = services.find(s => s.slug === slug); return <a key={slug} href={s.path}><ServiceIcon service={s} size={21} /><span><b>{s.title}</b><small>{s.subs.slice(0, 2).map(x => x.title).join(' · ')}</small></span></a>; })}</div>)}</div><div className="dropdown-bottom"><a href="/services">Explore all services</a><a href="/demo-studio"><Play size={16} /> See how it works in Demo Studio</a></div></div>;
}

export function Header() {
  const [open, setOpen] = useState(null);
  const [mobile, setMobile] = useState(false);
  const root = useRef(null);
  const previousButton = useRef(null);
  const close = () => { setOpen(null); setMobile(false); };
  useEffect(() => {
    const escape = e => { if (e.key === 'Escape') { close(); previousButton.current?.focus(); } };
    const outside = e => { if (root.current && !root.current.contains(e.target)) close(); };
    document.addEventListener('keydown', escape);
    document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', escape); document.removeEventListener('pointerdown', outside); };
  }, []);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1041px)');
    const change = () => close(); query.addEventListener('change', change);
    if (mobile) { const old = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = old; query.removeEventListener('change', change); }; }
    return () => query.removeEventListener('change', change);
  }, [mobile]);
  const toggle = (name, event) => { previousButton.current = event.currentTarget; setOpen(v => v === name ? null : name); };
  return <header ref={root} className="site-header redesign-header">
    <div className="header-inner"><Brand /><nav className="desktop-nav" aria-label="Main navigation">
      {['AI', 'Services', 'Industries'].map(name => <button key={name} className={open === name ? 'active' : ''} aria-expanded={open === name} aria-controls="desktop-dropdown" onClick={e => toggle(name, e)}>{name}<ChevronDown size={13} /></button>)}
      <a href="/team">Hire Team</a><a href="/work">Our Work</a><button className={open === 'Company' ? 'active' : ''} aria-expanded={open === 'Company'} aria-controls="desktop-dropdown" onClick={e => toggle('Company', e)}>Company<ChevronDown size={13} /></button><a href="/demo-studio">Demo Studio</a>
    </nav><a className="button desktop-quote" href="/contact">Get Quote</a><button className="mobile-toggle" aria-label={mobile ? 'Close navigation' : 'Open navigation'} aria-expanded={mobile} aria-controls="mobile-navigation" onClick={() => { setMobile(v => !v); setOpen(null); }}>{mobile ? <X /> : <Menu />}</button></div>
    <AnimatePresence>{open && !mobile && <motion.div id="desktop-dropdown" className="redesign-dropdown" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .15 }} onClick={e => { if (e.target.closest('a')) close(); }}><MenuContent name={open} /></motion.div>}</AnimatePresence>
    {mobile && <nav className="mobile-navigation" id="mobile-navigation" aria-label="Mobile navigation" onClick={e => { if (e.target.closest('a')) close(); }}>
      {['AI', 'Services', 'Industries', 'Company'].map(name => <div className="mobile-nav-group" key={name}><button aria-expanded={open === name} aria-controls={'mobile-' + name} onClick={e => toggle(name, e)}>{name}<ChevronDown size={18} /></button>{open === name && <div id={'mobile-' + name} className="mobile-submenu"><MenuContent name={name} /></div>}</div>)}
      <a href="/team">Hire Team</a><a href="/work">Our Work</a><a href="/demo-studio">Demo Studio</a><a className="button" href="/contact">Get Quote</a>
    </nav>}
  </header>;
}

function OrderPhone() {
  return <div className="order-phone" aria-label="Shipment tracking interface concept"><div className="phone-notch" /><div className="phone-status"><b>9:41</b><span>5G ▰</span></div><b className="phone-title">Order tracking</b><small>ORDER #CB-1042</small><div className="phone-timeline">{[['Order placed', 'Monday, 9:45 AM'], ['Processing', 'Monday, 10:30 AM'], ['Out for delivery', 'Today, 10:12 AM'], ['Delivered', 'Your next update']].map(([title, time], i) => <div key={title} className={i < 3 ? 'complete' : ''}><CircleCheck size={17} /><span><b>{title}</b><small>{time}</small></span></div>)}</div><div className="tracking-map"><div className="map-grid" /><svg viewBox="0 0 240 110" aria-hidden="true"><path d="M30 75 L75 30 L125 60 L178 25 L210 40" fill="none" stroke="#0965ff" strokeWidth="4" strokeLinecap="round" /><circle cx="30" cy="75" r="7" fill="#00b8e9" /><circle cx="210" cy="40" r="7" fill="#ff7435" /></svg><span><Truck size={16} /> On its way</span></div><div className="phone-delivery"><small>Estimated delivery</small><b>Today, 12:00 PM</b></div></div>;
}

export function Hero() { return <BeamHero />; }

const clientBrands = [
  {
    name: 'NovaTech',
    logo: (
      <svg width="130" height="40" viewBox="0 0 130 40" fill="none" aria-label="NovaTech">
        <rect width="32" height="32" rx="7" fill="#0965ff" x="1" y="4" />
        <text x="7" y="27" fontSize="18" fontWeight="800" fill="#fff" fontFamily="system-ui,sans-serif">N</text>
        <text x="40" y="27" fontSize="16" fontWeight="700" fill="#071b50" fontFamily="system-ui,sans-serif">NovaTech</text>
      </svg>
    ),
  },
  {
    name: 'Orbitly',
    logo: (
      <svg width="110" height="40" viewBox="0 0 110 40" fill="none" aria-label="Orbitly">
        <circle cx="18" cy="20" r="14" stroke="#ff7435" strokeWidth="3" />
        <circle cx="18" cy="20" r="5" fill="#ff7435" />
        <text x="40" y="27" fontSize="16" fontWeight="700" fill="#071b50" fontFamily="system-ui,sans-serif">Orbitly</text>
      </svg>
    ),
  },
  {
    name: 'Streamify',
    logo: (
      <svg width="132" height="40" viewBox="0 0 132 40" fill="none" aria-label="Streamify">
        <rect width="32" height="22" rx="5" fill="#00b7e9" x="2" y="9" />
        <polygon points="25,20 35,13 35,27" fill="#fff" />
        <text x="42" y="27" fontSize="16" fontWeight="700" fill="#071b50" fontFamily="system-ui,sans-serif">Streamify</text>
      </svg>
    ),
  },
  {
    name: 'Nexus Labs',
    logo: (
      <svg width="138" height="40" viewBox="0 0 138 40" fill="none" aria-label="Nexus Labs">
        <circle cx="18" cy="20" r="14" fill="#8549fa" opacity=".12" />
        <path d="M8 32L14 8L22 24L30 8" stroke="#8549fa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="40" y="27" fontSize="16" fontWeight="700" fill="#071b50" fontFamily="system-ui,sans-serif">Nexus Labs</text>
      </svg>
    ),
  },
  {
    name: 'Growthly',
    logo: (
      <svg width="124" height="40" viewBox="0 0 124 40" fill="none" aria-label="Growthly">
        <circle cx="18" cy="20" r="14" fill="#14b98a" />
        <path d="M10 26 L15 18 L20 23 L27 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <text x="40" y="27" fontSize="16" fontWeight="700" fill="#071b50" fontFamily="system-ui,sans-serif">Growthly</text>
      </svg>
    ),
  },
  {
    name: 'PulseAI',
    logo: (
      <svg width="112" height="40" viewBox="0 0 112 40" fill="none" aria-label="PulseAI">
        <rect x="2" y="4" width="32" height="32" rx="6" fill="#071b50" />
        <path d="M8 20 L12 20 L16 12 L20 28 L23 20 L27 20" stroke="#00b7e9" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <text x="42" y="27" fontSize="16" fontWeight="700" fill="#071b50" fontFamily="system-ui,sans-serif">PulseAI</text>
      </svg>
    ),
  },
  {
    name: 'CloudBridge',
    logo: (
      <svg width="152" height="40" viewBox="0 0 152 40" fill="none" aria-label="CloudBridge">
        <path d="M4 30 Q4 16 15 16 Q17 7 28 10 Q32 3 40 12 Q48 12 46 23 Q46 30 40 30 Z" fill="#deeeff" stroke="#0965ff" strokeWidth="1.8" />
        <text x="54" y="27" fontSize="16" fontWeight="700" fill="#071b50" fontFamily="system-ui,sans-serif">CloudBridge</text>
      </svg>
    ),
  },
  {
    name: 'FinCraft',
    logo: (
      <svg width="114" height="40" viewBox="0 0 114 40" fill="none" aria-label="FinCraft">
        <rect x="2" y="4" width="32" height="32" rx="6" fill="#ff7435" />
        <text x="10" y="28" fontSize="19" fontWeight="800" fill="#fff" fontFamily="system-ui,sans-serif">$</text>
        <text x="42" y="27" fontSize="16" fontWeight="700" fill="#071b50" fontFamily="system-ui,sans-serif">FinCraft</text>
      </svg>
    ),
  },
];

function ClientLogoBanner() {
  const doubled = [...clientBrands, ...clientBrands];
  return (
    <div className="client-banner-wrap" aria-label="Trusted by businesses worldwide">
      <div className="client-banner-label" style={{ fontSize: "27px" }}>
        Trusted by <span>200+</span> Businesses Worldwide
      </div>
      <div className="client-marquee-track" aria-hidden="true">
        <div className="client-marquee-inner">
          {doubled.map((brand, i) => (
            <div key={i} className="client-marquee-item">
              {brand.logo}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Trust() {
  const stats = [['clientsServed', 'Clients served'], ['yearsExperience', 'Years of experience'], ['projectsDelivered', 'Projects delivered'], ['clientSatisfaction', 'Client satisfaction']];
  const ready = stats.some(([key]) => proof[key] != null);
  return (
    <div className="trust-wrapper" aria-label="Client relationships">
      <div className="container trust-area">
        {ready && <div className="proof-stats">{stats.filter(([key]) => proof[key] != null).map(([key, label]) => <div key={key}><strong>{proof[key]}</strong><span>{label}</span></div>)}</div>}
        <div className="trust-heading"><h2>Built on trust. Designed for <span>long-term partnerships.</span></h2><p>Clear commitments. Visible progress. Support beyond launch.</p></div>
        <div className="trust-principles"><span><FileCheck2 size={18} /> A clear plan from day one</span><span><Users size={18} /> Direct collaboration</span><span><ShieldCheck size={18} /> Ownership at handover</span></div>
      </div>
      <ClientLogoBanner />
    </div>
  );
}

export function Services({ all = false }) {
  const list = all ? services : ['software', 'mobile', 'web', 'ai'].map(slug => services.find(s => s.slug === slug));
  return (
    <section className="section container redesign-services" id="services">
      <div className="section-heading">
        <div>
          <h2>{all ? 'The right build for your next business move.' : <>Our <span>core services.</span></>}</h2>
          <p>{all ? 'Find the expertise to turn a business challenge into useful software.' : 'The right digital solution for your next business challenge.'}</p>
        </div>
        {!all && <a className="subtle-link" href="/services">Explore all services</a>}
      </div>
      <div className={'redesign-service-grid ' + (all ? 'all-services' : '')}>
        {list.map(s => (
          <article
            key={s.slug}
            className={'redesign-service-card service-' + s.slug}
            onClick={(e) => {
              if (!e.target.closest('a')) {
                window.location.href = s.path;
              }
            }}
          >
            <div className="card-top-glow" />
            <span className="color-icon"><ServiceIcon service={s} /></span>
            <h3><a href={s.path}>{s.title}</a></h3>
            <p>{s.description}</p>
            <div className="service-benefits">
              {s.subs.slice(0, 2).map(x => (
                <span key={x.slug}>
                  <span className="check-badge"><Check size={13} /></span>
                  {x.title}
                </span>
              ))}
            </div>
            <div className="service-actions">
              <a href={s.path} className="action-learn">Learn more</a>
              <a href={s.path + '#playground'} className="action-demo"><Play size={13} />View demo</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Results() {
  const steps = [['Define the goal', 'Understand your bottleneck and agree what success looks like.'], ['Deliver in milestones', 'Build, test and refine with regular demos and clear decisions.'], ['Measure what changes', 'Review adoption and impact against the goals we agreed.']];
  return <section className="container raas-section"><span className="eyebrow">RAAS · RESULTS AS A SERVICE</span><h2>Start with the result. <span>Build what gets you there.</span></h2><div className="raas-steps">{steps.map(([title, description], i) => <article key={title}><span>{i + 1}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div></section>;
}

export function DemoHighlights() {
  const demos = [['store', 'Ecommerce storefront', 'Browse products, build a bag and try a sample checkout.', '/services/ecommerce/shopify-development'], ['booking', 'Clinic appointment system', 'Choose a date and time, then view a sample booking pass.', '/services/mobile/progressive-web-apps'], ['game', 'Neon Snake', 'Play a responsive browser game with pause and restart.', '/services/games/2d-games']];
  return <section className="section container home-demo-section"><div className="section-heading"><div><h2>See the product. <span>Experience the possibilities.</span></h2><p>Try a complete journey before you decide what to build.</p></div><a className="subtle-link" href="/demo-studio">Explore Demo Studio</a></div><div className="home-demo-grid">{demos.map(([kind, title, description, href]) => <article key={kind}><div className="home-demo-image"><Demo kind={kind} compact focus={title} /></div><div className="home-demo-text"><span className="concept-label">CONCEPT DEMO</span><h3>{title}</h3><p>{description}</p><a className="button secondary" href={href + '#playground'}>Try demo</a></div></article>)}</div></section>;
}

export function IndustryCards() {
  const ordered = ['ecommerce', 'healthcare', 'education', 'finance', 'logistics', 'manufacturing', 'real-estate'].map(slug => industries.find(i => i.slug === slug));
  return <section className="section container industry-cards-section" id="industries"><div className="section-heading"><div><h2>Built around <span>your industry.</span></h2><p>Different businesses. Different workflows. Software that fits yours.</p></div></div><div className="industry-photo-grid">{ordered.map(i => <a href={'/industries/' + i.slug} key={i.slug}><div><img src={i.image} alt={i.name + ' industry'} loading="lazy" /></div><span><b>{i.name}</b><small>{industryCaptions[i.slug]}</small></span></a>)}</div></section>;
}

export function Why() {
  const reasons = [[Target, 'Built around your workflow', 'Solutions shaped to your process and priorities.'], [Users, 'One accountable team', 'Strategy, design, development and launch support move together.'], [Monitor, 'Progress you can see', 'Regular demos, clear milestones and direct conversations.'], [ShieldCheck, 'Ownership after launch', 'Your source code, project files and agreed handover.']];
  return <section className="why-band"><div className="container"><div className="why-band-heading"><div><span className="eyebrow">WHY CUBUSIFY</span><h2>Your business. <span>Our commitment.</span></h2><p>We treat your business as our own.</p></div><a className="button" href="/about">About Cubusify</a></div><div className="why-band-grid">{reasons.map(([Icon, title, text]) => <article key={title}><Icon size={30} /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>;
}

export function Showcases() {
  const items = [['tracking', 'Logistics shipment tracking', 'A clear view of every shipment, from dispatch to delivery.', '/industries/logistics'], ['learning', 'Online learning platform', 'Course content, focused lessons and visible learning progress.', '/industries/education']];
  return <section className="section container redesign-showcases"><div className="section-heading"><div><h2>Explore what <span>we can build.</span></h2><p>Two more product concepts to spark ideas for your next project.</p></div></div><div className="concept-showcase-grid">{items.map(([kind, title, description, href]) => <article key={kind}><div className="showcase-interface"><Demo kind={kind} compact focus={title} /></div><div><span className="concept-label">CONCEPT SHOWCASE</span><h3>{title}</h3><p>{description}</p><a className="button secondary" href={href + '#industry-playground'}>Try demo</a></div></article>)}</div></section>;
}

export function Reviews() {
  if (!proof.testimonials.length) return null;
  return <section className="section container reviews-section"><h2>Client stories. <span>Real confidence.</span></h2><div className="review-grid">{proof.testimonials.map((review, i) => <figure key={i}><Quote size={24} /><blockquote>{review.quote}</blockquote><figcaption><b>{review.name}</b><span>{review.company}{review.project ? ' · ' + review.project : ''}</span></figcaption></figure>)}</div></section>;
}

export function Contact({ standalone = false }) {
  const [draft, setDraft] = useState(false);
  const [fileName, setFileName] = useState('');

  const fileInputRef = useRef(null);

  const handleFileChange = e => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const submit = e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = `Hello Cubusify,\n\nName: ${data.get('name')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email')}\nCountry: ${data.get('country')}\nBudget: ${data.get('budget')}\nAttachment: ${fileName || 'None'}\n\nProject Details:\n${data.get('project')}\n\nPlease contact me to discuss the next step.`;
    window.location.href = 'mailto:' + contactEmail + '?subject=' + encodeURIComponent('Project enquiry from ' + data.get('name')) + '&body=' + encodeURIComponent(body);
    setDraft(true);
  };

  const currentTestimonial = {
    quote: "I founded Cubusify with a simple commitment: to treat your business as our own. We listen to your goals, take ownership of the work, and build dependable digital solutions that support your growth through lasting partnerships.",
    name: "Vijay Sakhwala",
    role: "Founder, Cubusify",
    avatar: "/images/vijay-founder-photo.jpg"
  };

  const Title = standalone ? 'h1' : 'h2';

  return (
    <section className={'section container redesign-contact-wrapper ' + (standalone ? 'contact-standalone' : '')} id="contact">
      <div className="new-contact-card">
        {/* Left Side: Form */}
        <div className="contact-form-side">
          <div className={standalone ? "form-header contact-envelope-header" : "form-header"}>
            {standalone && <img className="contact-envelope-art" src="/images/contact-envelope.png" alt="" width="1536" height="1024"/>}
            <Title className="form-title">
              Start Your Project With <span className="brand-gradient">Cubusify</span>
            </Title>
            <div className="title-bar" />
            <p className="form-subtitle">
              Share your idea and our experts will get back to you within 24 hours.
            </p>
          </div>

          <form onSubmit={submit} className="project-enquiry-form">
            <div className="form-input-grid">
              <div className="input-field-wrap">
                <User size={18} className="field-icon" />
                <input name="name" required autoComplete="name" placeholder="Full Name*" maxLength={100} />
              </div>
              <div className="input-field-wrap">
                <Phone size={18} className="field-icon" />
                <input name="phone" required autoComplete="tel" placeholder="Phone Number*" maxLength={30} />
              </div>
              <div className="input-field-wrap">
                <Mail size={18} className="field-icon" />
                <input name="email" type="email" required autoComplete="email" placeholder="Email Address*" />
              </div>
              <div className="input-field-wrap select-wrap">
                <Globe size={18} className="field-icon" />
                <select name="country" defaultValue="Country*">
                  <option disabled value="Country*">Country*</option>
                  <option value="United States">United States</option>
                  <option value="India">India</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown size={16} className="select-arrow" />
              </div>
              <div className="input-field-wrap select-wrap">
                <DollarSign size={18} className="field-icon" />
                <select name="budget" defaultValue="Your Budget">
                  <option disabled value="Your Budget">Your Budget</option>
                  <option value="Under $1,000">Under $1,000</option>
                  <option value="$1,000–$5,000">$1,000–$5,000</option>
                  <option value="$5,000–$15,000">$5,000–$15,000</option>
                  <option value="$15,000+">$15,000+</option>
                </select>
                <ChevronDown size={16} className="select-arrow" />
              </div>
              <div className="input-field-wrap">
                <Pencil size={18} className="field-icon" />
                <input name="project" required placeholder="Tell us about your project..." maxLength={4000} />
              </div>
            </div>

            {/* Upload Document Button */}
            <div className="upload-btn-wrap" onClick={() => fileInputRef.current?.click()}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <Paperclip size={18} className="upload-icon" />
              <span>{fileName ? `Attached: ${fileName}` : 'Upload Document (Optional)'}</span>
            </div>

            {/* Form Footer Row */}
            <div className="form-bottom-row">
              <label className="privacy-consent">
                <input type="checkbox" required />
                <span>I agree to the <a href="/privacy">Privacy Policy</a></span>
              </label>

              <button type="submit" className="submit-orange-btn">
                <span>Send Message</span>
                <Send size={16} />
              </button>
            </div>

            {draft && (
              <p className="success-note" role="status">
                Your draft is ready in your email app. Send it there, or email {contactEmail} directly.
              </p>
            )}
          </form>
        </div>

        {/* Right Side: Stats & Testimonial */}
        <div className="contact-info-side">
          <div className="info-header">
            <span className="trusted-eyebrow">Trusted By 200+ Businesses Worldwide</span>
            <h2 className="building-title">
              Building Relationships. Delivering <span className="results-highlight">Results.</span>
            </h2>
          </div>

          {/* Stats Bar */}
          <div className="stats-badges-grid">
            <div className="stat-badge-item">
              <div className="stat-icon-box">
                <Users size={20} />
              </div>
              <strong className="stat-number">200+</strong>
              <span className="stat-label">Happy Clients</span>
            </div>

            <div className="stat-badge-item">
              <div className="stat-icon-box">
                <Award size={20} />
              </div>
              <strong className="stat-number">11+</strong>
              <span className="stat-label">industry</span>
            </div>

            <div className="stat-badge-item">
              <div className="stat-icon-box">
                <UserCheck size={20} />
              </div>
              <strong className="stat-number">70+</strong>
              <span className="stat-label">Expert Engineers</span>
            </div>

            <div className="stat-badge-item">
              <div className="stat-icon-box">
                <Heart size={20} />
              </div>
              <strong className="stat-number">98%</strong>
              <span className="stat-label">Client Retention</span>
            </div>
          </div>

          {/* Testimonial Box */}
          <div className="testimonial-card-box">
            <div className="quote-mark-icon">
              <Quote size={28} />
            </div>
            <p className="testimonial-quote-text">
              "{currentTestimonial.quote}"
            </p>

            <div className="testimonial-footer-row">
              <div className="author-info">
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name}
                  className="author-avatar-img"
                />
                <div className="author-text-details">
                  <h4 className="author-name">{currentTestimonial.name}</h4>
                  <span className="author-role">{currentTestimonial.role}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return <footer className="redesign-footer"><div className="container"><div className="redesign-footer-grid"><div><Brand /><p>Software your business runs on.</p><a href={'mailto:' + contactEmail}>{contactEmail}</a><small>Surat, India · Working worldwide</small></div><div><b>Services</b>{services.slice(0, 6).map(s => <a key={s.slug} href={s.path}>{s.title}</a>)}</div><div><b>AI &amp; operations</b>{services.slice(6, 9).map(s => <a key={s.slug} href={s.path}>{s.title}</a>)}<a href="/demo-studio">Demo Studio</a><a href="/industries">Industries</a></div><div><b>Company</b>{company.map(([title, path]) => <a key={path} href={path}>{title}</a>)}<a href="/work">Our Work</a></div></div><div className="redesign-footer-bottom"><span>© {new Date().getUTCFullYear()} Cubusify. All rights reserved.</span><div><a href="/privacy">Privacy policy</a><a href="/terms">Terms of service</a></div></div></div></footer>;
}

export function LoadingStoryboard() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    try { if (sessionStorage.getItem('cubusify-intro')) return; sessionStorage.setItem('cubusify-intro', 'shown'); } catch { return; }
    setShow(true); const timer = setTimeout(() => setShow(false), 1100); return () => clearTimeout(timer);
  }, []);
  return <AnimatePresence>{show && <motion.div className="loading-storyboard" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .2 }}><div className="loading-brand"><Brand /><div className="developer-icons" aria-hidden="true"><Monitor /><Code2 /><Monitor /></div><div className="intro-progress" role="progressbar" aria-label="Opening Cubusify"><i /></div></div><button onClick={() => setShow(false)}>Skip intro</button></motion.div>}</AnimatePresence>;
}
