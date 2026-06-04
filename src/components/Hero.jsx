import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

// Emil Kowalski strong ease-out for UI interactions
const EASE = [0.23, 1, 0.32, 1];
const GUTTER = '8vw';
const NEXT_BG = '#070C18';

const Hero = () => {
  const sectionRef = useRef(null);

  // Motion values for normalized mouse position [-1, 1]
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for natural, interruption-friendly motion
  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Mapped transforms for 3D tilt
  const rotateX = useTransform(smoothY, [-1, 1], [6, -6]);
  const rotateY = useTransform(smoothX, [-1, 1], [-6, 6]);

  // Mapped transforms for interactive masking
  const maskX = useTransform(smoothX, [-1, 1], ['10%', '90%']);
  const maskY = useTransform(smoothY, [-1, 1], ['10%', '90%']);
  const maskImage = useMotionTemplate`radial-gradient(circle 240px at ${maskX} ${maskY}, transparent 0%, transparent 35%, #000 75%)`;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseX.set(nx);
      mouseY.set(ny);
    };

    const onLeave = () => {
      // Return gently to center via springs
      mouseX.set(0);
      mouseY.set(0);
    };

    section.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);
    
    return () => {
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
    };
  }, [mouseX, mouseY]);

  // Premium reveal: incorporates scale & blur transitions
  const reveal = (delay) => ({
    initial: { opacity: 0, y: 32, scale: 0.96, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    transition: { duration: 1.2, delay, ease: EASE },
  });

  return (
    <section ref={sectionRef} className="hero-root">
      <style>{`
        .hero-root { position: relative; width: 100%; min-height: 100vh; overflow: hidden; background: #070C18; isolation: isolate; margin: 0; padding: 0; }
        
        .hero-glow {
          position: absolute; left: 50%; top: 54%; transform: translate(-50%, -50%);
          width: min(1000px, 80vw); height: min(1000px, 80vw); border-radius: 50%;
          background: radial-gradient(closest-side, rgba(9, 146, 194, 0.16), rgba(10, 196, 224, 0.05) 45%, transparent 70%);
          filter: blur(50px); z-index: 1; pointer-events: none;
        }
        
        .hero-wordmark {
          position: absolute; top: 18%; left: 0; right: 0; text-align: center; z-index: 1; pointer-events: none;
          font-family: 'Poppins', sans-serif; font-weight: 700; font-size: clamp(56px, 12vw, 184px);
          line-height: 1; letter-spacing: 0.02em; color: rgba(255, 255, 255, 0.07); white-space: nowrap;
          user-select: none;
        }
        
        .hero-portrait-wrap {
          position: absolute; left: 50%; bottom: 0; height: min(82vh, 760px); width: auto; z-index: 2;
          transform-style: preserve-3d; 
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.65)) drop-shadow(0 0 50px rgba(10,196,224,0.12));
          will-change: transform;
        }
        
        .hero-portrait-fade {
          position: relative; height: 100%; width: auto;
          -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 65%, rgba(0,0,0,0.2) 86%, transparent 100%);
          mask-image: linear-gradient(to bottom, #000 0%, #000 65%, rgba(0,0,0,0.2) 86%, transparent 100%);
        }
        
        .hero-portrait-fade img { height: 100%; width: auto; display: block; }
        
        .hero-portrait-color { position: relative; z-index: 1; }
        
        .hero-portrait-gray {
          position: absolute; inset: 0; z-index: 2;
          filter: grayscale(1) contrast(1.08) brightness(1.02);
          will-change: mask-image;
        }
        
        .hero-left { position: absolute; left: ${GUTTER}; top: 50%; transform: translateY(-50%); z-index: 10; max-width: 28vw; text-align: left; }
        .hero-right { position: absolute; right: ${GUTTER}; top: 46%; transform: translateY(-50%); z-index: 10; max-width: 24vw; text-align: right; }
        
        .hero-eyebrow { font-family: 'Fraunces', serif; font-style: italic; font-weight: 300; font-size: clamp(22px, 2vw, 31px); color: rgba(255,255,255,0.85); margin: 0 0 8px 0; }
        .hero-name { font-family: 'Fraunces', serif; font-style: italic; font-weight: 600; font-size: clamp(40px, 5.5vw, 64px); line-height: 1.05; color: #ffffff; margin: 0; }
        .hero-triad { font-family: 'Poppins', sans-serif; font-weight: 500; font-size: 15px; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.88); margin: 32px 0 0 0; }
        .hero-triad .dot { color: #0AC4E0; margin: 0 4px; opacity: 0.8; }
        
        .hero-quote { font-family: 'Fraunces', serif; font-style: italic; font-weight: 300; font-size: clamp(20px, 2vw, 28px); line-height: 1.4; color: rgba(255,255,255,0.78); margin: 0; position: relative; }
        .hero-quote .qmark { font-family: 'Fraunces', serif; font-style: italic; color: #0AC4E0; font-size: 1.6em; position: absolute; left: -0.7em; top: -0.35em; opacity: 0.9; }
        
        .hero-blend { position: absolute; left: 0; right: 0; bottom: 0; height: 250px; background: linear-gradient(to bottom, rgba(7,12,24,0) 0%, ${NEXT_BG} 100%); z-index: 5; pointer-events: none; }
        
        @media (max-width: 768px) {
          .hero-portrait-wrap { height: 55vh; transform: translateX(-50%) !important; transition: none; }
          .hero-portrait-gray { -webkit-mask-image: none !important; mask-image: none !important; }
          .hero-wordmark { top: 12%; font-size: clamp(40px, 16vw, 76px); }
          .hero-left { position: relative; left: auto; top: auto; transform: none; max-width: 100%; text-align: center; padding: 120px 24px 0; }
          .hero-right { position: relative; right: auto; top: auto; transform: none; max-width: 100%; text-align: center; padding: 32px 24px 64px; }
          .hero-quote .qmark { position: static; margin-right: 4px; }
        }
      `}</style>

      <motion.div 
        className="hero-glow"
        animate={{ scale: [1, 1.04, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div className="hero-wordmark" {...reveal(0)}>Mehta and More</motion.div>

      <motion.div 
        className="hero-portrait-wrap" 
        style={{ 
          x: '-50%',
          rotateX, 
          rotateY,
          perspective: 1400
        }}
        {...reveal(0.15)}
      >
        <div className="hero-portrait-fade">
          <img className="hero-portrait-color" src="/images/lander/hero.png" alt="Viivek Mehata" />
          <motion.img 
            className="hero-portrait-gray" 
            src="/images/lander/hero.png" 
            alt="" 
            aria-hidden="true" 
            style={{
              WebkitMaskImage: maskImage,
              maskImage: maskImage
            }}
          />
        </div>
      </motion.div>

      <div className="hero-left">
        <motion.p className="hero-eyebrow" {...reveal(0.35)}>Hey there, I&apos;m</motion.p>
        <motion.h1 className="hero-name" {...reveal(0.50)}>Viivek<br />Mehata<span style={{ color: '#0AC4E0' }}>.</span></motion.h1>
        <motion.p className="hero-triad" {...reveal(0.65)}>VC <span className="dot">·</span> Marketing <span className="dot">·</span> AI</motion.p>
      </div>

      <motion.div className="hero-right" {...reveal(0.80)}>
        <p className="hero-quote"><span className="qmark">&ldquo;</span>Everything that you can think of is Real.</p>
      </motion.div>

      <div className="hero-blend" />
    </section>
  );
};

export default Hero;
