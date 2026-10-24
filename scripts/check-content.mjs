import fs from 'node:fs';
import {JSDOM} from 'jsdom';
import {routes,routeInfo,metadata} from '../src/catalog.js';
import {enterpriseArchitectures} from '../src/enterprise-architectures.js';
import {workProjects} from '../src/work-projects.js';
import {serviceAcceptance} from '../src/service-acceptance.js';

const output=fs.existsSync('dist/client/index.html')?'dist/client':'dist';
const failures=[],specialists=[];
function phrases(text){
 const words=text.toLowerCase().replace(/[^a-z0-9 ]/g,' ').split(/\s+/).filter(Boolean);
 return new Set(words.slice(0,-4).map((_,n)=>words.slice(n,n+5).join(' ')));
}
for(const route of routes){
 const dom=new JSDOM(fs.readFileSync(output+(route==='/'?'':route)+'/index.html','utf8'));
 const doc=dom.window.document,info=routeInfo(route),main=doc.querySelector('main');
 if(doc.title!==metadata(route).title)failures.push(route+': built title differs from current metadata');
 if(info.type==='subservice'){
  const acceptance=main.querySelector('[data-service-acceptance]');
  if(serviceAcceptance[info.sub.slug]?.length!==4||acceptance?.querySelectorAll('li').length!==4)failures.push(route+': scope-specific acceptance checks missing');
  if([...main.querySelectorAll('a[href]')].some(a=>a.getAttribute('href')===route))failures.push(route+': service content links to itself');
  if(main.querySelector('.experience-process'))failures.push(route+': generic duplicate process remains');
  main.querySelectorAll('svg,script,style').forEach(x=>x.remove());
  specialists.push({route,service:info.service.slug,phrases:phrases(main.textContent)});
 }
 if(route.startsWith('/work/')&&(!main.textContent.includes('PROJECT CASE STUDY')||!main.querySelector('[data-project-status="owner-confirmed"]')))failures.push(route+': owner-confirmed project status missing');
 const named=info.type==='work-detail'?workProjects.find(p=>p.slug===info.slug)?.namedClient:false;
 if(named){
  const url=workProjects.find(p=>p.slug===info.slug).url;
  if(main.querySelector('[data-architecture-status="reference"]'))failures.push(route+': a named client project must not carry an illustrative architecture');
  if(![...main.querySelectorAll('a[href]')].some(a=>a.getAttribute('href')===url))failures.push(route+': live website link missing');
 }
 else if(info.type==='work-detail'){
  const design=enterpriseArchitectures[info.slug],section=main.querySelector('[data-architecture-status="reference"]');
  if(!design||design.stack.length!==5||design.challenges.length!==3||design.flow.length!==5||design.validation.length!==4)failures.push(route+': incomplete enterprise reference architecture');
  if(!section?.textContent.includes('illustrative architecture choices')||section.querySelectorAll('.wd-detail-notes article').length!==5)failures.push(route+': reference architecture or disclosure missing');
  const graph=JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent)['@graph'];
  const project=graph.find(x=>x.genre==='Project case study'),reference=graph.find(x=>x.genre==='Reference architecture');
  if(!reference?.description.startsWith('Illustrative enterprise scenario')||project?.hasPart?.['@id']!==reference?.['@id'])failures.push(route+': proposed design is not distinguished in structured data');
 }
 if(route.startsWith('/work/')&&/not establish a delivered client|INTERFACE STUDY|hypothetical project/.test(main.textContent))failures.push(route+': obsolete illustrative status');
 if(/avg\. organic traffic lift|visibility projects delivered/.test(main.textContent))failures.push(route+': unsupported search result claim');
 dom.window.close();
}
let pairs=0,maximum=0;
for(const a of specialists)for(const b of specialists){
 if(a.service!==b.service||a.route>=b.route)continue;
 pairs++;const intersection=[...a.phrases].filter(x=>b.phrases.has(x)).length;
 const similarity=intersection/(a.phrases.size+b.phrases.size-intersection);maximum=Math.max(maximum,similarity);
 // This catches the original bug: child pages inherited almost all parent copy.
 // It is a regression threshold, not a search-engine quality or penalty score.
 if(similarity>.5)failures.push(a.route+' and '+b.route+': mostly repeated specialist content');
}
if(failures.length)throw Error(failures.join('\n'));
console.log(JSON.stringify({pages:routes.length,specialistPages:specialists.length,siblingPairs:pairs,maximumFiveWordJaccard:Math.round(maximum*1000)/1000,selfLinkedServiceCards:0,duplicateGenericSubserviceProcessSections:0,ownerConfirmedProjectCaseStudies:true,enterpriseReferenceArchitectures:Object.keys(enterpriseArchitectures).length,scopeSpecificAcceptanceSections:specialists.length,unsupportedSearchClaims:false},null,2));
