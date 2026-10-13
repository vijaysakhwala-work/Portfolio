# Cubusify — updated React project

This updates the original React + Vite project to the selected white, cobalt, cyan and orange design. The complete production build is included in `dist/`.

## Run

Requires Node.js 22+ and npm.

```bash
npm ci
npm run dev
```

Then open the address printed by Vite. To create and verify the Cloudflare build:

```bash
npm run build
npm run check
```

`npm run preview` serves the built site locally.

## Updated website

- New homepage: business-focused hero, trust area, four core services, Results as a Service, product demos, photo industry cards, Why Cubusify, solution showcases and project enquiry.
- Technology section removed from the homepage and navigation.
- Desktop service mega menu with Build, Experience & growth, and Operate & improve groups.
- Mobile accordion navigation with usable service and company links.
- About Us, Careers, Our Team, Blog and Contact Us remain separate pages. The team page presents capabilities rather than unapproved personal profiles.
- All 73 existing routes remain available, including 12 service categories, 38 subsections and eight industry pages.
- Distinct product experiences for the service subsections, including production scheduling, customer workspaces, storefronts, document intake, source-supported sample answers, QA, releases, sample wallet transfers, Snake and Memory Garden.
- A short introductory developer animation with skip and reduced-motion support.
- Local fonts and assets, prerendered HTML, page metadata, sitemap and a 404 page.

## Add your client evidence

Edit `src/content.js` to add verified counts, authorised client logos and approved reviews. Metrics and review cards appear when their data is supplied. The source leaves these empty rather than publishing invented figures or testimonials.

```js
export const proof = {
  clientsServed: null,
  yearsExperience: null,
  projectsDelivered: null,
  clientSatisfaction: null,
  logos: [], // { name, image, url }
  testimonials: [], // { quote, name, company, project }
};
```

## Files to edit

| File | Purpose |
| --- | --- |
| `src/Redesign.jsx` | Header, homepage sections, footer and enquiry form |
| `src/redesign.css` | Selected brand theme and responsive page layouts |
| `src/JourneyDemos.jsx` | Distinct service demo flows |
| `src/journeys.css` | Product interface and game styling |
| `src/Demos.jsx` | Shared demo shell and retained interactive components |
| `src/catalog.js` | Service routes, descriptions, industries and articles |
| `src/content.js` | Client proof and contact address |
| `src/App.jsx` | Routing and supporting pages |

## Cloudflare Pages

Upload the contents of `dist/` using your existing Cloudflare Pages project. `index.html` must be at the upload root. Alternatively, connect this source to your repository with build command `npm run build` and output directory `dist`.

Set `SITE_URL` at build time if the production origin differs from `https://cubusify.com`. The default is your existing Cubusify domain. No deployment or DNS change was made by this update.

## Enquiries and demos

The enquiry form opens an email draft in the visitor's email application. The visitor must send it there. A server-side email service is not connected in this source.

Product demos use sample data. AI responses are scripted; payments, wallet transfers, releases, bookings and messages remain local demonstrations. They do not act on external services.

The industry photographs and shoe thumbnail are extracted from the approved design reference. Full-size original project assets remain included. Use higher-resolution owned or licensed photography when replacing these assets for larger display sizes.

See `CHECKS.md` for build and browser validation.
