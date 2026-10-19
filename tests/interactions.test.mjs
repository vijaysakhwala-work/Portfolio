import test from 'node:test';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import {build} from 'esbuild';
import fs from 'node:fs/promises';
import {slideLeft,wrapSlide,nearestSlide} from '../src/carousel-math.js';

test('carousel center calculations work at mobile and desktop widths and shifted ancestors',()=>{
 for(const width of [320,390,768,1024,1440,1920]){const card=width<600?width-48:400,gap=22,pad=(width-card)/2;const track={scrollLeft:card+gap,clientWidth:width,scrollWidth:width+3*(card+gap),getBoundingClientRect:()=>({left:73})};track.children=Array.from({length:4},(_,i)=>({getBoundingClientRect:()=>({left:73+pad+i*(card+gap)-track.scrollLeft,width:card})}));assert.equal(slideLeft(track,track.children[0]),0);assert.equal(slideLeft(track,track.children[3]),3*(card+gap));assert.equal(nearestSlide(track),1)}
 assert.equal(wrapSlide(-1,7),6);assert.equal(wrapSlide(7,7),0);
});

const dom=new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>',{url:'https://cubusify.test',pretendToBeVisual:true});
Object.assign(globalThis,{window:dom.window,document:dom.window.document,HTMLElement:dom.window.HTMLElement,FormData:dom.window.FormData,requestAnimationFrame:dom.window.requestAnimationFrame.bind(dom.window),cancelAnimationFrame:dom.window.cancelAnimationFrame.bind(dom.window),IS_REACT_ACT_ENVIRONMENT:true});
globalThis.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){}});window.matchMedia=globalThis.matchMedia;
globalThis.IntersectionObserver=class{constructor(callback){this.callback=callback}observe(){this.callback([{isIntersecting:true}])}disconnect(){}};
globalThis.ResizeObserver=class{observe(){}disconnect(){}};
window.HTMLElement.prototype.scrollTo=function({left}){this.scrollLeft=left;this.dispatchEvent(new window.Event('scroll'))};
await fs.mkdir('.cache',{recursive:true});
await build({entryPoints:['src/Carousel.jsx'],bundle:true,platform:'node',format:'esm',packages:'external',outfile:'.cache/test-carousel.mjs',logLevel:'silent'});
await build({entryPoints:['src/jquery-enquiry.js'],bundle:true,platform:'node',format:'esm',packages:'external',outfile:'.cache/test-validation.mjs',logLevel:'silent'});
const React=await import('react'),{act}=React,{createRoot}=await import('react-dom/client'),{default:Carousel}=await import('../.cache/test-carousel.mjs'),{attachValidation}=await import('../.cache/test-validation.mjs');

test('mounted carousel arrows, wrapping, keyboard and autoplay resume change actual selected cards',async()=>{
 const container=document.querySelector('#root'),root=createRoot(container);
 await act(async()=>root.render(React.createElement(Carousel,{label:'test services',items:[{name:'One'},{name:'Two'},{name:'Three'}],interval:35,render:item=>React.createElement('a',{href:'/services'},item.name)})));
 const track=container.querySelector('.experience-track');Object.defineProperties(track,{clientWidth:{value:480},scrollWidth:{value:1324}});track.getBoundingClientRect=()=>({left:10});[...track.children].forEach((child,n)=>{child.getBoundingClientRect=()=>({left:50+n*422-track.scrollLeft,width:400})});
 const click=async label=>act(async()=>container.querySelector(`[aria-label="${label}"]`).click());
 const active=()=>container.querySelector('.experience-slide.is-active').textContent;
 await click('Next test services');assert.equal(active(),'Two');assert.equal(track.scrollLeft,422);
 await click('Next test services');assert.equal(active(),'Three');
 await click('Next test services');assert.equal(active(),'One');
 await click('Previous test services');assert.equal(active(),'Three');
 await act(async()=>track.dispatchEvent(new window.KeyboardEvent('keydown',{key:'Home',bubbles:true})));assert.equal(active(),'One');
 await act(async()=>track.dispatchEvent(new window.KeyboardEvent('keydown',{key:'End',bubbles:true})));assert.equal(active(),'Three');
 await click('Show test services slide 1');
 await act(async()=>{const resume=container.querySelector('[aria-label="Resume automatic slides"]');resume.focus();resume.click()});
 await act(async()=>new Promise(resolve=>setTimeout(resolve,45)));assert.notEqual(active(),'One');
 await act(async()=>root.unmount());
});

test('jQuery validates fields, clears corrected errors and enforces consent without submitting',async()=>{
 const form=document.createElement('form');form.innerHTML='<input name="name"><input name="email"><input name="company"><input name="phone"><select name="service"><option value=""></option><option>Custom Software</option></select><input name="budget"><textarea name="message"></textarea><input name="consent" type="checkbox"><input name="website">';document.body.append(form);let errors={},submitted=0;form.addEventListener('submit',e=>{e.preventDefault();submitted++});const validation=await attachValidation(form,next=>{errors=next});
 assert.equal(validation.validate(),false);assert.ok(errors.name&&errors.email&&errors.message&&errors.service&&errors.consent);
 form.elements.name.value='Website QA';form.elements.email.value='qa@example.com';form.elements.service.value='Custom Software';form.elements.message.value='A meaningful software project enquiry for validation.';form.elements.consent.checked=true;
 assert.equal(validation.validate(),true);assert.deepEqual(errors,{});assert.equal(submitted,0);
 form.elements.phone.value='bad phone';assert.equal(validation.validate(),false);assert.ok(errors.phone);
 form.elements.phone.value='+91 98765 43210';assert.equal(validation.validate(),true);
 validation.destroy();form.remove();
});

await build({entryPoints:['src/InlineSelect.jsx','src/ThemeToggle.jsx','src/Showcase.jsx'],bundle:true,platform:'node',format:'esm',packages:'external',outdir:'.cache/review-tests',outExtension:{'.js':'.mjs'},logLevel:'silent'});
const {default:InlineSelect}=await import('../.cache/review-tests/InlineSelect.mjs');
const {default:ThemeToggle}=await import('../.cache/review-tests/ThemeToggle.mjs');
const {Image:ShowcaseImage,Gallery}=await import('../.cache/review-tests/Showcase.mjs');
globalThis.MutationObserver=window.MutationObserver;globalThis.localStorage=window.localStorage;

test('inline dropdown stays inside the form and supports keyboard, FormData, optional clearing and reset',async()=>{
 const container=document.querySelector('#root'),root=createRoot(container);
 await act(async()=>root.render(React.createElement('form',null,React.createElement(InlineSelect,{id:'budget-test',name:'budget',label:'Budget',options:['Under $1,000','$1,000–$5,000'],placeholder:'Select budget (optional)'}))));
 const trigger=container.querySelector('[role=combobox]');
 await act(async()=>trigger.click());assert.equal(trigger.getAttribute('aria-expanded'),'true');assert.ok(container.querySelector('form [role=listbox]'));assert.equal(container.querySelector('select'),null);
 await act(async()=>trigger.dispatchEvent(new window.KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true})));
 await act(async()=>trigger.dispatchEvent(new window.KeyboardEvent('keydown',{key:'Enter',bubbles:true})));
 assert.equal(new FormData(container.querySelector('form')).get('budget'),'Under $1,000');assert.equal(trigger.getAttribute('aria-expanded'),'false');
 await act(async()=>trigger.click());await act(async()=>container.querySelector('[role=option]').click());assert.equal(new FormData(container.querySelector('form')).get('budget'),'');
 await act(async()=>trigger.click());await act(async()=>container.querySelectorAll('[role=option]')[2].click());
 await act(async()=>container.querySelector('form').reset());assert.equal(new FormData(container.querySelector('form')).get('budget'),'');
 await act(async()=>root.unmount());
});

test('theme switches the shared root, persists choice and synchronises multiple controls',async()=>{
 document.documentElement.dataset.theme='light';const container=document.querySelector('#root'),root=createRoot(container);
 await act(async()=>root.render(React.createElement('div',null,React.createElement(ThemeToggle),React.createElement(ThemeToggle))));
 await act(async()=>container.querySelector('button').click());assert.equal(document.documentElement.dataset.theme,'dark');assert.equal(localStorage.getItem('cubusify-theme'),'dark');assert.equal(container.querySelectorAll('[aria-label="Switch to light theme"]').length,2);
 await act(async()=>container.querySelectorAll('button')[1].click());assert.equal(document.documentElement.dataset.theme,'light');assert.equal(localStorage.getItem('cubusify-theme'),'light');await act(async()=>root.unmount());
});

test('failed responsive images fall back to original and reset on a different project',async()=>{
 const container=document.querySelector('#root'),root=createRoot(container);
 await act(async()=>root.render(React.createElement(ShowcaseImage,{id:'pulse-desktop'})));let img=container.querySelector('img');assert.ok(img.srcset.includes('pulse-desktop-1440-r2.webp'));
 await act(async()=>img.dispatchEvent(new window.Event('error')));img=container.querySelector('img');assert.equal(img.srcset,'');assert.ok(img.src.endsWith('/showcases/pulse-desktop-unbranded.webp'));
 await act(async()=>root.render(React.createElement(ShowcaseImage,{id:'dew-desktop'})));assert.ok(container.querySelector('img').srcset.includes('/delivery/'));
 await act(async()=>root.unmount());
});

test('gallery starts in play mode by default and still allows explicit pause',async()=>{
 const container=document.querySelector('#root'),root=createRoot(container);
 await act(async()=>root.render(React.createElement(Gallery,{ids:['pulse-desktop','pulse-mobile']})));
 assert.ok(container.querySelector('[aria-label="Pause carousel"]'));
 await act(async()=>container.querySelector('[aria-label="Pause carousel"]').click());assert.ok(container.querySelector('[aria-label="Play carousel"]'));
 await act(async()=>root.unmount());
});

test('scroll sequence clamps horizontal travel, releases at its end and respects reduced motion',async()=>{
 await build({entryPoints:['src/ScrollSequence.jsx'],bundle:true,platform:'node',format:'esm',packages:'external',outfile:'.cache/test-sequence.mjs',logLevel:'silent'});
 const {default:Sequence}=await import('../.cache/test-sequence.mjs');let reduced=false,change;
 const original=globalThis.matchMedia;globalThis.matchMedia=()=>({get matches(){return reduced},addEventListener(_,fn){change=fn},removeEventListener(){}});
 const host=document.createElement('div');document.body.append(host);const root=createRoot(host);
 await act(async()=>root.render(React.createElement(Sequence,{label:'services',items:[1,2,3],heading:'Services',render:x=>React.createElement('a',{href:'#'},String(x))})));
 const section=host.querySelector('section'),track=host.querySelector('.sequence-track'),viewport=host.querySelector('.sequence-viewport');let top=88;
 section.getBoundingClientRect=()=>({top});Object.defineProperty(track,'scrollWidth',{value:1500});Object.defineProperty(viewport,'clientWidth',{value:500});
 [...track.children].forEach((node,i)=>Object.defineProperty(node,'offsetLeft',{value:i*500}));
 await act(async()=>window.dispatchEvent(new window.Event('resize')));
 assert.ok(section.classList.contains('sequence-enabled'));assert.equal(section.style.height,'1664px');
 top=-412;await act(async()=>{window.dispatchEvent(new window.Event('scroll'));await new Promise(r=>setTimeout(r,30))});assert.equal(track.style.transform,'translate3d(-500px,0,0)');
 top=-1412;await act(async()=>{window.dispatchEvent(new window.Event('scroll'));await new Promise(r=>setTimeout(r,30))});assert.equal(track.style.transform,'translate3d(-1000px,0,0)');assert.match(host.querySelector('.sequence-bottom').textContent,/03 \/ 03/);
 reduced=true;await act(async()=>change());assert.equal(section.style.height,'auto');assert.equal(track.style.transform,'none');assert.equal(section.classList.contains('sequence-enabled'),false);
 await act(async()=>root.unmount());host.remove();globalThis.matchMedia=original;
});

test('approved enquiry form submits selected service chips and resets after a saved enquiry',async()=>{
 await build({entryPoints:['src/EnquiryForm.jsx'],bundle:true,platform:'node',format:'esm',packages:'external',outfile:'.cache/test-enquiry.mjs',logLevel:'silent'});
 const {default:EnquiryForm}=await import('../.cache/test-enquiry.mjs');const container=document.querySelector('#root'),root=createRoot(container),oldFetch=globalThis.fetch;let submitted;
 globalThis.fetch=async(url,options)=>{assert.equal(url,'/api/enquiries');submitted=JSON.parse(options.body);return new Response(JSON.stringify({reference:'CB-123456ABCDEF',notification:'sent'}),{status:201})};
 try{
 await act(async()=>root.render(React.createElement(EnquiryForm)));const form=container.querySelector('form');
 await act(async()=>form.dispatchEvent(new window.Event('submit',{bubbles:true,cancelable:true})));assert.equal(submitted,undefined);assert.ok(container.querySelector('.service-picker .field-error'));
 form.elements.name.value='Website Review';form.elements.email.value='review@example.com';form.elements.message.value='We need a practical and clearly planned business software project.';form.elements.consent.checked=true;
 await act(async()=>container.querySelector('.service-more').click());const other=container.querySelector('[name=service][value="Other / exploring"]');await act(async()=>other.click());assert.equal(new FormData(form).get('service'),'Other / exploring');assert.equal(container.querySelector('.service-picker .field-error'),null);
 await act(async()=>form.dispatchEvent(new window.Event('submit',{bubbles:true,cancelable:true})));
 assert.equal(submitted.service,'Other / exploring');assert.equal(submitted.consent,true);assert.match(container.querySelector('[role=status]').textContent,/CB-123456ABCDEF/);assert.equal(new FormData(form).get('service'),null);assert.equal(form.elements.name.value,'');
 }finally{await act(async()=>root.unmount());globalThis.fetch=oldFetch}
});
