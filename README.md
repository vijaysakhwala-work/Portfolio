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

The complete build first produces 85 prerendered pages and a 404, validates them, then builds the supported Sites Worker runtime. Output is `dist/client` for assets and `dist/server` for the Worker. Publish that complete artifact through Sites. A static-only host can serve `dist/client`, but `/api/enquiries` requires the Worker and DB binding.

For a standalone built Worker preview, run Wrangler from the project root with `server-runtime/node_modules/wrangler/bin/wrangler.js dev --config dist/server/wrangler.json --local --persist-to server-runtime/.wrangler/state` after applying the committed D1 migration locally. This preview is for environments that support it; it was not used for browser QA here.

## Enquiries

The Sites manifest declares D1 as `DB`; the generated schema-only migration is in `server-runtime/drizzle`. Sites applies hosted migrations during publication. Enquiries appear in the Site's database viewer under `enquiries`. Store rows contain consent, submitted fields, a reference and email delivery status. Raw request IP addresses are not stored; a daily one-way hash supports the submission limit.

Optional email notifications require three runtime variables: `RESEND_API_KEY` (secret), `ENQUIRY_FROM` (a verified sender) and `ENQUIRY_TO` (approved recipient). No values are shipped or invented. ENQUIRY_TO is configured as hello@cubusify.com. RESEND_API_KEY and the verified ENQUIRY_FROM sender are still missing, so storage works without email notifications. Do not claim email delivery was tested. Direct contact is hello@cubusify.com. Configure values in the hosting settings and republish before testing real delivery.

Use the request reference to avoid duplicate retries. The server rejects cross-origin requests, invalid fields, honeypot submissions, suspicious timing, oversized bodies and more than five submissions per client per hour. Do not send sensitive documents through this form.

## Content and handoff

See CHANGELOG.md, CHECKS.md, ASSET_NOTES.md and design/brief-checks.json. All seven supplied screenshots, their implementation map and exact unpublished testimonial drafts are retained in design. Public proof must be genuine; set approval only after verification. No client results, awards, formal platform partnerships or headshots are fabricated.

Showcase images illustrate product capabilities, not verified delivered client relationships. Full-size images are lossless WebP with high-quality 640px previews. The founder photo is supplied. Existing technology details remain on relevant service/about pages. No new image generation was needed for this update.

The original GitHub branch remains unchanged because its connection was read-only. Source is saved in the native Site repository; this bundle can be committed to GitHub by an authorized maintainer.

## Verification limits

Automated checks cover routes, headings, links, metadata, structured data, all 422 approved original/legacy variants plus 569 optimized delivery variants, preservation of the full image set, menu order and content safeguards. Nine automated tests cover real SQLite storage, atomic rate limits, mounted carousel controls, viewport geometry and jQuery field validation. Browser visual checks, primary UI interactions across devices, and measured Core Web Vitals remain unverified because no supported browser-control skill is available.


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
