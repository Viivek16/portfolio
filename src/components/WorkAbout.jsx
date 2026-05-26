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
  const isFirmStripInView = useInView(firmStripRef, { once: true, amount: 0.7 });
  const prefersReducedMotion = useReducedMotion();

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

  // Prose animation
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
            <div className={styles.stripEyebrow}>— BUILT & OPERATED AT</div>
            
            <div className={styles.firmStrip}>
              <motion.div
                className={styles.firmStripHairline}
                initial={prefersReducedMotion ? { opacity: 0 } : { clipPath: 'inset(0 100% 0 0)' }}
                animate={isFirmStripInView ? (prefersReducedMotion ? { opacity: 1 } : { clipPath: 'inset(0 0 0 0)' }) : {}}
                transition={{ duration: 0.7, delay: 0.8, ease: 'easeOut' }}
                aria-hidden="true"
              />

              {firms.map((firm, index) => (
                <motion.div
                  key={index}
                  className={styles.firmCell}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  animate={isFirmStripInView ? (prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }) : {}}
                  transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
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
        
        {/* Right Column: Cinematic Image */}
        <motion.div 
          className={styles.aboutImageCol}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={isInView ? (prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }) : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <div className={styles.cinematicWrapper}>
            <img src="/work/reel-1.jpg" alt="Cinematic lifestyle 1" className={styles.slideImage} style={{ animationDelay: '0s' }} loading="lazy" />
            <img src="/work/reel-2.jpg" alt="Cinematic lifestyle 2" className={styles.slideImage} style={{ animationDelay: '5s' }} loading="lazy" />
            <img src="/work/reel-3.jpg" alt="Cinematic lifestyle 3" className={styles.slideImage} style={{ animationDelay: '10s' }} loading="lazy" />
            <img src="/work/reel-4.jpg" alt="Cinematic lifestyle 4" className={styles.slideImage} style={{ animationDelay: '15s' }} loading="lazy" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkAbout;
