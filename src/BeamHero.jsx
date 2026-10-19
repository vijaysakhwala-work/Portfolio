import React, {useEffect, useState} from 'react';
import {Code2, BrainCircuit, MonitorSmartphone, Palette, Cloud, Headset, KeyRound} from 'lucide-react';

const categories = [
  ['Custom software', Code2, '/services/software'],
  ['AI & automation', BrainCircuit, '/services/ai'],
  ['Websites & apps', MonitorSmartphone, '/services/web'],
  ['Product & graphic design', Palette, '/services/design'],
  ['Cloud & integrations', Cloud, '/services/cloud'],
  ['Maintenance & support', Headset, '/contact'],
];
const words = ['Development', 'AI & automation', 'Design', 'Cloud integration'];
const leftX = [195, 170, 165, 170, 185, 205];

function TechnologyPanel({bottom = false}) {
  return <g transform={`translate(790 ${bottom ? 366 : 164})`} className={`beam-tech-panel ${bottom ? 'beam-keyboard-panel' : 'beam-cloud-panel'}`} aria-hidden="true">
    <path d="M7 0H213Q220 0 220 7V73Q220 80 213 80H143Q136 80 136 73Q136 69 129 69H91Q84 69 84 73Q84 80 77 80H7Q0 80 0 73V7Q0 0 7 0Z"/>
    {bottom ? <>{Array.from({length:21},(_,i)=><circle key={i} cx={28+(i%7)*16} cy={24+Math.floor(i/7)*14} r="3.5" className="beam-tech-dot beam-keyboard-key" style={{'--key-delay':`${i*.16}s`}}/>)}<path className="beam-tech-track" d="M159 23H199"/><circle className="beam-keyboard-cursor" cx="177" cy="23" r="2.5" fill="#0965ff"/><circle className="beam-panel-status" cx="197" cy="59" r="5" fill="#0965ff"/></> : <><Cloud className="beam-cloud-icon" x="15" y="13" width="31" height="23" strokeWidth="1.3"/>{Array.from({length:6},(_,i)=><circle className="beam-connection-dot" style={{'--dot-delay':`${i*.3}s`}} key={i} cx={145+i*11} cy="20" r="3" fill={i===5?'#00b7e9':'#b7d9ff'}/>)}<path className="beam-tech-track" d="M19 47H151"/><path className="beam-tech-progress" d="M19 47H96"/><KeyRound className="beam-access-key" x="174" y="37" width="29" height="29" strokeWidth="2.5"/></>}
  </g>;
}

export default function BeamHero() {
  const [reduced, setReduced] = useState(true);
  const [foreground,setForeground]=useState(true);
  useEffect(()=>{const update=()=>setForeground(!document.hidden);document.addEventListener('visibilitychange',update);update();return()=>document.removeEventListener('visibilitychange',update)},[]);
  const [active, setActive] = useState(1);
  const [typing, setTyping] = useState({index:0,text:words[0],deleting:false});
  useEffect(()=>{
    const media=window.matchMedia('(prefers-reduced-motion: reduce)');
    const update=()=>setReduced(media.matches);update();media.addEventListener('change',update);
    return ()=>media.removeEventListener('change',update);
  },[]);
  useEffect(()=>{
    if(reduced||!foreground)return;
    const timer=window.setInterval(()=>setActive(value=>(value+1)%categories.length),3000);
    return ()=>window.clearInterval(timer);
  },[reduced,foreground]);
  useEffect(()=>{
    if(reduced||!foreground)return;
    const delay=!typing.deleting&&typing.text===words[typing.index]?2600:typing.deleting?45:90;
    const timer=window.setTimeout(()=>setTyping(value=>{
      if(!value.deleting&&value.text===words[value.index])return {...value,deleting:true};
      if(value.deleting&&!value.text)return {index:(value.index+1)%words.length,text:'',deleting:false};
      return {...value,text:value.deleting?value.text.slice(0,-1):words[value.index].slice(0,value.text.length+1)};
    }),delay);
    return ()=>window.clearTimeout(timer);
  },[typing,reduced,foreground]);
  return <section className={`beam-hero${reduced?' beam-static':''}`} aria-labelledby="beam-hero-heading">
    <div className="beam-hero-visual">
      <svg className="beam-hero-diagram" viewBox="0 0 1800 600" role="group" aria-label="Cubusify connects six services through one team">
        <defs><linearGradient id="cubusify-beam-gradient" x1="0" x2="1"><stop stopColor="#00b7e9"/><stop offset=".6" stopColor="#0965ff"/><stop offset="1" stopColor="#00b7e9"/></linearGradient><filter id="cubusify-beam-shadow" x="-40%" y="-60%" width="180%" height="220%"><feDropShadow dx="0" dy="6" stdDeviation="9" floodColor="#00b7e9" floodOpacity=".12"/></filter></defs>
        {categories.map((item,i)=>{
          const y=70+i*90;const left=`M${leftX[i]+43} ${y} C${leftX[i]+290} ${y} 575 ${277+i*8} 845 ${277+i*8}`;
          const right=`M1420 ${y} C1240 ${y} 1230 ${277+i*8} 955 ${277+i*8}`;
          return <g className={active===i?'beam-route beam-route-active':'beam-route'} key={item[0]}><path className="beam-line" d={left}/><path className="beam-line" d={right}/>{active===i&&!reduced&&<><path className="beam-active-line" d={left}/><path className="beam-active-line" d={right}/><path className="beam-traveler" pathLength="1" d={left}/><path className="beam-traveler beam-traveler-out" pathLength="1" d={right}/></>}</g>;
        })}
        <TechnologyPanel/><TechnologyPanel bottom/>
        <image href="/images/company-logo.png" x="850" y="250" width="100" height="100" aria-hidden="true"/>
        {categories.map(([label,Icon,href],i)=>{const y=70+i*90;return <g key={label}>
          <g className="beam-icon-node" transform={`translate(${leftX[i]} ${y})`} aria-hidden="true"><circle r="43"/><Icon x="-21" y="-21" width="42" height="42" strokeWidth="1.8"/></g>
          <a href={href} className="beam-service-link" aria-label={`Explore ${label}`}><rect className="beam-service-pill" x="1420" y={y-25} width="350" height="50" rx="25"/><Icon x="1443" y={y-16} width="32" height="32" strokeWidth="1.8"/><text x="1488" y={y+7}>{label}</text></a>
        </g>;})}
      </svg>
      <svg className="beam-phone-diagram" viewBox="0 0 400 310" role="group" aria-label="Cubusify connects six services through one team">
        {categories.map(([label,Icon,href],i)=>{
          const y=35+i*48;
          const paths=[`M48 ${y} C100 ${y} 112 ${145+i*2} 181 ${145+i*2}`,`M352 ${y} C300 ${y} 288 ${145+i*2} 219 ${145+i*2}`];
          return <g key={label} className={active===i?'beam-route beam-route-active':'beam-route'}>
            {paths.map((d,n)=><g key={n}><path className="beam-line" d={d}/>{active===i&&!reduced&&<><path className="beam-active-line" d={d}/><path className="beam-traveler" pathLength="1" d={d}/></>}</g>)}
            {[27,373].map(x=><a key={x} href={href} aria-label={`Explore ${label}`} className="beam-phone-node"><circle cx={x} cy={y} r="22"/><Icon x={x-11} y={y-11} width="22" height="22" strokeWidth="1.8"/></a>)}
          </g>;
        })}
        <g transform="translate(-275 -11) scale(.53)"><TechnologyPanel/></g>
        <g transform="translate(-275 1) scale(.53)"><TechnologyPanel bottom/></g>
        <image href="/images/company-logo.png" x="180" y="132" width="40" height="40" aria-hidden="true"/>
      </svg>
      <div className="beam-mobile-services">{categories.map(([label,Icon,href])=><a href={href} key={label}><Icon size={22} aria-hidden="true"/>{label}</a>)}</div>
    </div>
    <div className="beam-hero-copy"><p>We Deliver Creative Ideas</p><h1 id="beam-hero-heading">One Stop Solution for <span className="beam-typewriter" aria-hidden="true">{reduced?words[0]:typing.text}<i/></span><span className="beam-sr-only">Development, AI and automation, design, and cloud integration.</span></h1></div>
  </section>;
}
