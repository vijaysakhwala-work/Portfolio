import React from 'react';
import {canon} from './links';
import {ArrowRight} from 'lucide-react';
import {relatedFor,industriesFor,serviceIndex,growth} from './related-links.js';
import './related-links.css';

export function RelatedServices({path,className='ai-width',heading='Services that connect to this project'}){
 const links=relatedFor(path),industries=industriesFor(path);
 if(!links.length)return null;
 return <section className={className+' related-links'} aria-labelledby="related-links-title">
  <span className="eyebrow">RELATED SERVICES</span><h2 id="related-links-title">{heading}</h2>
  <ul>{links.map(x=><li key={x.path}><a href={canon(x.path)}><span><b>{x.title}</b><small>{x.description}</small></span><ArrowRight size={17} aria-hidden="true"/></a></li>)}</ul>
  {industries.length>0&&<p className="related-industries">Appears in industry workflows: {industries.map((x,n)=><React.Fragment key={x.path}>{n>0&&' · '}<a href={canon(x.path)}>{x.title}</a></React.Fragment>)}</p>}
 </section>;
}

export function ServiceIndex(){
 return <section className="ai-width related-links service-index" aria-labelledby="service-index-title">
  <span className="eyebrow">ALL SERVICE PAGES</span><h2 id="service-index-title">Browse every service</h2>
  <div className="service-index-grid">{serviceIndex.map(s=><div key={s.path}><h3><a href={canon(s.path)}>{s.title}</a></h3><ul>{s.subs.map(x=><li key={x.path}><a href={canon(x.path)}>{x.title}</a></li>)}</ul></div>)}
   <div><h3><a href={canon(growth.path)}>SEO, AEO &amp; GEO strategy</a></h3><ul><li><a href="/blog/seo-aeo-geo-where-to-start/">A practical website improvement plan</a></li></ul></div></div>
 </section>;
}
