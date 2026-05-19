const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'info.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Replace CSS
const cssStart =   .friends-grid {;
const cssEnd =   .friend-card.is-placeholder .friend-card-role {\n    opacity: 0.3;\n  };

const cssStartIndex = content.indexOf(cssStart);
const cssEndIndex = content.indexOf(cssEnd) + cssEnd.length;

if (cssStartIndex === -1 || content.indexOf(cssEnd) === -1) {
    console.error('Could not find CSS boundaries');
    process.exit(1);
}

const newCss = \  /* GRID — 5 columns on wide, gracefully degrades */
  .friends-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0;
    padding: 0;
    /* Subtle vertical dividers between cards */
    border-left: 1px solid var(--hairline);
  }

  .friend-card {
    position: relative;
    padding: 48px clamp(20px, 2vw, 36px) 56px;
    border-right: 1px solid var(--hairline);
    
    /* Stagger entry — set initial state */
    opacity: 0;
    transform: translateY(24px);
    transition: 
      opacity 700ms cubic-bezier(0.22, 0.61, 0.36, 1),
      transform 700ms cubic-bezier(0.22, 0.61, 0.36, 1);
  }

  .friend-card.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Stagger delays */
  .friend-card:nth-child(1).is-visible { transition-delay: 0ms; }
  .friend-card:nth-child(2).is-visible { transition-delay: 80ms; }
  .friend-card:nth-child(3).is-visible { transition-delay: 160ms; }
  .friend-card:nth-child(4).is-visible { transition-delay: 240ms; }
  .friend-card:nth-child(5).is-visible { transition-delay: 320ms; }

  /* PHOTO — 4:5 ratio frame */
  .friend-photo {
    position: relative;
    aspect-ratio: 4 / 5;
    width: 100%;
    overflow: hidden;
    margin-bottom: 28px;
    background: rgba(255, 255, 255, 0.03);
  }

  .friend-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 30%;
    filter: brightness(0.95) contrast(1.02) saturate(0.98);
    transition: filter 500ms ease, transform 700ms cubic-bezier(0.22, 0.61, 0.36, 1);
  }

  .friend-card:hover .friend-photo img {
    filter: brightness(1.04) contrast(1.05) saturate(1.05);
    transform: scale(1.025);
  }

  /* BODY */
  .friend-body {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  /* Roman numeral — small editorial mark */
  .friend-roman {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 400;
    font-size: 0.875rem;
    color: var(--accent);
    opacity: 0.75;
    letter-spacing: 0.02em;
  }

  /* QUOTE — cyan quote marks via pseudo-elements */
  .friend-quote {
    position: relative;
    margin: 0;
    padding: 0;
    font-family: var(--font-sans);
    font-size: 0.9375rem;
    line-height: 1.65;
    color: var(--cream);
    opacity: 0.92;
    font-weight: 400;
    letter-spacing: 0.005em;
  }

  .friend-quote::before {
    content: "\\201C";
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 1.6em;
    line-height: 0;
    color: var(--accent);
    margin-right: 4px;
    vertical-align: -0.25em;
  }

  .friend-quote::after {
    content: "\\201D";
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 1.6em;
    line-height: 0;
    color: var(--accent);
    margin-left: 2px;
    vertical-align: -0.25em;
  }

  /* ATTRIBUTION */
  .friend-attrib {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 8px;
    padding-top: 18px;
    border-top: 1px solid var(--hairline);
  }

  .friend-name {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.01em;
    color: var(--cream);
  }

  .friend-role {
    font-family: var(--font-sans);
    font-size: 0.6875rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--cream-soft);
    opacity: 0.7;
  }

  /* RESPONSIVE FALLBACKS */
  @media (max-width: 1399px) {
    .friends-grid { grid-template-columns: repeat(3, 1fr); }
    /* Cards 4 and 5 wrap to row 2, left-aligned (intentional, editorial) */
  }

  @media (max-width: 1023px) {
    .friends-grid { grid-template-columns: repeat(2, 1fr); }
    .friend-card { padding: 36px 20px 44px; }
  }

  @media (max-width: 639px) {
    .friends-grid { grid-template-columns: 1fr; }
    .friend-card { 
      padding: 32px 24px 40px;
      border-bottom: 1px solid var(--hairline);
    }
    .friend-card:last-child { border-bottom: none; }
  }\;

content = content.slice(0, cssStartIndex) + newCss + content.slice(cssEndIndex);


// 2. Replace HTML
const htmlStart = \    <div class="friends-grid">\;
const htmlEnd = \    </div>\n  </section>\n\n  <!-- ============ CONTACT ============ -->\;

const htmlStartIndex = content.indexOf(htmlStart);
const htmlEndIndex = content.indexOf(htmlEnd);

if (htmlStartIndex === -1 || htmlEndIndex === -1) {
    console.error('Could not find HTML boundaries');
    process.exit(1);
}

const newHtml = \    <div class="friends-grid">
      <article class="friend-card">
        <div class="friend-photo">
          <img src="images/friends/juliet-su.jpg" alt="Juliet Su, Managing Partner at NewTribe Capital" loading="lazy">
        </div>
        <div class="friend-body">
          <span class="friend-roman">i.</span>
          <blockquote class="friend-quote">
            Viivek was the only person who stood by during the tough times of the fund and he managed it all single-handedly — the marketing, branding, partnerships, dealflow, execution, event management and whatnot. One of the best ones I've ever worked with.
          </blockquote>
          <div class="friend-attrib">
            <span class="friend-name">Juliet Su</span>
            <span class="friend-role">Managing Partner · NewTribe Capital</span>
          </div>
        </div>
      </article>

      <article class="friend-card">
        <div class="friend-photo">
          <img src="images/friends/karan-aneja.jpg" alt="Karan Aneja, Senior Analyst at Pi42 Ventures" loading="lazy">
        </div>
        <div class="friend-body">
          <span class="friend-roman">ii.</span>
          <blockquote class="friend-quote">
            I still recall the first hand-shake with Viivek at the Palm Residences, Dubai, and today he's the guy I often run into for any sort of advice in my life.
          </blockquote>
          <div class="friend-attrib">
            <span class="friend-name">Karan Aneja</span>
            <span class="friend-role">Senior Analyst · Pi42 Ventures</span>
          </div>
        </div>
      </article>

      <article class="friend-card">
        <div class="friend-photo">
          <img src="images/friends/srushti-shirsat.jpg" alt="Srushti Shirsat, Founder at HRBP" loading="lazy">
        </div>
        <div class="friend-body">
          <span class="friend-roman">iii.</span>
          <blockquote class="friend-quote">
            Viivek has never turned me down, be it for the top-tier Series A company or a pre-seed stage project — he just fits in very well everywhere.
          </blockquote>
          <div class="friend-attrib">
            <span class="friend-name">Srushti Shirsat</span>
            <span class="friend-role">Founder · HRBP</span>
          </div>
        </div>
      </article>

      <article class="friend-card">
        <div class="friend-photo">
          <img src="images/friends/zhanna-manzyk.jpg" alt="Zhanna Manzyk, CEO at Jaya Talent" loading="lazy">
        </div>
        <div class="friend-body">
          <span class="friend-roman">iv.</span>
          <blockquote class="friend-quote">
            A few years ago, I had the pleasure of collaborating with Viivek — and it was genuinely one of those working relationships you don't forget. Highly professional, deeply ethical, and exactly the kind of talent that makes any project better.
          </blockquote>
          <div class="friend-attrib">
            <span class="friend-name">Zhanna Manzyk</span>
            <span class="friend-role">CEO · Jaya Talent</span>
          </div>
        </div>
      </article>

      <article class="friend-card">
        <div class="friend-photo">
          <img src="images/friends/sowmya-raghavan.jpg" alt="Sowmya Raghavan, Ex-CEO of NODO Inc." loading="lazy">
        </div>
        <div class="friend-body">
          <span class="friend-roman">v.</span>
          <blockquote class="friend-quote">
            I've known him for 4 years and he completely turned around our marketing strategies while showing amazing results. On top of it, he was our go-to guy for any sort of VC connects which further led to a successful raise. I've since worked with him on all projects of mine.
          </blockquote>
          <div class="friend-attrib">
            <span class="friend-name">Sowmya Raghavan</span>
            <span class="friend-role">Ex-CEO · NODO Inc.</span>
          </div>
        </div>
      </article>\n\;

content = content.slice(0, htmlStartIndex) + newHtml + content.slice(htmlEndIndex);


// 3. Replace JS
const jsTarget = \  // ===========================================================
  // SCROLL HANDLER (consolidated)
  // ===========================================================\;

const newJs = \  // ===========================================================
  // FRIEND CARDS STAGGER
  // ===========================================================
  const friendCards = document.querySelectorAll('.friend-card');
  const friendObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        friendObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px'
  });
  friendCards.forEach((card) => friendObserver.observe(card));

  // ===========================================================
  // SCROLL HANDLER (consolidated)
  // ===========================================================\;

if (content.indexOf(jsTarget) === -1) {
    console.error('Could not find JS boundary');
    process.exit(1);
}

content = content.replace(jsTarget, newJs);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated info.html');
