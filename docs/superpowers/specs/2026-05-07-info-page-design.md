# Info Page Design Spec: The Zigzag Editorial Timeline (Revised to Perry Wang Style)

## 1. Overview
The `/info` page is a kinetic editorial scroll experience modeled on `perryw-2023.webflow.io/info`. It uses a 50/50 CSS Grid layout with a fixed "Horizon Line" spine down the middle that dynamically scales and transforms.

## 2. Typography
- **Display Sans:** "General Sans" (Body, UI, Captions)
- **Editorial Serif:** "Fraunces" (Years, Pull quotes, Numbers ONLY). `opsz` 144, italic 300.
- Loaded via Fontshare CDN.

## 3. Palette
- `--paper`: `#F8F7F4`
- `--paper-warm`: `#F6E7BC`
- `--ink`: `#0B2D72`
- `--ink-soft`: `#0B2D7299`
- `--accent`: `#0992C2`
- `--hairline`: `#0B2D721A`

## 4. Layout
- CSS Grid, two columns, 50/50 split, 96px gutter.
- **Left:** Sticky-feeling text content (Eyebrow, Year, Headline, Body).
- **Right:** Single image (4:5 portrait, max 480px, hairline border).
- Max width 1440px.

## 5. The Horizon Line
- 1px vertical line at 50% left, fixed.
- `scaleY` tied to overall scroll progress (0.08 to 1).
- Has 6px dots for each beat. Active beat dot scales 1.4x and fills with `--accent`.
- Closing Gesture: On the final beat, the line rotates 90° over 800ms to become horizontal, and "— still sailing" fades in.

## 6. Reveal Choreography
- **Left:** `translateY` 24px -> 0. Staggered reveals (Year 0ms, Headline 80ms, Body 160ms). Exits 400ms fade + translateY -16px.
- **Right:** Opacity 0 -> 1, Scale 1.04 -> 1.0. 3D tilt on mousemove. Staggers 120ms after left.

## 7. The Golden Transition
- Background color interpolates from `--paper` to `--paper-warm` during transition from Beat 13 to Beat 14.

## 8. Stack
- React + Tailwind CSS
- Framer Motion for scroll-linked animations (`useScroll`, `whileInView`, `useTransform`).
- Lenis for smooth scroll.
