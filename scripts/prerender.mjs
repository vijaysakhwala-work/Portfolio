import {build} from 'esbuild';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import React from 'react';
import {renderToString,renderToPipeableStream} from 'react-dom/server';
import {PassThrough} from 'node:stream';
function renderReady(element){return new Promise((resolve,reject)=>{let html='';const out=new PassThrough();out.on('data',c=>html+=c);out.on('end',()=>resolve(html));const stream=renderToPipeableStream(element,{onAllReady(){stream.pipe(out)},onError:reject});});}
import {routes,metadata,routeInfo} from '../src/catalog.js';
await fs.mkdir('.cache',{recursive:true});
await build({entryPoints:['src/App.jsx'],bundle:true,platform:'node',format:'esm',outfile:'.cache/app.mjs',packages:'external',logLevel:'warning'});
const {default:App}=await import(pathToFileURL(path.resolve('.cache/app.mjs')).href+'?t='+Date.now());
const template=await fs.readFile('dist/index.html','utf8');
const origin=(process.env.SITE_URL||'https://cubusify.com').replace(/\/$/,'');
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
for(const route of [...routes,'/404']){
 const m=metadata(route);
 const html=route==='/demo-studio'?await renderReady(React.createElement(App,{path:route})):renderToString(React.createElement(App,{path:route}));
 const canonical=origin+(route==='/'?'/':route);
 const schema={ '@context':'https://schema.org','@type':'Organization',name:'Cubusify',url:origin,email:'hello@cubusify.com'};
 const info=routeInfo(route);
 if(info.service){schema['@type']='Service';schema.name=info.sub?.title||info.service.title;schema.description=m.description;schema.provider={'@type':'Organization',name:'Cubusify',url:origin};delete schema.email;}
 const head=`<link rel="canonical" href="${canonical}"/><meta property="og:type" content="website"/><meta property="og:title" content="${escape(m.title)}"/><meta property="og:description" content="${escape(m.description)}"/><meta property="og:url" content="${canonical}"/><meta name="twitter:card" content="summary"/><script type="application/ld+json">${JSON.stringify(schema).replaceAll('<','\\u003c')}</script>${route==='/404'?'<meta name="robots" content="noindex"/>':''}`;
 const page=template.replace(/<title>.*?<\/title>/,`<title>${escape(m.title)}</title>`).replace(/<meta name="description" content="[^"]*"\s*\/?\s*>/,`<meta name="description" content="${escape(m.description)}"/>`).replace('</head>',head+'</head>').replace('<div id="root"></div>',`<div id="root" data-prerendered="true">${html}</div>`);
 const dir=route==='/'?'dist':route==='/404'?'dist':path.join('dist',route.slice(1));
 await fs.mkdir(dir,{recursive:true});await fs.writeFile(path.join(dir,route==='/404'?'404.html':'index.html'),page);
}
await fs.writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
await fs.writeFile('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+routes.map(r=>`<url><loc>${origin}${r==='/'?'/':r}</loc></url>`).join('')+'</urlset>');
console.log(`Generated ${routes.length} crawlable React pages, a 404 page and sitemap.`);
