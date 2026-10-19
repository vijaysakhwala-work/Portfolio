import CollaborationProcess from './CollaborationProcess';
import {Visual,ServiceGallery} from './Showcase';
import React from 'react';
import {ArrowRight,MessageCircle,Users,ShieldCheck,Settings,FileText,ChartNoAxesColumnIncreasing,Link,Search,Bell,Cloud,Phone,Mail,Send,Target,BookOpen} from 'lucide-react';
import {aiSamples} from './ai-samples';
import './ai-sample.css';
const cardIcons={ 'ai-assistants':[BookOpen,Search,Users,ShieldCheck], 'business-automation':[Settings,Send,FileText,Bell], 'sales-marketing-automation':[Target,Settings,Send,MessageCircle], 'integration-solutions':[Link,FileText,Users,Cloud], 'voice-customer-support':[Phone,Mail,FileText,Users] };
function Picture({data,part}){return <Visual id={`${data.assetSlug}-${part==='hero'?'desktop':'mobile'}-1`} eager={part==='hero'}/>;}
export default function AISamplePage({sub}){const d={...aiSamples[sub.slug],assetSlug:sub.slug};const icons=cardIcons[sub.slug];return <div className={'ai-page ai-page-'+sub.slug}>
<section className="ai-hero ai-width"><div><nav aria-label="Breadcrumb"><a href="/services/ai">AI &amp; Automation</a><span>/</span>{sub.title}</nav><span className="ai-eyebrow">{sub.title.toUpperCase()} / CUBUSIFY</span><h1>{d.title[0]}<br/><span>{d.title[1]}</span></h1><p>{d.intro}</p><a className="ai-button" href="/contact">Discuss your project <ArrowRight size={18}/></a></div><Picture data={d} part="hero" alt={sub.title+' team and illustrative workflow'}/></section>
<section className="ai-benefits ai-width">{d.benefits.map(([t,c],n)=>{const I=[MessageCircle,Users,ShieldCheck][n];return <article key={t}><span className="ai-icon"><I/></span><div><h3>{t}</h3><p>{c}</p></div></article>})}</section>
<section className="ai-solutions ai-width"><div><h2>Built around your<br/><span>real workflow.</span></h2><p>{d.overview}</p></div><div className="ai-cards">{d.cards.map(([t,c],n)=>{const I=icons[n];return <a href="/contact" key={t}><span className="ai-icon"><I/></span><div><h3>{t}</h3><p>{c}</p></div><ArrowRight size={16}/></a>})}</div></section>
<section className="ai-journey"><div className="ai-width"><div><h2>From complexity<br/><span>to a clearer next step.</span></h2>{d.journey&&<p className="ai-journey-intro">{d.journey}</p>}<ol>{d.steps.map(([t,c],n)=><li key={t}><span>{n+1}</span><div><h3>{t}</h3><p>{c}</p></div></li>)}</ol></div><div><Picture data={d} part="preview" alt={'Illustrative '+sub.title.toLowerCase()+' desktop and mobile interface with sample data'}/></div></div></section>
<ServiceGallery slug="ai" sub={sub.slug}/><CollaborationProcess/>
<section className="ai-faq ai-width"><div><span className="ai-eyebrow">FAQ</span><h2>A little clarity<br/><span>before we begin.</span></h2><p>Straightforward answers to common questions about {sub.title.toLowerCase()}.</p></div><div>{d.faq.map(([q,a],n)=><details key={q} open={n===0}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
<section className="ai-cta ai-width"><div><h2>Let’s make your <span>next move clearer.</span></h2><p>Talk to our team about how {sub.title.toLowerCase()} can support your goals.</p></div><a className="ai-button" href="/contact">Start a conversation <ArrowRight size={18}/></a></section>
</div>}
