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
  
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
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

      // 1. Animate current front card off-screen
      cardEls[prev].classList.remove(styles['pos-front']);
      cardEls[prev].classList.add(styles['pos-exiting']);

      setTimeout(() => {
        // 2. Advance the front pointer
        frontIndex = (frontIndex + 1) % TOTAL;

        // 3. Update all card positions
        cardEls.forEach((el, i) => {
          const diff = (i - frontIndex + TOTAL) % TOTAL;
          const posClass = diff === 0 ? styles['pos-front']
                         : diff === 1 ? styles['pos-mid']
                         : diff === 2 ? styles['pos-back']
                         : styles['pos-hidden'];

          if (i === prev) {
            // Snap the exited card to pos-hidden with NO transition
            el.style.transition = 'none';
            el.className = `${styles.photoCard} ${posClass}`;
            void el.offsetWidth; // force reflow
            el.style.transition = '';
          } else {
            el.className = `${styles.photoCard} ${posClass}`;
          }
        });

        busy = false;
      }, 870); // slightly longer than exit animation duration
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
    const split = new SplitType(proseRef.current.querySelectorAll('p'), { types: 'lines' });
    split.lines.forEach(line => {
      line.style.opacity = '0';
      line.style.transform = 'translateY(16px)';
      line.style.willChange = 'opacity, transform';
    });
    return () => split.revert();
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
    <section ref={containerRef} className={styles.aboutSection} aria-label="About the story">
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
            <p>
              I'm <strong>Viivek Mehata</strong> — a venture associate, marketer, and operator, six years deep in Web3.
            </p>
            <p>
              I'm not the traditional VC who's never shipped code or felt payroll anxiety. I founded my first startup in 2018, co-founded another in 2020 that exited, then crossed into Web3 in 2021. That arc — founder, then operator, then investor, now builder — shapes how I read deals: from inside the table, not above it.
            </p>
            <p>
              Three things hold my attention right now. Capital that finds the right founders early. Distribution that compounds beyond the launch. And AI tooling that quietly multiplies the work behind both.
            </p>
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
