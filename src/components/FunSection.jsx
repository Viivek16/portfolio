import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const TILES = [
  {
    id: 'travel',
    badge: '— Travel',
    captionText: "Often most of my answers are found when I'm on the roads",
    captionSub: 'Solo. Always moving.',
    images: [
      '/images/fun/travelling/1.jpg',
      '/images/fun/travelling/2.jpg',
      '/images/fun/travelling/3.jpg',
      '/images/fun/travelling/4.jpg',
      '/images/fun/travelling/5.jpg',
    ],
    gridStyle: { gridColumn: '1', gridRow: '1 / span 2' },
  },
  {
    id: 'cooking',
    badge: '— Cooking',
    captionText: 'Passion for cooking runs in my family',
    captionSub: 'Experimenting since 2019.',
    images: [
      '/images/fun/cooking/1.jpg',
      '/images/fun/cooking/2.jpg',
      '/images/fun/cooking/3.jpg',
      '/images/fun/cooking/4.jpg',
      '/images/fun/cooking/5.jpg',
    ],
    gridStyle: { gridColumn: '2', gridRow: '1' },
  },
  {
    id: 'writing',
    badge: '— Writing',
    captionText: 'We are all a beautifully composed poem, or nothing at all',
    captionSub: 'Diaries & drafts.',
    images: [
      '/images/fun/writing/1.jpg',
      '/images/fun/writing/2.jpg',
      '/images/fun/writing/3.jpg',
      '/images/fun/writing/4.jpg',
    ],
    gridStyle: { gridColumn: '3', gridRow: '1' },
  },
  {
    id: 'learning',
    badge: '— Learning',
    captionText: 'The best investment is still the one you make in yourself.',
    captionSub: 'Books. Courses. Conversations.',
    images: [
      '/images/fun/learning/1.jpg',
      '/images/fun/learning/2.jpg',
      '/images/fun/learning/3.jpg',
    ],
    gridStyle: { gridColumn: '2 / span 2', gridRow: '2' },
  },
];

const FunSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [hoveredTile, setHoveredTile] = useState(null);

  // Interval and Index refs
  const intervalsRef = useRef({});
  const indexesRef = useRef({});
  const slideRefs = useRef({});

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      Object.values(intervalsRef.current).forEach(clearInterval);
    };
  }, []);

  const handleMouseEnter = (tileId, images) => {
    setHoveredTile(tileId);
    
    // Clear existing interval if any
    if (intervalsRef.current[tileId]) {
      clearInterval(intervalsRef.current[tileId]);
    }
    
    // Set initial index to 1 (since 0 is the starting image)
    indexesRef.current[tileId] = 1;

    intervalsRef.current[tileId] = setInterval(() => {
      const el = slideRefs.current[tileId];
      if (el) {
        const nextIndex = indexesRef.current[tileId] % images.length;
        el.style.backgroundImage = `url('${images[nextIndex]}')`;
        indexesRef.current[tileId] = nextIndex + 1;
      }
    }, 1100);
  };

  const handleMouseLeave = (tileId, images) => {
    setHoveredTile(null);
    
    if (intervalsRef.current[tileId]) {
      clearInterval(intervalsRef.current[tileId]);
      intervalsRef.current[tileId] = null;
    }
    
    // Reset back to images[0]
    const el = slideRefs.current[tileId];
    if (el) {
      el.style.backgroundImage = `url('${images[0]}')`;
    }
    indexesRef.current[tileId] = 0;
  };

  const getTileDelay = (id) => {
    switch(id) {
      case 'travel': return 0.22;
      case 'cooking': return 0.32;
      case 'writing': return 0.38;
      case 'learning': return 0.44;
      default: return 0.22;
    }
  };

  return (
    <div 
      ref={sectionRef}
      style={{
        paddingLeft: '8vw',
        paddingRight: '8vw',
        paddingTop: '96px',
        paddingBottom: '96px',
        position: 'relative',
        zIndex: 1,
        isolation: 'isolate',
        backgroundColor: '#070C18'
      }}
    >
      {/* Eyebrow & Heading */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div 
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            fontSize: '11px',
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}
        >
          — WHEN I'M NOT WORKING
        </div>
        <h2 style={{ 
          fontSize: '48px', 
          color: '#fff', 
          marginBottom: '16px', 
          lineHeight: 1.1,
          margin: '0 0 16px 0' // Explicit override just in case
        }}>
          <span style={{ fontWeight: 400 }}>The other </span>
          <span style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 300 }}>chapters</span>
          <span style={{ color: '#0AC4E0' }}>.</span>
        </h2>
      </motion.div>

      {/* Subheading */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.12 }}
        style={{ marginBottom: '48px' }}
      >
        <p 
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 300,
            fontSize: '14px',
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.9,
            maxWidth: '560px',
            margin: 0
          }}
        >
          The chapters that don't make it to a pitch deck — but make everything else make sense.
        </p>
      </motion.div>

      {/* Grid Container */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: '1.65fr 1fr 1fr',
          gridTemplateRows: '260px 190px',
          gap: '12px',
          width: '100%'
        }}
      >
        {TILES.map((tile) => {
          const isHovered = hoveredTile === tile.id;
          const delay = getTileDelay(tile.id);
          const initialMotion = { opacity: 0, y: 40, scale: 0.97 };
          
          return (
            <motion.div
              key={tile.id}
              initial={initialMotion}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : initialMotion}
              transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: delay }}
              style={{
                ...tile.gridStyle,
                borderRadius: '18px',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                transform: isHovered ? 'translateY(-5px) scale(1.015)' : 'translateY(0) scale(1)',
                transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
              onMouseEnter={() => handleMouseEnter(tile.id, tile.images)}
              onMouseLeave={() => handleMouseLeave(tile.id, tile.images)}
            >
              {/* 1. Single Slide Layer */}
              <div 
                ref={el => slideRefs.current[tile.id] = el}
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  backgroundImage: `url('${tile.images[0]}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: 1,
                  filter: isHovered ? 'grayscale(0%) brightness(0.85)' : 'grayscale(100%) brightness(0.65)',
                  transition: 'filter 0.5s ease',
                }}
              />

              {/* 2. Dark Gradient Overlay */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  zIndex: 3,
                  background: 'linear-gradient(to top, rgba(7,12,24,0.92) 0%, rgba(7,12,24,0.45) 50%, transparent 100%)',
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.4s ease'
                }}
              />

              {/* 3. Category Badge */}
              <div 
                style={{
                  position: 'absolute',
                  top: '15px',
                  left: '16px',
                  zIndex: 5,
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  fontSize: '9px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: isHovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)',
                  transition: 'color 0.3s ease'
                }}
              >
                {tile.badge}
              </div>

              {/* 4. Caption Block */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  padding: '18px',
                  zIndex: 4,
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateY(0)' : 'translateY(14px)',
                  transition: 'opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s'
                }}
              >
                <div style={{ width: '20px', height: '1px', backgroundColor: '#0AC4E0', marginBottom: '6px' }} />
                <div 
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.88)',
                    lineHeight: 1.6
                  }}
                >
                  {tile.captionText}
                </div>
                <div 
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    fontSize: '9px',
                    letterSpacing: '0.14em',
                    color: '#0AC4E0',
                    textTransform: 'uppercase',
                    marginTop: '5px'
                  }}
                >
                  {tile.captionSub}
                </div>
              </div>

              {/* 5. Glow Border Pseudo */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  zIndex: 6,
                  pointerEvents: 'none',
                  borderRadius: '18px',
                  border: isHovered ? '1px solid rgba(9,146,194,0.3)' : '1px solid rgba(9,146,194,0)',
                  transition: 'border 0.35s ease'
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FunSection;
