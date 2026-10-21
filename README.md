# Cubusify portfolio

The existing React 19 and Vite website is retained, with the white, navy, cobalt, cyan and orange identity and all 211 reviewed showcase images. A small Vinext/Cloudflare Worker runtime adds secure enquiry storage. The deployment remains the same private Cubusify Site.

## Local setup

Use Node.js 24 or newer for the included SQLite tests.

```sh
npm ci
npm --prefix server-runtime ci
npm run dev
```

The Vite development command serves the frontend. Server enquiries require the complete Worker runtime; frontend-only development will show an honest submission error when no API is available. Use direct email in that case.

```sh
npm run build
npm run check
npm test
```

The complete build first produces 84 prerendered pages and a 404, validates them, then builds the supported Sites Worker runtime. Output is `dist/client` for assets and `dist/server` for the Worker. Publish that complete artifact through Sites. A static-only host can serve `dist/client`, but `/api/enquiries` requires the Worker and DB binding.

For a standalone built Worker preview, run Wrangler from the project root with `server-runtime/node_modules/wrangler/bin/wrangler.js dev --config dist/server/wrangler.json --local --persist-to server-runtime/.wrangler/state` after applying the committed D1 migration locally. This preview is for environments that support it; it was not used for browser QA here.

## Enquiries

The Sites manifest declares D1 as `DB`; the generated schema-only migration is in `server-runtime/drizzle`. Sites applies hosted migrations during publication. Enquiries appear in the Site's database viewer under `enquiries`. Store rows contain consent, submitted fields, a reference and email delivery status. Raw request IP addresses are not stored; a daily one-way hash supports the submission limit.

Optional email notifications require three runtime variables: `RESEND_API_KEY` (secret), `ENQUIRY_FROM` (a verified sender) and `ENQUIRY_TO` (approved recipient). No values are shipped or invented. ENQUIRY_TO is configured as hello@cubusify.com. RESEND_API_KEY and the verified ENQUIRY_FROM sender are still missing, so storage works without email notifications. Do not claim email delivery was tested. Direct contact is hello@cubusify.com. Configure values in the hosting settings and republish before testing real delivery.

Use the request reference to avoid duplicate retries. The server rejects cross-origin requests, invalid fields, honeypot submissions, suspicious timing, oversized bodies and more than five submissions per client per hour. Do not send sensitive documents through this form.

## Content and handoff

See CHANGELOG.md, CHECKS.md, ASSET_NOTES.md and design/brief-checks.json. All seven supplied screenshots, their implementation map and exact unpublished testimonial drafts are retained in design. Public proof must be genuine; set approval only after verification. No client results, awards, formal platform partnerships or headshots are fabricated.

The business owner confirmed on 20 October 2026 that the supplied projects are genuine. Project case studies describe the supplied screens and briefs; unconfirmed implementation stacks, client identities and measured results are not invented. Full-size images are lossless WebP with high-quality 640px previews. The founder photo is supplied. Existing technology details remain on relevant service/about pages. No new image generation was needed for this update.

The original GitHub branch remains unchanged because its connection was read-only. Source is saved in the native Site repository; this bundle can be committed to GitHub by an authorized maintainer.

## Verification limits

Automated checks cover routes, headings, links, metadata, structured data, all 422 approved original/legacy variants plus 569 optimized delivery variants, preservation of the full image set, menu order and content safeguards. Six enquiry tests pass. Six of nine interaction tests pass; three selector failures reproduce on the original HEAD. Local Chrome layout and content smoke checks are recorded in `design/seo-browser-checks.json` and `design/seo-enterprise-browser-checks.json`. Full device interaction coverage and field Core Web Vitals are not claimed.


## October 18 corrections
- Restored the requested business counters from the owner's supplied figures: 10+ years combined experience, 15+ happy clients, 21+ expert engineers, 100% client retention. These are owner supplied, not independently audited.
- Services and industries use a repaired centered carousel, 4.5-second autoplay, arrows, pagination, mouse dragging and native touch scrolling. Reduced motion, hover and focus pause are respected; resume controls work while focused.
- Homepage industries use seven original isometric vector illustrations. Product screenshots stay on industry pages.
- Hero buttons and footer have a distinct new design; all 15 platform logos have source provenance. They identify integrations, not formal partnerships.
- Added a practical SEO/AEO/GEO article with primary-source links. There are 85 routes.
- jQuery validation loads when the enquiry form approaches the viewport or receives focus. Independent server validation remains mandatory.
- All 211 original showcase images remain unchanged. Pages use 480/960/1440 WebP variants at quality 92. Original images load only in the full-size viewer. The largest display variants are about 90% smaller in aggregate; this is byte reduction, not measured page-load timing.
- Duplicate legacy previews remain in source for the review audit but are omitted from the deployment. scripts/trim-build.mjs keeps the hosted package within its limits.
- Genuine Clutch and GoodFirms company profile links replace unsupported award badges. Invented review identities and arbitrary portraits remain excluded.

## October 20 SEO content refresh

The current source has 84 routes. Content and metadata now distinguish all specialist services, industry workflows and illustrative portfolio studies. Theme files and image assets are unchanged. See `design/seo-content-changes.md`, `design/seo-content-verification.json` and the self-contained `design/seo-content-update.html` for changes and validation. The frontend build and checks pass; three interaction-test failures reproduce on the original HEAD. The public domain was not deployed.

## Project confirmation and image SEO

The business owner confirmed the supplied projects are genuine. Twelve project case studies now describe the existing briefs and screenshots without guessing delivery stacks or numerical outcomes. Existing images are reused in captioned case-study views and contextual project links. Per-page preview images, ImageObject metadata and an image-enriched sitemap are generated during prerendering.

`npm run check:frontend` includes content and image SEO checks. Eight representative local pages scored 100/100 in Lighthouse's SEO category on October 20 (see `design/lighthouse-seo-summary.json`); this is a technical checklist score, not a traffic or ranking forecast.

## October 21 enterprise content and local score report

Twelve genuine project case studies now include **proposed enterprise reference architectures**. Each adds a distinct scenario, five stack choices with rationale, three challenge/approach pairs, five workflow steps, four validation checks and an operating tradeoff. Proposed choices are explicitly separate from confirmed project screens, including in structured data. These sections do not assert an unconfirmed delivered stack, numerical outcome or certification. Technical patterns link to primary documentation.

All 38 specialist service pages include four scope-specific proposed delivery acceptance checks. Eleven parent service pages gained a third, distinct FAQ about delivery risk; the AI hub already had three. Website theme files and image assets are unchanged.

`design/seo-content-update.html` and `design/seo-score-report-updated.html` contain the same current, self-contained report. Its **local implementation completeness** metric awards 0.5 points for each of 20 explicit automated checks. All 84 pages pass all 20 checks (10/10). This is a new metric, separate from editorial quality or traffic potential; the previous editorial report is retained as `design/seo-score-report-editorial-2026-10-21.*`. The current report includes every check and its evidence, unscored content opportunities, extracted page text, proposed architectures, filters and embedded CSV/JSON downloads. No external URL requests are made by the local report builder.

Regenerate after a frontend build with `npm run report:seo`, then run `npm run check:seo-report`. For a reproducible report date, use `node scripts/build-local-seo-score-report.mjs --date=2026-10-21`. The report check verifies the build digest, score derivation, embedded data, filters, detail views and both exports. `npm run check:frontend` also verifies the architecture disclosures, structured-data separation and scope-specific acceptance sections.

## Team page: US market and editorial review

`design/team-seo-market-review.html` assesses the `/team` page across keyword demand, competitive content, editorial depth, backlinks and actual organic performance for the United States. The same assessment is embedded in the current `design/seo-content-update.html`. It is a review of the current page, not an implementation of its recommendations. Website content, theme and images were preserved during this review.

The local browser review confirms six role cards, three engagement models and four onboarding steps, with no hiring FAQs or contextual service/project links in main content. Competitor pages provide qualitative content benchmarks, not a controlled US rank or authority comparison. Ahrefs returned `Insufficient plan`, Semrush returned `no_api_units`, and Similarweb denied keyword-product access. No search-volume, difficulty, referring-domain or actual organic-performance numbers were obtained. Windsor.ai was discovered as an available Search Console/GA4 integration but is not connected. These metrics remain unverified, and no overall organic SEO score is assigned.

Review data and source citations are retained in `design/team-seo-market-review.json`; browser evidence is in `design/team-seo-browser-review.json`. Rebuild the standalone report using `npm run report:seo-market`, then regenerate the main report with `npm run report:seo`. Reassess the saved editorial findings if the team page content changes.
