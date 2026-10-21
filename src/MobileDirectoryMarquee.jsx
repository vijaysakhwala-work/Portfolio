import React from 'react';

// A duplicated, equal-width set makes the mobile loop continuous at its seam.
export default function MobileDirectoryMarquee({items}){
  return <div className="mobile-directory-carousel" role="region" aria-label="Company directories">
    <div className="directory-marquee-window" tabIndex={0}>
      <div className="directory-marquee-track">{[0,1].map(copy=><ul key={copy} className="directory-marquee-set" aria-hidden={copy===1?'true':undefined}>
        {items.map(([id,name,title])=><li key={id}><div className="award-card"><img src={'/images/awards/'+id+'.webp'} alt={copy===1?'':name+': '+title} width="640" height="640" loading="lazy" decoding="async"/><strong>{name}</strong><span>{title}</span></div></li>)}
      </ul>)}</div>
    </div>
  </div>;
}
