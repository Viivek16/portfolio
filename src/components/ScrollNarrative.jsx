import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import Lenis from 'lenis';

const BEATS = [
  { type: "solo", eyebrow: "01. 2018", year: "2018", headline: "Yellow Bags shuts down.", body: "The first lesson — that conviction without distribution is just a hobby.", image: "https://source.unsplash.com/random/800x1000/?empty-warehouse,abandoned,monochrome" },
  { type: "grid", eyebrow: "EARLY 2020", year: "2020", headline: "Pandemic blockade. LinkedIn rants.", body: "Locked in, writing publicly for the first time. The audience came before the plan did.", images: ["https://source.unsplash.com/random/600x750/?empty-streets,pandemic,monochrome", "https://source.unsplash.com/random/500x500/?laptop-home,writing,desk", "https://source.unsplash.com/random/450x600/?window-light,solitude,interior", "https://source.unsplash.com/random/380x380/?journal,pen,paper"] },
  { type: "solo", eyebrow: "LATE 2020", year: "2020", headline: "Neurotech Design: 3 → 18.", body: "Built a team in the middle of a shutdown. Learned that culture compounds faster than headcount.", image: "https://source.unsplash.com/random/800x1000/?team-meeting,workspace,minimal" },
  { type: "grid", eyebrow: "2021", year: "2021", headline: "Web3, freelance.", body: "Traded certainty for surface area. Every client was a tutorial in a new corner of the stack.", images: ["https://source.unsplash.com/random/600x750/?coding,screen,nightwork", "https://source.unsplash.com/random/500x500/?coffee-laptop,workspace", "https://source.unsplash.com/random/450x600/?abstract-blockchain,blue", "https://source.unsplash.com/random/380x380/?notebook-sketches,ideas"] },
  { type: "solo", eyebrow: "JUNE 2021", year: "2021", headline: "NewTribe Capital.", body: "The first real seat at the table. Thesis-writing replaced thesis-reading.", image: "https://source.unsplash.com/random/800x1000/?finance-office,desk,architecture" },
  { type: "grid", eyebrow: "MARCH 2022", year: "2022", headline: "Best VC Award. 450+ KOLs.", body: "Distribution, finally on my side of the table. The network became the product.", images: ["https://source.unsplash.com/random/600x750/?conference-stage,speaker,audience", "https://source.unsplash.com/random/500x500/?award,trophy,minimal", "https://source.unsplash.com/random/450x600/?networking-event,blurred", "https://source.unsplash.com/random/380x380/?microphone,closeup"] },
  { type: "grid", eyebrow: "MARCH 2022", year: "2022", headline: "250+ projects. $200M+ AUM.", body: "Scale teaches you which of your instincts were actually principles.", images: ["https://source.unsplash.com/random/600x750/?financial-dashboard,charts,blue", "https://source.unsplash.com/random/500x500/?team-strategy,whiteboard", "https://source.unsplash.com/random/450x600/?abstract-data,gradient", "https://source.unsplash.com/random/380x380/?handshake-deal,business"] },
  { type: "grid", eyebrow: "DECEMBER 2022", year: "2022", headline: "14 cities in 12 months.", body: "Conferences as research. Every flight bought a lesson the deck couldn't.", images: ["https://source.unsplash.com/random/600x750/?airport-window,plane,travel", "https://source.unsplash.com/random/500x500/?dubai-skyline,architecture", "https://source.unsplash.com/random/450x600/?singapore-night,city", "https://source.unsplash.com/random/380x380/?passport,boarding-pass"] },
  { type: "solo", eyebrow: "NOVEMBER 2023", year: "2023", headline: "$1.5M for Leo Ventures.", body: "Raising taught me more about clarity than any pitch I'd ever heard.", image: "https://source.unsplash.com/random/800x1000/?handshake,boardroom,neutral" },
  { type: "grid", eyebrow: "SEPTEMBER 2024", year: "2024", headline: "20+ global events, hosted.", body: "Convening became a form of investing — earlier than capital, often more lasting.", images: ["https://source.unsplash.com/random/600x750/?gala-event,evening,warm-light", "https://source.unsplash.com/random/500x500/?audience-applause,blurred", "https://source.unsplash.com/random/450x600/?cocktail-reception,candid", "https://source.unsplash.com/random/380x380/?stage-lighting,dramatic"] },
  { type: "grid", eyebrow: "DECEMBER 2024", year: "2024", headline: "Three firms: Asva, Leo, DCF.", body: "Different theses, shared backbone. Learned to architect, not just operate.", images: ["https://source.unsplash.com/random/600x750/?modern-office,glass,architecture", "https://source.unsplash.com/random/500x500/?minimal-logo,branding", "https://source.unsplash.com/random/450x600/?team-portrait,professional", "https://source.unsplash.com/random/380x380/?contract-signing,closeup"] },
  { type: "solo", eyebrow: "JANUARY 2025", year: "2025", headline: "NODO. $10M Series A. Acquired.", body: "The full arc in one deal — early conviction, patient build, clean exit.", image: "https://source.unsplash.com/random/800x1000/?signing-document,closeup,minimal" },
  { type: "solo", eyebrow: "APRIL 2025", year: "2025", headline: "Yellow Capital. Portfolio Manager.", body: "Came back to the title I'd watched from the outside seven years earlier.", image: "https://source.unsplash.com/random/800x1000/?manhattan,skyline,blue-hour" },
  { type: "solo", eyebrow: "NOVEMBER 2025", year: "2025", headline: "Married.", body: "Some chapters are not professional.", image: "https://source.unsplash.com/random/800x1000/?wedding-rings,golden-light,intimate" },
  { type: "closing", eyebrow: "SINCE", year: "NOW", headline: "Sailing across VC, market making, AI.", body: "Three currents, one boat. Still learning which way the wind actually blows." },
];

const easeOutExpo = [0.22, 1, 0.36, 1];

const BeatText = ({ children, delay = 0, className, style }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      viewport={{ amount: 0.5, margin: "0px 0px -20% 0px" }}
      transition={{ duration: 0.6, ease: easeOutExpo, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

// Common 3D Mouse Move Hook
const useTilt = (maxRotation = 6) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    if (!e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;
    setRotateX(-yPct * maxRotation);
    setRotateY(xPct * maxRotation);
  };
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return { springX, springY, handleMouseMove, handleMouseLeave };
};

const ImageCard = ({ src, alt, delay = 0.12, dynamicBorderColor }) => {
  const { springX, springY, handleMouseMove, handleMouseLeave } = useTilt(6);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      viewport={{ amount: 0.5 }}
      transition={{ opacity: { duration: 0.7 }, scale: { duration: 0.7, ease: easeOutExpo }, delay }}
      className="w-full max-w-[480px] aspect-[4/5] mx-auto relative bg-transparent rounded-[2px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200, rotateX: springX, rotateY: springY }}
    >
      <motion.div 
        className="absolute inset-0 border z-10 pointer-events-none rounded-[2px]" 
        style={{ borderColor: dynamicBorderColor || 'var(--hairline)' }}
      ></motion.div>
      <img src={src} alt={alt} className="w-full h-full object-cover rounded-[2px]" loading="lazy" />
    </motion.div>
  );
};

const GridCard = ({ images, delay = 0.12 }) => {
  const { springX, springY, handleMouseMove, handleMouseLeave } = useTilt(4);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax drifts
  const yA = useTransform(scrollYProgress, [0, 1], [-24, 24]);
  const yB = useTransform(scrollYProgress, [0, 1], [32, -32]);
  const yC = useTransform(scrollYProgress, [0, 1], [-16, 16]);
  const yD = useTransform(scrollYProgress, [0, 1], [24, -24]);

  const imagesConfig = [
    { src: images[0], top: '0', right: '0', width: '60%', aspectRatio: '4/5', zIndex: 3, delay: 0, y: yA },
    { src: images[1], top: '18%', left: '0', width: '50%', aspectRatio: '1/1', zIndex: 2, delay: 0.1, y: yB },
    { src: images[2], bottom: '8%', right: '12%', width: '45%', aspectRatio: '3/4', zIndex: 4, delay: 0.18, y: yC },
    { src: images[3], bottom: '0', left: '8%', width: '38%', aspectRatio: '1/1', zIndex: 1, delay: 0.26, y: yD },
  ];

  return (
    <motion.div
      ref={containerRef}
      className="w-[480px] h-[600px] max-w-full mx-auto relative bg-transparent"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1400, rotateX: springX, rotateY: springY }}
    >
      {imagesConfig.map((img, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.5 }}
          transition={{ opacity: { duration: 0.6 }, scale: { duration: 0.6, ease: easeOutExpo }, delay: delay + img.delay }}
          className="absolute border border-hairline rounded-[2px] bg-white overflow-hidden"
          style={{ 
            top: img.top, bottom: img.bottom, left: img.left, right: img.right, 
            width: img.width, aspectRatio: img.aspectRatio, zIndex: img.zIndex, y: img.y,
            maskImage: 'radial-gradient(ellipse at center, black 55%, black 75%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 55%, black 75%, transparent 100%)'
          }}
        >
          <img src={img.src} alt={`grid-img-${idx}`} className="w-full h-full object-cover" loading="lazy" />
        </motion.div>
      ))}
    </motion.div>
  );
};

const BeatSection = ({ beat, index, setActiveBeat, globalScrollYProgress }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });
  
  useEffect(() => {
    if (inView) setActiveBeat(index);
  }, [inView, index, setActiveBeat]);

  // Golden transition border logic specifically for Beat 14 (index 13)
  const isBeat14 = index === 13;
  const beat14BorderColor = useTransform(globalScrollYProgress, [0.84, 0.93], ["rgba(10,36,99,0.14)", "rgba(184,147,94,0.2)"]);

  return (
    <section ref={ref} className="w-full min-h-[720px] h-[100vh] grid grid-cols-1 md:grid-cols-2 gap-[96px] relative snap-center snap-always z-10 py-12 md:py-0">
      
      {/* Left Column (Sticky-feeling content) */}
      <div className="flex flex-col justify-center h-full px-6 md:px-0">
        <BeatText delay={0} className="mb-12">
          <p className="text-[0.75rem] uppercase tracking-[0.18em] font-display font-medium text-ink-soft">
            {beat.eyebrow}
          </p>
        </BeatText>
        
        <BeatText delay={0} className="mb-6">
          <h2 
            className="text-[4.5rem] md:text-[7.5rem] font-serif text-ink leading-[0.9] tracking-[-0.04em]"
            style={{ fontVariationSettings: '"opsz" 144', fontStyle: 'italic', fontWeight: 300 }}
          >
            {beat.year}
          </h2>
        </BeatText>
        
        <BeatText delay={0.08} className="mb-6 max-w-lg">
          <h3 className="text-[1.875rem] md:text-[2.75rem] font-display font-medium text-ink leading-[1.1] tracking-[-0.02em]">
            {beat.headline}
          </h3>
        </BeatText>
        
        <BeatText delay={0.16} className="max-w-md">
          <p className="text-[1rem] md:text-[1.0625rem] font-display font-normal text-ink leading-[1.55]">
            {beat.body}
          </p>
        </BeatText>
      </div>

      {/* Right Column (Image) */}
      <div className="flex items-center justify-center h-full px-6 md:px-0">
        {beat.type === "solo" && <ImageCard src={beat.image} alt={beat.headline} delay={0.12} dynamicBorderColor={isBeat14 ? beat14BorderColor : null} />}
        {beat.type === "grid" && <GridCard images={beat.images} delay={0.12} />}
        {beat.type === "closing" && null}
      </div>
      
    </section>
  );
};

const IntroSection = ({ globalScrollYProgress }) => {
  // Exit animation on scroll (0 -> 0.08)
  const opacity = useTransform(globalScrollYProgress, [0, 0.08], [1, 0]);
  
  const quoteWords = "Every chapter taught me something the next one would test.".split(" ");
  
  return (
    <motion.section 
      style={{ opacity }}
      className="w-full h-screen flex flex-col items-center justify-center bg-white relative z-20 px-6"
    >
      <div className="max-w-[880px] w-full flex flex-col items-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[0.75rem] font-display font-medium uppercase tracking-[0.22em] text-ink-soft mb-[48px] text-center"
        >
          AN EDITORIAL TIMELINE — 2018 / NOW
        </motion.p>

        {/* Pull Quote */}
        <h1 
          className="font-serif text-[clamp(2.75rem,6vw,5.5rem)] text-ink leading-[1.05] tracking-[-0.025em] text-center"
          style={{ fontVariationSettings: '"opsz" 144', fontStyle: 'italic', fontWeight: 300 }}
        >
          {quoteWords.map((word, i) => {
            const isTest = word === "test.";
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + (i * 0.06), ease: easeOutExpo }}
                className="inline-block mr-[0.25em]"
                style={isTest ? { 
                  textDecoration: 'underline', 
                  textDecorationColor: 'var(--accent)', 
                  textDecorationThickness: '1px', 
                  textUnderlineOffset: '0.15em' 
                } : {}}
              >
                {word}
              </motion.span>
            );
          })}
        </h1>

        {/* Scroll Cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="mt-[80px] flex flex-col items-center"
        >
          <div className="relative w-[1px] h-[48px] bg-ink overflow-hidden">
            <motion.div 
              animate={{ y: ["-100%", "100%", "100%"], opacity: [1, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-accent"
            />
          </div>
          <span className="text-[0.6875rem] font-display font-medium uppercase tracking-[0.3em] text-ink-soft mt-4">
            SCROLL
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
};

const ScrollNarrative = () => {
  const containerRef = useRef(null);
  const [activeBeat, setActiveBeat] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background Transition (Beat 13 exit to Beat 14 entry approx 0.84 to 0.93)
  const bgColor = useTransform(scrollYProgress, [0.84, 0.93], ["#FFFFFF", "#FBEFD0"]);

  // Horizon Line Creation and Scaling
  // From 0 to 0.04 (during intro) -> scale 0
  // From 0.04 to 0.10 -> scale grows to 0.08
  // From 0.10 to 1 -> scale grows 0.08 to 1
  const horizonScaleY = useTransform(scrollYProgress, [0, 0.04, 0.10, 1], [0, 0, 0.08, 1]);
  
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest > 0.99 && !isClosing) setIsClosing(true);
      else if (latest < 0.98 && isClosing) setIsClosing(false);
    });
  }, [scrollYProgress, isClosing]);

  return (
    <div ref={containerRef} className="relative w-full min-h-[1600vh]" style={{ scrollSnapType: 'y proximity' }}>
      
      {/* Scroll-Linked Fixed Background */}
      <motion.div 
        className="fixed inset-0 z-[-1] pointer-events-none transition-colors duration-200"
        style={{ backgroundColor: bgColor }}
      />

      {/* Intro Section */}
      <IntroSection globalScrollYProgress={scrollYProgress} />

      {/* Outer Container for Content */}
      <div className="relative max-w-[1440px] mx-auto px-[clamp(24px,5vw,96px)]">
        
        {/* Fixed Horizon Line Container */}
        <div className="fixed top-0 bottom-0 left-[50%] -translate-x-[50%] z-0 pointer-events-none flex justify-center w-[20px]">
          
          <motion.div 
            className="absolute top-0 w-[1.5px] bg-ink origin-top"
            style={{ 
              height: '100vh',
              scaleY: isClosing ? 0.6 : horizonScaleY,
              rotate: isClosing ? 90 : 0,
            }}
            transition={{
              rotate: { duration: 0.8, ease: [0.83, 0, 0.17, 1] },
              scaleY: { duration: 0.8, ease: [0.83, 0, 0.17, 1] }
            }}
          />

          {/* Dots on Horizon */}
          {BEATS.map((_, i) => {
            const isActive = activeBeat === i;
            // The dots should fade in along with the horizon line
            const dotOpacity = useTransform(scrollYProgress, [0.04, 0.10], [0, 1]);
            const topPercent = (i / (BEATS.length - 1)) * 100;
            const adjustedTop = 8 + (topPercent * 0.92);

            return (
              <motion.div
                key={i}
                className={`absolute rounded-full border border-ink ${isActive ? 'bg-accent border-accent w-[6px] h-[6px]' : 'bg-white w-[4px] h-[4px] border-ink-faint'}`}
                style={{ top: `${adjustedTop}vh`, opacity: isClosing ? 0 : dotOpacity, x: "-50%" }}
                animate={{ scale: isActive ? 1.4 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            );
          })}
        </div>

        {/* Closing Gesture Caption */}
        <motion.div
          className="fixed left-1/2 top-1/2 -translate-x-1/2 mt-8 z-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isClosing ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="font-serif text-[1rem] text-ink" style={{ fontVariationSettings: '"opsz" 144', fontStyle: 'italic', fontWeight: 300 }}>
            — still sailing
          </span>
        </motion.div>

        {/* Beats */}
        <div className="relative z-10 pb-[10vh]">
          {BEATS.map((beat, i) => (
            <BeatSection 
              key={i} 
              index={i} 
              beat={beat} 
              setActiveBeat={setActiveBeat} 
              globalScrollYProgress={scrollYProgress}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ScrollNarrative;
