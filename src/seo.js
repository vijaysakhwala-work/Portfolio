// Structured data, feed and llms.txt for the prerender step. Plain ES module with explicit .js extensions
// because scripts/prerender.mjs imports it straight from Node.
import { routes, routeInfo, metadata, services, industries } from './catalog.js';
import { posts } from './blog-posts.js';
import { serviceDetails, subDetail } from './service-details.js';
import { serviceFull } from './content/sources.js';

export const BRAND = 'Cubusify';
export const TAGLINE = 'Software, websites, mobile apps and AI automation, built around the result you want.';
const url = (origin, path) => origin + (path === '/' ? '/' : path);
const orgRef = origin => ({ '@type': 'Organization', '@id': origin + '/#organization', name: BRAND, url: origin });
const organization = origin => ({
  '@context': 'https://schema.org', '@type': 'Organization', '@id': origin + '/#organization', name: BRAND, url: origin,
  logo: origin + '/images/company-logo.png', email: 'hello@cubusify.com', description: TAGLINE,
  address: { '@type': 'PostalAddress', addressLocality: 'Surat', addressCountry: 'IN' },
});

/* Breadcrumb trail for the routes that have one: [name, path][] */
export function crumbsFor(route) {
  const r = routeInfo(route);
  if (r.type === 'subservice') return [['Home', '/'], ['Services', '/services'], [r.service.title, r.service.path], [r.sub.title, r.sub.path]];
  if (r.type === 'service') return [['Home', '/'], ['Services', '/services'], [r.service.title, r.service.path]];
  if (r.type === 'article') return [['Home', '/'], ['Blog', '/blog'], [r.article.title, '/blog/' + r.article.slug]];
  if (r.type === 'industry') return [['Home', '/'], ['Industries', '/industries'], [r.industry.name, route]];
  if (['services', 'blog', 'industries', 'work', 'about', 'team', 'careers', 'contact'].includes(r.type)) {
    const name = { services: 'Services', blog: 'Blog', industries: 'Industries', work: 'Our Work', about: 'About Us', team: 'Hire Team', careers: 'Careers', contact: 'Contact Us' }[r.type];
    return [['Home', '/'], [name, route]];
  }
  return null;
}
const breadcrumbs = (origin, route) => {
  const c = crumbsFor(route); if (!c) return null;
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: c.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: url(origin, path) })) };
};

/* All JSON-LD objects for a route. FAQPage is emitted by the FAQ component in the page body, so it is not repeated here. */
export function pageSchemas(route, origin) {
  const m = metadata(route), r = routeInfo(route), out = [];
  if (route === '/') {
    out.push(organization(origin));
    out.push({ '@context': 'https://schema.org', '@type': 'WebSite', '@id': origin + '/#website', name: BRAND, url: origin, description: TAGLINE, publisher: { '@id': origin + '/#organization' } });
    return out;
  }
  if (r.type === 'about' || r.type === 'contact') out.push(organization(origin));
  if (r.type === 'services') {
    out.push({ '@context': 'https://schema.org', '@type': 'ItemList', name: 'Cubusify services', itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.title, url: url(origin, s.path) })) });
  }
  if (r.type === 'service') {
    const d = serviceDetails[r.service.slug];
    out.push({
      '@context': 'https://schema.org', '@type': 'Service', name: r.service.title, serviceType: d?.keyword || r.service.title, description: m.description, url: url(origin, route),
      provider: orgRef(origin),
      hasOfferCatalog: { '@type': 'OfferCatalog', name: r.service.title + ' services', itemListElement: r.service.subs.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, url: url(origin, s.path) } })) },
    });
  }
  if (r.type === 'subservice') {
    const d = subDetail(r.service.slug, r.sub.slug);
    out.push({ '@context': 'https://schema.org', '@type': 'Service', name: r.sub.title, serviceType: d?.keyword || r.sub.title, category: r.service.title, description: m.description, url: url(origin, route), provider: orgRef(origin) });
  }
  if (r.type === 'blog') {
    out.push({
      '@context': 'https://schema.org', '@type': 'Blog', name: BRAND + ' blog', url: url(origin, '/blog'), description: m.description, publisher: orgRef(origin),
      blogPost: posts.map(p => ({ '@type': 'BlogPosting', headline: p.title, url: url(origin, '/blog/' + p.slug), datePublished: p.published, dateModified: p.updated })),
    });
  }
  if (r.type === 'article') {
    const a = r.article, link = url(origin, route);
    out.push({
      '@context': 'https://schema.org', '@type': 'BlogPosting', headline: a.title, description: a.metaDescription, url: link, mainEntityOfPage: { '@type': 'WebPage', '@id': link },
      datePublished: a.published, dateModified: a.updated, articleSection: a.category, keywords: [a.keyword, ...(a.keywords || [])].join(', '), inLanguage: 'en',
      ...(a.cover?.src ? { image: origin + a.cover.src } : {}),
      author: orgRef(origin),
      publisher: { ...orgRef(origin), logo: { '@type': 'ImageObject', url: origin + '/images/company-logo.png' } },
    });
  }
  const bc = breadcrumbs(origin, route); if (bc) out.push(bc);
  return out;
}

/* Extra Open Graph tags for blog posts */
export function articleMeta(route) {
  const r = routeInfo(route); if (r.type !== 'article') return null;
  return { published: r.article.published, modified: r.article.updated, section: r.article.category, tags: [r.article.keyword, ...(r.article.keywords || [])] };
}

const xml = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const strip = s => String(s).replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\*\*/g, '');

export function buildFeed(origin) {
  const items = posts.map(p => `<item><title>${xml(p.title)}</title><link>${url(origin, '/blog/' + p.slug)}</link><guid isPermaLink="true">${url(origin, '/blog/' + p.slug)}</guid><pubDate>${new Date(p.published + 'T00:00:00Z').toUTCString()}</pubDate><category>${xml(p.category)}</category><description>${xml(p.summary)}</description></item>`).join('');
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${BRAND} blog</title><link>${origin}/blog</link><description>${xml(metadata('/blog').description)}</description><language>en</language>${items}</channel></rss>`;
}

/* llms.txt: a plain-text map of the site for AI assistants (https://llmstxt.org) */
export function buildLlms(origin) {
  const L = [];
  L.push('# ' + BRAND, '', '> ' + TAGLINE + ' ' + BRAND + ' works with clients worldwide and works in milestones with regular demos ("Results as a Service"). Cost and timing depend on scope: contact hello@cubusify.com.', '');
  L.push('## Services', '');
  for (const s of services) {
    const d = serviceFull[s.slug];
    L.push(`- [${s.title}](${url(origin, s.path)}): ${strip(d?.definition || s.description)}`);
    for (const x of s.subs) L.push(`  - [${x.title}](${url(origin, x.path)}): ${x.description}`);
  }
  L.push('', '## Guides', '');
  for (const p of posts) L.push(`- [${p.title}](${url(origin, '/blog/' + p.slug)}): ${p.summary}`);
  L.push('', '## Company', '');
  L.push(`- [About Cubusify](${url(origin, '/about')}): who we are and how we work`);
  L.push(`- [Industries](${url(origin, '/industries')}): ${industries.map(i => i.name).join(', ')}`);
  L.push(`- [Hire a team](${url(origin, '/team')}): dedicated, project and flexible engagement models`);
  L.push(`- [Contact](${url(origin, '/contact')}): start a project, reply within 24 hours`);
  L.push('', '## Notes', '', '- Demos and work samples on the site are concept designs using sample data, not client projects.', '- AI features always keep a person in control of important decisions.', '');
  return L.join('\n');
}

export const sitemapEntries = origin => routes.map(route => {
  const r = routeInfo(route);
  const last = r.type === 'article' ? r.article.updated : null;
  return `<url><loc>${url(origin, route)}</loc>${last ? `<lastmod>${last}</lastmod>` : ''}</url>`;
}).join('');
