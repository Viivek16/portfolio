import React, { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import styles from './WorkSections.module.css';

const statsData = [
  { val: '6+', label: 'Years of Experience' },
  { val: '200+', label: 'Portfolio Managed' },
  { val: '$250M+', label: 'AUM' },
  { val: '25+', label: 'Global Events Hosted' },
  { val: '450+', label: 'KOLs Community Built' },
  { val: '260+', label: 'VC Connections' }
];

const WorkStats = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const getLineVariant = (delay, duration) => ({
    hidden: prefersReducedMotion ? { opacity: 0 } : { clipPath: 'inset(0 100% 0 0)' },
    visible: prefersReducedMotion ? { opacity: 1 } : { 
      clipPath: 'inset(0 0 0 0)',
      transition: { duration, ease: 'easeOut', delay }
    }
  });

  const getVertLineVariant = (delay, duration) => ({
    hidden: prefersReducedMotion ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' },
    visible: prefersReducedMotion ? { opacity: 1 } : { 
      clipPath: 'inset(0 0 0 0)',
      transition: { duration, ease: 'easeOut', delay }
    }
  });

  return (
    <section 
      ref={containerRef}
      className={styles.statsSection}
      aria-label="Impact Statistics"
    >
      <motion.div 
        className={`${styles.eyebrow} ${styles.statsEyebrow}`}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.2 }}
      >
        — THE NUMBERS
      </motion.div>
      
      <div className={styles.statsGrid}>

        <motion.div className={`${styles.horizontalHairline} ${styles.topHairline}`} variants={getLineVariant(0.5, 0.6)} initial="hidden" animate={isInView ? "visible" : "hidden"} />
        <motion.div className={`${styles.horizontalHairline} ${styles.middleHairline}`} variants={getLineVariant(1.3, 0.6)} initial="hidden" animate={isInView ? "visible" : "hidden"} />
        <motion.div className={`${styles.horizontalHairline} ${styles.bottomHairline}`} variants={getLineVariant(2.1, 0.4)} initial="hidden" animate={isInView ? "visible" : "hidden"} />
        
        <motion.div className={`${styles.verticalHairline} ${styles.vertLine1}`} variants={getVertLineVariant(0.7, 1.4)} initial="hidden" animate={isInView ? "visible" : "hidden"} />
        <motion.div className={`${styles.verticalHairline} ${styles.vertLine2}`} variants={getVertLineVariant(0.7, 1.4)} initial="hidden" animate={isInView ? "visible" : "hidden"} />
        <motion.div className={`${styles.verticalHairline} ${styles.vertLine3}`} variants={getVertLineVariant(0.7, 1.4)} initial="hidden" animate={isInView ? "visible" : "hidden"} />
        <motion.div className={`${styles.verticalHairline} ${styles.vertLine4}`} variants={getVertLineVariant(0.7, 1.4)} initial="hidden" animate={isInView ? "visible" : "hidden"} />

        {statsData.map((stat, i) => {
          // Row 1: i < 3, Row 2: i >= 3
          const cellDelay = i < 3 ? 0.95 : 1.65;
          const isHovered = hoveredIndex === i;
          const isOtherHovered = hoveredIndex !== null && hoveredIndex !== i;

          return (
            <motion.div 
              key={i} 
              className={`${styles.statsCell} ${isHovered ? styles.cellHovered : ''} ${isOtherHovered ? styles.cellDimmed : ''}`}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.25, delay: cellDelay, ease: "easeOut" }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(i)}
              onTouchEnd={() => setHoveredIndex(null)}
            >
              <div className={styles.statNumWrapper}>
                <div className={styles.statNum}>
                  {stat.val}
                </div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default WorkStats;
