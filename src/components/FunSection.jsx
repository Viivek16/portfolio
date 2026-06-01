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
      '/images/fun/travelling/2.jpeg',
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
      '/images/fun/writing/2.jpeg',
      '/images/fun/writing/3.jpeg',
      '/images/fun/writing/4.jpeg',
    ],
    gridStyle: { gridColumn: '3', gridRow: '1' },
  },
  {
    id: 'learning',
    badge: '— Learning',
    captionText: 'The best investment is still the one you make in yourself.',
    captionSub: 'Books. Courses. Conversations.',
    images: [
      '/images/fun/learning/1.png',
      '/images/fun/learning/2.jpg',
      '/images/fun/learning/3.jpg',
    ],
    gridStyle: { gridColumn: '2 / span 2', gridRow: '2' },
  },
];

const FunSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.35 });
  const [hoveredTile, setHoveredTile] = useState(null);

  const slideRefs = useRef({});
  const slideData = useRef({});

  useEffect(() => {
    TILES.forEach(tile => {
      slideData.current[tile.id] = { current: 'A', index: 0, interval: null };
    });
    
    return () => {
      Object.values(slideData.current).forEach(data => {
        if (data && data.interval) clearInterval(data.interval);
      });
    };
  }, []);

  const doCrossfade = (tileId, images) => {
    let data = slideData.current[tileId];
    if (!data) return;
    
    const nextIndex = (data.index + 1) % images.length;
    const layerA = slideRefs.current[`${tileId}-A`];
    const layerB = slideRefs.current[`${tileId}-B`];
    
    if (!layerA || !layerB) return;
    
    const activeLayer = data.current === 'A' ? layerA : layerB;
    const inactiveLayer = data.current === 'A' ? layerB : layerA;
    
    inactiveLayer.style.backgroundImage = `url('${images[nextIndex]}')`;
    
    activeLayer.style.opacity = '0';
    inactiveLayer.style.opacity = '1';
    
    data.index = nextIndex;
    data.current = data.current === 'A' ? 'B' : 'A';
  };

  const handleMouseEnter = (tileId, images) => {
    setHoveredTile(tileId);
    let data = slideData.current[tileId];
    if (data && data.interval) clearInterval(data.interval);
    
    const layerA = slideRefs.current[`${tileId}-A`];
    const layerB = slideRefs.current[`${tileId}-B`];
    
    if (layerA) layerA.style.filter = 'grayscale(0%) brightness(0.85)';
    if (layerB) layerB.style.filter = 'grayscale(0%) brightness(0.85)';
    
    doCrossfade(tileId, images);
    
    data.interval = setInterval(() => {
      doCrossfade(tileId, images);
    }, 1800);
  };

  const handleMouseLeave = (tileId, images) => {
    setHoveredTile(null);
    let data = slideData.current[tileId];
    if (data && data.interval) {
      clearInterval(data.interval);
      data.interval = null;
    }
    
    const layerA = slideRefs.current[`${tileId}-A`];
    const layerB = slideRefs.current[`${tileId}-B`];
    
    if (layerA) {
      layerA.style.backgroundImage = `url('${images[0]}')`;
      layerA.style.opacity = '1';
      layerA.style.filter = 'grayscale(100%) brightness(0.65)';
    }
    if (layerB) {
      layerB.style.opacity = '0';
      layerB.style.filter = 'grayscale(100%) brightness(0.65)';
    }
    
    if (data) {
      data.index = 0;
      data.current = 'A';
    }
  };

  const getTileDelay = (id) => {
    switch(id) {
      case 'travel': return 0.28;
      case 'cooking': return 0.36;
      case 'writing': return 0.42;
      case 'learning': return 0.48;
      default: return 0.28;
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
        zIndex: 50,
        isolation: 'isolate',
        backgroundColor: '#070C18',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0 }}
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
      >
        <h2 style={{ 
          fontFamily: "'Fraunces', serif", 
          fontWeight: 300, 
          fontStyle: 'italic', 
          fontSize: 'clamp(38px, 4vw, 52px)', 
          color: '#ffffff', 
          lineHeight: 1.1,
          margin: '0 0 16px 0'
        }}>
          The other chapters<span style={{ color: '#0AC4E0' }}>.</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.18 }}
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
          The chapters that don't make it to a pitch deck, <br />
          but make everything else make sense.
        </p>
      </motion.div>

      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: '1.65fr 1fr 1fr',
          gridTemplateRows: 'minmax(0, 1.4fr) minmax(0, 1fr)',
          gap: '12px',
          width: '100%',
          flex: 1,
          perspective: '1200px'
        }}
      >
        {TILES.map((tile) => {
          const isHovered = hoveredTile === tile.id;
          const delay = getTileDelay(tile.id);
          const initialMotion = { opacity: 0, y: 50, scale: 0.9, rotateX: 15 };
          
          return (
            <motion.div
              key={tile.id}
              initial={initialMotion}
              animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : initialMotion}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: delay }}
              style={{
                ...tile.gridStyle,
                position: 'relative',
                cursor: 'pointer',
                transformStyle: 'preserve-3d'
              }}
              onMouseEnter={() => handleMouseEnter(tile.id, tile.images)}
              onMouseLeave={() => handleMouseLeave(tile.id, tile.images)}
            >
              <div style={{
                position: 'absolute', inset: 0,
                overflow: 'hidden',
                borderRadius: '18px',
                transform: isHovered ? 'translateY(-12px) scale(1.05)' : 'none',
                boxShadow: isHovered ? '0 30px 60px rgba(0,0,0,0.6), 0 15px 25px rgba(0,0,0,0.4)' : '0 10px 30px rgba(0,0,0,0.2)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}>
                {/* Layer A */}
                <div 
                  ref={el => slideRefs.current[`${tile.id}-A`] = el}
                  style={{
                    position: 'absolute', inset: 0,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    backgroundImage: `url(${tile.images[0]})`,
                    transition: 'opacity 0.7s ease, filter 0.7s ease',
                    opacity: 1,
                    filter: 'grayscale(100%) brightness(0.65)'
                  }}
                />

                {/* Layer B */}
                <div 
                  ref={el => slideRefs.current[`${tile.id}-B`] = el}
                  style={{
                    position: 'absolute', inset: 0,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    backgroundImage: `url(${tile.images[1]})`,
                    transition: 'opacity 0.7s ease, filter 0.7s ease',
                    opacity: 0,
                    filter: 'grayscale(100%) brightness(0.65)'
                  }}
                />

                {/* Overlay curtain */}
                <div 
                  style={{
                    position: 'absolute', inset: 0,
                    zIndex: 3,
                    background: 'linear-gradient(to top, rgba(7,12,24,0.92) 0%, rgba(7,12,24,0.45) 50%, transparent 100%)',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.4s ease'
                  }}
                />

                {/* Category Badge */}
                <div 
                  style={{
                    position: 'absolute', top: '15px', left: '16px', zIndex: 5,
                    fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '9px',
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: isHovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {tile.badge}
                </div>

                {/* Caption Block */}
                <div 
                  style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, padding: '18px', zIndex: 4,
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateY(0)' : 'translateY(14px)',
                    transition: 'opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s'
                  }}
                >
                  <div style={{ display: 'block', width: '20px', height: '1px', backgroundColor: '#0AC4E0', marginBottom: '6px' }} />
                  <div 
                    style={{
                      fontFamily: "'Poppins', sans-serif", fontStyle: 'italic', fontWeight: 300,
                      fontSize: '11px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.6
                    }}
                  >
                    {tile.captionText}
                  </div>
                  <div 
                    style={{
                      fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '9px',
                      letterSpacing: '0.14em', color: '#0AC4E0', textTransform: 'uppercase', marginTop: '5px'
                    }}
                  >
                    {tile.captionSub}
                  </div>
                </div>

                {/* Glow Border */}
                <div 
                  style={{
                    position: 'absolute', inset: 0, zIndex: 6, pointerEvents: 'none',
                    borderRadius: '18px',
                    border: isHovered ? '1px solid rgba(9,146,194,0.3)' : '1px solid transparent',
                    transition: 'border-color 0.4s ease'
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FunSection;
