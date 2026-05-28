import React, { useRef, useEffect, useState } from 'react';
import styles from './ThreePillars.module.css';

const clamp = (val) => Math.min(Math.max(val, 0), 1);
const lerp = (start, end, t) => start + (end - start) * t;
const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

const ThreePillars = () => {
  const containerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const stripRef = useRef(null);
  const scrollerRef = useRef(null);

  const [vcImageError, setVcImageError] = useState(false);
  const [mktImageError, setMktImageError] = useState(false);

  // Stacking Zone scroll handler
  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const scrollHeight = containerRef.current.scrollHeight;
    const clientHeight = containerRef.current.clientHeight;
    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll <= 0) return;

    const p = scrollTop / maxScroll;

    // Dispatch custom event for sailing bar
    window.dispatchEvent(new CustomEvent('work-scroll', { detail: { p } }));

    // Calculate stacking animations driven by scroll p
    const e2 = easeInOutQuad(clamp((p - 0.28) / 0.32));
    const e3 = easeInOutQuad(clamp((p - 0.58) / 0.32));

    // Card 1 properties: scale 1 -> 0.94, translateY 0 -> -18px, filter brightness 1 -> 0.62
    if (card1Ref.current) {
      const scaleVal = lerp(1, 0.94, e2);
      const tyVal = lerp(0, -18, e2);
      const brightnessVal = lerp(1, 0.62, e2);
      card1Ref.current.style.transform = `scale(${scaleVal}) translateY(${tyVal}px)`;
      card1Ref.current.style.filter = `brightness(${brightnessVal})`;
    }

    // Card 2 properties: opacity, scale 1 -> 0.94, translateY 380px -> 0, filter brightness 1 -> 0.62
    if (card2Ref.current) {
      const opVal = e2 > 0.01 ? 1 : 0;
      const scaleVal = lerp(1, 0.94, e3);
      const tyVal = lerp(380, 0, e2);
      const brightnessVal = lerp(1, 0.62, e3);
      card2Ref.current.style.opacity = opVal;
      card2Ref.current.style.transform = `translateY(${tyVal}px) scale(${scaleVal})`;
      card2Ref.current.style.filter = `brightness(${brightnessVal})`;
      card2Ref.current.style.pointerEvents = opVal > 0 ? 'auto' : 'none';
    }

    // Card 3 properties: opacity, translateY 380px -> 0
    if (card3Ref.current) {
      const opVal = e3 > 0.01 ? 1 : 0;
      const tyVal = lerp(380, 0, e3);
      card3Ref.current.style.opacity = opVal;
      card3Ref.current.style.transform = `translateY(${tyVal}px)`;
      card3Ref.current.style.pointerEvents = opVal > 0 ? 'auto' : 'none';
    }

    // Reveal AI Tools strip
    if (p >= 0.88) {
      stripRef.current?.classList.add(styles.revealed);
    } else {
      stripRef.current?.classList.remove(styles.revealed);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
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
      const walk = (x - startX) * 1.5; // Drag sensitivity multiplier
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
      desc: 'AI-assisted pipeline tracking for the Yellow Capital portfolio',
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
    <section className={styles.pillarsSection} aria-label="Three Pillars of Work">
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

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.eyebrow}>— THREE PILLARS</div>
        <h2 className={styles.title}>
          The Work<span className={styles.titleAccent}>.</span>
        </h2>
        <p className={styles.subtitle}>
          Six years across Web3, capital markets and growth infrastructure — three domains where I operate with full conviction.
        </p>
      </div>

      {/* Stacking Zone */}
      <div ref={containerRef} className={styles.scrollContainer}>
        <div className={styles.scrollInner}>
          <div className={styles.stickyStage}>
            
            {/* CARD 1: Venture Capital */}
            <div ref={card1Ref} className={styles.cardBase} style={{ zIndex: 1 }}>
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
                
                <div className={styles.rightCol}>
                  {!vcImageError ? (
                    <img 
                      src="/assets/images/work/vc-hero.jpg" 
                      alt="Viivek at a VC panel" 
                      className={styles.cardImage}
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

            {/* CARD 2: Marketing & Growth */}
            <div ref={card2Ref} className={styles.cardBase} style={{ zIndex: 2, opacity: 0, transform: 'translateY(380px)' }}>
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
                
                <div className={styles.rightCol}>
                  {!mktImageError ? (
                    <img 
                      src="/assets/images/work/marketing-hero.jpg" 
                      alt="GTM and marketing timeline overview" 
                      className={styles.cardImage}
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

            {/* CARD 3: AI (Quiet Multiplier) */}
            <div ref={card3Ref} className={styles.cardBase} style={{ zIndex: 3, opacity: 0, transform: 'translateY(380px)' }}>
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
                      <div className={styles.toolChip}>
                        <span className={styles.toolDot} /> Triply
                      </div>
                      <div className={styles.toolChip}>
                        <span className={styles.toolDot} /> YC Website
                      </div>
                      <div className={styles.toolChip}>
                        <span className={styles.toolDot} /> YC CRM
                      </div>
                      <div className={styles.toolChip}>
                        <span className={styles.toolDot} /> Tradepoint
                      </div>
                      <div className={styles.toolChip}>
                        <span className={styles.toolDot} /> BingX
                      </div>
                      <div className={styles.toolChip}>
                        <span className={styles.toolDot} /> Fincal
                      </div>
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
        </div>
      </div>

      {/* Visual Connector Line to strip */}
      <div className={styles.visualConnector} aria-hidden="true" />

      {/* AI Tools Strip */}
      <div ref={stripRef} className={styles.stripSection}>
        <div className={styles.stripLabelWrapper}>
          <span className={styles.stripLabel}>AI Tools — Drag to Explore</span>
          <div className={styles.stripLine} />
        </div>
        
        {/* scroller list */}
        <div ref={scrollerRef} className={styles.scrollerTrack}>
          {aiTools.map((tool, idx) => (
            <div 
              key={tool.name} 
              className={styles.toolCard} 
              style={{ transitionDelay: `${180 + idx * 90}ms` }}
            >
              {/* Full bleed gradient background */}
              <div 
                className={styles.cardGradient} 
                style={{ background: tool.gradient }} 
              />
              
              {/* Top row elements */}
              <div className={styles.cardTopRow}>
                <span className={styles.cardCategory}>{tool.category}</span>
                <span className={styles.liveBadge}>
                  <span className={styles.liveBadgeDot} /> Live
                </span>
              </div>
              
              {/* Static bottom layout */}
              <div className={styles.staticBottomLayer}>
                <span className={styles.staticName}>{tool.name}</span>
                <span className={styles.staticType}>{tool.category}</span>
              </div>
              
              {/* Hover Panel */}
              <div className={styles.hoverPanel}>
                <div>
                  <span className={styles.hoverName}>{tool.name}</span>
                  <div className={styles.hoverType}>{tool.category}</div>
                  <p className={styles.hoverDesc}>{tool.desc}</p>
                </div>
                {tool.link !== '#' ? (
                  <a 
                    href={tool.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.hoverCta}
                  >
                    View Product →
                  </a>
                ) : (
                  <span className={styles.hoverCta}>View Product →</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreePillars;
