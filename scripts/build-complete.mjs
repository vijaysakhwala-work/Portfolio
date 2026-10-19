import fs from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
const root=process.cwd();
function run(command,args,cwd=root){const p=spawnSync(command,args,{cwd,stdio:'inherit',env:process.env});if(p.status!==0)process.exit(p.status||1)}
await fs.rm('dist',{recursive:true,force:true,maxRetries:5,retryDelay:200});
run('npm',['run','build:frontend']);
run('node',['scripts/record-build-metrics.mjs']);
run('npm',['run','check:frontend']);
run('npm',['test']);
await fs.rm('server-runtime/public',{recursive:true,force:true,maxRetries:5,retryDelay:200});
await fs.rename('dist','server-runtime/public');
// Preserve frontend chunk provenance before the server builder writes its own Vite manifest.
await fs.copyFile('server-runtime/public/.vite/manifest.json','server-runtime/public/.vite/portfolio-manifest.json');
const helper='/root/.codex/plugins/cache/openai-curated-remote/sites/1.0.0/scripts/build-site.mjs';
if(existsSync(helper))run('node',[helper],path.join(root,'server-runtime'));else run('npm',['run','build'],path.join(root,'server-runtime'));
await fs.rm('dist',{recursive:true,force:true,maxRetries:5,retryDelay:200});
await fs.rename('server-runtime/dist','dist');
run('node',['scripts/trim-build.mjs']);
console.log('Complete portfolio and enquiry Worker built.');
