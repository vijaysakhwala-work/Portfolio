import React,{useState} from 'react';
import {ArrowRight,Search} from 'lucide-react';
import {articles} from './catalog';
import {Image} from './Showcase';
import {articleImages,reviewedDate} from './editorial-meta';
import './blog-page.css';

const categoryLabels={'AI & AUTOMATION':'AI & automation',ECOMMERCE:'Ecommerce','PRODUCT ENGINEERING':'Product engineering','SEARCH & GROWTH':'Search & growth'};
const categories=[...new Set(articles.map(article=>article.category))].sort((a,b)=>Object.keys(categoryLabels).indexOf(a)-Object.keys(categoryLabels).indexOf(b));
const dateLabel=new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(reviewedDate+'T00:00:00Z'));
function ArticleMeta(){return <p className="insights-meta">Cubusify Editorial <span aria-hidden="true">·</span> <time dateTime={reviewedDate}>{dateLabel}</time></p>}
function GuideCard({article,featured=false}){
 return <a className={featured?'insights-feature':'insights-card'} href={'/blog/'+article.slug}>
  <div className="insights-image"><Image id={articleImages[article.slug]} eager={featured} sizes={featured?'(max-width: 760px) calc(100vw - 68px), 620px':'(max-width: 600px) calc(100vw - 68px), (max-width: 1000px) calc((100vw - 100px) / 2), 390px'}/></div>
  <div className="insights-copy"><span className="insights-category">{featured&&<>FEATURED GUIDE <span aria-hidden="true">·</span> </>}{article.category}</span><h2>{article.title}</h2><p className="insights-description">{article.desc}</p><ArticleMeta/><span className="insights-read">Read the guide <ArrowRight size={17} aria-hidden="true"/></span></div>
 </a>;
}
export default function BlogPage(){
 const [query,setQuery]=useState(''),[category,setCategory]=useState('All');
 const search=query.trim().toLowerCase();
 const filtering=Boolean(search)||category!=='All';
 const results=articles.filter(article=>(category==='All'||article.category===category)&&(article.title+' '+article.desc+' '+article.category).toLowerCase().includes(search));
 const featured=articles.find(article=>article.slug==='seo-aeo-geo-where-to-start')||articles[0];
 const cards=filtering?results:results.filter(article=>article!==featured);
 function reset(){setQuery('');setCategory('All')}
 return <div className="insights-page container">
  <section className="insights-intro" aria-labelledby="insights-title"><div><span className="insights-eyebrow">CUBUSIFY INSIGHTS</span><h1 id="insights-title" className="hero-title-gradient">Software &amp; AI. <br/>Planning guides.</h1></div><p>Clear thinking for your next digital move. Explore practical guides on software, AI, ecommerce and growth.</p></section>
  {!filtering&&featured&&<section aria-label="Featured guide"><GuideCard article={featured} featured/></section>}
  <section className="insights-library" aria-labelledby="insights-library-title">
   <div className="insights-toolbar"><h2 id="insights-library-title">{filtering?'Matching guides':'Explore the guides'}</h2><label className="insights-search"><Search size={19} aria-hidden="true"/><span className="sr-only">Search insights</span><input type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search insights…" aria-label="Search insights" aria-controls="insights-results"/></label></div>
   <div className="insights-topics" role="group" aria-label="Filter insights">{['All',...categories].map(value=><button type="button" key={value} aria-pressed={category===value} aria-controls="insights-results" onClick={()=>setCategory(value)}>{value==='All'?'All insights':categoryLabels[value]||value}</button>)}</div>
   <p className="insights-count" role="status" aria-live="polite">{results.length} {results.length===1?'guide':'guides'}{filtering?' found':' to explore'}</p>
   <div id="insights-results" className="insights-grid">{cards.map(article=><GuideCard article={article} key={article.slug}/>)}</div>
   {!results.length&&<div className="insights-empty"><h3>No matching guides.</h3><p>Try a broader search or explore all topics.</p><button className="button secondary" type="button" onClick={reset}>Show all insights</button></div>}
  </section>
 </div>;
}
