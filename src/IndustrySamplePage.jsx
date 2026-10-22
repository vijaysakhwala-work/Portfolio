import {canon} from './links';
import ProjectReferences from './ProjectReferences';
import {Visual,Gallery} from './Showcase';
import React from 'react';
import {ArrowRight,Users,Settings,MessageCircle,Calendar,FileText,ChartNoAxesColumnIncreasing} from 'lucide-react';
import {industryContent} from './industry-content';
import './industry-sample.css';
function Picture({slug,part}){return <Visual id={`${slug}-${part==='hero'?'overview-tile':'workflow-workspace'}`} eager={part==='hero'}/>;}
export default function IndustrySamplePage({industry:i}){
 const d=industryContent[i.slug];
 return <div className="is-page">
  <section className="is-hero is-width"><div><h1>{d.title}</h1><p>{d.intro}</p><a className="is-button" href="/contact/">Discuss your project <ArrowRight size={18}/></a></div><Picture slug={i.slug} part="hero"/></section>
  <section className="is-benefits is-width">{d.benefits.map(([title,copy],n)=>{const Icon=[Users,Settings,MessageCircle][n];return <article key={title}><span className="is-icon"><Icon/></span><div><h3>{title}</h3><p>{copy}</p></div></article>})}</section>
  <section className="is-solutions is-width"><div><h2>{i.name} software workflows</h2><p>{d.overview}</p></div><div className="is-cards">{d.cards.map(([title,copy,href],n)=>{const Icon=[Calendar,Users,FileText,ChartNoAxesColumnIncreasing][n];return <a href={canon(href)} key={title}><span className="is-icon"><Icon/></span><div><h3>{title}</h3><p>{copy}</p></div><ArrowRight size={16}/></a>})}</div></section>
  <section className="is-journey"><div className="is-width"><div><h2>Plan a focused {i.name.toLowerCase()} project</h2><ol>{d.steps.map(([title,copy],n)=><li key={title}><span>{n+1}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol></div><div><Picture slug={i.slug} part="preview"/></div></div></section>
  <section className="is-width industry-screens"><Gallery ids={[i.slug+'-overview-tile',i.slug+'-workflow-workspace']} title={i.name+' workflows'}/></section>

  <section className="is-faq is-width"><h2>{i.name} software</h2><div>{d.faq.map(([question,answer],n)=><details key={question} open={n===0}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
<ProjectReferences topic={i.slug} className="is-width industry-screens"/>
<section className="is-cta is-width"><div><h2>Discuss your <span>{i.name.toLowerCase()} workflow.</span></h2><p>Bring the current process, connected systems and the decision you want to improve. We can assess a practical first phase.</p></div><a className="is-button" href="/contact/">Start a conversation <ArrowRight size={18}/></a></section>
 </div>;
}
