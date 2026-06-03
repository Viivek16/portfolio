import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [hovered, setHovered] = useState(null);

  const reveal = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  return (
    <footer
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 1,
        isolation: 'isolate',
        backgroundColor: '#070C18',
        width: '100%',
        paddingTop: '96px',
        paddingBottom: '56px',
        paddingLeft: '8vw',
        paddingRight: '8vw',
        boxSizing: 'border-box',
      }}
    >
      {/* Eyebrow */}
      <motion.p
        {...reveal(0)}
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.22em',
          color: '#0AC4E0',
          textTransform: 'uppercase',
          margin: '0 0 14px 0',
        }}
      >
        — Stay in touch
      </motion.p>

      {/* Heading — ONE element, single span for the cyan period only */}
      <motion.h2
        {...reveal(0.1)}
        style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 300,
          fontStyle: 'italic',
          fontSize: 'clamp(44px, 8vw, 72px)',
          color: '#ffffff',
          lineHeight: 1,
          letterSpacing: '-0.01em',
          margin: '0 0 8px 0',
        }}
      >
        Viivek Mehata<span style={{ color: '#0AC4E0' }}>.</span>
      </motion.h2>

      {/* Subtitle — intentional two-line break */}
      <motion.p
        {...reveal(0.2)}
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 300,
          fontSize: '14px',
          lineHeight: 1.8,
          color: 'rgba(255,255,255,0.55)',
          maxWidth: '440px',
          margin: '0 0 44px 0',
        }}
      >
        A thesis worth holding, or a chapter worth starting,
        <br />
        either way, the door's open.
      </motion.p>

      {/* Column grid — 4 equal columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '28px',
        }}
      >
        {COLUMNS.map((col, idx) => (
          <motion.div key={col.title} {...reveal(0.3 + idx * 0.08)} style={{ minWidth: 0 }}>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.18em',
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                margin: '0 0 14px 0',
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
            </p>

            {col.items.map((item, i) => (
              <a
                key={item.id}
                href={item.href}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '13px',
                  fontWeight: 300,
                  lineHeight: 1.5,
                  color: hovered === item.id ? '#0AC4E0' : 'rgba(255,255,255,0.72)',
                  transition: 'color 0.35s ease',
                  marginBottom: i < col.items.length - 1 ? '9px' : 0,
                }}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Colophon row */}
      <motion.div
        {...reveal(0.64)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '34px',
          paddingTop: '20px',
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
    </footer>
  );
};

export default Footer;
