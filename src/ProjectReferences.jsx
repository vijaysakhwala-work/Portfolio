import React from 'react';
import {ArrowUpRight} from 'lucide-react';
import {Image} from './Showcase';
import {workContent} from './work-content';

// Links indicate related project workflows, not an unconfirmed implementation stack.
const references={
 software:['orbit','ledger','stockroom'],'custom-crm':['intake'],'business-dashboards':['ledger','stockroom'],
 web:['forma','roam','orbit'],'business-websites':['forma'],'web-applications':['roam','orbit'],
 mobile:['basil','pulse','haven'],'ios-android-apps':['basil','haven'],'flutter-react-native':['pulse'],
 product:['orbit','intake'],design:['forma','dew'],'user-experience':['dew','haven'],'interface-design':['orbit','ledger'],'brand-visual-design':['forma','dew'],
 ecommerce:['dew','stockroom'],'custom-ecommerce':['dew'],'shopify-development':['dew'],'woocommerce-development':['dew'],
 ai:['nexa','relay','intake'],'ai-assistants':['nexa'],'business-automation':['relay','intake'],'sales-marketing-automation':['intake'],'voice-customer-support':['nexa'],'integration-solutions':['relay','stockroom'],
 'conversion-optimisation':['dew','forma'],healthcare:['haven'],finance:['ledger'],
 'choosing-your-ecommerce-platform':['dew','stockroom'],'where-ai-automation-saves-time':['nexa','intake'],'planning-your-first-software-mvp':['haven','orbit']
};
export default function ProjectReferences({topic,className='ai-width service-gallery-section'}){
 const slugs=references[topic];if(!slugs)return null;
 return <section className={className} aria-label="Related project case studies">
  <span className="eyebrow">PROJECT CASE STUDIES</span><h2>See the workflow in our project work</h2>
  <p>Explore the screens and decisions behind related user journeys. Each case study explains its project context; the service choice for your own project follows your requirements.</p>
  <div className="article-grid">{slugs.slice(0,3).map(slug=>{const p=workContent[slug];return <a className="blog-card" href={'/work/'+slug} key={slug}>
   <Image id={slug+'-desktop'} sizes="(max-width: 700px) calc(100vw - 40px), 390px"/>
   <div><h3>{p.title.replace(' Case Study','')}</h3><p>{p.features.join(' · ')}.</p><span className="subtle-link">Read the project case study <ArrowUpRight size={16}/></span></div>
  </a>})}</div>
 </section>;
}
