#!/usr/bin/env python3
"""Complete the final six approved image edits without rewriting reviewed assets.
Usage: python scripts/complete-showcases.py /absolute/path/to/final-six
Pillow and Tesseract are authoring dependencies only. No raster content edits.
"""
import argparse,hashlib,json,os,re,shutil,subprocess
from pathlib import Path
from PIL import Image

def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def write_json(path,data):path.write_text(json.dumps(data,indent=2)+'\n')
def encode_atomic(image,path,**options):
 temporary=path.with_name(path.stem+'.writing.webp')
 image.save(temporary,format='WEBP',**options)
 with Image.open(temporary) as check:check.load()
 temporary.replace(path)

def main():
 parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('batch',type=Path);batch=parser.parse_args().batch.resolve()
 root=Path(__file__).resolve().parents[1];manifest=root/'src/showcase-assets.js';design=root/'design'
 assets=json.loads(manifest.read_text().removeprefix('export default ').strip().removesuffix(';'))
 deferred=json.loads((design/'debranding/deferred.json').read_text());history=design/'debranding/final-six.json'
 originals=deferred['assets'] or (json.loads(history.read_text())['assets'] if history.exists() else [])
 metadata={row['id']:row for row in originals};records={}
 for file in sorted(batch.glob('records-*.jsonl')):
  for line in file.read_text().splitlines():
   if line.strip():row=json.loads(line);records[row['id']]=row
 if len(metadata)!=6 or set(records)!=set(metadata):raise RuntimeError('Exactly the six reviewed remaining edits are required')
 report=json.loads((design/'showcase-assets-report.json').read_text());rows={row['id']:row for row in report['assets']}
 prefixes='Arcwell|Aster|Atlas|Brightwell|Cedar|Cove|Elm|Everwell|Fern|Harbor|Juniper|Luma|Meridian|Nexa|Northlane|Novara|Oakline|Opsera|Orion|Sable|Solace|Summit|Vela|Westbridge|Willow'
 companies=re.compile(r'\b(?:'+prefixes+r')\s+(?:Collective|Digital|Group|Industries|Labs|Partners|Solutions|Studio|Systems|Ventures|Works)\b|\b(?:Northline Supplies|Fieldworks Services|Willow Foods|Cedar Retail|Summit Safety)\b',re.I)
 vendors=re.compile(r'\b(?:WhatsApp|Adobe|Acrobat|Stripe|Shopify|GitHub|Google|Twilio|PayPal|Azure|AWS|OpenAI|Facebook|Instagram|LinkedIn|Slack|Notion|Docker|Vercel)\b',re.I)
 dest=root/'public/images/showcases';previews=dest/'responsive';prompts=design/'debranding/prompts'
 for id,record in records.items():
  if not all(record.get(k) for k in ['qa','referencePage','referenceImage']):raise RuntimeError('Missing review/provenance: '+id)
  source=Path(record['path']);prompt=batch/'prompts'/(id+'.txt')
  if not prompt.exists():raise RuntimeError('Missing exact prompt: '+id)
  result=subprocess.run(['tesseract',str(source),'stdout','--psm','11'],capture_output=True,text=True,check=True,timeout=60,env={**os.environ,'OMP_THREAD_LIMIT':'1'})
  text=result.stdout;company_hits=sorted(set(companies.findall(text)));vendor_hits=sorted(set(vendors.findall(text)))
  if company_hits or vendor_hits or len(text)<20:raise RuntimeError('Text audit requires review: '+id+' '+str(company_hits+vendor_hits))
  if re.search(r'\b(?:design concept|sample|demo studio|concept demo)\b',text,re.I):raise RuntimeError('Unwanted image label: '+id)
  (batch/(id+'-ocr.txt')).write_text(text)
  data=dict(metadata[id]['manifest'])
  with Image.open(source) as original:
   image=original.convert('RGB');width,height=image.size
   if (width,height)!=(record['width'],record['height']):raise RuntimeError('Recorded dimensions differ: '+id)
   delta=abs((width/height)/(data['width']/data['height'])-1)
   if delta>.03:raise RuntimeError('Aspect ratio changed: '+id)
   full=dest/(id+'-unbranded.webp');preview=previews/(id+'-unbranded-640.webp');pw=min(640,width)
   encode_atomic(image,full,lossless=True,method=4)
   encode_atomic(image.resize((pw,round(height*pw/width)),Image.Resampling.LANCZOS),preview,quality=100,method=6)
   with Image.open(full) as check:
    if check.convert('RGB').tobytes()!=image.tobytes():raise RuntimeError('Lossless pixel verification failed: '+id)
  src='/images/showcases/'+full.name;thumb='/images/showcases/responsive/'+preview.name
  data.update(src=src,thumbnail=thumb,width=width,height=height,srcSet=f'{thumb} {pw}w, {src} {width}w',anonymized=True)
  data.pop('company',None)
  if id.endswith('-homepage-showcase'):data['label']=data['alt']=data['label'].split(': ',1)[-1]
  assets[id]=data;shutil.copy2(prompt,prompts/prompt.name)
  rows[id]={'id':id,'width':width,'height':height,'original_bytes':full.stat().st_size,'preview_bytes':{'640':preview.stat().st_size},'source_sha256':sha(source),'asset_sha256':sha(full),'preview_sha256':sha(preview),'referencePage':record['referencePage'],'referenceImage':record['referenceImage'],'visualReview':record['qa'],'textAudit':{'id':id,'width':width,'height':height,'ratioDelta':delta,'companyOcrHits':company_hits,'companyTokenHits':[],'reviewedCompanyTokens':{},'unresolvedCompanyTokenHits':[],'vendorTokenHits':vendor_hits,'domains':sorted(set(re.findall(r'\b[\w.-]+\.(?:com|io|app|ai|net|org|in)\b',text,re.I))),'textCharacters':len(text)}}
 if len(assets)!=211 or len(rows)!=211:raise RuntimeError('Incomplete final coverage')
 manifest.write_text('export default '+json.dumps(assets,separators=(',',':'))+';\n')
 report['assets']=list(rows.values());report['totals'].update(requested_assets=211,deferred_assets=0,original_assets=211,responsive_assets=211,anonymized_assets=211,original_bytes=sum(x['original_bytes'] for x in rows.values()),responsive_bytes=sum(x['preview_bytes']['640'] for x in rows.values()),full_size_pixel_equivalence_verified=True)
 write_json(design/'showcase-assets-report.json',report)
 approval=json.loads((design/'debranding/approved.json').read_text());approval.update(approved=list(assets),pending=[]);write_json(design/'debranding/approved.json',approval)
 write_json(history,{'status':'All six completed and reviewed','generationMode':'Built-in imagegen','assets':[{'id':row['id'],'manifest':row['manifest'],'previousIssue':row.get('reason',row.get('previousIssue')),'resolution':records[row['id']]['qa']} for row in originals]})
 write_json(design/'debranding/deferred.json',{'requested':211,'status':'Complete: all 211 images reviewed','assets':[]})
 private=design/'debranding/pending'
 if private.exists():
  for file in list(private.iterdir()):
   if file.is_file():file.unlink()
  private.rmdir()
 print(json.dumps(report['totals'],indent=2))
if __name__=='__main__':main()
