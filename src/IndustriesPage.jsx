import React from 'react';
import {ArrowRight,HeartPulse} from 'lucide-react';
import {industries} from './catalog';
import {Image} from './Showcase';
import './industries-page.css';

const summaries={
 ecommerce:'Connect product discovery, orders and the team behind the store.',
 manufacturing:'Bring production planning, stock and reporting into focus.',
 logistics:'Coordinate dispatch, track shipments and manage exceptions.',
 education:'Make enrolment, learning and learner progress easier to follow.',
 finance:'Create clear dashboards, customer journeys and approval workflows.',
 'real-estate':'Bring property discovery, viewing requests and enquiries together.'
};
const topics=[['Healthcare','healthcare'],['Commerce','ecommerce'],['Operations','manufacturing'],['People & places','education']];
export default function IndustriesPage(){
 const featured=industries.find(industry=>industry.slug==='healthcare');
 return <div className="sectors-page container">
  <section className="sectors-intro" aria-labelledby="sectors-title"><div><span className="sectors-eyebrow">BUILT AROUND YOUR WORLD</span><h1 id="sectors-title" className="hero-title-gradient">Industry software. <br/>Built around your workflow.</h1></div><div><p>Explore practical software experiences for the people, processes and decisions in your industry.</p><a className="sectors-link" href="/contact">Discuss your requirements <ArrowRight size={17} aria-hidden="true"/></a></div></section>
  <nav className="sectors-topics" aria-label="Jump to an industry"><span>Explore industries</span><div>{topics.map(([label,slug])=><a href={'#industry-'+slug} key={slug}>{label}</a>)}</div></nav>
  <section className="sectors-feature" id="industry-healthcare" aria-labelledby="healthcare-title"><a className="sectors-feature-link" href={'/industries/'+featured.slug}><div className="sectors-feature-copy"><span className="sectors-icon"><HeartPulse size={30} aria-hidden="true"/></span><h2 id="healthcare-title">{featured.name}</h2><p>Connect appointments, patient journeys and day-to-day coordination in one clearer experience.</p><ul className="sectors-tags" aria-label="Healthcare workflows">{['Appointments','Patient portals','Document workflows'].map(tag=><li key={tag}>{tag}</li>)}</ul><span className="sectors-link">Explore healthcare <ArrowRight size={17} aria-hidden="true"/></span></div><div className="sectors-feature-image"><Image id="healthcare-overview-tile" eager sizes="(max-width: 800px) calc(100vw - 72px), 660px"/></div></a></section>
  <section className="sectors-grid" aria-label="More industries">{industries.filter(industry=>industry!==featured).map(industry=><a className="sectors-card" id={'industry-'+industry.slug} href={'/industries/'+industry.slug} key={industry.slug}><div className="sectors-card-image"><Image id={industry.slug+'-overview-tile'} sizes="(max-width: 600px) calc(100vw - 68px), (max-width: 1000px) calc((100vw - 100px) / 2), 390px"/></div><div className="sectors-card-copy"><h2>{industry.name}</h2><p>{summaries[industry.slug]||industry.copy}</p><span className="sectors-link">Explore {industry.name.toLowerCase()} <ArrowRight size={17} aria-hidden="true"/></span></div></a>)}</section>
  <section className="sectors-cta"><div><h2>A different industry. The same care.</h2><p>Tell us about your workflow. We’ll help define the right starting point.</p></div><a className="button" href="/contact">Discuss your project <ArrowRight size={18} aria-hidden="true"/></a></section>
 </div>;
}
