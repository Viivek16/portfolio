import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const NarrativeText = ({ children, progressRange, scrollYProgress }) => {
  const opacity = useTransform(scrollYProgress, progressRange, [0.1, 1, 1, 0.1])
  const y = useTransform(scrollYProgress, progressRange, [50, 0, 0, -50])

  return (
    <motion.p
      style={{ opacity, y }}
      className="font-display text-3xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tight text-text-primary leading-tight py-32 md:py-64 max-w-4xl"
    >
      {children}
    </motion.p>
  )
}

const BackgroundFlick = ({ src, progressRange, scrollYProgress, align }) => {
  const opacity = useTransform(scrollYProgress, progressRange, [0, 0.3, 0.3, 0])
  const scale = useTransform(scrollYProgress, progressRange, [1.1, 1, 1, 1.1])
  const y = useTransform(scrollYProgress, progressRange, [100, 0, 0, -100])

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className={`fixed ${align} w-1/2 md:w-1/3 h-[50vh] z-0 pointer-events-none mix-blend-multiply grayscale`}
    >
      <img src={src} alt="background flick" className="w-full h-full object-cover" />
    </motion.div>
  )
}

const ScrollNarrative = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  return (
    <div ref={containerRef} className="relative bg-[#F8F7F4] w-full min-h-[400vh]">
      {/* Background Images that fade in/out based on scroll */}
      <BackgroundFlick 
        src="https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?auto=format&fit=crop&q=80&w=1000"
        progressRange={[0, 0.2, 0.3, 0.5]}
        scrollYProgress={scrollYProgress}
        align="top-20 left-10"
      />
      <BackgroundFlick 
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000"
        progressRange={[0.3, 0.5, 0.6, 0.8]}
        scrollYProgress={scrollYProgress}
        align="top-1/4 right-10"
      />
      <BackgroundFlick 
        src="https://images.unsplash.com/photo-1518398046578-8cca57782e17?auto=format&fit=crop&q=80&w=1000"
        progressRange={[0.6, 0.8, 0.9, 1]}
        scrollYProgress={scrollYProgress}
        align="bottom-20 left-1/4"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-32 flex flex-col items-center text-center pt-32">
        <NarrativeText progressRange={[0, 0.1, 0.2, 0.3]} scrollYProgress={scrollYProgress}>
          I believe in building systems that outlast their creators.
        </NarrativeText>
        <NarrativeText progressRange={[0.3, 0.4, 0.5, 0.6]} scrollYProgress={scrollYProgress}>
          From the vibrant streets of Dubai to the historic avenues of London, my journey has been a relentless pursuit of excellence.
        </NarrativeText>
        <NarrativeText progressRange={[0.6, 0.7, 0.8, 0.9]} scrollYProgress={scrollYProgress}>
          To me, capital allocation is an art form. It's about recognizing patterns where others see chaos.
        </NarrativeText>
        
        <div className="h-screen w-full flex items-center justify-center">
          <p className="font-poetry text-4xl md:text-6xl text-accent-blue">
            The journey continues.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ScrollNarrative
