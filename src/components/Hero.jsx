import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const EASE = [0.25, 0.46, 0.45, 0.94];
const GUTTER = '8vw';
const NEXT_BG = '#0B1120';

const Hero = () => {
  const sectionRef = useRef(null);
  const tiltRef = useRef(null);
  const grayRef = useRef(null);
  const colorRef = useRef(null);
  const hit = useRef({ ctx: null, w: 0, h: 0 });

  const buildHit = () => {
    const img = colorRef.current;
    if (!img || !img.naturalWidth) return;
    const c = document.createElement('canvas');
    c.width = img.naturalWidth; c.height = img.naturalHeight;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    try { ctx.drawImage(img, 0, 0); hit.current = { ctx, w: img.naturalWidth, h: img.naturalHeight }; }
    catch (_) { hit.current = { ctx: null, w: 0, h: 0 }; }
  };

  useEffect(() => {
    if (colorRef.current && colorRef.current.complete) buildHit();

    const section = sectionRef.current;
    const gray = grayRef.current;
    if (!section || !gray) return;
    let raf = null;

    // figure-only color reveal: alpha hit-test on the portrait itself
    const hide = () => { gray.style.setProperty('--mx', '-9999px'); gray.style.setProperty('--my', '-9999px'); };
    const onGrayMove = (e) => {
      const ox = e.offsetX, oy = e.offsetY;
      const { ctx, w, h } = hit.current;
      if (!ctx) { hide(); return; }
      const nx = Math.floor(ox * (w / gray.clientWidth));
      const ny = Math.floor(oy * (h / gray.clientHeight));
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) { hide(); return; }
      let a = 0;
      try { a = ctx.getImageData(nx, ny, 1, 1).data[3]; } catch (_) { a = 0; }
      if (a > 30) { gray.style.setProperty('--mx', ox + 'px'); gray.style.setProperty('--my', oy + 'px'); }
      else hide();
    };
    gray.addEventListener('mousemove', onGrayMove);
    gray.addEventListener('mouseleave', hide);

    return () => {
      gray.removeEventListener('mousemove', onGrayMove);
      gray.removeEventListener('mouseleave', hide);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const reveal = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section ref={sectionRef} className="hero-root">
      <style>{`
        .hero-root{position:relative;width:100%;min-height:100vh;overflow:hidden;background:#070C18;isolation:isolate;margin:0;padding:0;}
        .hero-glow{position:absolute;left:50%;top:56%;transform:translate(-50%,-50%);width:min(960px,72vw);height:min(960px,72vw);border-radius:50%;background:radial-gradient(closest-side,rgba(9,146,194,0.18),rgba(10,196,224,0.06) 45%,transparent 70%);filter:blur(46px);z-index:1;pointer-events:none;}
        .hero-wordmark-wrap{position:absolute;top:18%;left:0;right:0;text-align:center;z-index:1;pointer-events:none;}
        .hero-wordmark{font-family:'Poppins',sans-serif;font-weight:700;font-size:clamp(56px,12.5vw,196px);line-height:1;letter-spacing:0.01em;color:rgba(255,255,255,1);white-space:nowrap;}
        .hero-portrait-pos{position:absolute;left:50%;bottom:0;transform:translateX(-50%);z-index:2;}
        .hero-portrait-tilt{transform:perspective(1100px) rotateY(calc(var(--rx,0)*1deg)) rotateX(calc(var(--ry,0)*1deg));transition:transform .2s ease-out;filter:drop-shadow(0 0 55px rgba(10,196,224,0.32)) drop-shadow(0 22px 48px rgba(0,0,0,0.6));will-change:transform;}
        .hero-portrait-fade{position:relative;height:min(98vh,960px);width:auto;-webkit-mask-image:linear-gradient(to bottom,#000 0%,#000 62%,rgba(0,0,0,0.35) 85%,transparent 100%);mask-image:linear-gradient(to bottom,#000 0%,#000 62%,rgba(0,0,0,0.35) 85%,transparent 100%);}
        .hero-portrait-fade img{height:100%;width:auto;display:block;}
        .hero-portrait-color{position:relative;z-index:1;}
        .hero-portrait-gray{position:absolute;top:0;left:0;height:100%;width:auto;z-index:2;filter:grayscale(1) contrast(1.06) brightness(1.05);-webkit-mask-image:radial-gradient(circle 170px at var(--mx,-9999px) var(--my,-9999px),transparent 0%,transparent 40%,#000 72%);mask-image:radial-gradient(circle 170px at var(--mx,-9999px) var(--my,-9999px),transparent 0%,transparent 40%,#000 72%);}
        .hero-left{position:absolute;left:calc(${GUTTER} + 1.5vw);top:50%;transform:translateY(-50%);z-index:10;max-width:28vw;text-align:left;}
        .hero-right{position:absolute;right:${GUTTER};top:46%;transform:translateY(-50%);z-index:10;max-width:26vw;text-align:right;}
        .hero-eyebrow{font-family:'Fraunces',serif;font-style:italic;font-weight:300;font-size:clamp(24px,2.2vw,34px);color:rgba(255,255,255,0.80);margin:0 0 6px 0;}
        .hero-name{font-family:'Fraunces',serif;font-style:italic;font-weight:600;font-size:clamp(46px,5.8vw,72px);line-height:1.05;color:#ffffff;margin:0;}
        .hero-triad{font-family:'Poppins',sans-serif;font-weight:500;font-size:16.5px;letter-spacing:0.04em;color:rgba(255,255,255,0.88);margin:28px 0 0 0;}
        .hero-triad .dot{color:#0AC4E0;}
        .hero-quote{font-family:'Fraunces',serif;font-style:italic;font-weight:300;font-size:clamp(22px,2.2vw,32px);line-height:1.45;color:rgba(255,255,255,0.76);margin:0;position:relative;}
        .hero-quote .qmark{font-family:'Fraunces',serif;font-style:italic;color:#0AC4E0;font-size:1.6em;position:absolute;left:-0.7em;top:-0.35em;}
        .hero-blend{position:absolute;left:0;right:0;bottom:0;height:220px;background:linear-gradient(to bottom,rgba(7,12,24,0) 0%,${NEXT_BG} 100%);z-index:5;pointer-events:none;}
        @media (max-width:768px){
          .hero-portrait-tilt{transform:none;transition:none;}
          .hero-portrait-fade{height:56vh;}
          .hero-portrait-gray{-webkit-mask-image:none;mask-image:none;}
          .hero-wordmark-wrap{top:12%;transform:none;}
          .hero-wordmark{font-size:clamp(40px,16vw,78px);}
          .hero-left{position:relative;left:auto;top:auto;transform:none;max-width:100%;text-align:center;padding:130px 24px 0;}
          .hero-right{position:relative;right:auto;top:auto;transform:none;max-width:100%;text-align:center;padding:24px 24px 64px;}
          .hero-quote .qmark{position:static;}
        }
      `}</style>

      <div className="hero-glow" />

      <div className="hero-wordmark-wrap">
        <motion.div 
          className="hero-wordmark"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          Mehta and More
        </motion.div>
      </div>

      <div className="hero-portrait-pos">
        <motion.div {...reveal(0.15)}>
          <div className="hero-portrait-tilt" ref={tiltRef}>
            <div className="hero-portrait-fade">
              <img className="hero-portrait-color" ref={colorRef} onLoad={buildHit} src="/images/lander/hero.png" alt="Viivek Mehata" />
              <img className="hero-portrait-gray" ref={grayRef} src="/images/lander/hero.png" alt="" aria-hidden="true" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="hero-left">
        <motion.p className="hero-eyebrow" {...reveal(0.30)}>Hey there, I&apos;m</motion.p>
        <motion.h1 className="hero-name" {...reveal(0.40)}>Viivek<br />Mehata<span style={{ color: '#0AC4E0' }}>.</span></motion.h1>
        <motion.p className="hero-triad" {...reveal(0.55)}>VC <span className="dot">·</span> Marketing <span className="dot">·</span> AI</motion.p>
      </div>

      <motion.div className="hero-right" {...reveal(0.65)}>
        <p className="hero-quote"><span className="qmark">&ldquo;</span>Everything that you can think of is Real.</p>
      </motion.div>

      <div className="hero-blend" />
    </section>
  );
};

export default Hero;
