# ASAKAN — Space to be more

A new company homepage, built independently of the legacy website. Next.js App Router, TypeScript, self-hosted fonts and locally optimized project images. The opening now uses six selected photographs with directional transitions, timed progress and a scroll-driven shrinking frame with parallax. The earlier Three.js study is no longer mounted in the homepage hero.

Photo replacement and slideshow configuration: [HERO-SLIDES.md](docs/HERO-SLIDES.md). Images and metadata are separate from animation code; this version does not include a CMS upload screen.

## Run

```sh
npm ci
npm run dev
```

Open the URL printed by Next.js. If another dev server is already running, use its printed address rather than starting a second instance. On Windows PowerShell with execution policy restrictions, use `npm.cmd` instead of `npm`.

```sh
npm run build
npm run start
```

## Experience

- A WebGL architectural study responds to the pointer and scroll. Scrolling changes the perspective and transitions into an actual project rendering.
- Responsive CSS depth composition on mobile, reduced-motion devices, data-saving connections, and devices without WebGL.
- Continuous SVG line drawn with scroll and a four-chapter navigation dock.
- Real image parallax for project imagery, living spaces, and the architectural-detail collage. Native scrolling is preserved.
- Working location, budget and availability filters, including an empty state and reset.
- Keyboard-accessible living-space tabs, native modal navigation and FAQ disclosures.
- Mortgage/affordability calculator with disclosed assumptions and project recommendations. This is an estimate, not a loan offer.
- Direct telephone, email, LINE, and existing project links. No simulated form submissions or third-party tracking are included.

## Existing detail pages

This repository serves the new homepage. The old project pages remain on the legacy deployment; they are not copied, reimplemented, or modified.

`next.config.ts` preserves these entry paths and sends a temporary redirect to the corresponding legacy URL:

- `/elysium59`
- `/theceline`
- `/projects/elysium-ram-interchange`
- `/projects/wela-ramkhamhaeng`

Other existing company, member, news, policy, and contact links also lead to the existing deployment. The two historical project aliases keep their canonical redirects. Query parameters are preserved by Next.js.

Set `LEGACY_SITE_URL` to the **separate, stable legacy deployment origin**. It defaults to `https://website-delta-blush-73.vercel.app`. Never point it at the new site's own origin, as that would cause redirect loops. The build rejects equal configured origins.

This is a redirect bridge, so the browser changes to the legacy domain for detail pages. If all pages must remain on a single domain, configure a multi-zone deployment or import the legacy routes before launch. The app does not claim that preserving a slug alone preserves the same origin.

## Content and launch settings

Edit `lib/content.ts` for the project snapshot and contact details. `app/page.tsx` contains the company copy and journal links. The new site does not require or connect to the old private database.

- Project prices/statuses and contacts were taken from the public homepage snapshot. Confirm them before publishing. They do not update automatically from the legacy CMS.
- Conflicting company-age statistics from the old site are intentionally omitted pending confirmation.
- The 3D object is an abstract architectural study, not a floor plan or model of a saleable project; the page labels it accordingly.
- Photos and renders come from the user-provided repository. `docs/asset-manifest.json` records derivative provenance and sizes. No stock imagery or generated project claims were added.
- Set `SITE_URL` to the final approved production origin. Without it, metadata and robots deliberately prevent indexing of a preview; the sitemap is empty.
- In a deployment service, use the root of this directory, `npm run build`, and the Next.js framework preset. `reference-website/` is reference-only and excluded from TypeScript and version control.
- There is no need to connect Figma, image-generation services, or Supabase to run the homepage.

## Validation

```sh
npm run typecheck
npm test
npm run build
npm run test:browser
```

Browser tests require a running server (default `http://127.0.0.1:3000`) and Chromium. Set `TEST_BASE_URL` to test another port. The test runner supports the locally available cached Chromium; otherwise install a Playwright browser using `npx playwright install chromium`.

Tests cover filter combinations and reset, keyboard tabs, finance controls, FAQ, modal focus/dismissal, WebGL loading, scroll transition, image parallax after filtering, all four project redirects, mobile overflow, reduced motion, no-JavaScript content, 404s, and automated WCAG A/AA checks.

`artifacts/` contains screenshots and `qa-report.json`. Automated accessibility checks and local screenshots do not replace testing on real devices or a full accessibility audit. No production deployment has been performed.
