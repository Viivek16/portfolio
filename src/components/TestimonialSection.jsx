import React, { useEffect } from 'react';
import styles from '../pages/Story.module.css';

const TestimonialSection = () => {
  useEffect(() => {
    // Stagger animation observer
    const friendCards = document.querySelectorAll(`.home-testimonial .${styles.friendCard}`);
    const friendObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          friendObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px'
    });
    friendCards.forEach((card) => friendObserver.observe(card));

    return () => {
      friendObserver.disconnect();
    };
  }, []);

  return (
    <div className={styles.container} style={{ minHeight: 'auto', backgroundColor: '#0B1120', width: '100%', paddingBottom: '80px' }}>
      <section className={`${styles.section} ${styles.friendsSection} home-testimonial`} id="testimonials">
        <div className={styles.friendsHeader}>
          <div className={`${styles.eyebrow} ${styles.friendsEyebrow}`}>Witnesses</div>
          <h2 className={styles.friendsTitle}>Friends, on the record.</h2>
        </div>
        <div className={styles.friendsGrid}>
          
          <a 
            href="https://www.linkedin.com/in/julietsu888/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.friendCard}
            style={{ textDecoration: 'none' }}
          >
            <div className={styles.friendPhoto}>
              <img src="/images/friends/juliet-su.jpg" alt="Juliet Su, Managing Partner at NewTribe Capital" loading="lazy" />
            </div>
            <div className={styles.friendBody}>
              <blockquote className={styles.friendQuote}>
                Viivek was the only person who stood by during the tough times of the fund and he managed it all single-handedly — the marketing, branding, partnerships, dealflow, execution, event management and whatnot. One of the best ones I've ever worked with.
              </blockquote>
              <div className={styles.friendAttrib}>
                <span className={styles.friendName}>Juliet Su</span>
                <span className={styles.friendRole}>Managing Partner · NewTribe Capital</span>
              </div>
            </div>
          </a>

          <a 
            href="https://www.linkedin.com/in/karan-aneja/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.friendCard}
            style={{ textDecoration: 'none' }}
          >
            <div className={styles.friendPhoto}>
              <img src="/images/friends/Karan-aneja.jpg" alt="Karan Aneja, Senior Analyst at 3One4 Capital" loading="lazy" />
            </div>
            <div className={styles.friendBody}>
              <blockquote className={styles.friendQuote}>
                I still recall the first hand-shake with Viivek at the Palm Residences, Dubai, and today he's the guy I often run into for any sort of advice in my life.
              </blockquote>
              <div className={styles.friendAttrib}>
                <span className={styles.friendName}>Karan Aneja</span>
                <span className={styles.friendRole}>Senior Analyst · 3One4 Capital</span>
              </div>
            </div>
          </a>

          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.friendCard}
            style={{ textDecoration: 'none' }}
          >
            <div className={styles.friendPhoto}>
              <img src="/images/friends/diego-martin.jpg" alt="Diego Martin, CEO at Yellow Group" loading="lazy" />
            </div>
            <div className={styles.friendBody}>
              <blockquote className={styles.friendQuote}>
                Viivek managed our dealflow, partner relationships, referral program, and marketing - all single handedly while showing consistent results. We almost had no social presence earlier, which he later got us flashing everywhere
              </blockquote>
              <div className={styles.friendAttrib}>
                <span className={styles.friendName}>Diego Martin</span>
                <span className={styles.friendRole}>CEO · Yellow Group</span>
              </div>
            </div>
          </a>

          <a 
            href="https://www.linkedin.com/in/blockchain-startup--recruitment/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.friendCard}
            style={{ textDecoration: 'none' }}
          >
            <div className={styles.friendPhoto}>
              <img src="/images/friends/zhanna-manzyk.jpg" alt="Zhanna Manzyk, CEO at Jaya Talent" loading="lazy" />
            </div>
            <div className={styles.friendBody}>
              <blockquote className={styles.friendQuote}>
                A few years ago, I had the pleasure of collaborating with Viivek — and it was genuinely one of those working relationships you don't forget. Highly professional, deeply ethical, and exactly the kind of talent that makes any project better.
              </blockquote>
              <div className={styles.friendAttrib}>
                <span className={styles.friendName}>Zhanna Manzyk</span>
                <span className={styles.friendRole}>CEO · Jaya Talent</span>
              </div>
            </div>
          </a>

          <a 
            href="https://www.linkedin.com/in/sowmya-raghavan/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.friendCard}
            style={{ textDecoration: 'none' }}
          >
            <div className={styles.friendPhoto}>
              <img src="/images/friends/Sowmya-Raghavan.jpg" alt="Sowmya Raghavan, Ex-CEO of NODO Inc." loading="lazy" />
            </div>
            <div className={styles.friendBody}>
              <blockquote className={styles.friendQuote}>
                I've known him for 4 years and he completely turned around our marketing strategies while showing amazing results. On top of it, he was our go-to guy for any sort of VC connects which further led to a successful raise. I've since worked with him on all projects of mine.
              </blockquote>
              <div className={styles.friendAttrib}>
                <span className={styles.friendName}>Sowmya Raghavan</span>
                <span className={styles.friendRole}>Ex-CEO · NODO Inc.</span>
              </div>
            </div>
          </a>

        </div>
      </section>
    </div>
  );
};

export default TestimonialSection;
