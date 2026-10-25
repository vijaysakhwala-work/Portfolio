import React from 'react';
import {enterpriseArchitectures} from './enterprise-architectures';

export default function EnterpriseArchitecture({slug}){
 const d=enterpriseArchitectures[slug];
 return <section className="wd-overview" id="enterprise-architecture" data-architecture-status="reference">
  <nav className="wd-contents" aria-label="Enterprise architecture sections"><span>TECHNICAL BLUEPRINT</span><a href="#enterprise-scenario">Scenario</a><a href="#enterprise-stack">Technology choices</a><a href="#enterprise-challenges">Challenges &amp; approach</a><a href="#enterprise-validation">Validation</a></nav>
  <div>
   <h2>Enterprise reference architecture</h2>
   <p>A proposed engineering design for this workflow. The enterprise scenario and stack below are illustrative architecture choices; they are separate from the confirmed project screens.</p>
   <h3 id="enterprise-scenario">The enterprise scenario</h3><p>{d.scenario}</p><p><strong>Architecture objective:</strong> {d.objective}</p>
   <h3 id="enterprise-stack">Proposed technology stack and rationale</h3>
   <div className="wd-detail-notes">{d.stack.map(([layer,technology,reason])=><article key={layer}><h3>{layer}</h3><p><strong>{technology}</strong></p><p>{reason}</p></article>)}</div>
   <h3 id="enterprise-challenges">Technical challenges and design approach</h3>
   <div className="wd-steps">{d.challenges.map(([title,copy],n)=><article key={title}><span>{n+1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
   <h3>How the proposed workflow fits together</h3><ol>{d.flow.map(step=><li key={step}>{step}</li>)}</ol>
   <h3 id="enterprise-validation">Acceptance and failure-path checks</h3><ul>{d.validation.map(check=><li key={check}>{check}</li>)}</ul>
   <h3>The tradeoff</h3><p>{d.tradeoff}</p>
   <p>Architecture references: {d.references.map(([label,url],n)=><React.Fragment key={url}>{n>0&&(n===d.references.length-1?' and ':', ')}<a href={url}>{label}</a></React.Fragment>)}. These describe engineering patterns, rather than certify this project’s implementation.</p>
  </div>
 </section>;
}
