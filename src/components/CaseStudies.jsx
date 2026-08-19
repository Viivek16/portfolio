import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const CASE_STUDIES = [
  {
    id: "cs-01",
    code: "5539",
    number: "01",
    title: "SCAPE APP",
    subtitle: "GTM STRATEGY",
    category: "GTM STRATEGY",
    tag: "CANVA DECK",
    url: "https://canva.link/scape-gtm-strategy",
    color: "#4A584C", // Moss Sage Olive (Reference Card 1)
    textColor: "#FFFFFF",
    subColor: "rgba(255, 255, 255, 0.65)",
    isLight: false,
  },
  {
    id: "cs-02",
    code: "4417",
    number: "02",
    title: "SCAPE INTEL",
    subtitle: "COMPETITOR INTEL",
    category: "COMPETITOR INTEL",
    tag: "LIVE APP",
    url: "https://scape-mcp-research.vercel.app/",
    color: "#D1A667", // Warm Amber Sand (Reference Card 2)
    textColor: "#FFFFFF",
    subColor: "rgba(255, 255, 255, 0.70)",
    isLight: false,
  },
  {
    id: "cs-03",
    code: "3761",
    number: "03",
    title: "TALP AI",
    subtitle: "AI EXPANSION",
    category: "AI EXPANSION",
    tag: "LIVE APP",
    url: "https://talp-expansion-strategy.vercel.app/",
    color: "#2A3748", // Slate Deep Navy (Reference Card 3)
    textColor: "#FFFFFF",
    subColor: "rgba(255, 255, 255, 0.65)",
    isLight: false,
  },
  {
    id: "cs-04",
    code: "5428",
    number: "04",
    title: "MIGMA AI",
    subtitle: "PRODUCT STRATEGY",
    category: "PRODUCT STRATEGY",
    tag: "RESEARCH PDF",
    url: "https://drive.google.com/file/d/1vp2VK9FTOWBpU1-Wr4Z0YEePz2zgmOgA/view?usp=sharing",
    color: "#A06855", // Terracotta Cognac (Reference Card 4)
    textColor: "#FFFFFF",
    subColor: "rgba(255, 255, 255, 0.70)",
    isLight: false,
  },
  {
    id: "cs-05",
    code: "4190",
    number: "05",
    title: "VDEX STRATEGY",
    subtitle: "DEFI GROWTH",
    category: "DEFI GROWTH",
    tag: "CANVA DECK",
    url: "https://canva.link/vdex-grwoth-strategy",
    color: "#E8E2D4", // Linen Ivory Bone (Reference Card 5)
    textColor: "#1E242B",
    subColor: "rgba(30, 36, 43, 0.70)",
    isLight: true,
  },
  {
    id: "cs-06",
    code: "5302",
    number: "06",
    title: "HYPERSIGN",
    subtitle: "IDENTITY PROTOCOL",
    category: "IDENTITY PROTOCOL",
    tag: "CANVA DECK",
    url: "https://canva.link/hypersign",
    color: "#6A2E3B", // Bordeaux Dark Plum (Reference Card 6)
    textColor: "#FFFFFF",
    subColor: "rgba(255, 255, 255, 0.65)",
    isLight: false,
  },
  {
    id: "cs-07",
    code: "4731",
    number: "07",
    title: "PAYTM B2C",
    subtitle: "FINTECH GROWTH",
    category: "FINTECH GROWTH",
    tag: "CANVA DECK",
    url: "https://canva.link/paytm-b2c-strategy",
    color: "#728A7A", // Pale Jade Mint (Reference Card 7)
    textColor: "#FFFFFF",
    subColor: "rgba(255, 255, 255, 0.70)",
    isLight: false,
  },
  {
    id: "cs-08",
    code: "3056",
    number: "08",
    title: "SCAPE APP",
    subtitle: "SPATIAL GTM",
    category: "GTM STRATEGY",
    tag: "CANVA DECK",
    url: "https://canva.link/scape-gtm-strategy",
    color: "#344656", // Steel Slate Cobalt (Reference Card 8)
    textColor: "#FFFFFF",
    subColor: "rgba(255, 255, 255, 0.65)",
    isLight: false,
  },
  {
    id: "cs-09",
    code: "5623",
    number: "09",
    title: "TALP AI",
    subtitle: "DEVELOPER ENGINE",
    category: "AI EXPANSION",
    tag: "LIVE APP",
    url: "https://talp-expansion-strategy.vercel.app/",
    color: "#F2EEE7", // Porcelain Alabaster (Reference Card 9)
    textColor: "#1E242B",
    subColor: "rgba(30, 36, 43, 0.70)",
    isLight: true,
  },
  {
    id: "cs-10",
    code: "4944",
    number: "10",
    title: "MIGMA AI",
    subtitle: "ENTERPRISE PMF",
    category: "PRODUCT STRATEGY",
    tag: "RESEARCH PDF",
    url: "https://drive.google.com/file/d/1vp2VK9FTOWBpU1-Wr4Z0YEePz2zgmOgA/view?usp=sharing",
    color: "#222428", // Obsidian Noir (Reference Card 10)
    textColor: "#FFFFFF",
    subColor: "rgba(255, 255, 255, 0.65)",
    isLight: false,
  },
  {
    id: "cs-11",
    code: "4829",
    number: "11",
    title: "SCAPE INTEL",
    subtitle: "MCP PROTOCOLS",
    category: "COMPETITOR INTEL",
    tag: "LIVE APP",
    url: "https://scape-mcp-research.vercel.app/",
    color: "#B55D36", // Burnt Sienna Copper (Reference Card 11)
    textColor: "#FFFFFF",
    subColor: "rgba(255, 255, 255, 0.70)",
    isLight: false,
  },
  {
    id: "cs-12",
    code: "5114",
    number: "12",
    title: "VDEX STRATEGY",
    subtitle: "TOKEN RETENTION",
    category: "DEFI GROWTH",
    tag: "CANVA DECK",
    url: "https://canva.link/vdex-grwoth-strategy",
    color: "#C49265", // Caramel Bronze (Reference Card 12)
    textColor: "#FFFFFF",
    subColor: "rgba(255, 255, 255, 0.70)",
    isLight: false,
  },
  {
    id: "cs-13",
    code: "3768",
    number: "13",
    title: "HYPERSIGN",
    subtitle: "SSI PROTOCOL",
    category: "IDENTITY PROTOCOL",
    tag: "CANVA DECK",
    url: "https://canva.link/hypersign",
    color: "#E5DFC9", // Warm Pale Sand (Reference Card 13)
    textColor: "#1E242B",
    subColor: "rgba(30, 36, 43, 0.70)",
    isLight: true,
  },
  {
    id: "cs-14",
    code: "4082",
    number: "14",
    title: "PAYTM B2C",
    subtitle: "CONVERSION ENGINE",
    category: "FINTECH GROWTH",
    tag: "CANVA DECK",
    url: "https://canva.link/paytm-b2c-strategy",
    color: "#38493D", // Deep Pine Emerald (Reference Card 14)
    textColor: "#FFFFFF",
    subColor: "rgba(255, 255, 255, 0.65)",
    isLight: false,
  },
];

// Helper to draw minimalist EMV circuit pad (Reference style)
function drawChip(ctx, x, y, size, isLight) {
  ctx.save();
  const padColor = isLight ? "rgba(0, 0, 0, 0.18)" : "rgba(255, 255, 255, 0.28)";
  const lineColor = isLight ? "rgba(0, 0, 0, 0.35)" : "rgba(255, 255, 255, 0.45)";

  ctx.beginPath();
  ctx.roundRect(x, y, size, size * 0.8, 8);
  ctx.fillStyle = padColor;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = lineColor;
  ctx.stroke();

  // Internal minimal circuit grid
  ctx.beginPath();
  ctx.moveTo(x, y + size * 0.4);
  ctx.lineTo(x + size, y + size * 0.4);
  ctx.moveTo(x + size * 0.35, y);
  ctx.lineTo(x + size * 0.35, y + size * 0.8);
  ctx.moveTo(x + size * 0.65, y);
  ctx.lineTo(x + size * 0.65, y + size * 0.8);
  ctx.stroke();

  ctx.restore();
}

// Generate luxury executive matte card texture (matching Reference Image 1:1)
function generateCardTexture(study) {
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 1440;
  const ctx = canvas.getContext("2d");

  const w = canvas.width;
  const h = canvas.height;
  const r = 48;

  // Solid matte background (identical to reference image)
  ctx.beginPath();
  ctx.roundRect(0, 0, w, h, r);
  ctx.fillStyle = study.color;
  ctx.fill();

  // Ultra-fine subtle inner border
  ctx.lineWidth = 3;
  ctx.strokeStyle = study.isLight ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.12)";
  ctx.stroke();

  // 1. Top Left: Title (Tracked Uppercase Sans)
  ctx.fillStyle = study.textColor;
  ctx.font = "600 36px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.letterSpacing = "4px";
  ctx.fillText(study.title, 72, 115);

  // 2. Subtitle: Muted tracked uppercase
  ctx.fillStyle = study.subColor;
  ctx.font = "500 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.letterSpacing = "3px";
  ctx.fillText(study.subtitle, 72, 160);

  // 3. Top Right: Minimalist contactless / geometric icon
  ctx.save();
  ctx.strokeStyle = study.isLight ? "rgba(0, 0, 0, 0.35)" : "rgba(255, 255, 255, 0.45)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(w - 90, 110, 18, -Math.PI * 0.35, Math.PI * 0.35);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(w - 90, 110, 28, -Math.PI * 0.35, Math.PI * 0.35);
  ctx.stroke();
  ctx.restore();

  // 4. Upper-Middle: EMV Chip / Minimal Circuit Matrix (around Y=420)
  drawChip(ctx, 72, 420, 76, study.isLight);

  // 5. Lower-Middle: 4-digit code & 4 dots (around Y=780)
  ctx.fillStyle = study.textColor;
  ctx.font = "600 42px 'Courier New', monospace";
  ctx.letterSpacing = "2px";
  ctx.fillText(study.code, 72, 780);

  ctx.fillStyle = study.subColor;
  ctx.font = "32px sans-serif";
  ctx.fillText("••••", 72, 830);

  // 6. Bottom Row: Card Holder & Vivek Mehata (around Y=1320)
  ctx.fillStyle = study.subColor;
  ctx.font = "600 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.letterSpacing = "3px";
  ctx.fillText("CARD HOLDER", 72, 1300);

  ctx.fillStyle = study.textColor;
  ctx.font = "600 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.letterSpacing = "3px";
  ctx.fillText("V. MEHATA", 72, 1345);

  // Bottom Right: Minimal Action Tag
  ctx.fillStyle = study.subColor;
  ctx.font = "600 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.letterSpacing = "2px";
  ctx.fillText(`${study.tag} ↗`, w - 210, 1345);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// 3D Rounded Box Geometry
function createRoundedCardGeometry(width, height, radius, depth) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  const w = width;
  const h = height;
  const r = radius;

  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  const extrudeSettings = {
    depth: depth,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.015,
    bevelThickness: 0.012,
    curveSegments: 16,
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geometry.center();
  return geometry;
}

export default function CaseStudies() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeTitle, setActiveTitle] = useState(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight || 640;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = null;

    // 2. Camera Setup (Wide lens for full end-to-end span)
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0, 10.8);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // 4. Soft Studio Lighting (Zero glaring hotspots)
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight1.position.set(6, 12, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight2.position.set(-8, 4, 6);
    scene.add(dirLight2);

    // 5. Geometry & Card Setup
    const cardWidth = 2.1;
    const cardHeight = 3.35;
    const cardRadius = 0.14;
    const cardDepth = 0.035;
    const cardGeometry = createRoundedCardGeometry(cardWidth, cardHeight, cardRadius, cardDepth);

    const totalCards = CASE_STUDIES.length;
    const cards = [];

    // Calculate visible width at Z=0 for edge-to-edge span
    const getVisibleSpan = () => {
      const vFOV = THREE.MathUtils.degToRad(camera.fov);
      const visibleHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
      return visibleHeight * camera.aspect;
    };

    let visibleSpan = getVisibleSpan();

    CASE_STUDIES.forEach((study, i) => {
      const texture = generateCardTexture(study);
      // Ultra-matte luxury paper/plastic material (Zero glossy glare)
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.75,
        metalness: 0.05,
      });

      const mesh = new THREE.Mesh(cardGeometry, material);
      mesh.userData = { index: i, study };
      scene.add(mesh);

      cards.push({
        mesh,
        study,
        index: i,
        currentLift: 0,
        targetLift: 0,
      });
    });

    // 6. Scroll & Raycast Pointer State
    let scrollProgress = 0;
    let targetScrollProgress = 0;
    let pointer = new THREE.Vector2(-999, -999);
    let hoveredCardIndex = -1;

    const raycaster = new THREE.Raycaster();

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight * 0.95;
      const end = windowHeight * 0.25;
      const current = rect.top;

      const raw = (start - current) / (start - end);
      targetScrollProgress = Math.max(0, Math.min(1, raw));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      pointer.x = x * 2 - 1;
      pointer.y = -y * 2 + 1;

      // Raycast against card meshes
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(cards.map((c) => c.mesh));

      if (intersects.length > 0) {
        // Only the directly hovered card is active
        hoveredCardIndex = intersects[0].object.userData.index;
        container.style.cursor = "pointer";
        setActiveTitle(intersects[0].object.userData.study.title);
      } else {
        hoveredCardIndex = -1;
        container.style.cursor = "default";
        setActiveTitle(null);
      }
    };

    const handlePointerLeave = () => {
      pointer.set(-999, -999);
      hoveredCardIndex = -1;
      container.style.cursor = "default";
      setActiveTitle(null);
    };

    const handleClick = (e) => {
      const rect = container.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(cards.map((c) => c.mesh));

      if (intersects.length > 0) {
        const study = intersects[0].object.userData.study;
        if (study && study.url) {
          window.open(study.url, "_blank", "noopener,noreferrer");
        }
      }
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);
    container.addEventListener("click", handleClick);

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight || 640;
      camera.aspect = width / height;

      if (width < 768) {
        camera.position.z = 14.5;
      } else if (width < 1200) {
        camera.position.z = 12.2;
      } else {
        camera.position.z = 10.8;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      visibleSpan = getVisibleSpan();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // 7. Render Loop with Smooth Spring Physics (Matching Reference Exactly)
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);

      // Smooth scroll progress
      scrollProgress += (targetScrollProgress - scrollProgress) * (delta * 6.0);

      const center = (totalCards - 1) / 2; // 6.5

      cards.forEach((card, i) => {
        // Uniform straight diagonal rack spacing (Matching Reference Image 1:1)
        const offset = i - center;
        const stepX = (visibleSpan * 0.88) / (totalCards - 1);
        const settledX = offset * stepX;
        const settledY = -0.5 - offset * 0.18; // Clean uniform diagonal slope
        const settledZ = -offset * 0.32;       // Clean depth stacking

        // Isometric angles (Matching Reference Image 1:1)
        const settledRotX = 0.22;  // ~12.6 deg
        const settledRotY = -0.58; // ~-33.2 deg
        const settledRotZ = 0.08;  // ~4.6 deg

        // Air Wave Position (Falling from top arc on scroll)
        const airX = settledX * 1.05 - 1.0;
        const airY = settledY + 6.2 + Math.sin(i * 0.4) * 1.2;
        const airZ = settledZ + 2.0;

        const airRotX = 0.65;
        const airRotY = -0.85;
        const airRotZ = -0.2;

        // Staggered cascade fall progress
        const cardStart = (i / totalCards) * 0.35;
        const cardP = Math.max(0, Math.min(1, (scrollProgress - cardStart) / 0.65));
        const easedP = 1 - Math.pow(1 - cardP, 3); // smooth cubic ease out

        // Base falling interpolation
        const posX = THREE.MathUtils.lerp(airX, settledX, easedP);
        const posY = THREE.MathUtils.lerp(airY, settledY, easedP);
        const posZ = THREE.MathUtils.lerp(airZ, settledZ, easedP);

        const rotX = THREE.MathUtils.lerp(airRotX, settledRotX, easedP);
        const rotY = THREE.MathUtils.lerp(airRotY, settledRotY, easedP);
        const rotZ = THREE.MathUtils.lerp(airRotZ, settledRotZ, easedP);

        // Hover Pop-Up: ONLY the directly hovered card lifts (Zero multiple card glitch)
        const isHovered = hoveredCardIndex === i && cardP > 0.6;
        const targetLift = isHovered ? 0.95 : 0;

        // Emil Kowalski smooth spring lerp (silky smooth, never snaps)
        const springSpeed = Math.min(delta * 7.0, 0.25);
        card.currentLift += (targetLift - card.currentLift) * springSpeed;

        // Apply lift along card's 3D local vertical axis
        const liftY = card.currentLift * 0.95;
        const liftZ = card.currentLift * 0.35;

        card.mesh.position.set(posX, posY + liftY, posZ + liftZ);
        card.mesh.rotation.set(rotX, rotY, rotZ);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      container.removeEventListener("click", handleClick);
      renderer.dispose();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="case-studies"
      className="case-studies-section"
      aria-label="Case Studies and Research Reports"
      style={{
        position: "relative",
        background: "#070C18",
        paddingTop: "clamp(56px, 8vh, 88px)",
        paddingBottom: "clamp(56px, 8vh, 96px)",
        overflow: "hidden",
        isolation: "isolate",
        zIndex: 35,
      }}
    >
      <style>{`
        .cs-header-wrapper {
          padding-left: 8vw;
          padding-right: 8vw;
        }

        .cs-eyebrow-left {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: 12px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #0AC4E0;
          margin-bottom: clamp(16px, 2.5vh, 24px);
        }

        .cs-title-left {
          font-family: 'Fraunces', serif;
          font-weight: 300;
          font-style: italic;
          font-size: clamp(38px, 4vw, 54px);
          color: #FFFFFF;
          line-height: 1.1;
          margin: 0 0 16px 0;
          letter-spacing: -0.02em;
        }

        .cs-desc-left {
          font-family: 'Poppins', sans-serif;
          font-weight: 300;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.45);
          line-height: 1.9;
          max-width: 580px;
          margin: 0 0 clamp(20px, 3vh, 32px) 0;
        }

        /* 3D WebGL Canvas Stage - Full Width End-to-End */
        .cs-three-stage {
          position: relative;
          width: 100vw;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          height: clamp(540px, 66vh, 720px);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
        }

        .cs-three-canvas {
          position: absolute;
          inset: 0;
          width: 100% !important;
          height: 100% !important;
          display: block;
          touch-action: pan-y;
        }

        .cs-hint-container {
          padding-left: 8vw;
          padding-right: 8vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: 'Poppins', sans-serif;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.35);
          letter-spacing: 0.05em;
          padding-top: 16px;
        }
      `}</style>

      {/* Left-Aligned Header strictly matching ToolsBuilt & FunSection */}
      <div className="cs-header-wrapper">
        <div className="cs-eyebrow-left">— Case Studies</div>

        <h2 className="cs-title-left">
          Case Studies<span style={{ color: "#0AC4E0" }}>.</span>
        </h2>

        <p className="cs-desc-left">
          Fourteen cards, one wave — a physics-driven 3D case study deck. Hover over any card to pop it up, click to open research reports.
        </p>
      </div>

      {/* Full-Bleed 100vw 3D WebGL Canvas */}
      <div ref={containerRef} className="cs-three-stage">
        <canvas ref={canvasRef} className="cs-three-canvas" />
      </div>

      {/* Footer hint */}
      <div className="cs-hint-container">
        <span>← Move cursor along the deck to explore case studies →</span>
        <span style={{ color: activeTitle ? "#0AC4E0" : "rgba(255, 255, 255, 0.35)", transition: "color 0.2s ease" }}>
          {activeTitle ? `Click to open ${activeTitle} ↗` : "Click any card to open research report ↗"}
        </span>
      </div>
    </section>
  );
}
