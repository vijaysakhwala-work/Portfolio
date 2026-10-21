# Cubusify organic search audit — 20 October 2026

The biggest constraint is deployment: the public domain serves a different one-page website. Of the **84 routes in the current portfolio source, 83 return HTTP 404 on https://cubusify.com/**. Improving those local pages alone will not make them available to search engines.

## Scope and interpretation

- Rendered every current source route on the server and inspected its main content, headings, metadata definitions, images and links. This avoids relying on the older build, which contains 85 routes and some content that differs from the current source.
- Made unauthenticated HTTP GET requests to all 84 canonical route URLs. Results: homepage 200, remaining 83 routes 404. The public homepage differs from the local homepage.
- Checked public robots.txt and sitemap.xml: both return 200. Robots allows crawling. The sitemap lists only the homepage.
- Both www.cubusify.com and cubusify.com return 200 for the homepage; both declare the non-www canonical. Prefer a permanent redirect to the chosen hostname to make this consistent.
- Ahrefs project discovery failed with **Insufficient plan**. Semrush discovery returned **no_api_units**. No Search Console clicks, impressions, rankings, search volumes, backlink metrics or analytics were retrieved.
- No browser rendering, measured Core Web Vitals, or form delivery test was performed. HTTP accessibility does not prove Google indexing.

**Scores are editorial SEO-readiness judgments out of 10, not measured traffic performance or a Google/vendor score.** They consider intent clarity, content usefulness, distinctiveness, evidence/trust and crawlable structure. A reusable layout is fine; repeated answers with little new service information are the issue. There is no target word count. Utility pages are not scored as traffic opportunities. Local readiness scores do not override the live 404 status.

Read [all page ratings in CSV](page-ratings.csv), [all page ratings in Markdown](page-ratings.md), or [raw audit evidence](pages.json). A copy of the publicly fetched homepage is in live-homepage.html. JSON includes text, headings, links and response details for each page.

## Which pages are good?

| Local page | Score | Why it is a good foundation | Next improvement |
|---|---:|---|---|
| /blog/choosing-your-ecommerce-platform | 8 | Explains platform tradeoffs, ownership costs, integrations and migration; includes a comparison table and contextual service links. | Use a clearer title such as “Shopify vs WooCommerce vs Custom Ecommerce: How to Choose”; add an original worked comparison and a qualified named reviewer. |
| /blog/where-ai-automation-saves-time | 8 | Offers seven workflows, prioritisation criteria, boundaries and a pilot plan. | Consider “AI Automation for Business: 7 Workflows Worth Testing”; add a real example and lead readers to the matching automation service. |
| /blog/planning-your-first-software-mvp | 8 | Covers assumptions, scope, milestones and build/buy choices with useful planning tables. | Consider “How to Plan an MVP: Scope, Features and Validation”; add an original planning worksheet/example and a qualified named reviewer. |
| /contact | 7 for conversion | Clear enquiry route and FAQs. | Verify submissions and response handling. This is not a priority for non-brand acquisition. |
| /services/ai and its five child pages | 6 | More differentiated workflow copy than the other service families. | Improve service-specific titles, implementation detail, integrations and real evidence. |
| /services/seo-aeo-geo | 6 | Clear definitions, deliverables, measurement and responsible expectations. | Make the service explicit in the heading and resolve overlap with the marketing/SEO page. |

The three 8/10 articles are strong foundations, not proven traffic winners. They currently return 404 on the public domain.

## Which pages need work?

| Local page group | Score | Main problem |
|---|---:|---|
| 33 non-AI specialist service pages | 3 | Most body copy comes from the parent service: benefits, overview, sibling cards, journey and FAQs. Only the hero changes materially. |
| 12 work detail pages | 3 | Approximately 100 words of main content each, slogan titles and illustrative concepts rather than demonstrated project outcomes. Expand only when there is substantive material to explain. |
| Seven industry pages | 4 | Industry labels and examples vary, while benefits, process and FAQs remain broad. Titles such as “Healthcare” do not clearly describe a software offer. |
| /team | 4 | Little detail on actual roles, expertise, onboarding or engagement terms. |
| Eleven non-AI parent service pages | 5 | Service categories are clear, but much of the explanation remains generic and lacks distinct scope, technical decisions and evidence. |
| Local homepage | 6 | Broad animated H1; business counters and recognition language need supporting evidence. |
| /about | 6 | Founder identity helps, but business background and expertise need verifiable detail. |
| /privacy and /terms | Not scored | Keep accurate and accessible; these are utility pages, not non-brand traffic targets. Legal completeness was not assessed. |

For the 33 non-AI specialist pages, the nearest specialist-page match shares **86.9–91.8% of unique five-word phrases**, measured with Jaccard similarity on main text after excluding scripts, styles and SVG. This includes shared process/gallery language and is a diagnostic comparison, not a Google penalty score. The source confirms that these pages use the same parent content object and substitute the hero title and introduction. Some sibling-card lists also link back to the page itself.

Examples: Shopify and WooCommerce development need separate information about theme work, checkout constraints, migrations, integrations and handover. “MVP development” needs discovery outputs, scope decisions, milestones and evidence of relevant work. A new heading alone is insufficient.

Potential overlaps to resolve through clearer scope and, later, Search Console evidence:

- /services/software/saas-platforms and /services/product/saas-engineering
- /services/marketing/search-engine-optimisation and /services/seo-aeo-geo
- /services/ecommerce and /industries/ecommerce

Overlap is a risk, not verified keyword cannibalisation. Do not redirect or canonicalise distinct services blindly. Retain separate pages when they answer different buyer needs; consolidate only after defining intent and examining available query/link data.

## Public homepage: 5/10 editorial readiness

The live page has a descriptive title and H1, canonical URL, readable HTML, service summaries, process, FAQs and an enquiry route. These are useful foundations.

However, its service links are section anchors rather than distinct service landing pages. It offers little detailed evidence for individual services. Its HTML still contains testimonial instructions such as **“Add a real quote from a happy client here”** and placeholder client names. Remove these placeholders or replace them with approved, genuine testimonials; do not publish invented replacements. Browser visibility was not tested, but this material is present in the returned page HTML.

The one-page sitemap itself is appropriate for the current one-page website. The issue is that the intended portfolio and its service/article pages are absent from the public domain.

## Technical foundations worth keeping

The current source renders one H1 on each route, uses image alt attributes, and has no unresolved main-content internal page links in the route inventory. The prerendering pipeline generates HTML, canonical URLs, robots directives, sitemap entries and applicable structured data. The older build also contains unique titles and descriptions across its 85 pages. These are useful foundations, but the older saved audit is not evidence of the current public deployment.

53 current metadata descriptions are shorter than 80 characters, often because they are one-line service blurbs. This is not a length violation; improve descriptions where they fail to explain the actual offer and reason to visit. Titles such as “Custom CRM” and “Healthcare” need clearer intent more than arbitrary character padding.

Search-oriented heading examples that preserve room for the existing brand voice:

- Homepage: “Custom Software Development & AI Automation”
- /services/ecommerce/shopify-development: “Shopify Development Services”
- /services/software/custom-crm: “Custom CRM Development Services”
- /services/product/mvp-development: “MVP Development for Startups” if this is the intended customer
- /industries/healthcare: “Healthcare Software Development”

These are editorial suggestions, not keywords validated for volume, difficulty or geography.

## Order of work for organic growth

1. **Resolve public availability.** Confirm that cubusify.com is the intended production destination, then deploy the approved portfolio when authorised. Check each chosen route returns 200 with its own content and canonical; check sitemap coverage, public access and a real 404 response for nonexistent pages. Do not treat adding a sitemap as a substitute for deploying pages. No deployment was performed in this audit.
2. **Establish a search baseline.** Verify the domain in Google Search Console, submit the production sitemap and inspect representative URLs. Record page/query clicks, impressions, CTR and average position, plus country/device and date ranges. Track qualified enquiries separately from traffic. A site search result is not a complete index inventory.
3. **Focus the first commercial rewrites.** Start with AI/business automation, custom CRM, Shopify development and MVP development if these reflect the services the business most wants to sell. Give each a defined buyer, problem, deliverables, implementation choices, integrations, unique FAQs and a genuine example. This shortlist is based on existing content fit and commercial specificity, not measured demand. Confirm target countries, customer types and real service priorities before commissioning extensive content.
4. **Connect the strongest existing articles to those offers.** Keep the useful article structures, clarify titles and attribution, add original examples, and use descriptive contextual links. Article → relevant specialist service → genuine example → enquiry is the intended journey. The weak service destinations need improvement alongside the articles.
5. **Build verifiable proof.** Add actual project narratives with permission: problem, constraints, contribution, decisions and observed outcomes. Keep concept demonstrations clearly labelled. Substantiate homepage counters/recognition and keep company identity consistent across the website and genuine business profiles.
6. **Expand only around demonstrated gaps.** Use queries, sales questions and relevant search results to decide the next pages. Do not create more generic service pages or bulk city pages. If local business demand matters, validate the actual location and service area before developing a local search plan.

Suggested work sequence: availability and measurement first; two focused service rewrites next; connect the three strongest articles; then expand the next two services using what the first batch reveals. Once data exists, prioritise relevant pages already getting impressions around positions 5–20, then pages with weak CTR relative to comparable queries. Compare similar date ranges and record changes; search impact can take longer than a work cycle.

## Measurement and remaining unknowns

Success means more **relevant organic visits and qualified enquiries**, not just a higher audit score. Track non-brand clicks to service pages, article-to-service visits, organic enquiry conversion and lead fit. Add measurement consistent with the site's actual tracking/consent setup.

Unknown: current Google indexing, search demand by market, actual rankings, inbound authority, real-user performance and the approved production deployment destination. No numerical traffic uplift or ranking forecast is supportable from the available evidence.

## Guidance used

- [Google: Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) — descriptive headings, original value, clear attribution and evidence of expertise; no preferred word count.
- [Google: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) — crawlable links, rendered content and meaningful HTTP responses.

No application source, production setting or deployed page was changed. The saved deliverables are audit files only.
