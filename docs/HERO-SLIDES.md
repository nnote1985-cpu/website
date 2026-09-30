# Homepage photo sequence

The six selected images are in `public/hero/` in the user's supplied order. All six belong to Elysium Phahol 59; all detail links retain `/elysium59`.

Replace an image at the same filename to change photography without editing animation code. Use a landscape WebP, ideally 1920–2400px wide. `public/hero/slides.json` controls order, image URL, alternative text, title, label, destination, crop focus (CSS object-position) and effect. Supported effects: `fade`, `left`, `right`, `up`, `split`, `down`. The manifest is fetched on page load; changes on a static deployment still need uploading/redeploying the assets. There is no CMS upload screen in this version.

Images advance every six seconds after the current image loads. Selecting a slide pauses autoplay. Play/pause, page visibility, scroll position and reduced-motion preference govern playback. Scroll separately controls the frame inset and image parallax; it never forces the user through all six slides. Reduced motion retains manual selection and removes autoplay and parallax.

The center line displays the slideshow clock. A compact slide picker and pause button sit alongside the center caption; there is no bottom navigation strip. Captions enter vertically on each change. The BEYOND wordmark sits outside the image clipping frame: scrolling moves and scales it independently and continuously changes its color from white through gray to black. The much smaller second line, expectation, fades out as scrolling begins. Returning to the top reverses both transformations. `node scripts/check-gallery-motion.mjs` checks these behaviors and captures the three scroll stages.

`node scripts/prepare-hero.mjs` rebuilds optimized images from the original reference repository. Do not run this after manually replacing files unless restoring the original selection is intended.
