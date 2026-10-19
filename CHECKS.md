# Verification

Run `npm run build`, `npm run check` and `npm test`.

The complete build preserves all 83 existing routes and adds `/services/seo-aeo-geo` and `/blog/seo-aeo-geo-where-to-start`. Route checks cover 85 pages plus a 404, one H1, canonicals, descriptions, internal links/anchors, local assets, first-paint CSS and route chunks. JSON-LD is parsed, and Open Graph/Twitter image metadata is checked. No fake ratings or unsupported FAQ markup are emitted.

All 211 showcase images retain review records, full-size lossless WebP and high-quality previews. All 422 variants are hash- and dimension-checked. No images remain pending. New responsive layouts include trust cards, services/industry carousels, featured work, editorial insights, forms and footer. Layout rules were reviewed for 320–1920px cases, but viewport rendering and interactions were not browser-tested.

Six automated enquiry tests exercise client/server validation, real SQLite storage, safe parameter binding, duplicate retries, same-origin checks, honeypot/timing checks, size limits, rate limits and failed email notifications without losing enquiries. The compiled Worker uses the same handler. Live deployment storage verification is recorded separately in the handoff when performed. Email delivery cannot be verified until runtime credentials are configured.

Three additional automated DOM/geometry tests cover carousel arrows, wrapping, keyboard navigation, autoplay resume and jQuery validation. Geometry cases cover 320, 390, 768, 1024, 1440 and 1920px; these are simulated measurements, not browser rendering.

Browser visual testing, real keyboard/touch interactions, cross-browser checks, theme screenshots and real load timings remain unavailable because the managed environment has no supported browser-control skill. No previous browser results apply to this update. Field Core Web Vitals are not inferred from build sizes.

Build-size comparisons appear in design/performance-comparison.json; route modules, images and server resources are additional. Exact screenshot coverage, content safeguards and remaining verification limits appear in design/brief-checks.json.

569 delivery WebPs have file hashes verified against the manifest. A 1440px operations-dashboard variant was visually inspected for text clarity. Original/legacy image audits remain intact. The image delivery report records original and delivery byte totals. No claim is made that all compressed variants were visually reviewed.

Email recipient is configured. RESEND_API_KEY and a verified ENQUIRY_FROM sender remain missing, and no live email has been sent. The earlier deployed enquiry database test remains relevant because the backend handler is unchanged. A fresh deployment smoke check is recorded separately when performed.
