import React from 'react'

const ZenZone = () => {
  return (
    <section className="py-40 px-6 md:px-12 lg:px-32 bg-accent-cream flex items-center justify-center relative">
      {/* Paper texture overlay (subtle noise/grain) */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper.png")' }}
      ></div>

      <div className="max-w-4xl mx-auto text-center relative z-10 p-12 md:p-24 border border-text-primary/10">
        <p className="font-poetry text-4xl md:text-5xl lg:text-6xl text-text-primary leading-relaxed">
          "In the stillness of the grind, <br className="hidden md:block"/> 
          we find the clarity to build empires. <br className="hidden md:block"/>
          Quiet the noise, let the work speak."
        </p>
        <span className="block mt-12 font-display text-sm tracking-widest uppercase text-text-primary/60">
          — The Zen Zone
        </span>
      </div>
    </section>
  )
}

export default ZenZone
