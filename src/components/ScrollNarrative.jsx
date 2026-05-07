import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const MILESTONES = [
  {
    year: "2018",
    title: "The Genesis",
    copy: "Co-founded Yellow Bags. It was my first leap into the unknown. It ended in legal shutdowns—a brutal, necessary lesson in the foundations of business.",
    image: "https://images.unsplash.com/photo-1541888087405-ebad0c1f6024?auto=format&fit=crop&q=80&w=1000",
  },
  {
    year: "2020",
    title: "The Blockade",
    copy: "Pandemic hit. The world stopped, and for a moment, so did I. Lost, clueless, and ranted on LinkedIn until the noise turned into a signal: Neurotech Design.",
    image: "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&q=80&w=1000",
  },
  {
    year: "2020",
    title: "The Growth",
    copy: "What started as a trio grew into an 18-member family. We were bootstrapped and relentless. We built more than tech; we built a culture.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
  },
  {
    year: "2021",
    title: "The Pivot",
    copy: "Transitioned to Web3 as a freelancer. Writing whitepapers and managing communities—learning the new language of decentralized finance from the ground up.",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&q=80&w=1000",
  },
  {
    year: "June 2021",
    title: "NewTribe Capital",
    copy: "Joined the tribe. The beginning of a journey into high-stakes venture capital.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000",
  },
  {
    year: "March 2022",
    title: "Hyper-Growth (Part I)",
    copy: "NewTribe Capital won Best VC of the Year at AIBC. We built a global community of 450+ KOLs—the network effect in action.",
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=1000",
  },
  {
    year: "March 2022",
    title: "Hyper-Growth (Part II)",
    copy: "Led 50+ investments and managed a $200M+ AUM portfolio. The numbers were big, but the impact on the 250+ projects was what mattered.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
  },
  {
    year: "December 2022",
    title: "The Resolution",
    copy: "14 cities in 12 months. A solo resolution to rediscover the world and my place in it.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1000",
  },
  {
    year: "November 2023",
    title: "Scaling Up",
    copy: "Raised $1.5M for Leo Ventures. Bridging private capital with high-conviction founders.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1000",
  },
  {
    year: "September 2024",
    title: "Convergence",
    copy: "Hosted 20+ global events. From RWA Summits to private gatherings—bringing the brightest minds into one room.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1000",
  },
  {
    year: "December 2024",
    title: "The Architect",
    copy: "Helped set up three major VC firms across India, Singapore, and the UAE. Building the infrastructure for the future of investment.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000",
  },
  {
    year: "January 2025",
    title: "The Exit",
    copy: "Led strategy for NODO’s agentic vaults. Helped raise $10M Series A, leading to a successful acquisition.",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=1000",
  },
  {
    year: "April 2025",
    title: "Yellow Capital",
    copy: "Joined Yellow Capital as Portfolio Manager. Diving deep into institutional liquidity and market making.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000",
  },
  {
    year: "November 2025",
    title: "The Union",
    copy: "Got married to the love of my life. The most important 'partnership' I’ve ever entered.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1000",
  },
];

const TimelineItem = ({ item, index }) => {
  const isEven = index % 2 === 0;
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  
  const { scrollYProgress: exitProgress } = useScroll({
    target: ref,
    offset: ["center center", "end start"],
  });

  // Entry Animations
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [0, 0.3, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [150, 0]);
  
  // Exit Animations
  const exitOpacity = useTransform(exitProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const exitY = useTransform(exitProgress, [0, 1], [0, -100]);
  const blur = useTransform(exitProgress, [0, 1], ["blur(0px)", "blur(10px)"]);

  // Image parallax and scale
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  const imgRotate = useTransform(scrollYProgress, [0, 1], [isEven ? -5 : 5, 0]);
  const imgY = useTransform(exitProgress, [0, 1], [0, -50]);

  return (
    <motion.div 
      ref={ref}
      style={{ opacity: opacity, y: y }}
      className={`relative w-full min-h-[80vh] flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-center gap-12 md:gap-24 my-32`}
    >
      {/* Node on the spine */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0B2D72] border-4 border-[#F8F7F4] z-20 hidden md:block"></div>

      {/* Text Section */}
      <motion.div 
        style={{ opacity: exitOpacity, y: exitY, filter: blur }}
        className={`w-full md:w-1/2 flex flex-col justify-center ${isEven ? 'md:text-right md:pr-16 md:items-end' : 'md:text-left md:pl-16 md:items-start'} z-10 px-6 md:px-0`}
      >
        <div className="overflow-hidden mb-4">
          <motion.h4 
            style={{ y: useTransform(scrollYProgress, [0.5, 1], [50, 0]) }}
            className="font-mono text-sm tracking-[0.2em] text-[#0B2D72]/60 uppercase"
          >
            {item.year}
          </motion.h4>
        </div>
        
        <div className="overflow-hidden mb-6">
          <motion.h2 
            style={{ y: useTransform(scrollYProgress, [0.4, 1], [100, 0]) }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase text-text-primary"
          >
            {item.title}
          </motion.h2>
        </div>

        <motion.p 
          style={{ opacity: useTransform(scrollYProgress, [0.6, 1], [0, 1]) }}
          className="font-body text-lg md:text-xl text-text-primary/80 leading-relaxed max-w-lg"
        >
          {item.copy}
        </motion.p>
      </motion.div>

      {/* Image Section */}
      <motion.div 
        style={{ opacity: exitOpacity, y: imgY }}
        className="w-full md:w-1/2 h-[50vh] md:h-[70vh] px-6 md:px-0 z-10"
      >
        <div className={`w-full h-full overflow-hidden ${isEven ? 'md:ml-16' : 'md:mr-16'} relative`}>
          {/* Subtle masking reveal effect */}
          <motion.div 
            style={{ height: useTransform(scrollYProgress, [0, 0.8], ["100%", "0%"]) }}
            className="absolute inset-0 bg-[#F8F7F4] z-10 origin-bottom"
          ></motion.div>
          <motion.img 
            style={{ scale: imgScale, rotate: imgRotate }}
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700 ease-out"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const HorizonClimax = ({ scrollYProgress }) => {
  // Climax appears at the very end of the global scroll
  const opacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const y = useTransform(scrollYProgress, [0.85, 0.95], [100, 0]);
  const scale = useTransform(scrollYProgress, [0.85, 1], [0.8, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

  return (
    <div className="relative w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden">
      {/* The Horizon Line Turning Horizontal */}
      <motion.div 
        style={{ scaleX: useTransform(scrollYProgress, [0.85, 0.95], [0, 1]), opacity }}
        className="absolute top-1/2 left-0 w-full h-[1px] bg-[#0B2D72] origin-center z-10"
      ></motion.div>

      {/* Golden Glow Background Injection */}
      <motion.div 
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 bg-[#F6E7BC] z-0 mix-blend-multiply"
      ></motion.div>

      <motion.div style={{ opacity, y, scale }} className="z-20 text-center flex flex-col items-center px-6">
        <h4 className="font-mono text-sm tracking-[0.2em] text-[#0B2D72] uppercase mb-6 bg-[#F8F7F4]/50 px-4 py-1 rounded-full backdrop-blur-sm">
          Since Then
        </h4>
        <h2 className="font-display text-5xl md:text-8xl font-bold tracking-tighter uppercase text-[#0B2D72] mb-8">
          The Horizon
        </h2>
        <p className="font-body text-xl md:text-2xl text-[#0B2D72]/80 leading-relaxed max-w-2xl font-light">
          Sailing across VC, Market Making, and AI. The journey continues.
        </p>
      </motion.div>
    </div>
  );
};

const ScrollNarrative = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Spine growing effect
  const spineHeight = useSpring(useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Background color shift for the climax
  const bgColor = useTransform(scrollYProgress, [0.85, 0.95], ["#F8F7F4", "#F6E7BC"]);

  return (
    <motion.div 
      ref={containerRef} 
      style={{ backgroundColor: bgColor }}
      className="relative w-full transition-colors duration-1000 ease-in-out"
    >
      {/* Intro Header */}
      <div className="w-full h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 relative z-20">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter text-text-primary"
        >
          The Journey
        </motion.h1>
        <motion.div 
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.8, duration: 1, ease: "circOut" }}
          className="w-[1px] h-32 bg-[#0B2D72] mt-12 origin-top"
        ></motion.div>
      </div>

      {/* The Central Spine */}
      <div className="absolute left-1/2 top-[100vh] bottom-[100vh] w-[1px] -translate-x-1/2 hidden md:block z-0 pointer-events-none">
        <div className="w-full h-full bg-gray-200"></div>
        <motion.div 
          style={{ height: spineHeight }}
          className="absolute top-0 left-0 w-full bg-[#0B2D72] origin-top"
        ></motion.div>
      </div>

      {/* The Timeline */}
      <div className="relative w-full max-w-7xl mx-auto z-10 pt-32 pb-64">
        {MILESTONES.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}
      </div>

      {/* The Climax */}
      <HorizonClimax scrollYProgress={scrollYProgress} />
    </motion.div>
  );
};

export default ScrollNarrative;
