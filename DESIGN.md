---
name: ASAKAN
description: Bangkok condo developer — quality residences at accessible prices, proven over 25 years
colors:
  established-ink: "#1a2d6b"
  established-ink-deep: "#0f1e4a"
  established-ink-hero: "#050B14"
  decisive-red: "#e53935"
  decisive-red-dark: "#b71c1c"
  background: "#ffffff"
  foreground: "#1f2937"
  surface: "#f8fafc"
  surface-mid: "#f1f5f9"
  border: "#e2e8f0"
  muted: "#64748b"
typography:
  display:
    fontFamily: "Prompt, Anuphan, sans-serif"
    fontSize: "clamp(2.5rem, 8vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Prompt, Anuphan, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Prompt, Anuphan, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Prompt, Anuphan, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Prompt, Anuphan, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    letterSpacing: "0.15em"
rounded:
  none: "0"
  sm: "2px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "48px"
  2xl: "80px"
components:
  button-primary:
    backgroundColor: "{colors.decisive-red}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "16px 40px"
  button-primary-hover:
    backgroundColor: "{colors.decisive-red-dark}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "16px 40px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.established-ink}"
    rounded: "{rounded.lg}"
    padding: "14px 40px"
  button-secondary-hover:
    backgroundColor: "{colors.established-ink}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "14px 40px"
  project-card:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.lg}"
    padding: "20px"
  status-badge:
    backgroundColor: "#ffffff"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
---

# Design System: ASAKAN

## 1. Overview

**Creative North Star: "The Bangkok Address"**

ASAKAN is not a brand that needs to announce itself. Over 25 years and 2,500+ delivered units, the track record does the talking. This design system carries that posture: structured, unhurried, confident without being loud. The palette is restrained — a deep navy that reads as institutional trust, a decisive red that appears rarely and means something when it does, and a white field that gives the real-estate photography room to breathe.

The system prioritizes information density over visual decoration. Investors scanning for price-to-location ratios and families weighing livability both need to find what they came for fast. Cards are tight and factual. Labels are crisp and uppercase. Hero sections are image-led, not infographic-led.

What this system explicitly rejects: SaaS startup aesthetics, glassmorphism as decoration, gradient text, and the luxury-developer cliché of pure-black backgrounds with gold type. ASAKAN is not premium-inaccessible — it is premium-accessible. The design should feel like a well-maintained building lobby, not a yacht brochure.

**Key Characteristics:**
- White-field base with deep navy structure and rare red accent
- Thai-first typography: Prompt carries both script and Latin with authority
- Flat-by-default elevation; shadow appears only on state change
- Image-led sections, never placeholder rectangles
- Labels are data, not decoration — every uppercase string earns its place

## 2. Colors: The Established Palette

Two committed colors and a white field. The red is the rarest element on the page; its scarcity is the point.

### Primary
- **Established Ink** (`#1a2d6b`): The structural color. Used for headings, the primary nav, dark section backgrounds, and any surface that signals ASAKAN's institutional presence. Never used as a body background on light text; always used with sufficient contrast.
- **Established Ink Deep** (`#0f1e4a`): The darker variant, for section headers (news, project detail hero) where the navy needs to read as near-black. Also used as the overlay gradient base.
- **Established Ink Hero** (`#050B14`): Near-black used exclusively for the homepage hero background — the darkest anchor the brand ever touches.

### Secondary
- **Decisive Red** (`#e53935`): The accent. Used on CTAs, active indicators, price labels, hover states, and icon highlights. Never on more than 10% of any screen. Its presence signals action or importance; diluting it dilutes the signal.
- **Decisive Red Dark** (`#b71c1c`): Hover and active state for red elements. Never used as a standalone surface color.

### Neutral
- **Background** (`#ffffff`): The default page canvas. White — not warm, not tinted. The brand warmth comes from photography and the navy, not the background hue.
- **Foreground** (`#1f2937`): Body text, secondary labels, all reading copy. Dark enough to pass WCAG AA (≥4.5:1) on white.
- **Surface** (`#f8fafc`): Section alternates, card resting backgrounds. The lightest step above white.
- **Surface Mid** (`#f1f5f9`): Stat chips, input backgrounds, subtle grouped containers.
- **Border** (`#e2e8f0`): Dividers and card outlines. Never as a decorative stripe.
- **Muted** (`#64748b`): Secondary metadata (location, author, date). Always verify contrast against its background before use.

### Named Rules
**The One Voice Rule.** Decisive Red appears on ≤10% of any given screen. A page where red is everywhere is a page where nothing is urgent. Reserve it for the one action or fact that matters most in each viewport.

**The No-Tint Rule.** The background is `#ffffff` — not cream, not warm white, not sand. Warmth lives in the photography and the navy, not in the canvas. A tinted background is not a design choice here; it is brand drift.

## 3. Typography

**Display Font:** Prompt (Thai + Latin, `sans-serif` fallback)
**Body Font:** Prompt (same family, lighter weights)
**Supplementary Thai Font:** Anuphan (loaded alongside Prompt for Thai glyph coverage)

**Character:** A single family at committed weight contrast. Prompt at 700–800 for headings reads as authoritative and contemporary; at 400 for body it becomes clear and unpretentious. The pairing between display and body is weight contrast, not family contrast — which is correct for a Thai-primary brand where two Latin families would create glyph inconsistency on Thai script.

### Hierarchy
- **Display** (700, `clamp(2.5rem, 8vw, 5.5rem)`, line-height 1.05, tracking -0.02em): Homepage hero headline only. The single largest typographic element on any page. Cap at 5.5rem — above this is shouting.
- **Headline** (700, `clamp(2rem, 5vw, 3rem)`, line-height 1.2, tracking -0.01em): Section headings (Projects, News, Why ASAKAN). Use `text-wrap: balance` to prevent widow lines.
- **Title** (600, `1.25rem`, line-height 1.4): Card headings, article titles, sub-section leaders.
- **Body** (400, `1rem`, line-height 1.7): Reading copy. Thai body text needs 1.7 line-height minimum for readability. Max line length 65–75ch on prose sections.
- **Label** (700, `0.6875rem`, tracking 0.15em, uppercase): Status badges, section kickers, stat chip labels, metadata fields. Short — never more than 4 words. Use `text-wrap: pretty` is not applicable here; labels are never prose.

### Named Rules
**The Weight Contrast Rule.** Every heading-to-body pairing must span at least two weight steps (e.g., 700 → 400). A 600 heading above 500 body reads as timid. Commit to the contrast.

**The Thai-First Rule.** Prompt and Anuphan are the canonical fonts. Never introduce a Latin-only display font that would render Thai characters in system fallback. The brand speaks Thai first.

## 4. Elevation

This system is flat by default. Depth is communicated through tonal layering (white → surface → surface-mid) and through image overlays, not through shadows at rest.

Shadows exist in one context only: interactive cards at hover state. Their purpose is to signal lift — confirming that the element is responding, not to create permanent visual hierarchy.

### Shadow Vocabulary
- **Card Rest** (`box-shadow: 0 4px 20px rgba(0,0,0,0.03)`): The baseline card state. Barely perceptible — more a separation from background than a shadow.
- **Card Hover** (`box-shadow: 0 10px 30px rgba(0,0,0,0.08)`): Applied on `:hover` with `transition: all 500ms`. Signals interactivity.
- **Hero Overlay** (CSS gradient, not shadow): Dark-to-transparent gradient (`from-[#050B14]/90 to-transparent`) layered over photography. Not a shadow — an art direction tool for text legibility on hero images.

### Named Rules
**The Flat-By-Default Rule.** No element has a resting shadow that serves decoration. If removing a shadow doesn't break readability or hierarchy, it should not be there. Shadows are earned by state, not granted by template.

## 5. Components

Clean and purposeful. Each component does one job. No decorative chrome.

### Buttons
- **Shape:** Near-square for primary (2px radius, `rounded-sm`), gently rounded for secondary (12px, `rounded-lg`)
- **Primary:** Decisive Red (`#e53935`) background, white text, `px-10 py-4`, uppercase label at 700 weight, tracking-widest. Hover: slide-in red fill animates from left (`translateX` full-width overlay), not a color swap — the motion is part of the signal.
- **Hover / Focus:** Primary uses a sliding background reveal (500ms ease-out). Focus-visible should show a 2px offset outline in Established Ink. Never rely on color alone for focus state.
- **Secondary / Ghost:** Transparent background, 2px Established Ink border, navy text. Hover fills to navy bg with white text. Used for "see all" and secondary navigation actions.
- **Line CTA:** Green `#00c300` background for LINE-specific actions. Isolated to contact/messaging contexts only.

### Cards / Containers
- **Corner Style:** `rounded-xl` (12px) for project cards and article cards. `rounded-2xl` (16px) for large panels and section containers. `rounded-3xl` (24px) for hero-image framing in detail pages.
- **Background:** White (`#ffffff`) on slate-50 sections; slate-50 on white sections. Never nest a card on the same background color.
- **Shadow Strategy:** Card rest shadow at 3% opacity; card hover at 8% opacity (see Elevation). Transition 500ms.
- **Border:** `1px solid #e2e8f0` (border-slate-100) at rest. Border disappears at hover as shadow takes over.
- **Internal Padding:** `p-3` (12px) on mobile, `p-5` (20px) on tablet+.

### Status Badges
- **Style:** White background with backdrop-blur, `rounded-sm` (2px), uppercase label (9px, tracking-widest), dot indicator (6px circle, color-coded).
- **Active:** Green dot (`#22c55e`, animate-pulse)
- **Coming Soon:** Decisive Red dot (`#e53935`, animate-pulse)
- **Sold Out:** Slate dot (`#94a3b8`, no pulse)
- Always placed top-left over imagery. Never inside the card content area.

### Inputs / Fields
- **Style:** White background, `border border-slate-200`, `rounded-lg` (8px), `px-4 py-3`.
- **Focus:** Blue outline via `focus:ring-2 focus:ring-[#1a2d6b]`. Never red focus — red is reserved for CTAs and alerts.
- **Error:** Red border and red helper text. Use sparingly; error state should feel like a correction, not a punishment.

### Navigation
- **Style:** Sticky header, transparent on hero → white on scroll. Logo left, nav links center-right, CTA phone number right.
- **Link states:** Default `text-slate-700`, hover `text-[#1a2d6b]` (Established Ink). Active section gets navy weight.
- **Mobile:** Hamburger → full-screen overlay in Established Ink Deep (`#0f1e4a`) with white text.
- **Typography:** Label scale (11px, 700 weight, tracking-widest, uppercase) for nav links.

### Project Stat Chip
- **Style:** `bg-slate-50 rounded-lg px-2 py-1.5`, icon in Decisive Red, text in muted slate. Groups of 2–3 chips in a grid inside project cards.
- **Purpose:** Floors, units, type — factual data only. Never a marketing claim.

### Price Display
- The signature component. Price label in Decisive Red (`#e53935`), weight 800 (font-black), size `text-xl`. "Starting Price" prefix in label scale (9px, uppercase, slate-600, tracking-widest). The only place red type is used at size — the price is the signal.

## 6. Do's and Don'ts

### Do:
- **Do** use photography as the primary hero material. A real project photo, rendered or actual, beats any CSS composition.
- **Do** use Decisive Red for exactly one action or one number per viewport — the most important CTA or the price.
- **Do** keep navigation labels at label scale (≤11px, uppercase, tracking-widest, ≤4 words).
- **Do** use `text-wrap: balance` on h1–h3 and `text-wrap: pretty` on body paragraphs ≥3 lines.
- **Do** verify contrast for Muted (`#64748b`) on Surface (`#f8fafc`) before using it for body copy — it is borderline and should only be used for secondary metadata, never for primary reading text.
- **Do** let the card border fade to shadow on hover. The transition is the affordance.
- **Do** use Anuphan alongside Prompt for Thai script to ensure full glyph coverage across all Thai characters.

### Don't:
- **Don't** use gradient text (`background-clip: text` with a gradient). The `.gradient-text` utility in globals.css is an exception that predates this spec; do not add new instances. Use a single solid color.
- **Don't** use `border-left` or `border-right` greater than 1px as a decorative colored stripe on cards, list items, or callouts. Use background tints or leading icons instead. (The 1.5px red left-border on the concept label in ProjectCard is a narrow exception scoped to image-overlay labels only.)
- **Don't** use a warm-tinted or cream background. The canvas is `#ffffff`. Tinted backgrounds are brand drift.
- **Don't** use glassmorphism (backdrop-blur with semi-transparent dark panels) as a decorative default. The hero overlay gradient is the only permitted instance.
- **Don't** introduce a new Latin-only display font. Thai characters must always render in Prompt or Anuphan — not in OS system fallback.
- **Don't** use SaaS startup layout patterns (metric grids, feature flag tables, pricing tier cards). This is a real-estate brand, not a software product.
- **Don't** make every section carry a small uppercase tracked eyebrow. One deliberate kicker per page as a brand cadence is voice; an eyebrow above every section heading is AI scaffolding.
- **Don't** use stock-photo placeholder rectangles where project photography belongs. If no image is available, use the Building2 icon placeholder (already in ProjectCard) — it communicates "image pending" without breaking the layout.
- **Don't** apply Decisive Red to more than 10% of any screen surface. If red appears on headers, section dividers, AND card accents AND price labels simultaneously, the signal collapses.
