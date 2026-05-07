# Info Page Design Spec: The Zigzag Editorial Timeline

## 1. Overview
The Info page (`/info`) is a high-end, kinetic storytelling experience documenting 15 milestones. Inspired by Perry Wang's portfolio, it moves away from strict section-snapping and instead uses a fluid, alternating "zigzag" scroll layout. The experience relies heavily on Scroll-Driven Animations via Framer Motion to provide a cinematic, "wow" factor at every scroll tick.

## 2. Core Layout Architecture
- **Fluid Scroll:** No scroll-jacking or magnetic snapping. Pacing is completely user-controlled.
- **The Zigzag Grid:** A two-column layout that alternates per milestone:
  - Even index: Text on Left, Image on Right
  - Odd index: Image on Left, Text on Right
- **The Horizon Line (Spine):** A fixed/parallax vertical line (`#0B2D72`) running down the exact center. 

## 3. The "Wow" Animations (Crucial)
To avoid a static feel, every element responds to scroll (`useScroll`, `useTransform`):
1. **Text Reveals:** Text blocks stagger in using character/word-level reveals (using `framer-motion` variants) and have a subtle Y-axis parallax. As they exit the viewport, they blur and fade out.
2. **Image Kinetics:**
   - **Mask Reveals:** Images don't just fade; they reveal themselves via directional masking (e.g., wiping from bottom to top) as they enter.
   - **Parallax & Scale:** The image container scrolls normally, but the image *inside* the container scales down from `1.2` to `1.0` and translates on the Y-axis.
   - **3D Tilt:** Subtly linking the scroll velocity or Y-progress to a slight 3D rotation (`rotateX`, `rotateY`) on the image containers.
3. **The Spine:** The central line acts as a scroll progress bar, painting itself navy (`#0B2D72`) as the user scrolls down.

## 4. The Climax ("Since Then")
At the final section ("Since Then | The Horizon"):
- The central vertical line smoothly turns 90 degrees into a horizontal "sunset" line.
- The entire page background transitions seamlessly from the default paper/white to a warm golden glow (`#F6E7BC`).

## 5. Data Model
An array of 15 timeline objects containing: `year`, `title`, `copy`, and placeholder `visual` instructions.

## 6. Technical Stack
- React + Tailwind CSS
- Framer Motion (`useScroll`, `useTransform`, `motion.div`)
- CSS Grid/Flexbox for the alternating layout.
