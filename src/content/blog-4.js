const ciYaml = `name: ci

on:
  pull_request:
  push:
    branches: [main]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
      - run: npm run build

  deploy:
    needs: verify
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - name: Deploy (replace with your own deploy step)
        run: ./scripts/deploy.sh
        env:
          DEPLOY_TOKEN: \${{ secrets.DEPLOY_TOKEN }}`;

export const posts = [
  {
    slug: 'flutter-vs-react-native',
    title: 'Flutter vs React Native in 2026: which should you choose?',
    seoTitle: 'Flutter vs React Native: How to Choose in 2026',
    metaDescription:
      'Flutter vs React Native in 2026: compare language, UI, performance, hiring and web reuse, with a clear choose-X-if list. Talk to us about your app.',
    keyword: 'Flutter vs React Native',
    keywords: [
      'cross-platform mobile app development',
      'Flutter app development',
      'React Native app development',
      'Expo React Native',
      'native vs cross-platform apps',
      'progressive web app vs native app',
    ],
    category: 'MOBILE',
    published: '2026-10-13',
    updated: '2026-10-13',
    summary:
      'Flutter vs React Native comes down to team skills, how custom your UI is, native SDK needs and web reuse. Here is how to decide, with a table and checklist.',
    takeaways: [
      'Choose by your team and product, not by popularity: a React web team usually moves faster with React Native, while a team starting fresh with a design-led UI often suits Flutter.',
      'Flutter draws its own interface with its own rendering engine, so it looks the same everywhere. React Native uses the platform’s own native UI components, so it follows each platform’s look and feel.',
      'Check every native SDK you need (payments, Bluetooth, maps, health data) before you commit. Missing or poorly maintained plugins are the most common cause of cross-platform pain.',
      'Both can ship real products. Fully native is worth the extra cost only for the most demanding graphics, hardware or platform-specific features, and a PWA may be enough for simpler needs.',
      'Plan for maintenance from day one. Both frameworks release often, so budget time for upgrades and dependency checks after launch.',
    ],
    cover: {
      alt: 'Two phone screens side by side showing the same app built with two different cross-platform toolchains',
      brief:
        'Flat editorial illustration of two smartphones sharing one app layout, linked by a simple branching line. Cobalt and cyan on a dark navy background with an orange accent. No logos.',
    },
    body: [
      {
        t: 'p',
        x: 'Flutter vs React Native is mostly a question about your team and your product. Flutter, from Google, uses the Dart language and draws its own interface. React Native, from Meta, uses JavaScript or TypeScript and renders real native components. Both build iOS and Android apps from one codebase.',
      },
      {
        t: 'p',
        x: 'If your team already writes React for the web, React Native is usually the faster start. If you want one tightly controlled, brand-led interface across phones, web and desktop, Flutter is a strong fit. The rest of this guide gives you the criteria to check before you decide.',
      },
      { t: 'h2', x: 'What is the difference between Flutter and React Native?' },
      {
        t: 'p',
        x: 'Flutter is a UI toolkit that uses the Dart language and paints every pixel itself. React Native is a framework that lets you write JavaScript or TypeScript and have it drive the platform’s own native UI components. That one design choice explains most of the trade-offs that follow.',
      },
      {
        t: 'p',
        x: 'With Flutter, the app ships with its own rendering engine. Impeller is now the default renderer on iOS, and on Android for devices on supported versions, according to the Flutter documentation. Because Flutter owns the drawing, a button looks and behaves the same on every device, and it can target mobile, web and desktop from the same code.',
      },
      {
        t: 'p',
        x: 'With React Native, your JavaScript describes the screen and the framework creates real iOS and Android views. Since version 0.76 the New Architecture is the default, and the React Native team recommends starting new apps with a framework such as Expo rather than a bare project. Expo adds tooling for builds, updates and common device features.',
      },
      { t: 'h2', x: 'Flutter vs React Native at a glance' },
      {
        t: 'p',
        x: 'This table summarises the points that usually decide a project. Treat it as a starting point and test the specific features your app needs, because the details matter more than the headline differences.',
      },
      {
        t: 'table',
        caption: 'Flutter vs React Native: key differences for a new project',
        head: ['Criteria', 'Flutter', 'React Native'],
        rows: [
          ['Language', 'Dart', 'JavaScript or TypeScript'],
          ['How the UI is produced', 'Drawn by Flutter’s own rendering engine', 'Real native UI components for each platform'],
          ['Look and feel', 'Identical across platforms by default', 'Follows each platform’s native look'],
          ['Starting point', 'Flutter SDK', 'Expo is the common recommendation for new apps'],
          ['Platforms', 'Mobile, web and desktop from one codebase', 'Mobile first; web through React Native for Web or Expo'],
          ['Web code sharing', 'Shares Flutter code, not React code', 'Can share logic and some components with a React web app'],
          ['Hiring pool', 'Smaller, Dart and Flutter specialists', 'Large, drawn from JavaScript and React developers'],
          ['Best when', 'Custom, brand-led UI and one team owning everything', 'You have React skills or want a native feel'],
        ],
      },
      {
        t: 'figure',
        ratio: 'wide',
        alt: 'Diagram comparing how Flutter draws its own interface with how React Native drives native UI components',
        brief:
          'Clean two-column technical illustration: left column a single canvas layer labelled generically, right column a stack of native view blocks. Cobalt, cyan and orange on dark navy. No product logos.',
        caption: 'Flutter paints its own interface. React Native asks the platform to draw native components.',
      },
      { t: 'h2', x: 'Which one fits your team’s skills?' },
      {
        t: 'p',
        x: 'Pick the framework your team can be productive in within weeks, not the one that looks best on paper. A team fluent in React, TypeScript and the web ecosystem will carry most of that knowledge into React Native. A team with no strong web background has no such advantage, so Dart is a fair choice.',
      },
      {
        t: 'p',
        x: 'Dart is a clean, typed language and most developers pick it up quickly, but it is another language to learn and another toolchain to maintain. If you already run a React web app, sharing TypeScript types, API clients and validation logic with the mobile app can save real effort. That sharing is the strongest argument for React Native in a web-first company.',
      },
      {
        t: 'p',
        x: 'If you are hiring from scratch, ask where the people you can afford actually are. The JavaScript talent pool is far larger, which helps with recruitment and with cover when someone leaves. Flutter specialists are easier to find than they once were, but fewer people have shipped large Flutter apps.',
      },
      { t: 'h2', x: 'Do you need a unique UI or a native feel?' },
      {
        t: 'p',
        x: 'Choose Flutter when the interface itself is the product and must look identical everywhere. Choose React Native when users expect the app to behave like a normal iPhone or Android app, with the platform’s own scrolling, text input and accessibility behaviour built in.',
      },
      {
        t: 'p',
        x: 'Flutter gives designers more control. Custom animations, branded components and unusual layouts are natural, and what you see in the design file is what ships. The cost is that platform conventions are something you reproduce rather than inherit, so you need to test text scaling, screen readers and system gestures carefully on both platforms.',
      },
      {
        t: 'p',
        x: 'React Native inherits more platform behaviour for free because it uses the real components. It can still deliver a distinctive brand through styling, but very custom visuals take more work. If you are unsure, a quick prototype of your two or three hardest screens in each framework will tell you more than any comparison article.',
      },
      { t: 'h2', x: 'What about performance and native modules?' },
      {
        t: 'p',
        x: 'For most business apps, such as forms, lists, dashboards and booking flows, both frameworks perform well enough that users will not notice a difference. The real risk is not raw speed. It is whether a native SDK you depend on has a well-maintained plugin for your chosen framework.',
      },
      {
        t: 'p',
        x: 'List the native capabilities you need before you choose: payments, push notifications, Bluetooth, background location, camera, biometrics, maps, health data, in-app purchases. For each one, look at the plugin or library, when it was last updated, how many open issues it has and whether it supports current iOS and Android releases. A missing plugin means writing native code, which both frameworks allow but which adds cost.',
      },
      {
        t: 'p',
        x: 'Performance-critical features need a closer look. Heavy real-time graphics, complex camera processing, audio engines and AR usually need native code or a specialised engine whichever framework you pick. Test those features early on real mid-range devices, not just the newest phone on your desk.',
      },
      {
        t: 'callout',
        title: 'Rule of thumb',
        x: 'Spend your first week proving the riskiest feature, not building the login screen. If that feature works on both platforms in your chosen framework, the rest of the app is usually the easy part.',
      },
      { t: 'h2', x: 'How do web code sharing, hiring and ecosystem health compare?' },
      {
        t: 'p',
        x: 'React Native shares the most with a React web app. Flutter shares the most across its own targets. If you want one codebase for iOS, Android, web and desktop, Flutter covers that natively. If you want your mobile and web teams to reuse logic, types and some components, React Native is closer to how web teams already work.',
      },
      {
        t: 'p',
        x: 'Flutter on the web suits app-like experiences such as dashboards and tools better than content-heavy, search-driven sites, where a conventional web stack is usually the better choice. For marketing sites and public content, build the website with web technology and use the mobile framework only for the app.',
      },
      {
        t: 'p',
        x: 'Both ecosystems are large and actively maintained, backed by Google and Meta respectively, and both have strong open-source communities. Check the health of the specific packages you need rather than the framework as a whole. Look for recent releases, clear maintainers and compatibility with the latest framework version.',
      },
      {
        t: 'figure',
        ratio: 'desktop',
        alt: 'Checklist screen with rows for native SDKs, team skills, UI needs and web reuse, each marked as checked or open',
        brief:
          'Flat product-UI illustration of a decision checklist with four rows and tick marks, in cobalt and cyan on a dark navy panel with an orange highlight on one open row. No readable real data.',
        caption: 'A short pre-decision checklist beats a long debate.',
      },
      { t: 'h2', x: 'When should you go fully native or build a PWA instead?' },
      {
        t: 'p',
        x: 'Go fully native when the product depends on the newest platform features, deep hardware integration or demanding graphics, or when a single platform is your whole market. Consider a progressive web app when you need reach and simplicity more than store presence or deep device access.',
      },
      {
        t: 'p',
        x: 'Fully native means separate Swift or Kotlin codebases. It costs more to build and maintain, but it gives direct access to every new platform API on day one and the most predictable behaviour. It is the right call for products such as advanced camera tools, complex audio, or apps tightly tied to one operating system.',
      },
      {
        t: 'p',
        x: 'A progressive web app runs in the browser, can be installed to the home screen and works offline with the right setup. It avoids app store review and uses one web codebase, but access to some device features and notification behaviour differs by platform. For internal tools, simple customer portals and early validation, it is often the cheapest honest answer. Our [progressive web app](/services/mobile/progressive-web-apps) work covers exactly this case.',
      },
      { t: 'h2', x: 'Choose Flutter if, choose React Native if' },
      {
        t: 'p',
        x: 'Use these lists as a quick filter after you have checked your native SDK needs. If both lists describe you, run the two-screen prototype described earlier and let the result decide.',
      },
      { t: 'h3', x: 'Choose Flutter if' },
      {
        t: 'ul',
        items: [
          'You want a custom, brand-led interface that looks the same on every device.',
          'Your team has no strong React background and is happy to learn Dart.',
          'You plan to target mobile, web and desktop from one codebase.',
          'Your app is animation-heavy or has an unusual layout system.',
          'One team will own the whole app for the long term.',
        ],
      },
      { t: 'h3', x: 'Choose React Native if' },
      {
        t: 'ul',
        items: [
          'Your team already writes React or TypeScript and runs a React web app.',
          'You want the app to feel native, with platform components and behaviour by default.',
          'You want to share types, API clients and business logic with the web.',
          'You need a large hiring pool and easy cover for team changes.',
          'You want Expo’s build and update tooling to speed up the first release.',
        ],
      },
      {
        t: 'p',
        x: 'Long-term maintenance matters in both cases. Each framework ships regular releases, and iOS and Android change every year, so leave time for upgrades, dependency updates and re-testing. Our [Flutter and React Native development](/services/mobile/flutter-react-native) service includes a plan for this, and our [iOS and Android app](/services/mobile/ios-android-apps) work covers fully native builds.',
      },
      {
        t: 'p',
        x: 'One more factor is cost over time, not just cost to launch. Building the first version is usually the smaller part of an app’s life. Most of the effort goes into updates, new features, operating system changes and fixes after release. Ask how easy each option will be to staff, upgrade and hand over in three years, and choose the one your team will still be comfortable maintaining then.',
      },
      { t: 'h2', x: 'What to do next' },
      {
        t: 'p',
        x: 'Write down your five hardest requirements, list the native SDKs you depend on, and note what your team already knows. Build a small prototype of the riskiest screen in your leading option and test it on real devices. That gives you evidence instead of opinion.',
      },
      {
        t: 'p',
        x: 'If you would like a second opinion, we can review your requirements and talk through the options with you. [Get in touch](/contact) and tell us what the app needs to do. We will say honestly whether cross-platform, native or a PWA fits, and what depends on scope.',
      },
    ],
    faq: [
      {
        q: 'Is Flutter better than React Native?',
        a: 'Neither is better in general. Flutter suits custom, brand-led interfaces and teams starting fresh with Dart. React Native suits teams that already know React or TypeScript and want a native feel. The better choice depends on your team’s skills, the native SDKs you need and how much code you want to share with a web app.',
      },
      {
        q: 'Which is better for a startup MVP, Flutter or React Native?',
        a: 'Use whichever your team can build in fastest. A React web team will usually move faster with React Native and Expo. A team without that background can be just as quick with Flutter. Prove your riskiest feature first, on real devices, before committing to the full build.',
      },
      {
        q: 'Does React Native use the New Architecture now?',
        a: 'Yes. The React Native team made the New Architecture the default from version 0.76, and Expo enables it for new projects from SDK 52. The team also recommends starting new apps with a framework such as Expo. Check the current release notes for the exact version you plan to use.',
      },
      {
        q: 'Can Flutter build web and desktop apps too?',
        a: 'Yes. Flutter targets mobile, web and desktop from one codebase. Web works best for app-like experiences such as dashboards and tools. For content-heavy, search-driven websites, a conventional web stack is usually a better fit, with Flutter reserved for the app itself.',
      },
      {
        q: 'When should I choose native iOS and Android instead of cross-platform?',
        a: 'Choose native when the product depends on the newest platform APIs, deep hardware access or very demanding graphics or audio, or when only one platform matters. Native costs more to build and maintain because you have two codebases, so use it where the benefit is clear.',
      },
    ],
    services: [
      '/services/mobile/flutter-react-native',
      '/services/mobile/ios-android-apps',
      '/services/mobile/progressive-web-apps',
    ],
  },

  {
    slug: 'ci-cd-pipeline-for-small-teams',
    title: 'A practical CI/CD pipeline for small teams',
    seoTitle: 'CI/CD Pipeline for Small Teams: A Practical Guide',
    metaDescription:
      'Build a CI/CD pipeline that fits a small team: stages, tests, previews, rollback and DORA metrics, with a sample workflow. Talk to us about your setup.',
    keyword: 'CI/CD pipeline',
    keywords: [
      'continuous integration',
      'continuous delivery vs continuous deployment',
      'GitHub Actions workflow',
      'trunk-based development',
      'DORA metrics',
      'deployment rollback',
    ],
    category: 'DEVOPS & CLOUD',
    published: '2026-10-13',
    updated: '2026-10-13',
    summary:
      'A CI/CD pipeline does not need to be elaborate. Here are the stages, branching habits, secrets rules and metrics a small team needs, plus a sample workflow.',
    takeaways: [
      'A small team needs a short, fast pipeline: lint, type check, unit tests, build, a preview, a few smoke tests, then deploy.',
      'Continuous integration is about merging small changes often. Continuous delivery keeps every build releasable. Continuous deployment releases it automatically.',
      'A one-click rollback matters more than a clever release strategy. Decide how you will undo a bad release before you need to.',
      'Never keep secrets in the repository. Store them in your CI provider or a secrets manager, scoped per environment.',
      'Measure deployment frequency, lead time, failure rate and recovery time so you can see whether the pipeline is helping.',
    ],
    cover: {
      alt: 'Left-to-right pipeline diagram with stages for lint, test, build, preview and deploy',
      brief:
        'Flat editorial illustration of a horizontal pipeline with five connected stage blocks and a small rollback arrow. Cobalt and cyan on dark navy, one orange stage marking the deploy step. No logos.',
    },
    body: [
      {
        t: 'p',
        x: 'A CI/CD pipeline is an automated path that takes every code change from a developer’s branch to production through the same checks each time. For a small team, the goal is a short, fast pipeline that catches mistakes early and makes releasing boring.',
      },
      {
        t: 'p',
        x: 'You do not need Kubernetes, a platform team or ten stages. You need a handful of automated checks, a safe way to deploy and a way to undo a release. This guide shows what to build first and what to skip until you have a reason.',
      },
      { t: 'h2', x: 'What is the difference between CI, continuous delivery and continuous deployment?' },
      {
        t: 'p',
        x: 'Continuous integration means developers merge small changes into a shared branch often, and each merge triggers an automated build and test run. Continuous delivery means every passing build is ready to release at any time. Continuous deployment goes one step further and releases every passing change to production automatically.',
      },
      {
        t: 'p',
        x: 'Most small teams start with continuous integration and continuous delivery: a human presses the button to release, but the button always works. Continuous deployment suits teams with strong automated tests and a fast rollback, because there is no human gate to catch a bad change. Move towards it when your test suite and monitoring have earned your trust, not before.',
      },
      {
        t: 'p',
        x: 'The words CI/CD are often used loosely, so agree on what you mean inside the team. The question to ask is simple: can we release a safe change today, on a normal weekday, without anyone staying late?',
      },
      { t: 'h2', x: 'What does a minimal CI/CD pipeline look like?' },
      {
        t: 'p',
        x: 'A minimal pipeline runs the cheapest, fastest checks first and stops at the first failure. Put linting and type checking at the front, then unit tests, then the build, then slower checks against a preview environment, and only then deploy. Fast feedback keeps developers from ignoring the pipeline.',
      },
      {
        t: 'table',
        caption: 'A staged CI/CD pipeline for a small team',
        head: ['Stage', 'What it checks', 'Target speed', 'Fails the build when'],
        rows: [
          ['Lint', 'Code style and obvious mistakes', 'Seconds', 'Rule violations appear'],
          ['Type check', 'Type errors, missing fields', 'Seconds to a minute', 'Types do not match'],
          ['Unit tests', 'Logic of small pieces in isolation', 'A few minutes at most', 'Any test fails'],
          ['Build', 'The app compiles and packages', 'A few minutes', 'Build errors occur'],
          ['Preview environment', 'A temporary copy of the change for people to try', 'Automatic per pull request', 'It fails to start'],
          ['Smoke or e2e tests', 'The few journeys that must never break', 'Minutes', 'A key journey breaks'],
          ['Deploy', 'Ships the tested build to production', 'Minutes', 'Health check fails'],
          ['Rollback', 'Returns to the last good version', 'Under a few minutes', 'Triggered by you or a monitor'],
        ],
      },
      {
        t: 'p',
        x: 'Keep the whole pipeline short enough that a developer will wait for it. If it takes much longer than a coffee break, people start merging without waiting and the safety net stops working. Run slow checks in parallel, cache dependencies and split rarely needed checks into a nightly job.',
      },
      {
        t: 'p',
        x: 'Preview environments and smoke tests are the two stages small teams most often skip, and they pay back quickly. A preview gives a reviewer, a designer or a client a live link to try the change before it merges. A small set of smoke tests then checks the journeys that must never break, such as signing in, searching and paying. Keep that set tiny and reliable. Ten dependable checks beat two hundred brittle ones, and you can widen coverage later as the product stabilises.',
      },
      {
        t: 'figure',
        ratio: 'wide',
        alt: 'Pipeline view showing stage boxes passing in sequence with a failed stage stopping the run',
        brief:
          'Flat product-UI illustration of a CI run as a row of stage cards, the first four with cobalt tick marks, one stage highlighted in orange as failed, later stages greyed out. No readable data.',
        caption: 'Cheap checks first, so a failure stops the run early.',
      },
      { t: 'h2', x: 'How should branches and pull requests work?' },
      {
        t: 'p',
        x: 'Use trunk-based development with short-lived branches. Developers branch from the main branch, make a small change, open a pull request, get a review and merge within a day or two. Small changes are easier to review, easier to test and easier to roll back than large ones that sit for weeks.',
      },
      {
        t: 'p',
        x: 'Long-lived feature branches cause the problems CI was invented to avoid: painful merges, surprises at release time and changes nobody remembers. If a feature will take weeks, ship it in slices behind a feature flag so unfinished work is merged but invisible to users.',
      },
      {
        t: 'ul',
        items: [
          'Protect the main branch: require passing checks and at least one review before merging.',
          'Keep pull requests small, ideally something a reviewer can read in a few minutes.',
          'Deploy from main only, so what is in production is always something you can point to.',
          'Delete branches after merging to keep the repository tidy.',
        ],
      },
      { t: 'h2', x: 'How do you handle environments and secrets?' },
      {
        t: 'p',
        x: 'Keep at least two environments, staging and production, and make them as similar as you can. Store secrets such as API keys, database passwords and tokens in your CI provider’s secret store or a dedicated secrets manager, scoped separately for each environment. Never commit them to the repository, even a private one.',
      },
      {
        t: 'p',
        x: 'Secrets in a repository are one of the most common and most avoidable mistakes. Once a secret is in the history, assume it is compromised: rotate it, then remove it. Add a secret-scanning check to the pipeline so a leaked key fails the build before it reaches the main branch.',
      },
      {
        t: 'p',
        x: 'Give each environment its own credentials with the least access needed. A staging key should never reach production data, and a CI token should not have permission to do more than deploy. Configuration that differs per environment belongs in environment variables, not in the code.',
      },
      { t: 'h2', x: 'Which deployment strategy do you actually need?' },
      {
        t: 'p',
        x: 'Start with the simplest strategy that lets you recover quickly, and add complexity only when a real risk justifies it. For many small products, a rolling or straightforward replace-and-check deploy with a one-click rollback is enough. Blue-green and canary releases solve problems you may not yet have.',
      },
      {
        t: 'ul',
        items: [
          'Rolling deployment replaces instances a few at a time. It is simple and a sensible default when you run more than one instance.',
          'Blue-green keeps two identical environments and switches traffic between them. It gives instant rollback but doubles infrastructure for a while, so it is overkill for a small internal tool.',
          'Canary releases send a small share of traffic to the new version first. They need good monitoring and enough traffic to be meaningful, so they are overkill for low-traffic products.',
          'Feature flags separate deploying code from releasing a feature. They are useful early, because they let you merge often and switch features on gradually.',
        ],
      },
      {
        t: 'callout',
        title: 'Decide rollback first',
        x: 'Before you pick a release strategy, answer this: if the new version is broken, how do we get back to the last good one, and how long does it take? If the answer is vague, fix that before anything else.',
      },
      { t: 'h2', x: 'What should a GitHub Actions workflow look like?' },
      {
        t: 'p',
        x: 'A workflow file lives in the repository and describes the pipeline as code. The example below is illustrative only. It assumes a Node project with npm scripts named lint, typecheck, test and build, and a deploy script you write yourself. Adapt the commands to your own stack and hosting.',
      },
      {
        t: 'code',
        file: '.github/workflows/ci.yml',
        code: ciYaml,
      },
      {
        t: 'p',
        x: 'The verify job runs on every pull request and every push to main. The deploy job runs only on main, only after verify passes, and uses a protected production environment where you can require approval and keep production secrets separate. Preview environments and end-to-end tests would be added as further jobs once the basics are stable.',
      },
      { t: 'h2', x: 'What should you measure?' },
      {
        t: 'p',
        x: 'Measure the DORA metrics, the research-backed set from Google Cloud’s DevOps Research and Assessment programme. The classic four are deployment frequency, lead time for changes, change failure rate and time to restore service. DORA now names them change lead time, deployment frequency, change fail rate and failed deployment recovery time.',
      },
      {
        t: 'p',
        x: 'DORA has also added a fifth measure, deployment rework rate, which tracks how much delivery effort goes on unplanned fixes. The first two metrics describe speed. The others describe stability. Track them together, because speeding up while breaking more releases is not progress. See the [DORA guide to its metrics](https://dora.dev/guides/dora-metrics/history/) for the current definitions.',
      },
      {
        t: 'p',
        x: 'Do not use these numbers to compare people or teams. Use them to spot trends in your own pipeline: are releases getting smaller and safer, or slower and scarier? A small team can read these from the deployment history and incident notes without any new tooling.',
      },
      {
        t: 'figure',
        ratio: 'desktop',
        alt: 'Dashboard tiles showing four delivery measures as simple trend lines going in the right direction',
        brief:
          'Flat product-UI illustration of four metric tiles with small sparkline trends, cobalt and cyan lines on dark navy, orange for one tile needing attention. Use abstract shapes, no readable numbers.',
        caption: 'Trends in your own history matter more than any benchmark.',
      },
      { t: 'h2', x: 'What are the most common CI/CD mistakes?' },
      {
        t: 'p',
        x: 'The most common mistakes are slow or flaky tests, no tested rollback, secrets in the repository and a pipeline that nobody owns. Each one quietly teaches the team to distrust the system, and a pipeline nobody trusts gets bypassed.',
      },
      {
        t: 'ul',
        items: [
          'Slow tests: developers stop waiting, so move slow checks out of the critical path.',
          'Flaky tests: a test that sometimes fails for no reason trains people to click re-run. Fix or quarantine it quickly.',
          'No rollback: if the only way back is a hurried fix, every release is a gamble.',
          'Secrets in repos: rotate anything exposed and add automated scanning.',
          'Manual steps hidden in someone’s head: if a release needs knowledge only one person has, write it into the pipeline.',
          'Testing only on the developer’s machine: if it only works locally, it does not work.',
        ],
      },
      {
        t: 'p',
        x: 'Automated tests are the safety net that makes frequent releases possible. If your suite is thin, build it up alongside the pipeline. Our [test automation](/services/qa/test-automation) service helps teams choose which journeys to cover first.',
      },
      {
        t: 'p',
        x: 'Finally, give the pipeline an owner. It does not need to be a full-time role, but someone should be responsible for keeping it fast, fixing flaky tests and updating the actions and dependencies it relies on. A pipeline left alone for a year usually becomes slow, noisy and quietly ignored, which is worse than having none because it gives false comfort.',
      },
      { t: 'h2', x: 'What to do next' },
      {
        t: 'p',
        x: 'Start small. Automate lint, type check, tests and build on every pull request. Then automate the deploy to staging, then production, and rehearse a rollback once. Add previews, smoke tests and release strategies as your product and traffic grow.',
      },
      {
        t: 'p',
        x: 'If you would like help, our [CI/CD pipeline](/services/cloud/ci-cd-pipelines) and [cloud deployment](/services/cloud/cloud-deployment) services set this up around your stack and budget. What it costs and how long it takes depend on your scope, so [talk to us](/contact) and we will give an honest view.',
      },
    ],
    faq: [
      {
        q: 'What is a CI/CD pipeline in simple terms?',
        a: 'A CI/CD pipeline is an automated sequence that checks, builds and releases your code every time it changes. Continuous integration runs the tests when code is merged. Continuous delivery or deployment then packages the result and ships it. It replaces manual, error-prone release steps with the same repeatable process every time.',
      },
      {
        q: 'What is the difference between continuous delivery and continuous deployment?',
        a: 'With continuous delivery, every passing change is ready to release but a person decides when to press the button. With continuous deployment, every passing change goes to production automatically. Continuous deployment needs strong tests, monitoring and fast rollback, so many small teams start with delivery.',
      },
      {
        q: 'Do small teams really need a CI/CD pipeline?',
        a: 'Yes, but a small one. Even two developers benefit from automatic tests and a repeatable deploy, because manual releases are slow and easy to get wrong. Start with lint, tests, build and deploy on each merge. You can add previews and advanced release strategies later as the product grows.',
      },
      {
        q: 'What are the DORA metrics?',
        a: 'DORA metrics are research-based measures of software delivery. The classic four are deployment frequency, lead time for changes, change failure rate and time to restore service. DORA now uses the names change lead time, change fail rate and failed deployment recovery time, and has added deployment rework rate as a fifth measure.',
      },
      {
        q: 'Is GitHub Actions good enough for a small team?',
        a: 'For most small teams, yes. GitHub Actions runs workflows defined in your repository, supports protected environments and secrets, and covers build, test and deploy. The right tool matters less than keeping the pipeline fast, reliable and owned by someone. Teams on other platforms have equivalent options.',
      },
    ],
    services: [
      '/services/cloud/ci-cd-pipelines',
      '/services/cloud/cloud-deployment',
      '/services/qa/test-automation',
    ],
  },

  {
    slug: 'ai-assisted-software-development',
    title: 'AI-assisted software development: what teams should know',
    seoTitle: 'AI-Assisted Software Development: A Team Guide',
    metaDescription:
      'AI-assisted software development helps with tests, refactors and docs but needs review and guardrails. See where it works, where it fails and how to adopt it.',
    keyword: 'AI-assisted software development',
    keywords: [
      'AI coding assistants',
      'AI code review',
      'AI-generated code security',
      'AI coding agents',
      'prompt injection',
      'software testing with AI',
    ],
    category: 'SOFTWARE',
    published: '2026-10-13',
    updated: '2026-10-13',
    summary:
      'AI coding tools speed up routine work but add new risks. Here is what they do well and badly, how to adopt them safely and why humans stay accountable.',
    takeaways: [
      'AI is strongest on well-defined, checkable work such as boilerplate, tests, refactors, documentation and migrations, and weakest on architecture and subtle correctness.',
      'Review and testing matter more with AI, not less, because generated code can look right and still be wrong.',
      'Treat prompts as a data-sharing channel: keep secrets and private code out unless your agreement and settings allow it, and verify every dependency an assistant suggests.',
      'Adopt it with small scoped tasks, tests first, clear review rules and CI gates, and measure rework and defects rather than lines of code.',
      'Faster prototypes do not remove the need for discovery, QA and maintenance. People stay accountable for what ships.',
    ],
    cover: {
      alt: 'A developer workspace where an assistant suggests code and a human reviewer approves changes',
      brief:
        'Flat editorial illustration of a code editor window with a suggested diff and a human-shaped checkpoint icon approving it. Cobalt, cyan and orange on dark navy. No faces, no logos.',
    },
    body: [
      {
        t: 'p',
        x: 'AI-assisted software development means using AI tools, from autocomplete to coding agents, to help people write, test, review and maintain software. Used well, it saves time on routine work. Used carelessly, it produces plausible code that nobody understands and that fails in ways nobody expected.',
      },
      {
        t: 'p',
        x: 'The honest summary is that these tools are useful, imperfect and in need of supervision. This guide covers where they help, where they fail, the security and legal questions, and a practical way for a team to adopt them without lowering its standards.',
      },
      { t: 'h2', x: 'What does AI do well in software development?' },
      {
        t: 'p',
        x: 'AI assistants do best on work that is well defined, repetitive and easy to check. That includes boilerplate, drafting tests, mechanical refactors, documentation, exploring unfamiliar code and routine migrations. In each case a human can quickly verify the result against something concrete, such as a test run or a compiler.',
      },
      {
        t: 'ul',
        items: [
          'Boilerplate and scaffolding: forms, data models, API clients and configuration files.',
          'Tests: drafting unit tests and edge cases that a developer then reads and corrects.',
          'Refactors: renaming, extracting functions and applying a consistent pattern across many files.',
          'Documentation: summarising what a module does, drafting comments and README sections.',
          'Exploration: explaining unfamiliar code, comparing approaches and suggesting where to look.',
          'Migrations: moving between library versions or syntax styles when the rules are clear.',
        ],
      },
      {
        t: 'p',
        x: 'The pattern is that AI removes typing, not thinking. It shortens the distance between an idea and a first draft. The developer still decides whether the draft is the right design, handles the edge cases and answers for the result.',
      },
      { t: 'h2', x: 'Where does AI-written code go wrong?' },
      {
        t: 'p',
        x: 'AI assistants fail most often on judgement and on details that look right. They can propose a poor architecture with confidence, miss subtle bugs, make unsafe security assumptions, invent functions or APIs that do not exist and follow outdated patterns from older training data.',
      },
      {
        t: 'ul',
        items: [
          'Architecture judgement: a model does not know your constraints, your team or where the product is heading.',
          'Subtle bugs: off-by-one errors, race conditions and wrong edge-case handling that pass a quick glance.',
          'Security assumptions: missing input validation, weak authorisation checks or unsafe defaults.',
          'Hallucinated APIs: calls to functions, options or libraries that do not exist, or that exist differently.',
          'Outdated patterns: deprecated methods and old approaches presented as current practice.',
          'Over-confident explanations: a fluent justification is not evidence the code is correct.',
        ],
      },
      {
        t: 'p',
        x: 'None of these failures are rare enough to ignore. They are the reason a human with domain knowledge must read the output, and the reason the checks described below exist.',
      },
      {
        t: 'figure',
        ratio: 'wide',
        alt: 'Split view of a code suggestion with one section marked verified by tests and another marked needing human review',
        brief:
          'Flat product-UI illustration of a code diff panel with one block marked with a cobalt tick and another with an orange caution marker. Dark navy background. No readable real code.',
        caption: 'Generated code is a draft until a person and the tests have checked it.',
      },
      { t: 'h2', x: 'Why do review and tests matter more with AI?' },
      {
        t: 'p',
        x: 'Review and tests matter more because AI makes code cheaper to produce, not cheaper to trust. When writing is fast, the bottleneck moves to checking. A team that speeds up generation without strengthening review and testing simply ships mistakes faster.',
      },
      {
        t: 'p',
        x: 'Tests turn an opinion into evidence. If a function has a clear test written first, you can let an assistant draft the implementation and then run the test to see whether it behaves as intended. If the tests are thin, you are trusting a fluent guess. Strong automation in your pipeline is what lets you use AI safely, and our guide to a [CI/CD pipeline for small teams](/blog/ci-cd-pipeline-for-small-teams) shows the gates worth having.',
      },
      {
        t: 'p',
        x: 'Reviewers also need to change their habits. Large generated diffs are tiring to read and easy to approve by accident. Ask for small changes, ask the author to explain the reasoning in their own words and treat a change nobody can explain as unfinished.',
      },
      { t: 'h2', x: 'Which tasks suit AI, and what check do they need?' },
      {
        t: 'p',
        x: 'Match the level of checking to the risk of the task. The table below is a practical rule of thumb for deciding where assistants are a good fit and what you must do before the result goes near production.',
      },
      {
        t: 'table',
        caption: 'Task type, suitability for AI assistance and the check required',
        head: ['Task type', 'Suitability', 'Required check'],
        rows: [
          ['Boilerplate and scaffolding', 'High', 'Read it, run the linter and build'],
          ['Drafting unit tests', 'High', 'Confirm each test asserts real behaviour and fails when the code is broken'],
          ['Mechanical refactors', 'High', 'Existing tests pass, diff reviewed in small steps'],
          ['Documentation and comments', 'High', 'Author confirms accuracy against the code'],
          ['Library or version migrations', 'Medium', 'Full test run plus manual check of changed behaviour'],
          ['New feature logic', 'Medium', 'Tests written first, careful human review'],
          ['Security-sensitive code (auth, payments)', 'Low', 'Senior review, security testing, never accept unread'],
          ['Architecture and data model decisions', 'Low', 'Humans decide, AI only for options and drafts'],
        ],
      },
      {
        t: 'p',
        x: 'Coding agents deserve extra care. Unlike autocomplete, an agent can edit many files, run commands and open pull requests on its own. That is powerful for migrations and routine fixes, but it widens what can go wrong. Give agents a narrow scope, a branch of their own and no access to production, and read the resulting diff as carefully as you would a new contractor’s first pull request.',
      },
      { t: 'h2', x: 'What are the security, IP and data-handling risks?' },
      {
        t: 'p',
        x: 'The main risks are what you send to the tool, what the tool sends back and what rights attach to the output. Prompts can contain secrets and private code. Suggestions can contain vulnerable code or packages that do not exist. Licensing and ownership terms vary by provider and by plan.',
      },
      {
        t: 'ul',
        items: [
          'Secrets: never paste API keys, passwords or customer data into a prompt, and keep secrets out of files an agent can read.',
          'Private code: check your provider’s terms on retention and whether your code may be used for training before you share it.',
          'Dependency hallucination: assistants sometimes suggest packages that do not exist. Attackers can register those names with malicious code, a risk often called slopsquatting. Verify every new dependency exists, is maintained and is the one you meant.',
          'Prompt injection: an agent reading web pages, tickets or files can be tricked by instructions hidden in them. Limit what agents can access and do.',
          'Licensing: generated code may resemble licensed code. Read your provider’s terms and apply the same licence checks you would for any third-party code.',
        ],
      },
      {
        t: 'p',
        x: 'None of this is a reason to avoid the tools. It is a reason to set rules before use. Decide which data may leave the building, give agents the least permission they need and log what they do. Our [AI services](/services/ai) follow the same principles of permissions, logging and a human handoff.',
      },
      { t: 'h2', x: 'How should a team adopt AI-assisted development?' },
      {
        t: 'p',
        x: 'Adopt it in small steps with clear rules. Start with scoped tasks, write tests first, keep human code review mandatory, rely on automated gates in CI and measure outcomes such as rework and defects instead of lines of code or number of suggestions accepted.',
      },
      {
        t: 'ol',
        items: [
          'Pick low-risk, well-defined tasks first, such as tests, documentation and small refactors.',
          'Write or confirm the tests before asking for an implementation.',
          'Keep changes small, so a reviewer can understand each one.',
          'Require human review on every change and make the author able to explain it.',
          'Run lint, type checks, tests and security scans in CI so nothing merges on trust.',
          'Write a short team policy covering data, secrets, dependencies and which tasks are off limits.',
          'Review how it is going every month: what saved time, what caused rework.',
        ],
      },
      {
        t: 'callout',
        title: 'Measure the right thing',
        x: 'Lines of code produced and suggestions accepted measure activity, not value. Watch rework, bugs found after release and how long changes take to reach users. The DORA research now tracks a rework measure for this reason.',
      },
      {
        t: 'figure',
        ratio: 'desktop',
        alt: 'Workflow diagram with scoped task, tests, AI draft, human review and CI gates leading to merge',
        brief:
          'Flat editorial illustration of a left-to-right flow of five simple blocks ending in a merge arrow, with a human checkpoint icon on the review block. Cobalt, cyan and orange on dark navy.',
        caption: 'AI sits inside a process of tests, review and gates, not outside it.',
      },
      { t: 'h2', x: 'What does AI-assisted development mean for clients?' },
      {
        t: 'p',
        x: 'For clients it means faster iteration on prototypes and routine work, but not the end of discovery, quality assurance or maintenance. A quick prototype can help you test an idea, but a prototype is not a product. Security, performance, accessibility and long-term upkeep still need engineering effort.',
      },
      {
        t: 'p',
        x: 'Be sceptical of any promise that AI removes the need for planning or testing. Understanding the problem, choosing what to build and deciding what is good enough are still human work. Faster drafts can free time for those conversations, which is where most projects are won or lost.',
      },
      {
        t: 'p',
        x: 'Our approach is to treat AI output as a draft within a normal process of milestones, demos and review, never as finished work. If you are comparing partners, ask how they review generated code, how they test it and who is accountable. Our [custom software](/services/software) and [test automation](/services/qa/test-automation) services are built around those answers.',
      },
      { t: 'h2', x: 'Who is accountable when AI writes the code?' },
      {
        t: 'p',
        x: 'People are accountable. The developer who commits a change owns it, the reviewer who approves it shares responsibility and the company that ships it answers to its customers. A tool cannot be blamed for a bug or a data leak, and no policy should pretend otherwise.',
      },
      {
        t: 'p',
        x: 'That is why the practical advice is the same as for any junior contributor: give clear tasks, check the work, test thoroughly and never merge what you do not understand. AI changes how code is produced. It does not change who answers for it.',
      },
      { t: 'h3', x: 'Review checklist for AI-written code' },
      {
        t: 'ul',
        items: [
          'Do I understand every line, and can I explain why it works?',
          'Do all functions, methods and options it calls actually exist in the version we use?',
          'Are any new dependencies real, maintained and necessary?',
          'Is input validated and are authorisation checks present where needed?',
          'Are secrets, tokens and personal data handled correctly and kept out of logs?',
          'Do the tests assert real behaviour, and do they fail when the code is broken?',
          'Does it follow our current patterns, or an outdated approach?',
          'Are error cases, empty values and unusual inputs handled?',
          'Is the change small enough to review properly?',
        ],
      },
      { t: 'h2', x: 'What to do next' },
      {
        t: 'p',
        x: 'Pick one low-risk area, write a one-page policy on data and review, and trial it for a month with tests and CI in place. Measure rework and defects, then decide where to widen it. If you would like help setting up the process or the pipeline around it, [contact us](/contact) and we will talk it through honestly.',
      },
    ],
    faq: [
      {
        q: 'Is AI-generated code safe to use in production?',
        a: 'It can be, but only after the same checks as any other code. Read it, test it, scan it and have a person approve it. Generated code can contain bugs, insecure patterns or invented APIs that look correct. Treat it as a draft, and never ship what nobody on the team understands.',
      },
      {
        q: 'Will AI replace software developers?',
        a: 'AI is changing how developers work, but it does not remove the need for people who understand the problem, make design decisions and take responsibility for results. It speeds up routine tasks such as boilerplate, tests and documentation. Judgement, review and accountability remain human work, and they matter more as generation gets faster.',
      },
      {
        q: 'What is slopsquatting?',
        a: 'Slopsquatting is an attack that exploits AI tools suggesting software packages that do not exist. An attacker registers the made-up name with malicious code, and a developer who installs the suggestion without checking pulls it in. Defend against it by verifying every new dependency before installing it.',
      },
      {
        q: 'Should we put our private code into an AI coding assistant?',
        a: 'Only if your agreement and settings allow it. Check the provider’s terms on data retention and whether your code may be used for training. Keep secrets, credentials and customer data out of prompts. If code is highly sensitive, use approved tools with clear data controls or keep it out entirely.',
      },
      {
        q: 'How should we measure whether AI coding tools are helping?',
        a: 'Measure outcomes, not activity. Track rework, defects found after release, review effort and how long changes take to reach users. Lines of code and suggestions accepted show activity but not value. If speed rises while rework and failures also rise, the tools are creating work, not saving it.',
      },
    ],
    services: [
      '/services/software',
      '/services/qa/test-automation',
      '/services/ai',
    ],
  },
];
