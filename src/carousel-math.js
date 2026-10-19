export const wrapSlide=(index,count)=>(index%count+count)%count;
// Both centers measured in viewport coordinates: unaffected by offset parents or transforms.
export function slideLeft(track,slide){const box=slide.getBoundingClientRect(),viewport=track.getBoundingClientRect();return Math.max(0,Math.min(track.scrollWidth-track.clientWidth,track.scrollLeft+box.left-viewport.left+(box.width-track.clientWidth)/2));}
export function nearestSlide(track){return [...track.children].reduce((best,child,index)=>{const distance=Math.abs(slideLeft(track,child)-track.scrollLeft);return distance<best.distance?{index,distance}:best},{index:0,distance:Infinity}).index;}
