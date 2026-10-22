import {build} from 'esbuild';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {routes,metadata,routeInfo} from '../src/catalog.js';
import assets from '../src/showcase-assets.js';
import {articleImages,articleUpdated} from '../src/editorial-meta.js';
import {primaryPageImage,renderedPageImages,imageFromAsset} from '../src/seo-images.js';
import {workContent} from '../src/work-content.js';
import {enterpriseArchitectures} from '../src/enterprise-architectures.js';
await fs.mkdir('.cache',{recursive:true});
await build({entryPoints:['src/server-entry.jsx'],bundle:true,platform:'node',format:'esm',outfile:'.cache/app.mjs',packages:'external',logLevel:'warning'});
const {default:App,loadPage}=await import(pathToFileURL(path.resolve('.cache/app.mjs')).href+'?t='+Date.now());
const template=await fs.readFile('dist/index.html','utf8');
const manifest=JSON.parse(await fs.readFile('dist/.vite/manifest.json','utf8'));
function routeEntry(info){return {growth:'SeoGrowthPage',home:'HomePage',services:'ServicesDirectory',industry:'IndustrySamplePage',about:'AboutPage',team:'HireTeamPage',contact:'ContactPage',work:'WorkPage','work-detail':'WorkPage'}[info.type]||(info.type==='service'?(info.service.slug==='ai'?'AILandingPage':'ServiceSamplePage'):info.type==='subservice'?(info.service.slug==='ai'?'AISamplePage':'ServiceSamplePage'):'BasicPages')}
function routeResources(info){const seen=new Set(),css=new Set(),js=new Set();function visit(key){if(seen.has(key))return;seen.add(key);const entry=manifest[key];if(!entry)return;if(entry.file)js.add(entry.file);(entry.css||[]).forEach(x=>css.add(x));(entry.imports||[]).forEach(visit)}visit('src/'+routeEntry(info)+'.jsx');return [...css].filter(x=>!template.includes(`href="/${x}"`)).map(x=>`<link rel="stylesheet" href="/${x}"/>`).join('')+[...js].map(x=>`<link rel="modulepreload" href="/${x}"/>`).join('')}

const origin=(process.env.SITE_URL||'https://cubusify.com').replace(/\/$/,'');
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const sitemapPages=[];
for(const route of [...routes,'/404']){
 const m=metadata(route);
 const Page=await loadPage(route);
 const html=renderToString(React.createElement(App,{path:route,Page}));
 const canonical=origin+(route==='/'?'/':route+'/');
 const info=routeInfo(route);
 const organization={'@type':'Organization','@id':origin+'/#organization',name:'Cubusify',url:origin,email:'hello@cubusify.com',logo:origin+'/images/company-logo.png',sameAs:['https://linkedin.com/company/cubusify','https://clutch.co/profile/cubusify','https://www.goodfirms.co/company/cubusify'],address:{'@type':'PostalAddress',addressLocality:'Surat',addressRegion:'Gujarat',addressCountry:'IN'}};
 const graph=[organization,{'@type':'WebSite','@id':origin+'/#website',url:origin+'/',name:'Cubusify',publisher:{'@id':origin+'/#organization'},inLanguage:'en'},{'@type':info.type==='contact'?'ContactPage':info.type==='about'?'AboutPage':'WebPage','@id':canonical+'#webpage',url:canonical,name:m.title,description:m.description,isPartOf:{'@id':origin+'/#website'},about:{'@id':origin+'/#organization'},inLanguage:'en'}];
 if(info.service||info.type==='growth')graph.push({'@type':'Service',name:info.sub?.title||info.service?.title||'SEO, AEO and GEO',description:m.description,url:canonical,provider:{'@id':origin+'/#organization'},mainEntityOfPage:{'@id':canonical+'#webpage'}});
 const primary=primaryPageImage(route,info);
 const image=primary.src;
 const imageId=canonical+'#primary-image';
 graph.push({'@type':'ImageObject','@id':imageId,url:origin+image,contentUrl:origin+image,width:primary.width,height:primary.height,caption:primary.caption});
 graph.find(x=>x['@id']===canonical+'#webpage').primaryImageOfPage={'@id':imageId};
 const service=graph.find(x=>x['@type']==='Service');if(service)service.image={'@id':imageId};
 if(info.type==='work-detail'){
  const project=workContent[info.slug];
  const projectId=canonical+'#project-case-study';
  graph.push({'@type':'CreativeWork','@id':projectId,name:project.title,description:project.summary,genre:'Project case study',url:canonical,mainEntityOfPage:{'@id':canonical+'#webpage'},author:{'@id':origin+'/#organization'},publisher:{'@id':origin+'/#organization'},inLanguage:'en',image:['cover','desktop','mobile'].map(part=>origin+imageFromAsset(info.slug+'-'+part).src),about:project.features.map(name=>({'@type':'Thing',name}))});
  graph.find(x=>x['@id']===canonical+'#webpage').mainEntity={'@id':projectId};
  const blueprint=enterpriseArchitectures[info.slug];
  if(blueprint){const architectureId=canonical+'#enterprise-architecture';graph.push({'@type':'CreativeWork','@id':architectureId,name:'Proposed enterprise reference architecture: '+project.title,genre:'Reference architecture',description:'Illustrative enterprise scenario and proposed technology choices. '+blueprint.objective,url:architectureId,isPartOf:{'@id':projectId},author:{'@id':origin+'/#organization'}});graph.find(x=>x['@id']===projectId).hasPart={'@id':architectureId};}
 }
 if(route==='/about')graph.push({'@type':'Person','@id':origin+'/about/#founder',name:'Vijay Sakhwala',jobTitle:'Founder',worksFor:{'@id':origin+'/#organization'},image:origin+'/images/vijay-founder-1000.webp',url:origin+'/about/'});
 if(info.article)graph.push({'@type':'BlogPosting',headline:info.article.title,description:info.article.desc,url:canonical,mainEntityOfPage:{'@id':canonical+'#webpage'},inLanguage:'en',author:{'@type':'Organization',name:'Cubusify Editorial',url:origin+'/about/'},publisher:{'@id':origin+'/#organization'},dateModified:articleUpdated(info.article.slug),image:origin+image});
 if(route!=='/'&&route!=='/404'){const parts=route.split('/').filter(Boolean);graph.push({'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:origin+'/'},...parts.map((part,n)=>({'@type':'ListItem',position:n+2,name:n===parts.length-1?m.title.replace(' | Cubusify',''):part.charAt(0).toUpperCase()+part.slice(1).replaceAll('-',' '),item:origin+'/'+parts.slice(0,n+1).join('/')+'/'}))]})}
 const schema={'@context':'https://schema.org','@graph':graph};
 const head=routeResources(info)+`<meta name="robots" content="${route==='/404'?'noindex,follow':'index,follow,max-image-preview:large'}"/><meta property="og:site_name" content="Cubusify"/><meta property="og:locale" content="en_IN"/><link rel="canonical" href="${canonical}"/><meta property="og:type" content="${info.article?'article':'website'}"/><meta property="og:title" content="${escape(m.title)}"/><meta property="og:description" content="${escape(m.description)}"/><meta property="og:url" content="${canonical}"/><meta property="og:image" content="${origin+image}"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${escape(m.title)}"/><meta name="twitter:description" content="${escape(m.description)}"/><meta name="twitter:image" content="${origin+image}"/><script type="application/ld+json">${JSON.stringify(schema).replaceAll('<','\\u003c')}</script>`;
 const imageHead=`<meta property="og:image:width" content="${primary.width}"/><meta property="og:image:height" content="${primary.height}"/><meta property="og:image:type" content="${primary.type}"/><meta property="og:image:alt" content="${escape(primary.alt)}"/><meta name="twitter:image:alt" content="${escape(primary.alt)}"/>`;
 const page=template.replace(/<title>.*?<\/title>/,`<title>${escape(m.title)}</title>`).replace(/<meta name="description" content="[^"]*"\s*\/?\s*>/,`<meta name="description" content="${escape(m.description)}"/>`).replace('</head>',head+imageHead+'</head>').replace('<div id="root"></div>',`<div id="root" data-prerendered="true">${html}</div>`);
 if(route!=='/404')sitemapPages.push({canonical,images:renderedPageImages(html)});
 const dir=route==='/'?'dist':route==='/404'?'dist':path.join('dist',route.slice(1));
 await fs.mkdir(dir,{recursive:true});await fs.writeFile(path.join(dir,route==='/404'?'404.html':'index.html'),page);
}
await fs.writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${origin}/sitemap.xml\n`);
await fs.writeFile('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">'+sitemapPages.map(p=>`<url><loc>${escape(p.canonical)}</loc>${p.images.map(i=>`<image:image><image:loc>${escape(origin+i.src)}</image:loc></image:image>`).join('')}</url>`).join('')+'</urlset>');
console.log(`Generated ${routes.length} crawlable React pages, a 404 page and sitemap.`);
