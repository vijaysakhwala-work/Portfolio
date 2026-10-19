import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import fs from 'node:fs';
import {handleEnquiry} from '../server-runtime/server/enquiries.mjs';
import {validateEnquiry} from '../src/enquiry-validation.js';
const origin='https://cubusify.test';
function payload(overrides={}){return {name:'Website QA',email:'website-qa@example.com',company:'',phone:'+91 98765 43210',service:'Custom Software',budget:'Let’s discuss',message:'Please review this synthetic enquiry workflow test.',consent:true,website:'',startedAt:Date.now()-5000,requestId:crypto.randomUUID(),source:'/contact',...overrides}}
function request(body,headers={}){return new Request(origin+'/api/enquiries',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json','CF-Connecting-IP':'192.0.2.1',...headers},body:JSON.stringify(body)})}
function database(){
 const sqlite=new DatabaseSync(':memory:');
 for(const file of fs.readdirSync('server-runtime/drizzle').filter(f=>f.endsWith('.sql')))sqlite.exec(fs.readFileSync('server-runtime/drizzle/'+file,'utf8'));
 return {sqlite,prepare(sql){return {bind(...args){return {
  async first(){return sqlite.prepare(sql).get(...args)},
  async run(){const result=sqlite.prepare(sql).run(...args);return {meta:{changes:Number(result.changes)}}}
 }}}}};
}


test('validation rejects invalid fields and allows optional phone/budget',()=>{assert.equal(validateEnquiry(payload({phone:'',budget:''})).valid,true);const v=validateEnquiry(payload({name:'A',email:'bad',phone:'letters',service:'Injected',budget:'unknown',message:'short',consent:false}));assert.deepEqual(Object.keys(v.errors).sort(),['budget','consent','email','message','name','phone','service'])});
test('valid enquiry persists safely and duplicate retries return one reference',async()=>{const DB=database(),data=payload({message:"I need a CRM. '; DROP TABLE enquiries; --"});const first=await handleEnquiry(request(data),{DB});assert.equal(first.status,201);const saved=await first.json();assert.equal(saved.notification,'not_configured');assert.match(saved.reference,/^CB-[A-F\d]{12}$/);const second=await handleEnquiry(request(data),{DB});assert.equal((await second.json()).reference,saved.reference);assert.equal(DB.sqlite.prepare('SELECT COUNT(*) AS n FROM enquiries').get().n,1);const row=DB.sqlite.prepare('SELECT * FROM enquiries').get();assert.equal(row.message,data.message);assert.equal(row.email_status,'not_configured');assert.notEqual(row.client_hash,'192.0.2.1');DB.sqlite.close()});
test('server validates independently and does not persist malformed requests',async()=>{const DB=database();const r=await handleEnquiry(request(payload({email:'not-an-email',message:'short'})),{DB});assert.equal(r.status,422);assert.ok((await r.json()).errors.email);assert.equal(DB.sqlite.prepare('SELECT COUNT(*) AS n FROM enquiries').get().n,0);DB.sqlite.close()});
test('cross-origin, honeypot, timing, oversized and missing storage fail honestly',async()=>{assert.equal((await handleEnquiry(request(payload(),{Origin:'https://elsewhere.test'}),{})).status,403);assert.equal((await handleEnquiry(request(payload({website:'bot.example'})),{})).status,400);assert.equal((await handleEnquiry(request(payload({startedAt:Date.now()+1000})),{})).status,400);assert.equal((await handleEnquiry(request(payload({message:'x'.repeat(19000)})),{})).status,413);const unavailable=await handleEnquiry(request(payload()),{});assert.equal(unavailable.status,503);assert.match((await unavailable.json()).message,/temporarily unavailable/)});
test('SQLite-backed rate limit allows five submissions per client per hour',async()=>{const DB=database();for(let i=0;i<5;i++)assert.equal((await handleEnquiry(request(payload()),{DB})).status,201);assert.equal((await handleEnquiry(request(payload()),{DB})).status,429);assert.equal((await handleEnquiry(request(payload(),{'CF-Connecting-IP':'192.0.2.2'}),{DB})).status,201);assert.equal(DB.sqlite.prepare('SELECT COUNT(*) AS n FROM enquiries').get().n,6);DB.sqlite.close()});
test('configured email uses approved env addresses and delivery failure preserves enquiry',async()=>{const DB=database(),original=globalThis.fetch;let sent;globalThis.fetch=async(url,options)=>{assert.equal(url,'https://api.resend.com/emails');sent=JSON.parse(options.body);return new Response('{}',{status:500})};try{const response=await handleEnquiry(request(payload()),{DB,RESEND_API_KEY:'test-key-not-a-real-secret',ENQUIRY_FROM:'from@example.com',ENQUIRY_TO:'to@example.com'});assert.equal(response.status,201);assert.equal((await response.json()).notification,'failed');assert.deepEqual(sent.to,['to@example.com']);assert.equal(sent.from,'from@example.com');assert.equal(DB.sqlite.prepare('SELECT email_status FROM enquiries').get().email_status,'failed')}finally{globalThis.fetch=original;DB.sqlite.close()}});
