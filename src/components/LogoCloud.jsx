import React from 'react'

const LogoItem = ({ name }) => (
  <div className="flex items-center justify-center p-8 border border-text-primary/10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:border-accent-blue transition-all duration-500 cursor-default bg-white">
    <span className="font-display font-bold text-2xl tracking-widest uppercase text-text-primary">{name}</span>
  </div>
)

const LogoCloud = () => {
  const partners = [
    "DIFC", "RAK DAO", "Techstars", "500 Global", "Y Combinator", "Sequoia"
  ]

  return (
    <section className="py-32 px-6 md:px-12 lg:px-32 bg-bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-5xl text-text-primary uppercase tracking-tight">
            Institutional <span className="text-accent-blue">Trust</span>
          </h2>
          <p className="mt-4 font-body text-text-primary/60 max-w-2xl mx-auto">
            Partnered with leading ecosystems and capital allocators globally.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-text-primary/10 border border-text-primary/10">
          {partners.map((partner, index) => (
            <LogoItem key={index} name={partner} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default LogoCloud
