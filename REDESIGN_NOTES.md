# Redesign handover

The latest homepage in the complete visual review is the implementation direction. Earlier dark and warm editorial concepts remain reference material and were not applied.

The new homepage uses the exact core message, “We build the software your business runs on,” with “Results as a Service” explained through three steps: define the goal, deliver in milestones and measure what changes. The layout removes the technology section, uses industry photographs and carries the selected blue/cyan/orange branding through navigation, services and company pages.

Metrics and client reviews are implemented as data-driven sections in `src/content.js`. Add verified figures, authorised logos and approved quotations there. Unpopulated proof cards are hidden on the public site.

The 38 subsection routes retain their identities. Each has a relevant interface and completion path. Shared primitives such as buttons and fields stay consistent, while product workflows differ: workspaces, production planning, editorial sites, task portals, food delivery, fitness, commerce, automation, testing, releases and games.

The project uses the original React + Vite stack, Motion, and Lucide icons. The static Cloudflare output is already built under `dist/`. No external account, production website or DNS configuration was changed.



## Reference beam hero update
- Matches the approved light-theme reference: six left icon nodes, six right service pills, curved beams, central transparent cube, and two technology panels.
- Categories: Custom software; AI & automation; Websites & apps; Product & graphic design; Cloud & integrations; Maintenance & support.
- Headline below the graphic: One Stop Solution for Development, with rotating typewriter phrases.
- Animated connections highlight services in sequence and carry moving light pulses.
- SVG/React implementation with editable text and icons, no raster screenshot used as the hero.
- Responsive mobile service cards, keyboard-accessible service links, reduced-motion support, and static crawlable heading.
- Existing site header, theme and remaining sections retained.
- Production build and all 73 page/link/asset checks passed.
- Visual browser verification unavailable in this environment.

### Technology panel animation
- Keyboard/data dots light sequentially to suggest typing.
- Cloud progress bar cycles, connection indicators animate, and the key icon glows softly.
- Lower panel cursor scans its track and status light gently pulses.
- All panel motion stops for reduced-motion preferences.
- Build and existing 73-page checks passed.

### Synchronized beam fix
- Left and right pulses now start together and travel inward to the cube.
- Both paths use normalized progress and a 2.6-second cycle, completing before the 3-second service switch.
- Removed the right-side delay and premature animation restart.
- Build and all 73 page/link/asset checks passed.
