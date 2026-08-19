import React, { useRef, useEffect, useState } from "react";

const CASE_STUDIES = [
  { id: "cs-01", code: "5539", title: "SCAPE APP",     subtitle: "GTM STRATEGY",      tag: "CANVA DECK",   url: "https://canva.link/scape-gtm-strategy",                                              color: "#4A584C", isLight: false },
  { id: "cs-02", code: "4417", title: "SCAPE INTEL",   subtitle: "COMPETITOR INTEL",  tag: "LIVE APP",     url: "https://scape-mcp-research.vercel.app/",                                              color: "#D1A667", isLight: false },
  { id: "cs-03", code: "3761", title: "TALP AI",       subtitle: "AI EXPANSION",      tag: "LIVE APP",     url: "https://talp-expansion-strategy.vercel.app/",                                        color: "#2A3748", isLight: false },
  { id: "cs-04", code: "5428", title: "MIGMA AI",      subtitle: "PRODUCT STRATEGY",  tag: "RESEARCH PDF", url: "https://drive.google.com/file/d/1vp2VK9FTOWBpU1-Wr4Z0YEePz2zgmOgA/view?usp=sharing", color: "#A06855", isLight: false },
  { id: "cs-05", code: "4190", title: "VDEX STRATEGY", subtitle: "DEFI GROWTH",       tag: "CANVA DECK",   url: "https://canva.link/vdex-grwoth-strategy",                                            color: "#E8E2D4", isLight: true  },
  { id: "cs-06", code: "5302", title: "HYPERSIGN",     subtitle: "IDENTITY PROTOCOL", tag: "CANVA DECK",   url: "https://canva.link/hypersign",                                                       color: "#6A2E3B", isLight: false },
  { id: "cs-07", code: "4731", title: "PAYTM B2C",     subtitle: "FINTECH GROWTH",    tag: "CANVA DECK",   url: "https://canva.link/paytm-b2c-strategy",                                              color: "#728A7A", isLight: false },
  { id: "cs-08", code: "3056", title: "SCAPE APP",     subtitle: "SPATIAL GTM",       tag: "CANVA DECK",   url: "https://canva.link/scape-gtm-strategy",                                              color: "#344656", isLight: false },
  { id: "cs-09", code: "5623", title: "TALP AI",       subtitle: "DEVELOPER ENGINE",  tag: "LIVE APP",     url: "https://talp-expansion-strategy.vercel.app/",                                        color: "#F2EEE7", isLight: true  },
  { id: "cs-10", code: "4944", title: "MIGMA AI",      subtitle: "ENTERPRISE PMF",    tag: "RESEARCH PDF", url: "https://drive.google.com/file/d/1vp2VK9FTOWBpU1-Wr4Z0YEePz2zgmOgA/view?usp=sharing", color: "#222428", isLight: false },
  { id: "cs-11", code: "4829", title: "SCAPE INTEL",   subtitle: "MCP PROTOCOLS",     tag: "LIVE APP",     url: "https://scape-mcp-research.vercel.app/",                                              color: "#B55D36", isLight: false },
  { id: "cs-12", code: "5114", title: "VDEX STRATEGY", subtitle: "TOKEN RETENTION",   tag: "CANVA DECK",   url: "https://canva.link/vdex-grwoth-strategy",                                            color: "#C49265", isLight: false },
  { id: "cs-13", code: "3768", title: "HYPERSIGN",     subtitle: "SSI PROTOCOL",      tag: "CANVA DECK",   url: "https://canva.link/hypersign",                                                       color: "#E5DFC9", isLight: true  },
  { id: "cs-14", code: "4082", title: "PAYTM B2C",     subtitle: "CONVERSION ENGINE", tag: "CANVA DECK",   url: "https://canva.link/paytm-b2c-strategy",                                              color: "#38493D", isLight: false },
];

const TOTAL = CASE_STUDIES.length;
const CENTER = (TOTAL - 1) / 2;

// ---- pure helpers (unit-tested) ----------------------------------------

// Magnetic hover falloff: card i's response when the pointer sits at deck
// fraction `p` (0..TOTAL-1). Gaussian so the hovered card lifts most and
// neighbours ripple — the "feel them respond" wave. Returns 0..1.
export function waveLift(i, p, spread = 1.45) {
  if (p == null) return 0;
  const d = (i - p) / spread;
  return Math.exp(-d * d);
}

// easeOutCubic
export function easeOut(t) {
  const c = Math.min(1, Math.max(0, t));
  return 1 - Math.pow(1 - c, 3);
}

// Settled + airborne pose for card i, given the horizontal step in px.
// Left→right the rack descends (y), advances toward the viewer (z) and
// fans on a fixed isometric tilt — matching the reference cardwall.
export function rackPose(i, stepX) {
  const o = i - CENTER;
  const x = o * stepX;
  const y = o * 15;
  const z = o * 24;
  const settled = { x, y, z, rx: 12, ry: -32, rz: 5 };
  const air = {
    x: x * 1.05,
    y: y - 150,
    z: z + 90,
    rx: 21,
    ry: -46,
    rz: -5,
  };
  return { settled, air };
}

const lerp = (a, b, t) => a + (b - a) * t;

// ---- card face ----------------------------------------------------------

function Chip({ tone }) {
  return (
    <svg className="cs-chip" viewBox="0 0 38 30" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="36" height="28" rx="5" fill={tone.chipFill} stroke={tone.line} strokeWidth="1" />
      <path d="M1 11h36M1 19h36M13 1v28M25 1v28" stroke={tone.line} strokeWidth="1" />
    </svg>
  );
}

function Contactless({ tone }) {
  return (
    <svg className="cs-wave" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M8 5a9 9 0 0 1 0 12M12 2.5a13 13 0 0 1 0 17M4 7.5a5 5 0 0 1 0 7" stroke={tone.line} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CaseCard({ study }) {
  const fg = study.isLight ? "#1E242B" : "#FFFFFF";
  const sub = study.isLight ? "rgba(30,36,43,0.62)" : "rgba(255,255,255,0.62)";
  const tone = {
    line: study.isLight ? "rgba(30,36,43,0.42)" : "rgba(255,255,255,0.5)",
    chipFill: study.isLight ? "rgba(30,36,43,0.08)" : "rgba(255,255,255,0.12)",
  };
  const sheen = study.isLight ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.09)";

  return (
    <a
      className="cs-card"
      href={study.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${study.title} — ${study.subtitle} (${study.tag})`}
      style={{
        "--cbg": study.color,
        "--cfg": fg,
        "--csub": sub,
        "--sheen": sheen,
      }}
    >
      <div className="cs-card-top">
        <div>
          <div className="cs-brand">{study.title}</div>
          <div className="cs-type">{study.subtitle}</div>
        </div>
        <Contactless tone={tone} />
      </div>

      <Chip tone={tone} />

      <div className="cs-card-mid">
        <div className="cs-code">{study.code}</div>
        <div className="cs-dots" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
      </div>

      <div className="cs-card-foot">
        <div className="cs-holder">
          <span className="cs-holder-label">Card Holder</span>
          <span className="cs-holder-name">V. Mehata</span>
        </div>
        <span className="cs-tag">{study.tag} ↗</span>
      </div>
    </a>
  );
}

// ---- section ------------------------------------------------------------

export default function CaseStudies() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const sceneRef = useRef(null);
  const slotRefs = useRef([]);
  const [mode, setMode] = useState("deck"); // deck | rail | static

  useEffect(() => {
    const fine = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const resolve = () => setMode(!fine.matches ? "rail" : reduce.matches ? "static" : "deck");
    resolve();
    fine.addEventListener("change", resolve);
    reduce.addEventListener("change", resolve);
    return () => {
      fine.removeEventListener("change", resolve);
      reduce.removeEventListener("change", resolve);
    };
  }, []);

  // 3D deck: entrance cascade + magnetic hover wave via a single rAF loop.
  useEffect(() => {
    if (mode !== "deck" && mode !== "static") return;
    const scene = sceneRef.current;
    const stage = stageRef.current;
    if (!scene || !stage) return;

    const animated = mode === "deck";
    const lifts = new Array(TOTAL).fill(0);
    const poses = [];
    let stepX = 96;
    let pointerP = null;
    let startTime = null; // set when the deck scrolls into view
    let raf = null;
    let idleStop = false;

    const measure = () => {
      const w = stage.clientWidth || window.innerWidth;
      const cw = parseFloat(getComputedStyle(scene).getPropertyValue("--cw")) || 168;
      stepX = Math.min((w * 0.84 - cw) / (TOTAL - 1), 104);
      for (let i = 0; i < TOTAL; i++) poses[i] = rackPose(i, stepX);
    };
    measure();

    const DUR = 820;
    const STAGGER = 46;

    const frame = (now) => {
      let busy = false;

      for (let i = 0; i < TOTAL; i++) {
        const slot = slotRefs.current[i];
        if (!slot) continue;
        const { settled, air } = poses[i];

        let e = 1;
        if (animated) {
          // hold airborne (and idle the loop) until the deck scrolls into view
          e = startTime == null ? 0 : easeOut((now - startTime - i * STAGGER) / DUR);
          if (startTime != null && e < 1) busy = true;
        }

        // hover wave — only once settled
        const target = animated && pointerP != null && e > 0.98 ? waveLift(i, pointerP) : 0;
        lifts[i] += (target - lifts[i]) * 0.16;
        if (Math.abs(target - lifts[i]) > 0.001) busy = true;
        const L = lifts[i];

        const x = lerp(air.x, settled.x, e);
        const y = lerp(air.y, settled.y, e) - L * 46;
        const z = lerp(air.z, settled.z, e) + L * 92;
        const rx = lerp(air.rx, settled.rx, e);
        const ry = lerp(air.ry, settled.ry, e) + L * 7;
        const rz = lerp(air.rz, settled.rz, e);

        slot.style.transform =
          `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) ` +
          `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg)`;
        slot.style.opacity = animated ? Math.min(1, e / 0.35).toFixed(3) : "1";
        slot.style.zIndex = String(100 + i + Math.round(L * 120));
        slot.style.setProperty("--lift", L.toFixed(3));
      }

      if (busy) {
        raf = requestAnimationFrame(frame);
      } else {
        idleStop = true; // settle and stop until next interaction
      }
    };

    const kick = () => {
      if (idleStop || raf == null) {
        idleStop = false;
        raf = requestAnimationFrame(frame);
      }
    };

    // paint the first frame synchronously so the deck never flashes as a
    // blank stack and reduced-motion / background tabs render without rAF.
    frame(performance.now());

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting && startTime == null) {
            startTime = performance.now();
            kick();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(stage);
    if (!animated) startTime = 0;

    let onMove, onLeave;
    if (animated) {
      onMove = (ev) => {
        const rect = stage.getBoundingClientRect();
        const frac = (ev.clientX - rect.left) / rect.width;
        pointerP = Math.max(0, Math.min(1, frac)) * (TOTAL - 1);
        kick();
      };
      onLeave = () => {
        pointerP = null;
        kick();
      };
      stage.addEventListener("pointermove", onMove);
      stage.addEventListener("pointerleave", onLeave);
      stage.addEventListener("focusin", kick);
    }

    const onResize = () => {
      measure();
      kick();
    };
    window.addEventListener("resize", onResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      if (animated) {
        stage.removeEventListener("pointermove", onMove);
        stage.removeEventListener("pointerleave", onLeave);
        stage.removeEventListener("focusin", kick);
      }
    };
  }, [mode]);

  return (
    <section
      ref={sectionRef}
      id="case-studies"
      className="case-studies-section"
      aria-label="Case Studies and Research Reports"
    >
      <style>{`
        .case-studies-section {
          position: relative;
          background: #070C18;
          padding-top: clamp(56px, 8vh, 88px);
          padding-bottom: clamp(56px, 8vh, 96px);
          overflow: hidden;
          isolation: isolate;
          z-index: 35;
        }
        .cs-header-wrapper { padding-left: 8vw; padding-right: 8vw; }
        .cs-eyebrow-left {
          font-family: 'Poppins', sans-serif; font-weight: 500; font-size: 12px;
          letter-spacing: 0.28em; text-transform: uppercase; color: #0AC4E0;
          margin-bottom: clamp(16px, 2.5vh, 24px);
        }
        .cs-title-left {
          font-family: 'Fraunces', serif; font-weight: 300; font-style: italic;
          font-size: clamp(38px, 4vw, 54px); color: #FFFFFF; line-height: 1.1;
          margin: 0 0 16px 0; letter-spacing: -0.02em;
        }
        .cs-desc-left {
          font-family: 'Poppins', sans-serif; font-weight: 300; font-size: 14px;
          color: rgba(255,255,255,0.45); line-height: 1.9; max-width: 580px;
          margin: 0 0 clamp(20px, 3vh, 32px) 0;
        }

        /* ---- 3D deck stage (full-bleed) ---- */
        .cs-stage {
          position: relative; width: 100vw; left: 50%; margin-left: -50vw;
          height: clamp(520px, 62vh, 700px);
        }
        .cs-scene {
          --cw: 168px; --ch: 268px;
          position: absolute; inset: 0;
          perspective: 1600px; perspective-origin: 50% 46%;
          transform-style: preserve-3d;
        }
        .cs-slot {
          position: absolute; top: 50%; left: 50%;
          width: var(--cw); height: var(--ch);
          margin-left: calc(var(--cw) / -2); margin-top: calc(var(--ch) / -2);
          transform-style: preserve-3d; will-change: transform, opacity;
        }
        .cs-slot .cs-card { position: absolute; inset: 0; }

        /* ---- card face ---- */
        .cs-card {
          display: flex; flex-direction: column;
          padding: 16px 15px 15px; border-radius: 13px;
          text-decoration: none; color: var(--cfg);
          background:
            linear-gradient(152deg, var(--sheen) 0%, rgba(255,255,255,0) 44%),
            radial-gradient(120% 80% at 82% 8%, rgba(255,255,255,0.06), rgba(255,255,255,0) 46%),
            var(--cbg);
          border: 1px solid rgba(255,255,255,0.07);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.14),
            inset 0 0 0 0.5px rgba(0,0,0,0.10),
            0 16px 26px -18px rgba(0,0,0,0.75),
            0 34px 60px -30px rgba(0,0,0,0.8);
          overflow: hidden;
          filter: brightness(calc(1 + var(--lift, 0) * 0.1));
          transition: border-color 0.35s ease;
        }
        .cs-slot .cs-card::after {
          content: ""; position: absolute; inset: 0; border-radius: 13px;
          box-shadow: inset 0 0 0 1px rgba(10,196,224,0.5),
                      0 0 26px 2px rgba(10,196,224,0.28);
          opacity: calc(var(--lift, 0) * 0.9); pointer-events: none;
          transition: opacity 0.2s ease;
        }
        .cs-card:focus-visible { outline: none; border-color: rgba(10,196,224,0.7); }

        .cs-card-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
        .cs-brand {
          font-family: 'General Sans', sans-serif; font-weight: 600;
          font-size: 12.5px; letter-spacing: 0.15em; text-transform: uppercase;
          line-height: 1;
        }
        .cs-type {
          font-family: 'General Sans', sans-serif; font-weight: 500;
          font-size: 8px; letter-spacing: 0.24em; text-transform: uppercase;
          color: var(--csub); margin-top: 6px;
        }
        .cs-wave { width: 17px; height: 17px; flex: none; opacity: 0.9; }
        .cs-chip { width: 34px; height: 27px; margin-top: 20px; }

        .cs-card-mid { margin-top: auto; }
        .cs-code {
          font-family: ui-monospace, 'SF Mono', 'Cascadia Code', Menlo, monospace;
          font-size: 17px; font-weight: 500; letter-spacing: 0.14em;
        }
        .cs-dots { display: flex; gap: 5px; margin-top: 9px; }
        .cs-dots span { width: 4px; height: 4px; border-radius: 50%; background: var(--csub); }

        .cs-card-foot {
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 8px; margin-top: 14px;
        }
        .cs-holder { display: flex; flex-direction: column; gap: 3px; }
        .cs-holder-label {
          font-family: 'General Sans', sans-serif; font-size: 6.5px;
          letter-spacing: 0.22em; text-transform: uppercase; color: var(--csub);
        }
        .cs-holder-name {
          font-family: 'General Sans', sans-serif; font-weight: 600; font-size: 11px;
          letter-spacing: 0.1em; text-transform: uppercase;
        }
        .cs-tag {
          font-family: 'General Sans', sans-serif; font-weight: 500; font-size: 8px;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--csub);
          white-space: nowrap;
        }

        /* ---- mobile / touch rail ---- */
        .cs-rail {
          --cw: 220px; --ch: 350px;
          display: flex; gap: 18px; overflow-x: auto; scroll-snap-type: x mandatory;
          padding: 22px 8vw 30px; scrollbar-width: none; -webkit-overflow-scrolling: touch;
        }
        .cs-rail::-webkit-scrollbar { display: none; }
        .cs-rail .cs-card {
          position: relative; flex: 0 0 auto; width: var(--cw); height: var(--ch);
          scroll-snap-align: center;
        }

        .cs-hint {
          padding-left: 8vw; padding-right: 8vw; padding-top: 18px;
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          font-family: 'Poppins', sans-serif; font-size: 12px;
          color: rgba(255,255,255,0.32); letter-spacing: 0.05em;
        }
        @media (max-width: 640px) { .cs-hint span:last-child { display: none; } }
      `}</style>

      <div className="cs-header-wrapper">
        <div className="cs-eyebrow-left">— Case Studies</div>
        <h2 className="cs-title-left">
          Case Studies<span style={{ color: "#0AC4E0" }}>.</span>
        </h2>
        <p className="cs-desc-left">
          Fourteen decks, one wave — strategy, growth and research work, laid out like a card rack.
          Move your cursor across the deck to feel them respond; click any card to open the report.
        </p>
      </div>

      {mode === "rail" ? (
        <div className="cs-rail" role="list">
          {CASE_STUDIES.map((s) => (
            <CaseCard key={s.id} study={s} />
          ))}
        </div>
      ) : (
        <div ref={stageRef} className="cs-stage">
          <div ref={sceneRef} className="cs-scene">
            {CASE_STUDIES.map((s, i) => (
              <div
                key={s.id}
                className="cs-slot"
                ref={(el) => {
                  slotRefs.current[i] = el;
                }}
              >
                <CaseCard study={s} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="cs-hint">
        <span>← Move across the deck to explore case studies →</span>
        <span>Click any card to open the research report ↗</span>
      </div>
    </section>
  );
}
