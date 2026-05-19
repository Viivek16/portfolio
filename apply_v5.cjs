const fs = require('fs');
const path = require('path');

// ==========================================
// 1. Edit Info.jsx
// ==========================================
const jsxPath = path.join(__dirname, 'src/pages/Info.jsx');
let jsxContent = fs.readFileSync(jsxPath, 'utf8');

// A. Move Wanderer Quote
const punc1StartStr = `{/* ============ PUNCTUATION 1 ============ */}`;
const punc1EndStr = `</section>`;
const punc1StartIndex = jsxContent.indexOf(punc1StartStr);
const punc1EndIndex = jsxContent.indexOf(punc1EndStr, punc1StartIndex) + punc1EndStr.length;

const punc1Section = jsxContent.substring(punc1StartIndex, punc1EndIndex);
jsxContent = jsxContent.slice(0, punc1StartIndex) + jsxContent.slice(punc1EndIndex);

const chCitiesEndStr = `</section>\n\n        {/* ============ 2024 — EVENTS RAIL ============ */}`;
const chCitiesEndIndex = jsxContent.indexOf(chCitiesEndStr);

jsxContent = jsxContent.slice(0, chCitiesEndIndex) + 
`</section>\n\n        ` + punc1Section + `\n\n        {/* ============ 2024 — EVENTS RAIL ============ */}` + 
jsxContent.slice(chCitiesEndIndex + `</section>\n\n        {/* ============ 2024 — EVENTS RAIL ============ */}`.length);


// B. Footer markup
const footerStartStr = `{/* ============ CONTACT ============ */}`;
const footerEndStr = `</footer>`;
const footerStartIndex = jsxContent.indexOf(footerStartStr);
const footerEndIndex = jsxContent.indexOf(footerEndStr, footerStartIndex) + footerEndStr.length;

const newFooter = `{/* ============ CONTACT ============ */}
        <footer className={styles.contact} id="ch-footer">
          <div className={styles.contactPhoto}>
            <div className={styles.contactPhotoFade}></div>
            <img src="/images/info/03-2020-neurotech/img-20201125-wa0005.jpg" alt="Viivek Mehata" loading="lazy" />
          </div>
          <div className={styles.contactContent}>
            <div className={styles.contactContentInner}>
              <div className={\`\${styles.eyebrow} \${styles.contactEyebrow}\`}>Stay in touch</div>
              <h2 className={styles.contactTitle}>Find me where the <em>work</em> lives.</h2>
              <p className={styles.contactTagline}>Building across VC, market making, and AI. Always up for a conversation about a thesis worth holding — or a chapter worth starting.</p>
              <div className={styles.contactLinks}>
                <a className={styles.contactLink} data-num="i."   href="https://x.com/mehtaandmore" target="_blank" rel="noopener noreferrer">Twitter / X</a>
                <a className={styles.contactLink} data-num="ii."  href="https://www.linkedin.com/in/viivek-mehata16/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a className={styles.contactLink} data-num="iii." href="https://t.me/Viivek16" target="_blank" rel="noopener noreferrer">Telegram</a>
                <a className={styles.contactLink} data-num="iv."  href="mailto:vivekmehta.vm31@gmail.com">Email</a>
              </div>
              <p className={styles.contactSignature}>Until the next chapter — V.</p>
            </div>
          </div>
          <div className={styles.contactFoot}>
            <div className={styles.contactFootInner}>
              <div className={styles.footLeft}>Editorial portfolio</div>
              <div className={styles.footCenter}>2018 — Now</div>
              <div className={styles.footRight}>Still sailing</div>
            </div>
          </div>
        </footer>`;

jsxContent = jsxContent.slice(0, footerStartIndex) + newFooter + jsxContent.slice(footerEndIndex);

fs.writeFileSync(jsxPath, jsxContent, 'utf8');


// ==========================================
// 2. Edit Info.module.css
// ==========================================
const cssPath = path.join(__dirname, 'src/pages/Info.module.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// A. Testimonial Bleed Effect
const friendsSectionStr = `.friendsSection {
  display: flex;
  flex-direction: column;
  padding: 60px 0 0;
}`;
const friendsSectionStr2 = `.friendsSection {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 60px 0 0;
}`;

const newFriendsSection = `.friendsSection {
  position: relative;
  background: 
    radial-gradient(ellipse 60% 45% at 50% 50%,
      rgba(9, 146, 194, 0.035) 0%,
      transparent 70%),
    var(--ink);
  padding-top: 200px;
  padding-bottom: 200px;
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  display: flex;
  flex-direction: column;
}`;

if (cssContent.includes(friendsSectionStr)) cssContent = cssContent.replace(friendsSectionStr, newFriendsSection);
else if (cssContent.includes(friendsSectionStr2)) cssContent = cssContent.replace(friendsSectionStr2, newFriendsSection);
else {
  const friendsSectionMatch = cssContent.match(/\\.friendsSection\\s*{[^}]*}/);
  if (friendsSectionMatch) cssContent = cssContent.replace(friendsSectionMatch[0], newFriendsSection);
}

// B. Testimonials - Monochrome default, color on hover, italic quotes
const friendStylesStart = cssContent.indexOf(`.friendCard {`);
const contactFooterStart = cssContent.indexOf(`/* =========================================================\n   CONTACT FOOTER\n   ========================================================= */`);

if (friendStylesStart !== -1 && contactFooterStart !== -1) {
  // We'll replace the entire block between .friendCard and CONTACT FOOTER
  const preFriendStyles = cssContent.slice(0, friendStylesStart);
  const postContactFooter = cssContent.slice(contactFooterStart);
  
  const newFriendStyles = `.friendCard {
  position: relative;
  padding: 48px clamp(20px, 2vw, 36px) 56px;
  border-right: 1px solid rgba(244, 241, 234, 0.1);
  display: flex;
  flex-direction: column;
  
  /* Stagger entry — set initial state */
  opacity: 0;
  transition: opacity 700ms cubic-bezier(0.22, 0.61, 0.36, 1), transform 500ms cubic-bezier(0.22,0.61,0.36,1), background 400ms ease;
}

:global(.is-visible).friendCard {
  opacity: 1;
}

.friendCard:hover {
  transform: translateY(-8px);
  background: rgba(255,255,255,0.02);
}

.friendCard:nth-child(1) { transition-delay: 0ms, 0ms, 0ms; }
.friendCard:nth-child(2) { transition-delay: 80ms, 0ms, 0ms; }
.friendCard:nth-child(3) { transition-delay: 160ms, 0ms, 0ms; }
.friendCard:nth-child(4) { transition-delay: 240ms, 0ms, 0ms; }
.friendCard:nth-child(5) { transition-delay: 320ms, 0ms, 0ms; }

/* Remove transition delays when hovering so it's instantaneous */
.friendCard:hover { transition-delay: 0ms, 0ms, 0ms; }

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
  filter: grayscale(100%) brightness(0.88) contrast(1.02);
  transition: filter 500ms ease, transform 600ms cubic-bezier(0.22,0.61,0.36,1);
}

.friendCard:hover .friendPhoto img {
  filter: grayscale(0%) brightness(1.02) contrast(1.05);
  transform: scale(1.03);
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
  flex: 1;
  font-family: 'Cormorant Garamond', serif !important;
  font-style: italic;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.65;
  color: var(--cream);
  opacity: 0.82;
  letter-spacing: 0.005em;
  transition: opacity 400ms ease;
}

.friendCard:hover .friendQuote {
  opacity: 1;
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

.friendName,
.friendRole {
  transition: color 300ms ease;
}

.friendCard:hover .friendName {
  color: var(--sea);
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
  
  cssContent = preFriendStyles + newFriendStyles + postContactFooter;
}

// C. Footer - Hard-lock to 100vh
const contactStartStr = `.contact {`;
// Remove old .contact to the end of file (or until media queries)
// Actually we can just replace everything from .contact { to the media queries
const mqStartStr = `@media (max-width: 1399px) {`;
const mqIndex = cssContent.indexOf(mqStartStr);
const contactIndex = cssContent.indexOf(contactStartStr);

if (contactIndex !== -1 && mqIndex !== -1) {
  const preContact = cssContent.slice(0, contactIndex);
  const postMq = cssContent.slice(mqIndex);
  
  const newFooterCss = `.contact {
  height: 100vh;
  max-height: 100vh;
  min-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr auto;
  background: var(--ink);
  position: relative;
  padding: 0;
}

.contactPhoto {
  grid-column: 1;
  grid-row: 1 / -1;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.contactPhoto img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 22%;
  filter: brightness(0.94) contrast(1.04);
}

.contactPhotoFade {
  position: absolute;
  top: 0; right: 0; bottom: 0;
  width: 35%;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(7,12,24,0.4) 60%,
    var(--ink) 100%
  );
  pointer-events: none;
}

.contactContent {
  grid-column: 2;
  grid-row: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(32px, 5vh, 64px) clamp(40px, 6vw, 96px);
  overflow: hidden;
}

.contactContentInner {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 2.5vh, 28px);
}

.contactEyebrow { margin-bottom: 0; color: var(--sea); }
.contactTitle { margin-bottom: 0; font-size: clamp(2rem, 3.8vw, 3.25rem); font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 300; letter-spacing: -0.02em; color: var(--cream); }
.contactTitle em { color: var(--sea); font-style: italic; }
.contactTagline { margin-bottom: 0; font-size: 15px; line-height: 1.6; color: var(--cream-dim); font-weight: 300; }
.contactLinks { margin: 0; display: flex; flex-direction: column; border-top: 1px solid rgba(244, 241, 234, 0.1); }
.contactLink { 
  display: grid;
  grid-template-columns: 36px 1fr auto;
  align-items: center;
  gap: 20px;
  padding: clamp(14px, 1.8vh, 20px) 0;
  font-size: 16px;
  letter-spacing: 0.02em;
  color: var(--cream);
  border-bottom: 1px solid rgba(244, 241, 234, 0.1);
  transition: padding-left .35s cubic-bezier(.7,.05,.3,1), color .25s ease;
  position: relative;
}
.contactLink::before {
  content: attr(data-num);
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 14px;
  color: var(--sea);
  opacity: 0.7;
}
.contactLink::after {
  content: '→';
  color: var(--cream-mute);
  transition: transform .35s cubic-bezier(.7,.05,.3,1), color .25s ease;
  font-size: 14px;
}
.contactLink:hover {
  color: var(--sea);
  padding-left: 12px;
}
.contactLink:hover::after {
  color: var(--sea);
  transform: translateX(8px);
}

.contactSignature {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 300;
  font-size: 1rem;
  color: var(--cream);
  opacity: 0.85;
  margin: 0;
  padding-top: 4px;
}

.contactFoot {
  grid-column: 1 / -1;
  grid-row: 2;
  border-top: 1px solid rgba(244, 241, 234, 0.1);
  padding: 18px clamp(24px, 4vw, 56px);
  background: var(--ink);
}

.contactFootInner {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  font-size: 0.625rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--cream-soft, var(--cream-mute));
  opacity: 0.55;
}

.footLeft { text-align: left; }
.footCenter { text-align: center; }
.footRight { text-align: right; }

@media (max-height: 720px) {
  .contact { min-height: 720px; height: 720px; max-height: 720px; }
}

`;
  
  cssContent = preContact + newFooterCss + postMq;
}

// Ensure responsive overrides for the footer are updated correctly in @media (max-width: 900px) block
// We can actually just put the max-width: 768px block from the user into the file directly, 
// replacing any .contact rules inside the existing 900px block.
const responsiveContactRegex = /\.contact\s*\{[^}]*\}/;
const responsiveContactPhotoRegex = /\.contactPhoto\s*\{[^}]*\}/;
const responsiveContactPhotoAfterRegex = /\.contactPhotoFade\s*\{[^}]*\}/;
const responsiveContactContentRegex = /\.contactContent\s*\{[^}]*\}/;
const responsiveContactFootRegex = /\.contactFoot\s*\{[^}]*\}/;
const responsiveContactLinkRegex = /\.contactLink\s*\{[^}]*\}/;
const contactPhotoAfterRegexOld = /\.contactPhoto::after\s*\{[^}]*\}/;

const mq900Start = cssContent.indexOf('@media (max-width: 900px) {');
if (mq900Start !== -1) {
  let mq900Content = cssContent.slice(mq900Start);
  
  mq900Content = mq900Content.replace(responsiveContactRegex, '');
  mq900Content = mq900Content.replace(responsiveContactPhotoRegex, '');
  mq900Content = mq900Content.replace(responsiveContactPhotoAfterRegex, '');
  mq900Content = mq900Content.replace(responsiveContactContentRegex, '');
  mq900Content = mq900Content.replace(responsiveContactFootRegex, '');
  mq900Content = mq900Content.replace(responsiveContactLinkRegex, '');
  mq900Content = mq900Content.replace(contactPhotoAfterRegexOld, '');
  
  // Clean up multiple newlines that might be left
  mq900Content = mq900Content.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  cssContent = cssContent.slice(0, mq900Start) + mq900Content;
}

// Append the 768px media query at the end
const user768Mq = `
@media (max-width: 768px) {
  .contact {
    height: auto;
    min-height: 100vh;
    grid-template-columns: 1fr;
    grid-template-rows: 50vh auto auto;
    max-height: none;
  }
  .contactPhoto { grid-column: 1; grid-row: 1; }
  .contactContent { grid-column: 1; grid-row: 2; padding: 40px 24px; }
  .contactFoot { grid-row: 3; padding: 24px; }
  .contactFootInner { grid-template-columns: 1fr; gap: 12px; text-align: center; }
  .footLeft, .footRight { text-align: center; }
  .contactPhotoFade {
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(7,12,24,0.4) 60%,
      var(--ink) 100%
    );
    width: 100%;
    top: auto;
    height: 40%;
  }
}
`;

cssContent += user768Mq;

fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log('Successfully applied v5 refactors.');
