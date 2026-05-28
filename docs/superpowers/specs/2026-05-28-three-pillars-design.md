# Three Pillars Section Design Spec: Glassmorphic Stacking Cards & AI Tools Strip

## 1. Overview
Section 4 ("Three Pillars") sits immediately below Section 3 (About / The Story) on the `/` (Home/Work) page as a seamless continuation of the dark editorial aesthetic (#06091A). It consists of a title header, a 3-card scroll-linked glassmorphic stacking deck, an interactive horizontal-scrolling AI tools strip, and a dynamic vertical sailing progress bar on the right side of the screen.

---

## 2. Brand Tokens & Typography

### Palette
- **Background:** `#06091A` (deep navy-black)
- **Navy:** `#0B2D72`
- **Blue:** `#0992C2`
- **Sea / Accent:** `#0AC4E0`
- **Warm Paper:** `#F8F7F4` (primary text)
- **Dim text:** `rgba(248, 247, 244, 0.52)`
- **Faint border:** `rgba(248, 247, 244, 0.07)`

### Typography Hierarchy
- **Display / Italic headings:** *Playfair Display* (Google Font)
- **Body / UI / Label:** *Poppins* (Google Font)
- **Stat numerals:** *Playfair Display*, weight 700, font-size ~26–28px
- **Stat labels:** *Poppins*, weight 300, 9–10px, letter-spacing 0.1em
- **Section labels:** *Poppins* 500, 9.5px, letter-spacing 0.24em, uppercase

---

## 3. Structural Layout & Components

### A. Section Header
- **Positioning:** Static flow, immediately below Section 3.
- **Padding:** 52px horizontal, 52px top, 32px bottom.
- **Content:**
  - **Label:** `— THREE PILLARS` in Sea color, uppercase, Poppins, letter-spacing 0.24em.
  - **Title:** `The Work.` — "The Work" in bold, period in Sea (`#0AC4E0`), Playfair Display Italic.
  - **Subtitle:** `Six years across Web3, capital markets and growth infrastructure — three domains where I operate with full conviction.` in Poppins 300, 12.5px, dim color, max-width 400px.

---

### B. Scroll Stacking Zone
- **Container Structure:**
  - **Outer Container:** Height `540px`, `overflow-y: scroll`, scrollbar hidden (`scrollbar-width: none` / `::-webkit-scrollbar { display: none }`).
  - **Inner Height Wrapper:** `1900px` height to create scrollable space.
  - **Sticky Stage:** `position: sticky`, `top: 0`, height `540px`, `overflow: hidden`. Contains all 3 stacked cards positioned absolutely.
- **Background Depth (Refraction Layer):**
  - **Orb 1:** 540×540px, radial gradient `rgba(9, 146, 194, 0.17)`, position `top -120px left -80px`, filter `blur(90px)`.
  - **Orb 2:** 420×420px, radial gradient `rgba(10, 196, 224, 0.09)`, position `top 160px right -100px`, filter `blur(90px)`.
  - **Orb 3:** 380×380px, radial gradient `rgba(11, 45, 114, 0.38)`, position `bottom 0 left 35%`, filter `blur(90px)`.
  - **Noise Overlay:** Inline SVG or CSS-rendered noise pattern at `opacity: 0.025`, filling the background.

- **Stacking Animation Math:**
  Calculated on scroll inside the outer container:
  `p = scrollTop / (scrollHeight - clientHeight)` (0 to 1 range)
  
  Using `easeInOutQuad`: `t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2`
  
  `e2 = easeInOut( clamp((p - 0.28) / 0.32) )`
  `e3 = easeInOut( clamp((p - 0.58) / 0.32) )`

  - **Card 1 (Venture Capital):**
    - `transform: scale(lerp(1, 0.94, e2)) translateY(lerp(0, -18px, e2))`
    - `filter: brightness(lerp(1, 0.62, e2))`
    
  - **Card 2 (Marketing & Growth):**
    - `opacity: e2 > 0.01 ? 1 : 0`
    - `transform: translateY(lerp(380px, 0, e2)) scale(lerp(1, 0.94, e3))`
    - `filter: brightness(lerp(1, 0.62, e3))`
    
  - **Card 3 (AI - Quiet Multiplier):**
    - `opacity: e3 > 0.01 ? 1 : 0`
    - `transform: translateY(lerp(380px, 0, e3))`

---

### C. Glassmorphic Card Specs
- **Base Style:**
  - `position: absolute`, `width: calc(100% - 104px)` (52px gutters), `left: 52px`, `height: 480px`.
  - `background: rgba(255, 255, 255, 0.045)`, `backdrop-filter: blur(32px) saturate(180%)`.
  - `border: 1px solid rgba(248, 247, 244, 0.10)`.
  - `border-radius: 20px`.
  - `box-shadow: 0 28px 80px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(248, 247, 244, 0.12), inset 0 -1px 0 rgba(0, 0, 0, 0.25)`.
- **Card Hover Style:**
  - `border-color: rgba(10, 196, 224, 0.28)`.
  - `box-shadow: 0 28px 80px rgba(0, 0, 0, 0.55), 0 0 48px rgba(10, 196, 224, 0.07), inset 0 1px 0 rgba(248, 247, 244, 0.12)`.
  - `transform: scale(1.012) translateY(-4px)`.
  - `transition: border-color 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)`.

---

### D. Card Specifications & Copy

#### Card 1 — Venture Capital
- **Layout:** CSS Grid 2 columns `[1fr 380px]`.
- **Left Column:** (Padding: `38px 36px 36px 40px`):
  - Eyebrow: `01 / Venture Capital` (Poppins, dim text).
  - Title: `The Deal` / `Maker.` in Playfair Display italic.
  - Body: `From evaluating 800+ decks to managing $200M+ AUM across four funds — built from inside the table, not above it. My edge is founder empathy: I've signed term sheets and felt payroll anxiety in equal measure.` (Poppins, 13px, line-height 1.7).
  - Pills: `NewTribe Capital · DCF · Leo Ventures · Asva` (Dim small uppercase Poppins chips).
  - Stats Row: Border-top `0.5px solid rgba(248, 247, 244, 0.07)`, 4 columns:
    1. `$200M+` / `AUM Managed`
    2. `450+` / `KOL Network`
    3. `4` / `Funds Built`
    4. `250+` / `Projects`
- **Right Column:**
  - Image element pointing to `/public/assets/images/work/vc-hero.jpg` with an `onError` fallback.
  - Fallback placeholder: `linear-gradient(145deg, rgba(9, 146, 194, 0.08), rgba(11, 45, 114, 0.35))`, subtle crosshatch grid overlay (`opacity: 0.06`), and a centered italic label in Sea color: `Venture Capital`.

#### Card 2 — Marketing & Growth
- **Layout:** CSS Grid 2 columns `[1fr 380px]`.
- **Left Column:** (Same padding as Card 1):
  - Eyebrow: `02 / Marketing & Growth` (Poppins, dim text).
  - Title: `The Signal` / `Amplifier.` in Playfair Display italic.
  - Body: `GTM architecture that moves markets. From zero-traction to $10M Series A acquisition — distribution is the moat most founders forget to build until it is already too late.` (Poppins).
  - Pills: `NODO · Nordek · Series A Exit · KOL Strategy · 20+ Events` (Poppins chips).
  - Stats Row:
    1. `$10M` / `Series A (NODO)`
    2. `20+` / `Global Events`
    3. `14` / `Cities / 12 Mo.`
- **Right Column:**
  - Image element pointing to `/public/assets/images/work/marketing-hero.jpg` with `onError` fallback.
  - Fallback placeholder styling identical to Card 1 with centered label: `Marketing & Growth`.

#### Card 3 — AI (Quiet Multiplier)
- **Layout:** Single full-width column, fading bottom mask (`mask-image: linear-gradient(to bottom, black 0%, black 60%, transparent 100%)`, `border-bottom-color: transparent`).
- **Content:** (Padding: `36px 40px`):
  - Two-column grid inside:
    - **Left Column:**
      - Eyebrow: `03 / Artificial Intelligence`
      - Title: `The Quiet` / `Multiplier.`
      - Body copy detailing 6 live AI tools: custom intelligent layers built to automate venture workflows and research.
    - **Right Column:**
      - Label: `LIVE TOOLS` (Poppins, Sea color, 9px, uppercase, letter-spacing 0.2em).
      - Tool chips (6 total): `Triply`, `YC Website`, `YC CRM`, `Tradepoint`, `BingX`, `Fincal`.
        - Style: Sea color text, background `rgba(10, 196, 224, 0.06)`, `0.5px solid rgba(10, 196, 224, 0.28)` border, a `5px` circular green-cyan dot on the left of each, `7px` spacing between dot and text.
      - Stats Row:
        1. `6` / `Live Tools`
        2. `3` / `VC Firms`
        3. `∞` / `Hours Saved`
  - **Bottom Feature Grid:** (2 columns, border-top `0.5px solid rgba(248, 247, 244, 0.07)`):
    - `Built For` -> deal flow automation, CRM intelligence, UX research, financial modeling.
    - `Stack` -> Claude API · Custom frontends · Supabase · Vercel — all production.

---

### E. AI Tools Strip
- **Visual Connector:** A 36px tall spacer div sitting immediately above the strip:
  - Background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.018), transparent)`.
  - Borders: left/right `1px solid rgba(248, 247, 244, 0.06)`.
  - Pseudo-element `::before`: centered vertical `1px` line, background `linear-gradient(to bottom, rgba(10, 196, 224, 0.25), transparent)`.
- **Positioning:** Flush below the stacking zone, `margin-top: -2px`, `padding: 0 52px`.
- **Transitions:** Revealed at scroll `p >= 0.88` by adding `.revealed` class:
  - Default: `opacity: 0; transform: translateY(44px)`.
  - Revealed: `opacity: 1; transform: translateY(0)`.
  - Transition: `0.75s cubic-bezier(0.16, 1, 0.3, 1)`.
- **Header Label:** `AI Tools — Drag to Explore` (Poppins, 9px, Sea color, uppercase). Extend a fine horizontal line from the label to the right edge.
- **Horizontal Scroller:**
  - Flex layout, `gap: 14px`, `overflow-x: scroll` (hidden scrollbar).
  - Custom mouse drag-to-scroll implementation (detecting `mousedown`, `mousemove`, `mouseup` to shift scroll offset).
  
- **Tool Portrait Cards (190px wide x 270px tall):**
  - **Animation Delay:** When revealed, cards stagger-fade-in from `translateY(24px)` with a baseline delay of `180ms + (index * 90ms)`.
  - **Card Structure:**
    - Background: full-bleed visual gradient.
    - Top Row: Category pill (e.g. Travel AI) + "Live" green dot badge.
    - Bottom Overlay: Bottom-aligned name and type label over a subtle gradient shadow.
    - Glass Hover Panel: Slides up from bottom (`translateY(100%) -> translateY(0)`) on card hover:
      - Style: `background: rgba(6, 9, 26, 0.75)`, `backdrop-filter: blur(20px) saturate(160%)`, `border-top: 0.5px solid rgba(248, 247, 244, 0.1)`.
      - Easing: `0.45s cubic-bezier(0.16, 1, 0.3, 1)`.
      - Contains: Tool name (Playfair 700, 16px), Type label (Sea, 8px), Stat/quote (Dim, 11px, weight 300), and a clickable CTA arrow `View Product →` (Sea, 8.5px).

- **Scroller Card Data:**
  1. **Triply:** Gradient `160deg, #0C2A5A → #0992C2 → #0AC4E0`. Category: `Travel AI`. Quote: `"Better food picks than Google" — Harjyot S.`. Link: `https://triply.app`
  2. **YC Website:** Gradient `160deg, #0B1A4A → #0B2D72 → #0992C2`. Category: `Brand`. Stat: `Built for Yellow Capital's public presence & investor portal`. Link: `#`
  3. **YC CRM:** Gradient `160deg, #061428 → #0992C2 → #06091A`. Category: `CRM`. Stat: `AI-assisted pipeline tracking for the Yellow Capital portfolio`. Link: `#`
  4. **Tradepoint:** Gradient `160deg, #042030 → #0AC4E0 → #0B2D72`. Category: `UX / Dev`. Stat: `Full UX research to production frontend pipeline`. Link: `#`
  5. **BingX:** Gradient `160deg, #08112A → #0B2D72 → #0AC4E0`. Category: `Exchange`. Stat: `Automated trading assistant for the BingX ecosystem`. Link: `#`
  6. **Fincal:** Gradient `160deg, #061824 → #0992C2 → #0B2D72`. Category: `Finance`. Stat: `Portfolio performance & ROI modeling for Web3 investors`. Link: `#`

---

## 4. Sailing Bar Integration & Mechanics

### Sailing Bar Component Migration
- Make `.static-horizon` in `App.jsx` dynamic!
- Replace the static vertical hairline with a dynamic visual indicator that contains:
  1. A vertical progress track.
  2. An active fill indicator extending downward based on Section 4 scroll progress `p` (and overall scroll as fallback).
  3. Three circular anchor points (dots) along the track corresponding to the 3 pillars:
     - **Dot 1 (Venture Capital):** lights up/activates at `p >= 0.3`.
     - **Dot 2 (Marketing & Growth):** lights up/activates at `p >= 0.6`.
     - **Dot 3 (AI):** lights up/activates at `p >= 0.9`.
- **Communication Bridge:** Dispatches `work-scroll` custom event from the Section 4 React component (`ThreePillars.jsx`) containing the current `p` value. `App.jsx` listens to this event and smoothly drives the progress fill and active dots using CSS variables or state.
