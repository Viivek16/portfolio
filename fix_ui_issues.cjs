const fs = require('fs');
const path = require('path');

// ==========================================
// 1. Edit Info.jsx
// ==========================================
const jsxPath = path.join(__dirname, 'src/pages/Info.jsx');
let jsxContent = fs.readFileSync(jsxPath, 'utf8');

// Fix the is-visible class bug
const observerBugTarget = `entry.target.classList.add(styles.isVisible);`;
const observerBugFix = `entry.target.classList.add('is-visible');`;
jsxContent = jsxContent.replace(observerBugTarget, observerBugFix);

// Remove event names from Events rail
const eventsRailTarget = `                {[
                  { num: '01 / 09', name: "Founders' dinner", meta: 'Closed table<br>2024', img: '06-2024-events/01-hero.jpg' },
                  { num: '02 / 09', name: 'Conference floor', meta: 'Token2049<br>September', img: '06-2024-events/img_20240919_174022718.jpg' },
                  { num: '03 / 09', name: 'Side event', meta: 'Singapore<br>September', img: '06-2024-events/img_20240919_174732123.jpg' },
                  { num: '04 / 09', name: 'After-hours', meta: 'Marina Bay<br>September', img: '06-2024-events/img_20240919_141551_317.jpg' },
                  { num: '05 / 09', name: 'Roundtable', meta: 'Dubai<br>May', img: '06-2024-events/img_20240526_035055_660.jpg' },
                  { num: '06 / 09', name: 'Token launch', meta: 'Closed event<br>April', img: '06-2024-events/img_20240416_120859322.jpg' },
                  { num: '07 / 09', name: 'On stage', meta: 'Keynote<br>2024', img: '06-2024-events/_mg_9587.jpg' },
                  { num: '08 / 09', name: 'Closed dinner', meta: 'Founders<br>2024', img: '06-2024-events/img_6173.jpg' },
                  { num: '09 / 09', name: 'Panel', meta: 'Industry<br>2024', img: '06-2024-events/093a8978.jpg' },
                ].map((c, i) => (
                  <div className={styles.railCard} key={i}>
                    <span className={styles.railCardNum}>{c.num}</span>
                    <img src={\`/images/info/\${c.img}\`} alt={c.name} loading="lazy" />
                    <div className={styles.railCardOverlay}>
                      <div className={styles.railCardName}>{c.name}</div>
                      <div className={styles.railCardMeta} dangerouslySetInnerHTML={{ __html: c.meta }} />
                    </div>
                  </div>
                ))}`;

const eventsRailFix = `                {[
                  { num: '01 / 09', img: '06-2024-events/01-hero.jpg' },
                  { num: '02 / 09', img: '06-2024-events/img_20240919_174022718.jpg' },
                  { num: '03 / 09', img: '06-2024-events/img_20240919_174732123.jpg' },
                  { num: '04 / 09', img: '06-2024-events/img_20240919_141551_317.jpg' },
                  { num: '05 / 09', img: '06-2024-events/img_20240526_035055_660.jpg' },
                  { num: '06 / 09', img: '06-2024-events/img_20240416_120859322.jpg' },
                  { num: '07 / 09', img: '06-2024-events/_mg_9587.jpg' },
                  { num: '08 / 09', img: '06-2024-events/img_6173.jpg' },
                  { num: '09 / 09', img: '06-2024-events/093a8978.jpg' },
                ].map((c, i) => (
                  <div className={styles.railCard} key={i}>
                    <span className={styles.railCardNum}>{c.num}</span>
                    <img src={\`/images/info/\${c.img}\`} alt="Event capture" loading="lazy" />
                  </div>
                ))}`;
jsxContent = jsxContent.replace(eventsRailTarget, eventsRailFix);


// Fix horizon update logic to fade out at friends section and remove horizon-leveled
const updateHorizonStart = `    function updateHorizon() {\n      const docH = document.documentElement.scrollHeight - window.innerHeight;\n      const scr = window.scrollY;\n      const prog = Math.max(0, Math.min(1, scr / docH));\n\n      const trackH = prog * window.innerHeight;\n      if (horizonTrackRef.current) horizonTrackRef.current.style.height = trackH + 'px';\n      if (horizonCapRef.current) horizonCapRef.current.style.bottom = (trackH - 3) + 'px';\n\n      if (prog > 0.97) {\n        document.body.classList.add('horizon-leveled');\n      } else {\n        document.body.classList.remove('horizon-leveled');\n      }\n    }`;

const newUpdateHorizon = `    function updateHorizon() {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const scr = window.scrollY;
      const prog = Math.max(0, Math.min(1, scr / docH));

      const trackH = prog * window.innerHeight;
      if (horizonTrackRef.current) horizonTrackRef.current.style.height = trackH + 'px';
      if (horizonCapRef.current) horizonCapRef.current.style.bottom = (trackH - 3) + 'px';

      // Fade out at friends section
      const friendsSection = document.getElementById('friends');
      const nowSection = document.getElementById('ch-now');
      if (friendsSection && nowSection) {
        const fadeStart = nowSection.getBoundingClientRect().bottom - (window.innerHeight * 0.3);
        const fadeEnd = friendsSection.getBoundingClientRect().top;
        const fadeRange = fadeEnd - fadeStart;
        
        let opacity = 1;
        if (fadeStart < 0 && fadeEnd > 0) {
          opacity = Math.max(0, 1 - (Math.abs(fadeStart) / fadeRange));
        } else if (fadeEnd <= 0) {
          opacity = 0;
        }
        
        const horizon = document.querySelector('.' + styles.horizon);
        if (horizon) horizon.style.opacity = opacity;
      }
    }`;
jsxContent = jsxContent.replace(updateHorizonStart, newUpdateHorizon);

fs.writeFileSync(jsxPath, jsxContent, 'utf8');


// ==========================================
// 2. Edit Info.module.css
// ==========================================
const cssPath = path.join(__dirname, 'src/pages/Info.module.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Remove horizon-leveled rules
const horizonLeveledTarget = `/* When body has .horizon-leveled, the line sweeps to horizontal */
:global(.horizon-leveled) .horizon { right: 0; left: 0; width: 100%; height: 1px; top: auto; bottom: 80px; }
:global(.horizon-leveled) .horizonTrack { width: 100%; height: 1px !important; }
:global(.horizon-leveled) .horizonCap { right: auto; left: 100%; bottom: -3px; }
:global(.horizon-leveled) .horizonMeta { display: none; }`;
cssContent = cssContent.replace(horizonLeveledTarget, '');


// Edit punctuation rules
const puncTarget = `.punctuation {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 10vw;
  text-align: center;
  position: relative;
}
.punctuation::before {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 1px; height: 60px;
  background: linear-gradient(to bottom, transparent, var(--sea), transparent);
  opacity: 0.3;
  margin-top: -180px;
}`;

const newPunc = `.punctuation {
  min-height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 10vw;
  margin: 60px 0;
  text-align: center;
  position: relative;
  background: rgba(244, 241, 234, 0.02);
  border-top: 1px solid rgba(244, 241, 234, 0.04);
  border-bottom: 1px solid rgba(244, 241, 234, 0.04);
}`;
cssContent = cssContent.replace(puncTarget, newPunc);

// Fix punctuation quote size slightly
const puncQuoteTarget = `.punctuationQuote {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 300;
  font-size: clamp(28px, 3.5vw, 56px);
  line-height: 1.25;
  color: var(--cream);
  max-width: 22ch;
  letter-spacing: -0.01em;
}`;

const newPuncQuote = `.punctuationQuote {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 300;
  font-size: clamp(24px, 3vw, 44px);
  line-height: 1.35;
  color: var(--cream);
  max-width: 26ch;
  letter-spacing: -0.01em;
}`;
cssContent = cssContent.replace(puncQuoteTarget, newPuncQuote);

// Fix object-position of footer portrait to top
const contactImgTarget = `.contactPhoto img {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center 18%;
  filter: saturate(0.85) contrast(1.05) brightness(0.95);
}`;
const newContactImg = `.contactPhoto img {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center top;
  filter: saturate(0.85) contrast(1.05) brightness(0.95);
}`;
cssContent = cssContent.replace(contactImgTarget, newContactImg);

fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log('Successfully applied all fixes to Info.jsx and Info.module.css');
