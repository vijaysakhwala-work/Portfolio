import fs from 'node:fs/promises';
import {existsSync} from 'node:fs';
const output=existsSync('dist/client/index.html')?'dist/client':'dist';
// Preserve audited originals in source; omit obsolete previews and retired delivery URLs.
await fs.rm(output+'/images/showcases/responsive',{recursive:true,force:true});
const manifest=JSON.parse(await fs.readFile('src/image-delivery.json','utf8'));
const keep=new Set(Object.values(manifest).flatMap(a=>a.variants.map(v=>v.src.split('/').at(-1))));
for(const name of await fs.readdir(output+'/images/delivery'))if(!keep.has(name))await fs.rm(output+'/images/delivery/'+name);
// Source files nothing references (the site serves the .webp award badges); kept in public/, left out of the deploy package.
for(const name of ['cubusify-awards.png','vijay-founder-photo.jpg',...['appfutura','clutch','designrush','goodfirms-award','goodfirms-profile','it-rate'].map(n=>'awards/'+n+'.png')])await fs.rm(output+'/images/'+name,{force:true});
// More files that no page uses (checked against the built output on 2026-10-24); kept in public/, left out of the deploy package.
// images/tech belongs to the TechStack component, which no page imports; the Inter fonts and their licence are not declared in any stylesheet.
await fs.rm(output+'/images/tech',{recursive:true,force:true});
for(const name of ['images/vijay-founder-approved-500.webp','images/vijay-founder-approved-1000.webp','fonts/OFL.txt',...['400','500','600','700'].map(w=>'fonts/inter-'+w+'.woff')])await fs.rm(output+'/'+name,{force:true});
// A composite Worker build serves static files from client/. Remove duplicate
// frontend output at the root, retaining the Worker and deployment metadata.
if(output==='dist/client')for(const name of await fs.readdir('dist'))if(!['client','server','.openai'].includes(name))await fs.rm('dist/'+name,{recursive:true,force:true});
