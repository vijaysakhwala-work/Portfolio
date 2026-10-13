import CrispPreview from './CrispPreview';
import {clearCrop} from './clear-images';
import React, {useState} from 'react';
import {ArrowRight, Users, Compass, Heart, Search, Smartphone, Send, Layout, Lightbulb} from 'lucide-react';
import './work-page.css';
import './work-detail.css';

import {workProjects} from './work-projects';
export {workProjects} from './work-projects';
function Art({image,panel=0,alt}){const crop=[(panel%2)*512,Math.floor(panel/2)*384,512,384];const urls=clearCrop(image,crop);return <div className="wp-art"><img src={urls?.[1]||urls?.[0]||image} srcSet={urls?.map((url,n)=>url+" "+(512*(n+1))+"w").join(", ")} sizes="(max-width: 800px) calc(100vw - 36px), (max-width: 1304px) calc((100vw - 88px) / 2), 608px" width={512} height={384} alt={alt} loading="lazy" style={urls?{width:"100%",height:"100%",left:0,top:0}:{left:`${-(panel%2)*100}%`,top:`${-Math.floor(panel/2)*100}%`}}/></div>}

function Arrow(){return <span className="wp-arrow"><ArrowRight size={22}/></span>}
function CTA({detail=false}){return <section className="wp-cta"><div><h2>{detail?'Have a vision of your own?':'Let’s create what’s next.'}</h2><p>{detail?'Let’s shape a digital experience around it.':'Bring your idea. We’ll help you find a clear way forward.'}</p></div><a className="wp-button" href="/contact">Discuss your project <ArrowRight size={18}/></a></section>}
export default function WorkPage(){const [filter,setFilter]=useState('All work');return <div className="wp-page wp-width"><section className="wp-intro"><span className="wp-eyebrow">SELECTED WORK / CUBUSIFY</span><h1>Different ideas.<br/>One thoughtful approach.</h1><p>Explore concepts shaped around people, purpose, and possibilities.</p><div className="wp-filters" aria-label="Filter projects">{['All work','Websites','Apps','Software','Automation'].map(f=><button key={f} aria-pressed={f===filter} onClick={()=>setFilter(f)}>{f}</button>)}</div></section><section className="wp-grid" aria-label="Selected projects">{workProjects.filter(p=>filter==='All work'||p.category===filter).map(p=><a className="wp-card" href={'/work/'+p.slug} key={p.slug}><Art image={p.image} panel={p.panel} alt={p.name+' design concept preview'}/><div className="wp-card-copy"><span className="wp-eyebrow">{p.label}</span><div className="wp-card-title"><h2>{p.title}</h2><Arrow/></div><div className="wp-tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div></div></a>)}</section><p className="wp-note">Design concepts for illustration. Not client case studies.</p><section className="wp-process"><h2>Thoughtful from the first detail.</h2><div>{[[Users,'Understand the goal','We start by listening, so we can focus on what really matters.'],[Compass,'Shape the experience','We turn ideas into clear, intuitive designs that put people first.'],[Heart,'Build with care','We refine every detail to create polished, meaningful experiences.']].map(([I,t,c])=><article key={t}><I/><div><h3>{t}</h3><p>{c}</p></div></article>)}</div></section><CTA/></div>}
function ConceptPhone({project:p,variant=0}){return <div className="wd-phone"><span className="wd-island"/><div className="wd-phone-brand">{p.name}<span>☰</span></div>{variant===0?<><Art image={p.image} panel={p.panel} alt={p.name+' visual preview'}/><div className="wd-phone-copy"><small>{p.focus}</small><h3>{p.title}</h3>{p.tags.map(t=><div className="wd-phone-item" key={t}>{t}<ArrowRight size={12}/></div>)}<span className="wd-phone-action">Explore details</span></div></>:<div className="wd-phone-copy"><small>{p.name} / {p.focus}</small><h3>Your next step,<br/>made clearer.</h3><p>{p.idea}</p>{['Overview','Details','Next steps'].map((t,i)=><div className="wd-phone-item" key={t}><span>{String(i+1).padStart(2,'0')} {t}</span><ArrowRight size={12}/></div>)}<span className="wd-phone-action">Continue</span></div>}<span className="wd-home-indicator"/></div>}
function DetailArt({project:p,section,alt}){
 if(p.category!=='Websites')return <CrispPreview title={p.name+' '+p.title} kind={p.category}/>;
 const crop=p.detailArtwork?.crops[section];
 if(!crop){
  if(section==='gallery')return <div className="wd-existing-gallery"><Art image={p.image} panel={p.detailPanel} alt={p.name+' desktop concept preview'}/><ConceptPhone project={p}/><ConceptPhone project={p} variant={1}/></div>;
  if(section==='closeLeft'||section==='closeRight')return <div className={'wd-existing-close '+(section==='closeRight'?'wd-close-right':'')}><Art image={p.image} panel={p.panel} alt={alt}/></div>;
  return <Art image={p.image} panel={p.panel} alt={alt}/>;
 }
 const [x,y,w,h]=crop;const urls=clearCrop(p.detailArtwork.image,crop);const sizes=section==='hero'?'(max-width: 1240px) 100vw, 1240px':section==='gallery'?'(max-width: 800px) calc(100vw - 36px), (max-width: 1304px) calc(100vw - 64px), 1240px':'(max-width: 600px) calc(100vw - 36px), (max-width: 800px) calc((100vw - 50px) / 2), (max-width: 1304px) calc((100vw - 78px) / 2), 613px';return <div className="wd-reference" style={{aspectRatio:`${w}/${h}`}}><img src={urls?.[1]||urls?.[0]||p.detailArtwork.image} srcSet={urls?.map((url,n)=>url+" "+(w*(n+1))+"w").join(", ")} sizes={sizes} width={w} height={h} alt={alt} loading={section==='hero'?'eager':'lazy'} style={clearCrop(p.detailArtwork.image,[x,y,w,h])?{width:"100%",height:"100%",left:0,top:0}:{width:`${1024/w*100}%`,height:`${1536/h*100}%`,left:`${-x/w*100}%`,top:`${-y/h*100}%`}}/></div>;
}
export function WorkDetail({project:p}){
 const next=workProjects[(workProjects.findIndex(x=>x.slug===p.slug)+1)%workProjects.length];
 const forma=p.slug==='forma';
 const steps=p.detailContent?.steps || (forma?[
 ['Let the spaces lead','Immersive photography sets the tone and brings the studio’s work to life.'],
 ['Keep discovery simple','A clear, intuitive structure helps visitors explore projects with ease.'],
 ['Make enquiries easy','A streamlined enquiry flow encourages the next conversation.']
 ]:[['Start with the purpose',p.idea],['Shape a clearer journey',p.approach],['Focus on the right details',p.challenge]]);
 return <div className="wp-page wd-page">
  <section className="wd-hero" id="overview">
   <nav className="wp-width wp-breadcrumb" aria-label="Breadcrumb"><a href="/work">Our Work</a><span>/</span><span>{p.name}</span></nav>
   <div className="wd-title wp-width"><span className="wp-eyebrow">{forma?'Website design concept':p.label}</span><h1>{forma?'Spaces deserve a story.':p.title}</h1><p>{p.detailContent?.intro || (forma?'An image-led digital experience for an interior design studio.':p.intro)}</p><span className="wp-concept">Illustrative concept</span></div>
   <div className={'wd-hero-preview '+(forma?'wd-forma':'')}>
    <DetailArt project={p} section="hero" alt={p.name+' main concept on desktop and mobile'}/>
   </div>
  </section>
  <div className="wp-width">
   <dl className="wd-meta">{[['Industry',p.industry],['Focus',p.focus],['Experience',p.platform],['Status','Design concept']].map(([k,v])=><div key={k}><dt>{k}:</dt><dd>{v}</dd></div>)}</dl>
   <section className="wd-overview" id="design-direction">
    <nav className="wd-contents" aria-label="In this concept"><span>IN THIS CONCEPT</span><a href="#overview">Overview</a><a href="#design-direction">Design direction</a><a href="#screen-gallery">Screen gallery</a></nav>
    <div><h2>{p.detailContent?.heading || (forma?'A quieter space. A clearer journey.':'A clear purpose. A thoughtful experience.')}</h2><p>{p.detailContent?.overview || (forma?'The concept brings the studio’s work forward through expressive photography, considered typography, and simple paths to explore projects.':p.idea)}</p>
     <div className="wd-steps">{steps.map(([title,copy],i)=><article key={title}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
    </div>
   </section>
   <section className="wd-gallery" id="screen-gallery"><h2>The experience, in detail.</h2>
    <DetailArt project={p} section="gallery" alt={p.name+' main interface and two mobile screen previews'}/><div className="wd-gallery-row"><DetailArt project={p} section="closeLeft" alt={p.name+' typography and navigation detail'}/><DetailArt project={p} section="closeRight" alt={p.name+' feature detail'}/></div>
   </section>
   <section className="wd-contact"><div><h2>Bring your vision into focus.</h2><p>Let’s create an experience that feels right for your business.</p></div><a className="wp-button" href="/contact">Discuss your project <ArrowRight size={18}/></a></section>
   <div className="wd-bottom"><a href="/work"><ArrowRight size={15}/> Back to all work</a><p>Design concept for illustration. Not a client case study.</p><a href={'/work/'+next.slug}>Next concept <ArrowRight size={15}/></a></div>
  </div>
 </div>;
}
