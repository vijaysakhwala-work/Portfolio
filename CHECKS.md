# Build and browser verification

Verified on 6 October 2026 with the production build.

- `npm ci`, `npm run build` and `npm run check` passed.
- 73 prerendered pages, covering 12 service categories and 38 subsections.
- 2,551 internal route references and 544 local asset references checked.
- 107 upload files; largest file 509,878 bytes. The build passes the project's Cloudflare direct-upload checks.
- All 73 routes opened in Chromium at 1,440px, 390px and 320px. Each has one main heading and one site header, with no page-level horizontal overflow.
- No browser JavaScript errors or React hydration errors were recorded.
- Desktop menu open/close and Escape, mobile accordion navigation, and service navigation passed.
- Demo directory search, empty state, reset and all 38 previews passed.
- Production scheduling/report, workspace creation/member/plan, invalid API JSON handling, and valid sample API response passed.
- Food customisation/delivery, booking pass/reset, coupon validation and discounted checkout passed.
- Migration validation/rollout, source-supported document answer/human handoff, QA issue/fix/rerun, release/rollback and sample wallet validation/balance passed.
- Snake score/pause/restart and Memory Garden completion passed.
- Homepage, mobile contact form, CRM and brand interface screenshots were visually reviewed. CRM columns scroll inside their panel on narrow screens.

These checks used automated Chromium and visual inspection. Product demonstrations remain local simulations. The enquiry form prepares a mailto draft; it is not a server-side email integration. No production deployment was performed.
