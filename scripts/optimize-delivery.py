"""Create compressed delivery variants while preserving approved originals."""
from pathlib import Path
from PIL import Image
from concurrent.futures import ThreadPoolExecutor
import json,hashlib,os,io
root=Path(__file__).resolve().parents[1]
assets=json.loads((root/'src/showcase-assets.js').read_text().removeprefix('export default ').rstrip(';\n'))
out=root/'public/images/delivery';out.mkdir(parents=True,exist_ok=True)
def encode(item):
 key,a=item;source=root/('public'+a['src']);variants=[]
 with Image.open(source) as im:
  for width in sorted(set(min(w,im.width) for w in (480,960,1440))):
   height=round(im.height*width/im.width);path=out/f'{key}-{width}.webp'
   revised=out/f'{key}-{width}-r2.webp'
   if revised.exists():path=revised
   valid=False
   if path.exists():
    try:
     with Image.open(path) as check: check.load();valid=check.size==(width,height)
    except Exception: pass
   if not valid:
    buffer=io.BytesIO()
    im.resize((width,height),Image.Resampling.LANCZOS).save(buffer,'WEBP',quality=92,method=6)
    encoded=buffer.getvalue()
    with Image.open(io.BytesIO(encoded)) as check: check.load()
    temp=path.with_suffix('.webp.tmp');temp.write_bytes(encoded);os.replace(temp,path)
   b=path.read_bytes();variants.append({'src':'/images/delivery/'+path.name,'width':width,'height':height,'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()})
 return key,{'variants':variants,'originalBytes':source.stat().st_size}
with ThreadPoolExecutor(max_workers=5) as pool:rows=dict(pool.map(encode,assets.items()))
(root/'design/image-delivery-manifest.json').write_text(json.dumps(rows,separators=(',',':'))+'\n')
runtime={key:{'variants':[{'src':v['src'],'width':v['width']} for v in a['variants']]} for key,a in rows.items()}
(root/'src/image-delivery.json').write_text(json.dumps(runtime,separators=(',',':'))+'\n')
before=sum(a['originalBytes'] for a in rows.values());after=sum(a['variants'][-1]['bytes'] for a in rows.values())
report={'images':len(rows),'originalBytes':before,'largestDeliveryBytes':after,'reductionPercent':round(100*(1-after/before),1),'variants':sum(len(a['variants']) for a in rows.values()),'originalsUnchanged':True,'quality':92,'widths':[480,960,1440]}
(root/'design/image-delivery-report.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report),flush=True)
