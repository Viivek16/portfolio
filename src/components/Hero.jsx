import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const EASE = [0.25, 0.46, 0.45, 0.94];
const GUTTER = '8vw';
const NEXT_BG = '#070C18';

const Hero = () => {
  const sectionRef = useRef(null);
  const portraitRef = useRef(null);
  const grayRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let raf = null;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const rect = section.getBoundingClientRect();
        const cx = rect.width / 2, cy = rect.height / 2;
        const rx = (((e.clientX - rect.left) - cx) / cx) * 5;
        const ry = (((e.clientY - rect.top) - cy) / cy) * -4;
        if (portraitRef.current) {
          portraitRef.current.style.setProperty('--rx', rx.toFixed(2));
          portraitRef.current.style.setProperty('--ry', ry.toFixed(2));
        }
        if (grayRef.current) {
          const gb = grayRef.current.getBoundingClientRect();
          grayRef.current.style.setProperty('--mx', (e.clientX - gb.left) + 'px');
          grayRef.current.style.setProperty('--my', (e.clientY - gb.top) + 'px');
        }
      });
    };
    const onLeave = () => {
      if (portraitRef.current) {
        portraitRef.current.style.setProperty('--rx', '0');
        portraitRef.current.style.setProperty('--ry', '0');
      }
      if (grayRef.current) {
        grayRef.current.style.setProperty('--mx', '-9999px');
        grayRef.current.style.setProperty('--my', '-9999px');
      }
    };
    section.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);
    return () => {
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
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
        .hero-glow{position:absolute;left:50%;top:54%;transform:translate(-50%,-50%);width:min(900px,70vw);height:min(900px,70vw);border-radius:50%;background:radial-gradient(closest-side,rgba(9,146,194,0.16),rgba(10,196,224,0.05) 45%,transparent 70%);filter:blur(40px);z-index:1;pointer-events:none;}
        .hero-wordmark{position:absolute;top:20%;left:0;right:0;text-align:center;z-index:1;pointer-events:none;font-family:'Poppins',sans-serif;font-weight:700;font-size:clamp(56px,12vw,184px);line-height:1;letter-spacing:0.01em;color:rgba(255,255,255,0.10);white-space:nowrap;}
        .hero-portrait-wrap{position:absolute;left:50%;bottom:0;height:min(82vh,760px);width:auto;z-index:2;transform:translateX(-50%) perspective(1100px) rotateY(calc(var(--rx,0)*1deg)) rotateX(calc(var(--ry,0)*1deg));transition:transform .2s ease-out;filter:drop-shadow(0 14px 34px rgba(0,0,0,0.55)) drop-shadow(0 0 46px rgba(10,196,224,0.16));will-change:transform;}
        .hero-portrait-fade{position:relative;height:100%;width:auto;-webkit-mask-image:linear-gradient(to bottom,#000 0%,#000 60%,rgba(0,0,0,0.35) 84%,transparent 100%);mask-image:linear-gradient(to bottom,#000 0%,#000 60%,rgba(0,0,0,0.35) 84%,transparent 100%);}
        .hero-portrait-fade img{height:100%;width:auto;display:block;}
        .hero-portrait-color{position:relative;z-index:1;}
        .hero-portrait-gray{position:absolute;inset:0;z-index:2;filter:grayscale(1) contrast(1.05) brightness(1.05);-webkit-mask-image:radial-gradient(circle 160px at var(--mx,-9999px) var(--my,-9999px),transparent 0%,transparent 42%,#000 72%);mask-image:radial-gradient(circle 160px at var(--mx,-9999px) var(--my,-9999px),transparent 0%,transparent 42%,#000 72%);}
        .hero-left{position:absolute;left:${GUTTER};top:50%;transform:translateY(-50%);z-index:10;max-width:26vw;text-align:left;}
        .hero-right{position:absolute;right:${GUTTER};top:46%;transform:translateY(-50%);z-index:10;max-width:24vw;text-align:right;}
        .hero-eyebrow{font-family:'Fraunces',serif;font-style:italic;font-weight:300;font-size:clamp(22px,2vw,31px);color:rgba(255,255,255,0.80);margin:0 0 6px 0;}
        .hero-name{font-family:'Fraunces',serif;font-style:italic;font-weight:600;font-size:clamp(40px,5vw,58px);line-height:1.05;color:#ffffff;margin:0;}
        .hero-triad{font-family:'Poppins',sans-serif;font-weight:500;font-size:15px;letter-spacing:0.04em;color:rgba(255,255,255,0.88);margin:28px 0 0 0;}
        .hero-triad .dot{color:#0AC4E0;}
        .hero-quote{font-family:'Fraunces',serif;font-style:italic;font-weight:300;font-size:clamp(18px,1.8vw,25px);line-height:1.5;color:rgba(255,255,255,0.72);margin:0;position:relative;}
        .hero-quote .qmark{font-family:'Fraunces',serif;font-style:italic;color:#0AC4E0;font-size:1.6em;position:absolute;left:-0.7em;top:-0.35em;}
        .hero-blend{position:absolute;left:0;right:0;bottom:0;height:220px;background:linear-gradient(to bottom,rgba(7,12,24,0) 0%,${NEXT_BG} 100%);z-index:5;pointer-events:none;}
        @media (max-width:768px){
          .hero-portrait-wrap{height:54vh;transform:translateX(-50%);transition:none;}
          .hero-portrait-gray{-webkit-mask-image:none;mask-image:none;}
          .hero-wordmark{top:13%;font-size:clamp(40px,16vw,76px);}
          .hero-left{position:relative;left:auto;top:auto;transform:none;max-width:100%;text-align:center;padding:130px 24px 0;}
          .hero-right{position:relative;right:auto;top:auto;transform:none;max-width:100%;text-align:center;padding:24px 24px 64px;}
          .hero-quote .qmark{position:static;}
        }
      `}</style>

      <div className="hero-glow" />
      <motion.div className="hero-wordmark" {...reveal(0)}>Mehta and More</motion.div>

      <motion.div className="hero-portrait-wrap" ref={portraitRef} {...reveal(0.15)}>
        <div className="hero-portrait-fade">
          <img className="hero-portrait-color" src="/images/lander/hero.png" alt="Viivek Mehata" />
          <img className="hero-portrait-gray" ref={grayRef} src="/images/lander/hero.png" alt="" aria-hidden="true" />
        </div>
      </motion.div>

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
