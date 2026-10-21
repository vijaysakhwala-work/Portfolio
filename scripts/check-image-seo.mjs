import fs from 'node:fs';
import {JSDOM} from 'jsdom';
import {routes,routeInfo} from '../src/catalog.js';

const output=fs.existsSync('dist/client/index.html')?'dist/client':'dist';
const sitemap=new JSDOM(fs.readFileSync(output+'/sitemap.xml','utf8'),{contentType:'text/xml'});
const imageNamespace='http://www.google.com/schemas/sitemap-image/1.1';
const failures=[],primaryImages=new Set();let imageReferences=0,projectNodes=0;
for(const route of routes){
 const dom=new JSDOM(fs.readFileSync(output+(route==='/'?'':route)+'/index.html','utf8'));
 const d=dom.window.document,info=routeInfo(route),canonical=d.querySelector('link[rel=canonical]').href;
 const src=d.querySelector('meta[property="og:image"]')?.content;
 const alt=d.querySelector('meta[property="og:image:alt"]')?.content;
 const width=Number(d.querySelector('meta[property="og:image:width"]')?.content);
 const height=Number(d.querySelector('meta[property="og:image:height"]')?.content);
 if(!src||!alt||width<=0||height<=0)failures.push(route+': incomplete primary image metadata');
 if(src){primaryImages.add(src);if(!fs.existsSync(output+new URL(src).pathname))failures.push(route+': missing primary image file');}
 const graph=JSON.parse(d.querySelector('script[type="application/ld+json"]').textContent)['@graph'];
 const webpage=graph.find(x=>x['@id']===canonical+'#webpage');
 const primary=graph.find(x=>x['@id']===webpage?.primaryImageOfPage?.['@id']);
 if(!primary||primary['@type']!=='ImageObject'||primary.contentUrl!==src)failures.push(route+': primary image schema mismatch');
 if(info.type==='work-detail'){
  const work=graph.find(x=>x['@id']===webpage.mainEntity?.['@id']);
  if(!work||work['@type']!=='CreativeWork'||work.genre!=='Project case study'||work.image.length!==3)failures.push(route+': project structured data missing');else projectNodes++;
  const figures=[...d.querySelectorAll('.wd-gallery-row figure')];
  if(figures.length!==2||figures.some(f=>!f.querySelector('img[src]')||!f.querySelector('figcaption')?.textContent.trim()))failures.push(route+': crawlable project screenshot captions missing');
 }
 const entry=[...sitemap.window.document.getElementsByTagName('url')].find(x=>x.getElementsByTagName('loc')[0]?.textContent===canonical);
 if(!entry)failures.push(route+': sitemap entry missing');
 const listed=new Set([...entry?.getElementsByTagNameNS(imageNamespace,'loc')||[]].map(x=>x.textContent));
 for(const img of d.querySelectorAll('main img[src]')){
  const source=img.getAttribute('src');if(!source.startsWith('/images/'))continue;
  const candidates=(img.getAttribute('srcset')||'').split(',').map(x=>x.trim().split(/\s+/)).filter(x=>/^\d+w$/.test(x[1]||'')).sort((a,b)=>parseInt(b[1])-parseInt(a[1]));
  const image=candidates[0]?.[0]||source;
  if(!listed.has(new URL(image,canonical).href))failures.push(route+': rendered image not in sitemap '+image);
 }
 for(const image of listed){imageReferences++;if(!fs.existsSync(output+new URL(image).pathname))failures.push(route+': sitemap image file missing '+image);}
 dom.window.close();
}
sitemap.window.close();
if(failures.length)throw Error(failures.join('\n'));
const report={pages:routes.length,relevantPrimaryImages:primaryImages.size,sitemapImageReferences:imageReferences,projectStructuredDataNodes:projectNodes,captionedProjectScreens:projectNodes*2,primaryImageMetadataAndSchema:true,allRenderedImagesInSitemap:true,existingImageFilesPreserved:true};
fs.writeFileSync('design/image-seo-checks.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
