import React,{useEffect,useState} from 'react';
import {ChevronUp} from 'lucide-react';
import {Header,Footer} from './Redesign';
import {routeInfo,metadata} from './catalog';
import {workProjects} from './work-projects';
export default function App({path='/',Page}){const p=path.replace(/\/$/,'')||'/';const r=routeInfo(p);useEffect(()=>{const m=metadata(p);document.title=m.title;document.querySelector('meta[name="description"]')?.setAttribute('content',m.description)},[p]);return <><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main" tabIndex={-1}><Page {...r} type={r.type} project={workProjects.find(w=>w.slug===r.slug)}/></main><Footer/><BackToTop/></>}
function BackToTop(){const [show,setShow]=useState(false);useEffect(()=>{const fn=()=>setShow(window.scrollY>700);window.addEventListener('scroll',fn,{passive:true});return()=>window.removeEventListener('scroll',fn)},[]);return show?<button className="back-to-top" aria-label="Back to top" onClick={()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}><ChevronUp size={20}/></button>:null}
