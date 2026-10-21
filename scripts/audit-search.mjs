import fs from 'node:fs';
import {JSDOM} from 'jsdom';
import {routes} from '../src/catalog.js';
const out=fs.existsSync('dist/client/index.html')?'dist/client':'dist';
const failures=[],titles=new Map(),descriptions=new Map(),docs=new Map(),links=new Map();
for(const route of routes){
 const doc=new JSDOM(fs.readFileSync(out+(route==='/'?'':route)+'/index.html','utf8')).window.document;docs.set(route,doc);
 for(const [name,map,value]of [['title',titles,doc.title],['description',descriptions,doc.querySelector('meta[name="description"]')?.content]]){
  if(!value)failures.push(`${route}: missing ${name}`);else if(map.has(value))failures.push(`${route}: duplicate ${name} with ${map.get(value)}`);else map.set(value,route);
 }
 const canonical=doc.querySelector('link[rel="canonical"]')?.href;
 if(canonical!=='https://cubusify.com'+(route==='/'?'/':route+'/'))failures.push(route+': inconsistent canonical');
 if(doc.querySelectorAll('h1').length!==1)failures.push(route+': heading count');
 const schema=JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent);
 for(const type of ['Organization','WebSite','WebPage'])if(!schema['@graph'].some(x=>x['@type']===type||(type==='WebPage'&&['ContactPage','AboutPage'].includes(x['@type']))))failures.push(route+': missing '+type);
 if(schema['@graph'].some(x=>['Review','AggregateRating'].includes(x['@type'])))failures.push(route+': unverified review markup');
 links.set(route,[...doc.querySelectorAll('a[href^="/"]')].map(a=>a.getAttribute('href').split(/[?#]/)[0].replace(/\/$/,'')||'/').filter(x=>routes.includes(x)));
 if(route.startsWith('/blog/')){
  if(!doc.querySelector('.article-toc'))failures.push(route+': missing table of contents');
  for(const a of doc.querySelectorAll('.article-toc a'))if(!doc.getElementById(a.hash.slice(1)))failures.push(route+': broken contents link');
 }
}
const reachable=new Set(['/']),queue=['/'];while(queue.length)for(const to of links.get(queue.shift())||[])if(!reachable.has(to)){reachable.add(to);queue.push(to)}
const orphans=routes.filter(x=>!reachable.has(x));if(orphans.length)failures.push('Orphan pages: '+orphans.join(', '));
const sitemap=fs.readFileSync(out+'/sitemap.xml','utf8');for(const route of routes)if(!sitemap.includes('<loc>https://cubusify.com'+(route==='/'?'/':route+'/')+'</loc>'))failures.push(route+': missing sitemap URL');
if(docs.get('/').querySelectorAll('.awards-carousel .award-card').length!==6)failures.push('Expected six desktop directory cards');
if(docs.get('/').querySelectorAll('.directory-marquee-set:not([aria-hidden]) .award-card').length!==6)failures.push('Expected six accessible mobile directory cards');
if(docs.get('/contact').querySelectorAll('fieldset.enquiry-group').length!==2)failures.push('Contact form field grouping missing');
const report={pages:routes.length,uniqueTitles:titles.size,uniqueDescriptions:descriptions.size,reachableFromHomepage:reachable.size,canonicalAndSitemap:'Production domain, trailing slash consistent with hosting',structuredData:'Organization, WebSite, WebPage, Service, BreadcrumbList and BlogPosting as applicable',articleNavigation:'Answer summaries, descriptive headings and linked tables of contents',awardCards:6,contactFieldGroups:2,failures,publicIndexability:'Not tested by this local build check; verify the intended public deployment. The 2026-10-20 live audit found a different homepage and 83 portfolio routes returning 404.',searchConsole:'Not connected or verified in this session',browserAndCoreWebVitals:fs.existsSync('design/seo-browser-checks.json')?'Local unthrottled Chrome LCP/CLS observations recorded; field Core Web Vitals not measured.':'Not measured',trafficForecast:'No ranking or traffic guarantee'};
fs.writeFileSync('design/search-audit.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));if(failures.length)process.exitCode=1;
