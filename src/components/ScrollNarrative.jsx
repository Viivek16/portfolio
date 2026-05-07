import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import Lenis from 'lenis';

const BEATS = [
  { eyebrow: "01. 2018", year: "2018", headline: "Yellow Bags shuts down.", body: "The first lesson — that conviction without distribution is just a hobby.", image: "/info-images/beat-01.jpg" },
  { eyebrow: "EARLY 2020", year: "2020", headline: "Pandemic blockade. LinkedIn rants.", body: "Locked in, writing publicly for the first time. The audience came before the plan did.", image: "/info-images/beat-02.jpg" },
  { eyebrow: "LATE 2020", year: "2020", headline: "Neurotech Design: 3 → 18.", body: "Built a team in the middle of a shutdown. Learned that culture compounds faster than headcount.", image: "/info-images/beat-03.jpg" },
  { eyebrow: "2021", year: "2021", headline: "Web3, freelance.", body: "Traded certainty for surface area. Every client was a tutorial in a new corner of the stack.", image: "/info-images/beat-04.jpg" },
  { eyebrow: "JUNE 2021", year: "2021", headline: "NewTribe Capital.", body: "The first real seat at the table. Thesis-writing replaced thesis-reading.", image: "/info-images/beat-05.jpg" },
  { eyebrow: "MARCH 2022", year: "2022", headline: "Best VC Award. 450+ KOLs.", body: "Distribution, finally on my side of the table. The network became the product.", image: "/info-images/beat-06.jpg" },
  { eyebrow: "MARCH 2022", year: "2022", headline: "250+ projects. $200M+ AUM.", body: "Scale teaches you which of your instincts were actually principles.", image: "/info-images/beat-07.jpg" },
  { eyebrow: "DECEMBER 2022", year: "2022", headline: "14 cities in 12 months.", body: "Conferences as research. Every flight bought a lesson the deck couldn't.", image: "/info-images/beat-08.jpg" },
  { eyebrow: "NOVEMBER 2023", year: "2023", headline: "$1.5M for Leo Ventures.", body: "Raising taught me more about clarity than any pitch I'd ever heard.", image: "/info-images/beat-09.jpg" },
  { eyebrow: "SEPTEMBER 2024", year: "2024", headline: "20+ global events, hosted.", body: "Convening became a form of investing — earlier than capital, often more lasting.", image: "/info-images/beat-10.jpg" },
  { eyebrow: "DECEMBER 2024", year: "2024", headline: "Three firms: Asva, Leo, DCF.", body: "Different theses, shared backbone. Learned to architect, not just operate.", image: "/info-images/beat-11.jpg" },
  { eyebrow: "JANUARY 2025", year: "2025", headline: "NODO. $10M Series A. Acquired.", body: "The full arc in one deal — early conviction, patient build, clean exit.", image: "/info-images/beat-12.jpg" },
  { eyebrow: "APRIL 2025", year: "2025", headline: "Yellow Capital. Portfolio Manager.", body: "Came back to the title I'd watched from the outside seven years earlier.", image: "/info-images/beat-13.jpg" },
  { eyebrow: "NOVEMBER 2025", year: "2025", headline: "Married.", body: "Some chapters are not professional.", image: "/info-images/beat-14.jpg" },
  { eyebrow: "SINCE", year: "NOW", headline: "Sailing across VC, market making, AI.", body: "Three currents, one boat. Still learning which way the wind actually blows.", image: "/info-images/beat-15.jpg" },
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

const ImageCard = ({ src, alt, delay = 0.12 }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    if (!e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (-6 to 6 degrees)
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;
    
    setRotateX(-yPct * 6);
    setRotateY(xPct * 6);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      viewport={{ amount: 0.5 }}
      transition={{ opacity: { duration: 0.7 }, scale: { duration: 0.7, ease: easeOutExpo }, delay }}
      className="w-full max-w-[480px] aspect-[4/5] mx-auto relative overflow-hidden bg-hairline rounded-sm"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200, rotateX: springX, rotateY: springY }}
    >
      <div className="absolute inset-0 border border-hairline z-10 pointer-events-none"></div>
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
    </motion.div>
  );
};

const BeatSection = ({ beat, index, setActiveBeat }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });
  
  useEffect(() => {
    if (inView) setActiveBeat(index);
  }, [inView, index, setActiveBeat]);

  return (
    <section ref={ref} className="w-full min-h-[720px] h-screen grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-24 relative snap-center snap-always z-10 py-12 md:py-0">
      
      {/* Left Column (Sticky-feeling content) */}
      <div className="flex flex-col justify-center h-full px-6 md:px-0">
        <BeatText delay={0} className="mb-4">
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
        <ImageCard src={beat.image} alt={beat.headline} delay={0.12} />
      </div>
      
    </section>
  );
};

const ScrollNarrative = () => {
  const containerRef = useRef(null);
  const [activeBeat, setActiveBeat] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  
  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background Transition (Beat 13 exit to Beat 14 entry approx 0.86 to 0.92)
  const bgColor = useTransform(scrollYProgress, [0.86, 0.92], ["#F8F7F4", "#F6E7BC"]);

  // Horizon Line Scaling
  // It starts at 8% vh at scroll progress 0. Ends at 100% vh at scroll progress 1.
  const horizonScaleY = useTransform(scrollYProgress, [0, 1], [0.08, 1]);
  
  // Track when user reaches the absolute bottom to trigger closing gesture
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest > 0.99 && !isClosing) {
        setIsClosing(true);
      } else if (latest < 0.98 && isClosing) {
        setIsClosing(false);
      }
    });
  }, [scrollYProgress, isClosing]);

  return (
    <div ref={containerRef} className="relative w-full min-h-[1500vh]">
      
      {/* Scroll-Linked Fixed Background */}
      <motion.div 
        className="fixed inset-0 z-[-1] pointer-events-none transition-colors duration-200"
        style={{ backgroundColor: bgColor }}
      />

      {/* Outer Container for Content */}
      <div className="relative max-w-[1440px] mx-auto px-[clamp(24px,5vw,96px)]">
        
        {/* Fixed Horizon Line Container */}
        <div className="fixed top-0 bottom-0 left-[50%] -translate-x-[50%] z-0 pointer-events-none flex justify-center w-[20px]">
          
          <motion.div 
            className="absolute top-0 w-[1px] bg-ink origin-top"
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
          {/* We calculate rough percentages for the dots. E.g., 15 beats = 15 dots evenly spaced */}
          {BEATS.map((_, i) => {
            const isActive = activeBeat === i;
            const topPercent = (i / (BEATS.length - 1)) * 100;
            
            // To ensure the dot is physically located where the horizon reaches at that scroll progress:
            // Since scaleY goes 0.08 to 1.0, the dot positions should map similarly.
            const adjustedTop = 8 + (topPercent * 0.92);

            return (
              <motion.div
                key={i}
                className={`absolute w-[6px] h-[6px] rounded-full border border-ink ${isActive ? 'bg-accent border-accent' : 'bg-paper'}`}
                style={{ top: `${adjustedTop}vh` }}
                animate={{
                  scale: isActive ? 1.4 : 1,
                  opacity: isClosing ? 0 : 1
                }}
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
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ScrollNarrative;
