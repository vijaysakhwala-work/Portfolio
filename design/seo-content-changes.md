# SEO content changes — 20 October 2026

Implemented in the local portfolio source and rebuilt the frontend. The public domain was not deployed or changed.

## Content coverage

- All 84 routes retain their URLs and receive descriptive, unique titles and meta descriptions.
- 33 non-AI specialist pages now have distinct service scope, deliverables, planning steps and three specific buying FAQs. They no longer inherit the parent body copy or show a duplicate generic process section. Their scope cards link to relevant delivery details rather than to the page itself.
- Five AI specialist pages now explain evaluation, data permissions, operational exceptions and service-specific implementation boundaries. Their duplicate generic process block was removed.
- Eleven non-AI service hubs and the AI hub explain where each service fits, the alternatives to consider and what is needed to scope it.
- Seven industry pages now cover sector-specific records, data ownership, integration questions and exception handling. They link to relevant specialist services.
- Twelve portfolio details now present genuine project case studies, following the business owner?s confirmation. They explain the project briefs and screen-level workflows, with captioned desktop/mobile screenshots and project structured data. Unknown client identities, technology stacks and measured results are not invented.
- The homepage, directories, About, Hire Team and Contact content now describe the actual offer and engagement process more clearly. The homepage H1 is stable and descriptive; existing visual styling and diagram animation remain.
- Four articles have clearer search-oriented titles, original hypothetical worked examples and links to the matching services. The search article now includes public availability, differentiated page intent and a practical measurement plan. Editorial attribution links to the existing business About page; no expert review was invented.
- The overlapping SEO offers and SaaS offers retain separate URLs with explicit distinctions: page-level SEO versus broader search strategy; new platform creation versus ongoing SaaS engineering.
- Unsupported organic-traffic/project-count claims were replaced with actual deliverables. Directory copy no longer asserts verified awards. Two testimonial identities explicitly disallowed by the existing checks were removed; the other owner-supplied testimonials and business counters remain.
- Privacy and Terms remain utility documents; their metadata was clarified without inventing legal policy promises.

## Preservation

No CSS, theme palette, image file, responsive image manifest or gallery image selection was changed. All 211 original showcases, 422 original/preview files and 569 delivery variants pass the existing asset checks. Additional placements of the same project images provide context and crawlable screenshots; no image files were changed.

## Verification

- `npm run build:frontend`: passes; 84 pages plus a 404 generated.
- Frontend checks: pass for links, assets, navigation, headings, first-paint styles, image hashes/dimensions, structured data, unique metadata, sitemap entries and reachability from the homepage.
- New `scripts/check-content.mjs`: passes; checks for inherited specialist copy, self-linked service cards, duplicate process sections, stale titles, unlabelled interface studies and unsupported search claims. Included in both check commands.
- All original image files remain unchanged; the existing asset scripts verify their bytes. Case studies and related-project sections intentionally add image placements.
- After adding shared project references, the highest five-word Jaccard similarity among the 44 within-family specialist comparisons is 18.6%. The initially repetitive non-AI group had nearest matches of 86.9–91.8%. These are repetition diagnostics, not search scores.
- The six enquiry/storage tests pass. Six of nine interaction tests pass. The three interaction failures (gallery play control, scroll-sequence indicator and service-picker selector) reproduce with the same assertions in an isolated checkout of the original HEAD. An unchanged test harness leaves timers running after failure; a disposable diagnostic copy added teardown solely to report the failures. Production interaction code and the committed interaction tests were not altered.
- The showcase checker needed a one-line Windows path-separator normalisation; no assets were removed or modified.

Full per-page before/after evidence: `seo-content-verification.json`. A browsable summary is in `seo-content-update.html`.

## Remaining operational work

Publishing the intended portfolio is still necessary: the prior live check found a different homepage on cubusify.com and 83 portfolio routes returning 404. Search Console verification, live indexability, real-user performance and post-publication query/enquiry measurement remain unverified. These content changes do not establish rankings or a traffic uplift.

No complete Worker build or deployment was attempted: server behaviour was outside this content-only change. Frontend build output is in `dist/`.

## Project evidence and technical SEO follow-up

The owner confirmed all supplied projects are genuine and authorised deriving descriptions from available material. All twelve case studies now explain the visible workflows using the existing briefs and screenshots. Relevant service, industry and article pages link to that work. Project roles, implementation stacks, public URLs and quantitative results remain omitted when unknown.

Every route has primary-image metadata with dimensions, alt text and ImageObject schema. The sitemap contains 388 image references drawn from actual page HTML. Twelve case-study CreativeWork nodes and 24 captioned desktop/mobile screenshots are checked automatically. There are 70 distinct primary images across the 84 routes.

Lighthouse 13.5.0 scored all eight representative local pages 100/100 in its SEO category. This is an automated technical checklist result, separate from editorial scores and live search performance. Local Chrome checks at 390px and 1440px found no horizontal overflow, missing alt attributes or broken images on the homepage, Intake case study and Shopify service page. Observed LCP/CLS values are unthrottled local lab measurements, not field Core Web Vitals.

See `lighthouse-seo-summary.json`, the eight Lighthouse reports, `image-seo-checks.json`, `seo-browser-checks.json` and `seo-score-report-updated.html`.

## October 21: enterprise architecture and local implementation score

- Added twelve clearly labelled proposed enterprise architectures to the genuine case studies. Each contains a scenario, objective, five stack decisions with rationale, three challenge/approach pairs, five workflow steps, four validation checks and a tradeoff. The stories cover multi-studio publishing, headless commerce integration, travel reservation coordination, kitchen reconnects, offline plan sync, appointment conflicts, dependency graphs, invoice reconciliation, replenishment, permission-aware AI retrieval, customer messaging and CRM handoffs.
- Technology choices vary by workflow rather than repeating a generic stack. Examples include React/Next.js, Hydrogen, Flutter, React Native, Angular, Vue, ASP.NET Core, Java/Spring Boot, Kotlin, Go, FastAPI, PostgreSQL, pgvector, queues, Temporal and OpenTelemetry. They are proposed designs, not unverified claims about the past production implementation. Significant tradeoffs explain when the more complex architecture would be unwarranted.
- A separate CreativeWork reference-architecture node is linked to each case study. Its description explicitly identifies the scenario and stack as illustrative; no production technology, certification or outcome is invented in schema.
- All 38 specialist services gained four distinct proposed acceptance checks (152 in total). Eleven parent service pages gained a practical third FAQ about delivery risk; the AI hub already had three.
- No website CSS or image files changed. The existing image hash checks pass. The frontend package contains 968 files and 264,580,733 bytes, within the existing upload limits.
- `scripts/check-content.mjs` now guards architecture structure/disclosure, reference schema relationships and acceptance checks. Highest within-family five-word similarity is 18.9% across the 44 specialist comparisons, well below its 50% regression threshold. This is a repetition diagnostic, not a search-engine score.
- Build and frontend checks pass. Local Chrome checks cover the new case-study and service sections at 320px, 390px and 1440px; see `seo-enterprise-browser-checks.json`. The earlier three-route mobile/desktop pass was refreshed locally. No field performance or full device interaction coverage is claimed.

The current self-contained `seo-content-update.html` and `seo-score-report-updated.html` use the new **local-implementation-v1** rubric. Each of 20 explicit checks contributes 0.5 points. All 84 generated pages pass all 20 checks, producing 10/10 for local implementation completeness. The score is calculated from actual results, with no target-score override. It does not assess editorial excellence, legal completeness, competitive demand, rankings or traffic. Page-specific next content opportunities remain visible in the report.

This is a separate metric from the earlier editorial judgments. Their HTML/JSON/CSV are preserved as `seo-score-report-editorial-2026-10-21.*`; no numerical improvement between the two methods is claimed. The current report builder reads only local files. It includes all page text, headings, links, rule-level evidence and the proposed project architectures; its filters and exports work without external resources. `npm run check:seo-report` verifies it against the current build digest and exercises filtering, detail navigation and both downloads.

## Team-page US market review

The follow-up review assesses the five broader factors excluded from the implementation rubric, scoped to `/team` and the owner's selected United States market. It is embedded near the top of the current score report and available separately as `team-seo-market-review.html`. No website copy, theme or image files were changed by this review.

The current client-rendered team page was checked at 390px and 1440px. Both checks found six roles, three engagement models, four onboarding steps, zero hiring FAQs and zero contextual project/service links in main content, with no horizontal overflow, broken images, missing alt attributes or JavaScript errors. Role-button selection/focus was exercised without submitting a form. Source inspection confirms that the team form prepares an email draft; this does not prove a received enquiry. The local Vite watcher initially encountered the in-workspace Chrome profile; QA was moved to an external temporary profile and localhost was restarted successfully.

Three primary competitor pages provide content benchmarks: Full Scale's dedicated developer page, Toptal's developer marketplace and iQlance's AI hiring page. Their public content was reviewed; business claims, backlink strength and US ranking positions were not independently verified. Seven keyword candidates are hypotheses, with volumes and difficulty left null. Ahrefs, Semrush and Similarweb requests were blocked by plan/API-unit/product access, and no first-party Search Console/GA4 data was available. Windsor.ai was found as an available integration but remains unconnected. Missing data is explicitly unverified; no overall organic SEO score is invented.

The review includes nine editorial coverage findings, six prioritised actions, data-access results, cited sources and an acquisition measurement plan. The main report's 10/10 local implementation score remains a different metric. Both report builders and the main report's digest/filter/detail/export checks pass.
