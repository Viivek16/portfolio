import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

const EASE = [0.25, 0.46, 0.45, 0.94];

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

  // Mouse tracking for premium interactive glow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smooth spotlight movement (emil-design-eng skill)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlightBackground = useMotionTemplate`radial-gradient(800px circle at ${springX}px ${springY}px, rgba(10, 196, 224, 0.08), transparent 80%)`;

  const reveal = (delay) => ({
    initial: { opacity: 0, y: 32 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <footer
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        zIndex: 1,
        isolation: 'isolate',
        // Seamless gradient from the Testimonial background (#0B1120) to Footer background (#070C18) to remove the harsh line
        background: 'linear-gradient(to bottom, #0B1120 0%, #070C18 300px, #070C18 100%)',
        width: '100%',
        minHeight: '85vh', // Increased height to emphasize the section and make it feel like a destination
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '96px',
        paddingBottom: '56px',
        paddingLeft: '8vw',
        paddingRight: '8vw',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Interactive Spotlight Overlay */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: spotlightBackground,
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />

      {/* Ambient Breathing Glow */}
      <motion.div
        initial={{ opacity: 0.3, scale: 1 }}
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(10, 196, 224, 0.04) 0%, transparent 60%)',
          filter: 'blur(80px)',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1440px', margin: '0 auto' }}>
        
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
            {...reveal(0.1)}
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(44px, 8vw, 84px)', // Slightly larger for more wow effect
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
              {...reveal(0.2)}
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
              {...reveal(0.28)}
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

        {/* Column grid — 4 equal columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px', // slightly wider gap for premium feel
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '40px',
          }}
        >
          {COLUMNS.map((col, colIdx) => {
            const colBaseDelay = 0.4 + colIdx * 0.15;
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
                      <motion.div {...reveal(colBaseDelay + 0.1 + itemIdx * 0.08)}>
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
                            fontSize: '14px', // slightly increased for better touch targets
                            fontWeight: 300,
                            lineHeight: 1.5,
                            color: hovered === item.id ? '#0AC4E0' : 'rgba(255,255,255,0.72)',
                            transition: 'color 0.35s ease, transform 0.35s ease',
                            transform: hovered === item.id ? 'translateX(4px)' : 'translateX(0px)', // subtle interaction wow effect
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
        <div style={{ overflow: 'hidden', marginTop: '64px' }}>
          <motion.div
            {...reveal(0.9)}
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
        
      </div>
    </footer>
  );
};

export default Footer;
