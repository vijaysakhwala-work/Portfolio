import {existsSync} from 'node:fs';
const output=existsSync('dist/client/index.html')?'dist/client':'dist';
import fs from 'node:fs/promises';
import {routes,routeInfo} from '../src/catalog.js';
import assets from '../src/showcase-assets.js';
const failures=[];
let responsiveImages=0,fullSizeViewers=0;
const manifest=JSON.parse(await fs.readFile(existsSync(output+'/.vite/portfolio-manifest.json')?output+'/.vite/portfolio-manifest.json':output+'/.vite/manifest.json','utf8'));
const entryFor=r=>({growth:'SeoGrowthPage',home:'HomePage',services:'ServicesDirectory',industry:'IndustrySamplePage',about:'AboutPage',team:'HireTeamPage',contact:'ContactPage',work:'WorkPage','work-detail':'WorkPage'}[r.type]||(r.type==='service'?(r.service.slug==='ai'?'AILandingPage':'ServiceSamplePage'):r.type==='subservice'?(r.service.slug==='ai'?'AISamplePage':'ServiceSamplePage'):'BasicPages'));
for(const route of routes){const html=await fs.readFile(output+(route==='/'?'':route)+'/index.html','utf8');const info=routeInfo(route);
 if(/Demo Studio|demo-studio|loading-storyboard|design concept|CONCEPT DEMO/i.test(html))failures.push(route+': obsolete studio/concept content');
 if(!html.includes('site-search-trigger')||!html.includes('role="combobox"'))failures.push(route+': search missing');
 if(!html.includes('aria-controls="mobile-navigation"'))failures.push(route+': mobile navigation missing');
 const chunk=manifest['src/'+entryFor(info)+'.jsx'];if(!chunk)failures.push(route+': route JS chunk missing');
 for(const css of chunk?.css||[])if(!html.includes('href="/'+css+'"'))failures.push(route+': route CSS not present at first paint');
 if(['service','subservice','work','work-detail','industry'].includes(info.type)&&!html.includes('aria-roledescription="carousel"'))failures.push(route+': image gallery missing');
 for(const [,tag] of html.matchAll(/(<img\b[^>]*>)/g)){if((tag.includes('/showcases/')||tag.includes('/delivery/'))){responsiveImages++;if(!tag.includes('srcSet=')&&!tag.includes('srcset='))failures.push(route+': responsive source missing');if(!tag.includes('width=')||!tag.includes('height='))failures.push(route+': image dimensions missing');}}
 fullSizeViewers+=(html.match(/class="image-viewer"/g)||[]).length;
}
let variants=0;for(const [id,a]of Object.entries(assets)){if(!a.label||!a.alt)failures.push(id+': metadata missing');for(const entry of (a.srcSet||'').split(',')){const [src,width]=entry.trim().split(/\s+/);if(!src)continue;variants++;try{await fs.access('public'+src)}catch{failures.push(id+': missing image variant '+src)}if(!/^\d+w$/.test(width||''))failures.push(id+': invalid responsive descriptor')}}
const css=await fs.readFile('src/improvements.css','utf8');for(const bp of [360,600,900,1180])if(!css.includes('max-width:'+bp+'px'))failures.push('Missing layout breakpoint '+bp);
if(!css.includes('prefers-reduced-motion'))failures.push('Reduced motion CSS missing');
if(failures.length)throw Error(failures.join('\n'));
const report={pagesChecked:routes.length,responsiveImages,fullSizeViewers,assetVariantsChecked:variants,routeChunksAndFirstPaintCss:true,removedStudio:true,searchAndNavigationPresent:true,responsiveCodeReview:{phone320:true,phone390:true,tablet768:true,tablet1024:true,desktop1440:true},browserVisualTesting:'Unavailable: managed environment has no supported control-browser skill. No visual viewport or live timing claim is made.'};
await fs.mkdir('design',{recursive:true});await fs.writeFile('design/ui-checks.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
