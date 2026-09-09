import React, { useRef, useEffect } from 'react';
import { motion, useInView, useReducedMotion, animate, stagger } from 'framer-motion';
import SplitType from 'split-type';
import styles from './WorkSections.module.css';

const firms = [
  { name: 'YELLOW CAPITAL', url: 'https://www.yellowcapital.com' },
  { name: 'NEWTRIBE CAPITAL', url: 'https://www.newtribe.capital' },
  { name: 'DIGITAL CONSENSUS FUND', url: 'https://digitalconsensus.fund/' },
  { name: 'LEO VENTURES', isTextOnly: true },
  { name: 'ASVA CAPITAL', url: 'https://www.asva.capital/' },
  { name: 'DIGITATA CAPITAL', url: 'https://www.digitata.online/' },
];

const WorkAbout = () => {
  const containerRef = useRef(null);
  const proseRef = useRef(null);
  const firmStripRef = useRef(null);
  
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });
  const prefersReducedMotion = useReducedMotion();

  // Photo Stack Logic
  const stackWrapperRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (!stackWrapperRef.current || cardRefs.current.length === 0) return;

    let frontIndex = 0;
    let busy = false;
    const TOTAL = 4;
    const cardEls = cardRefs.current;

    function shuffle() {
      if (busy) return;
      busy = true;

      const prev = frontIndex;

      // 1. Advance the front pointer immediately
      frontIndex = (frontIndex + 1) % TOTAL;

      // 2. Update all card positions simultaneously for a fluid, overlapping Apple-style transition
      cardEls.forEach((el, i) => {
        if (i === prev) {
          // Animate the old front card off-screen
          el.className = `${styles.photoCard} ${styles['pos-exiting']}`;
          
          // After it exits, snap it to the back (hidden) quietly
          setTimeout(() => {
            if (el) {
              el.style.transition = 'none';
              el.className = `${styles.photoCard} ${styles['pos-hidden']}`;
              void el.offsetWidth; // force reflow
              el.style.transition = '';
            }
            busy = false;
          }, 870); // wait for exit animation to finish
        } else {
          // Move remaining cards forward simultaneously
          const diff = (i - frontIndex + TOTAL) % TOTAL;
          const posClass = diff === 0 ? styles['pos-front']
                         : diff === 1 ? styles['pos-mid']
                         : diff === 2 ? styles['pos-back']
                         : styles['pos-hidden'];
          el.className = `${styles.photoCard} ${posClass}`;
        }
      });
    }

    const intervalId = setInterval(shuffle, 4500);

    // Mouse tilt
    const stackWrapper = stackWrapperRef.current;
    
    const handleMouseMove = (e) => {
      const frontEl = cardEls[frontIndex];
      if (!frontEl.classList.contains(styles['pos-front'])) return;
      const rect = stackWrapper.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width - 0.5;
      const my = (e.clientY - rect.top) / rect.height - 0.5;
      // Apply tilt only to the card, NOT the wrapper (wrapper handles float)
      frontEl.style.transform =
        `perspective(900px) rotateY(${mx * 10}deg) rotateX(${my * -8}deg) scale(1.03)`;
      frontEl.style.transition = 'transform 0.1s ease';
    };

    const handleMouseLeave = () => {
      const frontEl = cardEls[frontIndex];
      frontEl.style.transform = '';
      frontEl.style.transition = 'transform 0.6s ease';
    };

    stackWrapper.addEventListener('mousemove', handleMouseMove);
    stackWrapper.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(intervalId);
      stackWrapper.removeEventListener('mousemove', handleMouseMove);
      stackWrapper.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // SplitType for prose
  useEffect(() => {
    if (!proseRef.current || prefersReducedMotion) return;
    
    let split;
    
    const initSplit = () => {
      split = new SplitType(proseRef.current.querySelectorAll('p'), { types: 'lines' });
      split.lines.forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(16px)';
        line.style.willChange = 'opacity, transform';
      });
    };

    if (document.fonts) {
      document.fonts.ready.then(() => {
        if (proseRef.current) initSplit();
      });
    } else {
      initSplit();
    }

    return () => {
      if (split) split.revert();
    };
  }, [prefersReducedMotion]);

  // Prose and Firm Strip animation
  useEffect(() => {
    if (prefersReducedMotion || !isInView || !proseRef.current) return;
    
    let currentDelay = 0.60;
    
    const paragraphs = proseRef.current.querySelectorAll('p');
    paragraphs.forEach((p) => {
      const lines = p.querySelectorAll('.line');
      if (lines.length > 0) {
        animate(lines,
          { opacity: [0, 1], y: [16, 0] },
          { delay: stagger(0.06, { startDelay: currentDelay }), duration: 0.6, ease: "easeOut" }
        );
        currentDelay += ((lines.length - 1) * 0.06) + 0.2;
      }
    });

    // Staggered reveal for "BUILT & OPERATED AT" block
    if (firmStripRef.current) {
      // 1. — BUILT & OPERATED AT sub-heading label
      const stripEyebrowEl = firmStripRef.current.parentElement?.querySelector(`.${styles.stripEyebrow}`);
      if (stripEyebrowEl) {
        animate(stripEyebrowEl,
          { opacity: [0, 1], y: [16, 0] },
          { delay: currentDelay, duration: 0.6, ease: "easeOut" }
        );
      }

      // Hairline (starts in sync with the eyebrow)
      const hairlineEl = firmStripRef.current.querySelector(`.${styles.firmStripHairline}`);
      if (hairlineEl) {
        animate(hairlineEl,
          { clipPath: ['inset(0 100% 0 0)', 'inset(0 0 0 0)'] },
          { delay: currentDelay, duration: 0.7, ease: 'easeOut' }
        );
      }

      currentDelay += 0.2; // Stagger rhythm (0.2s)

      // 2. First row of firm names (cells 0, 1, 2)
      const cells = firmStripRef.current.querySelectorAll(`.${styles.firmCell}`);
      if (cells && cells.length > 0) {
        const row1 = Array.from(cells).slice(0, 3);
        animate(row1,
          { opacity: [0, 1], y: [16, 0] },
          { delay: currentDelay, duration: 0.6, ease: "easeOut" }
        );

        currentDelay += 0.2; // Stagger rhythm (0.2s)

        // 3. Second row of firm names (cells 3, 4, 5)
        const row2 = Array.from(cells).slice(3, 6);
        animate(row2,
          { opacity: [0, 1], y: [16, 0] },
          { delay: currentDelay, duration: 0.6, ease: "easeOut" }
        );
      }
    }
  }, [isInView, prefersReducedMotion]);

  return (
    <section ref={containerRef} className={`${styles.aboutSection} mt-[8vh]`} aria-label="About the story">
      <div className={styles.aboutGrid}>
        {/* Left Column: Text */}
        <div className={styles.aboutTextCol}>
          <div className={`${styles.eyebrow} ${styles.aboutEyebrow}`}>— THE STORY</div>
          
          <h2 className={styles.aboutHeadline}>
            <motion.span 
              className={styles.headlineWord}
              initial={prefersReducedMotion ? { opacity: 0 } : { clipPath: 'inset(0 100% 0 0)' }}
              animate={isInView ? (prefersReducedMotion ? { opacity: 1 } : { clipPath: 'inset(0 0 0 0)' }) : {}}
              transition={{ duration: 0.48, ease: 'easeOut' }}
            >
              About
            </motion.span>
            <motion.span 
              className={styles.accentDot}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              animate={isInView ? (prefersReducedMotion ? { opacity: 1 } : { opacity: [0, 1, 1, 1], y: [-8, 0, -1, 0] }) : {}}
              transition={{ duration: 0.32, delay: 0.60, ease: 'easeOut', times: [0, 0.7, 0.85, 1] }}
            >
              .
            </motion.span>
          </h2>
          
          <div className={styles.aboutProse} ref={proseRef}>
            <p>I'm <strong>Viivek Mehata</strong>, a GTM and growth operator with six years spent taking Web3 products from launch to real traction.</p>
            <p>I build from the inside, not from above. I scaled a bootstrapped team from 3 to 18 people and brought in over $60K in B2B revenue before we launched. Since then I've led go-to-market for more than 20 products, owning the launch, the distribution, and the growth that comes after.</p>
            <p>What I stand for is simple. Growth that holds after the launch, distribution that keeps working, and AI tools I build myself so a small team can move like a big one.</p>
          </div>

          {/* Firm Strip */}
          <div className={styles.stripContainer} ref={firmStripRef}>
            <motion.div 
              className={styles.stripEyebrow}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            >
              — BUILT & OPERATED AT
            </motion.div>
            
            <div className={styles.firmStrip}>
              <div
                className={styles.firmStripHairline}
                style={prefersReducedMotion ? {} : { clipPath: 'inset(0 100% 0 0)' }}
                aria-hidden="true"
              />

              {firms.map((firm, index) => (
                <motion.div
                  key={index}
                  className={styles.firmCell}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                >
                  {firm.isTextOnly ? (
                    <span className={styles.firmTextOnly}>
                      <span className={styles.firmText}>{firm.name}</span>
                    </span>
                  ) : (
                    <a
                      href={firm.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${firm.name} — opens in new tab`}
                      className={styles.firmLink}
                    >
                      <span className={styles.firmText}>{firm.name}</span>
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column: 4-Card Photo Stack */}
        <motion.div 
          className={styles.aboutImageCol}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={isInView ? (prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }) : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <div className={styles.stackWrapper} ref={stackWrapperRef}>
            <div 
              className={`${styles.photoCard} ${styles['pos-front']}`} 
              ref={el => { cardRefs.current[0] = el; }}
              style={{ 
                backgroundImage: 'url(/images/about/093A8978.png)' // TODO: confirm exact filenames with Viivek
              }}
            >
              <div className={styles.cardShimmer}></div>
            </div>

            <div 
              className={`${styles.photoCard} ${styles['pos-mid']}`} 
              ref={el => { cardRefs.current[1] = el; }}
              style={{ 
                backgroundImage: 'url(/images/about/IMG-20260517-WA0070.jpg)' // TODO: confirm exact filenames with Viivek
              }}
            >
              <div className={styles.cardShimmer}></div>
            </div>

            <div 
              className={`${styles.photoCard} ${styles['pos-back']}`} 
              ref={el => { cardRefs.current[2] = el; }}
              style={{ 
                backgroundImage: 'url(/images/about/IMG_20240919_174732123.jpg)' // TODO: confirm exact filenames with Viivek
              }}
            >
              <div className={styles.cardShimmer}></div>
            </div>

            <div 
              className={`${styles.photoCard} ${styles['pos-hidden']}`} 
              ref={el => { cardRefs.current[3] = el; }}
              style={{ 
                backgroundImage: 'url(/images/about/_MG_9587.JPG)' // TODO: confirm exact filenames with Viivek
              }}
            >
              <div className={styles.cardShimmer}></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkAbout;
