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

Public proof must be genuine; set approval only after verification. No client results, awards, formal platform partnerships or headshots are fabricated.

The business owner confirmed on 20 October 2026 that the supplied projects are genuine. Project case studies describe the supplied screens and briefs; unconfirmed implementation stacks, client identities and measured results are not invented. Full-size images are lossless WebP with high-quality 640px previews. The founder photo is supplied. Existing technology details remain on relevant service/about pages. No new image generation was needed for this update.

The original GitHub branch remains unchanged because its connection was read-only. Source is saved in the native Site repository; this bundle can be committed to GitHub by an authorized maintainer.

## Verification

Automated checks (`npm run check`, `npm test`) cover routes, headings, links, metadata, structured data, image variants, menu order and content safeguards. Field Core Web Vitals and full device interaction coverage are not claimed.

## Business notes

- Owner-supplied counters: 10+ years combined experience, 15+ happy clients, 21+ expert engineers, 100% client retention. These are not independently audited.
- The owner confirmed the supplied projects are genuine. Case studies describe visible workflows and do not invent delivery stacks, client identities or measured results. Proposed enterprise reference architectures are labelled as such.
- Platform logos identify integrations, not formal partnerships. Clutch and GoodFirms links are company profiles, not awards.
- `scripts/trim-build.mjs` keeps the hosted package within its size limits.
