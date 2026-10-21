import fs from 'node:fs';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import {standaloneMarketReport} from './seo-market-review-html.mjs';
const review=JSON.parse(fs.readFileSync('design/team-seo-market-review.json','utf8'));
const browser=JSON.parse(fs.readFileSync('design/team-seo-browser-review.json','utf8'));
const score=JSON.parse(fs.readFileSync('design/seo-score-report-updated.json','utf8')).pages.find(p=>p.route==='/team');
assert.equal(review.overallScore,null);
assert.equal(review.localEvidence.technicalImplementationScore,score.score);
for(const row of browser.results){
 assert.equal(row.roleCards,review.localEvidence.roleCards);
 assert.equal(row.engagementModels,review.localEvidence.engagementModels);
 assert.equal(row.processSteps,review.localEvidence.onboardingSteps);
 assert.equal(row.faqCount,review.localEvidence.hiringFAQs);
 assert.equal(row.projectLinks,review.localEvidence.contextualProjectLinks);
 assert.equal(row.serviceLinks,review.localEvidence.contextualServiceLinks);
 assert.equal(row.overflow,false);
}
for(const keyword of review.keywordCandidates){assert.equal(keyword.monthlyUSVolume,null);assert.equal(keyword.difficulty,null);}
const html=standaloneMarketReport(review),dom=new JSDOM(html);
assert.deepEqual(JSON.parse(dom.window.document.getElementById('review-data').textContent),review);
assert.equal(dom.window.document.querySelectorAll('section').length,1);
assert.equal(dom.window.document.querySelectorAll('table').length,4);
dom.window.close();fs.writeFileSync('design/team-seo-market-review.html',html);
console.log(JSON.stringify({route:review.route,market:review.market,factors:review.factors.length,keywordHypotheses:review.keywordCandidates.length,competitorBenchmarks:review.competitors.length,editorialCoverage:review.editorialCoverage.reduce((a,c)=>(a[c.status]=(a[c.status]||0)+1,a),{}),overallScore:null,missingMetricsKeptUnknown:true,browserEvidenceMatches:true,websiteModified:false},null,2));
