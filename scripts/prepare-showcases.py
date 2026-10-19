#!/usr/bin/env python3
"""Import reviewed anonymized assets and explicitly documented quota deferrals. Usage: python scripts/prepare-showcases.py /path/to/bulk-debrand
Requires Pillow for authoring only. Branded donor imports are unsupported.
"""
import argparse,concurrent.futures,hashlib,json,shutil
from pathlib import Path
from PIL import Image

def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def valid_webp(p,size):
 try:
  with Image.open(p) as im:im.load();return im.format=='WEBP' and im.size==size
 except (OSError,ValueError):return False
def main():
 parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('batch',type=Path);batch=parser.parse_args().batch.resolve()
 root=Path(__file__).resolve().parents[1];manifest=root/'src/showcase-assets.js'
 assets=json.loads(manifest.read_text().removeprefix('export default ').strip().removesuffix(';'));records={}
 prior=root/'design/debranding/deferred.json'
 if prior.exists():
  for row in json.loads(prior.read_text())['assets']:assets.setdefault(row['id'],row['manifest'])
 for p in sorted(batch.glob('records-*.jsonl')):
  for line in p.read_text().splitlines():
   if line.strip():x=json.loads(line);records[x['id']]=x
 deferred=json.loads((batch/'deferred.json').read_text()) if (batch/'deferred.json').exists() else {'requested':len(assets),'assets':[]}
 pending={x['id'] for x in deferred['assets']}
 if (set(records)-pending)!=(set(assets)-pending):raise RuntimeError('Undocumented incomplete batch')
 assets={k:v for k,v in assets.items() if k not in pending};records={k:v for k,v in records.items() if k not in pending}
 audit={x['id']:x for x in json.loads((batch/'audit.json').read_text())}
 if not set(assets)<=set(audit):raise RuntimeError('Full text audit required')
 for id,x in records.items():
  if not all(x.get(k) for k in ['qa','referencePage','referenceImage']):raise RuntimeError('Missing visual QA/provenance: '+id)
  if audit[id]['companyOcrHits'] or audit[id].get('unresolvedCompanyTokenHits',audit[id].get('companyTokenHits')) or audit[id].get('vendorTokenHits'):raise RuntimeError('Unresolved OCR brand match: '+id)
 dest=root/'public/images/showcases';small=dest/'responsive';small.mkdir(parents=True,exist_ok=True)
 prompts=root/'design/debranding/prompts';prompts.mkdir(parents=True,exist_ok=True)
 def encode(pair):
  id,a=pair;x=records[id];source=Path(x['path']);source=source if source.is_absolute() else batch.parent/source
  full=dest/(id+'-unbranded.webp');preview=small/(id+'-unbranded-640.webp')
  cached_full=batch/'encoded'/full.name;cached_preview=batch/'encoded'/preview.name
  with Image.open(source) as original:
   w,h=original.size
   if (w,h)!=(x['width'],x['height']):raise RuntimeError('Size mismatch: '+id)
   pw=min(640,w)
   if cached_full.exists() and cached_preview.exists() and min(cached_full.stat().st_mtime,cached_preview.stat().st_mtime)>source.stat().st_mtime and valid_webp(cached_full,(w,h)) and valid_webp(cached_preview,(pw,round(h*pw/w))):
    shutil.copy2(cached_full,full);shutil.copy2(cached_preview,preview)
   else:
    image=original.convert('RGB');image.save(full,format='WEBP',lossless=True,method=4)
    image.resize((pw,round(h*pw/w)),Image.Resampling.LANCZOS).save(preview,format='WEBP',quality=100,method=6)
  with Image.open(source) as original, Image.open(full) as encoded:
   if original.convert('RGB').tobytes()!=encoded.convert('RGB').tobytes():raise RuntimeError('Lossless pixel verification failed: '+id)
  src='/images/showcases/'+full.name;thumb='/images/showcases/responsive/'+preview.name
  a.update(src=src,thumbnail=thumb,width=w,height=h,srcSet=f'{thumb} {pw}w, {src} {w}w',anonymized=True);a.pop('company',None)
  if id.endswith('-homepage-showcase'):a['label']=a['alt']=a['label'].split(': ',1)[-1]
  prompt=batch/'prompts'/(id+'.txt')
  if not prompt.exists():raise RuntimeError('Missing exact prompt: '+id)
  shutil.copy2(prompt,prompts/prompt.name)
  return {'id':id,'width':w,'height':h,'original_bytes':full.stat().st_size,'preview_bytes':{'640':preview.stat().st_size},'source_sha256':sha(source),'asset_sha256':sha(full),'preview_sha256':sha(preview),'referencePage':x['referencePage'],'referenceImage':x['referenceImage'],'visualReview':x['qa'],'textAudit':{k:v for k,v in audit[id].items() if k!='path'}}
 with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:rows=list(pool.map(encode,assets.items()))
 expected={dest/(id+'-unbranded.webp') for id in assets}|{small/(id+'-unbranded-640.webp') for id in assets}
 for p in list(dest.rglob('*')):
  if p.is_file() and p not in expected:p.unlink()
 manifest.write_text('export default '+json.dumps(assets,separators=(',',':'))+';\n')
 totals={'requested_assets':deferred['requested'],'deferred_assets':len(pending),'original_assets':len(rows),'responsive_assets':len(rows),'anonymized_assets':len(rows),'original_bytes':sum(x['original_bytes'] for x in rows),'responsive_bytes':sum(x['preview_bytes']['640'] for x in rows),'originals_byte_identical':False,'no_upscale':True,'full_size_encoding':'lossless WebP','full_size_pixel_equivalence_verified':True,'preview_encoding':'WebP quality 100, method 6','cache_busting_filenames':True,'old_branded_files_removed':True}
 (root/'design/showcase-assets-report.json').write_text(json.dumps({'totals':totals,'assets':rows},indent=2)+'\n')
 (root/'design/debranding/approved.json').write_text(json.dumps({'approved':list(assets),'pending':sorted(pending),'authorization':'User granted approval for all images and instructed to proceed.','rule':'No company names/logos inside showcase images; neutral customer/supplier identifiers; sharp upright text; no browser chrome or concept/sample labels.','preserved_site_branding':'Cubusify site identity, logo, founder portrait remain.'},indent=2)+'\n')
 private=root/'design/debranding/pending';private.mkdir(parents=True,exist_ok=True)
 for row in deferred['assets']:
  source=Path(row.pop('sourcePath'));file=private/(row['id']+'.webp')
  with Image.open(source) as image:image.convert('RGB').save(file,format='WEBP',lossless=True,method=4)
  row['savedSource']='design/debranding/pending/'+file.name
  prompt=batch/'prompts'/(row['id']+'.txt')
  if prompt.exists():shutil.copy2(prompt,prompts/prompt.name)
 (root/'design/debranding/deferred.json').write_text(json.dumps(deferred,indent=2)+'\n')
 print(json.dumps(totals,indent=2))
if __name__=='__main__':main()
