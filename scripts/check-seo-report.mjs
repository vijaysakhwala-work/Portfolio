import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {JSDOM,VirtualConsole} from 'jsdom';
import {routes} from '../src/catalog.js';

const report=JSON.parse(fs.readFileSync('design/seo-score-report-updated.json','utf8'));
const html=fs.readFileSync('design/seo-score-report-updated.html','utf8');
assert.equal(fs.readFileSync('design/seo-content-update.html','utf8'),html,'The active report must be current.');
assert.equal(report.rubric.length,20);
assert.deepEqual(new Set(report.pages.map(p=>p.route)),new Set(routes));
for(const p of report.pages){
 assert.equal(p.checks.length,20);
 assert.deepEqual(new Set(p.checks.map(c=>c.id)),new Set(report.rubric.map(c=>c.id)));
 assert.equal(p.score,p.checks.filter(c=>c.passed).length*0.5,'Score must be derived from checks.');
 assert.equal(p.passed,p.checks.filter(c=>c.passed).length);
}
const out=fs.existsSync('dist/client/index.html')?'dist/client':'dist',digest=crypto.createHash('sha256');
for(const route of routes)digest.update(route+'\n'+fs.readFileSync(out+(route==='/'?'':route)+'/index.html','utf8')+'\n');
assert.equal(report.inputDigest,digest.digest('hex'),'Report must describe the current build.');

const errors=[],downloads=[];
const virtualConsole=new VirtualConsole();virtualConsole.on('jsdomError',e=>errors.push(e.message));
const dom=new JSDOM(html,{
 url:'https://report.local/',runScripts:'dangerously',virtualConsole,
 beforeParse(window){
  window.HTMLElement.prototype.scrollIntoView=function(){};
  window.HTMLAnchorElement.prototype.click=function(){};
  window.URL.createObjectURL=blob=>{downloads.push(blob);return 'blob:report-test';};
  window.URL.revokeObjectURL=()=>{};
  window.Blob=class{constructor(parts,options){this.parts=parts;this.type=options.type;}};
 }
});
const {window:w}=dom,d=w.document;
assert.deepEqual(JSON.parse(d.getElementById('report-data').textContent),report);
if(report.marketReviews?.length){
 assert.equal(report.marketReviews[0].route,'/team');
 assert.equal(report.marketReviews[0].overallScore,null);
 assert.ok(d.querySelector('#team-market-review')?.textContent.includes('Unverified'));
}
assert.equal(d.querySelectorAll('#rows tr').length,84);
const filter=d.getElementById('group');filter.value='Specialist services';filter.dispatchEvent(new w.Event('input'));
assert.equal(d.querySelectorAll('#rows tr').length,38,'Group filter must show all specialists.');
filter.value='';filter.dispatchEvent(new w.Event('input'));
const search=d.getElementById('search');search.value='Kotlin';search.dispatchEvent(new w.Event('input'));
assert.equal(d.querySelectorAll('#rows tr').length,1,'Stack search must inspect the embedded architecture.');
assert.match(d.querySelector('#rows').textContent,/\/work\/intake/);
search.value='';search.dispatchEvent(new w.Event('input'));
for(const route of ['/work/intake','/services/ecommerce/shopify-development','/privacy']){
 w.history.replaceState(null,'','#page='+encodeURIComponent(route));w.dispatchEvent(new w.Event('hashchange'));
 const detail=d.getElementById('detail');assert.equal(detail.hidden,false);
 assert.equal(detail.querySelectorAll('.check-grid article').length,20);
 assert.ok(detail.textContent.includes(route));
}
w.history.replaceState(null,'','#page='+encodeURIComponent('/work/intake'));w.dispatchEvent(new w.Event('hashchange'));
assert.ok(d.getElementById('detail').textContent.includes('Illustrative scenario and proposed technology choices'));
assert.equal(d.querySelectorAll('#detail .stack tbody tr').length,5);
d.getElementById('json').click();d.getElementById('csv').click();
assert.equal(downloads.length,2);
assert.deepEqual(JSON.parse(downloads[0].parts.join('')),report,'The JSON export must include the complete evidence.');
const csv=downloads[1].parts.join('');
assert.equal(csv.split('\r\n').length,85,'CSV export needs a header plus all 84 rows.');
assert.ok(csv.includes('"/work/intake"'));
assert.equal(errors.length,0,errors.join('\n'));
w.close();
console.log(JSON.stringify({pages:report.pages.length,scoreDerivation:true,currentBuildDigest:true,embeddedData:true,groupAndStackFilters:true,detailViews:true,jsonAndCsvDownloads:true,javascriptErrors:0},null,2));
