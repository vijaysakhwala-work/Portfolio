import {existsSync} from 'node:fs';
const output=existsSync('dist/client/index.html')?'dist/client':'dist';
import fs from 'node:fs';
import zlib from 'node:zlib';
const metric=pat=>{const file=fs.readdirSync(output+'/assets').find(n=>pat.test(n));const bytes=fs.readFileSync(output+'/assets/'+file);return {file,rawBytes:bytes.length,gzipBytes:zlib.gzipSync(bytes).length}};
const baseline={js:{rawBytes:624964,gzipBytes:184033},css:{rawBytes:214909,gzipBytes:41375}};
const current={js:metric(/^index-.*\.js$/),css:metric(/^index-.*\.css$/)};
const report={baselineZip:'cubusify-react.zip',baseline,current,sharedJsGzipReductionPercent:Math.round((1-current.js.gzipBytes/baseline.js.gzipBytes)*100),sharedCssGzipReductionPercent:Math.round((1-current.css.gzipBytes/baseline.css.gzipBytes)*100),measurement:'Fresh Vite builds of the uploaded ZIP and revised project. Build transfer sizes only; route modules and images are additional. Live loading time and Core Web Vitals were not measured.'};
fs.mkdirSync('design',{recursive:true});fs.writeFileSync('design/performance-comparison.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
