import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress, scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300, 600], [0, 0, 1]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: '68px',
        left: '50%',
        x: '-50%',
        width: 'min(240px, 25vw)',
        padding: '10px 16px',
        borderRadius: '24px',
        zIndex: 9999, // Super high z-index to stay visible across all sections
        pointerEvents: 'none',
        background: 'rgba(7, 12, 24, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255,255,255,0.05)',
        opacity,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.12)', borderRadius: '2px' }}>
        <motion.div
          style={{
            scaleX: scrollYProgress,
            transformOrigin: 'left',
            height: '100%',
            width: '100%',
            background: '#0AC4E0',
            boxShadow: '0 0 12px rgba(10,196,224,0.6)',
            borderRadius: 'inherit'
          }}
        />
      </div>
    </motion.div>
  );
};

export default ScrollProgress;
