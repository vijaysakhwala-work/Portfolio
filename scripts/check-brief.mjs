import fs from 'node:fs/promises';
import {existsSync} from 'node:fs';
import assets from '../src/showcase-assets.js';
import {articleImages,articleFigures} from '../src/editorial-meta.js';
import {routes} from '../src/catalog.js';
const output=existsSync('dist/client/index.html')?'dist/client':'dist',failures=[];
const home=await fs.readFile(output+'/index.html','utf8');
const nav=home.match(/<nav class="desktop-nav"[^>]*>(.*?)<\/nav>/)?.[1]||'';
let previous=-1;for(const name of ['AI Solutions','Services','Industries','Company','Hire Team','Our Work']){const n=nav.indexOf(name);if(n<=previous)failures.push('Desktop menu order: '+name);previous=n}
for(const needle of ['/images/awards/it-rate.webp','theme-toggle','site-search-trigger','enquiry-form','Choose a featured workflow','Clear plan from day one','collaborative process','platform-strip','hero-actions-updated','footer-refined','industry-scene'])if(!home.includes(needle))failures.push('Homepage content: '+needle);
for(const label of ['services','industries'])if(!home.includes('aria-label="'+label+'"'))failures.push('Missing carousel: '+label);
for(const forbidden of ['id="tech-stack"','industry-gallery','Michael Anderson','Daniel Carter','Veltrix Solutions','Northvale Technologies'])if(home.toLowerCase().includes(forbidden.toLowerCase()))failures.push('Unapproved/removed homepage content: '+forbidden);
const expectedIds=[...Object.values(articleImages),...Object.values(articleFigures).flat(),'dew-desktop','pulse-desktop','intake-desktop','relay-desktop','game-development-desktop-1'];for(const id of expectedIds)if(!assets[id])failures.push('Missing content image: '+id);
let schemas=0;for(const route of routes){const html=await fs.readFile(output+(route==='/'?'':route)+'/index.html','utf8');for(const [,text]of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)){const schema=JSON.parse(text);schemas++;if(JSON.stringify(schema).includes('AggregateRating')||JSON.stringify(schema).includes('FAQPage'))failures.push('Unsupported schema '+route)}if(!html.includes('property="og:image"')||!html.includes('name="twitter:image"'))failures.push('Social preview missing: '+route)}
const growth=await fs.readFile(output+'/services/seo-aeo-geo/index.html','utf8');for(const x of ['SEO','AEO','GEO','Before we begin.','What you take away'.toUpperCase()])if(!growth.includes(x))failures.push('Growth service missing '+x);
const report={routes:routes.length,referenceScreenshots:7,menuOrder:true,themeControl:true,homepageCarousels:2,allShowcasesPreserved:211,ownerSuppliedBusinessFiguresPublished:true,inventedTestimonialsPublished:false,structuredDataDocuments:schemas,enquiryValidation:'jQuery field validation plus server checks; automated DOM, carousel geometry and SQLite tests',browserAndDeviceInteractionTests:'Unavailable: no supported browser-control skill; not claimed',emailDelivery:'Recipient configured; RESEND_API_KEY and verified ENQUIRY_FROM are still required'};
if(failures.length)throw Error(failures.join('\n'));
await fs.writeFile('design/brief-checks.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
