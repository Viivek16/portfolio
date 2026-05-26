import React, { useRef, useEffect } from 'react';
import { motion, useInView, useReducedMotion, animate, stagger } from 'framer-motion';
import SplitType from 'split-type';
import styles from './WorkSections.module.css';

const EditorialImage = ({ src, alt, className = '' }) => (
  <div className={`${styles.imageMat} ${className}`}>
    <img src={src} alt={alt} loading="lazy" />
  </div>
);

const firms = [
  { name: 'Yellow Capital', url: 'https://www.yellowcapital.com', logo: '/firm-logos/yellow-capital.svg' },
  { name: 'NewTribe Capital', url: 'https://www.newtribe.capital', logo: '/firm-logos/newtribe-capital.svg' },
  { name: 'Digital Consensus Fund', url: 'https://digitalconsensus.fund/', logo: '/firm-logos/digital-consensus-fund.svg' },
  { name: 'LEO VENTURES', isTextOnly: true },
  { name: 'Asva Capital', url: 'https://www.asva.capital/', logo: '/firm-logos/asva-capital.svg' },
  { name: 'Digitata Capital', url: 'https://www.digitata.online/', logo: '/firm-logos/digitata-capital.svg' },
];

const WorkAbout = () => {
  const containerRef = useRef(null);
  const proseRef = useRef(null);
  const firmStripRef = useRef(null);
  
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const isFirmStripInView = useInView(firmStripRef, { once: true, amount: 0.7 });
  const prefersReducedMotion = useReducedMotion();

  // Handle SplitType for prose paragraphs
  useEffect(() => {
    if (!proseRef.current || prefersReducedMotion) return;
    
    // Split the text into lines
    const split = new SplitType(proseRef.current.querySelectorAll('p'), { types: 'lines' });
    
    // Initialize styles for JS animation later
    split.lines.forEach(line => {
      line.style.opacity = '0';
      line.style.transform = 'translateY(16px)';
      line.style.willChange = 'opacity, transform';
    });
    
    return () => split.revert();
  }, [prefersReducedMotion]);

  // Handle line-by-line animation for prose
  useEffect(() => {
    if (prefersReducedMotion || !isInView || !proseRef.current) return;
    
    // Start immediately after cyan period drops in (480ms wipe + 120ms drop = 600ms)
    let currentDelay = 0.6; 
    
    const paragraphs = proseRef.current.querySelectorAll('p');
    paragraphs.forEach((p) => {
      const lines = p.querySelectorAll('.line');
      if (lines.length > 0) {
        animate(lines, 
          { opacity: [0, 1], y: [16, 0] },
          { delay: stagger(0.06, { startDelay: currentDelay }), duration: 0.6, ease: "easeOut" }
        );
        // Calculate delay for next paragraph: (lines * 0.06) + 200ms gap
        currentDelay += ((lines.length - 1) * 0.06) + 0.2;
      }
    });
  }, [isInView, prefersReducedMotion]);

  return (
    <section 
      ref={containerRef}
      className={styles.aboutSection}
      aria-label="About my focus"
    >
      <div className={styles.aboutGrid}>
        {/* Left Column: Text */}
        <div className={styles.aboutTextCol}>
          <div className={`${styles.eyebrow} ${styles.aboutEyebrow}`}>— focus</div>
          
          <h2 className={styles.aboutHeadline}>
            <motion.span 
              className={styles.headlineWord}
              initial={prefersReducedMotion ? { clipPath: 'inset(0 0 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
              animate={isInView ? { clipPath: 'inset(0 0 0 0)' } : {}}
              transition={{ duration: 0.48, ease: 'easeOut' }}
            >
              About
            </motion.span>
            <motion.span 
              className={styles.accentDot}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
              animate={isInView ? (prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: [0, 1, 1, 1], y: [-8, 0, -1, 0] }) : {}}
              transition={{ 
                duration: 0.32, 
                delay: 0.60,
                ease: "easeOut",
                times: [0, 0.7, 0.85, 1]
              }}
            >
              .
            </motion.span>
          </h2>
          
          <div className={styles.aboutProse} ref={proseRef}>
            <p>
              Hi, I'm <strong>Viivek Mehata</strong>. I build early-stage technical foundations for startups across Web3, Capital, and Distribution.
            </p>
            <p>
              My work centers on rapid prototyping, robust systems architecture, and finding the shortest path to product-market fit. I focus heavily on scalable frontends, optimized rendering pipelines, and building AI tooling for internal workflows.
            </p>
            <p>
              Currently operating mostly in stealth capacities, helping founders translate zero-to-one ideas into deployed reality.
            </p>
          </div>
        </div>
        
        {/* Right Column: Cinematic Image */}
        <motion.div 
          className={styles.aboutImageCol}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <div className={styles.cinematicWrapper}>
            <EditorialImage 
              src="/images/work-about-cinematic-placeholder.jpg" 
              alt="Cinematic workspace" 
              className={styles.cinematicImage}
            />
            <div className={styles.imageCaption}>
              <span className={styles.captionLeft}>the operator's seat</span>
              <span className={styles.captionRight}>PUNE · 2025</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Firm Strip */}
      <div className={styles.stripContainer} ref={firmStripRef}>
        <div className={styles.stripEyebrow}>— built & operated at</div>
        
        <div className={styles.firmStrip}>
          {/* Top hairline draws on (left -> right) over 700ms, 200ms before logos */}
          <motion.div
            className={styles.firmStripHairline}
            initial={prefersReducedMotion ? { clipPath: 'inset(0 0 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
            animate={isFirmStripInView ? { clipPath: 'inset(0 0 0 0)' } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            aria-hidden="true"
          />

          {firms.map((firm, index) => (
            <motion.div
              key={index}
              className={styles.firmCell}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={isFirmStripInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.06, ease: 'easeOut' }}
            >
              {firm.isTextOnly ? (
                <span className={styles.firmTextOnly}>{firm.name}</span>
              ) : (
                <a
                  href={firm.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${firm.name} — opens in new tab`}
                  className={styles.firmLink}
                >
                  <img src={firm.logo} alt={firm.name} className={styles.firmLogo} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkAbout;
