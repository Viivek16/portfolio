import React from 'react';
import styles from './WorkSections.module.css';

const WorkStats = () => {
  const statsData = [
    {
      num: (
        <>
          6<span className={styles.statAccent}>+</span>
        </>
      ),
      label: 'YEARS IN WEB3',
    },
    {
      num: (
        <>
          200<span className={styles.statAccent}>+</span>
        </>
      ),
      label: 'PROJECTS MANAGED',
    },
    {
      num: (
        <>
          <span className={styles.statAccent}>$</span>250M<span className={styles.statAccent}>+</span>
        </>
      ),
      label: 'IN AUM',
    },
    {
      num: (
        <>
          25<span className={styles.statAccent}>+</span>
        </>
      ),
      label: 'GLOBAL EVENTS HOSTED',
    },
    {
      num: (
        <>
          250<span className={styles.statAccent}>+</span>
        </>
      ),
      label: 'VC CONNECTIONS',
    },
    {
      num: (
        <>
          20<span className={styles.statAccent}>+</span>
        </>
      ),
      label: 'PROJECTS SCALED TO TGE',
    },
  ];

  return (
    <section className={styles.statsSection}>
      <div className={`${styles.eyebrow} ${styles.statsEyebrow}`}>— the numbers</div>
      <div className={styles.statsGrid}>
        {statsData.map((stat, index) => (
          <div key={index} className={styles.statsCell}>
            <div className={styles.statNum}>{stat.num}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkStats;
