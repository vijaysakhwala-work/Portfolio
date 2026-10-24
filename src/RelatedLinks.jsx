import React from 'react';
import {canon} from './links';
import {ArrowRight,Search} from 'lucide-react';
import {services} from './catalog';
import {ServiceIcon} from './Redesign';
import {relatedFor,industriesFor,growth} from './related-links.js';
import './related-links.css';

export function RelatedServices({path,className='ai-width',heading='Services that connect to this project'}){
 const links=relatedFor(path),industries=industriesFor(path);
 if(!links.length)return null;
 return <section className={className+' related-links'} aria-labelledby="related-links-title">
  <span className="eyebrow">RELATED SERVICES</span><h2 id="related-links-title">{heading}</h2>
  <ul className="related-cards">{links.map(x=><li key={x.path}><a href={canon(x.path)}><span><b>{x.title}</b><small>{x.description}</small></span><ArrowRight size={17} aria-hidden="true"/></a></li>)}</ul>
  {industries.length>0&&<div className="related-industries"><span className="related-industries-label">Appears in industry workflows</span><ul>{industries.map(x=><li key={x.path}><a href={canon(x.path)}>{x.title}</a></li>)}</ul></div>}
 </section>;
}

export function ServiceIndex(){
 return <section className="ai-width related-links service-index" aria-labelledby="service-index-title">
  <span className="eyebrow">ALL SERVICE PAGES</span><h2 id="service-index-title">Browse every service</h2>
  <p className="service-index-intro">Every service and specialist page in one place. Choose a service, or go straight to the page for the work you need.</p>
  <div className="service-index-grid">
   {services.map(s=><article className="service-index-card" key={s.path}>
    <div className="service-index-head"><span className="service-index-icon"><ServiceIcon service={s} size={22}/></span><div><h3><a href={canon(s.path)}>{s.title}</a></h3><small>{s.subs.length} specialist {s.subs.length===1?'page':'pages'}</small></div></div>
    <ul>{s.subs.map(x=><li key={x.path}><a href={canon(x.path)}>{x.title}</a></li>)}</ul>
   </article>)}
   <article className="service-index-card service-index-growth">
    <div className="service-index-head"><span className="service-index-icon"><Search size={22} aria-hidden="true"/></span><div><h3><a href={canon(growth.path)}>SEO, AEO &amp; GEO strategy</a></h3><small>Search and answer visibility</small></div></div>
    <ul><li><a href={canon('/blog/seo-aeo-geo-where-to-start')}>A practical website improvement plan</a></li></ul>
   </article>
  </div>
 </section>;
}
