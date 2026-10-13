import fs from 'node:fs/promises';
import path from 'node:path';
import {routes,services} from '../src/catalog.js';
const failures=[],warnings=[];let links=0,assets=0;
const titles=new Map(),descs=new Map();
for(const route of routes){
 const file=path.join('dist',route.slice(1),'index.html');
 const html=await fs.readFile(file,'utf8');
 if((html.match(/<h1(?:\s|>)/g)||[]).length!==1)failures.push(route+': expected one h1');
 if(!html.includes('data-prerendered="true"'))failures.push(route+': missing prerendered content');
 if(!html.includes('rel="canonical"'))failures.push(route+': missing canonical');
 if(!html.match(/<meta name="description" content="[^"]{20,}"/))failures.push(route+': missing description');
 // SEO hygiene: title and description length, uniqueness, valid structured data.
 // Service, sub-service and blog pages fail the build; other pages only warn.
 const title=(html.match(/<title>(.*?)<\/title>/)||[])[1]||'';
 const desc=(html.match(/<meta name="description" content="([^"]*)"/)||[])[1]||'';
 const strict=/^\/(services|blog)\/./.test(route);
 const bad=msg=>strict?failures.push(route+': '+msg):warnings.push(route+': '+msg);
 if(title.length>62)bad('title is '+title.length+' chars (max 62): '+title);
 if(desc.length<70||desc.length>165)bad('description is '+desc.length+' chars (70-165)');
 if(titles.has(title))bad('duplicate title, also on '+titles.get(title));else titles.set(title,route);
 if(descs.has(desc))bad('duplicate description, also on '+descs.get(desc));else descs.set(desc,route);
 const ld=[...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m=>m[1]);
 let faqs=0;
 for(const j of ld){try{const o=JSON.parse(j);if(o['@type']==='FAQPage')faqs++}catch{failures.push(route+': invalid JSON-LD')}}
 if(faqs>1)failures.push(route+': '+faqs+' FAQPage blocks (expected at most 1)');
 if(/^\/blog\/./.test(route)&&!ld.some(j=>j.includes('"BlogPosting"')))failures.push(route+': missing BlogPosting schema');
 if(/^\/services\/./.test(route)&&!ld.some(j=>j.includes('"Service"')))failures.push(route+': missing Service schema');
 if(/^\/(services|blog)\/./.test(route)&&!ld.some(j=>j.includes('BreadcrumbList')))failures.push(route+': missing BreadcrumbList schema');
 // raw markdown that leaked into the page, in the visible text or in structured data
 const visible=html.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<style[\s\S]*?<\/style>/g,'').replace(/<[^>]+>/g,' ');
 if(/\]\((\/|https?:)/.test(visible)||/\*\*[^*\s]/.test(visible))failures.push(route+': raw markdown in the visible text');
 if(ld.some(j=>/\]\((\/|https?:)/.test(j)||/\*\*[^*\s]/.test(j)))failures.push(route+': raw markdown in structured data');
 // layout checks that need no browser: no orphan cards, no empty "Read more", takeaways stay short
 for(const [,cls,n] of html.matchAll(/<(?:ul|ol|div) class="fit([^"]*)" data-n="(\d+)"/g)){
  const count=Number(n);
  if(!/\btwo\b/.test(cls)&&![1,2,3,4,5,6,9,12].includes(count))failures.push(route+': .fit grid of '+count+' cards would leave an orphan (use 1-6, 9 or 12, or add the "two" modifier)');
 }
 for(const [,body] of html.matchAll(/<details class="more">(.*?)<\/details>/gs)){
  if(!/<p>[^<]{10,}/.test(body.replace(/<summary>.*?<\/summary>/s,'')))failures.push(route+': empty "Read more"');
 }
 for(const [,t] of html.matchAll(/<p class="lt[^"]*">(.*?)<\/p>/gs)){
  const len=t.replace(/<[^>]+>/g,'').length;
  if(len>300)failures.push(route+': card takeaway is '+len+' chars (max 300): '+t.replace(/<[^>]+>/g,'').slice(0,60));
 }
 for(const [tag] of html.matchAll(/<img\b[^>]*>/g))if(!/\balt=/.test(tag))failures.push(route+': img without alt attribute');
 for(const [,url]of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(!url.startsWith('/')||url.startsWith('//'))continue;
  const pathname=url.split(/[?#]/)[0];
  if(!pathname)continue;
  if(routes.includes(pathname)){links++;continue}
  if(pathname.startsWith('/images/')||pathname.startsWith('/fonts/')||pathname.startsWith('/assets/')||pathname==='/favicon.png'){
   assets++;try{await fs.access('dist'+pathname)}catch{failures.push(route+': missing asset '+pathname)}
  }else failures.push(route+': unknown local URL '+url);
 }
 const ids=new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]));
 for(const [,href]of html.matchAll(/href="(#[^"]+)"/g))if(!ids.has(href.slice(1)))failures.push(route+': missing anchor '+href);
}
let files=0,largest=0;async function walk(dir){for(const item of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,item.name);if(item.isDirectory())await walk(p);else{files++;largest=Math.max(largest,(await fs.stat(p)).size)}}}await walk('dist');
if(files>1000||largest>25*1024*1024)failures.push('Cloudflare drag-and-drop limits exceeded');
if(warnings.length)console.warn('Warnings ('+warnings.length+'):\n  '+warnings.join('\n  '));
if(failures.length)throw Error(failures.join('\n'));
console.log(JSON.stringify({pages:routes.length,serviceCategories:services.length,subsections:services.reduce((n,s)=>n+s.subs.length,0),internalLinksChecked:links,assetReferencesChecked:assets,totalFiles:files,largestFileBytes:largest,cloudflareDirectUploadCompatible:true},null,2));
