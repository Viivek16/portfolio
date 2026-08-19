import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const CASE_STUDIES = [
  {
    id: "cs-01",
    code: "5539",
    number: "01",
    title: "Scape App",
    subtitle: "Go-To-Market & Growth Architecture",
    category: "GTM STRATEGY",
    tag: "CANVA DECK",
    url: "https://canva.link/scape-gtm-strategy",
    color: "#18281F", // Forest Sage Moss
    accent: "#5BE2A3",
    textColor: "#FFFFFF",
    subColor: "rgba(240, 255, 244, 0.75)",
  },
  {
    id: "cs-02",
    code: "4417",
    number: "02",
    title: "Scape Intel",
    subtitle: "Competitive Landscape & MCP Matrix",
    category: "COMPETITOR INTEL",
    tag: "LIVE APP",
    url: "https://scape-mcp-research.vercel.app/",
    color: "#12202E", // Slate Cobalt
    accent: "#0AC4E0",
    textColor: "#FFFFFF",
    subColor: "rgba(230, 255, 250, 0.75)",
  },
  {
    id: "cs-03",
    code: "3761",
    number: "03",
    title: "Talp AI",
    subtitle: "Global Expansion & Market Entry",
    category: "AI EXPANSION",
    tag: "LIVE APP",
    url: "https://talp-expansion-strategy.vercel.app/",
    color: "#20142C", // Midnight Royal Violet
    accent: "#BA85FF",
    textColor: "#FFFFFF",
    subColor: "rgba(250, 245, 255, 0.75)",
  },
  {
    id: "cs-04",
    code: "5428",
    number: "04",
    title: "Migma AI",
    subtitle: "Product-Market Fit & GTM Rollout",
    category: "PRODUCT STRATEGY",
    tag: "RESEARCH PDF",
    url: "https://drive.google.com/file/d/1vp2VK9FTOWBpU1-Wr4Z0YEePz2zgmOgA/view?usp=sharing",
    color: "#30160D", // Terracotta Rust Cognac
    accent: "#F29979",
    textColor: "#FFFFFF",
    subColor: "rgba(255, 250, 240, 0.75)",
  },
  {
    id: "cs-05",
    code: "4190",
    number: "05",
    title: "VDEX Protocol",
    subtitle: "DeFi Growth & Liquidity Strategy",
    category: "DEFI GROWTH",
    tag: "CANVA DECK",
    url: "https://canva.link/vdex-grwoth-strategy",
    color: "#2C0D1E", // Bordeaux Plum Wine
    accent: "#E58CA7",
    textColor: "#FFFFFF",
    subColor: "rgba(255, 245, 247, 0.75)",
  },
  {
    id: "cs-06",
    code: "5302",
    number: "06",
    title: "Hypersign",
    subtitle: "Self-Sovereign Identity Protocol",
    category: "IDENTITY PROTOCOL",
    tag: "CANVA DECK",
    url: "https://canva.link/hypersign",
    color: "#261B09", // Warm Umber Ochre Gold
    accent: "#F5D061",
    textColor: "#FFFFFF",
    subColor: "rgba(255, 255, 240, 0.75)",
  },
  {
    id: "cs-07",
    code: "4731",
    number: "07",
    title: "Paytm B2C",
    subtitle: "Consumer Retention & Monetization",
    category: "FINTECH GROWTH",
    tag: "CANVA DECK",
    url: "https://canva.link/paytm-b2c-strategy",
    color: "#E8E3D7", // Alabaster Bone Ivory
    accent: "#0084B4",
    textColor: "#111827",
    subColor: "rgba(17, 24, 39, 0.78)",
    isLight: true,
  },
  {
    id: "cs-08",
    code: "3056",
    number: "08",
    title: "Scape App",
    subtitle: "Spatial Discovery Ecosystem",
    category: "GTM STRATEGY",
    tag: "CANVA DECK",
    url: "https://canva.link/scape-gtm-strategy",
    color: "#14241B", // Deep Moss Emerald
    accent: "#48BB78",
    textColor: "#FFFFFF",
    subColor: "rgba(240, 255, 244, 0.75)",
  },
  {
    id: "cs-09",
    code: "5623",
    number: "09",
    title: "Talp AI",
    subtitle: "Developer Engine & SDK Adoption",
    category: "AI EXPANSION",
    tag: "LIVE APP",
    url: "https://talp-expansion-strategy.vercel.app/",
    color: "#101B2E", // Deep Navy Cobalt
    accent: "#63B3ED",
    textColor: "#FFFFFF",
    subColor: "rgba(235, 248, 255, 0.75)",
  },
  {
    id: "cs-10",
    code: "4944",
    number: "10",
    title: "Migma AI",
    subtitle: "Enterprise Positioning & PMF Matrix",
    category: "PRODUCT STRATEGY",
    tag: "RESEARCH PDF",
    url: "https://drive.google.com/file/d/1vp2VK9FTOWBpU1-Wr4Z0YEePz2zgmOgA/view?usp=sharing",
    color: "#32170C", // Dark Amber Cognac
    accent: "#ED8936",
    textColor: "#FFFFFF",
    subColor: "rgba(255, 250, 240, 0.75)",
  },
  {
    id: "cs-11",
    code: "4829",
    number: "11",
    title: "Scape Intel",
    subtitle: "MCP Server Ecosystem Protocols",
    category: "COMPETITOR INTEL",
    tag: "LIVE APP",
    url: "https://scape-mcp-research.vercel.app/",
    color: "#10261E", // Forest Pine
    accent: "#38B2AC",
    textColor: "#FFFFFF",
    subColor: "rgba(230, 255, 250, 0.75)",
  },
  {
    id: "cs-12",
    code: "5114",
    number: "12",
    title: "VDEX Strategy",
    subtitle: "Liquidity Mining & Institutional Scale",
    category: "DEFI GROWTH",
    tag: "CANVA DECK",
    url: "https://canva.link/vdex-grwoth-strategy",
    color: "#2C0C1E", // Deep Mulberry Burgundy
    accent: "#F472B6",
    textColor: "#FFFFFF",
    subColor: "rgba(255, 245, 247, 0.75)",
  },
  {
    id: "cs-13",
    code: "3768",
    number: "13",
    title: "Hypersign",
    subtitle: "Enterprise Identity & SSI Framework",
    category: "IDENTITY PROTOCOL",
    tag: "CANVA DECK",
    url: "https://canva.link/hypersign",
    color: "#261A07", // Antique Bronze Gold
    accent: "#ECC94B",
    textColor: "#FFFFFF",
    subColor: "rgba(255, 255, 240, 0.75)",
  },
  {
    id: "cs-14",
    code: "4082",
    number: "14",
    title: "Paytm B2C",
    subtitle: "Payment Friction & Conversion Funnels",
    category: "FINTECH GROWTH",
    tag: "CANVA DECK",
    url: "https://canva.link/paytm-b2c-strategy",
    color: "#E2DDD2", // Platinum Ivory
    accent: "#0084B4",
    textColor: "#111827",
    subColor: "rgba(17, 24, 39, 0.78)",
    isLight: true,
  },
];

// Draw realistic micro EMV chip
function drawChip(ctx, x, y, w, h, color) {
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 12);
  ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = color + "99";
  ctx.stroke();

  // Clean geometric contact paths
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = color + "80";

  ctx.beginPath();
  ctx.moveTo(x, y + h * 0.35);
  ctx.lineTo(x + w * 0.36, y + h * 0.35);
  ctx.lineTo(x + w * 0.36, y + h * 0.65);
  ctx.lineTo(x, y + h * 0.65);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + w, y + h * 0.35);
  ctx.lineTo(x + w * 0.64, y + h * 0.35);
  ctx.lineTo(x + w * 0.64, y + h * 0.65);
  ctx.lineTo(x + w, y + h * 0.65);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + w * 0.36, y);
  ctx.lineTo(x + w * 0.64, y);
  ctx.lineTo(x + w * 0.64, y + h);
  ctx.lineTo(x + w * 0.36, y + h);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x + w * 0.5, y + h * 0.5, 9, 0, Math.PI * 2);
  ctx.fillStyle = color + "40";
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

// Draw elegant tracked badge pill
function drawBadge(ctx, x, y, text, color, isLight) {
  ctx.save();
  ctx.font = "600 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const metrics = ctx.measureText(text);
  const padX = 22;
  const padY = 12;
  const w = metrics.width + padX * 2;
  const h = 44;

  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 10);
  ctx.fillStyle = isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = color + "60";
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.fillText(text, x + padX, y + h - padY - 2);
  ctx.restore();
}

// Generate luxury high-DPI card canvas texture (1200x1800)
function generateCardTexture(study) {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 1800;
  const ctx = canvas.getContext("2d");

  const w = canvas.width;
  const h = canvas.height;
  const r = 56;

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, w, h);
  if (study.isLight) {
    grad.addColorStop(0, "#F6F2E8");
    grad.addColorStop(0.6, "#E5DFD1");
    grad.addColorStop(1, "#D0C9B8");
  } else {
    grad.addColorStop(0, study.color);
    grad.addColorStop(0.55, study.color);
    grad.addColorStop(1, "#080B10");
  }

  ctx.beginPath();
  ctx.roundRect(0, 0, w, h, r);
  ctx.fillStyle = grad;
  ctx.fill();

  // Subtle metallic rim border
  ctx.lineWidth = 6;
  ctx.strokeStyle = study.accent + "50";
  ctx.stroke();

  // Minimal Grid pattern
  ctx.lineWidth = 1.2;
  ctx.strokeStyle = study.isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.045)";
  const step = 48;
  for (let x = 0; x < w; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Top Left: Security Code + Dots Matrix
  ctx.fillStyle = study.accent;
  ctx.font = "700 36px 'Courier New', monospace";
  ctx.fillText(study.code, 75, 125);

  // Pip dots
  ctx.fillStyle = study.accent + "80";
  ctx.font = "28px sans-serif";
  ctx.fillText("••••", 200, 123);

  // Top Right: Chip
  drawChip(ctx, w - 180, 80, 105, 78, study.accent);

  // Middle Body: Category Pill
  drawBadge(ctx, 75, 740, study.category, study.accent, study.isLight);

  // Title: Bold, elegant tracked typography
  ctx.fillStyle = study.textColor;
  ctx.font = "700 70px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(study.title, 75, 870);

  // Subtitle
  ctx.fillStyle = study.subColor;
  ctx.font = "400 36px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(study.subtitle, 75, 935);

  // Bottom Hairline Divider
  ctx.strokeStyle = study.accent + "30";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(75, h - 190);
  ctx.lineTo(w - 75, h - 190);
  ctx.stroke();

  // Cardholder Label
  ctx.fillStyle = study.subColor;
  ctx.font = "600 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("CARD HOLDER", 75, h - 130);

  // Cardholder Name
  ctx.fillStyle = study.textColor;
  ctx.font = "700 34px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("VIVEK MEHATA", 75, h - 85);

  // Action Button / Badge
  drawBadge(ctx, w - 260, h - 142, `${study.tag} ↗`, study.accent, study.isLight);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Create 3D Rounded Box Geometry
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
    bevelSize: 0.02,
    bevelThickness: 0.015,
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

    // 2. Camera Setup (Wide coverage for edge-to-edge span)
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0, 10.5);

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
    renderer.toneMappingExposure = 1.15;

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight1.position.set(6, 10, 8);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x0ac4e0, 1.0);
    dirLight2.position.set(-8, -4, 6);
    scene.add(dirLight2);

    const spotlight = new THREE.PointLight(0xffffff, 3.5, 14);
    spotlight.position.set(0, 0, 5);
    scene.add(spotlight);

    // 5. Geometry & Card Setup
    const cardWidth = 2.1;
    const cardHeight = 3.3;
    const cardRadius = 0.15;
    const cardDepth = 0.04;
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
      const material = new THREE.MeshPhysicalMaterial({
        map: texture,
        roughness: 0.18,
        metalness: 0.06,
        clearcoat: 0.55,
        clearcoatRoughness: 0.12,
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
        currentFlip: 0,
        targetFlip: 0,
      });
    });

    // 6. Scroll & Raycast Pointer State
    let scrollProgress = 0;
    let targetScrollProgress = 0;
    let pointer = new THREE.Vector2(-999, -999);
    let hoveredCardIndex = -1;
    let isPointerOver = false;

    const raycaster = new THREE.Raycaster();

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Smooth scroll entry from top entering to centered
      const start = windowHeight * 0.95;
      const end = windowHeight * 0.22;
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
      isPointerOver = true;

      // Update spotlight position
      spotlight.position.x = pointer.x * (visibleSpan * 0.45);
      spotlight.position.y = pointer.y * 3;

      // Raycast against cards
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(cards.map((c) => c.mesh));

      if (intersects.length > 0) {
        hoveredCardIndex = intersects[0].object.userData.index;
        container.style.cursor = "pointer";
        setActiveTitle(intersects[0].object.userData.study.title);
      } else {
        const continuousIdx = x * totalCards;
        hoveredCardIndex = Math.max(0, Math.min(totalCards - 1, continuousIdx));
        container.style.cursor = "default";
        setActiveTitle(null);
      }
    };

    const handlePointerLeave = () => {
      pointer.set(-999, -999);
      hoveredCardIndex = -1;
      isPointerOver = false;
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
        camera.position.z = 14.2;
        camera.position.y = 0.1;
      } else if (width < 1200) {
        camera.position.z = 12.0;
        camera.position.y = 0.2;
      } else {
        camera.position.z = 10.5;
        camera.position.y = 0.25;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      visibleSpan = getVisibleSpan();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // 7. Render Loop with Smooth Spring Easing (Emil Kowalski Craft)
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);

      // Smooth scroll progress lerp
      scrollProgress += (targetScrollProgress - scrollProgress) * (delta * 6.5);

      const center = (totalCards - 1) / 2; // 6.5

      cards.forEach((card, i) => {
        // Even 3D diagonal rack spacing across full width
        const offsetFromCenter = i - center;
        const stepX = (visibleSpan * 0.88) / (totalCards - 1);
        const settledX = offsetFromCenter * stepX;
        const settledY = -0.65 + offsetFromCenter * 0.04;
        const settledZ = -offsetFromCenter * 0.16;

        const settledRotY = -0.45; // ~-25.8 deg
        const settledRotX = 0.16;  // ~9.2 deg
        const settledRotZ = 0.035; // ~2 deg

        // Air Wave Position (Falling from top in a gentle 3D arc)
        const airX = settledX * 1.08 - 0.8;
        const airY = 4.8 + Math.sin(i * 0.45) * 1.0;
        const airZ = 1.8 - (i / (totalCards - 1)) * 2.5;

        const airRotX = 0.65;
        const airRotY = -0.75 + (i / totalCards) * 0.3;
        const airRotZ = -0.25 + (i / totalCards) * 0.4;

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

        // Hover Pop-up & Flip-to-front physics
        let targetLift = 0;
        let targetFlip = 0;

        if (isPointerOver && hoveredCardIndex >= 0 && cardP > 0.6) {
          const dist = Math.abs(hoveredCardIndex - i);
          if (dist < 0.6) {
            targetLift = 1.35; // Direct pop-up
            targetFlip = 1.0;  // Full flip to camera
          } else if (dist < 2.0) {
            const falloff = 1 - (dist - 0.6) / 1.4;
            targetLift = 0.45 * falloff; // Neighbor wave
            targetFlip = 0.25 * falloff;
          }
        }

        // Apple-grade smooth spring interpolation (never snaps)
        const springSpeed = Math.min(delta * 5.5, 0.25);
        card.currentLift += (targetLift - card.currentLift) * springSpeed;
        card.currentFlip += (targetFlip - card.currentFlip) * springSpeed;

        // Final transforms
        const finalRotY = THREE.MathUtils.lerp(rotY, 0, card.currentFlip);
        const finalRotX = THREE.MathUtils.lerp(rotX, 0, card.currentFlip);
        const finalRotZ = THREE.MathUtils.lerp(rotZ, 0, card.currentFlip);

        const finalY = posY + card.currentLift * 1.1;
        const finalZ = posZ + card.currentFlip * 1.25 + card.currentLift * 0.35;
        const finalScale = 1 + card.currentFlip * 0.08;

        card.mesh.position.set(posX, finalY, finalZ);
        card.mesh.rotation.set(finalRotX, finalRotY, finalRotZ);
        card.mesh.scale.set(finalScale, finalScale, finalScale);
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
          height: clamp(520px, 64vh, 700px);
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
          Fourteen cards, one wave — a physics-driven 3D case study deck. Hover over any card to pop it up and flip to front, click to open research reports.
        </p>
      </div>

      {/* Full-Bleed 100vw 3D WebGL Canvas */}
      <div ref={containerRef} className="cs-three-stage">
        <canvas ref={canvasRef} className="cs-three-canvas" />
      </div>

      {/* Footer hint */}
      <div className="cs-hint-container">
        <span>← Move cursor along the deck to feel them pop up and flip →</span>
        <span style={{ color: activeTitle ? "#0AC4E0" : "rgba(255, 255, 255, 0.35)", transition: "color 0.2s ease" }}>
          {activeTitle ? `Click to open ${activeTitle} ↗` : "Click any card to open research report ↗"}
        </span>
      </div>
    </section>
  );
}
