import React, { useState } from "react";

/* ────────────────────────────────────────────────────────────
   TUNING KNOBS
──────────────────────────────────────────────────────────────*/
const SPEED_S = 50;          // slightly slower for majestic scale
const LOGO_HEIGHT = "clamp(64px, 8vw, 110px)"; // 3x to 4x size increase
const LOGO_GAP = "clamp(80px, 12vw, 180px)";   // wider gap for larger logos
const LOGO_OPACITY = 0.5;    // resting opacity

// ⚠️ EXACT colors from Phase 1 recon:
const HERO_FLOOR = "#0B1120";
const STATS_TOP  = "#070C18";

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
          className="brand-logo"
          src={b.img}
          alt={ariaHidden ? "" : b.name}
          draggable={false}
          loading="lazy"
          style={{
            height: LOGO_HEIGHT,
            width: "auto",
            display: "block",
            userSelect: "none",
            pointerEvents: "auto", // Allow hover interactions
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
        paddingTop: "clamp(48px, 6vh, 80px)",
        paddingBottom: "clamp(56px, 7vh, 96px)",
      }}
    >
      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 600,
          fontSize: "13px",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "transparent",
          backgroundImage: "linear-gradient(90deg, #0AC4E0, #00FF88)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          paddingLeft: "8vw",
          paddingRight: "8vw",
          marginBottom: "clamp(32px, 5vh, 56px)",
          display: "flex",
          alignItems: "center",
          gap: "16px"
        }}
      >
        <span style={{ 
          width: "48px", 
          height: "1px", 
          background: "linear-gradient(90deg, transparent, rgba(10, 196, 224, 0.6))" 
        }} />
        BRANDS I'VE WORKED WITH
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

        .brand-logo {
          transition: opacity 400ms cubic-bezier(0.23, 1, 0.32, 1),
                      transform 400ms cubic-bezier(0.23, 1, 0.32, 1),
                      filter 400ms cubic-bezier(0.23, 1, 0.32, 1);
          filter: brightness(0) invert(1) drop-shadow(0 0 0 rgba(255,255,255,0));
          opacity: ${LOGO_OPACITY};
          cursor: pointer;
        }

        @media (hover: hover) and (pointer: fine) {
          /* Dim and blur non-hovered siblings */
          .brandstrip-track:has(.brand-logo:hover) .brand-logo:not(:hover) {
            opacity: 0.15;
            transform: scale(0.95);
            filter: brightness(0) invert(1) blur(3px);
          }

          /* Scale and glow the hovered logo */
          .brand-logo:hover {
            opacity: 1;
            transform: scale(1.15);
            filter: brightness(0) invert(1) drop-shadow(0 12px 28px rgba(10, 196, 224, 0.45));
          }
        }
      `}</style>

      {/* viewport with edge dissolve masks — logos emerge right, dissolve left */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          padding: "20px 0", /* extra padding to avoid cutting off the scale/glow effects */
          WebkitMaskImage: `linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%)`,
          maskImage: `linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%)`,
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
