// Checks the long-form content in src/content against the content brief: shape, lengths, links, banned phrases.
// Errors fail the run. Warnings are printed for a human to judge.
import {services,routes} from '../src/catalog.js';
import {serviceFull as serviceDetails,postsFull as posts} from '../src/content/sources.js';
import {POST_ORDER} from '../src/content/order.js';
import {wordCount} from '../src/content/text.js';

const errors=[],warns=[];
const E=(where,msg)=>errors.push(where+': '+msg);
const W=(where,msg)=>warns.push(where+': '+msg);
const routeSet=new Set(routes);
const words=s=>String(s||'').replace(/\[([^\]]+)\]\([^)]*\)/g,'$1').replace(/\*\*/g,'').split(/\s+/).filter(Boolean).length;
const range=(where,label,n,min,max)=>{if(n<min||n>max)E(where,`${label} is ${n}, expected ${min}-${max}`)};
const BANNED=/\b(cutting-edge|leverag(?:e|es|ed|ing)|seamless(?:ly)?|revolutioni[sz]e[sd]?|game-changing|supercharg\w*|synerg\w*|holistic|delve[sd]?)\b/i;
const SOFT=/\b(robust|unlock(?:s|ed|ing)?|in today's|it's important to note|it is important to note)\b/i;
const DASH=/[–—]/;

/* walk every string in an object, checking dashes, banned words and links */
function scan(where,node){
  if(typeof node==='string'){
    if(DASH.test(node))E(where,'contains an em or en dash: '+node.slice(0,70));
    if(BANNED.test(node))E(where,'banned word "'+node.match(BANNED)[0]+'"');
    if(SOFT.test(node))W(where,'filler phrase "'+node.match(SOFT)[0]+'"');
    if(/<[a-z!/][^>]*>/i.test(node))E(where,'contains HTML');
    if(/`/.test(node))E(where,'contains a backtick');
    for(const m of node.matchAll(/\]\(([^)\s]*)\)/g)){
      const u=m[1];
      if(/^https:\/\//.test(u))continue;
      const p=u.split(/[?#]/)[0];
      if(!routeSet.has(p))E(where,'link to unknown path '+u);
    }
    if(/\[[^\]]*\](?!\()/.test(node)&&!/\]\(/.test(node))W(where,'stray square brackets');
    return;
  }
  if(Array.isArray(node))return node.forEach((x,i)=>scan(where+'['+i+']',x));
  if(node&&typeof node==='object'){if(node.t==='code'){scan(where+'.file',node.file);return}for(const [k,v] of Object.entries(node))scan(where+'.'+k,v)}
}
const seen={titles:new Map(),descs:new Map()};
function seo(where,o){
  if(!o.seoTitle)return E(where,'missing seoTitle');
  if(o.seoTitle.length>50)E(where,`seoTitle is ${o.seoTitle.length} chars (max 50): ${o.seoTitle}`);
  if(!o.metaDescription||o.metaDescription.length<130||o.metaDescription.length>165)E(where,`metaDescription is ${o.metaDescription?.length} chars, expected 130-165`);
  if(!o.keyword)E(where,'missing keyword');
  else if(!(o.seoTitle+' '+o.metaDescription).toLowerCase().includes(o.keyword.toLowerCase().split(' ')[0]))W(where,'primary keyword not near the title or description: '+o.keyword);
  for(const [map,v,l] of [[seen.titles,o.seoTitle,'seoTitle'],[seen.descs,o.metaDescription,'metaDescription']]){if(map.has(v))E(where,`duplicate ${l} also used by ${map.get(v)}`);map.set(v,where)}
}
function faq(where,list,n,minW,maxW){
  range(where,'faq count',list?.length||0,n[0],n[1]);
  (list||[]).forEach((f,i)=>{if(!f.q||!/\?$/.test(f.q))W(where+`.faq[${i}]`,'question should end with ?');const w=words(f.a);if(w<minW||w>maxW)W(where+`.faq[${i}]`,`answer is ${w} words (${minW}-${maxW})`);if(/\$\s?\d|\b\d+\s*(weeks?|months?|days?)\b/i.test(f.a))W(where+`.faq[${i}]`,'contains a number that looks like a price or timeline')});
}

/* ---------- services ---------- */
for(const s of services){
  const w='service:'+s.slug,d=serviceDetails[s.slug];
  if(!d){E(w,'no details');continue}
  scan(w,d);seo(w,d);
  range(w,'secondary keywords',d.keywords?.length||0,4,6);
  range(w,'definition words',words(d.definition),30,65);
  range(w,'overview paragraphs',d.overview?.length||0,2,2);
  range(w,'build items',d.build?.length||0,5,6);
  range(w,'aiUses',d.aiUses?.length||0,4,4);
  range(w,'benefits',d.benefits?.length||0,4,4);
  range(w,'deliverables',d.deliverables?.length||0,5,6);
  range(w,'idealFor',d.idealFor?.length||0,4,4);
  range(w,'aiOneLiner words',words(d.aiOneLiner),4,22);
  if(!d.aiTitle||!d.aiIntro||!d.aiGuardrail)E(w,'missing ai fields');
  faq(w,d.faq,[5,5],35,100);
  for(const r of d.related||[])if(!POST_ORDER.includes(r))E(w,'related slug not a post: '+r);
  range(w,'related',d.related?.length||0,2,3);
  if(s.slug==='ai'){range(w,'aiLadder',d.aiLadder?.length||0,4,4);range(w,'aiSafety',d.aiSafety?.length||0,5,5)}
  for(const sub of s.subs){
    const sw=w+'/'+sub.slug,sd=d.subs?.[sub.slug];
    if(!sd){E(sw,'no sub details');continue}
    seo(sw,sd);
    range(sw,'definition words',words(sd.definition),25,60);
    range(sw,'includes',sd.includes?.length||0,4,5);
    range(sw,'aiPoints',sd.aiPoints?.length||0,3,3);
    range(sw,'aiText words',words(sd.aiText),40,90);
    range(sw,'bestFor',sd.bestFor?.length||0,3,4);
    range(sw,'deliverables',sd.deliverables?.length||0,4,5);
    if(!sd.aiTitle)E(sw,'missing aiTitle');
    faq(sw,sd.faq,[3,3],30,80);
  }
  for(const k of Object.keys(d.subs||{}))if(!s.subs.some(x=>x.slug===k))E(w,'details for unknown sub '+k);
}

/* ---------- posts ---------- */
const CATS=['ECOMMERCE','AI & AUTOMATION','PRODUCT ENGINEERING','WEB DEVELOPMENT','MOBILE','SOFTWARE','DEVOPS & CLOUD','SEO & MARKETING'];
const today=new Date().toISOString().slice(0,10);
if(posts.length!==POST_ORDER.length)E('posts',`expected ${POST_ORDER.length} posts, found ${posts.length}`);
const slugs=new Set();
for(const p of posts){
  const w='post:'+p.slug;
  if(slugs.has(p.slug))E(w,'duplicate slug');slugs.add(p.slug);
  if(!routeSet.has('/blog/'+p.slug))E(w,'not in routes');
  scan(w,p);seo(w,p);
  if(!p.title||p.title.length>72)E(w,'title missing or over 72 chars');
  if(!CATS.includes(p.category))E(w,'unknown category '+p.category);
  if(!/^\d{4}-\d{2}-\d{2}$/.test(p.published)||p.published>today)E(w,'bad published date '+p.published);
  if(!/^\d{4}-\d{2}-\d{2}$/.test(p.updated)||p.updated<p.published)E(w,'bad updated date');
  if((p.summary||'').length>160||!p.summary)E(w,'summary missing or over 160 chars');
  range(w,'secondary keywords',p.keywords?.length||0,4,6);
  range(w,'takeaways',p.takeaways?.length||0,4,5);
  if(!p.cover?.alt||!p.cover?.brief)E(w,'cover needs alt and brief');
  else if(p.cover.alt.length>125)E(w,'cover alt over 125 chars');
  const body=p.body||[];
  if(body[0]?.t!=='p')E(w,'body must start with a p block');
  const firstH2=body.findIndex(b=>b.t==='h2');
  if(firstH2<1||firstH2>3)E(w,'first h2 should follow 1-2 intro paragraphs');
  const h2=body.filter(b=>b.t==='h2');
  range(w,'h2 count',h2.length,6,10);
  if(new Set(h2.map(b=>b.x.toLowerCase())).size!==h2.length)E(w,'duplicate h2 text');
  const figs=body.filter(b=>b.t==='figure');
  range(w,'figure slots',figs.length,2,4);
  if(body[0]?.t==='figure')E(w,'first block is a figure');
  figs.forEach((f,i)=>{if(!f.alt||!f.brief)E(w,`figure ${i} needs alt and brief`);else if(f.alt.length>125)E(w,`figure ${i} alt over 125 chars`)});
  if(!body.some(b=>b.t==='table'||b.t==='ol'||b.t==='ul'))E(w,'needs a table or list');
  for(const b of body){
    if(!['h2','h3','p','ul','ol','table','callout','code','figure'].includes(b.t))E(w,'unknown block '+b.t);
    if(b.t==='p'&&words(b.x)>140)W(w,'long paragraph ('+words(b.x)+' words): '+b.x.slice(0,50));
    if(b.t==='table'&&b.rows.some(r=>r.length!==b.head.length))E(w,'table row length mismatch: '+b.caption);
  }
  const wc=wordCount(p);
  if(wc<1400||wc>2300)W(w,`${wc} words`);
  faq(w,p.faq,[4,5],35,100);
  range(w,'related services',p.services?.length||0,2,4);
  for(const sp of p.services||[])if(!routeSet.has(sp))E(w,'related service path unknown '+sp);
  const internal=JSON.stringify(body).match(/\]\(\/[^)]*\)/g)||[];
  if(new Set(internal).size<3)W(w,'fewer than 3 distinct internal links in the body');
  if(!(p.title+' '+p.seoTitle).toLowerCase().includes(p.keyword.toLowerCase().split(/\s+/)[0]))W(w,'keyword missing from title');
}
console.log(`Checked ${services.length} services, ${services.reduce((n,s)=>n+s.subs.length,0)} sub-services and ${posts.length} posts.`);
if(warns.length){console.log('\nWarnings ('+warns.length+'):\n  '+warns.join('\n  '))}
if(errors.length){console.error('\nErrors ('+errors.length+'):\n  '+errors.join('\n  '));process.exit(1)}
console.log('\nContent OK.');
