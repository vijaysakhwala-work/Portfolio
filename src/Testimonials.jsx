import React from 'react';
import {Star,Quote} from 'lucide-react';
import {proof} from './content';
import './testimonials.css';
const role=r=>r.title+(r.company?', '+r.company:'')+(r.location?' · '+r.location:'');
function Stars({n}){return <span className="tm-stars" role="img" aria-label={n+' out of 5 stars'}>{Array.from({length:5},(_,i)=><Star key={i} size={15} aria-hidden="true" className={i<n?'on':''}/>)}</span>}
function Card({r}){return <figure className="tm-card">
  <Quote className="tm-quote" size={34} aria-hidden="true"/>
  <figcaption className="tm-person">
   <div><b>{r.name}</b><span>{role(r)}</span></div>
  </figcaption>
  <blockquote><p>“{r.quote}”</p></blockquote>
  <Stars n={r.rating}/>
 </figure>}
export default function Testimonials(){
 const list=proof.testimonials;
 if(!list.length)return null;
 return <section className="section container testimonials-section" aria-labelledby="tm-title">
  <div className="tm-head">
   <span className="eyebrow">CLIENT PERSPECTIVES</span>
   <h2 id="tm-title">Trusted by teams who<br/><span>value real partnership.</span></h2>
   <p>Founders and operators share what it is like to build with Cubusify, in their own words.</p>
  </div>
  <div className={'tm-marquee'} role="region" aria-label="Client reviews" tabIndex={0}>
   <div className="tm-track">
    {[0,1].map(copy=><ul className="tm-set" key={copy} aria-hidden={copy===1?'true':undefined}>{list.map((r,i)=><li key={r.name}><Card r={r}/></li>)}</ul>)}
   </div>
  </div>
 </section>
}
