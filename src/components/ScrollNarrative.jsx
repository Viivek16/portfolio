import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import Lenis from 'lenis';

const getUrl = (id, w) => `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

const BEATS = [
  { type: "solo", eyebrow: "01. 2018", year: "2018", headline: "Yellow Bags shuts down.", body: "The first lesson — that conviction without distribution is just a hobby.", image: getUrl("photo-1565891741441-64926e441838", 800) },
  { type: "grid", eyebrow: "EARLY 2020", year: "2020", headline: "Pandemic blockade. LinkedIn rants.", body: "Locked in, writing publicly for the first time. The audience came before the plan did.", images: [getUrl("photo-1584824486509-112e4181ff6b", 600), getUrl("photo-1593642632559-0c6d3fc62b89", 500), getUrl("photo-1518791841217-8f162f1e1131", 450), getUrl("photo-1517842645767-c639042777db", 380)] },
  { type: "solo", eyebrow: "LATE 2020", year: "2020", headline: "Neurotech Design: 3 → 18.", body: "Built a team in the middle of a shutdown. Learned that culture compounds faster than headcount.", image: getUrl("photo-1542744173-8e7e53415bb0", 800) },
  { type: "grid", eyebrow: "2021", year: "2021", headline: "Web3, freelance.", body: "Traded certainty for surface area. Every client was a tutorial in a new corner of the stack.", images: [getUrl("photo-1517694712202-14dd9538aa97", 600), getUrl("photo-1521737604893-d14cc237f11d", 500), getUrl("photo-1639762681485-074b7f938ba0", 450), getUrl("photo-1455390582262-044cdead277a", 380)] },
  { type: "solo", eyebrow: "JUNE 2021", year: "2021", headline: "NewTribe Capital.", body: "The first real seat at the table. Thesis-writing replaced thesis-reading.", image: getUrl("photo-1556761175-5973dc0f32e7", 800) },
  { type: "grid", eyebrow: "MARCH 2022", year: "2022", headline: "Best VC Award. 450+ KOLs.", body: "Distribution, finally on my side of the table. The network became the product.", images: [getUrl("photo-1505373877841-8d25f7d46678", 600), getUrl("photo-1567427017947-545c5f8d16ad", 500), getUrl("photo-1540575467063-178a50c2df87", 450), getUrl("photo-1478737270239-2f02b77fc618", 380)] },
  { type: "grid", eyebrow: "MARCH 2022", year: "2022", headline: "250+ projects. $200M+ AUM.", body: "Scale teaches you which of your instincts were actually principles.", images: [getUrl("photo-1551288049-bebda4e38f71", 600), getUrl("photo-1552664730-d307ca884978", 500), getUrl("photo-1614332287897-cdc485fa562d", 450), getUrl("photo-1559526324-4b87b5e36e44", 380)] },
  { type: "memory", eyebrow: "DECEMBER 2022", year: "2022", headline: "14 cities in 12 months.", body: "Conferences as research. Every flight bought a lesson the deck couldn't.", images: [getUrl("photo-1436491865332-7a61a109cc05", 500), getUrl("photo-1512453979798-5ea266f8880c", 500), getUrl("photo-1525625293386-3f8f99389edd", 500), getUrl("photo-1488646953014-85cb44e25828", 500), getUrl("photo-1502920917128-1aa500764cbd", 500), getUrl("photo-1483450388369-9ed95738483c", 500), getUrl("photo-1542296332-2e4473faf563", 500), getUrl("photo-1502602898657-3e91760cbb34", 500)] },
  { type: "solo", eyebrow: "NOVEMBER 2023", year: "2023", headline: "$1.5M for Leo Ventures.", body: "Raising taught me more about clarity than any pitch I'd ever heard.", image: getUrl("photo-1450101499163-c8848c66ca85", 800) },
  { type: "memory", eyebrow: "SEPTEMBER 2024", year: "2024", headline: "20+ global events, hosted.", body: "Convening became a form of investing — earlier than capital, often more lasting.", images: [getUrl("photo-1492684223066-81342ee5ff30", 500), getUrl("photo-1540575467063-178a50c2df87", 500), getUrl("photo-1519671482749-fd09be7ccebf", 500), getUrl("photo-1470229722913-7c0e2dbbafd3", 500), getUrl("photo-1511578314322-379afb476865", 500), getUrl("photo-1530023367847-a683933f4172", 500), getUrl("photo-1505236858219-8359eb29e329", 500), getUrl("photo-1522158637959-30385a09e0da", 500)] },
  { type: "grid", eyebrow: "DECEMBER 2024", year: "2024", headline: "Three firms: Asva, Leo, DCF.", body: "Different theses, shared backbone. Learned to architect, not just operate.", images: [getUrl("photo-1486325212027-8081e485255e", 600), getUrl("photo-1497366216548-37526070297c", 500), getUrl("photo-1497366811353-6870744d04b2", 450), getUrl("photo-1554224155-6726b3ff858f", 380)] },
  { type: "solo", eyebrow: "JANUARY 2025", year: "2025", headline: "NODO. $10M Series A. Acquired.", body: "The full arc in one deal — early conviction, patient build, clean exit.", image: getUrl("photo-1554224155-6726b3ff858f", 800) },
  { type: "solo", eyebrow: "APRIL 2025", year: "2025", headline: "Yellow Capital. Portfolio Manager.", body: "Came back to the title I'd watched from the outside seven years earlier.", image: getUrl("photo-1496588152823-86ff7695e68f", 800) },
  { type: "memory", eyebrow: "NOVEMBER 2025", year: "2025", headline: "Married.", body: "Some chapters are not professional.", images: [getUrl("photo-1519741497674-611481863552", 500), getUrl("photo-1525258946800-98cfd641d0de", 500), getUrl("photo-1606216794074-735e91aa5c44", 500), getUrl("photo-1519225421980-715cb0215aed", 500), getUrl("photo-1511795409834-ef04bbd61622", 500), getUrl("photo-1583939003579-730e3918a45a", 500), getUrl("photo-1465495976277-4387d4b0b4c6", 500), getUrl("photo-1469371670807-013ccf25f16a", 500)] },
  { type: "memory-closing", eyebrow: "SINCE", year: "NOW", headline: "Sailing across VC, market making, AI.", body: "Three currents, one boat. Still learning which way the wind actually blows.", images: [getUrl("photo-1500627964684-141351970a7f", 500), getUrl("photo-1507525428034-b723cf961d3e", 500), getUrl("photo-1502163140606-888448ae8cfe", 500), getUrl("photo-1493558103817-58b2924bce98", 500), getUrl("photo-1505142468610-359e7d316be0", 500), getUrl("photo-1518837695005-2083093ee35b", 500), getUrl("photo-1496950866446-3253e1470e8e", 500), getUrl("photo-1483728642387-6c3bdd6c93e5", 500)] },
];

const TESTIMONIALS = [
  { layout: "A", quote: "Vivek can hold three theses in his head at once and still remember what you ordered for dinner six months ago. That's the part most people miss about him.", attribution: "Arjun Mehta · GP at a Singapore-based fund, friend since 2021", photo: getUrl("photo-1507003211169-0a1dd7228f2d", 600) },
  { layout: "B", quote: "He invested when nobody else would take the call. Then he kept showing up — not because the round was hot, but because he'd actually read the docs.", attribution: "Priya Krishnan · Founder, NODO (acq. 2025)", photo: getUrl("photo-1494790108377-be9c29b29330", 600) },
  { layout: "A", quote: "We were sleeping on a Bangkok hotel floor in 2022 because the conference had overbooked. He was already drafting an investment memo on his phone. I knew then this wasn't going to be a normal career.", attribution: "Kabir Shah · Co-founder, Leo Ventures", photo: getUrl("photo-1500648767791-00dcc994a43e", 600) },
  { layout: "B", quote: "The Yellow Bags story isn't a failure story to anyone who knows him. It's the first chapter. Every founder I've sent his way has come back saying, 'I wish my last investor had asked these questions.'", attribution: "Anika Rao · Operating Partner, DCF Capital", photo: getUrl("photo-1438761681033-6461ffad8d80", 600) },
  { layout: "A", quote: "I've watched him build three firms in the time it takes most people to build a deck. The thing nobody writes about is how patient he is with the parts that don't show up on a CV.", attribution: "Rohan Iyer · Childhood friend, now an unrelated professional witness", photo: getUrl("photo-1472099645785-5658abf4ff4e", 600) }
];

const LANDER_IMAGES = [
  getUrl("photo-1492684223066-81342ee5ff30", 500), getUrl("photo-1517694712202-14dd9538aa97", 500), getUrl("photo-1525625293386-3f8f99389edd", 500), getUrl("photo-1556761175-5973dc0f32e7", 500),
  getUrl("photo-1505373877841-8d25f7d46678", 500), getUrl("photo-1502602898657-3e91760cbb34", 500), getUrl("photo-1450101499163-c8848c66ca85", 500), getUrl("photo-1496588152823-86ff7695e68f", 500),
  getUrl("photo-1551288049-bebda4e38f71", 500), getUrl("photo-1500627964684-141351970a7f", 500), getUrl("photo-1542744173-8e7e53415bb0", 500), getUrl("photo-1565891741441-64926e441838", 500),
  getUrl("photo-1486325212027-8081e485255e", 500), getUrl("photo-1511795409834-ef04bbd61622", 500), getUrl("photo-1483450388369-9ed95738483c", 500), getUrl("photo-1505142468610-359e7d316be0", 500)
];

const easeOutExpo = [0.22, 1, 0.36, 1];

const BeatText = ({ children, delay = 0, className, style, inViewAmount = 0.5 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    viewport={{ amount: inViewAmount, margin: "0px 0px -20% 0px" }}
    transition={{ duration: 0.6, ease: easeOutExpo, delay }}
    className={className}
    style={style}
  >
    {children}
  </motion.div>
);

const WordFade = ({ text, delayOffset = 0, className, style }) => {
  const words = text.split(" ");
  return (
    <h3 className={className} style={style}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.5 }}
          transition={{ duration: 0.6, delay: delayOffset + (i * 0.06), ease: easeOutExpo }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </h3>
  );
};

const CinematicImage = ({ src, alt, className, style, isWarm = false, isBW = false, imgStyle }) => {
  const wrapperClass = `cinematic-image-wrapper ${isWarm ? 'warm-vignette' : ''} ${className || ''}`;
  const baseFilter = isBW 
    ? "grayscale(100%) contrast(1.05) saturate(0) brightness(1.02)" 
    : "contrast(1.05) saturate(0.92) brightness(1.02)";
  
  return (
    <div className={wrapperClass} style={style}>
      <img 
        src={src} 
        alt={alt || "visual"} 
        className="w-full h-full object-cover" 
        style={{ filter: baseFilter, ...imgStyle }} 
        loading="lazy" 
      />
    </div>
  );
};

const useTilt = (maxRotation = 6) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });
  const handleMouseMove = (e) => {
    if (!e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const yPct = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setRotateX(-yPct * maxRotation);
    setRotateY(xPct * maxRotation);
  };
  const handleMouseLeave = () => { setRotateX(0); setRotateY(0); };
  return { springX, springY, handleMouseMove, handleMouseLeave };
};

const SoloBeat = ({ image, headline, delay = 0.12 }) => {
  const { springX, springY, handleMouseMove, handleMouseLeave } = useTilt(6);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      viewport={{ amount: 0.5 }}
      transition={{ opacity: { duration: 0.7 }, scale: { duration: 0.7, ease: easeOutExpo }, delay }}
      className="w-full max-w-[760px] aspect-[4/5] mx-auto relative rounded-[2px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200, rotateX: springX, rotateY: springY }}
    >
      <CinematicImage src={image} alt={headline} className="w-full h-[80vh] max-h-[880px] rounded-[2px]" />
    </motion.div>
  );
};

const GridBeat = ({ images, delay = 0.12 }) => {
  const { springX, springY, handleMouseMove, handleMouseLeave } = useTilt(4);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], [-24, 24]);
  const yB = useTransform(scrollYProgress, [0, 1], [32, -32]);
  const yC = useTransform(scrollYProgress, [0, 1], [-16, 16]);
  const yD = useTransform(scrollYProgress, [0, 1], [24, -24]);

  const configs = [
    { src: images[0], top: '0', right: '0', width: '60%', aspectRatio: '4/5', zIndex: 3, delay: 0, y: yA },
    { src: images[1], top: '18%', left: '0', width: '50%', aspectRatio: '1/1', zIndex: 2, delay: 0.1, y: yB },
    { src: images[2], bottom: '8%', right: '12%', width: '45%', aspectRatio: '3/4', zIndex: 4, delay: 0.18, y: yC },
    { src: images[3], bottom: '0', left: '8%', width: '38%', aspectRatio: '1/1', zIndex: 1, delay: 0.26, y: yD },
  ];

  return (
    <motion.div
      ref={containerRef}
      className="w-[56vw] max-w-[720px] h-[78vh] max-h-[820px] mx-auto relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1400, rotateX: springX, rotateY: springY }}
    >
      {configs.map((img, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.5 }}
          transition={{ opacity: { duration: 0.6 }, scale: { duration: 0.6, ease: easeOutExpo }, delay: delay + img.delay }}
          className="absolute border border-hairline rounded-[2px] overflow-hidden"
          style={{ 
            top: img.top, bottom: img.bottom, left: img.left, right: img.right, 
            width: img.width, aspectRatio: img.aspectRatio, zIndex: img.zIndex, y: img.y,
            maskImage: 'radial-gradient(ellipse at center, black 55%, black 75%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 55%, black 75%, transparent 100%)'
          }}
        >
          <CinematicImage src={img.src} alt={`grid-${idx}`} className="w-full h-full" />
        </motion.div>
      ))}
    </motion.div>
  );
};

const MemoryImage = ({ img, idx, scrollYProgress, isBeat14, isClosing }) => {
  const isSlow = isBeat14;
  const multiplier = isSlow ? 1.5 : 1.0;
  
  // Base intervals
  const baseIn = [0.00, 0.05, 0.12, 0.18, 0.25, 0.32, 0.40, 0.48][idx];
  const fadeDur = 0.10 * multiplier;
  const holdDur = (0.55 - 0.10) * multiplier; // approx 0.45 hold
  
  const inStart = baseIn;
  const inEnd = inStart + fadeDur;
  const outStart = inEnd + holdDur;
  const outEnd = outStart + fadeDur;

  const opacity = useTransform(scrollYProgress, [inStart, inEnd, outStart, outEnd], [0, 0.85, 0.85, 0]);
  
  // Drift: alternating
  const driftDir = idx % 2 === 0 ? 1 : -1;
  const baseDrift = useTransform(scrollYProgress, [0, 1], [-20 * driftDir, 20 * driftDir]);
  
  // Sunset dissolve for Beat 15
  const dissolveY = useTransform(scrollYProgress, [0.7, 1], [0, 200]);
  const y = isClosing ? useTransform(() => baseDrift.get() + dissolveY.get()) : baseDrift;
  
  // For Beat 15, we force fade out towards 1.0 if not already
  const closingOpacity = useTransform(scrollYProgress, [0.7, 0.95], [opacity.get(), 0]);
  const finalOpacity = isClosing ? useTransform(() => Math.min(opacity.get(), closingOpacity.get())) : opacity;

  return (
    <motion.div
      className="absolute border border-hairline rounded-[2px] overflow-hidden"
      style={{ 
        top: img.top, left: img.left, width: img.width, aspectRatio: img.aspectRatio, 
        rotate: img.rotate, opacity: finalOpacity, y,
        maskImage: 'radial-gradient(ellipse at center, black 55%, black 75%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 55%, black 75%, transparent 100%)'
      }}
    >
      <CinematicImage src={img.src} alt="memory" className="w-full h-full" isWarm={isBeat14} />
    </motion.div>
  );
};

const MemoryBeat = ({ images, isBeat14, isClosing }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  
  const configs = [
    { top: '8%', left: '12%', width: '38%', aspectRatio: '4/5', rotate: -2 },
    { top: '4%', left: '58%', width: '32%', aspectRatio: '1/1', rotate: 1.5 },
    { top: '28%', left: '38%', width: '30%', aspectRatio: '3/4', rotate: -1 },
    { top: '22%', left: '72%', width: '26%', aspectRatio: '4/5', rotate: 2.5 },
    { top: '50%', left: '8%', width: '34%', aspectRatio: '1/1', rotate: 1 },
    { top: '56%', left: '48%', width: '30%', aspectRatio: '3/4', rotate: -2 },
    { top: '72%', left: '24%', width: '28%', aspectRatio: '4/5', rotate: 1.5 },
    { top: '78%', left: '64%', width: '32%', aspectRatio: '1/1', rotate: -1.5 },
  ];

  return (
    <div ref={containerRef} className="absolute right-0 top-0 w-[50vw] h-[100vh] -mr-[4vw] pointer-events-none">
      {configs.map((cfg, idx) => (
        <MemoryImage key={idx} img={{...cfg, src: images[idx]}} idx={idx} scrollYProgress={scrollYProgress} isBeat14={isBeat14} isClosing={isClosing} />
      ))}
    </div>
  );
};

const TimelineSection = ({ beat, index, setActiveBeat }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });
  useEffect(() => { if (inView) setActiveBeat(index); }, [inView, index, setActiveBeat]);
  const isBeat14 = index === 13;
  const isClosing = beat.type === "memory-closing";

  return (
    <section ref={ref} className="w-full min-h-[720px] h-[100vh] grid grid-cols-1 md:grid-cols-2 gap-[96px] relative snap-center snap-always z-10 py-12 md:py-0">
      <div className="flex flex-col justify-center h-full px-6 md:px-0 relative z-20">
        <BeatText delay={0} className="mb-4">
          <p className="text-[0.75rem] uppercase tracking-[0.18em] font-display font-medium text-ink-soft">{beat.eyebrow}</p>
        </BeatText>
        <BeatText delay={0} className="mb-6">
          <h2 className="text-[4.5rem] md:text-[7.5rem] font-serif text-ink leading-[0.9] tracking-[-0.04em]" style={{ fontVariationSettings: '"opsz" 144', fontStyle: 'italic', fontWeight: 300 }}>
            {beat.year}
          </h2>
        </BeatText>
        <BeatText delay={0.08} className="mb-6 max-w-lg">
          <h3 className="text-[1.875rem] md:text-[2.75rem] font-display font-medium text-ink leading-[1.1] tracking-[-0.02em]">{beat.headline}</h3>
        </BeatText>
        <BeatText delay={0.16} className="max-w-md">
          <p className="text-[1rem] md:text-[1.0625rem] font-display font-normal text-ink leading-[1.55]">{beat.body}</p>
        </BeatText>
      </div>

      <div className={`flex items-center justify-center h-full px-6 md:pr-[4vw] md:pl-0 ${beat.type.startsWith('memory') ? 'static' : 'relative z-10'}`}>
        {beat.type === "solo" && <SoloBeat image={beat.image} headline={beat.headline} />}
        {beat.type === "grid" && <GridBeat images={beat.images} />}
        {beat.type.startsWith("memory") && <MemoryBeat images={beat.images} isBeat14={isBeat14} isClosing={isClosing} />}
      </div>
    </section>
  );
};

const CinemaWallLander = ({ globalScrollYProgress }) => {
  const opacity = useTransform(globalScrollYProgress, [0, 0.06], [1, 0]);
  const smudgeOpacity = useTransform(globalScrollYProgress, [0, 0.04], [1, 0]);

  // Layout grid mappings for the 16 images
  const gridClasses = [
    "col-start-1 col-end-3 row-start-1 row-end-3",
    "col-start-3 col-end-4 row-start-1 row-end-2",
    "col-start-4 col-end-6 row-start-1 row-end-2",
    "col-start-6 col-end-7 row-start-1 row-end-3",
    "col-start-3 col-end-5 row-start-2 row-end-3",
    "col-start-5 col-end-6 row-start-2 row-end-4",
    "col-start-1 col-end-2 row-start-3 row-end-4",
    "col-start-2 col-end-4 row-start-3 row-end-4",
    "col-start-4 col-end-5 row-start-3 row-end-4",
    "col-start-6 col-end-7 row-start-3 row-end-4",
    "col-start-1 col-end-3 row-start-4 row-end-5",
    "col-start-3 col-end-4 row-start-4 row-end-5",
    "col-start-4 col-end-5 row-start-4 row-end-5",
    "col-start-5 col-end-6 row-start-4 row-end-5",
    "col-start-6 col-end-7 row-start-4 row-end-5",
    "col-start-2 col-end-3 row-start-2 row-end-3"
  ];

  return (
    <motion.section style={{ opacity }} className="w-[100vw] h-[100vh] fixed top-0 left-0 bg-white z-30 pointer-events-none">
      <div className="cinema-wall">
        {LANDER_IMAGES.map((src, i) => (
          <motion.div 
            key={i} 
            className={gridClasses[i]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: i * 0.04 }}
          >
            <img src={src} className="w-full h-full object-cover grayscale contrast-95 brightness-105" alt="wall" />
          </motion.div>
        ))}
      </div>

      <motion.div style={{ opacity: smudgeOpacity }} className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }}
          className="text-smudge"
        ></motion.div>
        
        <div className="relative z-20 max-w-[880px] w-full flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.1 }}
            className="text-[0.75rem] font-display font-medium uppercase tracking-[0.22em] text-ink-soft mb-[48px] text-center"
          >
            AN EDITORIAL TIMELINE — 2018 / NOW
          </motion.p>

          <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-ink leading-[1.05] tracking-[-0.025em] text-center" style={{ fontVariationSettings: '"opsz" 144', fontStyle: 'italic', fontWeight: 300 }}>
            {"Every chapter taught me something the next one would test.".split(" ").map((word, i) => {
              const isTest = word === "test.";
              return (
                <motion.span
                  key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 + (i * 0.06), ease: easeOutExpo }}
                  className="inline-block mr-[0.25em]"
                  style={isTest ? { textDecoration: 'underline', textDecorationColor: 'var(--accent)', textDecorationThickness: '1px', textUnderlineOffset: '0.15em' } : {}}
                >
                  {word}
                </motion.span>
              );
            })}
          </h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.9 }} className="mt-[64px] flex flex-col items-center">
            <div className="relative w-[1px] h-[48px] bg-ink overflow-hidden">
              <motion.div animate={{ y: ["-100%", "100%", "100%"], opacity: [1, 1, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-accent" />
            </div>
            <span className="text-[0.6875rem] font-display font-medium uppercase tracking-[0.3em] text-ink-soft mt-4">SCROLL</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

const TestimonialSpread = ({ data, isEven }) => {
  const QuoteBlock = () => (
    <div className="flex flex-col justify-center h-full px-6">
      <div className="font-serif text-accent text-3xl mb-6 font-light">—</div>
      <WordFade text={data.quote} className="font-serif text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.25] text-ink mb-8" style={{ fontVariationSettings: '"opsz" 144', fontStyle: 'italic', fontWeight: 300 }} />
      <div className="w-[60px] h-[1px] bg-hairline mb-4"></div>
      <BeatText delay={0.4} inViewAmount={0.3}>
        <p className="font-display font-medium text-[0.875rem] text-ink">{data.attribution}</p>
      </BeatText>
    </div>
  );

  const PhotoBlock = () => (
    <div className="flex items-center justify-center h-full px-6">
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }} whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ amount: 0.5 }} transition={{ duration: 0.7, ease: easeOutExpo }}
        className="w-full max-w-[480px] aspect-[4/5] mx-auto rounded-[2px]"
      >
        <CinematicImage src={data.photo} isBW className="w-full h-full rounded-[2px]" />
      </motion.div>
    </div>
  );

  return (
    <section className="w-full min-h-[90vh] grid grid-cols-1 md:grid-cols-2 gap-[96px] relative snap-center max-w-[1440px] mx-auto px-[clamp(24px,5vw,96px)] py-12 md:py-0">
      {isEven ? <><PhotoBlock /><QuoteBlock /></> : <><QuoteBlock /><PhotoBlock /></>}
    </section>
  );
};

const TestimonialsSection = () => (
  <div className="w-full bg-white relative z-10 pt-32">
    <section className="w-full h-[100vh] flex flex-col items-center justify-center snap-center">
      <BeatText delay={0} className="mb-12">
        <p className="text-[0.75rem] uppercase tracking-[0.22em] font-display font-medium text-ink-soft text-center">INTERLUDE — VOICES</p>
      </BeatText>
      <WordFade text="Friends, on the record." className="font-serif text-[clamp(3rem,6.5vw,6rem)] text-ink text-center" style={{ fontVariationSettings: '"opsz" 144', fontStyle: 'italic', fontWeight: 300 }} delayOffset={0.1} />
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ amount: 0.5 }} transition={{ duration: 0.8, delay: 0.4, ease: easeOutExpo }} className="w-[80px] h-[1px] bg-ink mt-12 origin-center" />
    </section>
    {TESTIMONIALS.map((t, i) => <TestimonialSpread key={i} data={t} isEven={i % 2 !== 0} />)}
  </div>
);

const Footer = () => (
  <section className="w-full min-h-[80vh] flex flex-col justify-center items-center bg-white relative z-10 px-[clamp(24px,5vw,96px)] snap-end">
    <div className="max-w-[720px] w-full flex flex-col items-center">
      <BeatText delay={0} className="mb-12">
        <p className="text-[0.75rem] uppercase tracking-[0.22em] font-display font-medium text-ink-soft">STAY IN TOUCH</p>
      </BeatText>
      <WordFade text="Find me where the work lives." className="font-serif text-[clamp(2.25rem,4.5vw,4rem)] text-ink leading-[1.1] text-center mb-[72px]" style={{ fontVariationSettings: '"opsz" 144', fontStyle: 'italic', fontWeight: 300 }} delayOffset={0.2} />
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ amount: 0.5 }} transition={{ duration: 0.6, delay: 0.6 }} className="flex justify-center items-center">
        {['Twitter', 'LinkedIn', 'Email', 'Telegram', 'Calendar'].map((link, i, arr) => (
          <React.Fragment key={i}>
            <a href="#" className="font-display font-medium text-[0.9375rem] tracking-[0.02em] text-ink hover:underline decoration-accent decoration-1 underline-offset-4 transition-all duration-200">{link}</a>
            {i < arr.length - 1 && <div className="w-[1px] h-[24px] bg-hairline mx-[24px]"></div>}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ amount: 0.5 }} transition={{ duration: 0.6, delay: 0.8 }} className="w-full mt-[120px]">
      <div className="w-full h-[1px] bg-hairline"></div>
      <div className="flex justify-between items-center mt-6 w-full max-w-[1440px] mx-auto px-[clamp(24px,5vw,96px)]">
        <span className="font-display font-medium text-[0.6875rem] text-ink-soft">Vivek Mehata</span>
        <span className="font-serif text-[0.6875rem] text-ink-soft" style={{ fontVariationSettings: '"opsz" 144', fontStyle: 'italic', fontWeight: 300 }}>© 2026 — All chapters in progress.</span>
      </div>
    </motion.div>
  </section>
);

const ScrollNarrative = () => {
  const containerRef = useRef(null);
  const [activeBeat, setActiveBeat] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);
  
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  // Total Scroll calculations
  // Lander: 0 -> 0.04. Beats: 0.04 -> 0.6. Testimonials: 0.6 -> 0.9. Footer: 0.9 -> 1.0 (approximate mapping)
  // Real layout will dictate actual values, so we use precise triggers where possible.
  
  const bgColor = useTransform(scrollYProgress, [0.55, 0.6], ["#FFFFFF", "#FBEFD0"]);
  // Wait, the golden transition is specifically during Beat 14->15. Since we added a huge Testimonials + Footer, 
  // global scrollYProgress won't be 0.84->0.93 anymore. It will be much earlier in the total scroll.
  // Actually, tying bg to beat indices is safer, or we just eyeball the new scroll ratios.
  // Let's use a ref specifically wrapping the Beats.
  const beatsRef = useRef(null);
  const { scrollYProgress: beatsScroll } = useScroll({ target: beatsRef, offset: ["start start", "end end"] });
  const trueBgColor = useTransform(beatsScroll, [0.84, 0.93], ["#FFFFFF", "#FBEFD0"]);

  const horizonScaleY = useTransform(beatsScroll, [0, 0.04, 0.10, 1], [0, 0, 0.08, 1]);
  
  // Closing gesture triggers when beats finish.
  useEffect(() => {
    return beatsScroll.onChange((latest) => {
      // It should level AFTER beat 15 images dissolve (0.7 of beat 15). 
      // This is near 0.98 of beatsScroll. 
      if (latest > 0.98 && !hasClosed) {
        setIsClosing(true);
        setHasClosed(true);
      }
    });
  }, [beatsScroll, hasClosed]);

  // Horizon line opacity during Testimonials/Footer
  // We can track global scroll progress past the beats block
  const { scrollYProgress: postBeatsScroll } = useScroll({
    target: containerRef,
    offset: ["end center", "end end"] // triggers near footer
  });
  
  // It fades to 0.4 during testimonials. Actually, let's just use overall document scroll 
  const horizonOpacity = useTransform(scrollYProgress, [0.65, 0.7, 0.9, 1], [1, 0.4, 0.4, 0]);

  return (
    <div ref={containerRef} className="relative w-full bg-white">
      <motion.div className="fixed inset-0 z-[-1] pointer-events-none transition-colors duration-200" style={{ backgroundColor: trueBgColor }} />
      <CinemaWallLander globalScrollYProgress={scrollYProgress} />

      <div ref={beatsRef} className="relative max-w-[1440px] mx-auto px-[clamp(24px,5vw,96px)]">
        <div className="fixed top-0 bottom-0 left-[50%] -translate-x-[50%] z-0 pointer-events-none flex justify-center w-[20px]">
          <motion.div 
            className="absolute top-0 w-[1.5px] bg-ink origin-top"
            style={{ height: '100vh', scaleY: hasClosed ? 0.6 : horizonScaleY, rotate: hasClosed ? 90 : 0, opacity: horizonOpacity }}
            transition={{ rotate: { duration: 0.8, ease: [0.83, 0, 0.17, 1], delay: 0.3 }, scaleY: { duration: 0.8, ease: [0.83, 0, 0.17, 1], delay: 0.3 } }}
          />
          {BEATS.map((_, i) => {
            const isActive = activeBeat === i;
            const dotOpacity = useTransform(beatsScroll, [0.04, 0.10], [0, 1]);
            const topPercent = (i / (BEATS.length - 1)) * 100;
            const adjustedTop = 8 + (topPercent * 0.92);
            return (
              <motion.div
                key={i}
                className={`absolute rounded-full border border-ink ${isActive ? 'bg-accent border-accent w-[6px] h-[6px]' : 'bg-white w-[4px] h-[4px] border-ink-faint'}`}
                style={{ top: `${adjustedTop}vh`, opacity: hasClosed ? 0 : dotOpacity, x: "-50%" }}
                animate={{ scale: isActive ? 1.4 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            );
          })}
        </div>

        <motion.div
          className="fixed left-1/2 top-1/2 -translate-x-1/2 mt-8 z-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: hasClosed ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 1.1 }} // 0.3 pause + 0.8 rotate
        >
          <span className="font-serif text-[1rem] text-ink" style={{ fontVariationSettings: '"opsz" 144', fontStyle: 'italic', fontWeight: 300 }}>— still sailing</span>
        </motion.div>

        <div className="relative z-10 pb-[10vh]">
          {BEATS.map((beat, i) => (
             <TimelineSection key={i} index={i} beat={beat} setActiveBeat={setActiveBeat} />
          ))}
        </div>
      </div>
      
      {/* Post Timeline Sections */}
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default ScrollNarrative;
