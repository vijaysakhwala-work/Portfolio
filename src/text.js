// Lower-case a service name for use mid-heading without damaging acronyms and product names.
const keep=['AI','API','CI/CD','CMS','CRM','MVP','QA','SEO','SaaS','UI/UX','DevOps','iOS','Android','Flutter','React','Native','Shopify','WooCommerce','Web3'];
const patterns=keep.map(k=>[new RegExp('(?<![a-z0-9])'+k.toLowerCase().replace(/[/]/g,'\/')+'(?![a-z0-9])','g'),k]);
export function lowerKeep(text){let t=String(text).toLowerCase();for(const [re,k] of patterns)t=t.replace(re,k);return t}
