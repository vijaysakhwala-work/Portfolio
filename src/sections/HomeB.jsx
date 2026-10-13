import React, { useEffect, useRef, useState } from 'react';
import { PROOF, blank } from '../lib/proof';
import { workProjects, workImg, founderImg, ROLES, MODELS, articles, FAQ, EMAIL, ROLES as R2 } from '../lib/site';
import { Heading, BrowserFrame, Dash, val, TechChip, RichText, PersonPhoto } from '../components/ui';

/* FAQ answers may carry [label](/path) links and **bold**; the structured data gets the plain text */
const plainText = s => String(s).replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\*\*/g, '');

/* ---------- Featured work ---------- */
export function FeaturedWork() {
  const pick = ['haven', 'ledger', 'intake'].map(s => workProjects.find(w => w.slug === s));
  return (
    <section className="sec defer" id="work" aria-labelledby="work-h" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head split"><div><Heading id="work-h">Work that shows how we think.</Heading><p>Three of our design concepts. Real client case studies appear here once each client has approved them.</p></div><a className="text-link" href="/work">View all work</a></div>
        <div className="work-grid">
          {pick.map(w => (
            <a key={w.slug} className="wc" href={'/work/' + w.slug}>
              <BrowserFrame url={'cubusify.com/work/' + w.slug} src={workImg(w.slug)} alt={w.name + ': ' + w.title} />
              <h3>{w.name}: {w.title}</h3><p>{w.intro}</p>
              <div className="meta"><span>{w.label}</span><span>{w.industry}</span><span>{w.category}</span></div>
            </a>
          ))}
          <div className="case-slot blank blank-only"><h3>Real case study <span className="draft">blank</span></h3>
            <dl className="case-fields">{['Client', 'Problem', 'What we built', 'Verified result'].map(k => <div key={k}><dt>{k}</dt><dd>—</dd></div>)}</dl></div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Hire team (roles and models come from the existing Hire Team page) ---------- */
export function RoleCards() {
  const P = PROOF;
  return (
    <>
      <ul className="roles">
        {ROLES.map(r => (
          <li className="role" key={r.name}><h3>{r.name}</h3><p style={{ margin: 0, color: 'var(--muted)', fontSize: '.95rem' }}>{r.text}</p>
            <ul className="tags">{r.tags.map(t => <TechChip key={t} t={t} />)}</ul>
            <dl className="fields blank-only"><dt>Rate</dt><dd>{val(P.hire.rate)}</dd><dt>Availability</dt><dd>{val(P.hire.availability)}</dd></dl></li>
        ))}
        <li className="role blank blank-only"><h3>Another role</h3><p className="dash" style={{ margin: 0 }}>Add a role, its skills, rate and availability.</p></li>
      </ul>
      <div className="models">
        {MODELS.map(m => <div className="model" key={m.name}><h3>{m.name}</h3><p>{m.text}</p><dl className="blank-only"><dt>Pricing</dt><dd>{val(P.hire.pricing)}</dd><dt>Minimum term</dt><dd>{val(P.hire.minimumTerm)}</dd></dl></div>)}
      </div>
    </>
  );
}
export function HireSection() {
  return (
    <section className="sec defer" id="hire" aria-labelledby="hire-h" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head split"><div><Heading id="hire-h">Hire a team that builds with you.</Heading><p>Bring in the skills your product needs, from one accountable team.</p></div><a className="text-link" href="/team">About the team</a></div>
        <RoleCards />
      </div>
    </section>
  );
}

/* ---------- Why Cubusify, with leadership ---------- */
const REASONS = [['Built around your workflow', 'Solutions shaped to your process and priorities.'], ['One accountable team', 'Strategy, design, development and launch support move together.'], ['Progress you can see', 'Regular demos, clear milestones and direct conversations.'], ['Ownership after launch', 'Your source code, project files and agreed handover.']];
function Reason({ r }) {
  const ref = useRef(null); const [on, setOn] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; if (!('IntersectionObserver' in window)) { setOn(true); return; } const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.35 }); io.observe(el); return () => io.disconnect(); }, []);
  return <li className={'reason' + (on ? ' in' : '')} ref={ref}><h3>{r[0]}</h3><p>{r[1]}</p></li>;
}
export function Leaders() {
  return (
    <ul className="leaders" aria-label="Leadership">
      {PROOF.leadership.map(l => { const has = !blank(l.name);
        return <li key={l.role} className={'leader' + (has ? '' : ' blank-only')}><span className={'av' + (has && (l.photo || (l.role === 'Founder' && founderImg())) ? ' has' : '')}>{has && (l.photo || (l.role === 'Founder' && founderImg())) ? <img src={l.photo || founderImg()} alt="" width="54" height="54" /> : has ? l.name.slice(0, 1) : '+'}</span><div><b>{has ? l.name : <Dash />}</b><span>{l.role}</span></div></li>; })}
    </ul>
  );
}
export function WhySection({ leaders = true }) {
  return (
    <section className="why defer" id="why" aria-labelledby="why-h">
      <div className="wrap why-grid">
        <div><Heading id="why-h">Your business. Our commitment.</Heading><p className="sub">We treat your business as our own.</p>
          <ul className="reasons">{REASONS.map(r => <Reason key={r[0]} r={r} />)}</ul></div>
        <div>
          <figure className="quote"><blockquote>I founded Cubusify with a simple commitment: to treat your business as our own. We listen to your goals, take ownership of the work, and build dependable digital solutions that support your growth through lasting partnerships.</blockquote>
            <figcaption><PersonPhoto src={founderImg()} name="Vijay Sakhwala" size="sm" /><div><b>Vijay Sakhwala</b><span>Founder, Cubusify</span></div></figcaption></figure>
          <div className="principles"><span>A clear plan from day one</span><span>Direct collaboration</span><span>Ownership at handover</span></div>
        </div>
      </div>
      {leaders && <div className="wrap"><Leaders /></div>}
    </section>
  );
}

/* ---------- Certificates, awards, client words ---------- */
export function CredentialsBlock() {
  const P = PROOF, anyHeld = P.certifications.some(c => c.held);
  const hide = !P.showBlanks;
  return (
    <>
      {(anyHeld || !hide) && <><h3 className="subhead" style={{ marginTop: 0 }}>Compliance and certifications</h3>
        <ul className="certs">{P.certifications.map(c => (
          <li key={c.name} className={'cert ' + (c.held ? 'held' : 'blank blank-only')}>
            <span className="state draft">{c.held ? 'verified' : 'blank'}</span><span className="seal">{c.mark}</span><h3>{c.name}</h3><p>{c.topic}</p>
            <dl><dt>Issuer</dt><dd>{val(c.issuer)}</dd><dt>Number</dt><dd>{val(c.number)}</dd><dt>Valid until</dt><dd>{val(c.validUntil)}</dd><dt>Check</dt><dd>{c.held && c.verifyUrl ? <a href={c.verifyUrl} target="_blank" rel="noopener">Verify</a> : <Dash />}</dd></dl>
          </li>))}</ul></>}
      {(P.awards.length > 0 || !hide) && <><h3 className="subhead">Awards and recognition</h3>
        <ul className="awards">{P.awards.length ? P.awards.map(a => <li key={a.name} className="award">{a.image ? <img src={a.image} alt={a.name} loading="lazy" width="64" height="64" /> : <span className="medal">★</span>}<b>{a.name}</b><small>{[a.issuer, a.year].filter(Boolean).join(', ')}</small></li>)
          : [0, 1, 2, 3, 4, 5].map(i => <li key={i} className="award blank blank-only"><span className="medal">+</span><b className="dash">Award</b><small>Issuer, year</small></li>)}</ul></>}
      {(P.testimonials.length > 0 || !hide) && <><h3 className="subhead">What clients say</h3>
        <ul className="words">{P.testimonials.length ? P.testimonials.map((t, i) => <li key={i}><figure className="word" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}><blockquote>{t.quote}</blockquote><figcaption><b>{t.name}</b>, {t.company}{t.project ? ` (${t.project})` : ''}</figcaption></figure></li>)
          : [0, 1, 2].map(i => <li key={i} className="blank-only"><figure className="word blank"><blockquote className="dash">“—”</blockquote><figcaption>Name —, company —, project —</figcaption></figure></li>)}</ul></>}
    </>
  );
}
export function Credentials() {
  const P = PROOF;
  if (!P.showBlanks && !P.certifications.some(c => c.held) && !P.awards.length && !P.testimonials.length) return null;
  return (
    <section className="sec defer tall" id="credentials" aria-labelledby="cred-h">
      <div className="wrap">
        <div className="sec-head"><Heading id="cred-h">Certificates, awards and client words.</Heading><p>Each entry appears with its issuer and number, so you can check it for yourself.</p></div>
        <CredentialsBlock />
      </div>
    </section>
  );
}

/* ---------- Insights ---------- */
export function PostList({ limit = 4 }) {
  return <ul className="posts">{articles.slice(0, limit).map(a => <li className="post" key={a.slug}><a href={'/blog/' + a.slug}><span className="cat">{a.category.toLowerCase()}</span><div><h3>{a.title}</h3><p>{a.desc}</p></div><span className="go">Read</span></a></li>)}</ul>;
}
export function Insights() {
  return (
    <section className="sec defer" id="insights" aria-labelledby="ins-h" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head split"><div><Heading id="ins-h">Practical guides, in plain language.</Heading><p>Short reads on choosing platforms, using AI well and planning a first product.</p></div><a className="text-link" href="/blog">View all articles</a></div>
        <PostList />
        <div className="hub" aria-label="Knowledge hub"><a href="/blog">Blog</a><a href="/work">Case studies</a><a href="/#stack">Technologies</a></div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
export function FaqList({ items = FAQ }) {
  return (
    <div className="faq">
      {items.map(f => <details name="faq" key={f.q} className={f.blank ? 'blank-only' : undefined}><summary>{f.q}</summary><div className="ans">{f.blank ? <p><Dash /> <span className="draft">blank: add the real answer</span></p> : <p><RichText text={f.a} /></p>}</div></details>)}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.filter(f => !f.blank).map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: plainText(f.a) } })) }).replaceAll('<', '\\u003c') }} />
    </div>
  );
}
export function FaqSection() {
  return (
    <section className="sec defer faq" id="faq" aria-labelledby="faq-h" style={{ paddingTop: 0 }}>
      <div className="wrap faq-grid"><div className="sec-head"><Heading id="faq-h">Questions, answered.</Heading><p>Can't find yours? Send it through the form below and we'll reply within 24 hours.</p></div><FaqList /></div>
    </section>
  );
}

/* ---------- Contact ---------- */
const COUNTRIES = ['United States', 'India', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'Other'];
export function ContactForm({ hire = false }) {
  const [submitted, setSubmitted] = useState(false), [status, setStatus] = useState(''), [file, setFile] = useState(null), [over, setOver] = useState(false);
  const onSubmit = e => {
    e.preventDefault(); const f = e.currentTarget; setSubmitted(true);
    if (!f.checkValidity()) {
      const bad = Array.from(f.elements).find(el => el.willValidate && !el.checkValidity());
      setStatus('Please fix the highlighted field' + (f.querySelectorAll(':invalid').length > 1 ? 's' : '') + '.'); bad && bad.focus(); return;
    }
    const d = new FormData(f);
    const body = `Hello Cubusify,\n\nName: ${d.get('name')}\nPhone: ${d.get('phone') || 'Not given'}\nEmail: ${d.get('email')}\nCountry: ${d.get('country')}\n${hire ? 'Expertise needed: ' + d.get('expertise') + '\n' : 'Budget: ' + (d.get('budget') || 'Not sure yet') + '\n'}Attachment: ${file ? file.name + ' (attach it to this email)' : 'None'}\n\n${hire ? 'Project goals' : 'Project details'}:\n${d.get('project')}\n\nPlease contact me to discuss the next step.`;
    setStatus('Opening an email draft. Press send in your email app to finish.');
    window.location.href = 'mailto:' + PROOF.contact.email + '?subject=' + encodeURIComponent((hire ? 'Team enquiry from ' : 'Project enquiry from ') + d.get('name')) + '&body=' + encodeURIComponent(body);
  };
  return (
    <form id="enquiry" noValidate className={submitted ? 'was-submitted' : undefined} onSubmit={onSubmit}>
      <div className="field"><label htmlFor="f-name">Full name</label><input id="f-name" name="name" autoComplete="name" maxLength={100} required aria-errormessage="e-name" /><span className="error-msg" id="e-name">Please enter your name.</span></div>
      <div className="field"><label htmlFor="f-email">Email address <span className="hint" id="h-email">you@company.com</span></label><input id="f-email" name="email" type="email" autoComplete="email" autoCapitalize="off" autoCorrect="off" spellCheck="false" required aria-describedby="h-email" aria-errormessage="e-email" /><span className="error-msg" id="e-email">Please enter a valid email address.</span></div>
      <div className="field"><label htmlFor="f-phone">Phone number (optional)</label><input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={30} /></div>
      <div className="field"><label htmlFor="f-country">Country</label><select id="f-country" name="country" autoComplete="country-name" required defaultValue="" aria-errormessage="e-country"><option value="" disabled>Choose a country</option>{COUNTRIES.map(c => <option key={c}>{c}</option>)}</select><span className="error-msg" id="e-country">Please choose your country.</span></div>
      {hire
        ? <div className="field wide"><label htmlFor="f-exp">Expertise needed</label><select id="f-exp" name="expertise" required defaultValue="" aria-errormessage="e-exp"><option value="" disabled>Select expertise</option>{[...ROLES, ...MODELS].map(r => <option key={r.name}>{r.name}</option>)}</select><span className="error-msg" id="e-exp">Please choose the expertise you need.</span></div>
        : <div className="field wide"><label htmlFor="f-budget">Your budget (optional)</label><select id="f-budget" name="budget" defaultValue=""><option value="">Not sure yet</option><option>Under $1,000</option><option>$1,000–$5,000</option><option>$5,000–$15,000</option><option>$15,000+</option></select></div>}
      <div className="field wide"><label htmlFor="f-project">{hire ? 'Project goals' : 'Project details'}</label><textarea id="f-project" name="project" required minLength={10} aria-errormessage="e-project" /><span className="error-msg" id="e-project">Tell us a little about what you want to build (at least 10 characters).</span></div>
      <div className="field wide"><label htmlFor="f-file">Upload a document (optional)</label>
        <div className={'drop' + (over ? ' over' : '')} onDragEnter={() => setOver(true)} onDragOver={() => setOver(true)} onDragLeave={() => setOver(false)} onDrop={() => setOver(false)}>
          <b>{file ? file.name : 'Drop a file here or choose one'}</b><span>{file ? Math.max(1, Math.round(file.size / 1024)) + ' KB. Attach it in your email app after the draft opens.' : 'A brief, spec or sketch helps. Your email app opens with these details, so attach the file there.'}</span>
          <input id="f-file" name="file" type="file" onChange={e => setFile(e.target.files[0] || null)} /></div></div>
      <div className="field wide consent"><input id="f-consent" name="consent" type="checkbox" required aria-errormessage="e-consent" /><label htmlFor="f-consent" style={{ font: '400 .92rem var(--text)' }}>I agree to the <a href="/privacy">Privacy Policy</a></label><span className="error-msg" id="e-consent">Please agree to continue.</span></div>
      <button className="btn" type="submit">{hire ? 'Discuss your team' : 'Send enquiry'}</button>
      <p className="status" id="status" role="status" aria-live="polite">{status}</p>
    </form>
  );
}
export function ContactDetails() {
  const C = PROOF.contact;
  return (
    <>
      <ul className="cdetails">
        <li><span className="k">Email</span><span className="v"><a href={'mailto:' + C.email}>{C.email}</a></span></li>
        <li className={blank(C.phone) ? 'blank-only' : undefined}><span className="k">Phone</span><span className="v">{blank(C.phone) ? <Dash /> : <a href={'tel:' + C.phone.replace(/[^\d+]/g, '')}>{C.phone}</a>}</span></li>
        <li className={blank(C.whatsapp) ? 'blank-only' : undefined}><span className="k">WhatsApp</span><span className="v">{blank(C.whatsapp) ? <Dash /> : <a href={'https://wa.me/' + C.whatsapp} target="_blank" rel="noopener">Chat with us</a>}</span></li>
      </ul>
      <h3 className="subhead" style={{ fontSize: '1.1rem', marginTop: '2rem' }}>Where we work</h3>
      <ul className="offices">{PROOF.offices.map((o, i) => { const has = !blank(o.city);
        return <li key={i} className={'office' + (has ? '' : ' blank blank-only')}><b>{has ? o.city + (o.country ? ', ' + o.country : '') : <span className="dash">City, country</span>}</b>{blank(o.address) ? <span className="blank-only dash">Address —</span> : <span>{o.address}</span>}</li>; })}</ul>
    </>
  );
}
export function ContactSection({ asPage = false }) {
  return (
    <section className={'sec defer tall' + (asPage ? ' page-contact' : '')} id="contact" aria-labelledby="contact-h">
      <div className="wrap contact-grid">
        <div>
          {asPage ? <h2 id="contact-h" className="sr-only">Contact details and enquiry form</h2> : <Heading id="contact-h">Start your project with Cubusify.</Heading>}
          {!asPage && <p className="lead">Share your idea and our experts will get back to you within 24 hours.</p>}
          <ContactDetails />
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
