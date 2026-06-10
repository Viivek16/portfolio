import React, { useState } from "react";

/* ────────────────────────────────────────────────────────────
   TUNING KNOBS
──────────────────────────────────────────────────────────────*/
const SPEED_S = 42;          // seconds per full loop — slower = more ambient
const LOGO_HEIGHT = 30;      // rendered logo height (px)
const LOGO_GAP = "clamp(56px, 6vw, 96px)"; // horizontal space between logos
const LOGO_OPACITY = 0.45;   // resting opacity of the monochrome logos
const EDGE_FADE = "12%";     // width of the left/right dissolve masks

// ⚠️ REPLACE with the EXACT colors from Phase 1 recon:
const HERO_FLOOR = "#0B1120"; // color the Hero's bottom gradient resolves to
const STATS_TOP  = "#070C18"; // background color at the top of the Stats section

const BRANDS = [
  { name: "Yellow Capital",        img: "/images/brands/yellow-capital.png" },
  { name: "NewTribe Capital",      img: "/images/brands/newtribe.png" },
  { name: "Leo Ventures",          img: "/images/brands/leo-ventures.png" },
  { name: "Asva Capital",          img: "/images/brands/asva-capital.png" },
  { name: "Digital Consensus Fund", img: "/images/brands/dcf.png" },
  { name: "NODO",                  img: "/images/brands/nodo.png" },
  { name: "Nordek",                img: "/images/brands/nordek.png" },
  { name: "5ire",                  img: "/images/brands/5ire.png" },
  { name: "Neos Legal",            img: "/images/brands/neos-legal.png" },
  { name: "Kinetic Kollective",    img: "/images/brands/kk.png" },
  { name: "RAK DAO",               img: "/images/brands/rak-dao.png" },
];

export default function BrandStrip() {
  const [paused, setPaused] = useState(false);

  // The set is rendered TWICE inside one track; animating translateX by exactly
  // -50% creates a mathematically seamless infinite loop — no visible restart.
  const renderSet = (ariaHidden) =>
    BRANDS.map((b, i) => (
      <div
        key={(ariaHidden ? "dup-" : "") + b.name}
        aria-hidden={ariaHidden || undefined}
        style={{
          flex: "0 0 auto",
          display: "flex",
          alignItems: "center",
          paddingRight: LOGO_GAP,
        }}
      >
        <img
          src={b.img}
          alt={ariaHidden ? "" : b.name}
          draggable={false}
          loading="lazy"
          style={{
            height: LOGO_HEIGHT,
            width: "auto",
            display: "block",
            // Flattens every logo (any source color) to uniform soft white:
            filter: "brightness(0) invert(1)",
            opacity: LOGO_OPACITY,
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
      </div>
    ));

  return (
    <section
      aria-label="Brands worked with"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
        // Seamless bridge: hero floor → stats top. NO hard edges.
        background: `linear-gradient(180deg, ${HERO_FLOOR} 0%, ${STATS_TOP} 100%)`,
        paddingTop: "clamp(24px, 3.5vh, 40px)",
        paddingBottom: "clamp(28px, 4vh, 48px)",
      }}
    >
      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 500,
          fontSize: "12px",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "#0AC4E0",
          paddingLeft: "8vw",
          paddingRight: "8vw",
          marginBottom: "clamp(20px, 3vh, 32px)",
        }}
      >
        — BRANDS I'VE WORKED WITH
      </div>
      {/* keyframes scoped to this component only */}
      <style>{`
        @keyframes brandstrip-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .brandstrip-track { animation: none !important; }
        }
      `}</style>

      {/* viewport with edge dissolve masks — logos emerge right, dissolve left */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          WebkitMaskImage: `linear-gradient(90deg, transparent 0%, #000 ${EDGE_FADE}, #000 calc(100% - ${EDGE_FADE}), transparent 100%)`,
          maskImage: `linear-gradient(90deg, transparent 0%, #000 ${EDGE_FADE}, #000 calc(100% - ${EDGE_FADE}), transparent 100%)`,
        }}
      >
        <div
          className="brandstrip-track"
          style={{
            display: "flex",
            alignItems: "center",
            width: "max-content",
            animation: `brandstrip-marquee ${SPEED_S}s linear infinite`,
            animationPlayState: paused ? "paused" : "running",
            willChange: "transform",
          }}
        >
          {renderSet(false)}
          {renderSet(true)}
        </div>
      </div>
    </section>
  );
}
