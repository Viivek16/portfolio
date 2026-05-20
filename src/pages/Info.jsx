import React, { useEffect, useRef } from 'react';
import styles from './Info.module.css';

const EditorialImage = ({ src, alt, className = '' }) => (
  <div className={`${styles.imageMat} ${className}`}>
    <img src={src} alt={alt} loading="lazy" />
  </div>
);

const Info = () => {
  const containerRef = useRef(null);
  const horizonTrackRef = useRef(null);
  const horizonCapRef = useRef(null);
  const nowHorizonPathRef = useRef(null);
  const [horizonD, setHorizonD] = React.useState('');

  useEffect(() => {
    function setPathLength() {
      const svg = document.querySelector(`.${styles.nowHorizonSvg}`);
      if (svg) {
        const rect = svg.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const bendY = height * 0.6;
        
        const d = `M ${width},0 V ${bendY} H 0`;
        setHorizonD(d);
        
        requestAnimationFrame(() => {
          if (!nowHorizonPathRef.current) return;
          const totalLen = nowHorizonPathRef.current.getTotalLength();
          nowHorizonPathRef.current.style.setProperty('--path-len', totalLen);
        });
      }
    }
    setPathLength();
    const timeoutId = setTimeout(setPathLength, 100);
    window.addEventListener('resize', setPathLength);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', setPathLength);
    };
  }, []);

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

      const nowSection = document.getElementById('ch-now');
      if (nowSection) {
        const rect = nowSection.getBoundingClientRect();
        const fadeStart = rect.top;
        
        let opacity = 1;
        if (fadeStart < window.innerHeight) {
          opacity = Math.max(0, fadeStart / (window.innerHeight * 0.5));
        }
        
        const horizon = document.querySelector('.' + styles.horizon);
        if (horizon) horizon.style.opacity = opacity;
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
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    chapters.forEach(ch => obs.observe(ch));

    const nowSectionEl = document.querySelector(`.${styles.nowSection}`);
    let nowObs;
    if (nowSectionEl) {
      nowObs = new IntersectionObserver((entries, observer) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            observer.unobserve(e.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '-100px 0px' });
      nowObs.observe(nowSectionEl);
    }

    // ===========================================================
    // FRIEND CARDS STAGGER
    // ===========================================================
    const friendCards = document.querySelectorAll('.' + styles.friendCard);
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
      if (nowObs) nowObs.disconnect();
      friendObserver.disconnect();
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
            <span>Every</span>{' '}<span>chapter</span>{' '}<span>taught</span>{' '}
            <span>me</span>{' '}<span>something</span>{' '}<span>the</span>{' '}
            <span>next</span>{' '}<span>one</span>{' '}<span>would</span>{' '}
            <span className={styles.testWord}>test</span><span>.</span>
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
              { id: 'ch-cities', year: '2022', title: '14 cities in 12 months', meta: 'Chapter 04' },
              { id: 'ch-events', year: '2024', title: '20+ events convened', meta: 'Chapter 05' },
              { id: 'ch-firms', year: '2024', title: 'Three firms — Asva, Leo, DCF', meta: 'Chapter 06' },
              { id: 'ch-yellow', year: '2025', title: 'Yellow Capital — portfolio manager', meta: 'Chapter 07' },
              { id: 'ch-now', year: 'Now', title: 'Still sailing — VC, market making, AI', meta: 'Chapter 08' }
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
            <h3 className={styles.chapterHeadline}>First startup built and shut down.</h3>
            <p className={styles.chapterBody}>Yellow Bags was a celebrity-wear apparel shopping platform for retail users that shut down due to legal and compliance reasons within the first six months.</p>
          </div>
          <div className={styles.chapterMedia}>
            <div className={styles.chapterMediaCompanion}>
              <EditorialImage src="/images/info/02-2018-yellowbags/img_20180324_204126585.jpg" alt="Pitch at Bombay Cafe" />
            </div>
            <div className={styles.chapterMediaFrame}>
              <EditorialImage src="/images/info/02-2018-yellowbags/dsc_5257.jpg" alt="TEDxJNEC stage talk" />
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
              <EditorialImage src="/images/info/03-2020-pandemic/1636785995914.jpg" alt="Lockdown video call" />
            </div>
            <div className={styles.chapterMediaFrame}>
              <EditorialImage src="/images/info/03-2020-pandemic/img_20220809_141751.jpg" alt="Working through lockdown" />
            </div>
            <div className={styles.chapterCaption}>
              <div className={styles.chapterCaptionLeft}><span className={styles.chapterCaptionNum}>02</span><span>Lockdown studio · Building anyway</span></div>
              <div>Home · 2020</div>
            </div>
          </div>
          <div className={styles.chapterText}>
            <div className={`${styles.eyebrow} ${styles.chapterEyebrow}`}>2020 · Held in Place, Then Released</div>
            <h2 className={styles.chapterYear}>2020</h2>
            <h3 className={styles.chapterHeadline}>Pandemic hit. Built Neurotech Design</h3>
            <p className={styles.chapterBody}>During the pandemic, while everyone froze, I met my co-founder to build wellness-based smart home appliances through Neurotech Design. Further scaled it to 3 to 18 members, completely bootstrapped.</p>
          </div>
        </section>

        {/* ============ 2021 — NewTribe Capital ============ */}
        <section className={`${styles.section} ${styles.chapter}`} id="ch-2021" data-chapter="2021">
          <div className={styles.chapterText}>
            <div className={`${styles.eyebrow} ${styles.chapterEyebrow}`}>June 2021 · Crossing Over</div>
            <h2 className={styles.chapterYear}>2021</h2>
            <h3 className={styles.chapterHeadline}>Joined NewTribe<br/>Capital after months<br/>of freelancing.</h3>
            <p className={styles.chapterBody}>After freelancing for some early-stage projects and relentlessly job searching for 6 months on AngelList, I finally got my first break at NewTribe Capital as the Head of Marketing.</p>
          </div>
          <div className={styles.chapterMedia}>
            <div className={styles.chapterMediaCompanion}>
              <EditorialImage src="/images/info/04-2021-newtribe/img_20230313_151811.jpg" alt="At work" />
            </div>
            <div className={styles.chapterMediaFrame}>
              <EditorialImage src="/images/info/04-2021-newtribe/img-20230313-wa0022.jpg" alt="The first real seat at the table" />
            </div>
            <div className={styles.chapterCaption}>
              <div className={styles.chapterCaptionLeft}><span className={styles.chapterCaptionNum}>03</span><span>The first real seat at the table</span></div>
              <div>Hilton · 2021</div>
            </div>
          </div>
        </section>

        

        {/* ============ 2022 — CITIES RAIL ============ */}
        <section className={`${styles.section} ${styles.rail}`} id="ch-cities" data-chapter="2022-cities">
          <div className={styles.railPin}>
            <div className={styles.railHeader}>
              <div className={styles.railHeaderLeft}>
                <div className={`${styles.eyebrow} ${styles.railEyebrow}`}>2022 · On the Road</div>
                <h2 className={styles.railYear}>2022</h2>
                <h3 className={styles.railHeadline}>Excelled my yearly resolution by<br/>traveling to 14 cities in 12 months.</h3>
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
                  { num: '01 / 14', name: 'Jaipur', meta: 'Pink City<br>April', img: '05-2022-cities/jaipur.jpg' },
                  { num: '02 / 14', name: 'Udaipur', meta: 'Aravalli<br>May', img: '05-2022-cities/udaipur.jpg' },
                  { num: '03 / 14', name: 'Jodhpur', meta: 'Blue<br>June', img: '05-2022-cities/jodhpur.jpg' },
                  { num: '04 / 14', name: 'Jaisalmer', meta: 'Golden<br>July', img: '05-2022-cities/jaisalmer.jpg' },
                  { num: '05 / 14', name: 'Pushkar', meta: 'Lake<br>August', img: '05-2022-cities/pushkar.jpg' },
                  { num: '06 / 14', name: 'Varanasi', meta: 'Ghats<br>September', img: '05-2022-cities/varanasi.jpg' },
                  { num: '07 / 14', name: 'Rishikesh', meta: 'Ganga<br>October', img: '05-2022-cities/rishikesh.jpg' },
                  { num: '08 / 14', name: 'Delhi', meta: 'Capital<br>October', img: '05-2022-cities/delhi.jpg' },
                  { num: '09 / 14', name: 'Hyderabad', meta: 'Charminar<br>November', img: '05-2022-cities/hyderabad.jpg' },
                  { num: '10 / 14', name: 'Pune', meta: 'Sahyadri<br>November', img: '05-2022-cities/pune.jpg' },
                  { num: '11 / 14', name: 'Nashik', meta: 'Vineyard<br>November', img: '05-2022-cities/nashik.jpg' },
                  { num: '12 / 14', name: 'Ha Long Bay', meta: 'Vietnam<br>December', img: '05-2022-cities/halong-bay.jpg' },
                  { num: '13 / 14', name: 'Ninh Binh', meta: 'Inland sea<br>December', img: '05-2022-cities/ninh-binh.jpg' },
                  { num: '14 / 14', name: 'Sapa Valley', meta: 'Highlands<br>December', img: '05-2022-cities/sapa-valley.jpg' },
                ].map((c, i) => (
                  <div className={styles.railCard} key={i}>
                    <span className={styles.railCardNum}>{c.num}</span>
                    <EditorialImage src={`/images/info/${c.img}`} alt={c.name} />
                    <div className={styles.railCardOverlay}>
                      <div className={styles.railCardName}>{c.name}</div>
                      <div className={styles.railCardMeta} dangerouslySetInnerHTML={{ __html: c.meta }} />
                    </div>
                  </div>
                ))}
                <div className={`${styles.railCard} ${styles.terminator}`}>
                  <p className={styles.display}>14 cities sparked my love for travel.</p>
                </div>
              </div>
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

        {/* ============ 2024 — EVENTS RAIL ============ */}
        <section className={`${styles.section} ${styles.rail}`} id="ch-events" data-chapter="2024-events">
          <div className={styles.railPin}>
            <div className={styles.railHeader}>
              <div className={styles.railHeaderLeft}>
                <div className={`${styles.eyebrow} ${styles.railEyebrow}`}>September 2024 · Convening</div>
                <h2 className={styles.railYear}>2024</h2>
                <h3 className={styles.railHeadline}>20+ Global Web3 events hosted.<br/>Strengthening relations and building presence.</h3>
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
                    <EditorialImage src={`/images/info/${c.img}`} alt="Event capture" />
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
            <h3 className={styles.chapterHeadline}>Set up 3 VC firms across India, Singapore and the UAE.</h3>
            <p className={styles.chapterBody}>By late 2024, I had helped set up Asva Ventures in India, Leo Ventures in Singapore, and Digital Consensus Fund (DCF) in the UAE. Each of these funds helped build strong connections with regulators, family offices, lawyers, LPs, and financial controllers.</p>
          </div>
          <div className={`${styles.chapterMedia} ${styles.isDocument}`}>
            <div className={styles.chapterMediaFrame}>
              <EditorialImage src="/images/info/07-2024-threefirms/01-hero.jpg" alt="Leo Ventures launch press release" />
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
              <EditorialImage src="/images/info/08-april2025-yellowcapital/img_20251203_113925052.jpg" alt="At Binance Blockchain Week" />
            </div>
            <div className={styles.chapterCaption}>
              <div className={styles.chapterCaptionLeft}><span className={styles.chapterCaptionNum}>07</span><span>Binance Blockchain Week · Humans of Binance</span></div>
              <div>Dubai · Dec 2025</div>
            </div>
          </div>
          <div className={styles.chapterText}>
            <div className={`${styles.eyebrow} ${styles.chapterEyebrow}`}>April 2025 · The Mandate</div>
            <h2 className={styles.chapterYear}>2025</h2>
            <h3 className={styles.chapterHeadline}>Joined Yellow Capital<br/>as a Portfolio Manager</h3>
            <p className={styles.chapterBody}>After over 5 years of pure VC investing, it was time to switch gears and go deep into market making, treasury building, and to the core of the token economy with Yellow Capital.</p>
          </div>
        </section>

        {/* ============ Nov 2025 — MARRIAGE ============ */}
        <section className={`${styles.section} ${styles.chapter} ${styles.chapterMarriage}`} id="ch-marriage" data-chapter="2025-marriage" data-golden="true">
          <div className={styles.chapterText}>
            <div className={`${styles.eyebrow} ${styles.chapterEyebrow}`}>November 2025 · The Anchor</div>
            <h2 className={styles.chapterYear}>2025</h2>
            <h3 className={styles.chapterHeadline}>A different<br/>kind of yes.</h3>
            <p className={styles.chapterBody}>After years of solo traveling, working with multiple Web3 projects, and a lot of hustle life, it was now time to build a family. Got married to the love of my life.</p>
          </div>
          <div className={styles.chapterMedia}>
            <div className={styles.chapterMediaFrame}>
              <EditorialImage src="/images/info/08-nov2025-marriage/01-hero.jpg" alt="Wedding portrait" />
            </div>
            <div className={styles.chapterCaption}>
              <div className={styles.chapterCaptionLeft}><span className={styles.chapterCaptionNum}>08</span><span>The anchor · A fixed point on the compass</span></div>
              <div>November · 2025</div>
            </div>
          </div>
        </section>

        {/* ============ NOW (Horizon Continues) ============ */}
        <section className={`${styles.section} ${styles.nowSection}`} id="ch-now" data-chapter="now">
          <div className={styles.nowGradientTop}></div>
          <div className={styles.nowGradientBottom}></div>
          
          <div className={styles.nowHorizonWrapper}>
            <svg className={styles.nowHorizonSvg}>
              {horizonD && (
                <path 
                  id="horizon-line"
                  ref={nowHorizonPathRef}
                  d={horizonD} 
                  className={styles.nowHorizonPath} 
                />
              )}
            </svg>
          </div>

          <div className={styles.nowHeroTop}>
            <div className={`${styles.eyebrow} ${styles.nowEyebrow}`}>SINCE THEN · OPEN WATER</div>
            <h2 className={styles.nowWordmark}>Now</h2>
            <div className={styles.nowTagline}>
              <div>Still sailing across</div>
              <div className={styles.nowTaglineEm}>VC, Market Making, AI.</div>
            </div>

            <div className={styles.nowPullQuote}>
              <div className={styles.nowPullQuoteInner}>
                Three currents.<br/>
                One vessel.<br/>
                Still moving.
              </div>
            </div>
          </div>

          <div className={styles.nowPillarsWrapper}>
            <div className={styles.nowPillars}>
              <div className={styles.nowPillar}>
                <div className={styles.nowBuoyGroup}>
                  <svg className={styles.nowBuoySvg} width="40" height="40" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="4.5" className={styles.nowBuoyDot} />
                    <circle cx="20" cy="20" r="7" className={styles.nowBuoyHalo} />
                    <circle cx="20" cy="20" r="4.5" className={styles.nowBuoyPulse}>
                      <animate attributeName="r" values="4.5;22" dur="2.8s" repeatCount="indefinite" begin="5.7s" />
                      <animate attributeName="opacity" values="0.7;0" dur="2.8s" repeatCount="indefinite" begin="5.7s" />
                    </circle>
                  </svg>
                  <div className={styles.nowAnchorDrop}></div>
                </div>
                <div className={styles.nowPillarContent}>
                  <div className={styles.nowPillarNum}>i.</div>
                  <h4 className={styles.nowPillarName}>VC × Marketing</h4>
                  <p className={styles.nowPillarBody}>A marketer at heart, a VC by profession. Still up for all things exciting in the Web3 venture and growth space.</p>
                  <div className={styles.nowPillarTag}>YELLOW · ASVA · LEO · DCF</div>
                </div>
              </div>

              <div className={styles.nowPillar}>
                <div className={styles.nowBuoyGroup}>
                  <svg className={styles.nowBuoySvg} width="40" height="40" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="4.5" className={styles.nowBuoyDot} />
                    <circle cx="20" cy="20" r="7" className={styles.nowBuoyHalo} />
                    <circle cx="20" cy="20" r="4.5" className={styles.nowBuoyPulse}>
                      <animate attributeName="r" values="4.5;22" dur="2.8s" repeatCount="indefinite" begin="5.95s" />
                      <animate attributeName="opacity" values="0.7;0" dur="2.8s" repeatCount="indefinite" begin="5.95s" />
                    </circle>
                  </svg>
                  <div className={styles.nowAnchorDrop}></div>
                </div>
                <div className={styles.nowPillarContent}>
                  <div className={styles.nowPillarNum}>ii.</div>
                  <h4 className={styles.nowPillarName}>Market Making</h4>
                  <p className={styles.nowPillarBody}>A year at Yellow Capital landed it — market making is the need of the hour for every token listing on a CEX.</p>
                  <div className={styles.nowPillarTag}>LIQUIDITY · DISTRIBUTION · CEX LISTINGS</div>
                </div>
              </div>

              <div className={styles.nowPillar}>
                <div className={styles.nowBuoyGroup}>
                  <svg className={styles.nowBuoySvg} width="40" height="40" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="4.5" className={styles.nowBuoyDot} />
                    <circle cx="20" cy="20" r="7" className={styles.nowBuoyHalo} />
                    <circle cx="20" cy="20" r="4.5" className={styles.nowBuoyPulse}>
                      <animate attributeName="r" values="4.5;22" dur="2.8s" repeatCount="indefinite" begin="6.2s" />
                      <animate attributeName="opacity" values="0.7;0" dur="2.8s" repeatCount="indefinite" begin="6.2s" />
                    </circle>
                  </svg>
                  <div className={styles.nowAnchorDrop}></div>
                </div>
                <div className={styles.nowPillarContent}>
                  <div className={styles.nowPillarNum}>iii.</div>
                  <h4 className={styles.nowPillarName}>Applied AI</h4>
                  <p className={styles.nowPillarBody}>Learning the core, building apps and solutions with real users, putting them to work across real-life workflows.</p>
                  <div className={styles.nowPillarTag}>TOOLS · WORKFLOWS · REAL USERS</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FRIENDS ============ */}
        <section className={`${styles.section} ${styles.friendsSection}`} id="friends">
          <div className={styles.friendsHeader}>
            <div className={`${styles.eyebrow} ${styles.friendsEyebrow}`}>Witnesses</div>
            <h2 className={styles.friendsTitle}>Friends, on the record.</h2>
          </div>
          <div className={styles.friendsGrid}>
            <article className={styles.friendCard}>
              <div className={styles.friendPhoto}>
                <img src="/images/friends/juliet-su.jpg" alt="Juliet Su, Managing Partner at NewTribe Capital" loading="lazy" />
              </div>
              <div className={styles.friendBody}>
                
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
                <img src="/images/friends/Sowmya-Raghavan.jpg" alt="Sowmya Raghavan, Ex-CEO of NODO Inc." loading="lazy" />
              </div>
              <div className={styles.friendBody}>
                
                <blockquote className={styles.friendQuote}>
                  I've known him for 4 years and he completely turned around our marketing strategies while showing amazing results. On top of it, he was our go-to guy for any sort of VC connects which further led to a successful raise. I've since worked with him on all projects of mine.
                </blockquote>
                <div className={styles.friendAttrib}>
                  <span className={styles.friendName}>Sowmya Raghavan</span>
                  <span className={styles.friendRole}>Ex-CEO · NODO Inc.</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* ============ CONTACT ============ */}
        <footer className={styles.contact} id="ch-footer">
          <div className={styles.contactPhoto}>
            <div className={styles.contactPhotoFade}></div>
            <img src="/images/info/03-2020-neurotech/img-20201125-wa0005.jpg" alt="Viivek Mehata" loading="lazy" />
          </div>
          <div className={styles.contactContent}>
            <div className={styles.contactContentInner}>
              <div className={`${styles.eyebrow} ${styles.contactEyebrow}`}>Stay in touch</div>
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
        </footer>

      </main>
    </div>
  );
};

export default Info;
