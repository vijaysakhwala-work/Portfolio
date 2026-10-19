# Cubusify: search readiness and organic growth

Reviewed 19 October 2026. Scope: the current portfolio source and its built pages. No ranking, traffic or revenue guarantee is implied.

## Implemented and checked

- 85 pre-rendered HTML pages: the core content and links are available without waiting for client JavaScript.
- Unique page titles and descriptions, one H1 per page, descriptive internal links and a linked route to every page from the homepage.
- Canonical URLs and sitemap entries consistently target `https://cubusify.com/` with trailing slashes, matching the hosting URL convention. This is the intended production domain, not a claim that this update is already deployed there.
- Organization, WebSite and WebPage structured data; ContactPage/AboutPage types where applicable; Service, BreadcrumbList and BlogPosting data on relevant pages. No invented review or aggregate-rating markup.
- Robots directives allow public content and exclude API paths. The 404 page has noindex. Social previews have titles, descriptions, images, site name and locale.
- Articles have answer-led introductions, takeaways, descriptive headings, source links and linked tables of contents. Service pages include visible questions and answers.
- Six award badges load lightweight WebP display assets (about 308 KB combined); their PNG versions remain available on click. Full-resolution PNG originals are included in the source under design/awards-original-png.
- Existing responsive image delivery, lazy loading, explicit dimensions and route-level code splitting retained.

## What currently blocks discovery

The hosted review site is **owner-private**. Google and other unauthenticated crawlers cannot access the protected pages. Its current audience has been preserved. The site must be launched publicly on the intended production domain before this build can attract organic visitors.

Search Console, Bing Webmaster Tools, domain verification, DNS and analytics were not connected or changed in this session. Existing indexing and backlink performance were not measured. Core Web Vitals and physical-device/browser layout were not measured because supported browser-control capability was unavailable.

## Public launch

1. Deploy this exact build to the public Cubusify domain. Verify HTTPS, a single preferred hostname, one-hop redirects from the alternate hostname and consistent trailing-slash redirects. Keep staging access restricted.
2. Check anonymous 200 responses for key pages and 404 responses for nonexistent URLs. Check that CDN/hosting authentication and response headers do not block indexing.
3. Verify ownership in Google Search Console and Bing Webmaster Tools. Submit `https://cubusify.com/sitemap.xml`, inspect the homepage and priority service URLs, and monitor indexing reports.
4. Run PageSpeed Insights on home, contact, a service page and an article. Track mobile LCP, INP and CLS using field data when enough visits exist; do not infer a speed score from bundle sizes.
5. Choose analytics with appropriate privacy settings and measure successful enquiry submissions, email clicks and qualified leads. Update the privacy notice if analytics are enabled. The current build contains no advertising trackers or third-party analytics.

## Organic content priorities

These are buyer-intent hypotheses, not measured search-volume or difficulty estimates.

| Priority | Existing destination | Helpful next evidence/content |
|---|---|---|
| Custom software / CRM | /services/software/ | A real before/after workflow, migration checklist, integration scope and ownership answers |
| AI automation | /services/ai/ | A documented workflow with human review, failure handling, setup requirements and measured results |
| Web development | /services/web/ | Platform decision guide, performance examples and what the enquiry process delivers |
| Ecommerce | /services/ecommerce/ | Shopify/WooCommerce trade-offs, catalogue migration, checkout and maintenance questions |
| MVP engineering | /services/product/ | A genuine scope example, acceptance criteria, milestones and launch lessons |

Start with two service areas where Cubusify has the strongest real delivery evidence. Publish one useful, original article or approved case study per week, linking it to the matching service page and the enquiry form. Avoid creating near-identical city pages or large volumes of generic AI-written content. Do not present generated interface examples as client results.

For the first month after launch, focus on indexing, measuring enquiries and strengthening the two priority pages. Over the next two months, use actual Search Console queries and sales questions to revise titles, add missing answers and improve conversion. Review country, landing page, query intent and lead quality—not just visit counts. Keep directory company details and genuine review profiles consistent.

## AEO and GEO

Clear, attributable answers and accessible text support both traditional search and AI-assisted discovery. Google explicitly states that AI Overviews and AI Mode do not require special AI files or special schema. No promise of AI citations is made. An llms.txt file is not treated as a substitute for public access, indexing, useful content or real evidence.

## Testimonials

All five supplied texts are retained in an unpublished review file. The first three need actual-client confirmation of the words and rating; the fourth and fifth identities were invented earlier and need real replacements. Random portraits have not been used as client identities.

## Sources

- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/essentials/technical
- https://developers.google.com/search/docs/fundamentals/get-started-developers

See `search-audit.json` for the latest automated result and `ui-checks.json` for verification limits.
