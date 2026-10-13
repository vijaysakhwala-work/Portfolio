import {build} from 'esbuild';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import React from 'react';
import {renderToString,renderToPipeableStream} from 'react-dom/server';
import {PassThrough} from 'node:stream';
function renderReady(element){return new Promise((resolve,reject)=>{let html='';const out=new PassThrough();out.on('data',c=>html+=c);out.on('end',()=>resolve(html));const stream=renderToPipeableStream(element,{onAllReady(){stream.pipe(out)},onError:reject});});}
import {routes,metadata} from '../src/catalog.js';
import {pageSchemas,articleMeta,buildFeed,buildLlms,sitemapEntries} from '../src/seo.js';
await fs.mkdir('.cache',{recursive:true});
await build({entryPoints:['src/App.jsx'],bundle:true,platform:'node',format:'esm',outfile:'.cache/app.mjs',packages:'external',logLevel:'warning'});
const {default:App,preload}=await import(pathToFileURL(path.resolve('.cache/app.mjs')).href+'?t='+Date.now());
const template=await fs.readFile('dist/index.html','utf8');
const origin=(process.env.SITE_URL||'https://cubusify.com').replace(/\/$/,'');
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const ld=obj=>`<script type="application/ld+json">${JSON.stringify(obj).replaceAll('<','\\u003c')}</script>`;
for(const route of [...routes,'/404']){
 const m=metadata(route);
 await preload(route);
 const html=route==='/demo-studio'?await renderReady(React.createElement(App,{path:route})):renderToString(React.createElement(App,{path:route}));
 const canonical=origin+(route==='/'?'/':route);
 const art=articleMeta(route);
 const og=[
  `<meta property="og:type" content="${art?'article':'website'}"/>`,
  '<meta property="og:site_name" content="Cubusify"/>',
  `<meta property="og:title" content="${escape(m.title)}"/>`,
  `<meta property="og:description" content="${escape(m.description)}"/>`,
  `<meta property="og:url" content="${canonical}"/>`,
  `<meta property="og:image" content="${origin}/images/company-logo.png"/>`,
  '<meta name="twitter:card" content="summary"/>',
  `<meta name="twitter:title" content="${escape(m.title)}"/>`,
  `<meta name="twitter:description" content="${escape(m.description)}"/>`,
  art?`<meta property="article:published_time" content="${art.published}"/><meta property="article:modified_time" content="${art.modified}"/><meta property="article:section" content="${escape(art.section)}"/>${art.tags.map(t=>`<meta property="article:tag" content="${escape(t)}"/>`).join('')}`:'',
 ].join('');
 const head=`<link rel="canonical" href="${canonical}"/><link rel="alternate" type="application/rss+xml" title="Cubusify blog" href="${origin}/feed.xml"/>${og}${(route==='/404'?[]:pageSchemas(route,origin)).map(ld).join('')}${route==='/404'?'<meta name="robots" content="noindex"/>':''}`;
 const page=template.replace(/<title>.*?<\/title>/,`<title>${escape(m.title)}</title>`).replace(/<meta name="description" content="[^"]*"\s*\/?\s*>/,`<meta name="description" content="${escape(m.description)}"/>`).replace('</head>',head+'</head>').replace('<div id="root"></div>',`<div id="root" data-prerendered="true">${html}</div>`);
 const dir=route==='/'?'dist':route==='/404'?'dist':path.join('dist',route.slice(1));
 await fs.mkdir(dir,{recursive:true});await fs.writeFile(path.join(dir,route==='/404'?'404.html':'index.html'),page);
}
await fs.writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
await fs.writeFile('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+sitemapEntries(origin)+'</urlset>');
await fs.writeFile('dist/feed.xml',buildFeed(origin));
await fs.writeFile('dist/llms.txt',buildLlms(origin));
console.log(`Generated ${routes.length} crawlable React pages, a 404 page, sitemap, RSS feed and llms.txt.`);
