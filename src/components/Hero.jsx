import React from 'react'
import { motion } from 'framer-motion'

const springTransition = {
  type: "spring",
  damping: 20,
  stiffness: 100,
  duration: 1.2
}

const Hero = () => {
  return (
    <section className="relative w-full h-screen min-h-[800px] flex bg-bg-primary overflow-hidden px-6 md:px-12 py-24 box-border">
      {/* Asymmetrical Grid Shell */}
      <div className="w-full h-full max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
        
        {/* Left: High-Fashion Portrait (Col span 5) */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springTransition}
          className="w-full h-[60vh] md:h-[80vh] md:col-span-5 relative overflow-hidden"
        >
          <img 
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1000" 
            alt="Viivek Mehata Portrait"
            className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>

        {/* Right: Massive Typography (Col span 7) */}
        <div className="md:col-span-7 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...springTransition, delay: 0.2 }}
          >
            <h1 
              className="font-display font-bold uppercase text-text-primary leading-[0.85]"
              style={{ fontSize: 'clamp(4rem, 10vw, 12rem)', letterSpacing: '-0.04em' }}
            >
              Viivek<br />Mehata
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...springTransition, delay: 0.6 }}
            className="mt-8 md:mt-12 border-l-2 border-text-primary/30 pl-6 ml-2"
          >
            <p className="font-body text-lg md:text-2xl text-text-primary/80 tracking-wide font-medium uppercase">
              Portfolio Manager. Solo Traveler. Poet.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
