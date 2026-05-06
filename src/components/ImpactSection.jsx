import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const CaseStudyCard = ({ title, metric, description }) => {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  })

  // Scroll-Skew 3D tilt effect
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9])

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, opacity, scale, perspective: 1000 }}
      data-testid="case-study-card"
      className="bg-white border border-text-primary/10 p-12 lg:p-24 shadow-sm flex flex-col justify-between"
    >
      <h3 className="font-display text-2xl uppercase tracking-wider text-accent-blue mb-4">{title}</h3>
      <div className="mt-8">
        <span className="block font-display text-7xl lg:text-8xl font-bold text-text-primary leading-none mb-4">
          {metric}
        </span>
        <p className="font-body text-lg text-text-primary/70 max-w-md">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

const ImpactSection = () => {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-32 bg-bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 md:w-2/3">
          <h2 className="font-display text-4xl md:text-6xl text-text-primary uppercase leading-tight">
            Stories of <br />
            <span className="text-text-primary/50 italic">Unreasonable Impact</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 lg:gap-16">
          <CaseStudyCard 
            title="Capital Scaling" 
            metric="$200M+" 
            description="Assets under management orchestrated through high-conviction deal flows and rigorous institutional trust." 
          />
          <div className="md:mt-32">
            <CaseStudyCard 
              title="Global Funnels" 
              metric="50+" 
              description="High-tier leads secured through proprietary network architectures and targeted outreach." 
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImpactSection
