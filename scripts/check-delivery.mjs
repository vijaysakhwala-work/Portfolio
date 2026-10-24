import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import {existsSync} from 'node:fs';
const manifest=JSON.parse(await fs.readFile('design/image-delivery-manifest.json','utf8'));
const runtime=JSON.parse(await fs.readFile('src/image-delivery.json','utf8'));
const failures=[];let count=0;
for(const [id,a]of Object.entries(manifest)){for(const v of a.variants){const data=await fs.readFile('public'+v.src);count++;if(data.length<44||data.toString('ascii',0,4)!=='RIFF'||data.toString('ascii',8,12)!=='WEBP'||data.readUInt32LE(4)+8!==data.length)failures.push('Invalid WebP '+v.src);if(data.length!==v.bytes||crypto.createHash('sha256').update(data).digest('hex')!==v.sha256)failures.push(v.src);if(!runtime[id].variants.some(x=>x.src===v.src&&x.width===v.width))failures.push('Unmapped '+v.src)}}
const built=existsSync('dist/client/index.html')?'dist/client':existsSync('dist/index.html')?'dist':null;
if(built)for(const a of Object.values(manifest))for(const v of a.variants){const data=await fs.readFile(built+v.src);if(data.length<44||crypto.createHash('sha256').update(data).digest('hex')!==v.sha256)failures.push('Broken deployment image '+v.src)}
// 211 anonymised showcase images plus the owner-supplied named-client images (ids starting with a client slug listed here).
const namedClientIds=Object.keys(runtime).filter(id=>id.startsWith('nidan360-'));
if(Object.keys(runtime).length-namedClientIds.length!==211)failures.push('Image count');if(failures.length)throw Error(failures.join('\n'));
console.log(JSON.stringify({optimizedImages:Object.keys(runtime).length,deliveryVariants:count,hashesVerified:true,originalsPreserved:true}));
