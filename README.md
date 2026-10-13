# Cubusify (React redesign)

The Cubusify website redesigned as a React + Vite project, using the same architecture as the original: plain links, prerendered HTML for every route, a sitemap and a build checker. It deploys to Cloudflare Pages as static files.

## Run it

Requires Node.js 22+ and npm.

```bash
npm install
npm run dev        # http://localhost:4173
npm run build      # vite build, then prerender every route to static HTML
npm run check      # verifies pages, links, assets, h1, canonical and descriptions
npm run preview    # serves the built dist/ folder
```

`npm run build` produces `dist/`. Upload that folder to Cloudflare Pages, or connect the repository with build command `npm run build` and output directory `dist`. Set `SITE_URL` at build time if the production origin is not `https://cubusify.com`.

## What changed from the original project

- **New design system** across every page: a cube-led hero that tells the Results as a Service story on scroll, mega menus with real screenshots and code examples, a command palette (`Ctrl` or `Cmd` + `K`, or `/`), light and dark themes, and a mobile drawer.
- **Redesigned pages** (all data-driven from `catalog.js` and `work-projects.js`): home, services (index, 12 service pages, 38 sub-service pages), industries (index and 8 industry pages, including a new Media page), work (index and 12 project pages), blog (index and articles), About, Hire Team, Careers, Contact, Privacy, Terms and 404.
- **Home sections added:** trust strip, tech stack tabs, featured work, hire team, certificates and awards, insights and FAQ.
- **Demo Studio kept:** `/demo-studio` reuses your existing `LiveStudio.jsx` (five working demos) inside the new layout.
- **Lighter dependencies:** only `react`, `react-dom`, `vite`, `@vitejs/plugin-react` and `esbuild`. The `motion` and `lucide-react` packages are no longer needed. Fonts (Schibsted Grotesk, Instrument Sans, JetBrains Mono, SIL Open Font Licence) are self-hosted in `public/fonts`, so there are no third-party requests.
- The same build scripts as before (`scripts/prerender.mjs`, `scripts/check-build.mjs`) are kept, and 94 pages are generated.

## Fill in what we don't know: `src/lib/proof.js`

Anything the team has not confirmed is blank on purpose and shows as a dashed placeholder. Nothing is invented: no certificates, client logos, awards, quotes, figures, phone numbers or registration details.

- **Stats:** set `value` to a verified number, for example `value: 12`. It shows `12+` and counts up.
- **Certificates:** set `held: true` only when Cubusify really holds it, then fill `issuer`, `number`, `validUntil` and `verifyUrl`. The tile turns solid and gains a Verify link.
- **Client logos, awards, testimonials, leadership, offices, social links, legal details, phone, WhatsApp:** fill in the same file. A WhatsApp number (digits with country code) switches on a floating chat button.
- **Before launch:** set `showBlanks: false`. Every empty slot disappears, and sections with nothing real left hide themselves.

FAQ answers and a few other texts are in `src/lib/site.js`. Two FAQ answers (cost and timeline) are blank on purpose.

## Services, AI details and blog content

Long-form content is plain data in `src/content/`, so editing it never means touching a component.

| File | What is in it |
| --- | --- |
| `services-build.js`, `services-growth.js`, `services-ai.js`, `services-ops.js` | For each of the 12 services: SEO title and description, a quotable definition, what we build, an **AI section** (how AI helps in that service, with the human check), benefits, deliverables, who it is for, 5 FAQs. For each of the 38 sub-services: what is included, an AI section, best for, deliverables, 3 FAQs. The AI service also has a maturity ladder and a safety list. |
| `blog-1.js` to `blog-4.js` | 12 articles of roughly 1,500 to 2,100 words, each with key takeaways, tables or checklists, FAQs and empty image slots. |
| `order.js` | The order of posts on the blog index and the home page. |

How it works:
- `npm run dev` and `npm run build` first run `scripts/split-content.mjs`, which splits the content into a small index that ships on every page and one lazy chunk per service or post (generated into `src/content/gen/`, git-ignored). The home page ships none of the long text, and a page downloads only its own chunk.
- `npm run validate:content` checks every entry against the content rules: title and description length, item counts, valid internal links, no em dashes, no filler phrases, no raw HTML. `npm run check` runs it and then the build checker, which also verifies one h1 per page, unique titles and descriptions, valid JSON-LD (Service, BlogPosting, BreadcrumbList, FAQPage), alt attributes and that no raw markdown leaked into a page.
- In text fields, `[label](/path)` makes a link and `**bold**` makes bold. Nothing else is interpreted.
- The build also writes `sitemap.xml` (with `lastmod` for posts), `feed.xml` (RSS) and `llms.txt` (a plain-text map of the site for AI assistants).

Adding a blog post: add an object to a `blog-*.js` file (schema at the top of those files' posts), add its slug to `src/content/order.js`, run `npm run validate:content`. It gets a page, a card, a sitemap entry, an RSS item and schema automatically.

### Image slots (empty on purpose)

Every picture frame on the services and blog pages is empty until you fill it. Empty frames show a dashed placeholder labelled "Desktop view", "Mobile view" or "Cover image", with a short art-direction brief; setting `showBlanks: false` in `proof.js` hides every one at launch.

- **Service and sub-service pages** (desktop + mobile frames): put images in `public/images/` and list them in `src/lib/slots.js`, for example `'/services/web': { desktop: '/images/slots/web-desktop.webp', mobile: '/images/slots/web-mobile.webp', alt: '...' }`.
- **Blog posts:** each post has `cover: { alt, brief }` and `figure` blocks with `alt` and `brief`. Add `src: '/images/blog/name.webp'` to fill one. A cover `src` is also used as the post's schema image.

### Layout rules and checking every device

- **Scannable cards.** Every card is an icon, a heading and one sentence. Longer text sits behind a native `<details>` "Read more" (kept in the page for search engines and find-in-page). The splitter is `src/components/text.jsx`.
- **No orphan cards.** Card grids use the `.fit` class with `data-n` set to the number of cards. It lays out 12 columns by count (5 = 3 + 2, 4 = 2 + 2, 6 = 3 + 3), two across on tablets and one on phones. `npm run check` fails the build for a count that would leave a lone card.
- **See every device at once.** Run `npm run dev` and open `/devices.html`. It shows any route at 320, 390, 768, 1024, 1280 and 1536 px, using real viewport widths so the media queries behave as on those devices. It is a dev page and is not part of the build.

### Pictures: the site ships with none

Every screenshot and photo is an empty image holder (a dashed, labelled frame), except the industry pictures on the home page and in the menu. The brand logo, favicon and technology logos also remain. The old pictures were moved, not deleted, to `_local/archive/images/` (outside the site).

To fill a holder, put a file in the matching folder, named after its key, and restart `npm run dev` (the build scans these folders automatically):

| Folder | File name (key) | Used for |
| --- | --- | --- |
| `public/images/shots/` | `svc-<service>`, e.g. `svc-web.webp` | service pages, services index, menu preview |
| `public/images/shots/` | `ai-<item>`, e.g. `ai-ai-assistants.webp` | the AI menu preview |
| `public/images/shots/` | `work-<project>`, e.g. `work-haven.webp` | work pages, home, menu preview |
| `public/images/industries/` | `<industry>`, e.g. `healthcare.webp` | the home page gallery and the Industries menu (these are in place now) |
| `public/images/industries/` | `page-<industry>`, e.g. `page-healthcare.webp` | the Industries index tiles and each industry's own page (empty holders for now) |
| `public/images/people/` | `founder` | About page and home |

To bring back the old pictures, copy `_local/archive/images/shots` and `_local/archive/images/industries` into `public/images/`, and `_local/archive/images/founder.jpg` to `public/images/people/`. The names already match. You can also set a path by hand in `src/lib/images.js`. Blog images and the desktop/mobile frames on service pages are filled as described under "Image slots". `showBlanks: false` in `proof.js` hides every empty holder at launch.

### Facts to confirm before launch

The copy never states prices, timelines, client results, certifications or statistics about Cubusify. It does describe a few working practices, taken from the Results as a Service method. Check these match reality and edit them if not: source code is handed over to the client; engineers use AI assistants for drafting tests and review, with human review; cloud work runs in the client's own accounts; an independent audit is recommended before a smart contract holds real value; staff training and store submission for mobile apps; the games service focuses on 2D and interactive work. Authorship is "the Cubusify team"; add a named author to `src/seo.js` and the article byline when you want one for E-E-A-T.

## Project structure

| Path | What it is |
| --- | --- |
| `src/App.jsx` | Router: maps a path to a page using `routeInfo()` from `catalog.js` |
| `src/catalog.js`, `src/work-projects.js`, `src/content.js` | Your data (services, industries, articles, projects). A Media industry was added to the catalog |
| `src/lib/site.js` | Shared data: glyphs, tech stack, AI code examples, roles and models, FAQ |
| `src/lib/proof.js` | **The config to fill in** (see above) |
| `src/content/`, `src/service-details.js`, `src/blog-posts.js` | Long-form service, AI and blog content, and the light indexes built from it (see above) |
| `src/lib/slots.js` | Paths for the empty desktop and mobile image frames |
| `src/seo.js` | Structured data, RSS feed and `llms.txt` for the build |
| `src/lib/site-context.jsx` | Theme, toast, clipboard and palette state |
| `src/lib/stage-engine.js` | The canvas animation behind the hero cube |
| `src/components/` | Header and mega menus, command palette, footer, layout, shared UI |
| `src/sections/` | Home page sections and the contact form |
| `src/pages/` | Services pages and all other pages |
| `src/styles/` | `site.css` (design system) and `pages.css` (inner pages) |
| `src/LiveStudio.jsx`, `src/live-studio.css` | Your existing Demo Studio |
| `public/` | Images, fonts, `_headers` |

## Rules this architecture relies on

- Pages are prerendered with `renderToString`, so anything touching `window` or `document` must run inside `useEffect`.
- Internal links are plain `<a href>` (no client router). The checker fails the build if a link points at a missing route or asset.
- Import CSS in `src/main.jsx` only, not inside components that `App.jsx` renders.
- Exactly one `<h1>` per page. The checker enforces this.

## Notes on content

- Industry photographs are AI-generated illustrative images, not photographs of Cubusify clients or employees (per your `ASSET_NOTES.md`). The site says so.
- "Our Work" projects are design concepts and are labelled that way.
- Demos and the chat-to-spreadsheet animation use sample data and send nothing.
- The enquiry form opens an email draft to `hello@cubusify.com`, like the original. A file picked in the upload box cannot ride along in a `mailto:` link, so the form tells the visitor to attach it in their email app. A server-side form handler is the real fix.
- Technology logos are the ones in your original `public/images/tech`. Categories with no confirmed technologies show blank slots.

## Not carried over from the original

These were part of the old design and were not rebuilt. Say the word and they can be ported:

- The per-sub-service interactive journey demos (`JourneyDemos.jsx`) and the AI, service and industry "sample" pages (`AISamplePage`, `ServiceSamplePage`, `IndustrySamplePage`). Sub-service pages now show a description, process, tools and a link to the closest Demo Studio demo.
- The old beam hero, loading storyboard and Crisp preview components.
- The original large `public/images` set (the `clear/` variants and page artwork). Only the images the new design uses are included, which keeps the project small.
