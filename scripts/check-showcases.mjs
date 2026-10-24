import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import allAssets from '../src/showcase-assets.js';
// Named-client images (owner-supplied, branded) are checked separately below; the 211-image anonymised batch is checked as before.
const assets=Object.fromEntries(Object.entries(allAssets).filter(([,a])=>!a.namedClient)),named=Object.entries(allAssets).filter(([,a])=>a.namedClient);
const report=JSON.parse(await fs.readFile('design/showcase-assets-report.json','utf8'));
const approval=JSON.parse(await fs.readFile('design/debranding/approved.json','utf8'));
const deferred=JSON.parse(await fs.readFile('design/debranding/deferred.json','utf8'));
const rows=new Map(report.assets.map(x=>[x.id,x])),failures=[],expected=new Set(),ids=Object.keys(assets);
if(ids.length!==211||rows.size!==211||new Set(approval.approved).size!==211||approval.pending.length!==0||deferred.assets.length!==0)failures.push('Incomplete final 211-image approved batch');
function size(b){
 if(b.toString('ascii',0,4)!=='RIFF'||b.toString('ascii',8,12)!=='WEBP')throw Error('Not WebP');
 for(let o=12;o+8<b.length;){const kind=b.toString('ascii',o,o+4),n=b.readUInt32LE(o+4),s=o+8;
  if(kind==='VP8L'){const bits=b.readUInt32LE(s+1);return[(bits&0x3fff)+1,((bits>>>14)&0x3fff)+1]}
  if(kind==='VP8 ')return[b.readUInt16LE(s+6)&0x3fff,b.readUInt16LE(s+8)&0x3fff];
  if(kind==='VP8X')return[b.readUIntLE(s+4,3)+1,b.readUIntLE(s+7,3)+1];o=s+n+n%2;
 }throw Error('Missing WebP dimensions');
}
for(const [id,a]of Object.entries(assets)){
 const row=rows.get(id),audit=row?.textAudit;
 if(!a.anonymized||a.company||!row?.visualReview||!row?.referencePage||!row?.referenceImage||!approval.approved.includes(id))failures.push(id+': missing review or approval');
 if(!a.src.endsWith(id+'-unbranded.webp')||!a.thumbnail.endsWith(id+'-unbranded-640.webp'))failures.push(id+': old filename');
 if(!audit||audit.companyOcrHits?.length||(audit.unresolvedCompanyTokenHits??audit.companyTokenHits)?.length||audit.vendorTokenHits?.length||audit.textCharacters<20)failures.push(id+': unresolved text audit');
 for(const [url,hash,w,h]of[[a.src,row?.asset_sha256,a.width,a.height],[a.thumbnail,row?.preview_sha256,Math.min(640,a.width),Math.round(a.height*Math.min(640,a.width)/a.width)]]){
  const path='public'+url;expected.add(path);
  try{const b=await fs.readFile(path);if(crypto.createHash('sha256').update(b).digest('hex')!==hash)failures.push(id+': hash differs');const [ew,eh]=size(b);if(ew!==w||eh!==h)failures.push(id+': dimension mismatch')}catch(e){failures.push(id+': '+e.message)}
 }
}
for(const [id,a]of named){
 if(!a.client||!a.url?.startsWith('https://')||!a.alt||!a.label||!a.src.startsWith('/images/clients/'))failures.push(id+': named-client metadata incomplete');
 try{const b=await fs.readFile('public'+a.src),[w,h]=size(b);if(w!==a.width||h!==a.height)failures.push(id+': dimension mismatch')}catch(e){failures.push(id+': '+e.message)}
}
for(const p of await fs.readdir('public/images/showcases',{recursive:true})){const full='public/images/showcases/'+p.replaceAll('\\','/');if((await fs.stat(full)).isFile()&&!expected.has(full))failures.push('Stray showcase file: '+p)}
if(failures.length)throw Error(failures.join('\n'));
console.log(JSON.stringify({requestedImages:211,anonymizedImages:ids.length,deferredImages:approval.pending.length,approvedImages:approval.approved.length,verifiedFiles:expected.size,oldBrandedFiles:0,visualReviewRecords:true,textAudits:true,hashesAndDimensions:true},null,2));
