// Writes dist/llms.txt (a short publisher guide) and dist/sitemap.md (a Markdown content map) from the catalog and search metadata.
// Neither file controls crawling or ranking. Every URL listed is a route that exists in the build.
import fs from 'node:fs/promises';
import {routes,metadata,services,industries,articles} from '../src/catalog.js';
import {workProjects} from '../src/work-projects.js';

if(process.env.INDEXING==='off'){console.log('INDEXING=off: llms.txt and sitemap.md not written.');process.exit(0)}
const origin=(process.env.SITE_URL||'https://cubusify.com').replace(/\/$/,'');
const url=route=>origin+(route==='/'?'/':route+'/');
const name=route=>metadata(route).title.replace(/\s*\|\s*Cubusify$/,'');
const note=route=>metadata(route).description.replace(/\s+/g,' ').trim();
const item=route=>`- [${name(route)}](${url(route)}): ${note(route)}`;
const known=new Set(routes);
const list=(section,items)=>{for(const r of items)if(!known.has(r))throw Error('Not a route: '+r);return `## ${section}\n\n${items.map(item).join('\n')}\n`};

const summary='Cubusify builds custom software, AI workflows, websites and mobile apps. Based in Surat, India, working worldwide.';
const guide=[
 '# Cubusify',
 '',
 `> ${summary}`,
 '',
 'This guide points to the pages that answer common buying questions. Case studies describe supplied screens and project briefs; figures in screenshots are not claims of measured business performance.',
 'Maintained by Cubusify (hello@cubusify.com). The full list of pages is in the content map linked below.',
 '',
 list('Start here',['/','/services','/work','/about','/team','/contact']),
 list('Services',services.map(s=>s.path).concat('/services/seo-aeo-geo')),
 list('Guides',articles.map(a=>'/blog/'+a.slug)),
 list('Industries',industries.map(i=>'/industries/'+i.slug)),
 `## Optional\n\n- [Content map](${origin}/sitemap.md): Every page on the site in one Markdown list.\n- [XML sitemap](${origin}/sitemap.xml): The same pages for search engines.\n${['/privacy','/terms'].map(item).join('\n')}\n`
].join('\n');

const map=[
 '# Cubusify content map',
 '',
 `> ${summary} Every canonical page, grouped by topic.`,
 '',
 ...services.map(s=>list(s.title,[s.path,...s.subs.map(x=>x.path)])),
 list('SEO, AEO and GEO strategy',['/services/seo-aeo-geo']),
 list('Industries',['/industries',...industries.map(i=>'/industries/'+i.slug)]),
 list('Case studies',['/work',...workProjects.map(p=>'/work/'+p.slug)]),
 list('Guides',['/blog',...articles.map(a=>'/blog/'+a.slug)]),
 list('Company',['/','/services','/about','/team','/contact','/privacy','/terms'])
].join('\n');

// Every route (except the 404 page) must appear in the content map.
const missing=routes.filter(r=>!map.includes(`(${url(r)})`));
if(missing.length)throw Error('Content map is missing: '+missing.join(', '));
await fs.writeFile('dist/llms.txt',guide);
await fs.writeFile('dist/sitemap.md',map);
console.log(`Wrote llms.txt (${guide.split('\n').length} lines) and sitemap.md (${routes.length} pages).`);
