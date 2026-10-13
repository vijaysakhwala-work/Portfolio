import React from 'react';
import CrispPreview from './CrispPreview';
export const demoNames={store:'Ecommerce',mobile:'Fitness application',game:'Animated Snake',crm:'CRM system',automation:'WhatsApp + Sheets'};
export function Demo({kind='crm',focus='',compact=false}){const id=kind==='store'?'store':kind==='game'?'game':kind==='mobile'||kind==='booking'?'fitness':kind==='automation'||kind==='ai'?'automation':'crm';return <div><CrispPreview title={focus||demoNames[id]} kind={id}/>{!compact&&<p><a className="button secondary" href={'/demo-studio#'+id}>Explore {demoNames[id==='fitness'?'mobile':id]} demo</a></p>}</div>}
