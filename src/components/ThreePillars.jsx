import React, { useRef, useEffect, useState } from 'react';
import styles from './ThreePillars.module.css';

const ThreePillars = () => {
  const sectionRef  = useRef(null);
  const gc1Ref      = useRef(null);
  const gc2Ref      = useRef(null);
  const gc3Ref      = useRef(null);
  const block1Ref   = useRef(null);
  const block2Ref   = useRef(null);
  const stripRef    = useRef(null);
  const scrollerRef = useRef(null);

  const [vcImageError, setVcImageError] = useState(false);
  const [mktImageError, setMktImageError] = useState(false);

  // ── Helpers ───────────────────────────────────────────
  function eio(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }
  function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }
  function lerp(a, b, t)    { return a + (b - a) * t; }

  // ── Animate ───────────────────────────────────────────
  function animate(p) {
    const gc1    = gc1Ref.current;
    const gc2    = gc2Ref.current;
    const gc3    = gc3Ref.current;
    const block1 = block1Ref.current;
    const block2 = block2Ref.current;
    const strip  = stripRef.current;

    // Guard — if any card ref is null, animation cannot run
    if (!gc1 || !gc2 || !gc3) {
      console.warn('[S4] One or more card refs are null — check ref attachments in JSX');
      return;
    }

    const e2 = eio(clamp((p - 0.20) / 0.28, 0, 1));
    const e3 = eio(clamp((p - 0.52) / 0.28, 0, 1));

    // Card 1: scales back, lifts as Card 2 arrives
    gc1.style.transform = `scale(${lerp(1.0, 0.93, e2)}) translateY(${lerp(0, -24, e2)}px)`;
    gc1.style.willChange = 'transform';

    // Card 2: slides in from below, then itself gets pushed back
    gc2.style.opacity   = e2 > 0.01 ? '1' : '0';
    gc2.style.transform = `translateY(${lerp(680, 0, e2) + lerp(0, -24, e3)}px) scale(${lerp(1.0, 0.93, e3)})`;
    gc2.style.willChange = 'transform, opacity';

    // Card 3: slides in from below, stays at scale 1
    gc3.style.opacity   = e3 > 0.01 ? '1' : '0';
    gc3.style.transform = `translateY(${lerp(680, 0, e3)}px)`;
    gc3.style.willChange = 'transform, opacity';

    // Opacity blockers
    if (block1) block1.style.opacity = e2 >= 0.85 ? '1' : '0';
    if (block2) block2.style.opacity = e3 >= 0.85 ? '1' : '0';

    // AI tools strip reveal at p >= 0.82
    if (strip) {
      const revealed = p >= 0.82;
      strip.style.opacity       = revealed ? '1' : '0';
      strip.style.transform     = revealed ? 'translateY(0)' : 'translateY(40px)';
      strip.style.pointerEvents = revealed ? 'auto' : 'none';
    }
  }

  // ── Scroll Listener ───────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function handleScroll() {
      // Support window.scrollY, pageYOffset, and scrollTop fallback
      const scrollY = window.scrollY ?? window.pageYOffset ?? document.documentElement.scrollTop ?? 0;

      // offsetTop is recalculated fresh each call — never stale
      const sectionTop    = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const viewHeight    = window.innerHeight;

      // p = 0 when user first reaches section top
      // p = 1 when section bottom aligns with viewport bottom
      const raw = (scrollY - sectionTop) / (sectionHeight - viewHeight);
      const p   = clamp(raw, 0, 1);
      
      window.dispatchEvent(new CustomEvent('work-scroll', { detail: { p } }));

      animate(p);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // fire once on mount to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Drag to scroll horizontal scroller
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      startX = e.pageX - scroller.offsetLeft;
      scrollLeft = scroller.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
    };

    const handleMouseUp = () => {
      isDown = false;
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scroller.offsetLeft;
      const walk = (x - startX) * 1.3;
      scroller.scrollLeft = scrollLeft - walk;
    };

    scroller.addEventListener('mousedown', handleMouseDown);
    scroller.addEventListener('mouseleave', handleMouseLeave);
    scroller.addEventListener('mouseup', handleMouseUp);
    scroller.addEventListener('mousemove', handleMouseMove);

    return () => {
      scroller.removeEventListener('mousedown', handleMouseDown);
      scroller.removeEventListener('mouseleave', handleMouseLeave);
      scroller.removeEventListener('mouseup', handleMouseUp);
      scroller.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const aiTools = [
    {
      name: 'Triply',
      gradient: 'linear-gradient(160deg, #0C2A5A 0%, #0992C2 50%, #0AC4E0 100%)',
      category: 'Travel AI',
      desc: '"Better food picks than Google" — Harjyot S.',
      link: 'https://triply.app'
    },
    {
      name: 'YC Website',
      gradient: 'linear-gradient(160deg, #0B1A4A 0%, #0B2D72 50%, #0992C2 100%)',
      category: 'Brand',
      desc: "Built for Yellow Capital's public presence & investor portal",
      link: '#'
    },
    {
      name: 'YC CRM',
      gradient: 'linear-gradient(160deg, #061428 0%, #0992C2 50%, #06091A 100%)',
      category: 'CRM',
      desc: 'AI-assisted pipeline for the Yellow Capital deal portfolio',
      link: '#'
    },
    {
      name: 'Tradepoint',
      gradient: 'linear-gradient(160deg, #042030 0%, #0AC4E0 50%, #0B2D72 100%)',
      category: 'UX / Dev',
      desc: 'Full UX research to production frontend pipeline',
      link: '#'
    },
    {
      name: 'BingX',
      gradient: 'linear-gradient(160deg, #08112A 0%, #0B2D72 50%, #0AC4E0 100%)',
      category: 'Exchange',
      desc: 'Automated trading assistant for the BingX ecosystem',
      link: '#'
    },
    {
      name: 'Fincal',
      gradient: 'linear-gradient(160deg, #061824 0%, #0992C2 50%, #0B2D72 100%)',
      category: 'Finance',
      desc: 'Portfolio performance & ROI modeling for Web3 investors',
      link: '#'
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="three-pillars"
      style={{
        position: 'relative',
        height: '3400px',
        paddingLeft: 0,
        paddingRight: 0,
      }}
      className={styles.pillarsSection}
      aria-label="Three Pillars of Work"
    >
      <div
        className={styles.s4StickyStage}
        style={{
          position: 'sticky',
          top: '80px',
          height: 'calc(100vh - 80px)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Background Depth Orbs */}
        <div className={`${styles.orb} ${styles.orb1}`} aria-hidden="true" />
        <div className={`${styles.orb} ${styles.orb2}`} aria-hidden="true" />
        <div className={`${styles.orb} ${styles.orb3}`} aria-hidden="true" />
        
        {/* Noise overlay pattern */}
        <svg className={styles.noiseOverlay} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>

        {/* Section heading */}
        <div className={styles.header} style={{ flexShrink: 0, paddingTop: '48px', paddingLeft: '8vw', paddingRight: '8vw' }}>
          <div className={styles.eyebrow}>— THREE PILLARS</div>
          <h2 className={styles.title}>
            The Work<span className={styles.titleAccent}>.</span>
          </h2>
          <p className={styles.subtitle}>
            Six years across Web3, capital markets and growth infrastructure — three domains where I operate with full conviction.
          </p>
        </div>

        {/* Card container */}
        <div
          className={styles.s4CardContainer}
          style={{
            position: 'relative',
            flex: 1,
            margin: '24px 8vw 0',
            minHeight: '680px',
          }}
        >
          {/* Card 1 */}
          <div ref={gc1Ref} className={`${styles.cardBase} ${styles.gc1}`} style={{ position: 'absolute', inset: 0, minHeight: '680px', zIndex: 10 }}>
            <div className={styles.gcContent}>
              <div className={styles.cardGrid}>
                <div className={styles.leftCol}>
                  <div>
                    <div className={styles.cardEyebrow}>01 / Venture Capital</div>
                    <h3 className={styles.cardTitle}>The Deal Maker.</h3>
                    <p className={styles.cardBody}>
                      From evaluating 800+ decks to managing $200M+ AUM across four funds — built from inside the table, not above it. My edge is founder empathy: I've signed term sheets and felt payroll anxiety in equal measure.
                    </p>
                  </div>
                  <div>
                    <div className={styles.pillsRow}>
                      <span className={styles.pill}>NewTribe Capital</span>
                      <span className={styles.pill}>DCF</span>
                      <span className={styles.pill}>Leo Ventures</span>
                      <span className={styles.pill}>Asva</span>
                    </div>
                    <div className={styles.statsRow}>
                      <div className={styles.statItem}>
                        <span className={styles.statNum}>$200M+</span>
                        <span className={styles.statLabel}>AUM Managed</span>
                      </div>
                      <div className={styles.statItem}>
                        <span className={styles.statNum}>450+</span>
                        <span className={styles.statLabel}>KOL Network</span>
                      </div>
                      <div className={styles.statItem}>
                        <span className={styles.statNum}>4</span>
                        <span className={styles.statLabel}>Funds Built</span>
                      </div>
                      <div className={styles.statItem}>
                        <span className={styles.statNum}>250+</span>
                        <span className={styles.statLabel}>Projects</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.rightCol} style={{ minHeight: '680px', height: '100%' }}>
                  {!vcImageError ? (
                    <img 
                      src="/assets/images/work/vc-hero.jpg" 
                      alt="Viivek Mehata at a VC panel" 
                      className={styles.cardImage}
                      style={{ objectFit: 'cover' }}
                      onError={() => setVcImageError(true)}
                    />
                  ) : (
                    <div className={styles.placeholderWrapper}>
                      <div className={styles.crosshatch} />
                      <span className={styles.placeholderLabel}>Venture Capital</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div ref={block1Ref} id="block1" className={styles.gcBlock} style={{ zIndex: 15 }} />

          {/* Card 2 */}
          <div ref={gc2Ref} className={`${styles.cardBase} ${styles.gc2}`} style={{ position: 'absolute', inset: 0, minHeight: '680px', zIndex: 20, opacity: 0 }}>
            <div className={styles.gcContent}>
              <div className={styles.cardGrid}>
                <div className={styles.leftCol}>
                  <div>
                    <div className={styles.cardEyebrow}>02 / Marketing & Growth</div>
                    <h3 className={styles.cardTitle}>The Signal Amplifier.</h3>
                    <p className={styles.cardBody}>
                      GTM architecture that moves markets. From zero-traction to $10M Series A acquisition — distribution is the moat most founders forget to build until it is already too late.
                    </p>
                  </div>
                  <div>
                    <div className={styles.pillsRow}>
                      <span className={styles.pill}>NODO</span>
                      <span className={styles.pill}>Nordek</span>
                      <span className={styles.pill}>Series A Exit</span>
                      <span className={styles.pill}>KOL Strategy</span>
                      <span className={styles.pill}>20+ Events</span>
                    </div>
                    <div className={styles.statsRow}>
                      <div className={styles.statItem}>
                        <span className={styles.statNum}>$10M</span>
                        <span className={styles.statLabel}>Series A (NODO)</span>
                      </div>
                      <div className={styles.statItem}>
                        <span className={styles.statNum}>20+</span>
                        <span className={styles.statLabel}>Global Events</span>
                      </div>
                      <div className={styles.statItem}>
                        <span className={styles.statNum}>14</span>
                        <span className={styles.statLabel}>Cities / 12 Mo.</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.rightCol} style={{ minHeight: '680px', height: '100%' }}>
                  {!mktImageError ? (
                    <img 
                      src="/assets/images/work/marketing-hero.jpg" 
                      alt="Viivek Mehata at a VC panel" 
                      className={styles.cardImage}
                      style={{ objectFit: 'cover' }}
                      onError={() => setMktImageError(true)}
                    />
                  ) : (
                    <div className={styles.placeholderWrapper}>
                      <div className={styles.crosshatch} />
                      <span className={styles.placeholderLabel}>Marketing & Growth</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div ref={block2Ref} id="block2" className={styles.gcBlock} style={{ zIndex: 25 }} />

          {/* Card 3 */}
          <div ref={gc3Ref} className={`${styles.cardBase} ${styles.gc3}`} style={{ position: 'absolute', inset: 0, minHeight: '680px', zIndex: 30, opacity: 0 }}>
            <div className={styles.gcContent}>
              <div className={styles.fullCol}>
                <div className={styles.card3Grid}>
                  <div>
                    <div className={styles.cardEyebrow}>03 / Artificial Intelligence</div>
                    <h3 className={styles.cardTitle}>The Quiet Multiplier.</h3>
                    <p className={styles.cardBody}>
                      Direct, production-grade intelligence built to multiply professional bandwidth. I design and code custom AI integrations that sit quietly behind deal sourcing, portfolio tracking, travel planning, and research operations — converting manual hours into instant, automated flows.
                    </p>
                  </div>
                  <div>
                    <div className={styles.toolSubLabel}>Live Tools</div>
                    <div className={styles.toolChipsGrid}>
                      <div className={styles.toolChip}><span className={styles.toolDot} /> Triply</div>
                      <div className={styles.toolChip}><span className={styles.toolDot} /> YC Website</div>
                      <div className={styles.toolChip}><span className={styles.toolDot} /> YC CRM</div>
                      <div className={styles.toolChip}><span className={styles.toolDot} /> Tradepoint</div>
                      <div className={styles.toolChip}><span className={styles.toolDot} /> BingX</div>
                      <div className={styles.toolChip}><span className={styles.toolDot} /> Fincal</div>
                    </div>
                    <div className={styles.statsRow}>
                      <div className={styles.statItem}>
                        <span className={styles.statNum}>6</span>
                        <span className={styles.statLabel}>Live Tools</span>
                      </div>
                      <div className={styles.statItem}>
                        <span className={styles.statNum}>3</span>
                        <span className={styles.statLabel}>VC Firms</span>
                      </div>
                      <div className={styles.statItem}>
                        <span className={styles.statNum}>∞</span>
                        <span className={styles.statLabel}>Hours Saved</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.bottomFeatureGrid}>
                  <div className={styles.featureBlock}>
                    <span className={styles.featureTitle}>Built For</span>
                    <span className={styles.featureText}>deal flow automation, CRM intelligence, UX research, financial modeling</span>
                  </div>
                  <div className={styles.featureBlock}>
                    <span className={styles.featureTitle}>Stack</span>
                    <span className={styles.featureText}>Claude API · Custom frontends · Supabase · Vercel — all production</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Tools Strip — overlaps Card 3 */}
          <div
            ref={stripRef}
            className={styles.s4StripWrap}
            style={{
              position: 'absolute',
              bottom: '-40px',
              left: 0,
              right: 0,
              zIndex: 50,
              opacity: 0,
              transform: 'translateY(40px)',
              transition: 'opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)',
              pointerEvents: 'none',
            }}
          >
            <div className={styles.stripLabelWrapper}>
              <span className={styles.stripLabel}>AI Tools — Drag to Explore</span>
              <div className={styles.stripLine} />
            </div>
            <div ref={scrollerRef} className={styles.scrollerTrack}>
              {aiTools.map((tool, idx) => (
                <div 
                  key={tool.name} 
                  className={styles.toolCard} 
                  style={{ transitionDelay: `${180 + idx * 90}ms` }}
                >
                  <div className={styles.tcBg} style={{ background: tool.gradient }} />
                  <div className={styles.tcHeader}>
                    <span className={styles.cardCategory}>{tool.category}</span>
                    <span className={styles.liveBadge}>
                      <span className={styles.liveBadgeDot} /> Live
                    </span>
                  </div>
                  <div className={styles.tcAlwaysLabel}>
                    <span className={styles.toolName}>{tool.name}</span>
                    <span className={styles.toolType}>{tool.category}</span>
                  </div>
                  <div className={styles.tcRevealPanel}>
                    <span className={styles.toolName}>{tool.name}</span>
                    <div className={styles.toolType}>{tool.category}</div>
                    <p className={styles.hoverDesc}>{tool.desc}</p>
                    {tool.link !== '#' ? (
                      <a href={tool.link} target="_blank" rel="noopener noreferrer" className={styles.hoverCta}>
                        View Product <span className={styles.hoverArrow}>→</span>
                      </a>
                    ) : (
                      <span className={styles.hoverCta}>
                        View Product <span className={styles.hoverArrow}>→</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ThreePillars;
