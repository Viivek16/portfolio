import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import styles from './WorkSections.module.css';

const StatCell = ({ stat, index, isInView, prefersReducedMotion }) => {
  const [count, setCount] = useState(0);
  const [triggerPulse, setTriggerPulse] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(stat.value);
      setTriggerPulse(true);
      return;
    }
    if (!isInView) return;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const duration = 1200; // 1200ms
    const delay = 200 + index * 80; // Starts 200ms after hairlines, staggered by 80ms

    let frameId;
    let startTime = null;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      if (elapsed < delay) {
        frameId = requestAnimationFrame(animateCount);
        return;
      }

      const progress = Math.min((elapsed - delay) / duration, 1);
      const eased = easeOutCubic(progress);
      setCount(Math.round(eased * stat.value));

      if (progress < 1) {
        frameId = requestAnimationFrame(animateCount);
      } else {
        setTriggerPulse(true);
      }
    };

    frameId = requestAnimationFrame(animateCount);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [stat.value, index, isInView, prefersReducedMotion]);

  const pulseAccent = triggerPulse && isInView && !prefersReducedMotion;

  return (
    <div className={styles.statsCell}>
      {/* Motion 4: Cell border overlay for hover micro-state */}
      <div className={styles.cellBorderOverlay} aria-hidden="true" />
      
      {/* Number and accent animations */}
      <div className={styles.statNumWrapper}>
        <span className={styles.statNum}>
          {stat.prefix && (
            <motion.span
              animate={pulseAccent ? {
                scale: [1.0, 1.08, 1.0],
                opacity: [1.0, 0.6, 1.0],
              } : {}}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className={`${styles.statAccent} ${styles.prefix}`}
            >
              {stat.prefix}
            </motion.span>
          )}
          {count}
          {stat.suffix && <span className={styles.suffix}>{stat.suffix}</span>}
          {stat.hasPlus && (
            <motion.span
              animate={pulseAccent ? {
                scale: [1.0, 1.08, 1.0],
                opacity: [1.0, 0.6, 1.0],
              } : {}}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className={styles.statAccent}
            >
              +
            </motion.span>
          )}
        </span>
      </div>
      <div className={styles.statLabel}>{stat.label}</div>
    </div>
  );
};

const WorkStats = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();

  const statsData = [
    { value: 6, prefix: "", suffix: "", hasPlus: true, label: 'YEARS IN WEB3' },
    { value: 200, prefix: "", suffix: "", hasPlus: true, label: 'PROJECTS MANAGED' },
    { value: 250, prefix: "$", suffix: "M", hasPlus: true, label: 'IN AUM' },
    { value: 25, prefix: "", suffix: "", hasPlus: true, label: 'GLOBAL EVENTS HOSTED' },
    { value: 250, prefix: "", suffix: "", hasPlus: true, label: 'VC CONNECTIONS' },
    { value: 20, prefix: "", suffix: "", hasPlus: true, label: 'PROJECTS SCALED TO TGE' },
  ];

  return (
    <section ref={containerRef} className={styles.statsSection}>
      <div className={`${styles.eyebrow} ${styles.statsEyebrow}`}>— the numbers</div>
      <div className={styles.statsGrid}>
        
        {/* Horizontal Hairlines (Motion 2) */}
        <motion.div
          initial={prefersReducedMotion ? { clipPath: 'inset(0 0 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
          animate={isInView ? { clipPath: 'inset(0 0 0 0)' } : {}}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className={`${styles.horizontalHairline} ${styles.topHairline}`}
          aria-hidden="true"
        />
        <motion.div
          initial={prefersReducedMotion ? { clipPath: 'inset(0 0 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
          animate={isInView ? { clipPath: 'inset(0 0 0 0)' } : {}}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className={`${styles.horizontalHairline} ${styles.middleHairline}`}
          aria-hidden="true"
        />
        <motion.div
          initial={prefersReducedMotion ? { clipPath: 'inset(0 0 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
          animate={isInView ? { clipPath: 'inset(0 0 0 0)' } : {}}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className={`${styles.horizontalHairline} ${styles.bottomHairline}`}
          aria-hidden="true"
        />

        {/* Vertical Hairlines (Motion 2) */}
        <motion.div
          initial={prefersReducedMotion ? { clipPath: 'inset(0 0 0 0)' } : { clipPath: 'inset(0 0 100% 0)' }}
          animate={isInView ? { clipPath: 'inset(0 0 0 0)' } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className={`${styles.verticalHairline} ${styles.vertLine1}`}
          aria-hidden="true"
        />
        <motion.div
          initial={prefersReducedMotion ? { clipPath: 'inset(0 0 0 0)' } : { clipPath: 'inset(0 0 100% 0)' }}
          animate={isInView ? { clipPath: 'inset(0 0 0 0)' } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className={`${styles.verticalHairline} ${styles.vertLine2}`}
          aria-hidden="true"
        />
        <motion.div
          initial={prefersReducedMotion ? { clipPath: 'inset(0 0 0 0)' } : { clipPath: 'inset(0 0 100% 0)' }}
          animate={isInView ? { clipPath: 'inset(0 0 0 0)' } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className={`${styles.verticalHairline} ${styles.vertLine3}`}
          aria-hidden="true"
        />
        <motion.div
          initial={prefersReducedMotion ? { clipPath: 'inset(0 0 0 0)' } : { clipPath: 'inset(0 0 100% 0)' }}
          animate={isInView ? { clipPath: 'inset(0 0 0 0)' } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className={`${styles.verticalHairline} ${styles.vertLine4}`}
          aria-hidden="true"
        />

        {statsData.map((stat, index) => (
          <StatCell
            key={index}
            stat={stat}
            index={index}
            isInView={isInView}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </section>
  );
};

export default WorkStats;
