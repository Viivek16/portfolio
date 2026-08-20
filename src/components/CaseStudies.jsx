import React, { useRef, useEffect, useMemo, useState } from "react";

// The seven real case studies. Each card in the wall is one of these — the deck
// is filled by repeating them so the rack spans edge-to-edge while every card
// still links to a genuine report.
const STUDIES = [
  { n: 1, title: "SCAPE APP",     category: "GTM STRATEGY",      tag: "CANVA DECK",   url: "https://canva.link/scape-gtm-strategy",                                              color: "#4A584C", isLight: false },
  { n: 2, title: "SCAPE INTEL",   category: "COMPETITOR INTEL",  tag: "LIVE APP",     url: "https://scape-mcp-research.vercel.app/",                                              color: "#D1A667", isLight: false },
  { n: 3, title: "TALP AI",       category: "AI EXPANSION",      tag: "LIVE APP",     url: "https://talp-expansion-strategy.vercel.app/",                                        color: "#2A3748", isLight: false },
  { n: 4, title: "MIGMA AI",      category: "PRODUCT STRATEGY",  tag: "RESEARCH PDF", url: "https://drive.google.com/file/d/1vp2VK9FTOWBpU1-Wr4Z0YEePz2zgmOgA/view?usp=sharing", color: "#A06855", isLight: false },
  { n: 5, title: "VDEX STRATEGY", category: "DEFI GROWTH",       tag: "CANVA DECK",   url: "https://canva.link/vdex-grwoth-strategy",                                            color: "#E8E2D4", isLight: true  },
  { n: 6, title: "HYPERSIGN",     category: "IDENTITY PROTOCOL", tag: "CANVA DECK",   url: "https://canva.link/hypersign",                                                       color: "#6A2E3B", isLight: false },
  { n: 7, title: "PAYTM B2C",     category: "FINTECH GROWTH",    tag: "CANVA DECK",   url: "https://canva.link/paytm-b2c-strategy",                                              color: "#728A7A", isLight: false },
];

// Tuned repeat order (indices into STUDIES) so colours never sit adjacent and
// the light cover is well spaced — dark, warm, light, dark, warm, dark, mid.
const ORDER = [0, 3, 4, 2, 1, 5, 6];

// ---- pure helpers (unit-tested) ----------------------------------------

export function stepFor(vw) {
  return Math.max(96, Math.min(vw / 13, 140));
}

// Number of cards to over-fill the viewport edge-to-edge (extra cards spill
// past the screen edges and clip — no blank margins on any width).
export function countFor(vw) {
  return Math.min(40, Math.max(14, Math.ceil((1.4 * vw) / stepFor(vw)) + 1));
}

// Build the deck: `count` cards, each mapped to one of the seven studies.
export function buildDeck(count) {
  return Array.from({ length: count }, (_, i) => ({ id: i, study: STUDIES[ORDER[i % ORDER.length]] }));
}

export function easeOut(t) {
  const c = Math.min(1, Math.max(0, t));
  return 1 - Math.pow(1 - c, 3);
}

// Settled + airborne pose for card i of n. Left→right the rack descends and
// recedes on a fixed isometric tilt; airborne starts high above so cards fall
// down into place.
export function rackPose(i, n, stepX) {
  const o = i - (n - 1) / 2;
  const x = o * stepX;
  const y = o * stepX * 0.15;
  const z = o * stepX * 0.16;
  const settled = { x, y, z, rx: 9, ry: -24, rz: 3 };
  const air = { x, y: y - 940, z: z + 40, rx: 16, ry: -31, rz: -3 };
  return { settled, air };
}

// Frontmost card whose settled hit-box {l,r,t,b} contains the point, else -1.
// Cards render back→front, so scan from the top of the stack down. Using the
// SETTLED boxes (not the lifted card) keeps hover from flickering as a card
// rises, and gating on y stops empty space above/below the shelf from lifting.
export function hitIndex(boxes, x, y) {
  for (let i = boxes.length - 1; i >= 0; i--) {
    const b = boxes[i];
    if (b && x >= b.l && x <= b.r && y >= b.t && y <= b.b) return i;
  }
  return -1;
}

const lerp = (a, b, t) => a + (b - a) * t;

// ---- book-cover card face ----------------------------------------------

function CaseCard({ study, role }) {
  const fg = study.isLight ? "#1E242B" : "#F7F4EE";
  const sub = study.isLight ? "rgba(30,36,43,0.60)" : "rgba(247,244,238,0.58)";
  const edge = study.isLight ? "rgba(30,36,43,0.14)" : "rgba(247,244,238,0.16)";
  const sheen = study.isLight ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.08)";
  const words = study.title.split(" ");

  return (
    <a
      className="cs-card"
      href={study.url}
      target="_blank"
      rel="noopener noreferrer"
      role={role}
      aria-label={`Open ${study.title} — ${study.category} (${study.tag})`}
      style={{ "--cbg": study.color, "--cfg": fg, "--csub": sub, "--edge": edge, "--sheen": sheen }}
    >
      <div className="cs-idx">№ {String(study.n).padStart(2, "0")}</div>
      <h3 className="cs-title">
        {words.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </h3>
      <div className="cs-rule" />
      <div className="cs-cat">{study.category}</div>
      <div className="cs-foot">
        <span className="cs-author">V. Mehata</span>
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

  // Fixed at mount from the initial viewport so the entrance plays once; resize
  // only re-steps/re-centres (no re-fall). Over-provisioned to stay full-bleed.
  const deck = useMemo(() => buildDeck(countFor(typeof window !== "undefined" ? window.innerWidth : 1440)), []);
  const TOTAL = deck.length;

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

  useEffect(() => {
    if (mode !== "deck" && mode !== "static") return;
    const scene = sceneRef.current;
    const stage = stageRef.current;
    if (!scene || !stage) return;

    const animated = mode === "deck";
    const lifts = new Array(TOTAL).fill(0);
    const poses = [];
    let stepX = 100;
    let offsetX = 0; // horizontal recentre for the 3D skew
    let offsetY = 0; // vertical recentre of the visible band
    let hovered = -1;
    let hitmap = [];
    let startTime = null;
    let entranceDone = !animated;
    // two-frame settle: recentre updates the offsets, then the NEXT frame paints
    // with them and we read the (now correct) card hit-boxes for hover.
    let pendingRecentre = !animated;
    let pendingHit = false;
    let raf = null;
    let idle = false;

    const measure = () => {
      stepX = stepFor(stage.clientWidth || window.innerWidth);
      for (let i = 0; i < TOTAL; i++) poses[i] = rackPose(i, TOTAL, stepX);
    };
    measure();

    const DUR = 900;
    const STAGGER = 26;

    const recentre = () => {
      const rects = slotRefs.current.map((s) => s && s.getBoundingClientRect()).filter(Boolean);
      if (!rects.length) return;
      const vw = window.innerWidth;
      offsetX += vw / 2 - (Math.min(...rects.map((r) => r.left)) + Math.max(...rects.map((r) => r.right))) / 2;
      // vertically centre the on-screen cards inside the stage (the 3D skew
      // otherwise biases the visible band downward)
      const onscreen = rects.filter((r) => r.right > 0 && r.left < vw);
      const band = onscreen.length ? onscreen : rects;
      const sr = stage.getBoundingClientRect();
      const bandMid = (Math.min(...band.map((r) => r.top)) + Math.max(...band.map((r) => r.bottom))) / 2;
      offsetY += sr.top + sr.height / 2 - bandMid;
    };

    const readHitmap = () => {
      hitmap = slotRefs.current.map((s) => {
        if (!s) return null;
        const r = s.getBoundingClientRect();
        // trim the rotated bounding-box overhang so the hit area hugs the card
        const vin = Math.min(22, r.height * 0.09);
        return { l: r.left, r: r.right, t: r.top + vin, b: r.bottom - vin };
      });
    };

    const frame = (now) => {
      let busy = false;

      for (let i = 0; i < TOTAL; i++) {
        const slot = slotRefs.current[i];
        if (!slot) continue;
        const { settled, air } = poses[i];

        let e = 1;
        if (animated) {
          e = startTime == null ? 0 : easeOut((now - startTime - i * STAGGER) / DUR);
          if (startTime != null && e < 1) busy = true;
        }

        const target = hovered === i && entranceDone ? 1 : 0;
        // soft critically-damped-ish spring for a silky, glitch-free lift
        lifts[i] += (target - lifts[i]) * 0.14;
        if (Math.abs(lifts[i] - target) > 0.0005) busy = true;
        else lifts[i] = target;
        const eL = easeOut(lifts[i]); // ease the visual so the pop settles gently
        const L = eL;

        const x = lerp(air.x, settled.x, e) + offsetX;
        const y = lerp(air.y, settled.y, e) + offsetY - L * 54;
        const z = lerp(air.z, settled.z, e) + L * 128;
        const rx = lerp(air.rx, settled.rx, e);
        const ry = lerp(air.ry, settled.ry, e) + L * 6;
        const rz = lerp(air.rz, settled.rz, e) * (1 - L);

        slot.style.transform =
          `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) ` +
          `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg)`;
        slot.style.opacity = animated ? Math.min(1, e / 0.3).toFixed(3) : "1";
        slot.style.zIndex = String(100 + i + Math.round(L * 400));
        slot.style.setProperty("--lift", L.toFixed(3));
      }

      // entrance finished → request a recentre pass
      if (animated && !entranceDone && startTime != null && now - startTime > DUR + TOTAL * STAGGER) {
        entranceDone = true;
        pendingRecentre = true;
      }
      // two-frame settle: recentre this frame (using freshly-written rects),
      // then read the corrected centres on the next frame.
      if (pendingRecentre) {
        recentre();
        pendingRecentre = false;
        pendingHit = true;
        busy = true;
      } else if (pendingHit) {
        readHitmap();
        pendingHit = false;
      }

      // keep the loop alive through the whole entrance so it can't idle in the
      // gap before entranceDone flips (which would leave hover permanently off)
      if (animated && startTime != null && !entranceDone) busy = true;

      if (busy) raf = requestAnimationFrame(frame);
      else idle = true;
    };

    const kick = () => {
      if (idle || raf == null) {
        idle = false;
        raf = requestAnimationFrame(frame);
      }
    };

    // synchronous first paint (no blank-stack flash; static mode needs no rAF).
    // Two calls let the static path run its recentre → read settle in-place.
    frame(performance.now());
    if (!animated) frame(performance.now());

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting && startTime == null) {
            startTime = performance.now();
            kick();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(stage);

    let onMove, onLeave;
    if (animated) {
      onMove = (ev) => {
        if (!entranceDone || !hitmap.length) return;
        const h = hitIndex(hitmap, ev.clientX, ev.clientY);
        if (h !== hovered) {
          hovered = h;
          kick();
        }
      };
      onLeave = () => {
        if (hovered !== -1) {
          hovered = -1;
          kick();
        }
      };
      stage.addEventListener("pointermove", onMove);
      stage.addEventListener("pointerleave", onLeave);
    }

    const onResize = () => {
      measure();
      offsetX = 0;
      offsetY = 0;
      pendingRecentre = true; // frame loop re-centres, then re-reads hover map
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
      }
    };
  }, [mode, TOTAL]);

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
          padding-bottom: clamp(48px, 7vh, 84px);
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
          color: rgba(255,255,255,0.45); line-height: 1.9; max-width: 560px;
          margin: 0 0 clamp(12px, 2vh, 20px) 0;
        }

        /* ---- full-bleed 3D shelf ---- */
        .cs-stage {
          position: relative; width: 100vw; left: 50%; margin-left: -50vw;
          height: clamp(600px, 70vh, 820px);
        }
        .cs-scene {
          --cw: 212px; --ch: 322px;
          position: absolute; inset: 0;
          perspective: 1750px; perspective-origin: 50% 44%;
          transform-style: preserve-3d;
        }
        .cs-slot {
          position: absolute; top: 50%; left: 50%;
          width: var(--cw); height: var(--ch);
          margin-left: calc(var(--cw) / -2); margin-top: calc(var(--ch) / -2);
          transform-style: preserve-3d; will-change: transform, opacity;
        }
        .cs-slot .cs-card { position: absolute; inset: 0; }

        /* ---- book cover ---- */
        .cs-card {
          display: flex; flex-direction: column;
          padding: 22px 22px 20px 30px; border-radius: 15px;
          text-decoration: none; color: var(--cfg); isolation: isolate;
          background:
            linear-gradient(150deg, var(--sheen) 0%, rgba(255,255,255,0) 46%),
            radial-gradient(150% 65% at 80% -8%, rgba(255,255,255,0.05), rgba(255,255,255,0) 52%),
            var(--cbg);
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.12),
            0 22px 38px -24px rgba(0,0,0,0.82),
            0 52px 80px -46px rgba(0,0,0,0.88);
          overflow: hidden;
          filter: brightness(calc(1 + var(--lift, 0) * 0.08));
        }
        /* book spine */
        .cs-card::before {
          content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 10px;
          background: linear-gradient(90deg, rgba(0,0,0,0.32), rgba(0,0,0,0) 72%);
          border-right: 1px solid var(--edge); z-index: 2;
        }
        /* hover ring + lift glow */
        .cs-slot .cs-card::after {
          content: ""; position: absolute; inset: 0; border-radius: 15px; z-index: 3;
          box-shadow: inset 0 0 0 1px rgba(10,196,224,0.55), 0 0 40px 4px rgba(10,196,224,0.20);
          opacity: calc(var(--lift, 0) * 0.85); pointer-events: none; transition: opacity 0.2s ease;
        }
        .cs-card:focus-visible { outline: none; }
        .cs-card:focus-visible::after { opacity: 1; }

        .cs-idx {
          font-family: 'General Sans', sans-serif; font-weight: 500; font-size: 11px;
          letter-spacing: 0.16em; color: var(--csub);
        }
        .cs-title {
          font-family: 'Fraunces', serif; font-weight: 400; font-size: 28px;
          line-height: 1.0; letter-spacing: -0.01em; margin: auto 0 0; display: flex;
          flex-direction: column;
        }
        .cs-title span { display: block; }
        .cs-rule { height: 1px; width: 42px; background: var(--edge); margin: 14px 0 11px; }
        .cs-cat {
          font-family: 'General Sans', sans-serif; font-weight: 500; font-size: 9px;
          letter-spacing: 0.24em; text-transform: uppercase; color: var(--csub);
        }
        .cs-foot {
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 8px; margin-top: 16px;
        }
        .cs-author {
          font-family: 'General Sans', sans-serif; font-size: 8.5px; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--csub);
        }
        .cs-tag {
          font-family: 'General Sans', sans-serif; font-weight: 500; font-size: 9px;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--cfg);
          opacity: 0.85; white-space: nowrap;
        }

        /* ---- mobile / touch rail ---- */
        .cs-rail {
          --cw: 244px; --ch: 372px;
          display: flex; gap: 20px; overflow-x: auto; scroll-snap-type: x mandatory;
          padding: 26px 8vw 32px; scrollbar-width: none; -webkit-overflow-scrolling: touch;
        }
        .cs-rail::-webkit-scrollbar { display: none; }
        .cs-rail .cs-card {
          position: relative; flex: 0 0 auto; width: var(--cw); height: var(--ch);
          scroll-snap-align: center;
        }
        .cs-rail .cs-title { font-size: 32px; }
      `}</style>

      <div className="cs-header-wrapper">
        <div className="cs-eyebrow-left">— Case Studies</div>
        <h2 className="cs-title-left">
          Case Studies<span style={{ color: "#0AC4E0" }}>.</span>
        </h2>
        <p className="cs-desc-left">
          A shelf of strategy, growth and research work. Glide your cursor along the deck and each
          card lifts in turn — click any one to open the report.
        </p>
      </div>

      {mode === "rail" ? (
        <div className="cs-rail" role="list">
          {STUDIES.map((s) => (
            <CaseCard key={s.n} study={s} role="listitem" />
          ))}
        </div>
      ) : (
        <div ref={stageRef} className="cs-stage">
          <div ref={sceneRef} className="cs-scene">
            {deck.map((c, i) => (
              <div
                key={c.id}
                className="cs-slot"
                ref={(el) => {
                  slotRefs.current[i] = el;
                }}
              >
                <CaseCard study={c.study} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
