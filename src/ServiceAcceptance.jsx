import React from 'react';
import {serviceAcceptance} from './service-acceptance';
export default function ServiceAcceptance({slug}){
 const checks=serviceAcceptance[slug];if(!checks)return null;
 return <section className="ai-width service-gallery-section" data-service-acceptance={slug}><span className="eyebrow">DELIVERY ACCEPTANCE</span><h2>How we would validate this scope</h2><p>Agree the important success and failure paths before development. These proposed checks help turn the service description into a reviewable delivery brief.</p><ul>{checks.map(check=><li key={check}>{check}</li>)}</ul></section>;
}
