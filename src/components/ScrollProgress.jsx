import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress, scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300, 600], [0, 0, 1]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: '72px',
        left: '50%',
        x: '-50%',
        width: 'min(420px, 38vw)',
        height: '3px',
        borderRadius: '2px',
        zIndex: 50,
        pointerEvents: 'none',
        background: 'rgba(255,255,255,0.10)',
        opacity
      }}
    >
      <motion.div
        style={{
          scaleX: scrollYProgress,
          transformOrigin: 'left',
          height: '100%',
          width: '100%',
          background: '#0AC4E0',
          boxShadow: '0 0 10px rgba(10,196,224,0.55)',
          borderRadius: 'inherit'
        }}
      />
    </motion.div>
  );
};

export default ScrollProgress;
