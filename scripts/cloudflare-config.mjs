// Prepares dist/server/wrangler.json for a deploy to your own Cloudflare account.
// The build writes a placeholder database id and the template Worker name; this fills in the real values.
// Usage (after `npm run build`):
//   node scripts/cloudflare-config.mjs --database-id <D1 database id> [--name cubusify] [--domain cubusify.com]
//        [--from "Cubusify <enquiries@cubusify.com>"] [--to hello@cubusify.com] [--no-domain]
// It never reads or writes secrets. RESEND_API_KEY is set separately with `wrangler secret put`.
import fs from 'node:fs';

const args=Object.fromEntries(process.argv.slice(2).reduce((pairs,x,i,all)=>x.startsWith('--')?[...pairs,[x.slice(2),all[i+1]]]:pairs,[]));
const file='dist/server/wrangler.json';
if(!fs.existsSync(file))throw Error('Run `npm run build` first: '+file+' was not found.');
const id=args['database-id'];
if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id||''))throw Error('Pass --database-id with the id printed by `wrangler d1 create` (it looks like 1234abcd-....).');
if(/^0{8}-/.test(id))throw Error('That is the placeholder id from the build, not a real database id.');
const config=JSON.parse(fs.readFileSync(file,'utf8'));
config.name=args.name||'cubusify';
config.d1_databases=[{binding:'DB',database_name:args['database-name']||'cubusify-enquiries',database_id:id}];
config.vars={...config.vars,ENQUIRY_FROM:args.from||'Cubusify <enquiries@cubusify.com>',ENQUIRY_TO:args.to||'hello@cubusify.com'};
const domain=args.domain||'cubusify.com',testOnly=process.argv.includes('--no-domain');
// --no-domain: deploy only to the free workers.dev address for a test, without touching your real domain.
config.routes=testOnly?[]:[{pattern:domain,custom_domain:true}];
config.workers_dev=true;
fs.writeFileSync(file,JSON.stringify(config));
console.log(JSON.stringify({worker:config.name,database:config.d1_databases[0].database_name,customDomain:testOnly?'none (test deploy to workers.dev)':domain,vars:Object.keys(config.vars)},null,1));
