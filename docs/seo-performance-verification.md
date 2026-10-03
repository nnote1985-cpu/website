# SEO and hero loading verification (2026-10-03)

Changes include the previously requested H1 and server-rendered promotion fixes.

## Sitemap

Static routes omit lastmod until a trustworthy content revision timestamp exists. Projects use updated_at when available; databases without that column retain their project URLs without lastmod. created_at and the current request time are no longer substitutes for modification time. News uses updated_at, falling back to publication time only if it is absent. Invalid/future dates are omitted. Query failures stop sitemap generation rather than silently removing valid URLs.

This does not add a database migration or backfill historical modification dates. Existing project records without update tracking still have no lastmod.

## Hero

The six original image files, CSS layout, image focal points, transition effects and parallax timing are unchanged. Next image optimization supplies responsive candidates at quality 90. The sizes declaration accounts for the extra image area used by the existing parallax crop. On tall high-DPR phones this intentionally selects a larger candidate to preserve detail.

Only the first image is present in server HTML, with a matching responsive preload. The next image mounts after the current image has decoded. The previous image stays available for transitions; a manual selection keeps the old image visible until its replacement is decoded. Offscreen, hidden, paused and reduced-motion states suppress speculative loading.

## Local production hero fixture

Next 16.2.2 production build; headless Chromium on the developer machine; local HTTP, no CPU/network throttling. Separate before/after routes use the same hero CSS. Fixture excludes the rest of the homepage, fonts, database, analytics and third-party resources. Each route uses a fresh browser context. These are single-run diagnostics, not field CWV or a full-site performance score.

| Viewport | Version | Initial hero requests | Encoded image bytes | LCP observed | Initial CLS |
|---|---|---:|---:|---:|---:|
| Desktop 1440x900, DPR 1 | Before | 6 | 4,049,054 | 240 ms | 0 |
| Desktop 1440x900, DPR 1 | After | 2 | 1,616,442 | 124 ms | 0 |
| Mobile 390x844, DPR 2 | Before | 6 | 4,049,054 | 88 ms | 0 |
| Mobile 390x844, DPR 2 | After | 2 | 1,616,442 | 120 ms | 0 |

Initial image traffic reduced about 60%; on-screen frame dimensions matched exactly. Timing varies and the mobile LCP did not improve in this sample, so no claim of a proven CWV improvement is made. Post-scroll raw layout-shift sums were desktop 0.00469/0.02143 and mobile 0.00828/0.00828 (before/after); these are observer sums, not session-window field CLS. INP has not been measured.

Browser checks passed for manual jumps, reduced motion, automatic advance through the first three slides, limited image mounting and absence of client exceptions. Screenshots were checked for desktop and mobile framing. Automated checks: `node tests/headings.cjs`, `node tests/promotions-ssr.cjs`, `node tests/sitemap.cjs`, `node tests/hero-images-ssr.cjs`, `npx tsc --noEmit`, `git diff --check`.

Full application production build was not verified locally because database environment configuration is unavailable. After deployment, run a full-page mobile Lighthouse test and check Search Console/CrUX field LCP, INP and CLS before drawing SEO conclusions about animation.
