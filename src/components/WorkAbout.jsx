import React from 'react';
import styles from './WorkSections.module.css';

const WorkAbout = () => {
  const firms = [
    { name: 'YELLOW CAPITAL', isSpecial: false },
    { name: 'NEWTRIBE', isSpecial: false },
    { name: 'LEO VENTURES', isSpecial: false },
    { name: 'ASVA VENTURES', isSpecial: false },
    { name: 'DCF', isSpecial: false },
    { name: 'digitata', isSpecial: true },
  ];

  return (
    <>
      <div className={styles.aboutDivider} aria-hidden="true" />
      <section className={styles.aboutSection}>
        <div className={`${styles.eyebrow} ${styles.aboutEyebrow}`}>— the story</div>
        <h2 className={styles.aboutHeadline}>
          About<span className={styles.accentDot}>.</span>
        </h2>
        
        <div className={styles.aboutProse}>
          <p>
            I'm <strong>Viivek Mehata</strong> — a venture associate, marketer, and operator, six years deep in <em className={styles.accentEm}>Web3</em>.
          </p>
          <p>
            I'm not the traditional VC who's never shipped code or felt payroll anxiety. I founded my first startup in 2018, co-founded another in 2020 that exited, then crossed into Web3 in 2021. That arc — founder, then operator, then investor, now builder — shapes how I read deals: from inside the table, not above it.
          </p>
          <p>
            Three things hold my attention right now. <em className={styles.accentEm}>Capital</em> that finds the right founders early. <em className={styles.accentEm}>Distribution</em> that compounds beyond the launch. And <em className={styles.accentEm}>AI tooling</em> that quietly multiplies the work behind both.
          </p>
        </div>

        <div className={styles.stripContainer}>
          <div className={styles.stripEyebrow}>— built & operated at</div>
          <div className={styles.firmStrip}>
            {firms.map((firm, index) => (
              <div
                key={index}
                className={`${styles.firmEntry} ${firm.isSpecial ? styles.firmSpecial : ''}`}
              >
                {firm.name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkAbout;
