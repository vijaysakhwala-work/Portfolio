import {canon} from './links';
import ServiceAcceptance from './ServiceAcceptance';
import ProjectReferences from './ProjectReferences';
import CollaborationProcess from './CollaborationProcess';
import {Visual,serviceId,ServiceGallery} from './Showcase';
import React from 'react';
import {ArrowRight,Settings,Users,ChartNoAxesColumnIncreasing,Code,ShieldCheck} from 'lucide-react';
import {serviceContent} from './service-content';
import {subserviceContent} from './subservice-content';
import './ai-sample.css';
import './service-sample.css';

const icons=[Users,ChartNoAxesColumnIncreasing,Code,Settings,ShieldCheck];
function Picture({slug,part}){return <Visual id={serviceId(slug,part==='hero'?'hero':'overview')} eager={part==='hero'}/>;}
export default function ServiceSamplePage({service:s,sub}){
 const d=sub?subserviceContent[sub.slug]:serviceContent[s.slug];
 const words=d.title.split(' '),split=Math.ceil(words.length/2);
 const cards=sub?d.scope.map(([title,description],n)=>({title,description,path:'#delivery-'+(n+1)})):s.subs;
 return <div className={'ai-page service-sample service-sample-'+s.slug}>
  <section className="ai-hero ai-width"><div>


   <h1>{words.slice(0,split).join(' ')}{' '}<br/><span>{words.slice(split).join(' ')}</span></h1>
   <p>{d.intro}</p><a className="ai-button" href="/contact/">Discuss your project <ArrowRight size={18}/></a>
  </div><Picture slug={s.slug} part="hero"/></section>
  {!sub&&<section className="ai-benefits ai-width">{d.benefits.map(([title,copy],n)=>{const Icon=[Settings,ChartNoAxesColumnIncreasing,Users][n];return <article key={title}><span className="ai-icon"><Icon/></span><div><h3>{title}</h3><p>{copy}</p></div></article>})}</section>}
  <section className="ai-solutions ai-width"><div><h2>{sub?sub.title+' scope':s.title+' options'}</h2><p>{d.overview}</p></div><div className={'ss-cards ss-count-'+cards.length}>{cards.map((card,n)=>{const Icon=icons[n];return <a href={canon(card.path)} key={card.path}><span className="ai-icon"><Icon/></span><h3>{card.title}</h3><p>{card.description}</p><ArrowRight size={19}/></a>})}</div></section>
  <section className="ai-journey"><div className="ai-width"><div><h2>{sub?'Planning '+sub.title.toLowerCase():'From requirements to release'}</h2><ol>{d.steps.map(([title,copy],n)=><li key={title} id={'delivery-'+(n+1)}><span>{n+1}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol></div><div><Picture slug={s.slug} part="preview"/></div></div></section>
  <ServiceGallery slug={s.slug} sub={sub?.slug}/>{!sub&&<CollaborationProcess/>}

  <section className="ai-faq ai-width"><div><span className="ai-eyebrow">FAQ</span><h2>{sub?sub.title:s.title}</h2><p>Scope, tradeoffs and preparation for your project.</p></div><div>{d.faq.map(([question,answer],n)=><details key={question} open={n===0}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>

  {sub&&<ServiceAcceptance slug={sub.slug}/>}
<ProjectReferences topic={sub?.slug||s.slug}/>
<section className="ai-cta ai-width"><div><h2>Discuss your <span>{sub?sub.title.toLowerCase():s.title.toLowerCase()} project.</span></h2><p>Share your requirements so we can agree a focused scope, dependencies and the next useful step.</p></div><a className="ai-button" href="/contact/">Start a conversation <ArrowRight size={18}/></a></section>
 </div>;
}
