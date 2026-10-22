import {existsSync} from 'node:fs';
const output=existsSync('dist/client/index.html')?'dist/client':'dist';
import fs from 'node:fs/promises';
import path from 'node:path';
import {routes,services} from '../src/catalog.js';
const failures=[];let links=0,assets=0;
for(const route of routes){
 const file=path.join(output,route.slice(1),'index.html');
 const html=await fs.readFile(file,'utf8');
 if((html.match(/<h1(?:\s|>)/g)||[]).length!==1)failures.push(route+': expected one h1');
 if(!html.includes('data-prerendered="true"'))failures.push(route+': missing prerendered content');
 if(!html.includes('rel="canonical"'))failures.push(route+': missing canonical');
 if(!html.match(/<meta name="description" content="[^"]{20,}"/))failures.push(route+': missing description');
 for(const [,url]of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(!url.startsWith('/')||url.startsWith('//'))continue;
  const pathname=url.split(/[?#]/)[0];
  if(!pathname)continue;
  const normal=pathname.length>1?pathname.replace(/\/$/,''):pathname;
  if(routes.includes(normal)){links++;if(normal!=='/'&&!pathname.endsWith('/'))failures.push(route+': internal link without the canonical trailing slash '+url);continue}
  if(pathname.startsWith('/images/')||pathname.startsWith('/fonts/')||pathname.startsWith('/assets/')||pathname==='/favicon.png'){
   assets++;try{await fs.access(output+pathname)}catch{failures.push(route+': missing asset '+pathname)}
  }else failures.push(route+': unknown local URL '+url);
 }
 const ids=new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]));
 for(const [,href]of html.matchAll(/href="(#[^"]+)"/g))if(!ids.has(href.slice(1)))failures.push(route+': missing anchor '+href);
}
let files=0,largest=0,totalBytes=0;async function walk(dir){for(const item of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,item.name);if(item.isDirectory())await walk(p);else{files++;const size=(await fs.stat(p)).size;totalBytes+=size;largest=Math.max(largest,size)}}}await walk(output);
if(totalBytes>256*1024*1024)failures.push('Static output exceeds the 256 MiB hosting package limit');
if(files>1000||largest>25*1024*1024)failures.push('Cloudflare drag-and-drop limits exceeded');
if(failures.length)throw Error(failures.join('\n'));
console.log(JSON.stringify({pages:routes.length,serviceCategories:services.length,subsections:services.reduce((n,s)=>n+s.subs.length,0),internalLinksChecked:links,assetReferencesChecked:assets,totalFiles:files,totalOutputBytes:totalBytes,largestFileBytes:largest,cloudflareDirectUploadCompatible:true},null,2));
