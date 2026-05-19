const fs = require('fs');
const path = require('path');

// ==========================================
// 1. Edit Info.jsx
// ==========================================
const jsxPath = path.join(__dirname, 'src/pages/Info.jsx');
let jsxContent = fs.readFileSync(jsxPath, 'utf8');

const jsxGridStart = `          <div className={styles.friendsGrid}>`;
const jsxGridEnd = `          </div>\n        </section>\n\n        {/* ============ CONTACT ============ */}`;

const jsxStartIdx = jsxContent.indexOf(jsxGridStart);
const jsxEndIdx = jsxContent.indexOf(jsxGridEnd);

if (jsxStartIdx === -1 || jsxEndIdx === -1) {
    console.error("Could not find boundaries in Info.jsx");
    process.exit(1);
}

const newJsxGrid = `          <div className={styles.friendsGrid}>
            <article className={styles.friendCard}>
              <div className={styles.friendPhoto}>
                <img src="/images/friends/juliet-su.jpg" alt="Juliet Su, Managing Partner at NewTribe Capital" loading="lazy" />
              </div>
              <div className={styles.friendBody}>
                <span className={styles.friendRoman}>i.</span>
                <blockquote className={styles.friendQuote}>
                  Viivek was the only person who stood by during the tough times of the fund and he managed it all single-handedly — the marketing, branding, partnerships, dealflow, execution, event management and whatnot. One of the best ones I've ever worked with.
                </blockquote>
                <div className={styles.friendAttrib}>
                  <span className={styles.friendName}>Juliet Su</span>
                  <span className={styles.friendRole}>Managing Partner · NewTribe Capital</span>
                </div>
              </div>
            </article>

            <article className={styles.friendCard}>
              <div className={styles.friendPhoto}>
                <img src="/images/friends/Karan-aneja.jpg" alt="Karan Aneja, Senior Analyst at Pi42 Ventures" loading="lazy" />
              </div>
              <div className={styles.friendBody}>
                <span className={styles.friendRoman}>ii.</span>
                <blockquote className={styles.friendQuote}>
                  I still recall the first hand-shake with Viivek at the Palm Residences, Dubai, and today he's the guy I often run into for any sort of advice in my life.
                </blockquote>
                <div className={styles.friendAttrib}>
                  <span className={styles.friendName}>Karan Aneja</span>
                  <span className={styles.friendRole}>Senior Analyst · Pi42 Ventures</span>
                </div>
              </div>
            </article>

            <article className={styles.friendCard}>
              <div className={styles.friendPhoto}>
                <img src="/images/friends/Srushti-shirsat.jpg" alt="Srushti Shirsat, Founder at HRBP" loading="lazy" />
              </div>
              <div className={styles.friendBody}>
                <span className={styles.friendRoman}>iii.</span>
                <blockquote className={styles.friendQuote}>
                  Viivek has never turned me down, be it for the top-tier Series A company or a pre-seed stage project — he just fits in very well everywhere.
                </blockquote>
                <div className={styles.friendAttrib}>
                  <span className={styles.friendName}>Srushti Shirsat</span>
                  <span className={styles.friendRole}>Founder · HRBP</span>
                </div>
              </div>
            </article>

            <article className={styles.friendCard}>
              <div className={styles.friendPhoto}>
                <img src="/images/friends/zhanna-manzyk.jpg" alt="Zhanna Manzyk, CEO at Jaya Talent" loading="lazy" />
              </div>
              <div className={styles.friendBody}>
                <span className={styles.friendRoman}>iv.</span>
                <blockquote className={styles.friendQuote}>
                  A few years ago, I had the pleasure of collaborating with Viivek — and it was genuinely one of those working relationships you don't forget. Highly professional, deeply ethical, and exactly the kind of talent that makes any project better.
                </blockquote>
                <div className={styles.friendAttrib}>
                  <span className={styles.friendName}>Zhanna Manzyk</span>
                  <span className={styles.friendRole}>CEO · Jaya Talent</span>
                </div>
              </div>
            </article>

            <article className={styles.friendCard}>
              <div className={styles.friendPhoto}>
                <img src="/images/friends/sowmya-raghavan.jpg" alt="Sowmya Raghavan, Ex-CEO of NODO Inc." loading="lazy" />
              </div>
              <div className={styles.friendBody}>
                <span className={styles.friendRoman}>v.</span>
                <blockquote className={styles.friendQuote}>
                  I've known him for 4 years and he completely turned around our marketing strategies while showing amazing results. On top of it, he was our go-to guy for any sort of VC connects which further led to a successful raise. I've since worked with him on all projects of mine.
                </blockquote>
                <div className={styles.friendAttrib}>
                  <span className={styles.friendName}>Sowmya Raghavan</span>
                  <span className={styles.friendRole}>Ex-CEO · NODO Inc.</span>
                </div>
              </div>
            </article>
`;

jsxContent = jsxContent.slice(0, jsxStartIdx) + newJsxGrid + jsxContent.slice(jsxEndIdx);

// Add the intersection observer for friends in Info.jsx
const scrollHandlerTag = `    // ===========================================================
    // SCROLL HANDLER
    // ===========================================================`;

const intersectionCode = `    // ===========================================================
    // FRIEND CARDS STAGGER
    // ===========================================================
    const friendCards = document.querySelectorAll('.' + styles.friendCard);
    const friendObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.isVisible);
          friendObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px'
    });
    friendCards.forEach((card) => friendObserver.observe(card));

    // ===========================================================
    // SCROLL HANDLER
    // ===========================================================`;

jsxContent = jsxContent.replace(scrollHandlerTag, intersectionCode);

// Disconnect observer on unmount
const unmountTarget = `obs.disconnect();`;
const unmountCode = `obs.disconnect();\n      friendObserver.disconnect();`;
jsxContent = jsxContent.replace(unmountTarget, unmountCode);

fs.writeFileSync(jsxPath, jsxContent, 'utf8');


// ==========================================
// 2. Edit Info.module.css
// ==========================================
const cssPath = path.join(__dirname, 'src/pages/Info.module.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

const cssStartTag = `.friendsGrid {`;
const cssEndTag = `/* =========================================================\n   CONTACT FOOTER\n   ========================================================= */`;

const cssStartIdx = cssContent.indexOf(cssStartTag);
const cssEndIdx = cssContent.indexOf(cssEndTag);

if (cssStartIdx === -1 || cssEndIdx === -1) {
    console.error("Could not find boundaries in Info.module.css");
    process.exit(1);
}

const newCss = `.friendsGrid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
  padding: 0;
  /* Subtle vertical dividers between cards */
  border-left: 1px solid rgba(244, 241, 234, 0.1);
}

.friendCard {
  position: relative;
  padding: 48px clamp(20px, 2vw, 36px) 56px;
  border-right: 1px solid rgba(244, 241, 234, 0.1);
  display: flex;
  flex-direction: column;
  
  /* Stagger entry — set initial state */
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 700ms cubic-bezier(0.22, 0.61, 0.36, 1), transform 700ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

:global(.is-visible).friendCard {
  opacity: 1;
  transform: translateY(0);
}

.friendCard:nth-child(1) { transition-delay: 0ms; }
.friendCard:nth-child(2) { transition-delay: 80ms; }
.friendCard:nth-child(3) { transition-delay: 160ms; }
.friendCard:nth-child(4) { transition-delay: 240ms; }
.friendCard:nth-child(5) { transition-delay: 320ms; }

.friendPhoto {
  position: relative;
  aspect-ratio: 4 / 5;
  width: 100%;
  overflow: hidden;
  margin-bottom: 28px;
  background: rgba(255, 255, 255, 0.03);
}

.friendPhoto img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  filter: brightness(0.95) contrast(1.02) saturate(0.98);
  transition: filter 500ms ease, transform 700ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.friendCard:hover .friendPhoto img {
  filter: brightness(1.04) contrast(1.05) saturate(1.05);
  transform: scale(1.025);
}

.friendBody {
  display: flex;
  flex-direction: column;
  gap: 18px;
  flex: 1;
}

.friendRoman {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 400;
  font-size: 0.875rem;
  color: var(--sea);
  opacity: 0.75;
  letter-spacing: 0.02em;
}

.friendQuote {
  position: relative;
  margin: 0;
  padding: 0;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--cream);
  opacity: 0.92;
  font-weight: 400;
  letter-spacing: 0.005em;
  flex: 1;
}

.friendQuote::before {
  content: "\\201C";
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1.6em;
  line-height: 0;
  color: var(--sea);
  margin-right: 4px;
  vertical-align: -0.25em;
}

.friendQuote::after {
  content: "\\201D";
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1.6em;
  line-height: 0;
  color: var(--sea);
  margin-left: 2px;
  vertical-align: -0.25em;
}

.friendAttrib {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
  padding-top: 18px;
  border-top: 1px solid rgba(244, 241, 234, 0.1);
}

.friendName {
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: var(--cream);
}

.friendRole {
  font-size: 0.6875rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--cream-soft, var(--cream-dim));
  opacity: 0.7;
}

`;

cssContent = cssContent.slice(0, cssStartIdx) + newCss + cssContent.slice(cssEndIdx);

// Fix Contact height
const contactTarget = `.contact {\n  height: 85vh;\n  min-height: 720px;`;
const newContact = `.contact {\n  height: auto;\n  min-height: 100vh;`;
cssContent = cssContent.replace(contactTarget, newContact);

// Fix media queries for friendsGrid
const mediaTarget = `.friendsGrid {
    grid-template-columns: repeat(2, 1fr);
  }
  .friendCard:nth-child(2n) { border-right: none; }
  .friendCard:nth-child(-n+2) { border-bottom: 1px solid rgba(244, 241, 234, 0.06); }
  .friendCardBody { padding: 24px 20px 28px; }
  .friendCardQuote { font-size: 17px; }`;

const newMedia = `.friendsGrid {
    grid-template-columns: 1fr;
  }
  .friendCard { 
    padding: 32px 24px 40px;
    border-bottom: 1px solid rgba(244, 241, 234, 0.1);
    border-right: none;
  }
  .friendCard:last-child { border-bottom: none; }`;

cssContent = cssContent.replace(mediaTarget, newMedia);

// Wait, the 1399px and 1023px media queries are missing. 
// I'll append them right above the @media (max-width: 900px) line.
const mqStart = `@media (max-width: 900px) {`;
const extraMQs = `@media (max-width: 1399px) {
  .friendsGrid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 1023px) {
  .friendsGrid { grid-template-columns: repeat(2, 1fr); }
  .friendCard { padding: 36px 20px 44px; }
}
`;
cssContent = cssContent.replace(mqStart, extraMQs + mqStart);


fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log('Successfully updated Info.jsx and Info.module.css');
