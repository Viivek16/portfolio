import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import styles from './WorkSections.module.css';

const statsData = [
  { val: '6+', label: 'Years in Web3' },
  { val: '200+', label: 'Deals Evaluated' },
  { val: '$250M+', label: 'Fund Size Supported', accent: '$', num: '250', suffix: 'M+' },
  { val: '25+', label: 'Ecosystem Partners' },
  { val: '250+', label: 'Global KOLs' },
  { val: '20+', label: 'Events Hosted' }
];

const WorkStats = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();

  const lineVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { clipPath: 'inset(0 100% 0 0)' },
    visible: prefersReducedMotion ? { opacity: 1 } : { 
      clipPath: 'inset(0 0 0 0)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };
  const vertLineVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' },
    visible: prefersReducedMotion ? { opacity: 1 } : { 
      clipPath: 'inset(0 0 0 0)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }
    }
  };

  return (
    <section 
      ref={containerRef}
      className={styles.statsSection}
      aria-label="Impact Statistics"
    >
      <div className={`${styles.eyebrow} ${styles.statsEyebrow}`}>— impact</div>
      
      <div className={styles.statsGrid}>
        <motion.div className={`${styles.horizontalHairline} ${styles.topHairline}`} variants={lineVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} />
        <motion.div className={`${styles.horizontalHairline} ${styles.middleHairline}`} variants={lineVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} />
        <motion.div className={`${styles.horizontalHairline} ${styles.bottomHairline}`} variants={lineVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} />
        
        <motion.div className={`${styles.verticalHairline} ${styles.vertLine1}`} variants={vertLineVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} />
        <motion.div className={`${styles.verticalHairline} ${styles.vertLine2}`} variants={vertLineVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} />
        <motion.div className={`${styles.verticalHairline} ${styles.vertLine3}`} variants={vertLineVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} />
        <motion.div className={`${styles.verticalHairline} ${styles.vertLine4}`} variants={vertLineVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} />

        {statsData.map((stat, i) => {
          let content;
          if (stat.accent) {
            content = <><span className={styles.statAccent}>{stat.accent}</span>{stat.num}{stat.suffix}</>;
          } else {
            const numPart = stat.val.match(/\d+/)[0];
            const suffix = stat.val.replace(/\d+/, '');
            content = <>{numPart}<span className={styles.statAccent}>{suffix}</span></>;
          }

          return (
            <motion.div 
              key={i} 
              className={styles.statsCell}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={isInView ? (prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }) : {}}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.cellBorderOverlay} />
              <div className={styles.statNumWrapper}>
                <div className={styles.statNum}>
                  {content}
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
