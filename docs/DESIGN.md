# Creative direction: Space to be more

## Organizing idea

The company creates space for people. The page begins with a dimensional architectural study, then opens into a real residence. Architecture supplies the visual language: repeated planes, planted terraces, drawn construction lines, and glimpses through spaces.

## Four user-facing chapters

1. **โครงการ** — compare homes by location, price, and availability.
2. **ชีวิตที่นี่** — explore atmosphere, communal spaces, and the design philosophy.
3. **บริการดูแล** — rental management, member benefits, and living stories.
4. **วางแผนและติดต่อ** — estimate affordability, find answers, and arrange a visit.

Persistent chapter navigation and a continuous drawn line provide orientation. Large English headlines carry the visual rhythm; Thai labels, body text, prices and controls carry the practical information.

## Motion

- Desktop opening: a sticky composition with a camera/pointer response and scroll-driven separation of floors, then a crossfade to real project imagery.
- Image parallax runs via a single requestAnimationFrame scheduler and uses transforms rather than layout-affecting properties. It reselects elements after filtering so new cards keep their motion.
- The SVG thread progressively draws between chapter boundaries.
- Image reveals and tab crossfades remain subordinate to navigation and content.
- Small screens use a CSS layered-image composition; reduced-motion and data-saving users do not load the WebGL scene. Reduced-motion disables parallax and reveals.
- Native scrolling and anchor links remain in control. No scroll hijacking, blocking preloader or forced animation sequence.

## Materials

Forest ink, mineral grey-green surfaces, a limited terracotta accent, architectural photography, Manrope/Noto Sans Thai, and Cormorant Garamond for expressive italic headlines. The existing logo remains the source mark. The sculptural model is explicitly a design study, not a representation of a purchasable property.

## Pending content approval

Confirm current project prices and availability, primary phone/LINE, and the final production/legacy domains before public launch. Awards and conversion outcomes cannot be guaranteed by implementation alone.
