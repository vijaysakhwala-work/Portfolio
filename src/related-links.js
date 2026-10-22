import {services,articles,industries} from './catalog.js';
import {industryContent} from './industry-content.js';

// Editorial map of genuinely related pages, used for descriptive internal links.
// Sub-service pages also link to their parent and to the next sibling (a ring, so every sibling is linked).
const growth={path:'/services/seo-aeo-geo',title:'SEO, AEO & GEO strategy',description:'An audit-led plan for technical search foundations, useful answer content and measurement.'};
const hub={software:['ai','web','product'],web:['ecommerce','design','software'],mobile:['product','design','web'],product:['software','design','qa'],design:['web','mobile','product'],ecommerce:['web','marketing','ai'],ai:['software','web','cloud'],qa:['cloud','product','software'],cloud:['qa','software','product'],blockchain:['software','web','cloud'],marketing:['web','ecommerce','design'],games:['mobile','design','web']};
const cross={
 'custom-crm':['ai/sales-marketing-automation','ai/integration-solutions'],
 'business-dashboards':['ai/integration-solutions','web/api-backend'],
 'saas-platforms':['product/saas-engineering','product/mvp-development'],
 'business-websites':['marketing/search-engine-optimisation','design/brand-visual-design'],
 'web-applications':['software/saas-platforms','mobile/progressive-web-apps'],
 'cms-development':['marketing/content-campaigns','ecommerce/woocommerce-development'],
 'api-backend':['ai/integration-solutions','cloud/cloud-deployment'],
 'ios-android-apps':['product/mvp-development','design/interface-design'],
 'flutter-react-native':['qa/web-mobile-testing','web/web-applications'],
 'progressive-web-apps':['web/web-applications','design/user-experience'],
 'mvp-development':['design/user-experience','software/saas-platforms'],
 'saas-engineering':['software/saas-platforms','cloud/ci-cd-pipelines'],
 'product-modernisation':['cloud/cloud-deployment','qa/test-automation'],
 'user-experience':['marketing/conversion-optimisation','product/mvp-development'],
 'interface-design':['web/web-applications','mobile/ios-android-apps'],
 'brand-visual-design':['web/business-websites','marketing/content-campaigns'],
 'shopify-development':['marketing/conversion-optimisation','ai/integration-solutions'],
 'woocommerce-development':['web/cms-development','marketing/search-engine-optimisation'],
 'custom-ecommerce':['web/api-backend','ai/integration-solutions'],
 'ai-assistants':['software/custom-crm','web/api-backend'],
 'business-automation':['software/custom-crm','web/api-backend'],
 'sales-marketing-automation':['software/custom-crm','marketing/content-campaigns'],
 'voice-customer-support':['software/custom-crm','software/business-dashboards'],
 'integration-solutions':['web/api-backend','software/custom-crm'],
 'web-mobile-testing':['mobile/ios-android-apps','web/web-applications'],
 'test-automation':['cloud/ci-cd-pipelines','product/saas-engineering'],
 'performance-api-testing':['web/api-backend','cloud/maintenance-monitoring'],
 'cloud-deployment':['web/api-backend','qa/performance-api-testing'],
 'ci-cd-pipelines':['qa/test-automation','product/saas-engineering'],
 'maintenance-monitoring':['qa/performance-api-testing','product/product-modernisation'],
 'smart-contracts':['web/api-backend','qa/test-automation'],
 'web3-applications':['web/web-applications','design/interface-design'],
 'traceability-solutions':['software/business-dashboards','ai/integration-solutions'],
 'search-engine-optimisation':['SEO','web/business-websites'],
 'content-campaigns':['SEO','ai/sales-marketing-automation'],
 'conversion-optimisation':['design/user-experience','ecommerce/shopify-development'],
 '2d-games':['mobile/ios-android-apps','design/interface-design'],
 'interactive-experiences':['web/web-applications','design/user-experience'],
 'software-outsourcing':['product/mvp-development','cloud/maintenance-monitoring']
};
const guides={
 'seo-aeo-geo-where-to-start':['SEO','marketing/search-engine-optimisation','marketing/content-campaigns'],
 'choosing-your-ecommerce-platform':['ecommerce/shopify-development','ecommerce/woocommerce-development','ecommerce/custom-ecommerce'],
 'where-ai-automation-saves-time':['ai/business-automation','ai/ai-assistants','ai/sales-marketing-automation'],
 'planning-your-first-software-mvp':['product/mvp-development','design/user-experience','software/saas-platforms'],
 'custom-software-development-cost':['software/software-outsourcing','product/mvp-development','software/custom-crm'],
 'choosing-a-software-development-company':['software/software-outsourcing','software/custom-crm','software/saas-platforms'],
 'what-ai-automation-agencies-do':['ai/ai-assistants','ai/business-automation','ai/integration-solutions']
};

const byPath=new Map([[growth.path,growth]]);
for(const s of services){byPath.set(s.path,{path:s.path,title:s.title,description:s.description});for(const x of s.subs)byPath.set(x.path,{path:x.path,title:x.title,description:x.description})}
const resolve=key=>key==='SEO'?growth:byPath.get('/services/'+key);
const unique=list=>{const seen=new Set();return list.filter(x=>x&&!seen.has(x.path)&&seen.add(x.path))};

// Reverse of the industry pages' own service cards: which industry workflows feature a service.
const industryNames=new Map(industries.map(i=>[i.slug,i.name]));
const industriesByService=new Map();
for(const [slug,content] of Object.entries(industryContent))for(const [,,href] of content.cards){const key=href.replace(/\/$/,'');if(!industriesByService.has(key))industriesByService.set(key,new Set());industriesByService.get(key).add(slug)}
export function industriesFor(path){return [...(industriesByService.get(path.replace(/\/$/,''))||[])].map(slug=>({path:'/industries/'+slug,title:industryNames.get(slug)}))}
export function titleForPath(path){return byPath.get(path.replace(/\/$/,''))?.title}
export function relatedFor(path){
 const p=path.replace(/\/$/,'');
 const guide=articles.find(a=>'/blog/'+a.slug===p);
 if(guide)return unique(guides[guide.slug].map(resolve));
 for(const s of services){
  if(p===s.path)return unique(hub[s.slug].map(slug=>byPath.get('/services/'+slug)));
  const sub=s.subs.find(x=>x.path===p);
  if(sub){const next=s.subs[(s.subs.indexOf(sub)+1)%s.subs.length];return unique([byPath.get(s.path),byPath.get(next.path),...(cross[sub.slug]||[]).map(resolve)])}
 }
 return [];
}
export const serviceIndex=services.map(s=>({path:s.path,title:s.title,subs:s.subs.map(x=>({path:x.path,title:x.title}))}));
export {growth};
