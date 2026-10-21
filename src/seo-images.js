import assets from './showcase-assets.js';
import delivery from './image-delivery.json' with {type:'json'};
import {articleImages} from './editorial-meta.js';

const servicePrefixes={software:'software-development',web:'web-development',mobile:'mobile-app-development',product:'product-engineering',design:'ui-ux-design',ecommerce:'ecommerce-development',ai:'ai-automation',qa:'qa-testing',cloud:'devops-cloud',marketing:'digital-marketing',games:'game-development'};
const coreImages={'/':'dew-desktop','/services':'product-engineering-hero','/industries':'manufacturing-overview-tile','/work':'forma-cover','/team':'product-engineering-overview','/blog':'digital-marketing-overview','/services/seo-aeo-geo':'digital-marketing-hero'};
export function imageFromAsset(id){
 const asset=assets[id];if(!asset)throw Error('Unknown SEO image '+id);
 const variant=delivery[id]?.variants.at(-1);
 const width=variant?.width||asset.width;
 return {id,src:variant?.src||asset.src,width,height:Math.round(asset.height*width/asset.width),alt:asset.alt,caption:asset.label,type:'image/webp'};
}
export function primaryPageImage(route,info){
 if(route==='/about')return {src:'/images/vijay-founder-1000.webp',width:1000,height:1000,alt:'Vijay Sakhwala, Founder of Cubusify',caption:'Cubusify founder Vijay Sakhwala',type:'image/webp'};
 if(info.type==='work-detail')return imageFromAsset(info.slug+'-cover');
 if(info.article)return imageFromAsset(articleImages[info.article.slug]);
 if(info.industry)return imageFromAsset(info.industry.slug+'-overview-tile');
 if(info.service){
  if(info.service.slug==='mobile')return imageFromAsset('mobile-app-development-hero');
  if(info.sub&&assets[info.sub.slug+'-desktop-1'])return imageFromAsset(info.sub.slug+'-desktop-1');
  return imageFromAsset(info.service.slug==='blockchain'?'stockroom-desktop':servicePrefixes[info.service.slug]+'-hero');
 }
 if(coreImages[route])return imageFromAsset(coreImages[route]);
 return {src:'/images/contact-envelope.webp',width:1536,height:1024,alt:'Contact Cubusify about a project',caption:'Start a project conversation',type:'image/webp'};
}

// Derive image sitemap entries from images actually rendered in each page.
// This does not claim that an unrendered asset appears on every route.
export function renderedPageImages(html){
 const found=new Map();
 for(const tag of html.matchAll(/<img\b[^>]*>/g)){
  const source=tag[0].match(/\bsrc="([^"]+)"/)?.[1];
  if(!source?.startsWith('/images/'))continue;
  const set=tag[0].match(/\bsrc[Ss]et="([^"]+)"/)?.[1];
  const candidates=(set||'').split(',').map(x=>x.trim().split(/\s+/)).filter(x=>x[0]&&/^\d+w$/.test(x[1]||'')).sort((a,b)=>parseInt(b[1])-parseInt(a[1]));
  const src=candidates[0]?.[0]||source;
  if(!found.has(src))found.set(src,{src,alt:tag[0].match(/\balt="([^"]*)"/)?.[1]||''});
 }
 return [...found.values()];
}
