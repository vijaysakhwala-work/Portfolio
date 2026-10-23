import fs from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
const root=process.cwd();
function run(command,args,cwd=root){const p=spawnSync(command,args,{cwd,stdio:'inherit',env:process.env,shell:process.platform==='win32'});if(p.error)console.error(p.error);if(p.status!==0)process.exit(p.status||1)}
// Windows can briefly lock a folder right after a build; retry, then copy instead of renaming.
async function move(from,to){for(let i=0;i<8;i++){try{await fs.rename(from,to);return}catch(e){if(e.code!=='EPERM'&&e.code!=='EBUSY')throw e;await new Promise(r=>setTimeout(r,500))}}await fs.cp(from,to,{recursive:true});await fs.rm(from,{recursive:true,force:true})}
await fs.rm('dist',{recursive:true,force:true,maxRetries:5,retryDelay:200});
run('npm',['run','build:frontend']);
run('node',['scripts/record-build-metrics.mjs']);
run('npm',['run','check:frontend']);
if(process.env.SKIP_TESTS==='1')console.log('SKIP_TESTS=1: the test step was skipped.');else run('npm',['test']);
await fs.rm('server-runtime/public',{recursive:true,force:true,maxRetries:5,retryDelay:200});
await move('dist','server-runtime/public');
// Preserve frontend chunk provenance before the server builder writes its own Vite manifest.
await fs.copyFile('server-runtime/public/.vite/manifest.json','server-runtime/public/.vite/portfolio-manifest.json');
const helper='/root/.codex/plugins/cache/openai-curated-remote/sites/1.0.0/scripts/build-site.mjs';
if(existsSync(helper))run('node',[helper],path.join(root,'server-runtime'));else run('npm',['run','build'],path.join(root,'server-runtime'));
await fs.rm('dist',{recursive:true,force:true,maxRetries:5,retryDelay:200});
await move('server-runtime/dist','dist');
run('node',['scripts/trim-build.mjs']);
console.log('Complete portfolio and enquiry Worker built.');
