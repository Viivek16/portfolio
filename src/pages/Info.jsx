import React, { useEffect, useRef } from 'react';
import styles from './Info.module.css';
import { Link } from 'react-router-dom';

const Info = () => {
  const containerRef = useRef(null);
  const horizonTrackRef = useRef(null);
  const horizonCapRef = useRef(null);

  useEffect(() => {
    // ===========================================================
    // HORIZON LINE
    // ===========================================================
    function updateHorizon() {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const scr = window.scrollY;
      const prog = Math.max(0, Math.min(1, scr / docH));

      const trackH = prog * window.innerHeight;
      if (horizonTrackRef.current) horizonTrackRef.current.style.height = trackH + 'px';
      if (horizonCapRef.current) horizonCapRef.current.style.bottom = (trackH - 3) + 'px';

      if (prog > 0.97) {
        document.body.classList.add('horizon-leveled');
      } else {
        document.body.classList.remove('horizon-leveled');
      }
    }

    // ===========================================================
    // RAILS
    // ===========================================================
    const rails = document.querySelectorAll(`.${styles.rail}`);
    function updateRails() {
      rails.forEach(rail => {
        const rect = rail.getBoundingClientRect();
        const total = rail.offsetHeight - window.innerHeight;
        const scrolledIn = -rect.top;
        const prog = Math.max(0, Math.min(1, scrolledIn / total));

        const strip = rail.querySelector(`.${styles.railStrip}`);
        if (!strip) return;

        const stripW = strip.scrollWidth;
        const visibleW = window.innerWidth;
        const maxTranslate = Math.max(0, stripW - visibleW + 80);
        strip.style.transform = `translateX(${-prog * maxTranslate}px)`;

        const cards = strip.querySelectorAll(`.${styles.railCard}:not(.${styles.terminator})`);
        const totalCards = cards.length;
        const currentCard = Math.min(totalCards, Math.max(1, Math.ceil(prog * totalCards)));
        const padCur = String(currentCard).padStart(2, '0');
        const padTot = String(totalCards).padStart(2, '0');

        const countEl = rail.querySelector(`.${styles.railProgressCount}`);
        const barEl = rail.querySelector(`.${styles.railProgressBar}`);
        if (countEl) countEl.textContent = `${padCur} / ${padTot}`;
        if (barEl) {
          let bar = barEl.querySelector('.bar-fill');
          if (!bar) {
            bar = document.createElement('div');
            bar.className = 'bar-fill';
            bar.style.cssText = `position:absolute;inset:0 auto 0 0;background:var(--sea);width:0%;transition:width .15s linear;`;
            barEl.appendChild(bar);
          }
          bar.style.width = (prog * 100) + '%';
        }
      });
    }

    // ===========================================================
    // GOLDEN TAKEOVER
    // ===========================================================
    const marriageSection = document.getElementById('ch-marriage');
    function updateGolden() {
      if (!marriageSection) return;
      const rect = marriageSection.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5;
      document.body.classList.toggle('is-golden', inView);
    }

    // ===========================================================
    // CHAPTER VISIBILITY
    // ===========================================================
    const chapters = document.querySelectorAll(`.${styles.chapter}`);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.2 });
    chapters.forEach(ch => obs.observe(ch));

    // ===========================================================
    // SCROLL HANDLER
    // ===========================================================
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateHorizon();
          updateRails();
          updateGolden();
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { updateRails(); updateHorizon(); });

    // Init
    requestAnimationFrame(() => {
      updateHorizon();
      updateRails();
      updateGolden();
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', () => { updateRails(); updateHorizon(); });
      obs.disconnect();
      document.body.classList.remove('is-golden');
      document.body.classList.remove('horizon-leveled');
    };
  }, []);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      {/* ============ NAV ============ */}
      <nav className={styles.nav}>
        <div className={styles.navMark}>VM<span className="nav-dot-spacer"></span></div>
        <div className={styles.navLinks}>
          <Link to="/">WORK</Link>
          <Link to="/info" className="active">INFO</Link>
          <div className={styles.navMenu} aria-label="Menu"><span></span><span></span></div>
        </div>
      </nav>

      {/* ============ HORIZON LINE ============ */}
      <div className={styles.horizon} aria-hidden="true">
        <div className={styles.horizonTrack} ref={horizonTrackRef}></div>
        <div className={styles.horizonCap} ref={horizonCapRef}></div>
        <div className={styles.horizonMeta}>— still sailing</div>
      </div>

      <main className={styles.main}>
        {/* ============ LANDER ============ */}
        <section className={`${styles.section} ${styles.lander}`} id="lander">
          <div className={`${styles.eyebrow} ${styles.landerEyebrow}`}>An Editorial Timeline · 2018 — Now</div>
          <h1 className={styles.landerQuote}>
            <span>Every</span> <span>chapter</span> <span>taught</span> <span>me</span> <span>something</span>
            <span>the</span> <span>next</span> <span>one</span> <span>would</span>&nbsp;<span className={styles.testWord}>test</span><span>.</span>
          </h1>
          <div className={styles.landerMeta}>
            <span className={styles.landerMetaLine}></span>
            <span>Eleven chapters · Two horizons</span>
            <span className={styles.landerMetaLine}></span>
          </div>
          <div className={styles.landerCue}>Begin</div>
        </section>

        {/* ============ INDEX ============ */}
        <section className={`${styles.section} ${styles.indexSection}`} id="index">
          <div className={`${styles.eyebrow} ${styles.indexEyebrow}`}>
            <span className={styles.indexEyebrowLine}></span>
            <span>Index of chapters</span>
            <span className={styles.indexEyebrowLine}></span>
          </div>
          <div className={styles.indexList}>
            {[
              { id: 'ch-2018', year: '2018', title: 'Yellow Bags — the first lesson', meta: 'Chapter 01' },
              { id: 'ch-2020', year: '2020', title: 'Pandemic. Neurotech 3 → 18.', meta: 'Chapter 02' },
              { id: 'ch-2021', year: '2021', title: 'NewTribe Capital — the other side of the table', meta: 'Chapter 03' },
              { id: 'ch-cities', year: '2022', title: '14 cities in 12 months', meta: 'Chapter 04 · Rail' },
              { id: 'ch-events', year: '2024', title: '20+ events convened', meta: 'Chapter 05 · Rail' },
              { id: 'ch-firms', year: '2024', title: 'Three firms — Asva, Leo, DCF', meta: 'Chapter 06' },
              { id: 'ch-yellow', year: '2025', title: 'Yellow Capital — portfolio manager', meta: 'Chapter 07' },
              { id: 'ch-marriage', year: "Nov '25", title: 'The anchor', meta: 'Chapter 08' },
              { id: 'ch-now', year: 'Now', title: 'Still sailing — VC, market making, AI', meta: 'Chapter 09' }
            ].map((item, i) => (
              <a href={`#${item.id}`} className={styles.indexItem} key={i} onClick={(e) => handleScrollTo(e, `#${item.id}`)}>
                <div className={styles.indexYear}>{item.year}</div>
                <div className={styles.indexTitle}>{item.title}</div>
                <div className={styles.indexMeta}>{item.meta}</div>
              </a>
            ))}
          </div>
        </section>

        {/* ============ 2018 — Yellow Bags ============ */}
        <section className={`${styles.section} ${styles.chapter}`} id="ch-2018" data-chapter="2018">
          <div className={styles.chapterText}>
            <div className={`${styles.eyebrow} ${styles.chapterEyebrow}`}>2018 · The First Lesson</div>
            <h2 className={styles.chapterYear}>2018</h2>
            <h3 className={styles.chapterHeadline}>Yellow Bags<br/>shut down.</h3>
            <p className={styles.chapterBody}>A first venture, a first failure. The lesson wasn't about product — it was about distribution, conviction, and how long you can stay in a room nobody else is in. Everything after was shaped by it.</p>
          </div>
          <div className={styles.chapterMedia}>
            <div className={styles.chapterMediaCompanion}>
              <img src="/images/info/02-2018-yellowbags/img_20180324_204126585.jpg" alt="Pitch at Bombay Cafe" loading="lazy" />
            </div>
            <div className={styles.chapterMediaFrame}>
              <img src="/images/info/02-2018-yellowbags/dsc_5257.jpg" alt="TEDxJNEC stage talk" loading="lazy" />
            </div>
            <div className={styles.chapterCaption}>
              <div className={styles.chapterCaptionLeft}><span className={styles.chapterCaptionNum}>01</span><span>TEDxJNEC · Stage talk</span></div>
              <div>Mumbai · 2018</div>
            </div>
          </div>
        </section>

        {/* ============ 2020 — Pandemic + Neurotech ============ */}
        <section className={`${styles.section} ${styles.chapter} ${styles.reverse}`} id="ch-2020" data-chapter="2020">
          <div className={styles.chapterMedia}>
            <div className={styles.chapterMediaCompanion}>
              <img src="/images/info/03-2020-pandemic/1636785995914.jpg" alt="Lockdown video call" loading="lazy" />
            </div>
            <div className={styles.chapterMediaFrame}>
              <img src="/images/info/03-2020-pandemic/img_20220809_141751.jpg" alt="Working through lockdown" loading="lazy" />
            </div>
            <div className={styles.chapterCaption}>
              <div className={styles.chapterCaptionLeft}><span className={styles.chapterCaptionNum}>02</span><span>Lockdown studio · Building anyway</span></div>
              <div>Home · 2020</div>
            </div>
          </div>
          <div className={styles.chapterText}>
            <div className={`${styles.eyebrow} ${styles.chapterEyebrow}`}>2020 · Held in Place, Then Released</div>
            <h2 className={styles.chapterYear}>2020</h2>
            <h3 className={styles.chapterHeadline}>Pandemic blockade.<br/>Neurotech 3 → 18.</h3>
            <p className={styles.chapterBody}>The world stopped. So I started writing — long-form rants on LinkedIn that nobody asked for and a few people actually read. While everyone froze, we built Neurotech from three to eighteen. Culture compounds faster than headcount when there's nowhere else to go.</p>
          </div>
        </section>

        {/* ============ 2021 — NewTribe Capital ============ */}
        <section className={`${styles.section} ${styles.chapter}`} id="ch-2021" data-chapter="2021">
          <div className={styles.chapterText}>
            <div className={`${styles.eyebrow} ${styles.chapterEyebrow}`}>June 2021 · Crossing Over</div>
            <h2 className={styles.chapterYear}>2021</h2>
            <h3 className={styles.chapterHeadline}>NewTribe Capital.<br/>The other side<br/>of the table.</h3>
            <p className={styles.chapterBody}>After a year of Web3 freelancing — writing thesis after thesis for funds I'd never met — NewTribe gave me the seat. Distribution stopped being someone else's job. It became the product.</p>
          </div>
          <div className={styles.chapterMedia}>
            <div className={styles.chapterMediaCompanion}>
              <img src="/images/info/04-2021-newtribe/img_20230313_151811.jpg" alt="At work" loading="lazy" />
            </div>
            <div className={styles.chapterMediaFrame}>
              <img src="/images/info/04-2021-newtribe/img-20230313-wa0022.jpg" alt="The first real seat at the table" loading="lazy" />
            </div>
            <div className={styles.chapterCaption}>
              <div className={styles.chapterCaptionLeft}><span className={styles.chapterCaptionNum}>03</span><span>The first real seat at the table</span></div>
              <div>Hilton · 2021</div>
            </div>
          </div>
        </section>

        {/* ============ PUNCTUATION 1 ============ */}
        <section className={`${styles.section} ${styles.punctuation}`} id="punc-1">
          <div className={styles.punctuationMark}>"</div>
          <p className={styles.punctuationQuote}>
            You know that's the good thing about being<br/>
            a <span className={styles.seaEm}>wanderer</span> — you get to choose your ending.
          </p>
          <div className={styles.punctuationAttribution}>— A note from the road</div>
        </section>

        {/* ============ 2022 — CITIES RAIL ============ */}
        <section className={`${styles.section} ${styles.rail}`} id="ch-cities" data-chapter="2022-cities">
          <div className={styles.railPin}>
            <div className={styles.railHeader}>
              <div className={styles.railHeaderLeft}>
                <div className={`${styles.eyebrow} ${styles.railEyebrow}`}>2022 · On the Road</div>
                <h2 className={styles.railYear}>2022</h2>
                <h3 className={styles.railHeadline}>14 cities. 12 months.<br/>One thesis tested everywhere.</h3>
              </div>
              <div className={styles.railProgress}>
                <span className={styles.railProgressCount} id="cities-count">01 / 14</span>
                Cities walked
                <div className={styles.railProgressBar} id="cities-bar"></div>
              </div>
            </div>
            <div className={styles.railTrack}>
              <div className={styles.railStrip} id="cities-strip">
                {[
                  { num: '01 / 14', name: 'Jaipur', meta: 'Pink City<br>April', img: '05-2022-cities/jaipur.jpg', size: styles.tall },
                  { num: '02 / 14', name: 'Udaipur', meta: 'Aravalli<br>May', img: '05-2022-cities/udaipur.jpg', size: styles.short },
                  { num: '03 / 14', name: 'Jodhpur', meta: 'Blue<br>June', img: '05-2022-cities/jodhpur.jpg', size: '' },
                  { num: '04 / 14', name: 'Jaisalmer', meta: 'Golden<br>July', img: '05-2022-cities/jaisalmer.jpg', size: styles.tall },
                  { num: '05 / 14', name: 'Pushkar', meta: 'Lake<br>August', img: '05-2022-cities/pushkar.jpg', size: styles.short },
                  { num: '06 / 14', name: 'Varanasi', meta: 'Ghats<br>September', img: '05-2022-cities/varanasi.jpg', size: '' },
                  { num: '07 / 14', name: 'Rishikesh', meta: 'Ganga<br>October', img: '05-2022-cities/rishikesh.jpg', size: styles.tall },
                  { num: '08 / 14', name: 'Delhi', meta: 'Capital<br>October', img: '05-2022-cities/delhi.jpg', size: '' },
                  { num: '09 / 14', name: 'Hyderabad', meta: 'Charminar<br>November', img: '05-2022-cities/hyderabad.jpg', size: styles.short },
                  { num: '10 / 14', name: 'Pune', meta: 'Sahyadri<br>November', img: '05-2022-cities/pune.jpg', size: '' },
                  { num: '11 / 14', name: 'Nashik', meta: 'Vineyard<br>November', img: '05-2022-cities/nashik.jpg', size: styles.tall },
                  { num: '12 / 14', name: 'Ha Long Bay', meta: 'Vietnam<br>December', img: '05-2022-cities/halong-bay.jpg', size: styles.short },
                  { num: '13 / 14', name: 'Ninh Binh', meta: 'Inland sea<br>December', img: '05-2022-cities/ninh-binh.jpg', size: '' },
                  { num: '14 / 14', name: 'Sapa Valley', meta: 'Highlands<br>December', img: '05-2022-cities/sapa-valley.jpg', size: styles.tall },
                ].map((c, i) => (
                  <div className={`${styles.railCard} ${c.size}`} key={i}>
                    <span className={styles.railCardNum}>{c.num}</span>
                    <img src={`/images/info/${c.img}`} alt={c.name} loading="lazy" />
                    <div className={styles.railCardOverlay}>
                      <div className={styles.railCardName}>{c.name}</div>
                      <div className={styles.railCardMeta} dangerouslySetInnerHTML={{ __html: c.meta }} />
                    </div>
                  </div>
                ))}
                <div className={`${styles.railCard} ${styles.terminator}`}>
                  <p className={styles.display}>14 cities.<br/>One <em>thesis</em>.<br/>Tested.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 2024 — EVENTS RAIL ============ */}
        <section className={`${styles.section} ${styles.rail}`} id="ch-events" data-chapter="2024-events">
          <div className={styles.railPin}>
            <div className={styles.railHeader}>
              <div className={styles.railHeaderLeft}>
                <div className={`${styles.eyebrow} ${styles.railEyebrow}`}>September 2024 · Convening</div>
                <h2 className={styles.railYear}>2024</h2>
                <h3 className={styles.railHeadline}>20+ events hosted.<br/>Convening became a form of investing.</h3>
              </div>
              <div className={styles.railProgress}>
                <span className={styles.railProgressCount} id="events-count">01 / 09</span>
                Rooms convened
                <div className={styles.railProgressBar} id="events-bar"></div>
              </div>
            </div>
            <div className={styles.railTrack}>
              <div className={styles.railStrip} id="events-strip">
                {[
                  { num: '01 / 09', name: "Founders' dinner", meta: 'Closed table<br>2024', img: '06-2024-events/01-hero.jpg', size: styles.tall },
                  { num: '02 / 09', name: 'Conference floor', meta: 'Token2049<br>September', img: '06-2024-events/img_20240919_174022718.jpg', size: '' },
                  { num: '03 / 09', name: 'Side event', meta: 'Singapore<br>September', img: '06-2024-events/img_20240919_174732123.jpg', size: styles.short },
                  { num: '04 / 09', name: 'After-hours', meta: 'Marina Bay<br>September', img: '06-2024-events/img_20240919_141551_317.jpg', size: styles.tall },
                  { num: '05 / 09', name: 'Roundtable', meta: 'Dubai<br>May', img: '06-2024-events/img_20240526_035055_660.jpg', size: '' },
                  { num: '06 / 09', name: 'Token launch', meta: 'Closed event<br>April', img: '06-2024-events/img_20240416_120859322.jpg', size: styles.short },
                  { num: '07 / 09', name: 'On stage', meta: 'Keynote<br>2024', img: '06-2024-events/_mg_9587.jpg', size: styles.tall },
                  { num: '08 / 09', name: 'Closed dinner', meta: 'Founders<br>2024', img: '06-2024-events/img_6173.jpg', size: '' },
                  { num: '09 / 09', name: 'Panel', meta: 'Industry<br>2024', img: '06-2024-events/093a8978.jpg', size: styles.short },
                ].map((c, i) => (
                  <div className={`${styles.railCard} ${c.size}`} key={i}>
                    <span className={styles.railCardNum}>{c.num}</span>
                    <img src={`/images/info/${c.img}`} alt={c.name} loading="lazy" />
                    <div className={styles.railCardOverlay}>
                      <div className={styles.railCardName}>{c.name}</div>
                      <div className={styles.railCardMeta} dangerouslySetInnerHTML={{ __html: c.meta }} />
                    </div>
                  </div>
                ))}
                <div className={`${styles.railCard} ${styles.terminator}`}>
                  <p className={styles.display}>Convening<br/>is <em>investing</em>,<br/>earlier.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ PUNCTUATION 2 ============ */}
        <section className={`${styles.section} ${styles.punctuation}`} id="punc-2">
          <div className={styles.punctuationMark}>"</div>
          <p className={styles.punctuationQuote}>
            The whole world runs on <span className={styles.seaEm}>luck</span>.<br/>
            The question is — what do you do with it?
          </p>
          <div className={styles.punctuationAttribution}>— Working notes</div>
        </section>

        {/* ============ 2024 — Three Firms ============ */}
        <section className={`${styles.section} ${styles.chapter}`} id="ch-firms" data-chapter="2024-firms">
          <div className={styles.chapterText}>
            <div className={`${styles.eyebrow} ${styles.chapterEyebrow}`}>December 2024 · The Build-Out</div>
            <h2 className={styles.chapterYear}>2024</h2>
            <h3 className={styles.chapterHeadline}>Three firms.<br/>Asva. Leo.<br/>DCF.</h3>
            <p className={styles.chapterBody}>By the end of the year, three new houses stood: Asva, Leo Ventures, DCF Capital. Different theses, same operator. Building plurals — because no single fund can carry every conviction.</p>
          </div>
          <div className={`${styles.chapterMedia} ${styles.isDocument}`}>
            <div className={styles.chapterMediaFrame}>
              <img src="/images/info/07-2024-threefirms/01-hero.jpg" alt="Leo Ventures launch press release" loading="lazy" />
            </div>
            <div className={styles.chapterCaption}>
              <div className={styles.chapterCaptionLeft}><span className={styles.chapterCaptionNum}>06</span><span>Leo Ventures · Launch press</span></div>
              <div>GlobeNewswire · Nov 2023</div>
            </div>
          </div>
        </section>

        {/* ============ April 2025 — Yellow Capital ============ */}
        <section className={`${styles.section} ${styles.chapter} ${styles.reverse}`} id="ch-yellow" data-chapter="2025-yellow">
          <div className={styles.chapterMedia}>
            <div className={styles.chapterMediaFrame}>
              <img src="/images/info/08-april2025-yellowcapital/img_20251203_113925052.jpg" alt="At Binance Blockchain Week" loading="lazy" />
            </div>
            <div className={styles.chapterCaption}>
              <div className={styles.chapterCaptionLeft}><span className={styles.chapterCaptionNum}>07</span><span>Binance Blockchain Week · Humans of Binance</span></div>
              <div>Dubai · Dec 2025</div>
            </div>
          </div>
          <div className={styles.chapterText}>
            <div className={`${styles.eyebrow} ${styles.chapterEyebrow}`}>April 2025 · The Mandate</div>
            <h2 className={styles.chapterYear}>2025</h2>
            <h3 className={styles.chapterHeadline}>Yellow Capital —<br/>portfolio manager.</h3>
            <p className={styles.chapterBody}>A bigger book, a tighter playbook. Less about discovering new theses, more about earning compounding outcomes from the ones already in motion. The work goes from finding to finishing.</p>
          </div>
        </section>

        {/* ============ Nov 2025 — MARRIAGE ============ */}
        <section className={`${styles.section} ${styles.chapter} ${styles.chapterMarriage}`} id="ch-marriage" data-chapter="2025-marriage" data-golden="true">
          <div className={styles.chapterText}>
            <div className={`${styles.eyebrow} ${styles.chapterEyebrow}`}>November 2025 · The Anchor</div>
            <h2 className={styles.chapterYear}>2025</h2>
            <h3 className={styles.chapterHeadline}>A different<br/>kind of yes.</h3>
            <p className={styles.chapterBody}>Every chapter so far was about choosing what to build. This one is about choosing who to build with. The horizon line stops moving for a moment — not because the journey is done, but because the compass finally has a fixed point.</p>
          </div>
          <div className={styles.chapterMedia}>
            <div className={styles.chapterMediaCompanion}>
              <img src="/images/info/08-nov2025-marriage/0n5a4035.jpg" alt="Wedding ceremony" loading="lazy" />
            </div>
            <div className={styles.chapterMediaFrame}>
              <img src="/images/info/08-nov2025-marriage/01-hero.jpg" alt="Wedding portrait" loading="lazy" />
            </div>
            <div className={styles.chapterCaption}>
              <div className={styles.chapterCaptionLeft}><span className={styles.chapterCaptionNum}>08</span><span>The anchor · A fixed point on the compass</span></div>
              <div>November · 2025</div>
            </div>
          </div>
        </section>

        {/* ============ NOW ============ */}
        <section className={`${styles.section} ${styles.nowSection}`} id="ch-now" data-chapter="now">
          <div className={styles.nowHeader}>
            <div className={`${styles.eyebrow} ${styles.nowEyebrow}`}>Since Then · Open Water</div>
            <h2 className={styles.nowYear}>Now</h2>
            <h3 className={styles.nowHeadline}>Still sailing — across <em>VC,<br/>market making, AI</em>.</h3>
          </div>
          <div className={styles.nowRail}>
            <div className={styles.nowCard}>
              <div className={styles.nowCardNum}>i.</div>
              <div className={styles.nowCardTitle}>Venture<br/>Capital</div>
              <div className={styles.nowCardMeta}>Yellow · Asva · Leo · DCF</div>
            </div>
            <div className={styles.nowCard}>
              <div className={styles.nowCardNum}>ii.</div>
              <div className={styles.nowCardTitle}>Market<br/>Making</div>
              <div className={styles.nowCardMeta}>Liquidity · Distribution</div>
            </div>
            <div className={styles.nowCard}>
              <div className={styles.nowCardNum}>iii.</div>
              <div className={styles.nowCardTitle}>Applied<br/>AI</div>
              <div className={styles.nowCardMeta}>Tools · Workflows · Bets</div>
            </div>
            <div className={styles.nowCard}>
              <div className={styles.nowCardNum}>iv.</div>
              <div className={styles.nowCardTitle}>Writing</div>
              <div className={styles.nowCardMeta}>Publicly · Often · Honestly</div>
            </div>
            <div className={styles.nowCard}>
              <div className={styles.nowCardNum}>v.</div>
              <div className={styles.nowCardTitle}>Whatever<br/>comes next</div>
              <div className={styles.nowCardMeta}>More to add — soon</div>
            </div>
          </div>
          <div className={styles.nowCue}>→ Drag or scroll the rail · More chapters coming</div>
        </section>

        {/* ============ FRIENDS ============ */}
        <section className={`${styles.section} ${styles.friendsSection}`} id="friends">
          <div className={styles.friendsHeader}>
            <div className={`${styles.eyebrow} ${styles.friendsEyebrow}`}>Witnesses</div>
            <h2 className={styles.friendsTitle}>Friends, on the record.</h2>
          </div>
          <div className={styles.friendsGrid}>
            {[1,2,3,4].map((i) => (
              <div className={styles.friendCard} key={i}>
                <div className={styles.friendCardPhoto}></div>
                <div className={styles.friendCardBody}>
                  <div className={styles.friendCardRule}></div>
                  <p className={styles.friendCardQuote}>"Real testimonials, real photos, real names — coming soon."</p>
                  <div className={styles.friendCardCredit}>
                    <div className={styles.friendCardName}>Placeholder</div>
                    <div className={styles.friendCardRole}>To be replaced</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ CONTACT ============ */}
        <footer className={styles.contact} id="contact">
          <div className={styles.contactPhoto}>
            <div className={styles.contactPhotoMeta}>Viivek Mehata · 2025</div>
            <img src="/images/info/03-2020-neurotech/img-20201125-wa0005.jpg" alt="Viivek Mehata" loading="lazy" />
          </div>
          <div className={styles.contactContent}>
            <div className={`${styles.eyebrow} ${styles.contactEyebrow}`}>Stay in touch</div>
            <h2 className={styles.contactTitle}>Find me where the <em>work</em> lives.</h2>
            <p className={styles.contactTagline}>Building across VC, market making, and AI. Always up for a conversation about a thesis worth holding — or a chapter worth starting.</p>
            <div className={styles.contactLinks}>
              <a className={styles.contactLink} data-num="i."   href="https://x.com/mehtaandmore" target="_blank" rel="noopener noreferrer">Twitter / X</a>
              <a className={styles.contactLink} data-num="ii."  href="https://www.linkedin.com/in/viivek-mehata16/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className={styles.contactLink} data-num="iii." href="https://t.me/Viivek16" target="_blank" rel="noopener noreferrer">Telegram</a>
              <a className={styles.contactLink} data-num="iv."  href="mailto:vivekmehta.vm31@gmail.com">Email</a>
            </div>
            <div className={styles.contactFoot}>
              <span>Editorial portfolio</span>
              <span>2018 — Now · Still sailing</span>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default Info;
