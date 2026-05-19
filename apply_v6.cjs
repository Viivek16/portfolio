const fs = require('fs');
const path = require('path');

// ==========================================
// 1. Edit Info.jsx
// ==========================================
const jsxPath = path.join(__dirname, 'src/pages/Info.jsx');
let jsxContent = fs.readFileSync(jsxPath, 'utf8');

// Remove `<span className={styles.friendRoman}>...</span>` globally
jsxContent = jsxContent.replace(/<span className=\{styles\.friendRoman\}>[iv]+\.<\/span>/g, '');

fs.writeFileSync(jsxPath, jsxContent, 'utf8');

// ==========================================
// 2. Edit Info.module.css
// ==========================================
const cssPath = path.join(__dirname, 'src/pages/Info.module.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// A. Testimonial Background and Bleed Pseudo-elements
const friendsSectionTarget = `.friendsSection {
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

const newFriendsSection = `.friendsSection {
  position: relative;
  background: var(--ink);
  padding-top: clamp(140px, 16vh, 220px);
  padding-bottom: clamp(140px, 16vh, 220px);
  display: flex;
  flex-direction: column;
}

.friendsSection::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(to bottom, var(--ink) 0%, transparent 100%);
  pointer-events: none;
  z-index: 1;
}

.friendsSection::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(to top, var(--ink) 0%, transparent 100%);
  pointer-events: none;
  z-index: 1;
}`;

cssContent = cssContent.replace(friendsSectionTarget, newFriendsSection);

// B. Now Section Bleed
const nowSectionTarget = `.nowSection {
  min-height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 100px 8vw 60px;
  position: relative;
}`;
const newNowSection = `.nowSection {
  min-height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 100px 8vw clamp(120px, 14vh, 180px);
  position: relative;
}

.nowSection::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 160px;
  background: linear-gradient(to bottom, transparent 0%, var(--ink) 100%);
  pointer-events: none;
  z-index: 1;
}`;
cssContent = cssContent.replace(nowSectionTarget, newNowSection);

// C. Testimonial Cards
const friendsGridTarget = `.friendsGrid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
  padding: 0;
  /* Subtle vertical dividers between cards */
  border-left: 1px solid rgba(244, 241, 234, 0.1);
}`;
const newFriendsGrid = `.friendsGrid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 0 clamp(20px, 3vw, 48px);
  border-left: none;
}`;
cssContent = cssContent.replace(friendsGridTarget, newFriendsGrid);

// friendCard rules replacement
const friendCardStyles = `.friendCard {
  position: relative;
  padding: 48px clamp(20px, 2vw, 36px) 56px;
  border-right: 1px solid rgba(244, 241, 234, 0.1);
  display: flex;
  flex-direction: column;
  
  /* Stagger entry — set initial state */
  opacity: 0;
  transition: opacity 700ms cubic-bezier(0.22, 0.61, 0.36, 1), transform 500ms cubic-bezier(0.22,0.61,0.36,1), background 400ms ease;
}`;

const newFriendCardStyles = `.friendCard {
  position: relative;
  padding: 28px 24px 32px;
  background: rgba(255, 255, 255, 0.018);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 14px;
  border-right: none;
  display: flex;
  flex-direction: column;
  z-index: 2;
  
  /* Stagger entry — set initial state */
  opacity: 0;
  transform: translateY(24px);
  transition: 
    transform 500ms cubic-bezier(0.22, 0.61, 0.36, 1),
    background 400ms ease,
    border-color 400ms ease,
    opacity 700ms cubic-bezier(0.22, 0.61, 0.36, 1);
}`;
cssContent = cssContent.replace(friendCardStyles, newFriendCardStyles);

const friendCardHoverTarget = `.friendCard:hover {
  transform: translateY(-8px);
  background: rgba(255,255,255,0.02);
}`;
const newFriendCardHover = `.friendCard:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(9, 146, 194, 0.18);
}`;
cssContent = cssContent.replace(friendCardHoverTarget, newFriendCardHover);

const friendPhotoTarget = `.friendPhoto {
  position: relative;
  aspect-ratio: 4 / 5;
  width: 100%;
  overflow: hidden;
  margin-bottom: 28px;
  background: rgba(255, 255, 255, 0.03);
}`;
const newFriendPhoto = `.friendPhoto {
  position: relative;
  aspect-ratio: 4 / 5;
  width: 100%;
  overflow: hidden;
  margin-bottom: 22px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.025);
}`;
cssContent = cssContent.replace(friendPhotoTarget, newFriendPhoto);

// friendRoman is removed from jsx, but we can safely remove or hide its css
const friendRomanTarget = `.friendRoman {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 400;
  font-size: 0.875rem;
  color: var(--sea);
  opacity: 0.75;
  letter-spacing: 0.02em;
}`;
const newFriendRoman = `.friendRoman { display: none; }`;
cssContent = cssContent.replace(friendRomanTarget, newFriendRoman);


// D. Footer Portrait Top & Right Fade
const contactPhotoTarget = `.contactPhoto img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 22%;
  filter: brightness(0.94) contrast(1.04);
}`;
const newContactPhoto = `.contactPhoto::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 22%;
  pointer-events: none;
  z-index: 2;
  background: linear-gradient(
    to bottom,
    var(--ink) 0%,
    rgba(7, 12, 24, 0.4) 55%,
    transparent 100%
  );
}

.contactPhoto img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 30%;
  filter: brightness(0.94) contrast(1.04);
}`;
cssContent = cssContent.replace(contactPhotoTarget, newContactPhoto);

const contactPhotoFadeTarget = `.contactPhotoFade {
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
}`;
const newContactPhotoFade = `.contactPhotoFade {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50%;
  pointer-events: none;
  z-index: 2;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(7, 12, 24, 0.15) 30%,
    rgba(7, 12, 24, 0.55) 65%,
    var(--ink) 100%
  );
}`;
cssContent = cssContent.replace(contactPhotoFadeTarget, newContactPhotoFade);


// E. Responsive Fallbacks for Friends Grid
const mq1399Target = `@media (max-width: 1399px) {
  .friendsGrid { grid-template-columns: repeat(3, 1fr); }
}`;
// We keep 1399px, 1023px, but we need to update 900px or 639px.
const mq1023Target = `@media (max-width: 1023px) {
  .friendsGrid { grid-template-columns: repeat(2, 1fr); }
  .friendCard { padding: 36px 20px 44px; }
}`;
const newMq1023 = `@media (max-width: 1023px) {
  .friendsGrid { grid-template-columns: repeat(2, 1fr); }
}`;
cssContent = cssContent.replace(mq1023Target, newMq1023);

// In the max-width: 900px block, remove the previous friendsGrid overrides
// because the user provided max-width: 639px logic for single column
const mq900FriendsGrid = /  \.friendsGrid \{\s*grid-template-columns: 1fr;\s*\}/;
const mq900FriendCard = /  \.friendCard \{\s*padding: 32px 24px 40px;\s*border-bottom: 1px solid rgba\(244, 241, 234, 0\.1\);\s*border-right: none;\s*\}/;
const mq900FriendCardLast = /  \.friendCard:last-child \{ border-bottom: none; \}/;

cssContent = cssContent.replace(mq900FriendsGrid, '');
cssContent = cssContent.replace(mq900FriendCard, '');
cssContent = cssContent.replace(mq900FriendCardLast, '');

// Append the 639px mq
cssContent += `
@media (max-width: 639px) {
  .friendsGrid { grid-template-columns: 1fr; gap: 16px; }
}
`;

fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log('Successfully applied all CSS & JSX fixes.');
