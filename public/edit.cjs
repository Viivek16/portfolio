const fs = require('fs');

const file = 'd:/Personal Portfolio Website/public/info.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Root variables
content = content.replace(
  /--gold-dim:\s*#8C7434;\s*\/\* secondary on gold \*\//,
  `--gold-dim:   #8C7434;   /* secondary on gold */
    --cream-soft: #C8C3B4;
    --accent:     #0AC4E0;
    --hairline:   rgba(244, 241, 234, 0.1);
    --font-sans:  'Poppins', system-ui, sans-serif;
    --font-serif: 'Cormorant Garamond', serif;`
);

// 2. Horizon CSS
content = content.replace(
  /transition: bottom \.15s linear, all \.8s cubic-bezier\(\.7,\.05,\.3,1\);/,
  'transition: bottom .15s linear, opacity 200ms ease, all .8s cubic-bezier(.7,.05,.3,1);'
);
content = content.replace(
  /transition: color \.4s ease;/,
  'transition: opacity 200ms ease, color .4s ease;'
);

// 3. Index item hover
content = content.replace(
  /\.index-item \{[\s\S]*?overflow: hidden;\n  \}/,
  `.index-item {
    display: grid;
    grid-template-columns: 100px 1fr 200px;
    align-items: baseline;
    padding: 13px 0;
    border-bottom: 1px solid rgba(244, 241, 234, 0.08);
    cursor: pointer;
    transition: padding-left 280ms ease, color 200ms ease;
    position: relative;
    overflow: hidden;
  }`
);
content = content.replace(
  /\.index-item::before \{[\s\S]*?transform: scaleY\(1\); \}/,
  `.index-item::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 2px;
    height: 0;
    background: var(--accent);
    transition: height 280ms cubic-bezier(0.22, 0.61, 0.36, 1);
  }
  .index-item:hover { padding-left: 24px; }
  .index-item:hover::before { height: 70%; }`
);

// 4. Now card animations & rail cue
content = content.replace(
  /transition: all \.35s cubic-bezier\(\.2,\.7,\.2,1\);\n  \}/,
  `transition: all .35s cubic-bezier(.2,.7,.2,1);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 600ms ease, transform 600ms ease, border-color .35s ease, background .35s ease;
  }
  .now-card.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
  .now-card:nth-child(1) { transition-delay: 0ms; }
  .now-card:nth-child(2) { transition-delay: 100ms; }
  .now-card:nth-child(3) { transition-delay: 200ms; }
  .now-card:nth-child(4) { transition-delay: 300ms; }
  .now-card:nth-child(5) { transition-delay: 400ms; }`
);

content = content.replace(
  /\.now-cue \{[\s\S]*?color: var\(--cream-mute\);\n  \}/,
  `.now-hint {
    font-family: var(--font-sans);
    font-size: 0.6875rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--cream-soft);
    opacity: 0.5;
    margin-top: 48px;
  }`
);

// 5. Friends section padding & placeholder
content = content.replace(
  /padding: 100px 0 0;\n  \}/,
  `padding: 70px 0 clamp(120px, 14vh, 200px);\n  }`
);
content = content.replace(
  /\.friend-card-role \{[\s\S]*?letter-spacing: 0\.03em;\n  \}/,
  `.friend-card-role {
    font-size: 11px;
    color: var(--cream-mute);
    letter-spacing: 0.03em;
  }

  /* When card has placeholder state */
  .friend-card.is-placeholder .friend-card-photo {
    background: linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.04));
  }
  .friend-card.is-placeholder .friend-card-photo::before {
    opacity: 0.12; 
    font-size: 2.5rem; 
  }
  .friend-card.is-placeholder .friend-card-quote {
    color: var(--cream);
    opacity: 0.35; 
    font-style: italic;
    font-size: 0.875rem;
  }
  .friend-card.is-placeholder .friend-card-name,
  .friend-card.is-placeholder .friend-card-role {
    opacity: 0.3;
  }`
);

// 6. Footer CSS replace
content = content.replace(
  /\/\* =========================================================\n\s*CONTACT FOOTER — two-column with photo bleed\n\s*========================================================= \*\/[\s\S]*?\/\* =========================================================\n\s*RESPONSIVE\n\s*========================================================= \*\//,
  `/* =========================================================
     FOOTER
     ========================================================= */
  #ch-friends + #ch-footer,
  .footer-section {
    margin-top: 0;
  }

  .footer-section {
    position: relative;
    background: var(--ink);
    border-top: 1px solid var(--hairline);
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: clamp(640px, 80vh, 880px);
    align-items: stretch;
  }

  .footer-portrait {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .footer-portrait img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 30%;
    filter: brightness(0.92) contrast(1.05);
  }

  .footer-portrait-fade {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 35%;
    pointer-events: none;
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(7, 12, 24, 0.4) 60%,
      var(--ink) 100%
    );
  }

  .footer-portrait-meta {
    position: absolute;
    left: clamp(24px, 4vw, 56px);
    bottom: clamp(32px, 5vh, 64px);
    display: flex;
    flex-direction: column;
    gap: 6px;
    z-index: 2;
  }

  .footer-portrait-eyebrow {
    font-family: var(--font-sans);
    font-size: 0.6875rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--cream);
    opacity: 0.85;
  }

  .footer-portrait-year {
    font-family: var(--font-sans);
    font-size: 0.625rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--cream);
    opacity: 0.55;
  }

  .footer-content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(48px, 8vh, 96px) clamp(32px, 6vw, 96px);
  }

  .footer-content-inner {
    width: 100%;
    max-width: 480px;
  }

  .footer-eyebrow {
    display: block;
    font-family: var(--font-sans);
    font-size: 0.6875rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 32px;
  }

  .footer-headline {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 400;
    font-size: clamp(2.25rem, 4.2vw, 3.5rem);
    line-height: 1.1;
    color: var(--cream);
    margin-bottom: 28px;
    letter-spacing: -0.01em;
  }

  .footer-headline .accent-cyan {
    color: var(--accent);
  }

  .footer-tagline {
    font-family: var(--font-sans);
    font-size: 0.9375rem;
    line-height: 1.65;
    color: var(--cream-soft);
    margin-bottom: 56px;
    max-width: 440px;
  }

  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0 0 56px 0;
    border-top: 1px solid var(--hairline);
  }

  .footer-links li {
    border-bottom: 1px solid var(--hairline);
  }

  .footer-links a {
    display: grid;
    grid-template-columns: 32px 1fr 32px;
    align-items: center;
    padding: 22px 0;
    font-family: var(--font-sans);
    font-size: 1rem;
    letter-spacing: 0.01em;
    color: var(--cream);
    text-decoration: none;
    transition: color 200ms ease;
  }

  .footer-links .link-roman {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 0.875rem;
    color: var(--accent);
    opacity: 0.7;
  }

  .footer-links .link-arrow {
    font-size: 0.875rem;
    color: var(--cream-soft);
    text-align: right;
    transition: transform 240ms ease, color 200ms ease;
  }

  .footer-links a:hover {
    color: var(--accent);
  }

  .footer-links a:hover .link-arrow {
    transform: translateX(8px);
    color: var(--accent);
  }

  .footer-signature {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 300;
    font-size: 1rem;
    color: var(--cream);
    opacity: 0.85;
    text-align: left;
    letter-spacing: 0.01em;
    margin: 0;
    padding-top: 4px;
  }

  .footer-baseline {
    border-top: 1px solid var(--hairline);
    padding: 24px clamp(24px, 4vw, 56px);
  }

  .footer-baseline-inner {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    font-family: var(--font-sans);
    font-size: 0.625rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--cream-soft);
    opacity: 0.55;
  }

  .baseline-left { text-align: left; }
  .baseline-center { text-align: center; }
  .baseline-right { text-align: right; }

  /* =========================================================
     RESPONSIVE
     ========================================================= */`
);

// 7. Mobile Footer CSS replace
content = content.replace(
  /\.contact \{[\s\S]*?\.contact-foot \{ font-size: 9px; gap: 12px; \}/,
  `.footer-grid {
      grid-template-columns: 1fr;
    }
    .footer-portrait {
      aspect-ratio: 4 / 5;
      min-height: 480px;
    }
    .footer-portrait-fade {
      width: 100%;
      height: 40%;
      top: auto;
      bottom: 0;
      background: linear-gradient(
        to bottom,
        transparent 0%,
        var(--ink) 100%
      );
    }
    .footer-baseline-inner {
      grid-template-columns: 1fr;
      gap: 12px;
      text-align: center;
    }
    .baseline-left, .baseline-center, .baseline-right { text-align: center; }`
);

// 8. New CSS additions before </style>
content = content.replace(
  /<\/style>/,
  `
  /* =========================================================
     CHAPTER CHIP
     ========================================================= */
  .chapter-chip {
    position: fixed;
    bottom: 24px;
    left: 32px;
    z-index: 100;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    background: rgba(7, 12, 24, 0.75);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--hairline);
    border-radius: 100px;
    font-family: var(--font-sans);
    font-size: 0.6875rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--cream);
    opacity: 0.7;
    transition: opacity 280ms ease, transform 280ms ease;
    pointer-events: none;
  }

  .chapter-chip.is-hidden {
    opacity: 0;
    transform: translateY(8px);
  }

  .chip-num {
    color: var(--accent);
    font-weight: 500;
  }

  .chip-divider {
    color: var(--cream-soft);
    opacity: 0.5;
  }

  body.is-golden .chapter-chip {
    background: rgba(40, 30, 10, 0.7);
    border-color: rgba(120, 80, 30, 0.2);
    color: rgba(50, 30, 10, 0.85);
    opacity: 0.5;
  }

  body.is-golden .chip-num {
    color: #8a6b25;
  }

  @media (max-width: 640px) {
    .chapter-chip {
      bottom: 16px;
      left: 16px;
      padding: 8px 12px;
      font-size: 0.625rem;
    }
  }

  /* =========================================================
     LANDER BEGIN CHEVRON
     ========================================================= */
  .lander-begin {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-top: 64px;
  }

  .begin-label {
    font-family: var(--font-sans);
    font-size: 0.6875rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--cream-soft);
    opacity: 0.6;
  }

  .begin-chevron {
    font-size: 1.25rem;
    color: var(--accent);
    opacity: 0;
    animation: chevron-pulse 2400ms ease-in-out infinite;
    animation-delay: 3000ms; /* only after 3s idle */
  }

  @keyframes chevron-pulse {
    0%, 100% { opacity: 0.2; transform: translateY(0); }
    50%      { opacity: 0.8; transform: translateY(6px); }
  }

  body.has-scrolled .begin-chevron {
    animation: none;
    opacity: 0;
  }

</style>`
);

// 9. Lander Cue HTML
content = content.replace(
  /<div class="lander-cue">Begin<\/div>/,
  `<div class="lander-begin">
      <span class="begin-label">BEGIN</span>
      <span class="begin-chevron">↓</span>
    </div>`
);

// 10. Now Cue HTML
content = content.replace(
  /<div class="now-cue">→ Drag or scroll the rail · More chapters coming<\/div>/,
  `<p class="now-hint">MORE CHAPTERS COMING</p>`
);

// 11. Friends Section HTML
content = content.replace(
  /<section class="friends-section" id="friends">/,
  `<section class="friends-section" id="ch-friends">`
);
content = content.replace(
  /class="friend-card"/g,
  `class="friend-card is-placeholder"`
);

// 12. Footer HTML Replace
content = content.replace(
  /<footer class="contact" id="contact">[\s\S]*?<\/footer>/,
  `<section id="ch-footer" class="footer-section">
    <div class="footer-grid">
      <!-- LEFT: Full-bleed portrait -->
      <div class="footer-portrait">
        <img src="images/footer/viivek-portrait.jpg" alt="Viivek Mehata">
        <div class="footer-portrait-meta">
          <span class="footer-portrait-eyebrow">VIIVEK MEHATA</span>
          <span class="footer-portrait-year">2018 — NOW</span>
        </div>
        <!-- Right-edge gradient blends portrait into navy canvas -->
        <div class="footer-portrait-fade"></div>
      </div>
      
      <!-- RIGHT: Contact content -->
      <div class="footer-content">
        <div class="footer-content-inner">
          <span class="footer-eyebrow">STAY IN TOUCH</span>
          <h2 class="footer-headline">
            Find me where the <span class="accent-cyan">work</span> lives.
          </h2>
          <p class="footer-tagline">
            Building across VC, market making, and AI. Always up for a 
            conversation about a thesis worth holding — or a chapter 
            worth starting.
          </p>
          
          <ul class="footer-links">
            <li><a href="https://x.com/mehtaandmore" target="_blank" rel="noopener">
              <span class="link-roman">i.</span>
              <span class="link-label">Twitter / X</span>
              <span class="link-arrow">→</span>
            </a></li>
            <li><a href="https://www.linkedin.com/in/viivek-mehata16/" target="_blank" rel="noopener">
              <span class="link-roman">ii.</span>
              <span class="link-label">LinkedIn</span>
              <span class="link-arrow">→</span>
            </a></li>
            <li><a href="https://t.me/Viivek16" target="_blank" rel="noopener">
              <span class="link-roman">iii.</span>
              <span class="link-label">Telegram</span>
              <span class="link-arrow">→</span>
            </a></li>
            <li><a href="mailto:vivekmehta.vm31@gmail.com" target="_blank" rel="noopener">
              <span class="link-roman">iv.</span>
              <span class="link-label">Email</span>
              <span class="link-arrow">→</span>
            </a></li>
          </ul>
          
          <!-- The exhale -->
          <p class="footer-signature">Until the next chapter — V.</p>
        </div>
      </div>
    </div>
    
    <!-- Bottom hairline + full-width meta strip -->
    <div class="footer-baseline">
      <div class="footer-baseline-inner">
        <span class="baseline-left">EDITORIAL PORTFOLIO</span>
        <span class="baseline-center">2018 — NOW</span>
        <span class="baseline-right">© 2026 — STILL SAILING</span>
      </div>
    </div>
  </section>`
);

// 13. Chapter Chip HTML
content = content.replace(
  /<\/main>/,
  `</main>

  <div id="chapter-chip" class="chapter-chip is-hidden" aria-live="polite">
    <span class="chip-num">CHAPTER 01</span>
    <span class="chip-divider">—</span>
    <span class="chip-label">2018 · THE FIRST LESSON</span>
  </div>`
);

// 14. Scripts Addition
const scriptsAddition = `
  // ===========================================================
  // SAILING FADE (Fix 1)
  // ===========================================================
  const nowSection = document.querySelector('#ch-now');
  const friendsSection = document.querySelector('#ch-friends');
  const stillSailingEl = document.querySelector('.horizon-meta');
  const horizonDot = document.querySelector('.horizon-cap');

  function updateSailingFade() {
    if (!nowSection || !friendsSection || !stillSailingEl || !horizonDot) return;
    const nowRect = nowSection.getBoundingClientRect();
    const friendsRect = friendsSection.getBoundingClientRect();
    // Fade region: bottom 30% of #ch-now into top of #ch-friends
    const fadeStart = nowRect.bottom - (window.innerHeight * 0.3);
    const fadeEnd = friendsRect.top;
    const fadeRange = fadeEnd - fadeStart;
    
    let opacity = 1;
    if (fadeStart < 0 && fadeEnd > 0) {
      // We're inside the fade region
      opacity = Math.max(0, 1 - (Math.abs(fadeStart) / fadeRange));
    } else if (fadeEnd <= 0) {
      // Past the boundary — locked at zero
      opacity = 0;
    }
    
    stillSailingEl.style.opacity = opacity;
    horizonDot.style.opacity = opacity;
    stillSailingEl.style.pointerEvents = opacity < 0.1 ? 'none' : 'auto';
  }

  // ===========================================================
  // CHAPTER CHIP (Addition 1)
  // ===========================================================
  const chaptersData = [
    { id: '#ch-2018',   num: 'CHAPTER 01', label: '2018 · THE FIRST LESSON' },
    { id: '#ch-2020', num: 'CHAPTER 02', label: '2020 · HELD IN PLACE' },
    { id: '#ch-2021', num: 'CHAPTER 03', label: 'JUNE 2021 · CROSSING OVER' },
    { id: '#ch-cities',   num: 'CHAPTER 04', label: '2022 · ON THE ROAD' },
    { id: '#ch-events',   num: 'CHAPTER 05', label: 'SEPT 2024 · CONVENING' },
    { id: '#ch-firms',    num: 'CHAPTER 06', label: 'DEC 2024 · ARCHITECTURE' },
    { id: '#ch-yellow', num: 'CHAPTER 07', label: 'APRIL 2025 · THE MANDATE' },
    { id: '#ch-marriage', num: 'CHAPTER 08', label: 'NOV 2025 · THE ANCHOR' },
    { id: '#ch-now',      num: 'CHAPTER 09', label: 'SINCE THEN · OPEN WATER' },
  ];

  const chip = document.getElementById('chapter-chip');
  const chipNum = chip ? chip.querySelector('.chip-num') : null;
  const chipLabel = chip ? chip.querySelector('.chip-label') : null;
  const landerSection = document.querySelector('#lander');

  function updateChip() {
    if (!chip || !chipNum || !chipLabel) return;
    
    // Hide on lander
    if (landerSection) {
      const landerRect = landerSection.getBoundingClientRect();
      if (landerRect.bottom > window.innerHeight * 0.5) {
        chip.classList.add('is-hidden');
        return;
      }
    }
    
    // Hide once friends section reaches midpoint
    if (friendsSection) {
      const friendsRect = friendsSection.getBoundingClientRect();
      if (friendsRect.top < window.innerHeight * 0.5) {
        chip.classList.add('is-hidden');
        return;
      }
    }
    
    // Find the chapter closest to viewport center
    const viewportCenter = window.innerHeight / 2;
    let active = null;
    let minDist = Infinity;
    for (const ch of chaptersData) {
      const el = document.querySelector(ch.id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      const dist = Math.abs(elCenter - viewportCenter);
      if (dist < minDist) {
        minDist = dist;
        active = ch;
      }
    }
    
    if (active) {
      chipNum.textContent = active.num;
      chipLabel.textContent = active.label;
      chip.classList.remove('is-hidden');
    }
  }

  // ===========================================================
  // LANDER CHEVRON SCROLL HIDE (Addition 2)
  // ===========================================================
  let hasScrolled = false;
  function updateLanderScroll() {
    if (!hasScrolled && window.scrollY > 50) {
      document.body.classList.add('has-scrolled');
      hasScrolled = true;
    }
  }

  // ===========================================================
  // NOW CARDS ANIMATION (Fix 4)
  // ===========================================================
  const nowCardsObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const cards = e.target.querySelectorAll('.now-card');
        cards.forEach(c => c.classList.add('is-visible'));
      }
    });
  }, { threshold: 0.2 });
  if (nowSection) nowCardsObs.observe(nowSection);
`;

content = content.replace(
  /function onScroll\(\) \{/,
  `function onScroll() {
    updateLanderScroll();
`
);

content = content.replace(
  /updateGolden\(\);/,
  `updateGolden();
        updateSailingFade();
        updateChip();`
);

// Insert the new scripts blocks before the onScroll handler
content = content.replace(
  /\/\/ ===========================================================\n\s*\/\/ SCROLL HANDLER \(consolidated\)/,
  scriptsAddition + '\n  // ===========================================================\n  // SCROLL HANDLER (consolidated)'
);

fs.writeFileSync(file, content);
console.log('Successfully updated info.html');
