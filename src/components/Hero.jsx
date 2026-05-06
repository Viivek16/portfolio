import React from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-bg-primary">
      <motion.img
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        src="https://images.unsplash.com/photo-1555952517-2e8e729e0b44?auto=format&fit=crop&q=80&w=2000"
        alt="Portrait of Viivek"
        className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 mix-blend-multiply"
      />
      <div className="relative z-10 text-center px-6">
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-text-primary uppercase leading-none"
        >
          Viivek Mehata
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
          className="mt-6 text-xl md:text-2xl font-body font-light tracking-wide text-text-primary/80 uppercase"
        >
          Editorial Portfolio
        </motion.p>
      </div>
    </section>
  )
}

export default Hero
