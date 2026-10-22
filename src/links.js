// Canonical form of an internal URL: every page is served at a trailing-slash URL, so link to that form.
export function canon(href){
  if(typeof href!=='string'||!href.startsWith('/')||href.startsWith('//'))return href;
  const i=href.search(/[?#]/);
  const path=i<0?href:href.slice(0,i),rest=i<0?'':href.slice(i);
  if(path==='/'||path.endsWith('/')||/\.[a-z0-9]+$/i.test(path))return href;
  return path+'/'+rest;
}
