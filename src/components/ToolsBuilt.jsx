import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

/* ────────────────────────────────────────────────────────────
   TUNING KNOBS — iterate here on the test link
──────────────────────────────────────────────────────────────*/
const RADIUS = 22;                       // card corner radius (px)
const CARD_ASPECT = "5 / 8";             // width / height — lower first number = taller card
const GAP = "clamp(16px, 1.6vw, 24px)";  // gap between cards

const TOOLS = [
  {
    name: "Triply",
    desc: "A travel OS — flights, visas and hotel bookings managed from one unified dashboard.",
    img: "/images/tools/triply.png?v=2", // appended cache-buster for new image
    url: "https://www.gotriply.xyz/",
  },
  {
    name: "YC Website",
    desc: "Yellow Capital's site — designed, built and shipped end to end.",
    img: "/images/tools/yc-website.png",
    url: "https://yc-website-v2.vercel.app/",
  },
  {
    name: "Yellow CRM",
    desc: "A Telegram-integrated CRM for active deals, pipelines and delivery.",
    img: "/images/tools/yellow-crm.png",
    url: null, // No link, card behaves as a static display
  },
  {
    name: "Tradepoint",
    desc: "A clean, intuitive frontend for Yellow Capital's token distribution platform.",
    img: "/images/tools/tradepoint.png",
    url: "https://tradepoint-v1.vercel.app/",
  },
];

function ToolCard({ tool, index, smoothProgress }) {
  const [hovered, setHovered] = useState(false);

  // Staggered bounds for the scroll entrance/exit animation
  const start = index * 0.16;
  const end = start + 0.45;
  
  // Mapped transforms driven by the smoothed scroll progress
  const opacity = useTransform(smoothProgress, [start, end], [0, 1]);
  const y = useTransform(smoothProgress, [start, end], [80, 0]);
  const rotateX = useTransform(smoothProgress, [start, end], [35, 0]);
  const scale = useTransform(smoothProgress, [start, end], [0.88, 1]);

  // 3D Tilt effect on hover (Emil Kowalski polish)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const tiltX = useSpring(mouseX, { stiffness: 400, damping: 30 });
  const tiltY = useSpring(mouseY, { stiffness: 400, damping: 30 });
  const rotateXHover = useTransform(tiltY, [0, 1], [6, -6]);
  const rotateYHover = useTransform(tiltX, [0, 1], [-6, 6]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };
  
  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const Component = tool.url ? motion.a : motion.div;

  return (
    // OUTER wrapper carries the scroll entrance (opacity + y + flip).
    <motion.div style={{ opacity, y, rotateX, scale, flex: "1 1 0", minWidth: 0, transformOrigin: "bottom center" }}>
      <Component
        {...(tool.url ? { href: tool.url, target: "_blank", rel: "noopener noreferrer" } : {})}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.96 }} // satisfying press state
        style={{
          position: "relative",
          display: "block",
          width: "100%",
          aspectRatio: CARD_ASPECT,
          borderRadius: RADIUS,
          clipPath: `inset(0 round ${RADIUS}px)`, // Prevents sharp corners breaking out on hover
          overflow: "hidden",
          textDecoration: "none",
          color: "inherit",
          background: "#0a1120",
          border: "1px solid rgba(255,255,255,0.08)",
          rotateX: rotateXHover,
          rotateY: rotateYHover,
          scale: hovered ? 1.02 : 1,
          transformPerspective: 1200,
          boxShadow: hovered
            ? "0 38px 84px -30px rgba(10,196,224,0.35), 0 0 0 1px rgba(10,196,224,0.20)"
            : "0 30px 70px -30px rgba(0,0,0,0.9)",
          transition: "scale .5s cubic-bezier(.16,1,.3,1), box-shadow .5s ease, border .5s ease",
          willChange: "transform",
        }}
      >
        {/* full-bleed screenshot, slow push-in on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 1.2s cubic-bezier(.16,1,.3,1)",
          }}
        >
          <img
            src={tool.img}
            alt={`${tool.name} — interface`}
            draggable={false}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        </div>

        {/* frosted gradient mask — strictly constrained to text area with a smooth blend out */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "100%",
            background: hovered 
              ? "linear-gradient(to top, rgba(5,9,16,0.95) 0%, rgba(6,10,18,0.7) 25%, transparent 50%)"
              : "linear-gradient(to top, rgba(5,9,16,0.9) 0%, rgba(6,10,18,0.3) 20%, transparent 45%)",
            WebkitMaskImage: "linear-gradient(to top, black 0%, black 25%, transparent 45%)",
            maskImage: "linear-gradient(to top, black 0%, black 25%, transparent 45%)",
            backdropFilter: hovered ? "blur(8px)" : "blur(0px)",
            WebkitBackdropFilter: hovered ? "blur(8px)" : "blur(0px)",
            transition: "backdrop-filter .5s ease, -webkit-backdrop-filter .5s ease",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* content — bottom-anchored; the title naturally rises as the grid un-collapses below it */}
        <div style={{ position: "absolute", left: 24, right: 24, bottom: 22, zIndex: 3 }}>
          <div
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(20px, 1.5vw, 25px)",
              lineHeight: 1.12,
              color: "#FFFFFF",
              textShadow: "0 2px 14px rgba(0,0,0,0.5)",
              transform: hovered ? "translateY(-4px)" : "translateY(0)",
              transition: "transform .5s cubic-bezier(.16,1,.3,1)",
            }}
          >
            {tool.name}
          </div>

          {/* grid 0fr → 1fr gives a seamless unfold */}
          <div
            style={{
              display: "grid",
              gridTemplateRows: hovered ? "1fr" : "0fr",
              transition: "grid-template-rows .6s cubic-bezier(.16,1,.3,1)",
            }}
          >
            <div style={{ overflow: "hidden" }}>
              <p
                style={{
                  margin: 0,
                  paddingTop: 12,
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 300,
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  color: "rgba(255,255,255,0.85)",
                  opacity: hovered ? 1 : 0,
                  transform: hovered ? "translateY(0)" : "translateY(8px)",
                  transition: "opacity .45s ease .08s, transform .5s cubic-bezier(.16,1,.3,1) .08s",
                }}
              >
                {tool.desc}
              </p>
              {tool.url && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    marginTop: 14,
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#0AC4E0",
                    opacity: hovered ? 1 : 0,
                    transform: hovered ? "translateY(0)" : "translateY(8px)",
                    transition: "opacity .45s ease .12s, transform .5s cubic-bezier(.16,1,.3,1) .12s",
                  }}
                >
                  Visit
                  <span
                    style={{
                      transform: hovered ? "translate(3px,-3px)" : "translate(0,0)",
                      transition: "transform .4s ease",
                    }}
                  >
                    ↗
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
      </Component>
    </motion.div>
  );
}

export default function ToolsBuilt() {
  const sectionRef = useRef(null);
  
  // Re-balanced trigger offset. Animates when user is past card 3 and section is fully engaged.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "start 0.35"], 
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 18,
    mass: 0.8,
    restDelta: 0.001
  });

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
        background: "#070C18",
        paddingLeft: "8vw",
        paddingRight: "8vw",
        paddingTop: "clamp(40px, 6vh, 68px)",
        paddingBottom: "clamp(48px, 7vh, 76px)",
        marginTop: "-15vh", // Pull section up to naturally eliminate dead scroll space from ThreePillars
        zIndex: 40, // Ensures it overlaps the sticky cards properly
      }}
    >
      <style>{`
        @media (max-width: 820px){
          .tools-built-rail{ flex-wrap: wrap; }
          .tools-built-rail > *{ flex: 1 1 calc(50% - 12px) !important; }
        }
        @media (max-width: 520px){
          .tools-built-rail > *{ flex: 1 1 100% !important; }
        }
      `}</style>

      {/* eyebrow */}
      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 500,
          fontSize: 12,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "#0AC4E0",
          marginBottom: "clamp(24px, 3.4vh, 40px)",
        }}
      >
        — Tools Built
      </div>

      <div 
        className="tools-built-rail" 
        style={{ 
          display: "flex", 
          gap: GAP, 
          width: "100%", 
          alignItems: "stretch", 
          perspective: "1200px" 
        }}
      >
        {TOOLS.map((tool, i) => (
          <ToolCard key={tool.name} tool={tool} index={i} smoothProgress={smoothProgress} />
        ))}
      </div>
    </section>
  );
}
