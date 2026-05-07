import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import Lenis from 'lenis';

const getUrl = (id, w) => `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

// Image references
const imgYellowBags = getUrl("photo-1565891741441-64926e441838", 800);
const imgPandemic = [getUrl("photo-1576091160550-2173dba999ef", 800), getUrl("photo-1499914485622-a88fac536970", 800), getUrl("photo-1635776062764-e025521e3df3", 800)];
const imgNeurotech = getUrl("photo-1542744173-8e7e53415bb0", 800);
const imgWeb3 = [getUrl("photo-1517694712202-14dd9538aa97", 800), getUrl("photo-1521737604893-d14cc237f11d", 800), getUrl("photo-1639762681485-074b7f938ba0", 800)];
const imgNewTribe = getUrl("photo-1556761175-5973dc0f32e7", 800);
const imgBestVC = [getUrl("photo-1505373877841-8d25f7d46678", 800), getUrl("photo-1567427017947-545c5f8d16ad", 800), getUrl("photo-1540575467063-178a50c2df87", 800)];
const imgProjects = [getUrl("photo-1551288049-bebda4e38f71", 800), getUrl("photo-1552664730-d307ca884978", 800), getUrl("photo-1614332287897-cdc485fa562d", 800)];
const imgCities = [getUrl("photo-1436491865332-7a61a109cc05", 800), getUrl("photo-1512453979798-5ea266f8880c", 800), getUrl("photo-1525625293386-3f8f99389edd", 800), getUrl("photo-1488646953014-85cb44e25828", 800), getUrl("photo-1502920917128-1aa500764cbd", 800)];
const imgLeo = getUrl("photo-1450101499163-c8848c66ca85", 800);
const imgEvents = [getUrl("photo-1492684223066-81342ee5ff30", 800), getUrl("photo-1505236858219-8359eb29e329", 800), getUrl("photo-1519671482749-fd09be7ccebf", 800), getUrl("photo-1470229722913-7c0e2dbbafd3", 800), getUrl("photo-1511578314322-379afb476865", 800)];
const imgFirms = [getUrl("photo-1486325212027-8081e485255e", 800), getUrl("photo-1497366216548-37526070297c", 800), getUrl("photo-1497366811353-6870744d04b2", 800)];
const imgNodo = getUrl("photo-1554224155-6726b3ff858f", 800);
const imgYellowCap = getUrl("photo-1496588152823-86ff7695e68f", 800);
const imgMarried = [getUrl("photo-1519741497674-611481863552", 800), getUrl("photo-1525258946800-98cfd641d0de", 800), getUrl("photo-1606216794074-735e91aa5c44", 800), getUrl("photo-1519225421980-715cb0215aed", 800)];
const imgSailing = [getUrl("photo-1500627964684-141351970a7f", 800), getUrl("photo-1507525428034-b723cf961d3e", 800), getUrl("photo-1502163140606-888448ae8cfe", 800), getUrl("photo-1493558103817-58b2924bce98", 800)];

const BEATS = [
  { type: "beat", eyebrow: "01. 2018", year: "2018", headline: "Yellow Bags shuts down.", body: "The first lesson — that conviction without distribution is just a hobby.", images: [imgYellowBags] },
  { type: "beat", eyebrow: "EARLY 2020", year: "2020", headline: "Pandemic blockade. LinkedIn rants.", body: "Locked in, writing publicly for the first time. The audience came before the plan did.", images: imgPandemic },
  { type: "beat", eyebrow: "LATE 2020", year: "2020", headline: "Neurotech Design: 3 → 18.", body: "Built a team in the middle of a shutdown. Learned that culture compounds faster than headcount.", images: [imgNeurotech] },
  { type: "beat", eyebrow: "2021", year: "2021", headline: "Web3, freelance.", body: "Traded certainty for surface area. Every client was a tutorial in a new corner of the stack.", images: imgWeb3 },
  { type: "beat", eyebrow: "JUNE 2021", year: "2021", headline: "NewTribe Capital.", body: "The first real seat at the table. Thesis-writing replaced thesis-reading.", images: [imgNewTribe] },
  { type: "beat", eyebrow: "MARCH 2022", year: "2022", headline: "Best VC Award. 450+ KOLs.", body: "Distribution, finally on my side of the table. The network became the product.", images: imgBestVC },
  { type: "beat", eyebrow: "MARCH 2022", year: "2022", headline: "250+ projects. $200M+ AUM.", body: "Scale teaches you which of your instincts were actually principles.", images: imgProjects },
  { type: "beat", eyebrow: "DECEMBER 2022", year: "2022", headline: "14 cities in 12 months.", body: "Conferences as research. Every flight bought a lesson the deck couldn't.", images: imgCities },
  { type: "beat", eyebrow: "NOVEMBER 2023", year: "2023", headline: "$1.5M for Leo Ventures.", body: "Raising taught me more about clarity than any pitch I'd ever heard.", images: [imgLeo] },
  { type: "beat", eyebrow: "SEPTEMBER 2024", year: "2024", headline: "20+ global events, hosted.", body: "Convening became a form of investing — earlier than capital, often more lasting.", images: imgEvents },
  { type: "beat", eyebrow: "DECEMBER 2024", year: "2024", headline: "Three firms: Asva, Leo, DCF.", body: "Different theses, shared backbone. Learned to architect, not just operate.", images: imgFirms },
  { type: "beat", eyebrow: "JANUARY 2025", year: "2025", headline: "NODO. $10M Series A. Acquired.", body: "The full arc in one deal — early conviction, patient build, clean exit.", images: [imgNodo] },
  { type: "beat", eyebrow: "APRIL 2025", year: "2025", headline: "Yellow Capital. Portfolio Manager.", body: "Came back to the title I'd watched from the outside seven years earlier.", images: [imgYellowCap] },
  { type: "beat", eyebrow: "NOVEMBER 2025", year: "2025", headline: "Married.", body: "Some chapters are not professional.", images: imgMarried },
  { type: "beat-closing", eyebrow: "SINCE", year: "NOW", headline: "Sailing across VC, market making, AI.", body: "Three currents, one boat. Still learning which way the wind actually blows.", images: imgSailing },
];

const TESTIMONIALS = [
  { quote: "Vivek can hold three theses in his head at once and still remember what you ordered for dinner six months ago. That's the part most people miss about him.", attribution: "Arjun Mehta", context: "GP at a Singapore-based fund, friend since 2021", photo: getUrl("photo-1507003211169-0a1dd7228f2d", 600) },
  { quote: "He invested when nobody else would take the call. Then he kept showing up — not because the round was hot, but because he'd actually read the docs.", attribution: "Priya Krishnan", context: "Founder, NODO (acq. 2025)", photo: getUrl("photo-1494790108377-be9c29b29330", 600) },
  { quote: "We were sleeping on a Bangkok hotel floor in 2022 because the conference had overbooked. He was already drafting an investment memo on his phone. I knew then this wasn't going to be a normal career.", attribution: "Kabir Shah", context: "Co-founder, Leo Ventures", photo: getUrl("photo-1500648767791-00dcc994a43e", 600) },
  { quote: "The Yellow Bags story isn't a failure story to anyone who knows him. It's the first chapter. Every founder I've sent his way has come back saying, 'I wish my last investor had asked these questions.'", attribution: "Anika Rao", context: "Operating Partner, DCF Capital", photo: getUrl("photo-1438761681033-6461ffad8d80", 600) },
  { quote: "I've watched him build three firms in the time it takes most people to build a deck. The thing nobody writes about is how patient he is with the parts that don't show up on a CV.", attribution: "Rohan Iyer", context: "Childhood friend, now an unrelated professional witness", photo: getUrl("photo-1472099645785-5658abf4ff4e", 600) }
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

const CinematicImage = ({ src, alt, style }) => {
  return (
    <div className="cinematic-image w-full h-full" style={style}>
      <img src={src} alt={alt || "visual"} loading="lazy" />
    </div>
  );
};

const useTilt = (maxRotation = 5) => {
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

const BeatImageStack = ({ images, beatProgress, isBeat14 }) => {
  const { springX, springY, handleMouseMove, handleMouseLeave } = useTilt(5);
  const N = images.length;
  
  const borderStyle = isBeat14 ? { borderColor: 'rgba(212, 168, 87, 0.3)' } : {};

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ amount: 0.5 }}
      transition={{ opacity: { duration: 0.7 }, scale: { duration: 0.7, ease: easeOutExpo }, delay: 0.12 }}
      className="w-full aspect-[4/5] max-w-[640px] max-h-[80vh] relative overflow-hidden rounded-[2px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1400, rotateX: springX, rotateY: springY, border: '1px solid var(--hairline)', ...borderStyle }}
    >
      {images.map((src, i) => {
        const startVisible = i / N - 0.05;
        const fullyVisible = i / N;
        const startFadeOut = (i + 1) / N;
        const endFadeOut = (i + 1) / N + 0.05;

        // The first image starts visible. The last image stays visible.
        const inputRange = [
          Math.max(0, startVisible), 
          Math.max(0, fullyVisible), 
          Math.min(1, startFadeOut), 
          Math.min(1, endFadeOut)
        ];
        
        const outputRange = [
          i === 0 ? 1 : 0, 
          1, 
          i === N - 1 ? 1 : 1, 
          i === N - 1 ? 1 : 0
        ];

        const opacity = useTransform(beatProgress, inputRange, outputRange);
        
        return (
          <motion.div key={i} className="absolute inset-0" style={{ opacity }}>
            <CinematicImage src={src} alt="beat" style={{ border: 'none' }} />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

const TimelineSection = ({ beat, index, setActiveBeat }) => {
  const ref = useRef(null);
  const { scrollYProgress: beatProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const inView = useInView(ref, { amount: 0.5 });
  useEffect(() => { if (inView) setActiveBeat(index); }, [inView, index, setActiveBeat]);
  
  const isBeat14 = index === 13;

  return (
    <section ref={ref} className="w-full min-h-[100vh] max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-[38fr_62fr] gap-12 md:gap-[6vw] items-center relative snap-center snap-always z-10 py-12 md:py-0">
      <div className="flex flex-col justify-center h-full relative z-20">
        <BeatText delay={0} className="mb-[24px]">
          <p className="text-[0.75rem] uppercase tracking-[0.22em] font-display font-medium text-ink-soft">{beat.eyebrow}</p>
        </BeatText>
        <BeatText delay={0} className="mb-[32px]">
          <h2 className="text-[clamp(5rem,7vw,7.5rem)] font-serif text-ink leading-[0.9] tracking-[-0.04em]" style={{ fontVariationSettings: '"opsz" 144', fontStyle: 'italic', fontWeight: 300 }}>
            {beat.year}
          </h2>
        </BeatText>
        <BeatText delay={0.08} className="mb-[28px]">
          <h3 className="font-display font-medium text-ink leading-[1.1] tracking-[-0.02em] text-[clamp(2rem,3.5vw,2.875rem)]">{beat.headline}</h3>
        </BeatText>
        <BeatText delay={0.16} className="max-w-md">
          <p className="font-display font-normal text-[1.0625rem] text-ink leading-[1.55] tracking-normal opacity-100">{beat.body}</p>
        </BeatText>
      </div>

      <div className="flex items-center md:justify-end w-full h-[60vh] md:h-full relative z-10">
        <BeatImageStack images={beat.images} beatProgress={beatProgress} isBeat14={isBeat14} />
      </div>
    </section>
  );
};

const CinemaWallLander = ({ globalScrollYProgress }) => {
  const wallOpacity = useTransform(globalScrollYProgress, [0, 0.05, 0.06], [1, 1, 0]);
  const wallVisibility = useTransform(globalScrollYProgress, [0, 0.06, 0.07], ['visible', 'visible', 'hidden']);
  const wallPointerEvents = useTransform(globalScrollYProgress, [0, 0.06, 0.07], ['auto', 'auto', 'none']);
  const zIndex = useTransform(globalScrollYProgress, [0, 0.06, 0.07], [50, 50, -10]);
  
  const smudgeOpacity = useTransform(globalScrollYProgress, [0, 0.04], [1, 0]);

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
    <motion.section style={{ opacity: wallOpacity, visibility: wallVisibility, pointerEvents: wallPointerEvents, zIndex }} className="w-[100vw] h-[100vh] fixed top-0 left-0 bg-bg z-50">
      <div className="cinema-wall">
        {LANDER_IMAGES.map((src, i) => (
          <motion.div 
            key={i} 
            className={gridClasses[i]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: i * 0.04 }}
          >
            <img src={src} className="w-full h-full object-cover" style={{ filter: 'grayscale(100%) contrast(1.1) brightness(0.55)' }} alt="wall" />
          </motion.div>
        ))}
      </div>

      <motion.div style={{ opacity: smudgeOpacity }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
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
            <div className="relative w-[1px] h-[48px] overflow-hidden" style={{ backgroundColor: 'rgba(242, 239, 233, 0.6)' }}>
              <motion.div animate={{ y: ["-100%", "100%", "100%"], opacity: [1, 1, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-accent" />
            </div>
            <span className="text-[0.6875rem] font-display font-medium uppercase tracking-[0.3em] text-ink-soft mt-4">SCROLL</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

const TestimonialsSection = () => {
  const trackRef = useRef(null);
  
  const handleWheel = (e) => {
    if (!trackRef.current) return;
    if (e.deltaY !== 0) {
      e.preventDefault();
      trackRef.current.scrollLeft += e.deltaY;
    }
  };

  const handleMouseDown = (e) => {
    if (!trackRef.current) return;
    let startX = e.pageX - trackRef.current.offsetLeft;
    let scrollLeft = trackRef.current.scrollLeft;
    const mouseMoveHandler = (ev) => {
      ev.preventDefault();
      const x = ev.pageX - trackRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      trackRef.current.scrollLeft = scrollLeft - walk;
    };
    const mouseUpHandler = () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
    };
    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseup', mouseUpHandler);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (el) {
      el.addEventListener('wheel', handleWheel, { passive: false });
      return () => el.removeEventListener('wheel', handleWheel);
    }
  }, []);

  return (
    <section className="w-full bg-bg relative z-10 py-[8vh] min-h-[100vh]">
      <div className="flex flex-col items-center justify-center mb-[48px]">
        <BeatText delay={0} className="mb-[12px]">
          <p className="text-[0.75rem] uppercase tracking-[0.22em] font-display font-medium text-ink-soft text-center">INTERLUDE — VOICES</p>
        </BeatText>
        <WordFade text="Friends, on the record." className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-ink text-center mb-[48px]" style={{ fontVariationSettings: '"opsz" 144', fontStyle: 'italic', fontWeight: 300 }} delayOffset={0.1} />
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ amount: 0.5 }} transition={{ duration: 0.8, delay: 0.4, ease: easeOutExpo }} className="w-[80px] h-[1px] bg-hairline origin-center" />
      </div>
      
      <div 
        ref={trackRef} 
        className="testimonials-track"
        onMouseDown={handleMouseDown}
      >
        {TESTIMONIALS.map((t, i) => (
          <motion.div 
            key={i} 
            className="testimonial-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: easeOutExpo }}
          >
            <div className="w-full h-[280px] relative overflow-hidden">
              <img src={t.photo} className="w-full h-full object-cover" style={{ filter: 'grayscale(100%) contrast(1.1) brightness(0.85)' }} alt={t.attribution} />
              <div className="absolute inset-0 pointer-events-none mix-blend-multiply z-10" style={{ background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0.45) 100%)' }} />
            </div>
            <div className="flex-1 flex flex-col p-[32px_28px]">
              <div className="font-serif text-[1.5rem] text-accent mb-[12px]" style={{ fontVariationSettings: '"opsz" 144', fontStyle: 'italic', fontWeight: 300 }}>—</div>
              <p className="font-serif text-[1.0625rem] text-ink leading-[1.4] flex-grow" style={{ fontVariationSettings: '"opsz" 144', fontStyle: 'italic', fontWeight: 300 }}>{t.quote}</p>
              <div className="mt-auto">
                <div className="w-[60px] h-[1px] mb-[16px]" style={{ backgroundColor: 'rgba(10, 196, 224, 0.6)' }}></div>
                <h4 className="font-display font-medium text-[0.875rem] text-ink">{t.attribution}</h4>
                <p className="font-display font-normal text-[0.75rem] text-ink-soft mt-[4px]">{t.context}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="flex justify-center mt-[32px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <p className="font-display font-medium text-[0.6875rem] uppercase tracking-[0.3em] text-ink-soft text-center flex items-center gap-2">
          DRAG OR SCROLL 
          <motion.span animate={{ x: [0, 8, 0], opacity: [1, 0.5, 1] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>→</motion.span>
        </p>
      </motion.div>
    </section>
  );
};

const Footer = () => (
  <section className="w-full min-h-[80vh] flex flex-col justify-center items-center bg-bg relative z-10 px-[clamp(24px,5vw,96px)] snap-end pt-32">
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
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ amount: 0.5 }} transition={{ duration: 0.6, delay: 0.8 }} className="w-full mt-[120px] pb-12">
      <div className="w-full h-[1px] bg-hairline"></div>
      <div className="flex justify-between items-center mt-6 w-full max-w-[1440px] mx-auto px-[clamp(24px,5vw,96px)]">
        <span className="font-display font-medium text-[0.6875rem] text-ink-faint">Vivek Mehata</span>
        <span className="font-serif text-[0.6875rem] text-ink-faint" style={{ fontVariationSettings: '"opsz" 144', fontStyle: 'italic', fontWeight: 300 }}>© 2026 — All chapters in progress.</span>
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
  const beatsRef = useRef(null);
  const { scrollYProgress: beatsScroll } = useScroll({ target: beatsRef, offset: ["start start", "end end"] });
  
  const trueBgColor = useTransform(beatsScroll, [0.84, 0.93], ["#0E0E10", "#1A1410"]);
  const horizonScaleY = useTransform(beatsScroll, [0, 0.04, 0.10, 1], [0, 0, 0.08, 1]);
  
  useEffect(() => {
    return beatsScroll.onChange((latest) => {
      if (latest > 0.99 && !hasClosed) {
        setIsClosing(true);
        setTimeout(() => setHasClosed(true), 1000); // Wait for rotation
      }
    });
  }, [beatsScroll, hasClosed]);

  const horizonOpacity = useTransform(scrollYProgress, [0.65, 0.7, 0.9, 1], [0.5, 0.5, 0.5, 0]);

  return (
    <div ref={containerRef} className="relative w-full">
      <motion.div className="fixed inset-0 z-[-1] pointer-events-none transition-colors duration-200" style={{ backgroundColor: trueBgColor }} />
      <CinemaWallLander globalScrollYProgress={scrollYProgress} />

      <div ref={beatsRef} className="relative max-w-[1440px] mx-auto px-[clamp(24px,5vw,96px)] pt-[100vh]">
        <div className="fixed top-0 bottom-0 left-[50%] -translate-x-[50%] z-0 pointer-events-none flex justify-center w-[20px]">
          <motion.div 
            className="absolute top-0 w-[1.5px] bg-ink origin-top"
            style={{ height: '100vh', scaleY: isClosing ? 0.6 : horizonScaleY, rotate: isClosing ? 90 : 0, opacity: horizonOpacity }}
            transition={{ rotate: { duration: 1, ease: [0.83, 0, 0.17, 1] }, scaleY: { duration: 1, ease: [0.83, 0, 0.17, 1] } }}
          />
          {BEATS.map((_, i) => {
            const isActive = activeBeat === i;
            const dotOpacity = useTransform(beatsScroll, [0.04, 0.10], [0, 1]);
            const topPercent = (i / (BEATS.length - 1)) * 100;
            const adjustedTop = 8 + (topPercent * 0.92);
            return (
              <motion.div
                key={i}
                className={`absolute rounded-full border border-ink ${isActive ? 'bg-accent border-accent w-[6px] h-[6px]' : 'bg-transparent w-[4px] h-[4px] border-ink-faint'}`}
                style={{ top: `${adjustedTop}vh`, opacity: isClosing ? 0 : dotOpacity, x: "-50%" }}
                animate={{ scale: isActive ? 1.4 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            );
          })}
        </div>

        {hasClosed && activeBeat === BEATS.length - 1 && (
          <motion.div
            className="fixed left-1/2 top-1/2 -translate-x-1/2 mt-8 z-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="font-serif text-[1rem] text-ink-soft" style={{ fontVariationSettings: '"opsz" 144', fontStyle: 'italic', fontWeight: 300 }}>— still sailing</span>
          </motion.div>
        )}

        <div className="relative z-10 pb-[10vh]">
          {BEATS.map((beat, i) => (
             <TimelineSection key={i} index={i} beat={beat} setActiveBeat={setActiveBeat} />
          ))}
        </div>
      </div>
      
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default ScrollNarrative;
