import './contact-envelope.css';
import BeamHero from './BeamHero';
import React, { useEffect, useRef, useState } from 'react';

import {
  ArrowUpRight, FileText, HeartPulse, Factory, GraduationCap, Landmark, Menu, X, ChevronDown, Code2, Monitor, Smartphone, Sparkles, Layers,
  PenTool, ShoppingBag, ShieldCheck, Cloud, Blocks, Megaphone, Gamepad2,
  FileCheck2, BarChart3, Headphones, Target, Users, Check, Play, Mail,
  MapPin, Quote, Package, Truck, CircleCheck, Building2,
  User, Phone, Globe, DollarSign, Pencil, Paperclip, Send, Award, UserCheck, Heart,
} from 'lucide-react';
import { services, industries } from './catalog';
import SiteSearch from './SiteSearch';
import ThemeToggle from './ThemeToggle';
import EnquiryForm from './EnquiryForm';
import EnquiryIntro from './EnquiryIntro';

import { proof, contactEmail, industryCaptions } from './content';

const icons = { Code2, Monitor, Smartphone, Sparkles, Layers, PenTool, ShoppingBag, ShieldCheck, Cloud, Blocks, Megaphone, Gamepad2 };
export function ServiceIcon({ service, size = 24 }) {
  const Icon = icons[service.icon] || Code2;
  return <Icon size={size} aria-hidden="true" />;
}
export function Brand() {
  return <a className="brand" href="/" aria-label="Cubusify home"><img style={{objectFit:"contain"}} src="/images/company-logo.png" alt="" width="32" height="32" /><span>Cubusify</span></a>;
}

const company = [['About Us', '/about'], ['Our Team', '/team'], ['Blog', '/blog'], ['Contact Us', '/contact']];
const companyMenu = company;
const serviceGroups = [
  ['Build', ['software', 'web', 'mobile', 'product']],
  ['Experience & growth', ['design', 'ecommerce', 'marketing', 'games']],
  ['Operate & improve', ['ai', 'qa', 'cloud', 'blockchain']],
];

function CompanyMenuIcon({label}){const Icon=({'About Us':Building2,'Our Team':Users,'Blog':FileText,'Contact Us':Mail})[label]||Users;return <Icon size={21}/>}
function IndustryMenuIcon({slug}){const Icon=({healthcare:HeartPulse,ecommerce:ShoppingBag,manufacturing:Factory,logistics:Truck,education:GraduationCap,finance:Landmark,'real-estate':Building2})[slug]||Building2;return <Icon size={23}/>}
function MenuContent({ name }) {
  if (name === 'Company') return <div className="company-dropdown"><div><span className="eyebrow">YOUR BUSINESS. OUR COMMITMENT.</span><h3>One partner.<br />Shared ambition.</h3><p>Get to know the team that takes ownership.</p></div><div>{companyMenu.map(([label, href]) => <a key={href} href={href}><span className="company-menu-icon"><CompanyMenuIcon label={label}/></span><span><b>{label}</b><small>{({'About Us':'Our purpose and approach','Our Team':'Expertise for your next project','Blog':'Useful ideas and practical guides','Contact Us':'Start a direct conversation'})[label]}</small></span></a>)}</div></div>;
  if (name === 'Industries') return <div className="industry-dropdown">{industries.map(i => <a key={i.slug} href={'/industries/' + i.slug}><span className="industry-menu-icon"><IndustryMenuIcon slug={i.slug}/></span><span><b>{i.name}</b><small>{industryCaptions[i.slug]}</small></span></a>)}</div>;
  if (name === 'AI') return <div className="ai-dropdown"><div><span className="eyebrow">PRACTICAL AI</span><h3>Give your team<br />time for what matters.</h3><a className="button" href="/services/ai">Explore AI &amp; automation</a></div><div>{services.find(s => s.slug === 'ai').subs.map(s => <a href={s.path} key={s.slug}><Sparkles size={21} /><span><b>{s.title}</b><small>{s.description}</small></span></a>)}</div></div>;
  return <div className="service-dropdown"><div className="service-dropdown-groups">{serviceGroups.map(([title, slugs]) => <div key={title}><h3>{title}</h3>{slugs.map(slug => { const s = services.find(s => s.slug === slug); return <a key={slug} href={s.path}><ServiceIcon service={s} size={21} /><span><b>{s.title}</b><small>{s.subs.slice(0, 2).map(x => x.title).join(' · ')}</small></span></a>; })}</div>)}</div><div className="dropdown-bottom"><a href="/services">Explore all services</a><a href="/services/seo-aeo-geo">SEO / AEO / GEO</a><a href="/work">Explore our work</a></div></div>;
}

export function Header() {
 const[open,setOpen]=useState(null),[mobile,setMobile]=useState(false);const root=useRef(null),last=useRef(null),leave=useRef(null);
 const close=()=>{setOpen(null);setMobile(false)};
 useEffect(()=>{const escape=e=>{if(e.key==='Escape'&&!e.target.closest('dialog')){close();last.current?.focus()}},outside=e=>{if(!root.current?.contains(e.target))close()};document.addEventListener('keydown',escape);document.addEventListener('pointerdown',outside);return()=>{document.removeEventListener('keydown',escape);document.removeEventListener('pointerdown',outside);clearTimeout(leave.current)}},[]);
 useEffect(()=>{const query=matchMedia('(min-width: 1181px)'),change=()=>close();query.addEventListener('change',change);if(mobile)document.body.classList.add('navigation-open');return()=>{query.removeEventListener('change',change);document.body.classList.remove('navigation-open')}},[mobile]);
 const cancel=()=>clearTimeout(leave.current);const schedule=()=>{cancel();leave.current=setTimeout(()=>setOpen(null),220)};
 function toggle(name,e){last.current=e.currentTarget;setOpen(v=>v===name?null:name)}
 function button(name){return <button key={name} className={open===name?'active':''} aria-expanded={open===name} aria-controls="desktop-dropdown" onMouseEnter={()=>{cancel();setOpen(name)}} onClick={e=>toggle(name,e)} onKeyDown={e=>{if(e.key==='ArrowDown'){e.preventDefault();last.current=e.currentTarget;setOpen(name);requestAnimationFrame(()=>root.current?.querySelector('#desktop-dropdown a')?.focus())}}}>{name==='AI'?'AI Solutions':name}<ChevronDown size={13}/></button>}
 return <header ref={root} className="site-header redesign-header" onMouseEnter={cancel} onMouseLeave={schedule} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget)&&!e.relatedTarget?.closest('dialog'))setOpen(null)}}><div className="header-inner"><Brand/><nav className="desktop-nav" aria-label="Main navigation">{['AI','Services','Industries','Company'].map(button)}<a href="/team" onMouseEnter={()=>setOpen(null)}>Hire Team</a><a href="/work" onMouseEnter={()=>setOpen(null)}>Our Work</a></nav><div className="header-tools"><SiteSearch/><ThemeToggle/><a className="button desktop-quote" href="/contact">Discuss your project</a><button className="mobile-toggle" type="button" aria-label={mobile?'Close navigation':'Open navigation'} aria-expanded={mobile} aria-controls="mobile-navigation" onClick={()=>{setMobile(v=>!v);setOpen(null)}}>{mobile?<X/>:<Menu/>}</button></div></div>{open&&!mobile&&<div id="desktop-dropdown" className="redesign-dropdown" onMouseEnter={cancel} onClick={e=>{if(e.target.closest('a'))close()}}><MenuContent name={open}/></div>}{mobile&&<nav className="mobile-navigation" id="mobile-navigation" aria-label="Mobile navigation" onClick={e=>{if(e.target.closest('a'))close()}}>{['AI','Services','Industries','Company'].map(name=><div className="mobile-nav-group" key={name}><button type="button" aria-expanded={open===name} aria-controls={'mobile-'+name} onClick={e=>toggle(name,e)}>{name==='AI'?'AI Solutions':name}<ChevronDown size={18}/></button>{open===name&&<div id={'mobile-'+name} className="mobile-submenu"><MenuContent name={name}/></div>}</div>)}<a href="/team">Hire Team</a><a href="/work">Our Work</a><a className="button" href="/contact">Discuss your project</a></nav>}</header>
}

export function Hero() { return <BeamHero />; }

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
              <a href={s.path + '#screens'} className="action-demo"><Play size={13} />View screens</a>
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

export function Reviews() {
  if (!proof.testimonials.length) return null;
  return <section className="section container reviews-section"><h2>Client stories. <span>Real confidence.</span></h2><div className="review-grid">{proof.testimonials.map((review, i) => <figure key={i}><Quote size={24} /><blockquote>{review.quote}</blockquote><figcaption><b>{review.name}</b><span>{review.company}{review.project ? ' · ' + review.project : ''}</span></figcaption></figure>)}</div></section>;
}

export function Contact(){return <section className="section container home-enquiry enquiry-layout" id="contact" aria-label="Start your project"><EnquiryIntro/><EnquiryForm/></section>}

export function Footer(){return <footer className="redesign-footer footer-refined footer-compact footer-approved"><div className="container"><div className="footer-approved-top"><h2>Let’s build what’s next<span>.</span></h2><a className="footer-approved-cta" href="/contact">Start a conversation <ArrowUpRight size={19}/></a></div><div className="compact-footer-main"><div className="compact-footer-brand"><Brand/><p>We build the AI &amp; software<br/>your business runs on.</p><a className="footer-email" href={'mailto:'+contactEmail}><Mail size={17}/>{contactEmail}</a><small><MapPin size={16}/>Surat, India · Working worldwide</small></div><nav aria-label="Footer services"><b>Services</b><a href="/services/ai">AI &amp; automation</a><a href="/services/software">Custom software</a><a href="/services/web">Web development</a><a href="/services/mobile">Mobile apps</a><a className="footer-all" href="/services">All services <ArrowUpRight size={13}/></a></nav><nav aria-label="Footer company"><b>Explore</b><a href="/work">Our work</a><a href="/industries">Industries</a><a href="/about">About us</a><a href="/blog">Insights</a></nav><div className="footer-approved-connect"><b>Connect</b><a href="/contact">Contact</a><a href="https://linkedin.com/company/cubusify" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={14}/></a><p>Your business. Our commitment.</p></div></div><div className="compact-footer-bottom"><span>© {new Date().getUTCFullYear()} Cubusify</span><div><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="#main" aria-label="Back to top"></a></div></div></div></footer>}

