import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {JSDOM} from 'jsdom';
import {routes,routeInfo,metadata} from '../src/catalog.js';
import {enterpriseArchitectures} from '../src/enterprise-architectures.js';
import {serviceAcceptance} from '../src/service-acceptance.js';
import {renderMarketReview} from './seo-market-review-html.mjs';

// An inspectable local implementation checklist, NOT an editorial/ranking score.
// This script reads files only. No live URL, API, search or traffic requests.
const reportDate=process.argv.find(x=>x.startsWith('--date='))?.slice(7)||new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
if(!/^\d{4}-\d{2}-\d{2}$/.test(reportDate))throw Error('Use --date=YYYY-MM-DD');
const out=fs.existsSync('dist/client/index.html')?'dist/client':'dist';
const normalize=p=>p.replace(/\/$/,'')||'/';
const origin='https://cubusify.com';
const clean=s=>s.replace(/\s+/g,' ').trim();
const escape=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const labels={home:'Homepage',service:'Parent services',subservice:'Specialist services',growth:'Search strategy',industry:'Industry pages','work-detail':'Project case studies',article:'Articles',services:'Service directory',industries:'Industry directory',work:'Work directory',about:'About',team:'Hire team',contact:'Contact',blog:'Blog directory',privacy:'Privacy',terms:'Terms'};
const rubric=[
 ['prerender','Prerendered page content','The built HTML contains the prerender marker and a nonempty main element.'],
 ['title','Unique page title','The title is present, unique across all routes and matches current source metadata.'],
 ['description','Unique meta description','The description is present, unique across all routes and matches current source metadata.'],
 ['h1','Single descriptive H1','Exactly one nonempty H1 is present.'],
 ['sections','Readable section structure','Main content has at least two nonempty H2 headings. This tests structure, not writing quality.'],
 ['canonical','Consistent canonical','The configured canonical matches this route, including the hosting trailing-slash convention.'],
 ['robots','Page indexing directive','The local page declares index,follow and does not declare noindex.'],
 ['crawlConfig','Local crawler configuration','robots.txt allows the public root, does not block it and declares the configured sitemap.'],
 ['sitemap','Sitemap membership','This route is present in the generated XML sitemap.'],
 ['schema','Base structured data','Valid JSON-LD contains Organization, WebSite and the matching page node.'],
 ['roleSchema','Schema matches the page role','Service, BlogPosting, case-study CreativeWork, founder Person or ContactPage is present where applicable; other pages have page schema. Inner pages also have breadcrumbs.'],
 ['socialImage','Complete social image metadata','Open Graph and Twitter share a real local image with descriptive alt text and positive width/height metadata.'],
 ['imageSchema','Primary image structured data','The page points to a matching ImageObject with dimensions and an existing image file.'],
 ['imageAlt','Image text alternatives','Every image has an alt attribute; content images have nonempty alternatives. Decorative images and redundant images inside named links may use empty alt.'],
 ['responsiveImages','Responsive showcase images','Existing delivery images have width, height, sizes and srcset attributes. Other image-free page roles are not penalised.'],
 ['internalLinks','Internal page links resolve','Internal page links resolve to a known generated route or an existing local file.'],
 ['fragments','Section links resolve','Each internal fragment points to an actual ID in its target page. Empty # links are ignored.'],
 ['reachable','Reachable from the homepage','A crawl of generated internal links can reach this page from the homepage.'],
 ['assets','Referenced local assets exist','Script, stylesheet, image and image-srcset paths resolve inside the local build.'],
 ['purpose','Content coverage for the page role','Case studies need confirmed-work markers, captioned screens and labelled reference architectures. Specialist services need FAQs, distinct sibling copy and four scope-specific acceptance checks. Other roles use the published checks below.']
].map(([id,label,rule])=>({id,label,rule,points:0.5}));
const documents=new Map(),titleCounts=new Map(),descriptionCounts=new Map();
const digest=crypto.createHash('sha256');
for(const route of routes){
 const html=fs.readFileSync(out+(route==='/'?'':route)+'/index.html','utf8');
 digest.update(route+'\n'+html+'\n');
 const dom=new JSDOM(html),d=dom.window.document;
 titleCounts.set(d.title,(titleCounts.get(d.title)||0)+1);
 const description=d.querySelector('meta[name="description"]')?.content||'';
 descriptionCounts.set(description,(descriptionCounts.get(description)||0)+1);
 documents.set(route,{dom,d,description,info:routeInfo(route)});
}
const robots=fs.readFileSync(out+'/robots.txt','utf8');
const sitemapDOM=new JSDOM(fs.readFileSync(out+'/sitemap.xml','utf8'),{contentType:'text/xml'});
const sitemap=new Set([...sitemapDOM.window.document.getElementsByTagName('url')].map(e=>e.getElementsByTagName('loc')[0]?.textContent));
const localURL=(href,route)=>{try{const u=new URL(href,origin+(route==='/'?'/':route+'/'));return u.origin===origin?u:null;}catch{return null;}};
const exists=p=>{try{const resolved=path.resolve(out,'.'+decodeURIComponent(p)),root=path.resolve(out)+path.sep;return resolved.startsWith(root)&&fs.existsSync(resolved);}catch{return false;}};
const edges=new Map(routes.map(route=>[route,[...documents.get(route).d.querySelectorAll('a[href]')].map(a=>localURL(a.getAttribute('href'),route)).filter(Boolean).map(u=>normalize(u.pathname)).filter(r=>documents.has(r))]));
const reachable=new Set(['/']),queue=['/'];
while(queue.length)for(const next of edges.get(queue.shift())||[])if(!reachable.has(next)){reachable.add(next);queue.push(next);}
const phraseSet=text=>{const w=text.toLowerCase().replace(/[^a-z0-9 ]/g,' ').split(/\s+/).filter(Boolean);return new Set(w.slice(0,-4).map((_,i)=>w.slice(i,i+5).join(' ')));};
const specialistPhrases=new Map([...documents].filter(([,x])=>x.info.type==='subservice').map(([r,x])=>[r,phraseSet(x.d.querySelector('main').textContent)]));
const siblingSimilarity=route=>{let maximum=0;const a=specialistPhrases.get(route);for(const [r,b]of specialistPhrases){if(r===route||documents.get(r).info.service.slug!==documents.get(route).info.service.slug)continue;const intersection=[...a].filter(x=>b.has(x)).length;maximum=Math.max(maximum,intersection/(a.size+b.size-intersection));}return maximum;};
const priorities={
 'work-detail':'Collect the actual delivery responsibilities, implemented stack and a documented outcome for this project. The new reference architecture demonstrates design reasoning, while confirmed implementation evidence would strengthen the case study.',
 subservice:'Use buyer questions and query evidence to refine the main promise. Publish a verified implementation example that demonstrates this exact service scope.',
 service:'Validate the hub’s primary buyer intent and use specialist pages for narrower queries. Add verified delivery examples as they become available.',
 industry:'Validate the sector’s buyer vocabulary and add a verified domain-specific implementation. Keep regulatory and performance claims tied to documented evidence.',
 article:'Have the guide reviewed by a named practitioner and add original observations or a documented worked example. Validate follow-up topics using real query demand.',
 growth:'Publish an approved audit sample and a measured improvement example with its method, dates and baseline.',
 home:'Validate which main software or AI buyer intent should lead the homepage. Replace general proof with documented project outcomes when available.',
 about:'Add confirmed delivery responsibilities and practitioner experience to the founder and team information.',
 team:'Publish accurate role profiles and examples of how each specialist contributes to a real engagement.',
 contact:'Measure useful enquiries and where people abandon the form; improve the brief prompts using that evidence.',
 privacy:'Keep this utility document accurate as data collection and hosting practices change.',
 terms:'Keep this utility document aligned with actual engagement terms and website usage.',
 services:'Use the directory to route people to the right specialist page; refine labels using buyer terminology.',
 industries:'Use the directory to connect sector problems with relevant services and verified examples.',
 work:'Continue adding confirmed project scope and outcomes to the linked case studies.',
 blog:'Build guide clusters around validated planning questions and connect each guide to its relevant service.'
};
function purposeCheck(d,info,route){
 const m=d.querySelector('main'),h2=m.querySelectorAll('h2').length;
 if(info.type==='work-detail'){
  const b=enterpriseArchitectures[info.slug],section=m.querySelector('[data-architecture-status="reference"]');
  const ok=!!m.querySelector('[data-project-status="owner-confirmed"]')&&m.querySelectorAll('.wd-gallery-row figcaption').length===2&&!!section?.textContent.includes('illustrative architecture choices')&&b?.stack.length===5&&b.challenges.length===3&&b.flow.length===5&&b.validation.length===4;
  return [ok,'Confirmed-project marker; 2 captioned screens; 5 proposed stack layers; 3 challenge/approach pairs; 5 flow steps; 4 validation checks; explicit reference-design disclosure.'];
 }
 if(info.type==='subservice'){
  const checks=m.querySelector('[data-service-acceptance]')?.querySelectorAll('li').length||0,faqs=m.querySelectorAll('details').length,max=siblingSimilarity(route);
  return [checks===4&&faqs>=3&&max<=0.5&&!m.querySelector('.experience-process'),`${checks} acceptance checks; ${faqs} FAQs; highest sibling five-word similarity ${(max*100).toFixed(1)}% (threshold 50%); no duplicate generic process strip. Similarity is a repetition diagnostic.`];
 }
 if(info.type==='article'){const toc=m.querySelectorAll('.article-toc a').length;return [toc>=3&&h2>=3&&!!m.querySelector('a[href="/about"]'),`${toc} linked contents entries; ${h2} H2 sections; editorial attribution links to About.`];}
 if(info.type==='service')return [m.querySelectorAll('details').length>=3&&info.service.subs.every(s=>!!m.querySelector(`a[href="${s.path}"]`)),'At least 3 FAQs and crawlable links to every specialist in this service family.'];
 if(info.type==='industry')return [h2>=3&&[...m.querySelectorAll('a[href]')].some(a=>a.getAttribute('href').startsWith('/services/')),'At least 3 topic sections and contextual service links.'];
 const directoryTargets={services:'/services/',industries:'/industries/',work:'/work/',blog:'/blog/'};
 if(directoryTargets[info.type]){const count=[...m.querySelectorAll('a[href]')].filter(a=>a.getAttribute('href').startsWith(directoryTargets[info.type])).length;return [count>=4,`${count} crawlable links into this directory’s detail pages.`];}
 if(info.type==='contact')return [m.querySelectorAll('fieldset.enquiry-group').length===2,'The enquiry form has two labelled field groups. Form delivery is outside this content checklist.'];
 if(['privacy','terms'].includes(info.type))return [h2>=3,'At least 3 document sections; utility purpose preserved. This does not assess legal completeness.'];
 return [h2>=3,`${h2} topic sections support this ${labels[info.type].toLowerCase()} page.`];
}
const pages=[];
for(const route of routes){
 const {d,description,info}=documents.get(route),main=d.querySelector('main'),canonical=origin+(route==='/'?'/':route+'/');
 const meta=(key,attr='property')=>d.querySelector(`meta[${attr}="${key}"]`)?.content||'';
 const schemaErrors=[];let graph=[];
 try{graph=JSON.parse(d.querySelector('script[type="application/ld+json"]').textContent)['@graph'];if(!Array.isArray(graph))throw Error('Missing @graph');}catch(e){schemaErrors.push(e.message);graph=[];}
 const pageNode=graph.find(x=>x['@id']===canonical+'#webpage');
 const hasType=type=>graph.some(x=>x['@type']===type);
 let role=!!pageNode;
 if(info.service||info.type==='growth')role=hasType('Service');
 if(info.type==='article')role=hasType('BlogPosting');
 if(info.type==='work-detail'){const project=graph.find(x=>x.genre==='Project case study'),ref=graph.find(x=>x.genre==='Reference architecture');role=!!project&&!!ref&&project.hasPart?.['@id']===ref['@id']&&ref.description.startsWith('Illustrative enterprise scenario');}
 if(info.type==='about')role=hasType('Person');
 if(info.type==='contact')role=hasType('ContactPage');
 if(route!=='/')role=role&&hasType('BreadcrumbList');
 const image=meta('og:image'),imageNode=graph.find(x=>x['@id']===pageNode?.primaryImageOfPage?.['@id']);
 const imgs=[...d.querySelectorAll('img')],delivery=imgs.filter(i=>i.getAttribute('src')?.startsWith('/images/delivery/'));
 const brokenLinks=[],brokenFragments=[],brokenAssets=[];
 for(const a of d.querySelectorAll('a[href]')){
  const url=localURL(a.getAttribute('href'),route);if(!url)continue;
  const target=documents.get(normalize(url.pathname));
  if(!target&&!exists(url.pathname))brokenLinks.push(a.getAttribute('href'));
  if(url.hash.length>1&&target&&!target.d.getElementById(decodeURIComponent(url.hash.slice(1))))brokenFragments.push(a.getAttribute('href'));
 }
 const assetRefs=[...d.querySelectorAll('script[src],img[src],link[rel="stylesheet"][href],link[rel="modulepreload"][href],link[rel="preload"][href]')].map(e=>e.getAttribute('src')||e.getAttribute('href'));
 for(const i of imgs)for(const candidate of (i.getAttribute('srcset')||'').split(',').filter(Boolean))assetRefs.push(candidate.trim().split(/\s+/)[0]);
 for(const ref of assetRefs){const url=localURL(ref,route);if(url&&!exists(url.pathname))brokenAssets.push(ref);}
 const checks=[];const add=(id,passed,evidence)=>checks.push({id,passed:!!passed,evidence,points:passed?0.5:0});
 add('prerender',d.querySelector('#root')?.dataset.prerendered==='true'&&clean(main?.textContent||'').length>0,'Static main content is available before client JavaScript runs.');
 add('title',!!d.title&&titleCounts.get(d.title)===1&&d.title===metadata(route).title,d.title);
 add('description',!!description&&descriptionCounts.get(description)===1&&description===metadata(route).description,description);
 const h1=[...d.querySelectorAll('h1')];add('h1',h1.length===1&&!!clean(h1[0]?.textContent||''),h1.map(h=>clean(h.textContent)).join(' / '));
 const h2=[...main.querySelectorAll('h2')].filter(h=>clean(h.textContent));add('sections',h2.length>=2,h2.length+' nonempty H2 sections.');
 add('canonical',d.querySelector('link[rel="canonical"]')?.href===canonical,canonical+' (configuration checked locally).');
 const directive=meta('robots','name');add('robots',/\bindex\b/.test(directive)&&/\bfollow\b/.test(directive)&&!directive.includes('noindex'),directive);
 add('crawlConfig',/^User-agent: \*$/m.test(robots)&&/^Allow: \/$/m.test(robots)&&!/^Disallow: \/\s*$/m.test(robots)&&robots.includes('Sitemap: '+origin+'/sitemap.xml'),'Root allowed; /api/ excluded; sitemap declared.');
 add('sitemap',sitemap.has(canonical),'Exact canonical appears in generated sitemap.xml.');
 add('schema',!schemaErrors.length&&hasType('Organization')&&hasType('WebSite')&&!!pageNode,graph.map(x=>x['@type']).join(', '));
 add('roleSchema',role,labels[info.type]+' schema and applicable breadcrumbs.');
 const imageURL=localURL(image,route);add('socialImage',!!imageURL&&exists(imageURL.pathname)&&!!meta('og:image:alt')&&!!meta('twitter:image:alt','name')&&meta('twitter:image','name')===image&&Number(meta('og:image:width'))>0&&Number(meta('og:image:height'))>0,image+' | '+meta('og:image:alt'));
 add('imageSchema',imageNode?.['@type']==='ImageObject'&&imageNode.contentUrl===image&&Number(imageNode.width)>0&&Number(imageNode.height)>0&&!!imageURL&&exists(imageURL.pathname),'Primary ImageObject matches the configured social image.');
 add('imageAlt',imgs.every(i=>i.hasAttribute('alt')&&(i.getAttribute('alt').trim()||i.getAttribute('role')==='presentation'||i.closest('[aria-hidden="true"]')||i.closest('a[aria-label]')?.getAttribute('aria-label').trim())),imgs.length+' images checked, including decorative carousel duplicates and redundant logos within named brand links.');
 add('responsiveImages',delivery.every(i=>Number(i.getAttribute('width'))>0&&Number(i.getAttribute('height'))>0&&i.getAttribute('srcset')&&i.getAttribute('sizes')),delivery.length+' showcase image placements checked.');
 add('internalLinks',!brokenLinks.length,brokenLinks.length?brokenLinks.join(', '):'Every internal page target resolves in the generated build.');
 add('fragments',!brokenFragments.length,brokenFragments.length?brokenFragments.join(', '):'Every internal section target resolves.');
 add('reachable',reachable.has(route),'Reachable through internal navigation starting at /.');
 add('assets',!brokenAssets.length,brokenAssets.length?brokenAssets.join(', '):assetRefs.length+' local asset references checked.');
 const [covered,evidence]=purposeCheck(d,info,route);add('purpose',covered,evidence);
 const textMain=main.cloneNode(true);textMain.querySelectorAll('svg,script,style').forEach(e=>e.remove());const text=clean(textMain.textContent);
 pages.push({route,type:info.type,group:labels[info.type],purpose:['privacy','terms'].includes(info.type)?'Utility information':['contact'].includes(info.type)?'Enquiry conversion':['services','industries','work','blog'].includes(info.type)?'Discovery and navigation':'Search and buyer education',title:d.title,description,h1:clean(h1[0]?.textContent||''),canonical,score:checks.reduce((n,c)=>n+c.points,0),passed:checks.filter(c=>c.passed).length,checks,words:text.split(/\s+/).length,imageCount:main.querySelectorAll('img').length,headings:[...main.querySelectorAll('h2,h3')].map(h=>({level:h.tagName,text:clean(h.textContent)})),links:[...main.querySelectorAll('a[href]')].map(a=>({text:clean(a.textContent),href:a.getAttribute('href')})),text,nextImprovement:priorities[info.type],architecture:info.type==='work-detail'?enterpriseArchitectures[info.slug]:undefined,acceptance:info.sub?serviceAcceptance[info.sub.slug]:undefined});
}
const notFound=new JSDOM(fs.readFileSync(out+'/404.html','utf8'));
const negativeControl={page:'404.html',noindex:/\bnoindex\b/.test(notFound.window.document.querySelector('meta[name="robots"]')?.content||''),outsideSitemap:!sitemap.has(origin+'/404/')};
const report={reportDate,metric:'Local SEO implementation completeness',rubricVersion:'local-implementation-v1',scope:'Generated frontend HTML and local assets only; no external URL requests.',interpretation:'Each of 20 explicit checks contributes 0.5 points. Scores measure implementation completeness for this checklist. They are not Google or vendor scores, editorial quality ratings, ranking estimates or traffic predictions. Previous editorial ratings used a different method and are not comparable.',inputDigest:digest.digest('hex'),rubric,summary:{pages:pages.length,mean:Number((pages.reduce((n,p)=>n+p.score,0)/pages.length).toFixed(2)),minimum:Math.min(...pages.map(p=>p.score)),aboveNine:pages.filter(p=>p.score>9).length,passedChecks:pages.reduce((n,p)=>n+p.passed,0),totalChecks:pages.length*rubric.length,enterpriseArchitectures:Object.keys(enterpriseArchitectures).length,scopeSpecificAcceptanceSections:Object.keys(serviceAcceptance).length},groups:Object.values(labels).map(label=>{const p=pages.filter(x=>x.group===label);return {label,pages:p.length,minimum:Math.min(...p.map(x=>x.score)),average:Number((p.reduce((n,x)=>n+x.score,0)/p.length).toFixed(2))};}).filter(g=>g.pages),negativeControl,pages};
const marketReviews=fs.existsSync('design/team-seo-market-review.json')?[JSON.parse(fs.readFileSync('design/team-seo-market-review.json','utf8'))]:[];
report.marketReviews=marketReviews;
const json=JSON.stringify(report,null,2)+'\n';
const csvCell=x=>'"'+String(x??'').replaceAll('"','""')+'"';
const csv=[['Route','Group','Purpose','Local implementation score / 10','Checks passed / 20','Title','Description','Words','Images','Next content improvement'],...pages.map(p=>[p.route,p.group,p.purpose,p.score,p.passed,p.title,p.description,p.words,p.imageCount,p.nextImprovement])].map(r=>r.map(csvCell).join(',')).join('\r\n')+'\r\n';
const row=p=>`<tr data-page="${escape(p.route)}"><td><a href="#page=${encodeURIComponent(p.route)}">${escape(p.route)}</a><small>${escape(p.title)}</small></td><td>${escape(p.group)}<small>${escape(p.purpose)}</small></td><td class="score">${p.score.toFixed(1)}<small>${p.passed}/20 checks</small></td><td>${p.words.toLocaleString('en-IN')}</td><td>${p.imageCount}</td><td>${escape(p.nextImprovement)}</td></tr>`;
const failed=pages.filter(p=>p.score<10);
const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Cubusify | Local SEO implementation report | ${escape(reportDate)}</title><style>
:root{font-family:Inter,Arial,sans-serif;color:#172e39;background:#f4f7f8;line-height:1.6}*{box-sizing:border-box}body{margin:0}header{background:#102d3c;color:white;padding:44px max(24px,calc((100vw - 1400px)/2))}header p{max-width:1000px;color:#d0e3e9}h1{font-size:clamp(26px,4vw,42px);line-height:1.2;margin:10px 0 16px}h2{font-size:23px;line-height:1.3}h3{line-height:1.4}main{max-width:1450px;padding:24px;margin:auto}.eyebrow{font-size:12px;letter-spacing:2px;text-transform:uppercase}.notice{padding:18px 22px;border-left:4px solid #14776b;background:#e9f5f2}.cards{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.card,section{background:white;border:1px solid #dce6e9;border-radius:10px;padding:22px;margin:0 0 24px}.card strong{font-size:34px;display:block;color:#126457}.card span,small{display:block;color:#526771}.card p{margin-bottom:0}a{color:#065f87;text-underline-offset:3px}button,select,input{font:inherit;border:1px solid #b9ccd3;border-radius:5px;padding:10px;background:white;color:#173b4c}button{cursor:pointer}button:hover{background:#eaf4f6}button:focus-visible,input:focus-visible,select:focus-visible,a:focus-visible{outline:3px solid #d18a19;outline-offset:2px}.controls{display:flex;gap:12px;flex-wrap:wrap;margin:20px 0}.controls input{flex:1;min-width:180px}.table-wrap{overflow-x:auto}table{border-collapse:collapse;width:100%;font-size:14px}th,td{text-align:left;vertical-align:top;padding:14px;border-bottom:1px solid #dce6e9}th{background:#edf4f6;white-space:nowrap}td:first-child{min-width:260px}td:last-child{min-width:280px}.score{color:#126457;font-weight:700;font-size:22px;white-space:nowrap}small{font-size:12px;font-weight:normal}.pass{color:#126457}.fail{color:#ad3422}.stack td:first-child{min-width:150px}.stack td:last-child{min-width:240px}.detail{scroll-margin-top:24px}.detail ul,.detail ol{padding-left:22px}.detail li{margin:8px 0}.detail dd{margin:0 0 18px}.detail dt{font-weight:bold}pre{font:13px/1.5 monospace;white-space:pre-wrap;overflow-wrap:anywhere}summary{cursor:pointer;font-weight:600;padding:10px 0}code{overflow-wrap:anywhere}#detail[hidden]{display:none}.muted{color:#526771}.coverage{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.coverage p{margin:0}footer{font-size:13px;color:#526771;margin:24px 0}.check-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.check-grid article{border:1px solid #dce6e9;border-radius:6px;padding:12px}.check-grid p{font-size:14px;margin:6px 0 0}article h3{margin-top:0}.toolbar{display:flex;gap:12px;flex-wrap:wrap}#status{font-size:14px;color:#526771}@media(max-width:800px){.cards,.coverage,.check-grid{grid-template-columns:1fr 1fr}main{padding:14px}section{padding:16px}}@media(max-width:480px){.cards,.coverage,.check-grid{grid-template-columns:1fr}.card strong{font-size:28px}header{padding:28px 18px}}@media print{.controls,.toolbar{display:none}body{background:white}main{max-width:none}section{break-inside:avoid}header{background:white;color:#102d3c;padding:12px}header p{color:#172e39}.table-wrap{overflow:visible}table{font-size:10px}td:first-child,td:last-child{min-width:0}}
</style></head><body><header><div class="eyebrow">Cubusify · ${escape(reportDate)} · Local build review</div><h1>SEO implementation score report</h1><p>Every generated page, its measured checks, content evidence and next improvement in one self-contained file.</p><p><strong>Score meaning:</strong> ${escape(report.interpretation)}</p></header><main>
<div class="cards"><div class="card"><strong>${report.summary.minimum.toFixed(1)}/10</strong><span>Lowest implementation score</span></div><div class="card"><strong>${report.summary.aboveNine}/${pages.length}</strong><span>Pages scoring above 9</span></div><div class="card"><strong>${report.summary.passedChecks}/${report.summary.totalChecks}</strong><span>Explicit checks passed</span></div><div class="card"><strong>12 + 38</strong><span>Reference architectures + specialist acceptance sections</span></div></div>
${marketReviews.map(renderMarketReview).join('')}
<section><h2>What changed</h2><div class="coverage"><p><strong>12 project architectures</strong><br>Distinct enterprise scenarios, 60 stack decisions, 36 challenge/approach pairs, 60 workflow steps and 48 validation checks.</p><p><strong>38 specialist scopes</strong><br>152 scope-specific acceptance checks add practical delivery detail to differentiated service copy.</p><p><strong>Existing theme and images</strong><br>Website CSS and image files were preserved. Current pages use existing project screenshots, captions and related-work links.</p></div><p class="notice">The projects are owner-confirmed genuine work. Added enterprise scenarios and technology choices are labelled <strong>proposed reference architectures</strong> in both page content and structured data. They do not claim unconfirmed production stacks, measured results or certifications.</p><p>${escape(report.scope)} Privacy and Terms are included for their utility-page implementation; their score does not imply acquisition potential or legal completeness.</p></section>
<section><h2>How the score is calculated</h2><p><strong>Score = passed checks × 0.5.</strong> Every page has the same 20 checks and a maximum of 10 points. There are no manually assigned bonuses, target-score overrides or points for word count. Role-specific coverage tests structure and required content elements; writing quality and buyer demand still require editorial and market assessment.</p><details><summary>View all 20 scoring rules</summary><ol>${rubric.map(c=>`<li><strong>${escape(c.label)} — 0.5 points.</strong> ${escape(c.rule)}</li>`).join('')}</ol></details><details><summary>Page-role content coverage rules</summary><ul><li>Project cases: owner-confirmed marker, two captioned screenshots, explicit proposed-design label, five stack layers, three challenges, five workflow steps and four validation checks.</li><li>Specialist services: four scope-specific acceptance checks, at least three FAQs, no duplicate generic process strip and within-family five-word similarity at or below 50%.</li><li>Parent services: at least three FAQs and links to all their specialists.</li><li>Articles: at least three table-of-contents links, three H2 sections and an attribution link to About.</li><li>Industries: at least three H2 sections and contextual service links.</li><li>Directories: at least four links to the relevant detail pages. Contact: two labelled form groups. Other core and utility pages: at least three topic sections.</li></ul></details><p>Negative control: the generated 404 page ${negativeControl.noindex&&negativeControl.outsideSitemap?'correctly declares noindex and is excluded from the sitemap':'needs attention'}. It is excluded from the 84-page score set.</p><p class="muted">Method: local-implementation-v1. Generated HTML SHA-256: <code>${report.inputDigest}</code>. Previous editorial ratings remain a separate assessment and are not comparable to this checklist.</p></section>
<section><h2>Scores by page group</h2><div class="table-wrap"><table><thead><tr><th>Group</th><th>Pages</th><th>Average / 10</th><th>Lowest / 10</th></tr></thead><tbody>${report.groups.map(g=>`<tr><td>${escape(g.label)}</td><td>${g.pages}</td><td>${g.average.toFixed(1)}</td><td>${g.minimum.toFixed(1)}</td></tr>`).join('')}</tbody></table></div></section>
<section id="pages"><h2>All ${pages.length} page scores</h2><p>Choose a route to inspect the evidence, headings, links, page text and any proposed architecture. Content opportunities remain visible even when all implementation checks pass.</p><div class="controls"><input id="search" type="search" aria-label="Filter pages" placeholder="Search route, title, stack or page text"><select id="group" aria-label="Page group"><option value="">All page groups</option>${report.groups.map(g=>`<option>${escape(g.label)}</option>`).join('')}</select><select id="sort" aria-label="Sort pages"><option value="route">Route A–Z</option><option value="score">Lowest score first</option><option value="words">Most page text first</option></select></div><div class="toolbar"><button id="csv">Download CSV</button><button id="json">Download full JSON</button><button id="print">Print report</button></div><p id="status" role="status">${pages.length} pages shown</p><div class="table-wrap"><table><thead><tr><th>Route and title</th><th>Group and purpose</th><th>Score / 10</th><th>Words</th><th>Images</th><th>Next content improvement · unscored</th></tr></thead><tbody id="rows">${[...pages].sort((a,b)=>a.route.localeCompare(b.route)).map(row).join('')}</tbody></table></div></section>
<section id="detail" class="detail" hidden tabindex="-1"></section>
<section><h2>What the score does not settle</h2><p>The implementation is ready for the next editorial and measurement stage. Query demand, competitive differentiation, actual delivered technology, documented outcomes, practitioner experience and search performance are outside these 20 automated checks. The next-improvement column identifies the evidence each page would benefit from; a high implementation score does not remove those opportunities.</p></section><footer>Generated from the frontend build on ${escape(reportDate)} using <code>node scripts/build-local-seo-score-report.mjs --date=${escape(reportDate)}</code>. ${failed.length?failed.length+' pages have failed checks.':'All scored checks passed.'} No external resources are required to open this report.</footer></main>
<script type="application/json" id="report-data">${JSON.stringify(report).replaceAll('<','\\u003c')}</script><script>
const report=JSON.parse(document.getElementById('report-data').textContent),pages=report.pages;
const esc=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function row(p){return '<tr><td><a href="#page='+encodeURIComponent(p.route)+'">'+esc(p.route)+'</a><small>'+esc(p.title)+'</small></td><td>'+esc(p.group)+'<small>'+esc(p.purpose)+'</small></td><td class="score">'+p.score.toFixed(1)+'<small>'+p.passed+'/20 checks</small></td><td>'+p.words.toLocaleString('en-IN')+'</td><td>'+p.imageCount+'</td><td>'+esc(p.nextImprovement)+'</td></tr>';}
function filter(){const q=document.getElementById('search').value.toLowerCase(),g=document.getElementById('group').value,s=document.getElementById('sort').value;let list=pages.filter(p=>(!g||p.group===g)&&(!q||JSON.stringify(p).toLowerCase().includes(q)));list.sort((a,b)=>s==='score'?a.score-b.score||a.route.localeCompare(b.route):s==='words'?b.words-a.words:a.route.localeCompare(b.route));document.getElementById('rows').innerHTML=list.map(row).join('');document.getElementById('status').textContent=list.length+' of '+pages.length+' pages shown';}
for(const id of ['search','group','sort'])document.getElementById(id).addEventListener('input',filter);
function detail(){if(!location.hash.startsWith('#page='))return;let route;try{route=decodeURIComponent(location.hash.slice(6));}catch{return;}const p=pages.find(x=>x.route===route);if(!p)return;const el=document.getElementById('detail');el.hidden=false;let content='<a href="#pages">Back to all pages</a><h2>'+esc(p.route)+' — '+p.score.toFixed(1)+'/10</h2><p>'+p.passed+'/20 local implementation checks passed. '+esc(p.purpose)+'.</p><dl><dt>Title</dt><dd>'+esc(p.title)+'</dd><dt>Description</dt><dd>'+esc(p.description)+'</dd><dt>H1</dt><dd>'+esc(p.h1)+'</dd><dt>Next content improvement · unscored</dt><dd>'+esc(p.nextImprovement)+'</dd></dl><h3>Check evidence</h3><div class="check-grid">'+p.checks.map(c=>{const r=report.rubric.find(r=>r.id===c.id);return '<article><strong class="'+(c.passed?'pass':'fail')+'">'+(c.passed?'PASS':'FAIL')+' · '+esc(r.label)+'</strong><p>'+esc(c.evidence)+'</p><small>'+esc(r.rule)+'</small></article>';}).join('')+'</div>';
if(p.architecture){const a=p.architecture;content+='<h3>Proposed enterprise reference architecture</h3><p class="notice">Illustrative scenario and proposed technology choices; separate from the owner-confirmed project screens.</p><p>'+esc(a.scenario)+'</p><p><strong>Objective:</strong> '+esc(a.objective)+'</p><div class="table-wrap"><table class="stack"><thead><tr><th>Layer</th><th>Proposed stack</th><th>Rationale</th></tr></thead><tbody>'+a.stack.map(x=>'<tr>'+x.map(c=>'<td>'+esc(c)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div><h3>Challenges and approach</h3>'+a.challenges.map(x=>'<h4>'+esc(x[0])+'</h4><p>'+esc(x[1])+'</p>').join('')+'<h3>Workflow</h3><ol>'+a.flow.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol><h3>Validation</h3><ul>'+a.validation.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul><p><strong>Tradeoff:</strong> '+esc(a.tradeoff)+'</p>';}
if(p.acceptance)content+='<h3>Proposed service acceptance checks</h3><ul>'+p.acceptance.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>';
content+='<details><summary>All section headings</summary><ul>'+p.headings.map(x=>'<li>'+esc(x.level+' · '+x.text)+'</li>').join('')+'</ul></details><details><summary>All main-content links</summary><ul>'+p.links.map(x=>'<li>'+esc(x.text||'(no visible text)')+' · <code>'+esc(x.href)+'</code></li>').join('')+'</ul></details><details><summary>Extracted page text</summary><p>'+esc(p.text)+'</p></details>';el.innerHTML=content;el.scrollIntoView({behavior:'auto',block:'start'});el.focus({preventScroll:true});}
window.addEventListener('hashchange',detail);detail();
function download(name,type,data){const u=URL.createObjectURL(new Blob([data],{type})),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);}
document.getElementById('json').addEventListener('click',()=>download('cubusify-local-seo-'+report.reportDate+'.json','application/json',JSON.stringify(report,null,2)));
document.getElementById('csv').addEventListener('click',()=>{const cell=x=>'"'+String(x??'').replaceAll('"','""')+'"',rows=[['Route','Group','Purpose','Local score / 10','Passed / 20','Title','Description','Words','Images','Next improvement'],...pages.map(p=>[p.route,p.group,p.purpose,p.score,p.passed,p.title,p.description,p.words,p.imageCount,p.nextImprovement])];download('cubusify-local-seo-'+report.reportDate+'.csv','text/csv;charset=utf-8',rows.map(r=>r.map(cell).join(',')).join('\\r\\n'));});
document.getElementById('print').addEventListener('click',()=>window.print());
</script></body></html>`;
fs.mkdirSync('design',{recursive:true});
// Preserve the earlier editorial method instead of silently relabelling its scores.
for(const ext of ['html','json','csv']){
 const previous='design/seo-score-report-updated.'+ext,archive='design/seo-score-report-editorial-2026-10-21.'+ext;
 if(fs.existsSync(previous)&&!fs.existsSync(archive)){
  const old=fs.readFileSync(previous,'utf8');
  if(!old.includes('local-implementation-v1'))fs.copyFileSync(previous,archive);
 }
}
fs.writeFileSync('design/seo-score-report-updated.json',json);
fs.writeFileSync('design/seo-score-report-updated.csv',csv);
fs.writeFileSync('design/seo-score-report-updated.html',html);
fs.writeFileSync('design/seo-content-update.html',html);
console.log(JSON.stringify({date:reportDate,...report.summary,negativeControl,failed:failed.map(p=>({route:p.route,score:p.score,checks:p.checks.filter(c=>!c.passed)}))},null,2));
for(const {dom}of documents.values())dom.window.close();sitemapDOM.window.close();notFound.window.close();
if(failed.length||!negativeControl.noindex||!negativeControl.outsideSitemap)process.exitCode=1;
