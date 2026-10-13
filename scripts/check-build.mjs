import fs from 'node:fs/promises';
import path from 'node:path';
import {routes,services} from '../src/catalog.js';
const failures=[];let links=0,assets=0;
for(const route of routes){
 const file=path.join('dist',route.slice(1),'index.html');
 const html=await fs.readFile(file,'utf8');
 if((html.match(/<h1(?:\s|>)/g)||[]).length!==1)failures.push(route+': expected one h1');
 if(!html.includes('data-prerendered="true"'))failures.push(route+': missing prerendered content');
 if(!html.includes('rel="canonical"'))failures.push(route+': missing canonical');
 if(!html.match(/<meta name="description" content="[^"]{20,}"/))failures.push(route+': missing description');
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
if(failures.length)throw Error(failures.join('\n'));
console.log(JSON.stringify({pages:routes.length,serviceCategories:services.length,subsections:services.reduce((n,s)=>n+s.subs.length,0),internalLinksChecked:links,assetReferencesChecked:assets,totalFiles:files,largestFileBytes:largest,cloudflareDirectUploadCompatible:true},null,2));
