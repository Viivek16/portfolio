import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

const PREMIUM_EASE = [0.16, 1, 0.3, 1]; // Ultra-smooth, Apple-like easing

const COLUMNS = [
  {
    num: 'i.',
    title: 'Follow',
    items: [
      { id: 'linkedin',  label: 'LinkedIn',  href: 'https://www.linkedin.com/in/viivek-mehata16/', external: true },
      { id: 'telegram',  label: 'Telegram',  href: 'https://t.me/Viivek16',                         external: true },
      { id: 'twitter',   label: 'Twitter/X', href: 'https://x.com/mehtaandmore',                    external: true },
      { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/mehta_and_more/',     external: true },
    ],
  },
  {
    num: 'ii.',
    title: 'Podcast',
    items: [
      { id: 'spotify', label: 'Mehta and More Talks', href: 'https://open.spotify.com/show/7cgji1TfpwzBiiuzuPMtGh', external: true },
    ],
  },
  {
    num: 'iii.',
    title: 'Say hello',
    items: [
      { id: 'email', label: 'Email', href: 'mailto:vivekmehta.vm31@gmail.com', external: false },
      { id: 'phone', label: 'Phone', href: 'tel:+918668454982',                external: false },
    ],
  },
  {
    num: 'iv.',
    title: 'Resume',
    items: [
      { id: 'growth-cv', label: 'Growth Resume', href: 'https://drive.google.com/file/d/1TvSLFdRZQkucFx7mEtQQqaxYhqTyZjgu/view?usp=sharing', external: true },
      { id: 'vc-cv',     label: 'VC Resume',     href: 'https://drive.google.com/file/d/1fDCQhhUvrjF2MQm7xFzrYiBXbmgbDuuW/view?usp=sharing', external: true },
    ],
  },
];

const Footer = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [hovered, setHovered] = useState(null);
  const [rect, setRect] = useState({ width: 1200, height: 600 });

  // 3D Tilt and Spotlight Mechanics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const opacity = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });
  const springOpacity = useSpring(opacity, { stiffness: 40, damping: 30 });

  useEffect(() => {
    if (sectionRef.current) {
      const r = sectionRef.current.getBoundingClientRect();
      setRect({ width: r.width, height: r.height });
      // Initialize center
      mouseX.set(r.width / 2);
      mouseY.set(r.height / 2);
    }
  }, [mouseX, mouseY]);

  function handleMouseMove({ clientX, clientY }) {
    if (sectionRef.current) {
      const r = sectionRef.current.getBoundingClientRect();
      mouseX.set(clientX - r.left);
      mouseY.set(clientY - r.top);
    }
  }

  function handleMouseEnter() {
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    // Soft reset tilt to center
    mouseX.set(rect.width / 2);
    mouseY.set(rect.height / 2);
  }

  // 3D Tilt calculation (subtle mapping)
  const rotateX = useTransform(springY, y => {
    const norm = (y / rect.height) - 0.5; 
    return norm * -4; 
  });
  const rotateY = useTransform(springX, x => {
    const norm = (x / rect.width) - 0.5;
    return norm * 4;
  });

  // Spotlight Y is offset by 500px because the overlay div physically bleeds 500px upwards
  const spotlightY_div = useTransform(springY, y => y + 500);
  
  const spotlightBackground = useMotionTemplate`radial-gradient(1000px circle at ${springX}px ${spotlightY_div}px, rgba(10, 196, 224, 0.08), transparent 65%)`;

  const reveal = (delay) => ({
    initial: { opacity: 0, y: 40, scale: 0.98 },
    animate: isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.98 },
    transition: { duration: 1.2, delay, ease: PREMIUM_EASE },
  });

  return (
    <footer
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        zIndex: 10, // Ensure it sits physically over the Testimonials edge
        isolation: 'isolate',
        // Exact match with Testimonials background color #0B1120
        backgroundColor: '#0B1120',
        width: '100%',
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '96px',
        paddingBottom: '56px',
        paddingLeft: '8vw',
        paddingRight: '8vw',
        boxSizing: 'border-box',
        // CRITICAL FIX: -2px marginTop and a solid shadow perfectly blends away any hairline crack
        marginTop: '-2px',
        boxShadow: '0 -2px 0 #0B1120',
        perspective: '1200px',
      }}
    >
      {/* 1. Aurora Orbs Container (Internal bounds only) */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: -2 }}>
        <motion.div
          animate={{
            x: ['0%', '10%', '-5%', '0%'],
            y: ['0%', '-10%', '5%', '0%'],
            scale: [1, 1.1, 0.9, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '10%', left: '20%',
            width: '50vw', height: '50vw',
            background: 'radial-gradient(circle, rgba(10, 196, 224, 0.05) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        <motion.div
          animate={{
            x: ['0%', '-15%', '10%', '0%'],
            y: ['0%', '15%', '-10%', '0%'],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{
            position: 'absolute',
            bottom: '10%', right: '10%',
            width: '40vw', height: '40vw',
            background: 'radial-gradient(circle, rgba(9, 146, 194, 0.06) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* 2. Interactive Spotlight Overlay (Allowed to bleed vertically!) */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-500px', // Bleeds aggressively into the section above
          bottom: '-500px', // Bleeds below
          left: 0,
          right: 0,
          background: spotlightBackground,
          opacity: springOpacity, // Smooth fade on enter/leave
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />

      {/* Main Content wrapped in a 3D tilt container */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        
        {/* Eyebrow */}
        <div style={{ overflow: 'hidden', marginBottom: '16px' }}>
          <motion.p
            {...reveal(0)}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.22em',
              color: '#0AC4E0',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            — Stay in touch
          </motion.p>
        </div>

        {/* Heading — ONE element, single span for the cyan period only */}
        <div style={{ overflow: 'hidden', marginBottom: '16px' }}>
          <motion.h2
            {...reveal(0.15)}
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(44px, 8vw, 84px)',
              color: '#ffffff',
              lineHeight: 1,
              letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            Viivek Mehata<span style={{ color: '#0AC4E0' }}>.</span>
          </motion.h2>
        </div>

        {/* Subtitle — Animated line by line */}
        <div style={{ marginBottom: '64px', maxWidth: '440px' }}>
          <div style={{ overflow: 'hidden' }}>
            <motion.p
              {...reveal(0.25)}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 300,
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.55)',
                margin: 0,
              }}
            >
              A thesis worth holding, or a chapter worth starting,
            </motion.p>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <motion.p
              {...reveal(0.35)}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 300,
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.55)',
                margin: 0,
              }}
            >
              either way, the door's open.
            </motion.p>
          </div>
        </div>

        {/* Animated Drawing Divider Line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 1.5, ease: PREMIUM_EASE, delay: 0.4 }}
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.15) 0%, transparent 100%)',
            transformOrigin: 'left',
            marginBottom: '40px',
            width: '100%',
          }}
        />

        {/* Column grid — 4 equal columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px',
          }}
        >
          {COLUMNS.map((col, colIdx) => {
            const colBaseDelay = 0.5 + colIdx * 0.15;
            return (
              <div key={col.title} style={{ minWidth: 0 }}>
                {/* Column Title */}
                <div style={{ overflow: 'hidden', marginBottom: '20px' }}>
                  <motion.p
                    {...reveal(colBaseDelay)}
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '10px',
                      fontWeight: 500,
                      letterSpacing: '0.18em',
                      color: 'rgba(255,255,255,0.4)',
                      textTransform: 'uppercase',
                      margin: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontStyle: 'italic',
                        fontWeight: 300,
                        color: '#0AC4E0',
                        marginRight: '7px',
                      }}
                    >
                      {col.num}
                    </span>
                    {col.title}
                  </motion.p>
                </div>

                {/* Column Items - staggered individually */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {col.items.map((item, itemIdx) => (
                    <div key={item.id} style={{ overflow: 'hidden' }}>
                      <motion.div {...reveal(colBaseDelay + 0.15 + itemIdx * 0.1)}>
                        <a
                          href={item.href}
                          {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          onMouseEnter={() => setHovered(item.id)}
                          onMouseLeave={() => setHovered(null)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: '14px',
                            fontWeight: 300,
                            lineHeight: 1.5,
                            color: hovered === item.id ? '#0AC4E0' : 'rgba(255,255,255,0.72)',
                            transition: 'color 0.35s ease, transform 0.35s ease',
                            // Interactive hover lift
                            transform: hovered === item.id ? 'translateX(6px)' : 'translateX(0px)',
                          }}
                        >
                          {item.label}
                        </a>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Colophon row */}
        <div style={{ overflow: 'hidden', marginTop: '80px' }}>
          <motion.div
            {...reveal(1.2)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <span
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '0.12em',
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              VM.
            </span>
            <span
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '11px',
                fontWeight: 300,
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              © 2026 · Sailing across Marketing, VC &amp; AI.
            </span>
          </motion.div>
        </div>
        
      </motion.div>
    </footer>
  );
};

export default Footer;
