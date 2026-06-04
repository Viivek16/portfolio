import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const sectionRef = useRef(null);
  const portraitRef = useRef(null);
  const rafId = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const portrait = portraitRef.current;
    if (!section || !portrait) return;

    const handleMouseMove = (e) => {
      if (window.innerWidth <= 768) return;

      if (rafId.current) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const rect = portrait.getBoundingClientRect();
        
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const rx = ((e.clientX - centerX) / centerX) * 5;
        const ry = ((e.clientY - centerY) / centerY) * -4;

        section.style.setProperty('--mx', `${mx}px`);
        section.style.setProperty('--my', `${my}px`);
        section.style.setProperty('--rx', `${rx}`);
        section.style.setProperty('--ry', `${ry}`);
      });
    };

    const handleMouseLeave = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      section.style.setProperty('--mx', '-9999px');
      section.style.setProperty('--my', '-9999px');
      section.style.setProperty('--rx', '0');
      section.style.setProperty('--ry', '0');
    };

    handleMouseLeave();

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const customVariants = (delay) => ({
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  });

  return (
    <section ref={sectionRef} className="hero-section">
      <style>{`
        .hero-section {
          min-height: 100vh;
          background-color: #070C18;
          overflow: hidden;
          position: relative;
          isolation: isolate;
          margin: 0;
          padding-bottom: 0;
        }

        .hero-aura {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60vw;
          height: 60vw;
          max-width: 800px;
          max-height: 800px;
          background: radial-gradient(circle, rgba(10,196,224,0.15) 0%, rgba(9,146,194,0.05) 40%, transparent 70%);
          filter: blur(60px);
          z-index: -2;
          pointer-events: none;
        }

        .hero-wordmark {
          position: absolute;
          top: 15vh;
          left: 0;
          width: 100%;
          text-align: center;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: clamp(56px, 12vw, 184px);
          color: rgba(255, 255, 255, 0.10);
          letter-spacing: 0.01em;
          white-space: nowrap;
          z-index: -1;
          pointer-events: none;
          line-height: 1;
        }

        .hero-portrait-wrapper {
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%) perspective(1100px) rotateY(calc(var(--rx, 0) * 1deg)) rotateX(calc(var(--ry, 0) * 1deg));
          transform-style: preserve-3d;
          transition: transform 0.2s ease-out;
          height: min(82vh, 760px);
          width: auto;
          display: flex;
          align-items: flex-end;
          filter: drop-shadow(0 14px 34px rgba(0,0,0,0.55)) drop-shadow(0 0 46px rgba(10,196,224,0.16));
          z-index: 2;
        }

        .hero-portrait-fade {
          height: 100%;
          -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 60%, rgba(0,0,0,0.35) 84%, transparent 100%);
          mask-image: linear-gradient(to bottom, #000 0%, #000 60%, rgba(0,0,0,0.35) 84%, transparent 100%);
        }

        .hero-portrait-img {
          height: 100%;
          width: auto;
          object-fit: contain;
          object-position: bottom center;
          display: block;
        }

        .hero-portrait-base {
          position: relative;
        }

        .hero-portrait-mask {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 100%;
          width: auto;
          filter: grayscale(1) contrast(1.05) brightness(1.05);
          -webkit-mask-image: radial-gradient(circle 160px at var(--mx, -9999px) var(--my, -9999px), transparent 0%, transparent 42%, #000 72%);
          mask-image: radial-gradient(circle 160px at var(--mx, -9999px) var(--my, -9999px), transparent 0%, transparent 42%, #000 72%);
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: none;
          margin: 0;
          pointer-events: none;
        }
        
        .hero-left, .hero-right {
          pointer-events: auto;
        }

        .hero-left {
          position: absolute;
          left: 8vw;
          top: 50%;
          transform: translateY(-50%);
          text-align: left;
          max-width: 30vw;
          z-index: 10;
        }

        .hero-greeting {
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(22px, 2vw, 31px);
          color: rgba(255,255,255,0.80);
          margin: 0;
          line-height: 1.2;
        }

        .hero-name {
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-weight: 600;
          font-size: clamp(40px, 5vw, 58px);
          line-height: 1.05;
          color: #ffffff;
          margin: 8px 0 0 0;
        }

        .hero-name-dot {
          color: #0AC4E0;
        }

        .hero-triad {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: 15px;
          letter-spacing: 0.04em;
          color: rgba(255,255,255,0.88);
          margin: 28px 0 0 0;
        }

        .hero-triad-dot {
          color: #0AC4E0;
          margin: 0 6px;
        }

        .hero-right {
          position: absolute;
          right: 8vw;
          top: 44%;
          transform: translateY(-50%);
          text-align: right;
          max-width: 22vw;
          z-index: 10;
        }

        .hero-quote {
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(18px, 1.8vw, 25px);
          line-height: 1.5;
          color: rgba(255,255,255,0.72);
          margin: 0;
        }

        .hero-quote-mark {
          position: absolute;
          top: -15px;
          left: -20px;
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-weight: 600;
          font-size: 48px;
          color: #0AC4E0;
          line-height: 1;
        }

        .hero-blend {
          position: absolute; 
          left: 0; 
          right: 0; 
          bottom: 0;
          height: 220px;
          background: linear-gradient(to bottom, rgba(7,12,24,0) 0%, #070C18 100%);
          pointer-events: none; 
          z-index: 5;
        }

        @media (max-width: 768px) {
          .hero-section {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            padding-top: 120px;
          }
          
          .hero-content {
            display: flex;
            flex-direction: column;
            padding: 0 24px;
            justify-content: flex-start;
            text-align: center;
            height: auto;
          }

          .hero-left, .hero-right {
            position: relative;
            left: auto;
            right: auto;
            top: auto;
            transform: none;
            max-width: 100%;
          }

          .hero-left {
            margin-top: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 40px;
          }

          .hero-right {
            text-align: center;
            margin-bottom: 0;
            margin-top: 20px;
          }

          .hero-quote-mark {
            left: 50%;
            transform: translateX(-50%);
            top: -25px;
          }

          .hero-portrait-wrapper {
            position: relative;
            transform: none !important;
            height: 50vh;
            min-height: 400px;
            margin-top: auto;
            left: auto;
            bottom: 0;
          }

          .hero-portrait-mask {
            -webkit-mask-image: none !important;
            mask-image: none !important;
          }
          
          .hero-wordmark {
            top: auto;
            bottom: 40vh;
          }
        }
      `}</style>

      {/* LAYER 0 */}
      <div className="hero-aura" />

      {/* LAYER 1 */}
      <motion.div 
        className="hero-wordmark"
        initial="hidden"
        animate="visible"
        variants={customVariants(0.0)}
      >
        Mehta and More
      </motion.div>

      {/* LAYER 2 */}
      <motion.div 
        className="hero-portrait-wrapper"
        ref={portraitRef}
        initial="hidden"
        animate="visible"
        variants={customVariants(0.15)}
      >
        <div className="hero-portrait-fade">
          <img 
            src="/images/lander/hero.png" 
            alt="Viivek Mehata" 
            className="hero-portrait-img hero-portrait-base" 
          />
          <img 
            src="/images/lander/hero.png" 
            alt="Viivek Mehata" 
            className="hero-portrait-img hero-portrait-mask" 
          />
        </div>
      </motion.div>

      {/* LAYER 3 */}
      <div className="hero-content">
        <div className="hero-left">
          <motion.p 
            className="hero-greeting"
            initial="hidden"
            animate="visible"
            variants={customVariants(0.30)}
          >
            Hey there, I'm
          </motion.p>
          <motion.h1 
            className="hero-name"
            initial="hidden"
            animate="visible"
            variants={customVariants(0.40)}
          >
            Viivek<br />
            Mehata<span className="hero-name-dot">.</span>
          </motion.h1>
          <motion.p 
            className="hero-triad"
            initial="hidden"
            animate="visible"
            variants={customVariants(0.55)}
          >
            VC<span className="hero-triad-dot">·</span>Marketing<span className="hero-triad-dot">·</span>AI
          </motion.p>
        </div>

        <div className="hero-right">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={customVariants(0.65)}
          >
            <span className="hero-quote-mark">"</span>
            <p className="hero-quote">
              Everything that you can think of is Real.
            </p>
          </motion.div>
        </div>
      </div>

      {/* LAYER 4: Base Blend */}
      <div className="hero-blend" />
    </section>
  );
};

export default Hero;
