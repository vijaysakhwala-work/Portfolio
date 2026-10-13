import React from 'react';
import { PROOF, blank } from '../lib/proof';
import { services, industries, EMAIL } from '../lib/site';
import { Dash } from './ui';

const SOC = [['linkedin', 'in', 'LinkedIn'], ['x', 'X', 'X'], ['instagram', 'ig', 'Instagram'], ['facebook', 'fb', 'Facebook'], ['youtube', 'yt', 'YouTube'], ['github', 'gh', 'GitHub']];
export default function Footer() {
  const P = PROOF, anyHeld = P.certifications.some(c => c.held), L = P.legal, C = P.contact;
  const anySocial = SOC.some(s => !blank(P.social[s[0]]));
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <a className="brand" href="/"><img src="/images/logo.png" alt="" width="32" height="32" />Cubusify</a>
            <p>Software your business runs on.</p>
            <a href={'mailto:' + EMAIL} style={{ marginTop: '.6rem' }}>{EMAIL}</a>
            {!blank(C.phone) && <a href={'tel:' + C.phone.replace(/[^\d+]/g, '')} style={{ marginTop: '.2rem' }}>{C.phone}</a>}
            {(anySocial || P.showBlanks) && <div className="social" aria-label="Social media">
              {SOC.map(([k, short, label]) => blank(P.social[k]) ? <span key={k} className="blank blank-only" aria-hidden="true">{short}</span> : <a key={k} href={P.social[k]} target="_blank" rel="noopener" aria-label={label}>{short}</a>)}
            </div>}
          </div>
          <div><b>Services</b><div>{services.slice(0, 6).map(s => <a key={s.slug} href={s.path}>{s.title}</a>)}</div></div>
          <div><b>AI and operations</b><div>{services.slice(6, 9).map(s => <a key={s.slug} href={s.path}>{s.title}</a>)}</div><a href="/demo-studio">Demo Studio</a></div>
          <div><b>Industries</b><div>{industries.map(i => <a key={i.slug} href={'/industries/' + i.slug}>{i.name}</a>)}</div></div>
          <div><b>Company</b><a href="/about">About Us</a><a href="/team">Hire Team</a><a href="/careers">Careers</a><a href="/blog">Blog</a><a href="/work">Our Work</a><a href="/#credentials">Certifications</a><a href="/#faq">FAQ</a><a href="/contact">Contact Us</a></div>
        </div>
        {(anyHeld || P.showBlanks) && <div className="compliance">
          <h3>Compliance and certifications</h3><p>Standards and partner status, shown with proof.</p>
          <ul className="badges">{P.certifications.slice(0, 6).map(c => <li key={c.name} className={c.held ? 'held' : 'blank blank-only'}><i>{c.mark}</i>{c.name}</li>)}</ul>
        </div>}
        <div className="legal-row">{[['Registered name', L.companyName], ['Registration no.', L.registrationNo], ['Tax ID', L.taxId]].map(([k, v]) => blank(v) ? <span key={k} className="blank-only"><b>{k}</b><Dash /></span> : <span key={k}><b>{k}</b>{v}</span>)}</div>
        <div className="foot-bottom"><span>© {new Date().getUTCFullYear()} Cubusify. All rights reserved.</span><span><a href="/privacy">Privacy policy</a><a href="/terms">Terms of service</a></span></div>
      </div>
    </footer>
  );
}
